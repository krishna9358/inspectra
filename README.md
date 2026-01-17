<div align="center">
  <h1>🔍 Inspectra</h1>
  <p><strong>AI-Powered Code Review & Repository Intelligence Platform</strong></p>
  
  <p>
    <a href="#features">Features</a> •
    <a href="#tech-stack">Tech Stack</a> •
    <a href="#architecture">Architecture</a> •
    <a href="#getting-started">Getting Started</a> •
    <a href="#documentation">Documentation</a>
  </p>

  <img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js" alt="Next.js 16">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react" alt="React 19">
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/Tailwind-4-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind 4">
</div>

---

## 📖 Overview

**Inspectra** is an intelligent, AI-powered code review assistant and repository management platform designed to streamline your development workflow. By leveraging advanced LLMs (Google Gemini) and RAG (Retrieval-Augmented Generation) technology with Pinecone vector database, Inspectra provides deep, context-aware insights into your code, automates reviews, and offers comprehensive analytics for your GitHub repositories.

### Why Inspectra?

- 🤖 **Context-Aware AI Reviews**: Unlike generic code reviewers, Inspectra indexes your entire codebase to understand project patterns and conventions
- 🔗 **Deep GitHub Integration**: Seamless webhook-based automation for real-time PR reviews
- 📊 **Rich Analytics**: Comprehensive dashboards with contribution graphs and activity metrics
- ⚡ **Background Processing**: Inngest-powered async jobs for reliable, scalable operations

---

## ✨ Features

### 🔍 AI-Powered Code Reviews

- Automated review generation for Pull Requests using Google Gemini AI
- RAG-based context retrieval from your indexed codebase via Pinecone
- Rich feedback including walkthroughs, summaries, issue identification, and suggestions

### 🔗 GitHub Integration

- OAuth-based authentication via GitHub
- Multi-repository management with connect/disconnect workflow
- Webhook automation for real-time PR handling
- Direct comments and reviews posted to GitHub PRs

### 🧠 RAG Implementation

- Automatic codebase indexing using vector embeddings
- Semantic search across your entire project
- Context-aware code understanding for accurate reviews

### 📊 Dashboard & Analytics

- Real-time statistics on repositories, commits, and PRs
- Interactive contribution graphs (GitHub-style activity calendar)
- Monthly activity breakdowns and trend analysis

### 🔐 Authentication & User Management

- Secure GitHub OAuth via Better Auth
- Profile management and customization
- Session handling with automatic token refresh

### ⚙️ Background Processing

- Inngest-powered async job processing
- Repository indexing workflows
- Reliable webhook event handling

---

## 🛠️ Tech Stack

### Frontend

| Technology         | Purpose                         |
| ------------------ | ------------------------------- |
| **Next.js 16**     | React framework with App Router |
| **React 19**       | UI library with latest features |
| **TypeScript**     | Type-safe development           |
| **Tailwind CSS 4** | Utility-first styling           |
| **shadcn/ui**      | Pre-built accessible components |
| **Radix UI**       | Headless UI primitives          |
| **TanStack Query** | Server state management         |
| **Recharts**       | Data visualization              |
| **Framer Motion**  | Animations                      |

### Backend

| Technology             | Purpose                    |
| ---------------------- | -------------------------- |
| **Next.js API Routes** | RESTful API endpoints      |
| **Server Actions**     | Type-safe server mutations |
| **Prisma ORM**         | Database access layer      |
| **PostgreSQL**         | Primary database           |
| **Pinecone**           | Vector database for RAG    |
| **Inngest**            | Background job processing  |
| **Better Auth**        | Authentication system      |

### AI & Machine Learning

| Technology             | Purpose                  |
| ---------------------- | ------------------------ |
| **Google Gemini AI**   | LLM for code analysis    |
| **text-embedding-004** | Embedding generation     |
| **Vercel AI SDK**      | AI integration framework |
| **Pinecone**           | Vector similarity search |

### Integrations

| Technology          | Purpose                  |
| ------------------- | ------------------------ |
| **Octokit**         | GitHub API client        |
| **GitHub Webhooks** | Real-time event handling |
| **Zod**             | Schema validation        |
| **React Hook Form** | Form handling            |

---

