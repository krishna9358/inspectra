# RAG Implementation

This document explains Inspectra's Retrieval-Augmented Generation (RAG) implementation for context-aware code reviews.

## Overview

RAG enables Inspectra to provide intelligent, context-aware code reviews by:

1. **Indexing** the entire codebase as vector embeddings
2. **Retrieving** relevant code snippets based on semantic similarity
3. **Augmenting** AI prompts with retrieved context

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                          INDEXING PIPELINE                               │
│                                                                         │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌──────────┐ │
│  │ Repository  │───▶│ Fetch All   │───▶│  Generate   │───▶│  Upsert  │ │
│  │  Connected  │    │   Files     │    │ Embeddings  │    │ Pinecone │ │
│  └─────────────┘    └─────────────┘    └─────────────┘    └──────────┘ │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│                         RETRIEVAL PIPELINE                               │
│                                                                         │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌──────────┐ │
│  │   Query     │───▶│  Generate   │───▶│   Search    │───▶│  Return  │ │
│  │  (PR Diff)  │    │  Embedding  │    │  Pinecone   │    │ Context  │ │
│  └─────────────┘    └─────────────┘    └─────────────┘    └──────────┘ │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Components

### 1. Pinecone Client

```typescript
// /lib/pinecone.ts
import { Pinecone } from "@pinecone-database/pinecone";

export const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_DB_API_KEY!,
});

export const pineconeIndex = pinecone.index("inspectra-vector-embeddings-v1");
```

### Index Configuration

| Setting        | Value                            | Description                       |
| -------------- | -------------------------------- | --------------------------------- |
| **Index Name** | `inspectra-vector-embeddings-v1` | Unique identifier                 |
| **Dimension**  | 768                              | Matches Google text-embedding-004 |
| **Metric**     | `cosine`                         | Similarity measure                |
| **Cloud**      | AWS                              | Provider                          |
| **Region**     | us-east-1                        | Location                          |

### 2. Embedding Generation

```typescript
// /module/github/lib/ai/lib/rag.ts
import { embed } from "ai";
import { google } from "@ai-sdk/google";

export async function generateEmbedding(text: string) {
  const { embedding } = await embed({
    model: google.embeddingModel("text-embedding-004"),
    value: text,
  });

  return embedding;
}
```

**Model**: Google's `text-embedding-004`

- **Dimensions**: 768
- **Max Input**: 8,192 tokens
- **Use Case**: Semantic similarity, retrieval

---

## Indexing Process

### Trigger

Repository indexing is triggered when a user connects a repository:

```typescript
// /module/repository/actions/index.ts
await inngest.send({
  name: "repository.connected",
  data: {
    owner,
    repo,
    userId: session.user.id,
  },
});
```

### Inngest Function

```typescript
// /inngest/functions/index.ts
export const indexRepo = inngest.createFunction(
  { id: "index-repo" },
  { event: "repository.connected" },
  async ({ event, step }) => {
    const { owner, repo, userId } = event.data;

    // Step 1: Fetch all files from the repository
    const files = await step.run("fetch-files", async () => {
      const account = await prisma.account.findFirst({
        where: { userId, providerId: "github" },
      });

      if (!account) {
        throw new Error("No github access token found");
      }

      return await getRepoFileContents(account.accessToken!, owner, repo);
    });

    // Step 2: Generate embeddings and store in Pinecone
    await step.run("index-codebase", async () => {
      await indexCodebase(`${owner}/${repo}`, files);
    });

    return { success: true, indexedFiles: files.length };
  },
);
```

### Indexing Function

