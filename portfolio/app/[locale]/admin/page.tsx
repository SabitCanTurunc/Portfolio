import { redirect } from 'next/navigation'
import { requireAdminSession } from '@/lib/admin-auth'
import AdminDashboard from '@/components/admin/AdminDashboard'

export default async function AdminPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const { isAdmin } = await requireAdminSession()

  if (!isAdmin) {
    redirect(`/${locale}/admin/login`)
  }

  return <AdminDashboard locale={locale} />
}
