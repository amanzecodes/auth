import NextAuth from "next-auth";
import authConfig from "../auth.config";
import { privateRoutes } from "../route";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth(async (req) => {
  const isLoggedIn = !!req.auth;
  const { nextUrl } = req;
  const url = 'http://localhost:3000';
  const isPrivateRoute = privateRoutes.includes(nextUrl.pathname);
  const isAuthRoute = nextUrl.pathname.includes("/login") || nextUrl.pathname.includes("/register");
  const isApiRoute = nextUrl.pathname.startsWith("/api");
  if (isApiRoute) {
    return NextResponse.next();
  }

  if (isLoggedIn && isAuthRoute) {
    return NextResponse.redirect(`${url}/dashboard`);
  }

  if (isAuthRoute && !isLoggedIn) {
    return NextResponse.next();
  }

  if (!isLoggedIn && isPrivateRoute) {
    return NextResponse.redirect(`${url}/login`);
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|static|.*\\..*|api|trpc|.well-known).*)",
    "/"
  ]
};