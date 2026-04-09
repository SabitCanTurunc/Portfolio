/**
 * Kullanim: portfolio klasorunden `npm run seed:experiences`
 * .env.local icinde MONGODB_URI tanimli olmali.
 */
import { config } from 'dotenv'
import { resolve } from 'path'
import mongoose from 'mongoose'
import Experience from '../models/Experience'
import { defaultExperiencesSeed } from '../lib/seed/default-experiences'

config({ path: resolve(process.cwd(), '.env.local') })
config({ path: resolve(process.cwd(), '.env') })

async function main() {
  const uri = process.env.MONGODB_URI
  if (!uri) {
    console.error('MONGODB_URI bulunamadi (.env.local)')
    process.exit(1)
  }

  await mongoose.connect(uri)
  const count = await Experience.countDocuments()
  if (count > 0) {
    console.log(`Atlandi: zaten ${count} deneyim kaydi var.`)
    await mongoose.disconnect()
    return
  }

  await Experience.insertMany([...defaultExperiencesSeed])
  console.log(`Tamam: ${defaultExperiencesSeed.length} deneyim eklendi.`)
  await mongoose.disconnect()
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
