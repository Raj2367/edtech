import { ENV } from "./env";

export const cookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "none" as const,
  domain: ENV.COOKIE_DOMAIN,
  path: "/",
  maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
};
