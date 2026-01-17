# Inngest Background Jobs

This document covers Inspectra's background job system powered by Inngest for reliable, observable async processing.

## Overview

**Inngest** is used for:

- Repository indexing after connection
- (Future) AI code review generation
- (Future) Webhook event processing
- (Future) Scheduled maintenance tasks

---

## Why Inngest?

| Feature               | Benefit                                   |
| --------------------- | ----------------------------------------- |
| **Step Functions**    | Break complex jobs into recoverable steps |
| **Automatic Retries** | Built-in error recovery                   |
| **Local Dev Server**  | Test jobs locally without cloud           |
| **Observability**     | Built-in dashboard for monitoring         |
| **Event-Driven**      | Decouple triggers from handlers           |

---

## Setup

### 1. Inngest Client

```typescript
// /inngest/client.ts
import { Inngest } from "inngest";

export const inngest = new Inngest({ id: "inspectra" });
```

### 2. API Route Handler

```typescript
// /app/api/inngest/route.ts
import { serve } from "inngest/next";
import { inngest } from "@/inngest/client";
import { helloWorld, indexRepo } from "@/inngest/functions";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [helloWorld, indexRepo],
});
```

### 3. Development Server

```bash
npx inngest-cli@latest dev
```

This starts the Inngest dev server at `http://localhost:8288`

---

## Functions

### indexRepo

Triggered when a user connects a GitHub repository. Fetches all files and indexes them in Pinecone.

```typescript
// /inngest/functions/index.ts
import prisma from "@/lib/db";
import { inngest } from "../client";
import { getRepoFileContents } from "@/module/github/lib/github";
import { indexCodebase } from "@/module/github/lib/ai/lib/rag";

export const indexRepo = inngest.createFunction(
  { id: "index-repo" },
  { event: "repository.connected" },
  async ({ event, step }) => {
    const { owner, repo, userId } = event.data;

    // Step 1: Fetch all files
    const files = await step.run("fetch-files", async () => {
      const account = await prisma.account.findFirst({
        where: {
          userId,
          providerId: "github",
        },
      });

      if (!account) {
        throw new Error("No github access token found");
      }

      return await getRepoFileContents(account.accessToken!, owner, repo);
    });

    // Step 2: Index codebase to Pinecone
    await step.run("index-codebase", async () => {
      await indexCodebase(`${owner}/${repo}`, files);
    });

    return { success: true, indexedFiles: files.length };
  },
);
```

#### Event Schema

```typescript
type RepositoryConnectedEvent = {
  name: "repository.connected";
  data: {
    owner: string; // Repository owner (e.g., "krishna9358")
    repo: string; // Repository name (e.g., "inspectra")
    userId: string; // User ID from the database
  };
};
```

#### Triggering the Event

```typescript
// In server action
await inngest.send({
  name: "repository.connected",
  data: {
    owner,
    repo,
    userId: session.user.id,
  },
});
```

---

## Step Functions

### Why Steps?

Steps provide:

1. **Checkpointing**: If a step fails, retry from that step
2. **Visibility**: See progress in the Inngest dashboard
3. **Timeouts**: Each step can have its own timeout
4. **Parallelism**: Run steps in parallel when possible

### Step Types

#### step.run()

Execute a function and checkpoint the result:

```typescript
const result = await step.run("step-name", async () => {
  // Your logic here
  return someValue;
});
```

#### step.sleep()

Pause execution for a duration:

```typescript
await step.sleep("wait", "5m"); // Wait 5 minutes
```

#### step.sleepUntil()

Pause until a specific time:

```typescript
await step.sleepUntil("wait-for", new Date("2024-12-31T00:00:00Z"));
```

#### step.waitForEvent()

Wait for another event:

```typescript
const event = await step.waitForEvent("wait-for-approval", {
  event: "review.approved",
  timeout: "1h",
  match: "data.reviewId",
});
```

---

## Event Patterns

### Fire and Forget

Send event and don't wait for completion:

```typescript
await inngest.send({
  name: "repository.connected",
  data: { owner, repo, userId },
});
// Returns immediately
```

### Multiple Events

Send multiple events at once:

```typescript
await inngest.send([
  { name: "event.one", data: { ... } },
  { name: "event.two", data: { ... } },
]);
```

### Fan-out Pattern

Trigger multiple functions from one event:

