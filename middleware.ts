// middleware.ts
import NextAuth from "next-auth"
import authConfig from "./auth.config"
import { privateRoutes } from "./route"

const { auth } = NextAuth(authConfig)

export default auth(async (req) => {
  const isLoggedIn = !!req.auth
  const { nextUrl } = req
    const url = 'http://localhost:3000'
  const isPrivateRoute = privateRoutes.includes(nextUrl.pathname)
  const isAuthRoute = nextUrl.pathname.includes("/login") || nextUrl.pathname.includes("/register")
  const isApiRoute = nextUrl.pathname.startsWith("/api")

  if(isApiRoute){
    return
  }

  if(isLoggedIn && isAuthRoute) {
    return Response.redirect(`${url}/dashboard`)
  }

  if(isAuthRoute && !isLoggedIn) {
    return
  }
  if(!isLoggedIn && isPrivateRoute) {
    return Response.redirect(`${url}/login`)
  }
})

export const config = {
  matcher: [
    "/((?!.+\\.[\\w]+$|_next).*)", // Exclude static files and _next
    "/",                          // Include the root
    "/(api|trpc)(.*)"             // Include API and tRPC routes
  ]
}
