import { v2 as cloudinary } from 'cloudinary'
import { NextResponse } from 'next/server'
import { requireAdminSession } from '@/lib/admin-auth'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

export async function POST(request: Request) {
  const { isAdmin } = await requireAdminSession()
  if (!isAdmin) {
    return NextResponse.json({ message: 'Yetkisiz istek.' }, { status: 401 })
  }

  try {
    const formData = await request.formData()
    const file = formData.get('file')

    if (!(file instanceof File)) {
      return NextResponse.json({ message: 'Dosya bulunamadi.' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const dataUri = `data:${file.type};base64,${buffer.toString('base64')}`

    const result = await cloudinary.uploader.upload(dataUri, {
      folder: 'portfolio-projects'
    })

    return NextResponse.json({ url: result.secure_url })
  } catch {
    return NextResponse.json({ message: 'Dosya yuklenemedi.' }, { status: 500 })
  }
}
