import { NextRequest, NextResponse } from 'next/server'
import { AUTH_COOKIE_NAME, verifyAdminToken } from '@/shared/lib/auth'

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const token = req.cookies.get(AUTH_COOKIE_NAME)?.value

  const isLoginPage = pathname === '/admin/login'
  const isAuthApi = pathname.startsWith('/api/admin/auth')
  const isAdminPage = pathname.startsWith('/admin')
  const isAdminApi = pathname.startsWith('/api/admin')

  // Check token validity if token is present
  const isTokenValid = token ? (await verifyAdminToken(token)).valid : false

  // 1. If user is accessing /admin/login while already authenticated, redirect to /admin dashboard
  if (isLoginPage) {
    if (isTokenValid) {
      return NextResponse.redirect(new URL('/admin', req.url))
    }
    return NextResponse.next()
  }

  // 2. Allow auth API routes (/api/admin/auth/login, etc.)
  if (isAuthApi) {
    return NextResponse.next()
  }

  // 3. Protect all other admin pages (/admin, /admin/projects, /admin/articles, etc.)
  if (isAdminPage) {
    if (!isTokenValid) {
      const loginUrl = new URL('/admin/login', req.url)
      return NextResponse.redirect(loginUrl)
    }
    return NextResponse.next()
  }

  // 4. Protect all other admin API routes (/api/admin/projects, /api/admin/articles)
  if (isAdminApi) {
    if (!isTokenValid) {
      return NextResponse.json(
        { error: 'Unauthorized. Admin authentication required.' },
        { status: 401 }
      )
    }
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}
