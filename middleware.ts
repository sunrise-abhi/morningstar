import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Public routes that don't require authentication
  const isAuthPage = pathname.startsWith("/login") || pathname.startsWith("/verify")
  const isApiRoute = pathname.startsWith("/api")
  const isPublic = isAuthPage || isApiRoute

  // Allow public routes
  if (isPublic) {
    return NextResponse.next()
  }

  // For now, allow all routes
  // Authentication check will be handled by individual pages
  // Morning pages gating will be implemented in Phase 4
  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}

