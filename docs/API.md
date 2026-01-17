# API Reference

This document covers Inspectra's API endpoints and server actions.

## Overview

Inspectra uses two patterns for server-side logic:

1. **API Routes**: Traditional REST endpoints in `/app/api`
2. **Server Actions**: Type-safe server functions in `/module/{feature}/actions`

---

## API Routes

### Authentication

#### `GET/POST /api/auth/[...all]`

Better Auth handler for all authentication operations.

**Endpoints handled:**

- `POST /api/auth/sign-in/social` - Start OAuth flow
- `GET /api/auth/callback/github` - OAuth callback
- `POST /api/auth/sign-out` - Sign out
- `GET /api/auth/get-session` - Get current session

### Webhooks

#### `POST /api/webhooks/github`

Receives webhook events from GitHub.

**Headers:**
| Header | Description |
|--------|-------------|
| `x-github-event` | Event type (e.g., "pull_request") |
| `x-hub-signature-256` | HMAC signature for verification |
| `x-github-delivery` | Unique event ID |

**Events Handled:**

- `pull_request` - PR opened, closed, synchronized
- `push` - Code pushed to repository

**Response:**

```json
{
  "received": true
}
```

### Inngest

#### `GET/POST/PUT /api/inngest`

Inngest webhook handler for background job execution.

**Note:** This endpoint is used internally by Inngest and should not be called directly.

---

## Server Actions

### Repository Module

Located in `/module/repository/actions/index.ts`

#### `getRepositoriesAction(page: number, perPage: number)`

Fetches user's GitHub repositories with pagination.

**Parameters:**
| Name | Type | Default | Description |
|------|------|---------|-------------|
| `page` | number | 1 | Page number |
| `perPage` | number | 10 | Items per page |

**Returns:**

```typescript
type Repository = {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  topics?: string[];
  isConnected?: boolean;
};
```

**Example:**

```typescript
const repos = await getRepositoriesAction(1, 20);
```

---

#### `connectRepository(owner: string, repo: string, githubId: number)`

Connects a repository to Inspectra.

**Parameters:**
| Name | Type | Description |
|------|------|-------------|
| `owner` | string | Repository owner |
| `repo` | string | Repository name |
| `githubId` | number | GitHub repository ID |

**Side Effects:**

1. Creates webhook on the GitHub repository
2. Saves repository to database
3. Triggers `repository.connected` Inngest event

**Returns:**

```typescript
type WebhookResponse = {
  id: number;
  name: string;
  active: boolean;
  config: { url: string };
};
```

---

### Settings Module

Located in `/module/settings/actions/index.ts`

#### `getUserProfile()`

Gets the current user's profile information.

**Returns:**

```typescript
type UserProfile = {
  id: string;
  name: string;
  email: string;
  image: string | null;
  createdAt: Date;
};
```

---

#### `updateUserProfile(data: { name?: string; email?: string })`

Updates the user's profile.

**Parameters:**
| Name | Type | Description |
|------|------|-------------|
| `data.name` | string? | New display name |
| `data.email` | string? | New email address |

**Returns:**

```typescript
type UpdateResult = {
  success: boolean;
  user?: { id: string; name: string; email: string };
  error?: Error;
};
```

---

#### `getConnectRepositories()`

Gets all repositories connected by the current user.

**Returns:**

```typescript
type ConnectedRepository[] = {
  id: string;
  name: string;
  fullName: string;
  url: string;
  createdAt: Date;
}[];
```

---

#### `disconnectRepository(id: string)`

Disconnects a repository from Inspectra.

**Parameters:**
| Name | Type | Description |
|------|------|-------------|
| `id` | string | Repository ID in database |

**Side Effects:**

1. Deletes webhook from GitHub
2. Removes repository from database
3. Revalidates affected pages

**Returns:**

```typescript
type DisconnectResult = {
  success: boolean;
  error?: Error;
};
```

---

#### `disconnectAllRepository()`

Disconnects all repositories for the current user.

**Side Effects:**

1. Deletes all webhooks from GitHub
2. Removes all repositories from database
3. Revalidates affected pages

**Returns:**

```typescript
type DisconnectAllResult = {
  success: boolean;
  count: number;
  error?: Error;
};
```

---

## AI Module

Located in `/module/ai/actions/index.ts`

#### `reviewPullRequest(owner: string, repo: string, prNumber: number)`

Initiates an AI review for a Pull Request. Called from the GitHub webhook handler.

**Parameters:**
| Name | Type | Description |
|------|------|-------------|
| `owner` | string | Repository owner |
| `repo` | string | Repository name |
| `prNumber` | number | Pull request number |

**Side Effects:**

1. Fetches repository and user data from database
2. Validates GitHub access token
3. Triggers `pr.review.requested` Inngest event
4. On failure, saves error to database as a failed review

**Returns:**

```typescript
type ReviewResult = {
  success: boolean;
  message: string; // "Review Queued" or error message
};
```

**Example:**

```typescript
const result = await reviewPullRequest("krishna9358", "inspectra", 42);
// { success: true, message: "Review Queued" }
```

---

### OpenRouter Provider

Located in `/module/ai/lib/openrouter.ts`

Provides a custom OpenAI-compatible provider for OpenRouter:

