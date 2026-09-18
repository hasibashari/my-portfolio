import { Metadata } from 'next'
import { LoginView } from '@/features/auth'

export const metadata: Metadata = {
  title: 'Workspace Access | Hasib Ashari',
  description: 'Enter your master passkey to access portfolio content management.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function AdminLoginPage() {
  return <LoginView />
}
