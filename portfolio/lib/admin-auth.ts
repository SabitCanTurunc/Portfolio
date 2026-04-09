import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function requireAdminSession() {
  const session = await getServerSession(authOptions)
  const role = (session?.user as { role?: string } | undefined)?.role
  const isAdmin = Boolean(session?.user?.email) && role === 'admin'

  return { session, isAdmin }
}
