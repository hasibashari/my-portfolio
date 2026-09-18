import { NextResponse } from 'next/server'
import { getAuthCookieOptions } from '@/shared/lib/auth'

export async function POST() {
  const cookieOptions = getAuthCookieOptions(0)

  const response = NextResponse.json({
    success: true,
    message: 'Logged out successfully',
  })

  // Clear cookie immediately
  response.cookies.set(cookieOptions.name, '', {
    httpOnly: cookieOptions.httpOnly,
    secure: cookieOptions.secure,
    sameSite: cookieOptions.sameSite,
    path: cookieOptions.path,
    maxAge: 0,
  })

  return response
}
