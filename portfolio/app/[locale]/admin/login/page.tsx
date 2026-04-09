'use client'

import { FormEvent, useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter, useParams } from 'next/navigation'

export default function AdminLoginPage() {
  const router = useRouter()
  const params = useParams<{ locale: string }>()
  const locale = params?.locale ?? 'tr'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    setIsLoading(true)

    const response = await signIn('credentials', {
      email,
      password,
      redirect: false
    })

    setIsLoading(false)

    if (!response?.ok) {
      setError('Giris basarisiz. Bilgilerini kontrol et.')
      return
    }

    router.push(`/${locale}/admin`)
    router.refresh()
  }

  const fieldClass =
    'mt-1 w-full min-h-[44px] rounded-md border border-border bg-primary px-3 py-2.5 text-base text-text-primary'

  return (
    <main className="flex min-h-screen items-center justify-center bg-primary px-3 py-8 sm:px-4">
      <div className="w-full max-w-md rounded-xl border border-border bg-card-bg p-4 sm:p-6">
        <h1 className="mb-6 text-xl font-bold text-text-primary sm:text-2xl">Admin Girisi</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="text-sm text-text-secondary">E-posta</span>
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              className={fieldClass}
            />
          </label>
          <label className="block">
            <span className="text-sm text-text-secondary">Sifre</span>
            <input
              type="password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              className={fieldClass}
            />
          </label>
          {error && <p className="text-sm text-red-400">{error}</p>}
          <button
            type="submit"
            disabled={isLoading}
            className="min-h-[44px] w-full rounded-md bg-cyan-600 py-2.5 text-base font-semibold text-white hover:bg-cyan-500 disabled:opacity-60"
          >
            {isLoading ? 'Giris yapiliyor...' : 'Giris yap'}
          </button>
        </form>
      </div>
    </main>
  )
}
