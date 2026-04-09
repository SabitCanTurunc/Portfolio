import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'
import { requireAdminSession } from '@/lib/admin-auth'
import Experience from '@/models/Experience'

export async function GET() {
  try {
    await connectToDatabase()
    const experiences = await Experience.find().sort({ order: 1, createdAt: -1 }).lean()
    return NextResponse.json(experiences)
  } catch {
    return NextResponse.json([])
  }
}

export async function POST(request: Request) {
  const { isAdmin } = await requireAdminSession()
  if (!isAdmin) {
    return NextResponse.json({ message: 'Yetkisiz istek.' }, { status: 401 })
  }

  try {
    const payload = await request.json()
    await connectToDatabase()

    const experience = await Experience.create({
      title: payload.title,
      company: payload.company,
      period: payload.period,
      location: payload.location,
      website: payload.website ?? '',
      description: payload.description,
      skills: Array.isArray(payload.skills) ? payload.skills : [],
      order: Number(payload.order ?? 0)
    })

    return NextResponse.json(experience, { status: 201 })
  } catch {
    return NextResponse.json({ message: 'Kayit olusturulamadi.' }, { status: 500 })
  }
}
