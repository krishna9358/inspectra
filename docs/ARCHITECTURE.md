# Architecture Overview

This document provides a comprehensive overview of Inspectra's system architecture, data flow, and design decisions.

## Table of Contents

- [System Architecture](#system-architecture)
- [Core Components](#core-components)
- [Data Flow](#data-flow)
- [Technology Choices](#technology-choices)
- [Scalability Considerations](#scalability-considerations)

---

## System Architecture

Inspectra follows a **modular monolith** architecture built on Next.js 16 App Router, leveraging server components, server actions, and API routes for a full-stack TypeScript application.

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                 CLIENT LAYER                                 │
│                                                                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐│
│  │   React     │  │  TanStack   │  │   Framer    │  │     shadcn/ui      ││
│  │ Components  │  │   Query     │  │   Motion    │  │   + Radix UI       ││
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────────────┘│
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                              NEXT.JS APP ROUTER                              │
│                                                                             │
│  ┌───────────────────────────────────────────────────────────────────────┐ │
│  │                         ROUTE GROUPS                                   │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐               │ │
│  │  │   (auth)     │  │ (dashboard)  │  │     api      │               │ │
│  │  │   routes     │  │   routes     │  │   routes     │               │ │
│  │  └──────────────┘  └──────────────┘  └──────────────┘               │ │
│  └───────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│  ┌───────────────────────────────────────────────────────────────────────┐ │
│  │                        SERVER ACTIONS                                  │ │
│  │  Located in: /module/{feature}/actions/index.ts                       │ │
│  └───────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                    ┌─────────────────┼─────────────────┐
                    ▼                 ▼                 ▼
           ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
           │  PostgreSQL  │  │   Pinecone   │  │   Inngest    │
           │   (Neon)     │  │   (Vectors)  │  │    (Jobs)    │
           └──────────────┘  └──────────────┘  └──────────────┘
                                                      │
                                                      ▼
                                            ┌──────────────┐
                                            │ Google Gemini│
                                            │     AI       │
                                            └──────────────┘
```

---

## Core Components

### 1. Frontend Layer

#### React Components (`/components`)

- **UI Components** (`/components/ui/`): shadcn/ui components built on Radix UI primitives
- **Landing Components** (`/components/landing/`): Marketing page components
- **Layout Components**: Shared layout components (headers, sidebars)

#### Feature Modules (`/module`)

Each feature is organized as a self-contained module:

```
module/{feature}/
├── actions/           # Server actions
│   └── index.ts
├── components/        # Feature-specific components
├── hooks/             # Custom React hooks
└── lib/               # Utility functions
```

### 2. Routing Layer

#### Route Groups

- **`(auth)`**: Public authentication routes (login)
- **`(dashboard)`**: Protected routes requiring authentication
  - `/dashboard` - Main dashboard with analytics
  - `/repository` - Repository management
  - `/settings` - User profile and preferences

#### API Routes (`/app/api`)

- **`/api/auth/[...all]`**: Better Auth handler for OAuth flows
- **`/api/webhooks/github`**: GitHub webhook receiver for PR events
- **`/api/inngest`**: Inngest webhook handler for background jobs

### 3. Data Layer

#### Prisma ORM

- Schema defined in `/prisma/schema.prisma`
- Generated client in `/lib/generated/prisma`
- Models: `User`, `Account`, `Session`, `Repository`, `Verification`

#### Database Connections

```typescript
// /lib/db.ts
import { PrismaClient } from "@/lib/generated/prisma";

const prisma = new PrismaClient();
export default prisma;
```

### 4. AI/ML Layer

#### RAG Implementation (`/module/github/lib/ai/lib/rag.ts`)

- **Embedding Generation**: Uses Google's text-embedding-004 model
- **Vector Storage**: Pinecone for similarity search
- **Context Retrieval**: Fetches relevant code snippets for AI context

```typescript
// Embedding flow
Text → Google AI Embedding → 768-dim Vector → Pinecone Upsert
```

### 5. Background Processing

#### Inngest (`/inngest`)

- **Client**: `/inngest/client.ts` - Inngest instance configuration
- **Functions**: `/inngest/functions/index.ts` - Job definitions

Current Jobs:

- `repository.connected`: Triggered when user connects a repo
  - Fetches all repository files via GitHub API
  - Generates embeddings for each file
  - Stores vectors in Pinecone

---

## Data Flow

### User Authentication Flow

```
┌──────────┐     ┌──────────────┐     ┌─────────────┐     ┌──────────────┐
│  User    │────▶│ Login Page   │────▶│ Better Auth │────▶│ GitHub OAuth │
│  Clicks  │     │ /login       │     │ /api/auth   │     │              │
│ "Login"  │     │              │     │             │     │              │
└──────────┘     └──────────────┘     └─────────────┘     └──────────────┘
                                                                  │
                                                                  ▼
┌──────────┐     ┌──────────────┐     ┌─────────────┐     ┌──────────────┐
│Dashboard │◀────│   Session    │◀────│   Account   │◀────│ OAuth Token  │
│ Redirect │     │   Created    │     │   Created   │     │   Stored     │
└──────────┘     └──────────────┘     └─────────────┘     └──────────────┘
```

### Repository Connection Flow

```
1. User clicks "Connect" on a repository
                    │
                    ▼
2. Server Action: connectRepository()
   - Creates webhook on GitHub repo
   - Saves repository to database
   - Triggers Inngest event: "repository.connected"
                    │
                    ▼
3. Inngest Function: indexRepo
   Step 1: fetch-files
   - Retrieves GitHub access token from Account
   - Fetches all files recursively via Octokit
   - Returns array of { path, content }
                    │
                    ▼
   Step 2: index-codebase
   - Generates embeddings for each file
   - Batches vectors (100 per batch)
   - Upserts to Pinecone index
                    │
                    ▼
4. Repository is now indexed and searchable
```

### GitHub Webhook Flow

```
┌────────────┐     ┌─────────────────┐     ┌──────────────────┐
│   GitHub   │────▶│ /api/webhooks/  │────▶│ Validate Webhook │
│ PR Event   │     │ github/route.ts │     │    Signature     │
└────────────┘     └─────────────────┘     └──────────────────┘
                                                    │
                                                    ▼
                                           ┌──────────────────┐
                                           │  Process Event   │
                                           │ (PR opened, etc) │
                                           └──────────────────┘
                                                    │
                                                    ▼
                                           ┌──────────────────┐
                                           │ Trigger AI Review│
                                           │    (Future)      │
                                           └──────────────────┘
```

---

## Technology Choices

### Why Next.js 16?

- **App Router**: Modern routing with layouts and server components
- **Server Actions**: Type-safe server mutations without API boilerplate
- **React 19**: Latest React features including concurrent rendering
- **Turbopack**: Fast development builds

### Why Prisma?

- **Type Safety**: Fully typed database queries
- **Migrations**: Version-controlled schema changes
- **Multi-DB Support**: Easy to switch databases if needed

### Why Pinecone?

- **Managed Service**: No infrastructure to maintain
- **Fast Similarity Search**: Sub-second query times
- **Metadata Filtering**: Filter by repoId, path, etc.

### Why Inngest?

- **Reliable**: Automatic retries and error handling
- **Observable**: Built-in monitoring and debugging
- **Step Functions**: Break complex jobs into steps
- **Local Development**: Dev server for testing

### Why Better Auth?

- **GitHub OAuth**: Built-in provider support
- **Session Management**: Secure, httpOnly cookies
- **Database Adapters**: Works with Prisma

---

## Scalability Considerations

### Current Architecture

The current setup is designed for small to medium usage:

- Single PostgreSQL database
- Single Pinecone index
- Inngest handles concurrency

### Future Scaling Options

1. **Database**
   - Read replicas for heavy read workloads
   - Connection pooling (already supported via Neon)

2. **Vector Database**
   - Pinecone supports horizontal scaling
   - Consider sharding by organization for multi-tenant

3. **Background Jobs**
   - Inngest scales automatically
   - Can add more workers if needed

4. **API Rate Limiting**
   - Consider adding rate limiting for API routes
   - GitHub API has rate limits (5000 req/hour for authenticated)

5. **Caching**
   - Add Redis for session caching
   - Cache GitHub API responses
   - Cache embedding results for unchanged files
