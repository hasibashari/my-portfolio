/**
 * Native Cryptographic JWT & Session Engine using Web Crypto API (HMAC-SHA256)
 * Compatible with Next.js Edge Middleware and Node.js Route Handlers (0 dependencies)
 */

export const AUTH_COOKIE_NAME = 'admin_session'
export const AUTH_COOKIE_MAX_AGE = 30 * 24 * 60 * 60 // 30 days in seconds

interface JWTPayload {
  sub: string
  role: string
  iat: number
  exp: number
  [key: string]: unknown
}

function getSecretKey(): string {
  return process.env.JWT_SECRET || 'fallback-super-secret-jwt-key-32-chars-minimum-length!'
}

/**
 * Base64URL encoding / decoding helpers
 */
function base64UrlEncodeString(str: string): string {
  const bytes = new TextEncoder().encode(str)
  let binary = ''
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function base64UrlEncodeBuffer(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer)
  let binary = ''
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function base64UrlDecodeToString(str: string): string {
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/')
  while (base64.length % 4) {
    base64 += '='
  }
  const binary = atob(base64)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i)
  }
  return new TextDecoder().decode(bytes)
}

function base64UrlDecodeToBuffer(str: string): Uint8Array {
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/')
  while (base64.length % 4) {
    base64 += '='
  }
  const binary = atob(base64)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i)
  }
  return bytes
}

async function getCryptoKey(): Promise<CryptoKey> {
  const secret = getSecretKey()
  const keyData = new TextEncoder().encode(secret)
  return await crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: { name: 'SHA-256' } },
    false,
    ['sign', 'verify']
  )
}

/**
 * Signs a new JWT token for Admin session
 */
export async function signAdminToken(
  customPayload: Partial<JWTPayload> = {},
  expiresInSeconds: number = AUTH_COOKIE_MAX_AGE
): Promise<string> {
  const now = Math.floor(Date.now() / 1000)
  const header = {
    alg: 'HS256',
    typ: 'JWT',
  }

  const payload: JWTPayload = {
    sub: 'admin',
    role: 'owner',
    iat: now,
    exp: now + expiresInSeconds,
    ...customPayload,
  }

  const encodedHeader = base64UrlEncodeString(JSON.stringify(header))
  const encodedPayload = base64UrlEncodeString(JSON.stringify(payload))
  const dataToSign = `${encodedHeader}.${encodedPayload}`

  const key = await getCryptoKey()
  const signatureBuffer = await crypto.subtle.sign(
    'HMAC',
    key,
    new TextEncoder().encode(dataToSign)
  )
  const encodedSignature = base64UrlEncodeBuffer(signatureBuffer)

  return `${dataToSign}.${encodedSignature}`
}

/**
 * Verifies a JWT token signature and expiry date
 */
export async function verifyAdminToken(
  token: string
): Promise<{ valid: boolean; payload?: JWTPayload }> {
  if (!token || typeof token !== 'string') {
    return { valid: false }
  }

  const parts = token.split('.')
  if (parts.length !== 3) {
    return { valid: false }
  }

  const [encodedHeader, encodedPayload, encodedSignature] = parts
  const dataToSign = `${encodedHeader}.${encodedPayload}`

  try {
    const key = await getCryptoKey()
    const signatureBuffer = base64UrlDecodeToBuffer(encodedSignature)

    const isValidSignature = await crypto.subtle.verify(
      'HMAC',
      key,
      signatureBuffer as unknown as BufferSource,
      new TextEncoder().encode(dataToSign)
    )

    if (!isValidSignature) {
      return { valid: false }
    }

    const payloadJson = base64UrlDecodeToString(encodedPayload)
    const payload: JWTPayload = JSON.parse(payloadJson)

    // Check expiration
    const now = Math.floor(Date.now() / 1000)
    if (payload.exp && payload.exp < now) {
      return { valid: false }
    }

    return { valid: true, payload }
  } catch {
    return { valid: false }
  }
}

/**
 * Standard cookie configuration for session cookie
 */
export function getAuthCookieOptions(maxAge: number = AUTH_COOKIE_MAX_AGE) {
  const isProd = process.env.NODE_ENV === 'production'
  return {
    name: AUTH_COOKIE_NAME,
    httpOnly: true,
    secure: isProd,
    sameSite: 'lax' as const,
    path: '/',
    maxAge,
  }
}