## 🏗️ Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────────────────────┐
│                              USER BROWSER                                │
│                                                                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌─────────────┐ │
│  │   Landing    │  │  Dashboard   │  │ Repository   │  │  Settings   │ │
│  │    Page      │  │    Page      │  │    Page      │  │    Page     │ │
│  └──────────────┘  └──────────────┘  └──────────────┘  └─────────────┘ │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                           NEXT.JS APP ROUTER                             │
│                                                                         │
│  ┌────────────────────────────────────────────────────────────────────┐ │
│  │                        API ROUTES                                   │ │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐               │ │
│  │  │ /api/auth   │  │/api/webhooks│  │ /api/inngest│               │ │
│  │  │ (Better Auth│  │  (GitHub)   │  │  (Jobs)     │               │ │
│  │  └─────────────┘  └─────────────┘  └─────────────┘               │ │
│  └────────────────────────────────────────────────────────────────────┘ │
│                                                                         │
│  ┌────────────────────────────────────────────────────────────────────┐ │
│  │                      SERVER ACTIONS                                │ │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐               │ │
│  │  │ Repository  │  │  Settings   │  │  Dashboard  │               │ │
│  │  │  Actions    │  │  Actions    │  │  Actions    │               │ │
│  │  └─────────────┘  └─────────────┘  └─────────────┘               │ │
│  └────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                    ┌───────────────┼───────────────┐
                    ▼               ▼               ▼
           ┌──────────────┐ ┌─────────────┐ ┌─────────────────┐
           │  PostgreSQL  │ │  Pinecone   │ │    Inngest      │
           │  (Prisma)    │ │  (Vectors)  │ │ (Background Jobs│
           └──────────────┘ └─────────────┘ └─────────────────┘
                                                    │
                                                    ▼
                                          ┌─────────────────┐
                                          │  Google Gemini  │
                                          │   (AI/LLM)      │
                                          └─────────────────┘
```

### Data Flow: Repository Connection & Indexing

```
┌──────────┐    ┌────────────┐    ┌─────────────┐    ┌──────────────┐
│  User    │───▶│ Connect    │───▶│  Create     │───▶│   Trigger    │
│  Clicks  │    │ Repository │    │  Webhook    │    │   Inngest    │
│ "Connect"│    │  Action    │    │  on GitHub  │    │    Event     │
└──────────┘    └────────────┘    └─────────────┘    └──────────────┘
                                                            │
                                                            ▼
┌──────────┐    ┌────────────┐    ┌─────────────┐    ┌──────────────┐
│ Stored   │◀──│  Upsert    │◀──│  Generate   │◀──│  Fetch All   │
│   in     │    │ to Pinecone│    │ Embeddings  │    │  Repo Files  │
│ Pinecone │    │  (Batched) │    │ (Google AI) │    │  (Octokit)   │
└──────────┘    └────────────┘    └─────────────┘    └──────────────┘
```

---

## 📁 Project Structure

```
inspectra/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Authentication routes
│   │   └── login/                # Login page
│   ├── (dashboard)/              # Protected dashboard routes
│   │   ├── dashboard/            # Main dashboard
│   │   ├── repository/           # Repository management
│   │   └── settings/             # User settings
│   ├── api/                      # API routes
│   │   ├── auth/                 # Better Auth endpoints
│   │   ├── inngest/              # Inngest webhook handler
│   │   └── webhooks/github/      # GitHub webhook receiver
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Landing page
│
├── components/                   # React components
│   ├── ui/                       # shadcn/ui components
│   └── landing/                  # Landing page components
│
├── inngest/                      # Background job definitions
│   ├── client.ts                 # Inngest client
│   └── functions/                # Job functions
│       └── index.ts              # Repository indexing jobs
│
├── lib/                          # Shared utilities
│   ├── auth.ts                   # Better Auth configuration
│   ├── db.ts                     # Prisma client
│   ├── pinecone.ts               # Pinecone client
│   └── generated/prisma/         # Generated Prisma client
│
├── module/                       # Feature modules
│   ├── auth/                     # Auth components & hooks
│   ├── dashboard/                # Dashboard components
│   ├── github/                   # GitHub integration
│   │   └── lib/
│   │       ├── github.ts         # Octokit utilities
│   │       └── ai/lib/rag.ts     # RAG implementation
│   ├── repository/               # Repository management
│   └── settings/                 # Settings management
│
├── prisma/                       # Database schema
│   └── schema.prisma             # Prisma schema definition
│
├── providers/                    # React context providers
├── public/                       # Static assets
└── docs/                         # Documentation
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or later, LTS recommended)
- **Bun** (recommended) or npm/pnpm
- **PostgreSQL** database
- **GitHub Account** with OAuth App credentials
- **Google AI (Gemini)** API Key
- **Pinecone** API Key and Index

### Environment Variables

Create a `.env` file in the root directory:

```bash
# Database
DATABASE_URL="postgresql://user:password@host:5432/database?sslmode=require"

# Better Auth
BETTER_AUTH_SECRET="your-secret-key"
BETTER_AUTH_URL="http://localhost:3000"

# GitHub OAuth
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"

# AI & Vector Database
GOOGLE_API_KEY="your-google-ai-api-key"
PINECONE_DB_API_KEY="your-pinecone-api-key"

# Application
NEXT_PUBLIC_APP_BASE_URL="http://localhost:3000"
```

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/krishna9358/inspectra.git
   cd inspectra
   ```

2. **Install dependencies**

   ```bash
   bun install
   # or
   npm install
   ```

3. **Set up the database**

   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. **Start the development server**

   ```bash
   bun run dev
   ```

5. **Start Inngest Dev Server** (in a separate terminal)

   ```bash
   npx inngest-cli@latest dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 📚 Documentation

Detailed documentation is available in the [`/docs`](/docs) directory:

- [**Architecture Overview**](/docs/ARCHITECTURE.md) - System design and data flow
- [**API Reference**](/docs/API.md) - API endpoints and server actions
- [**GitHub Integration**](/docs/GITHUB_INTEGRATION.md) - Webhooks and OAuth setup
- [**RAG Implementation**](/docs/RAG.md) - Vector embeddings and retrieval
- [**Inngest Jobs**](/docs/INNGEST.md) - Background job processing
- [**Database Schema**](/docs/DATABASE.md) - Prisma models and relationships

---

## 🧪 Development

### Available Scripts

| Script             | Description              |
| ------------------ | ------------------------ |
| `bun run dev`      | Start development server |
| `bun run build`    | Build for production     |
| `bun run start`    | Start production server  |
| `bun run lint`     | Run ESLint               |
| `bun run test`     | Run tests                |
| `bun run prettier` | Format code              |

### Running Tests

```bash
bun run test
```

---

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines before submitting a PR.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <p>Built with ❤️ by <a href="https://github.com/krishna9358">Krishna Mohan</a></p>
</div>