```typescript
import { createOpenAI } from "@ai-sdk/openai";

const openrouterProvider = createOpenAI({
  apiKey: process.env.OPENROUTER_API_KEY!,
  baseURL: "https://openrouter.ai/api/v1",
  headers: {
    "HTTP-Referer":
      process.env.NEXT_PUBLIC_APP_BASE_URL || "http://localhost:3000",
    "X-Title": "inspectra",
  },
});

export const openrouter = (model: string) => openrouterProvider(model);
```

**Usage:**

```typescript
import { openrouter } from "@/module/ai/lib/openrouter";
import { generateText } from "ai";

const { text } = await generateText({
  model: openrouter("qwen/qwen3-coder:free"),
  prompt: "...",
});
```

---

### Prompt Generator

Located in `/module/ai/prompt.ts`

#### `generateReviewPrompt(params: PromptParams): string`

Generates a comprehensive prompt for AI code review.

**Parameters:**

```typescript
interface PromptParams {
  title: string;
  description: string | null;
  context: string[];
  diff: string;
}
```

**Returns:** A formatted prompt string for the AI model.

---

## GitHub Utility Functions

Located in `/module/github/lib/github.ts`

These are internal functions, not server actions.

#### `getGithubToken(): Promise<string | null>`

Gets the current user's GitHub access token.

---

#### `fetchUserContribution(token: string, username: string)`

Fetches GitHub contribution calendar data.

**Returns:**

```typescript
type ContributionData = {
  totalContributions: number;
  weeks: {
    contributionDays: {
      contributionCount: number;
      date: string;
      color: string;
    }[];
  }[];
};
```

---

#### `getRepositories(page: number, perPage: number)`

Fetches repositories from GitHub API.

---

#### `createWebhook(owner: string, repo: string)`

Creates a webhook on a GitHub repository.

---

#### `deleteWebhook(owner: string, repo: string)`

Deletes the Inspectra webhook from a repository.

---

#### `getRepoFileContents(token: string, owner: string, repo: string, path?: string)`

Recursively fetches all file contents from a repository.

**Returns:**

```typescript
type FileContent[] = {
  path: string;
  content: string;
}[];
```

---

#### `getPullRequestDiff(token: string, owner: string, repo: string, prNumber: number)`

Fetches the diff, title, and description for a Pull Request.

**Parameters:**
| Name | Type | Description |
|------|------|-------------|
| `token` | string | GitHub access token |
| `owner` | string | Repository owner |
| `repo` | string | Repository name |
| `prNumber` | number | Pull request number |

**Returns:**

```typescript
type PRDiffResponse = {
  title: string; // PR title
  diff: string; // Full diff content
  description: string; // PR body/description
};
```

---

#### `postReviewComment(token: string, owner: string, repo: string, prNumber: number, review: string)`

Posts an AI-generated review as a comment on a Pull Request.

**Parameters:**
| Name | Type | Description |
|------|------|-------------|
| `token` | string | GitHub access token |
| `owner` | string | Repository owner |
| `repo` | string | Repository name |
| `prNumber` | number | Pull request number |
| `review` | string | Review content to post |

---

## RAG Functions

Located in `/module/ai/lib/rag.ts`

#### `generateEmbedding(text: string): Promise<number[]>`

Generates a vector embedding for text using Google's text-embedding-004 model.

---

#### `indexCodebase(repoId: string, files: { path: string; content: string }[])`

Indexes repository files to Pinecone in batches.

---

#### `retrieveContext(query: string, repoId: string, topK?: number): Promise<string[]>`

Retrieves relevant code context for a query using vector similarity search.

**Parameters:**
| Name | Type | Default | Description |
|------|------|---------|-------------|
| `query` | string | - | Search query |
| `repoId` | string | - | Repository identifier (owner/repo) |
| `topK` | number | 5 | Number of results to return |

**Returns:** Array of relevant code snippets from the indexed codebase.

---

## Error Handling

### Server Action Errors

Server actions return structured error responses:

```typescript
try {
  const result = await serverAction();
  if (!result.success) {
    // Handle error
    console.error(result.error);
  }
} catch (error) {
  // Network or unexpected error
}
```

### API Route Errors

API routes return HTTP status codes:

| Status | Meaning      |
| ------ | ------------ |
| 200    | Success      |
| 400    | Bad Request  |
| 401    | Unauthorized |
| 403    | Forbidden    |
| 404    | Not Found    |
| 500    | Server Error |

**Example error response:**

```json
{
  "error": "Unauthorized",
  "message": "You must be logged in"
}
```

---

## Authentication

### Session Verification

All protected actions verify the session:

```typescript
const session = await auth.api.getSession({
  headers: await headers(),
});

if (!session) {
  throw new Error("Unauthorized");
}

// Access user: session.user.id, session.user.name
```

### Client-Side Usage

Use TanStack Query for data fetching:

```typescript
import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "@/module/settings/actions";

function ProfileComponent() {
  const { data, isLoading } = useQuery({
    queryKey: ["user-profile"],
    queryFn: () => getUserProfile(),
  });

  if (isLoading) return <Loading />;
  return <div>{data?.name}</div>;
}
```

### Mutations

```typescript
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserProfile } from "@/module/settings/actions";

function UpdateButton() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateUserProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
    },
  });

  return (
    <button onClick={() => mutation.mutate({ name: "New Name" })}>
      Update
    </button>
  );
}
```
