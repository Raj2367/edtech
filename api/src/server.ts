import "dotenv/config";
import app from "./app.js";
import { connectDB } from "./config/db.js";
import { ENV } from "./config/env.js";

const PORT = ENV.PORT || 4000;

async function start() {
  await connectDB();
  const server = app.listen(PORT, () => {
    console.log(`🚀 API running at http://localhost:${PORT}`);
  });

  /**
   * PRODUCTION HARDENING:
   * Graceful shutdown ensures database connections and
   * in-flight requests complete before server stops.
   */
  const shutdown = () => {
    console.log("⚠️  Received shutdown signal, closing server...");
    server.close(() => {
      console.log("🛑 Server closed. Exiting process.");
      process.exit(0);
    });
  };

  process.on("SIGTERM", shutdown);
  process.on("SIGINT", shutdown);
}

start();
