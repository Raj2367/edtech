import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import { ENV } from "./config/env.js";
import routes from "./routes/index.js";
import { errorHandler } from "./middleware/errorHandler.js";
const app = express();

// security headers
app.use(helmet());

// allow frontend (Vercel) domain
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
 * Error handler should be the last piece of middleware
 */
app.use(errorHandler);

export default app;
