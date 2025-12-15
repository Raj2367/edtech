import mongoose from "mongoose";
import { ENV } from "./env";

/**
 * MongoDB connection with retry logic.
 * Helpful in platforms like Render where app may boot before DB is ready.
 */
export async function connectDB() {
  const MAX_RETRIES = 5;
  let retries = 0;

  while (retries < MAX_RETRIES) {
    try {
      await mongoose.connect(ENV.MONGO_URL);
      console.log("✅ MongoDB Connected");
      return;
    } catch (err) {
      retries++;
      console.error(`MongoDB connection attempt ${retries} failed`, err);

      if (retries >= MAX_RETRIES) {
        console.error("❌ Max retries reached — exiting.");
        process.exit(1);
      }

      console.log("⏳ Retrying in 2 seconds...");
      await new Promise((res) => setTimeout(res, 2000));
    }
  }
}
