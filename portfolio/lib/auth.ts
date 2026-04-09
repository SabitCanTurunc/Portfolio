import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import bcrypt from 'bcryptjs'
import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { getMongoClientPromise } from '@/lib/mongodb-client'

const hasMongoUri = Boolean(process.env.MONGODB_URI)

/** bcrypt hash'indeki $ isaretleri .env'de bazi araclarda bozulabildigi icin istege bagli base64 yolu */
function getAdminPasswordHashFromEnv(): string {
  const b64 = process.env.ADMIN_PASSWORD_HASH_B64?.trim()
  if (b64) {
    return Buffer.from(b64, 'base64').toString('utf8').trim()
  }
  return (process.env.ADMIN_PASSWORD_HASH ?? '').trim()
}

export const authOptions: NextAuthOptions = {
  ...(hasMongoUri ? { adapter: MongoDBAdapter(getMongoClientPromise()) } : {}),
  session: { strategy: 'jwt' },
  providers: [
    CredentialsProvider({
      name: 'Admin',
      credentials: {
        email: { label: 'E-posta', type: 'email' },
        password: { label: 'Sifre', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const adminEmail = process.env.ADMIN_EMAIL
        const adminPasswordHash = getAdminPasswordHashFromEnv()

        if (!adminEmail || !adminPasswordHash) {
          throw new Error(
            'ADMIN_EMAIL veya sifre hash\'i tanimli degil. Oncelik: ADMIN_PASSWORD_HASH_B64 (bcrypt hash\'inin base64\'u).'
          )
        }

        if (credentials.email !== adminEmail) {
          return null
        }

        const isPasswordValid = await bcrypt.compare(credentials.password, adminPasswordHash)
        if (!isPasswordValid) {
          return null
        }

        return {
          id: 'admin-user',
          email: adminEmail,
          name: 'Admin'
        }
      }
    })
  ],
  pages: {
    signIn: '/tr/admin/login'
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = 'admin'
      }
      return token
    },
    async session({ session, token }) {
      if (session.user && token.role) {
        ;(session.user as typeof session.user & { role?: string }).role = String(token.role)
      }
      return session
    }
  }
}
