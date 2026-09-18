export interface LoginResult {
  success: boolean
  message?: string
  error?: string
}

export interface SessionStatus {
  authenticated: boolean
  user?: string
  role?: string
}

export async function loginAdmin(password: string): Promise<LoginResult> {
  try {
    const res = await fetch('/api/admin/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })

    const data = await res.json()

    if (!res.ok) {
      return {
        success: false,
        error: data.error || 'Authentication failed. Please check your password.',
      }
    }

    return {
      success: true,
      message: data.message || 'Login successful',
    }
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Network error. Could not connect to server.',
    }
  }
}

export async function logoutAdmin(): Promise<boolean> {
  try {
    const res = await fetch('/api/admin/auth/logout', {
      method: 'POST',
    })
    return res.ok
  } catch {
    return false
  }
}

export async function checkSession(): Promise<SessionStatus> {
  try {
    const res = await fetch('/api/admin/auth/me')
    if (!res.ok) return { authenticated: false }
    return await res.json()
  } catch {
    return { authenticated: false }
  }
}
