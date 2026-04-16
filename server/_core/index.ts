import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
// @ts-ignore - compression types not installed
import compression from "compression";
import { createServer } from "http";
import net from "net";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";
import { getVoteTotals } from "../db";

// SSE clients store
interface SSEClient {
  id: string;
  res: express.Response;
  lastPing: number;
}

const sseClients = new Map<string, SSEClient>();

// Generate unique client ID
function generateClientId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Broadcast vote update to all connected clients
export function broadcastVoteUpdate(update: {
  nomineeId: number;
  upvotes: number;
  downvotes: number;
  score: number;
}) {
  const message = JSON.stringify(update);
  const deadClients: string[] = [];

  sseClients.forEach((client, id) => {
    try {
      client.res.write(`data: ${message}\n\n`);
    } catch (error) {
      deadClients.push(id);
    }
  });

  // Clean up dead clients
  deadClients.forEach((id) => sseClients.delete(id));
}

// Clean up stale clients periodically
setInterval(() => {
  const now = Date.now();
  const staleTimeout = 60000; // 60 seconds
  const deadClients: string[] = [];

  sseClients.forEach((client, id) => {
    if (now - client.lastPing > staleTimeout) {
      deadClients.push(id);
    }
  });

  deadClients.forEach((id) => {
    const client = sseClients.get(id);
    if (client) {
      try {
        client.res.end();
      } catch {
        // Ignore errors during cleanup
      }
    }
    sseClients.delete(id);
  });
}, 30000); // Run every 30 seconds

function isPortAvailable(port: number): Promise<boolean> {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}

async function findAvailablePort(startPort: number = 3000): Promise<number> {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Security Headers
  app.use((req, res, next) => {
    // Content Security Policy
    res.setHeader(
      "Content-Security-Policy",
      "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://fonts.googleapis.com https://unpkg.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https: blob:; connect-src 'self' ws: wss: http: https:; media-src 'self'; object-src 'none'; frame-ancestors 'none'; base-uri 'self'; form-action 'self';"
    );
    // X-Frame-Options (Clickjacking protection)
    res.setHeader("X-Frame-Options", "DENY");
    // X-Content-Type-Options (MIME sniffing protection)
    res.setHeader("X-Content-Type-Options", "nosniff");
    // Referrer Policy
    res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
    // Permissions Policy
    res.setHeader(
      "Permissions-Policy",
      "camera=(), microphone=(), geolocation=(), interest-cohort=()"
    );
    // X-XSS-Protection (legacy but still useful)
    res.setHeader("X-XSS-Protection", "1; mode=block");
    // Strict-Transport-Security (HSTS) - only in production
    if (process.env.NODE_ENV === "production") {
      res.setHeader(
        "Strict-Transport-Security",
        "max-age=31536000; includeSubDomains; preload"
      );
    }
    next();
  });

  // Compression middleware for better performance
  app.use(compression());

  // Caching headers for static assets
  app.use((req, res, next) => {
    // Cache static assets for 1 year (immutable files with hash in filename)
    if (req.url.match(/\.[a-f0-9]{8,}\.(js|css|woff2?|png|jpg|jpeg|gif|svg|ico)$/)) {
      res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    }
    // Cache images and fonts for 30 days
    else if (req.url.match(/\.(png|jpg|jpeg|gif|svg|ico|woff2?|ttf|eot)$/)) {
      res.setHeader("Cache-Control", "public, max-age=2592000");
    }
    // Cache API responses for 5 minutes
    else if (req.url.startsWith("/api/")) {
      res.setHeader("Cache-Control", "public, max-age=300");
    }
    next();
  });

  // Cookie parser for OAuth state management
  app.use(cookieParser());

  // Configure body parser with larger size limit for file uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));

  // OAuth callback under /api/oauth/callback
  registerOAuthRoutes(app);

  // SSE endpoint for real-time vote updates
  app.get("/api/votes/stream", (req, res) => {
    // Set headers for SSE
    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no", // Disable nginx buffering
    });

    // Send initial connection message
    const clientId = generateClientId();
    res.write(`data: ${JSON.stringify({ type: "connected", clientId })}\n\n`);

    // Add client to store
    const client: SSEClient = {
      id: clientId,
      res,
      lastPing: Date.now(),
    };
    sseClients.set(clientId, client);

    // Send current leaderboard data
    getVoteTotals()
      .then((nominees) => {
        const leaderboardData = nominees.map((n) => ({
          nomineeId: n.nomineeId,
          upvotes: n.upvotes,
          downvotes: n.downvotes,
          score: n.score,
        }));
        res.write(
          `data: ${JSON.stringify({ type: "leaderboard", data: leaderboardData })}\n\n`
        );
      })
      .catch((err) => {
        console.error("[SSE] Error fetching initial leaderboard:", err);
      });

    // Handle client disconnect
    req.on("close", () => {
      sseClients.delete(clientId);
    });

    // Handle errors
    req.on("error", () => {
      sseClients.delete(clientId);
    });

    // Send ping every 30 seconds to keep connection alive
    const pingInterval = setInterval(() => {
      try {
        res.write(`:ping\n\n`);
        client.lastPing = Date.now();
      } catch {
        clearInterval(pingInterval);
        sseClients.delete(clientId);
      }
    }, 30000);

    // Clean up on close
    res.on("close", () => {
      clearInterval(pingInterval);
      sseClients.delete(clientId);
    });
  });

  // tRPC API
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );

  // development mode uses Vite, production mode uses static files
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = await findAvailablePort(preferredPort);

  if (port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
    console.log(`SSE endpoint available at http://localhost:${port}/api/votes/stream`);
  });
}

startServer().catch(console.error);
