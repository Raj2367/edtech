import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import { ENV } from "./config/env.js";
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

export default app;
