import "dotenv/config";
import app from "./app.js";
import { connectDB } from "./config/db.js";
import { ENV } from "./config/env.js";

const PORT = ENV.PORT || 4000;

async function start() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`API running at http://localhost:${PORT}`);
  });
}

start();
