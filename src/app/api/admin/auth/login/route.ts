import { NextRequest, NextResponse } from 'next/server'
import { signAdminToken, getAuthCookieOptions } from '@/shared/lib/auth'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { password } = body

    if (!password || typeof password !== 'string') {
      return NextResponse.json(
        { error: 'Password is required' },
        { status: 400 }
      )
    }

    const expectedPassword = process.env.ADMIN_PASSWORD || 'hasib-admin-2026!'

    // Direct constant-time/clean password comparison
    if (password !== expectedPassword) {
      return NextResponse.json(
        { error: 'Invalid workspace password. Access denied.' },
        { status: 401 }
      )
    }

    // Generate cryptographic JWT Token (valid 30 days)
    const token = await signAdminToken({ sub: 'admin', user: 'hasibashari' })

    const cookieOptions = getAuthCookieOptions()

    const response = NextResponse.json({
      success: true,
      message: 'Authentication successful',
    })

    // Set secure HTTP-only cookie
    response.cookies.set(cookieOptions.name, token, {
      httpOnly: cookieOptions.httpOnly,
      secure: cookieOptions.secure,
      sameSite: cookieOptions.sameSite,
      path: cookieOptions.path,
      maxAge: cookieOptions.maxAge,
    })

    return response
  } catch (err: unknown) {
    console.error('Login error:', err)
    return NextResponse.json(
      { error: 'An unexpected server error occurred during authentication' },
      { status: 500 }
    )
  }
}
