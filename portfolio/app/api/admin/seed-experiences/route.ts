import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'
import { requireAdminSession } from '@/lib/admin-auth'
import Experience from '@/models/Experience'
import { defaultExperiencesSeed } from '@/lib/seed/default-experiences'

/** Yalnizca koleksiyon bossa varsayilan deneyimleri ekler (cift kayit onler) */
export async function POST() {
  const { isAdmin } = await requireAdminSession()
  if (!isAdmin) {
    return NextResponse.json({ message: 'Yetkisiz istek.' }, { status: 401 })
  }

  try {
    await connectToDatabase()
    const count = await Experience.countDocuments()
    if (count > 0) {
      return NextResponse.json({
        skipped: true,
        message: 'Deneyim kayitlari zaten var; seed atlandi.',
        count
      })
    }

    const created = await Experience.insertMany([...defaultExperiencesSeed])
    return NextResponse.json({
      skipped: false,
      inserted: created.length,
      message: `${created.length} deneyim kaydi eklendi.`
    })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ message: 'Seed basarisiz.' }, { status: 500 })
  }
}
