import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import { ENV } from "./config/env";
import routes from "./routes/index";
import { errorHandler } from "./middleware/errorHandler";
const app = express();

/**
 * SECURITY: Helmet adds CSP, XSS protection, HSTS,
 * no-sniff, referrer policies, etc.
 */
app.use(helmet());

/**
 * SECURITY: Allow cross-site cookies
 * Required for Render (backend) + Vercel (frontend)
 */
app.use(
  cors({
    origin: ENV.FRONTEND_URL,
    credentials: true
  })
);

// parse JSON
app.use(express.json());

// secure cookie parser
app.use(cookieParser());

// Logging — helpful during dev & debugging
app.use((req, _res, next) => {
  console.log(`[${req.method}] ${req.originalUrl}`);
  next();
});

// API Routes
app.use("/api", routes);

/**
 * Health endpoint — used by Render deployment system
 */
app.get("/health", (_req, res) => {
  res.status(200).json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

/**
 * Error handler should be the last piece of middleware
 */
app.use(errorHandler);

export default app;