```typescript
// Both functions listen to the same event
export const functionA = inngest.createFunction(
  { id: "function-a" },
  { event: "shared.trigger" },
  async ({ event }) => {
    /* ... */
  },
);

export const functionB = inngest.createFunction(
  { id: "function-b" },
  { event: "shared.trigger" },
  async ({ event }) => {
    /* ... */
  },
);
```

---

## Configuration

### Function Options

```typescript
inngest.createFunction(
  {
    id: "my-function",
    name: "My Function", // Display name
    retries: 3, // Max retries (default: 4)
    concurrency: {
      limit: 5, // Max concurrent executions
      key: "event.data.userId", // Concurrency key
    },
    throttle: {
      limit: 10,
      period: "1m", // Rate limit
    },
  },
  { event: "my.event" },
  handler,
);
```

### Retry Configuration

```typescript
{
  retries: 5,
  backoff: {
    type: "exponential",
    base: 1000,    // Start at 1 second
    factor: 2,     // Double each retry
    max: 60000,    // Cap at 1 minute
  },
}
```

---

## Monitoring

### Local Dashboard

Access at `http://localhost:8288` when running:

```bash
npx inngest-cli@latest dev
```

### Dashboard Features

- **Functions Tab**: See all registered functions
- **Events Tab**: View incoming events
- **Runs Tab**: Monitor function executions
- **Logs**: View step-by-step execution logs

### Example Log Output

```
[20:21:49.606] INF received event event=repository.connected
[20:21:49.607] INF initializing fn function=index-repo
[20:22:22.736] INF received event event=inngest/function.finished
```

---

## Error Handling

### Automatic Retries

Inngest automatically retries failed steps:

```typescript
await step.run("might-fail", async () => {
  const result = await riskyOperation();
  if (!result) {
    throw new Error("Operation failed"); // Will retry
  }
  return result;
});
```

### Non-Retriable Errors

Use `NonRetriableError` for permanent failures:

```typescript
import { NonRetriableError } from "inngest";

await step.run("check-permission", async () => {
  if (!hasPermission) {
    throw new NonRetriableError("User lacks permission");
  }
});
```

### Error Recovery

```typescript
try {
  await step.run("risky-step", async () => {
    // Might fail
  });
} catch (error) {
  // Handle or compensate
  await step.run("cleanup", async () => {
    // Cleanup logic
  });
}
```

---

## Future Functions

### reviewPullRequest (Planned)

```typescript
export const reviewPullRequest = inngest.createFunction(
  { id: "review-pull-request" },
  { event: "github.pull_request" },
  async ({ event, step }) => {
    const { owner, repo, pullNumber } = event.data;

    // Step 1: Fetch PR diff
    const diff = await step.run("fetch-diff", async () => {
      return await fetchPRDiff(owner, repo, pullNumber);
    });

    // Step 2: Retrieve context
    const context = await step.run("retrieve-context", async () => {
      return await retrieveContext(diff, `${owner}/${repo}`);
    });

    // Step 3: Generate review
    const review = await step.run("generate-review", async () => {
      return await generateReview(diff, context);
    });

    // Step 4: Post to GitHub
    await step.run("post-review", async () => {
      await postReviewToGitHub(owner, repo, pullNumber, review);
    });

    return { success: true };
  },
);
```

### syncRepository (Planned)

```typescript
export const syncRepository = inngest.createFunction(
  {
    id: "sync-repository",
    throttle: { limit: 1, period: "1h", key: "event.data.repoId" },
  },
  { event: "repository.sync" },
  async ({ event, step }) => {
    // Incremental sync of changed files
  },
);
```

---

## Best Practices

### 1. Keep Steps Small

Each step should be a single, atomic operation:

```typescript
// Good
await step.run("fetch", async () => fetchData());
await step.run("process", async () => processData());
await step.run("save", async () => saveData());

// Bad
await step.run("do-everything", async () => {
  fetchData();
  processData();
  saveData();
});
```

### 2. Use Meaningful IDs

```typescript
// Good
{
  id: "index-repo";
}
{
  id: "review-pull-request";
}

// Bad
{
  id: "fn1";
}
{
  id: "handler";
}
```

### 3. Add Timeouts for External Calls

```typescript
await step.run("external-api", async () => {
  return await fetchWithTimeout(url, { timeout: 30000 });
});
```

### 4. Log Important Information

```typescript
await step.run("process", async () => {
  console.log(`Processing ${files.length} files`);
  // ...
});
```
