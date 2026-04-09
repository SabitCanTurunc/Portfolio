import { NextResponse } from 'next/server'
import { Types } from 'mongoose'
import { connectToDatabase } from '@/lib/mongodb'
import { requireAdminSession } from '@/lib/admin-auth'
import Experience from '@/models/Experience'

const isValidObjectId = (id: string) => Types.ObjectId.isValid(id)

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { isAdmin } = await requireAdminSession()
  if (!isAdmin) {
    return NextResponse.json({ message: 'Yetkisiz istek.' }, { status: 401 })
  }

  const { id } = await params
  if (!isValidObjectId(id)) {
    return NextResponse.json({ message: 'Gecersiz kayit kimligi.' }, { status: 400 })
  }

  try {
    const payload = await request.json()
    await connectToDatabase()

    const updated = await Experience.findByIdAndUpdate(
      id,
      {
        title: payload.title,
        company: payload.company,
        period: payload.period,
        location: payload.location,
        website: payload.website ?? '',
        description: payload.description,
        skills: Array.isArray(payload.skills) ? payload.skills : [],
        order: Number(payload.order ?? 0)
      },
      { new: true, runValidators: true }
    )

    if (!updated) {
      return NextResponse.json({ message: 'Kayit bulunamadi.' }, { status: 404 })
    }

    return NextResponse.json(updated)
  } catch {
    return NextResponse.json({ message: 'Kayit guncellenemedi.' }, { status: 500 })
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { isAdmin } = await requireAdminSession()
  if (!isAdmin) {
    return NextResponse.json({ message: 'Yetkisiz istek.' }, { status: 401 })
  }

  const { id } = await params
  if (!isValidObjectId(id)) {
    return NextResponse.json({ message: 'Gecersiz kayit kimligi.' }, { status: 400 })
  }

  try {
    await connectToDatabase()
    const deleted = await Experience.findByIdAndDelete(id)
    if (!deleted) {
      return NextResponse.json({ message: 'Kayit bulunamadi.' }, { status: 404 })
    }

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ message: 'Kayit silinemedi.' }, { status: 500 })
  }
}
