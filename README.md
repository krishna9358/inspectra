# Inspectra

**Inspectra** is an intelligent, AI-powered code review assistant and repository management platform designed to streamline your development workflow. By leveraging advanced LLMs (Gemini 2.5) and RAG technology, Inspectra provides deep, context-aware insights into your code, automates reviews, and offers comprehensive analytics for your GitHub repositories.

---

## Tech Stack

### Frontend

- **Framework**: Next.js 16
- **Library**: React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui, Radix UI
- **Visualization**: Recharts (Charts), Lucide React (Icons)
- **Forms**: React Hook Form + Zod validation

### Backend

- **Runtime**: Next.js API Routes, Server Actions
- **Database**: PostgreSQL with Prisma ORM
- **Vector Database**: Pinecone (for RAG implementation)
- **Authentication**: Better Auth
- **Payments**: Polar (Subscription management)
- **Background Jobs**: Inngest (Async processing)

### AI & Machine Learning

- **Model**: Google Gemini AI (Gemini 2.5 Flash)
- **Embeddings**: text-embedding-004
- **Framework**: LangChain/Custom RAG Implementation

### Integrations & Tools

- **Data Fetching**: TanStack Query (React Query)
- **GitHub**: Octokit API for deep integration
- **Testing**: Jest

---

## Key Features

### 1. AI-Powered Code Reviews

- **Automated Generation**: Automatically generates detailed code reviews for Pull Requests.
- **RAG Context**: Uses Pinecone vector database to understand the entire codebase context, ensuring reviews are relevant and aware of project patterns.
- **Rich Feedback**: Reviews include walkthroughs, sequence diagrams, detailed summaries, strengths, issue identification, and constructive suggestions.
- **Creative Touch**: Even includes poems about your code!

### 2. Deep GitHub Integration

- **Multi-Repo Management**: Connect and manage multiple repositories seamlessly.
- **Webhook Automation**: Automatically handles webhook events for PRs.
- **Real-Time Updates**: Triggers review generation instantly when a PR is opened or updated.
- **Direct Interaction**: Posts reviews and comments directly to GitHub PRs.

### 3. Advanced RAG Implementation

- **Automatic Indexing**: Generates and stores vector embeddings for your codebase.
- **Semantic Search**: Enables semantic search capability across your entire project.
- **Context Retrieval**: Retrieves relevant code snippets to provide the AI with the necessary context for accurate reviews.

### 4. Dashboard & Analytics

- **Activity Hub**: View real-time statistics on repositories, commits, PRs, and reviews.
- **Visualization**: Interactive contribution graphs and monthly activity breakdowns.
- **Insights**: Track commit frequency, PR volume, and review activity over time.

### 5. Comprehensive Review Management

- **History Tracking**: Keep a complete history of all generated reviews.
- **Status Monitoring**: Track reviews by status (completed, pending, failed).
- **Access Control**: View full review content or jump directly to the PR on GitHub.

### 6. Repository Management

- **Centralized Hub**: Browse, search, and filter all your connected GitHub repositories.
- **Easy Connection**: Simple connect/disconnect workflow for repositories.
- **Infinite Scrolling**: Smooth navigation through large lists of repositories.

### 7. Subscription & Billing

- **Tiered Access**:
  - **Free Tier**: Manage up to 5 repositories with 5 reviews per repo.
  - **Pro Tier**: Unlimited repositories and reviews.
- **Polar Integration**: Seamless subscription management and limits enforcement.

### 8. User & Session Management

- **Better Auth**: Secure and modern authentication system.
- **Profile Management**: Customizable user profiles and settings.
- **Usage Tracking**: Monitor your specific usage and limits.

### 9. Background Processing (Inngest)

- **Reliable Jobs**: Handles complex tasks like checking out repositories, generating embeddings, and processing reviews in the background.
- **Concurrency Control**: Ensures system stability under load.

### 10. Modern UI/UX

- **Responsive Design**: Mobile-first approach.
- **Dark Mode**: Fully supported dark mode.
- **Interaction**: Loading states, skeletons, and toast notifications for a smooth user experience.

---

## Getting Started

### Prerequisites

- Node.js (Latest LTS recommended)
- PostgreSQL Database
- Redis (Optional, for advanced caching/queues if needed)
- GitHub Account & App Credentials
- Google AI (Gemini) API Key
- Pinecone API Key
- Polar API Key

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/krishna9358/inspectra.git
   cd inspectra
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Set up Environment Variables**
   Create a `.env` file in the root directory and add the necessary API keys and database URLs.

4. **Initialize Database**

   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the Development Server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to view the application.

## Running Tests

```bash
npm run test
```

## License

[MIT](LICENSE)
