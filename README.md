# Eight

## Quick Start 🚀

### Prerequisites

- [Node.js](https://nodejs.org/) (v20 or newer)
- [pnpm](https://pnpm.io/) (v10 or newer)
- [Docker](https://www.docker.com/) (for local database)

### Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/your-org/eight.git
   cd eight
   ```

2. Run the setup script:

   ```bash
   pnpm run setup
   ```

   This will:
   - Install all dependencies
   - Create necessary environment files
   - Start the database
   - Initialize the database schema

3. Start development:
   ```bash
   pnpm run dev      # Start all services
   # OR
   pnpm run web      # Start only frontend
   pnpm run server   # Start only backend
   ```

Your app will be running at:

- Frontend: http://localhost:3000
- Backend: http://localhost:1284

## Development Tools

- `pnpm db:studio` - Open database GUI
- `pnpm db:reset` - Reset database (preserves schema)
- `pnpm format` - Format all code
- `pnpm lint` - Lint all code

## Project Structure

```
eight/
├── apps/
│   ├── web/          # Next.js frontend
│   └── server/       # Hono backend
├── packages/
│   ├── db/           # Database schema & client
│   ├── ui/           # Shared UI components
│   └── config/       # Shared configurations
└── scripts/          # Development scripts
```

## Contributing

1. Create a new branch
2. Make your changes
3. Submit a pull request

For detailed guidelines, see [CONTRIBUTING.md](./CONTRIBUTING.md).

---

### Features (planned)

- [ ] AI-powered photo search
- [ ] Privacy-first (self-hostable with Docker)
- [ ] Imports from Google Photos, iCloud, local
- [ ] Smart Albums, Face Detection, Timeline Views

---

### License

MIT License. See [LICENSE](LICENSE) for details.
