# GitHub Integration

This document covers Inspectra's GitHub integration, including OAuth authentication, API usage, and webhook handling.

## Overview

Inspectra integrates with GitHub to:

1. **Authenticate users** via GitHub OAuth
2. **Access repositories** via the REST API (Octokit)
3. **Receive events** via webhooks for PR automation

---

## OAuth Authentication

### Setup

GitHub OAuth is handled by **Better Auth** with the GitHub provider.

#### Configuration

```typescript
// /lib/auth.ts
import { betterAuth } from "better-auth";
import { github } from "better-auth/providers/github";

export const auth = betterAuth({
  // ...
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      scope: ["read:user", "user:email", "repo"],
    },
  },
});
```

#### Required Scopes

| Scope        | Purpose                                        |
| ------------ | ---------------------------------------------- |
| `read:user`  | Access user profile information                |
| `user:email` | Access user email addresses                    |
| `repo`       | Full access to private and public repositories |

### Creating a GitHub OAuth App

1. Go to **GitHub Settings** → **Developer settings** → **OAuth Apps**
2. Click **New OAuth App**
3. Fill in the details:
   - **Application name**: Inspectra
   - **Homepage URL**: `http://localhost:3000` (or production URL)
   - **Authorization callback URL**: `http://localhost:3000/api/auth/callback/github`
4. Copy the **Client ID** and **Client Secret** to your `.env` file

---

## GitHub API (Octokit)

### Client Setup

```typescript
// /module/github/lib/github.ts
import { Octokit } from "octokit";

const octokit = new Octokit({
  auth: token, // User's access token from Account table
});
```

### Key Functions

#### Get GitHub Token

Retrieves the user's GitHub access token from the database:

```typescript
export const getGithubToken = async (): Promise<string | null> => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) return null;

  const account = await prisma.account.findFirst({
    where: {
      userId: session.user.id,
      providerId: "github",
    },
  });

  return account?.accessToken ?? null;
};
```

#### Fetch User Contributions

Fetches contribution data using GitHub's GraphQL API:

```typescript
export const fetchUserContribution = async (
  token: string,
  username: string,
) => {
  const octokit = new Octokit({ auth: token });

  const { user } = await octokit.graphql<ContributionData>(
    `
    query($username: String!) {
      user(login: $username) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
                color
              }
            }
          }
        }
      }
    }
  `,
    { username },
  );

  return user.contributionsCollection.contributionCalendar;
};
```

#### List Repositories

Fetches paginated list of user repositories:

```typescript
export const getRepositories = async (
  page: number = 1,
  perPage: number = 10,
) => {
  const token = await getGithubToken();
  if (!token) throw new Error("No token found");

  const octokit = new Octokit({ auth: token });

  const { data } = await octokit.rest.repos.listForAuthenticatedUser({
    visibility: "all",
    sort: "updated",
    direction: "desc",
    per_page: perPage,
    page: page,
  });

  return data;
};
```

#### Get Repository Contents

Recursively fetches all files from a repository:

```typescript
export const getRepoFileContents = async (
  token: string,
  owner: string,
  repo: string,
  path: string = "",
): Promise<{ path: string; content: string }[]> => {
  const octokit = new Octokit({ auth: token });

  const { data } = await octokit.rest.repos.getContent({
    owner,
    repo,
    path,
  });

  // Handle single file
  if (!Array.isArray(data)) {
    if (data.type === "file" && data.content) {
      return [
        {
          path: data.path,
          content: Buffer.from(data.content, "base64").toString("utf-8"),
        },
      ];
    }
    return [];
  }

  // Handle directory
  let files: { path: string; content: string }[] = [];

  for (const item of data) {
    if (item.type === "file") {
      // Skip binary files
      if (/\.(png|jpg|jpeg|gif|svg|ico|pdf|zip|tar|gz)$/i.test(item.path)) {
        continue;
      }

      // Fetch file content
      const { data: fileData } = await octokit.rest.repos.getContent({
        owner,
        repo,
        path: item.path,
      });

      if (!Array.isArray(fileData) && fileData.type === "file") {
        files.push({
          path: item.path,
          content: Buffer.from(fileData.content!, "base64").toString("utf-8"),
        });
      }
    } else if (item.type === "dir") {
      // Recurse into subdirectory
      const subFiles = await getRepoFileContents(token, owner, repo, item.path);
      files = files.concat(subFiles);
    }
  }

  return files;
};
```