```typescript
export async function indexCodebase(
  repoId: string,
  files: { path: string; content: string }[],
) {
  const vectors = [];

  for (const file of files) {
    // Prepare content with file path for context
    const content = `File: ${file.path}\n\n${file.content}`;

    // Truncate to model's max input
    const truncatedContent = content.slice(0, 8192);

    try {
      const embedding = await generateEmbedding(truncatedContent);

      vectors.push({
        id: `${repoId}-${file.path.replace(/\//g, "_")}`,
        values: embedding,
        metadata: {
          repoId,
          path: file.path,
        },
      });
    } catch (error) {
      console.log("Error generating embedding for:", file.path, error);
    }
  }

  // Batch upsert to Pinecone (max 100 vectors per request)
  if (vectors.length > 0) {
    const batchSize = 100;
    for (let i = 0; i < vectors.length; i += batchSize) {
      const batch = vectors.slice(i, i + batchSize);
      await pineconeIndex.upsert(batch);
    }
  }
}
```

---

## Retrieval Process

### Context Retrieval

When generating a code review, we retrieve relevant code snippets:

```typescript
export async function retrieveContext(
  query: string,
  repoId: string,
  topK: number = 5,
) {
  // Generate embedding for the query
  const embedding = await generateEmbedding(query);

  // Search Pinecone with repo filter
  const results = await pineconeIndex.query({
    vector: embedding,
    topK,
    filter: {
      repoId,
    },
    includeMetadata: true,
  });

  // Extract content from results
  return results.matches
    .map((match) => match.metadata?.content as string)
    .filter(Boolean);
}
```

### Usage in Code Review (Future)

```typescript
async function generateCodeReview(prDiff: string, repoId: string) {
  // Retrieve relevant context from the codebase
  const context = await retrieveContext(prDiff, repoId, 10);

  // Build prompt with context
  const prompt = `
    You are reviewing a Pull Request. Here is relevant context from the codebase:
    
    ${context.join("\n\n---\n\n")}
    
    And here is the PR diff:
    
    ${prDiff}
    
    Please provide a comprehensive code review.
  `;

  // Generate review with AI
  const review = await generateText({
    model: gemini("gemini-2.0-flash"),
    prompt,
  });

  return review;
}
```

---

## Vector Schema

Each vector in Pinecone has:

```typescript
{
  id: string;        // "{owner}/{repo}-{path_with_underscores}"
  values: number[];  // 768-dimensional embedding
  metadata: {
    repoId: string;  // "{owner}/{repo}"
    path: string;    // Original file path
  };
}
```

### Example

```json
{
  "id": "krishna9358/inspectra-src_components_Button_tsx",
  "values": [0.123, -0.456, 0.789, ...],
  "metadata": {
    "repoId": "krishna9358/inspectra",
    "path": "src/components/Button.tsx"
  }
}
```

---

## Configuration

### Environment Variables

```bash
# Pinecone
PINECONE_DB_API_KEY="your-pinecone-api-key"

# Google AI (for embeddings)
GOOGLE_API_KEY="your-google-api-key"
```

### Pinecone Index Setup

1. Go to [Pinecone Console](https://app.pinecone.io)
2. Create a new index:
   - **Name**: `inspectra-vector-embeddings-v1`
   - **Dimensions**: `768`
   - **Metric**: `cosine`
3. Copy the API key to your `.env` file

---

## Best Practices

### 1. Chunking Strategy

Currently, we index entire files (truncated to 8192 chars). Consider:

- **Chunking by function/class**: More granular retrieval
- **Overlapping chunks**: Better context continuity
- **Smart splitting**: Respect code structure (not mid-line)

### 2. Metadata Enrichment

Add more metadata for better filtering:

```typescript
metadata: {
  repoId: string;
  path: string;
  language: string; // "typescript", "python", etc.
  fileType: string; // "component", "util", "test"
  lastModified: string; // ISO date
}
```

### 3. Incremental Updates

Instead of re-indexing the entire repo:

1. Track file hashes
2. Only re-embed changed files
3. Delete removed file vectors

### 4. Rate Limiting

Be mindful of API limits:

- **Google AI**: Embedding requests/min
- **Pinecone**: Upsert/query operations/sec
- **GitHub**: API requests/hour

---

## Troubleshooting

### Dimension Mismatch

**Error**: `Vector dimension 768 does not match index dimension 1024`

**Solution**: Ensure your embedding model matches the Pinecone index dimensions:

- `text-embedding-004`: 768 dimensions
- `text-embedding-3-large`: 3072 dimensions (can reduce to 1024)

### Empty Results

**Issue**: Context retrieval returns empty array

**Check**:

1. Repository is indexed (check Pinecone console)
2. `repoId` filter matches exactly
3. Query is generating valid embeddings

### Slow Indexing

**Issue**: Large repositories take too long

**Solutions**:

1. Increase batch size (up to 100)
2. Parallelize file fetching
3. Skip non-essential files (node_modules, dist, etc.)
4. Use Inngest steps for checkpointing
