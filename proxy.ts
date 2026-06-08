import { auth } from "@/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  const session = await auth();
  const isLoggedIn = !!session;
  const isAuthPage = request.nextUrl.pathname === "/";
  const isApiAuth = request.nextUrl.pathname.startsWith("/api/auth");

  if (isApiAuth) return NextResponse.next();
  if (!isLoggedIn && !isAuthPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (isLoggedIn && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