---

## Webhooks

### Creating Webhooks

When a user connects a repository, we create a webhook:

```typescript
export const createWebhook = async (owner: string, repo: string) => {
  const token = await getGithubToken();
  if (!token) throw new Error("No token found");

  const octokit = new Octokit({ auth: token });

  const { data } = await octokit.rest.repos.createWebhook({
    owner,
    repo,
    name: "web",
    active: true,
    events: ["pull_request", "push"],
    config: {
      url: `${process.env.NEXT_PUBLIC_APP_BASE_URL}/api/webhooks/github`,
      content_type: "json",
      insecure_ssl: "0",
    },
  });

  return data;
};
```

### Deleting Webhooks

When a user disconnects a repository:

```typescript
export const deleteWebhook = async (owner: string, repo: string) => {
  const token = await getGithubToken();
  if (!token) return false;

  const octokit = new Octokit({ auth: token });

  // List all webhooks
  const { data: hooks } = await octokit.rest.repos.listWebhooks({
    owner,
    repo,
  });

  // Find our webhook
  const webhook = hooks.find((hook) =>
    hook.config.url?.includes(process.env.NEXT_PUBLIC_APP_BASE_URL!),
  );

  if (webhook) {
    await octokit.rest.repos.deleteWebhook({
      owner,
      repo,
      hook_id: webhook.id,
    });
  }

  return true;
};
```

### Webhook Handler

```typescript
// /app/api/webhooks/github/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const event = req.headers.get("x-github-event");

  // Handle different event types
  switch (event) {
    case "pull_request":
      await handlePullRequest(body);
      break;
    case "push":
      await handlePush(body);
      break;
    default:
      console.log(`Unhandled event: ${event}`);
  }

  return NextResponse.json({ received: true });
}

async function handlePullRequest(payload: any) {
  const { action, pull_request, repository } = payload;

  if (action === "opened" || action === "synchronize") {
    // Trigger AI review (future implementation)
    console.log(`PR ${action}: ${pull_request.title}`);
  }
}
```

---

## Rate Limiting

### GitHub API Limits

| Type                   | Limit             | Reset    |
| ---------------------- | ----------------- | -------- |
| Authenticated requests | 5,000/hour        | 1 hour   |
| GraphQL                | 5,000 points/hour | 1 hour   |
| Search API             | 30/minute         | 1 minute |

### Best Practices

1. **Cache responses** where possible
2. **Use conditional requests** with ETags
3. **Implement exponential backoff** for rate limit errors
4. **Monitor rate limit headers**:
   - `X-RateLimit-Limit`
   - `X-RateLimit-Remaining`
   - `X-RateLimit-Reset`

---

## Error Handling

### Common Errors

| Error               | Cause                         | Solution                              |
| ------------------- | ----------------------------- | ------------------------------------- |
| `401 Unauthorized`  | Invalid/expired token         | Refresh token or re-authenticate      |
| `403 Forbidden`     | Rate limited or missing scope | Wait for reset or request more scopes |
| `404 Not Found`     | Repo/resource doesn't exist   | Check ownership/permissions           |
| `422 Unprocessable` | Invalid payload               | Validate request data                 |

### Example Error Handler

```typescript
try {
  await octokit.rest.repos.getContent({ owner, repo, path });
} catch (error) {
  if (error.status === 404) {
    console.log("Repository or file not found");
  } else if (error.status === 403) {
    console.log("Rate limited or insufficient permissions");
  } else {
    throw error;
  }
}
```

---

## Security Considerations

1. **Never expose tokens** in client-side code
2. **Store tokens securely** in the database (consider encryption)
3. **Validate webhook signatures** (implementation needed)
4. **Use minimum required scopes**
5. **Implement token refresh** when expired
