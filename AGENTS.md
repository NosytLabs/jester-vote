# Jester-Vote Project Operations

## Build Commands
```bash
npm run dev      # Development server (tsx watch)
npm run build    # Production build (vite + esbuild)
npm run start    # Production start (node dist/index.js)
```

## Validation Commands
```bash
npm run check    # TypeScript typecheck (tsc --noEmit)
npm run test     # Vitest test runner
npm run format   # Prettier formatting
```

## Database Commands
```bash
npm run db:push  # Drizzle generate + migrate
```

## Operational Notes
- TypeScript strict mode enabled
- Tests must pass before committing
- MySQL database via Drizzle ORM
- tRPC for API routes
- React 19 + Vite + Tailwind CSS
- Kick OAuth already integrated
- Dark theme: black bg, purple header, green dashed borders

## Backpressure Gates
1. TypeScript: `npm run check` must pass
2. Tests: `npm run test` must pass
3. Build: `npm run build` must succeed

## Project Structure
- `client/src/` - React frontend
- `server/` - Express + tRPC backend
- `drizzle/` - Database schema and migrations
- `shared/` - Shared types/utilities
