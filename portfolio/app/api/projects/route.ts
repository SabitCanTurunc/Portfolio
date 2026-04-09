import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'
import { requireAdminSession } from '@/lib/admin-auth'
import Project from '@/models/Project'

export async function GET() {
  try {
    await connectToDatabase()
    const projects = await Project.find().sort({ order: 1, createdAt: -1 }).lean()
    return NextResponse.json(projects)
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

    const project = await Project.create({
      title: payload.title,
      subtitle: payload.subtitle ?? '',
      category: payload.category ?? '',
      imageUrl: payload.imageUrl,
      projectUrl: typeof payload.projectUrl === 'string' ? payload.projectUrl.trim() : '',
      order: Number(payload.order ?? 0)
    })

    return NextResponse.json(project, { status: 201 })
  } catch {
    return NextResponse.json({ message: 'Kayit olusturulamadi.' }, { status: 500 })
  }
}
