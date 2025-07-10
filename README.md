<div align="center">
  <img src="apps/web/app/icon.svg" alt="Eight Logo" width="60" height="74">
  <h1>Eight</h1>
  <p><strong>Photos you can actually search</strong></p>
  <p>Find your memories instantly with AI-powered photo search that actually understands what's in your pictures.</p>
</div>

---

## Features

- **AI-Powered Search** - Search photos by content, not just filenames
- **Privacy-First** - Self-hostable with Docker for complete control
- **Smart Organization** - Automatic tagging and categorization
- **Modern Stack** - Built with Next.js, Hono, and PostgreSQL
- **Responsive Design** - Beautiful UI that works on all devices

## Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) (v20 or newer)
- [pnpm](https://pnpm.io/) (v10 or newer)
- [Docker](https://www.docker.com/) (for local database)

### 1. Clone the Repository

```bash
git clone https://github.com/your-org/eight.git
cd eight
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Set Up Environment and Database

We use Docker to run a PostgreSQL database for local development. The setup script will handle everything for you:

```bash
pnpm run setup
```

This will:
- Create a `.env` file with default development settings
- Install all dependencies
- Start a PostgreSQL container with credentials:
  - Host: `localhost`
  - Port: `5432`
  - Database: `eight`
  - Username: `postgres`
  - Password: `postgres`
- Push the database schema

### 4. Start Development

```bash
pnpm run dev      # Start all services
# OR run services individually:
pnpm run web      # Start only frontend (http://localhost:3000)
pnpm run server   # Start only backend (http://localhost:1284)
```

Your app will be running at:
- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Backend**: [http://localhost:1284](http://localhost:1284)

### 5. Verify Database Connection (Optional)

```bash
# View database in Drizzle Studio
pnpm db:studio

# Connect to database directly
docker exec -it eight-postgres psql -U postgres -d eight
```

## Development Tools

- `pnpm db:studio` - Open Drizzle Studio (database GUI)
- `pnpm db:reset` - Reset database (preserves schema)
- `pnpm db:push` - Push schema changes to database
- `pnpm format` - Format all code with Prettier
- `pnpm lint` - Lint all code
- `pnpm build` - Build all packages and apps

## Project Structure

```
eight/
├── apps/
│   ├── web/              # Next.js frontend
│   │   ├── app/          # App router pages
│   │   ├── components/   # React components
│   │   └── public/       # Static assets
│   └── server/           # Hono backend
│       ├── src/          # Server source code
│       └── routes/       # API routes
├── packages/
│   ├── db/               # Database schema & client (Drizzle + PostgreSQL)
│   ├── ui/               # Shared UI components (shadcn/ui)
│   ├── eslint-config/    # Shared ESLint configuration
│   └── typescript-config/ # Shared TypeScript configuration
└── scripts/              # Development scripts
```

## Tech Stack

- **Frontend**: Next.js 15, React 19, TailwindCSS, shadcn/ui
- **Backend**: Hono, Node.js
- **Database**: PostgreSQL with Drizzle ORM
- **Monorepo**: Turborepo with pnpm workspaces
- **Deployment**: Cloudflare Workers/Pages ready
- **Development**: TypeScript, ESLint, Prettier

## Docker Commands

```bash
# Database management
pnpm db:up      # Start database container
pnpm db:down    # Stop database container
pnpm db:reset   # Reset database (removes all data)

# Check container status
docker ps
```

## Contributing

We welcome contributions! Here's how to get started:

1. **Fork the repository** and clone your fork
2. **Create a new branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes** and test them
4. **Follow our code style**: Run `pnpm lint` and `pnpm format`
5. **Commit your changes**: `git commit -m 'Add amazing feature'`
6. **Push to your branch**: `git push origin feature/amazing-feature`
7. **Open a Pull Request**

### Development Guidelines

- Write clear, concise commit messages
- Follow the existing code style and conventions
- Add tests for new features when applicable
- Update documentation as needed
- Keep PRs focused on a single feature or bug fix

For detailed guidelines and specific contribution opportunities, see [CONTRIBUTING.md](./CONTRIBUTING.md).

### Code Style

- Use 2 spaces for indentation
- Use single quotes for strings
- Use semicolons at the end of statements
- Keep lines under 80 characters when possible

## Environment Variables

The setup script creates a `.env` file with these default values:

```bash
# URLs
BACKEND_URL=http://localhost:1284
FRONTEND_URL=http://localhost:3000
NEXT_PUBLIC_BACKEND_URL=http://localhost:1284
NEXT_PUBLIC_FRONTEND_URL=http://localhost:3000

# Database
DATABASE_URL=postgres://postgres:postgres@localhost:5432/eight
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=eight

NODE_ENV=development
```

## Deployment

Eight is designed to be easily deployable on modern platforms:

- **Frontend**: Optimized for Cloudflare Pages and Vercel
- **Backend**: Ready for Cloudflare Workers and Node.js environments
- **Database**: Compatible with any PostgreSQL provider

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <p>Made with ❤️ by the Eight team</p>
  <p>
    <a href="https://discord.gg/eightphotos">Discord</a> •
    <a href="https://github.com/your-org/eight/issues">Issues</a> •
    <a href="https://github.com/your-org/eight/discussions">Discussions</a>
  </p>
</div>
