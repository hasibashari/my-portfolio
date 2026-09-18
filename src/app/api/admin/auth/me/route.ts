import { NextRequest, NextResponse } from 'next/server'
import { AUTH_COOKIE_NAME, verifyAdminToken } from '@/shared/lib/auth'

export async function GET(req: NextRequest) {
  const token = req.cookies.get(AUTH_COOKIE_NAME)?.value

  if (!token) {
    return NextResponse.json({ authenticated: false }, { status: 401 })
  }

  const { valid, payload } = await verifyAdminToken(token)

  if (!valid) {
    return NextResponse.json({ authenticated: false }, { status: 401 })
  }

  return NextResponse.json({
    authenticated: true,
    user: payload?.user || 'admin',
    role: payload?.role || 'owner',
  })
}
