import rateLimit from "express-rate-limit";

/**
 * Protects against brute-force attacks (e.g., login endpoint).
 */
export const authRateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // limit each IP to 10 requests/min
  message: {
    success: false,
    message: "Too many requests. Please try again later.",
  },
});
