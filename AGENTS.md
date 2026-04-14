# TopJester Project Operations

## Build Commands
```bash
npm run dev      # Development server (port auto-detects)
npm run build    # Production build
npm start        # Start production server
```

## Validation
```bash
npm run typecheck    # TypeScript check
npm run lint         # ESLint
npm run test         # Run tests (if available)
```

## Database
- SQLite: `local.db` (auto-created on first use)
- Schema managed by Drizzle

## OAuth Configuration
- Kick OAuth configured in `.env`
- Callback: `/api/oauth/callback`
- Dev login: `/api/oauth/dev-login`

## Ports
- Preferred: 3013 (matches Kick app)
- Fallback: auto-detects if 3013 busy

## Operational Notes
- Server must match Kick app redirect URL exactly
- OAuth codes expire after ~10 minutes
- Admin set via OWNER_OPEN_ID in .env
