# Fluxly

> AI-powered visual web builder for Next.js + TailwindCSS

Fluxly is an open-source visual development environment that combines the power of AI with a Figma-like interface for building Next.js applications. Design visually, edit code directly, and deploy in seconds.

## 🚀 Quick Start

### Prerequisites

- [Bun](https://bun.sh/) v1.3.1 or later
- [Supabase CLI](https://supabase.com/docs/guides/cli)
- [Docker](https://www.docker.com/) (optional)

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/fluxly.git
   cd fluxly
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Start local Supabase**
   ```bash
   cd apps/backend
   supabase start
   ```

   Copy the `anon key` and `service_role key` from the output.

4. **Configure environment variables**

   Create `apps/web/client/.env`:
   ```env
   # Supabase (from step 3)
   NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
   SUPABASE_DATABASE_URL=postgresql://postgres:postgres@127.0.0.1:54322/postgres
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

   # Required - AI Provider
   OPENROUTER_API_KEY=your_openrouter_key

   # Required - Sandbox
   CSB_API_KEY=your_codesandbox_key

   # Optional - Additional AI providers
   ANTHROPIC_API_KEY=your_anthropic_key
   OPENAI_API_KEY=your_openai_key
   ```

   Create `apps/backend/.env`:
   ```env
   # OAuth (optional)
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_SECRET=your_google_secret
   GITHUB_CLIENT_ID=your_github_client_id
   GITHUB_SECRET=your_github_secret
   ```

5. **Push database schema**
   ```bash
   bun run db:push
   ```

6. **Start the development server**
   ```bash
   bun run dev
   ```

7. **Open the app**

   Navigate to `http://localhost:3000` and sign in!

## ✨ What you can do with Fluxly

- [x] **Create Next.js apps in seconds**
  - [x] Start from text or image
  - [x] Use prebuilt templates
  - [ ] Import from Figma
  - [ ] Import from GitHub repo
  - [ ] Make a PR to a GitHub repo

- [x] **Visually edit your app**
  - [x] Use Figma-like UI
  - [x] Preview your app in real-time
  - [x] Manage brand assets and tokens
  - [x] Create and navigate to Pages
  - [x] Browse layers
  - [x] Manage project Images
  - [x] Detect and use Components
  - [x] Drag-and-drop Components Panel
  - [x] Use Branching to experiment with designs

- [x] **Development Tools**
  - [x] Real-time code editor
  - [x] Save and restore from checkpoints
  - [x] Run commands via CLI
  - [x] Connect with app marketplace

- [x] **Deploy your app in seconds**
  - [x] Generate sharable links
  - [x] Link your custom domain

- [ ] **Collaborate with your team**
  - [x] Real-time editing
  - [ ] Leave comments

- [ ] **Advanced AI capabilities**
  - [x] Queue multiple messages at once
  - [ ] Use Images as references and as assets in a project
  - [ ] Setup and use MCPs in projects
  - [ ] Allow Fluxly to use itself as a toolcall for branch creation and iteration

- [ ] **Advanced project support**
  - [ ] Support non-NextJS projects
  - [ ] Support non-Tailwind projects

## 🏗️ Tech Stack

### Frontend
- [Next.js](https://nextjs.org/) - React framework
- [TailwindCSS](https://tailwindcss.com/) - Styling
- [tRPC](https://trpc.io/) - Type-safe API

### Backend
- [Supabase](https://supabase.com/) - Auth, Database, Storage
- [Drizzle](https://orm.drizzle.team/) - ORM

### AI & Tooling
- [AI SDK](https://ai-sdk.dev/) - LLM client
- [OpenRouter](https://openrouter.ai/) - LLM model provider
- [Morph Fast Apply](https://morphllm.com) - Fast apply model provider
- [Relace](https://relace.ai) - Fast apply model provider

### Sandbox & Hosting
- [CodeSandboxSDK](https://codesandbox.io/docs/sdk) - Dev sandbox
- [Freestyle](https://www.freestyle.sh/) - Hosting

### Development
- [Bun](https://bun.sh/) - Runtime, bundler, package manager
- [Docker](https://www.docker.com/) - Container management

## 🛠️ Development Commands

```bash
# Development
bun run dev              # Start dev server
bun run build            # Build for production
bun run start            # Start production server

# Database
bun run db:push          # Push schema to database
bun run db:seed          # Seed database
bun run db:migrate       # Run migrations

# Quality
bun run typecheck        # Run TypeScript checks
bun test                 # Run tests
bun run lint             # Lint code
bun run format           # Format code

# Docker
bun run docker:build     # Build Docker image
bun run docker:up        # Start containers
bun run docker:down      # Stop containers
bun run docker:logs      # View logs
```

## 📖 Documentation

For detailed documentation, visit the official docs (coming soon).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

Distributed under the Apache 2.0 License. See [LICENSE.md](LICENSE.md) for more information.
