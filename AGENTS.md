# TopJester Operations Guide

## Project Structure
- `/client` - React frontend (Vite + React + TypeScript)
- `/server` - Express backend with tRPC
- `/shared` - Shared types and schemas

## Commands
```bash
# Development
npm run dev          # Starts both client and server

# Production build
npm run build        # Build for production

# Validation
npx tsc --noEmit     # TypeScript type check
npm run lint         # ESLint (if configured)
```

## Key Files
- `client/src/pages/Home.tsx` - Main page
- `client/src/components/` - React components
- `client/src/index.css` - Styles and jester theme
- `server/seed-rich-data.ts` - Streamer data

## Audit
```bash
# Run squirrel audit
squirrel audit http://localhost:3001 --format llm

# Generate report
squirrel report <audit-id> --format llm
```

## Notes
- Local server runs on port 3001
- Uses SQLite for local development
- Real-time updates via SSE
- Kick OAuth for authentication
