import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Protects selected routes by checking for "token" cookie.
 * Next.js middleware runs BEFORE rendering (edge middleware),
 * making it ideal for redirecting unauthorized users.
 */
export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  const protectedRoutes = ["/dashboard", "/courses"];

  // check if URL begins with a protected route prefix
  const pathname = req.nextUrl.pathname;
  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtected && !token) {
    const loginUrl = new URL("/auth/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

/**
 * Apply middleware only to specific routes.
 */
export const config = {
  matcher: ["/dashboard/:path*", "/courses/:path*"],
};
