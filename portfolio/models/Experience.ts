import { Schema, model, models } from 'mongoose'

const experienceSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    company: { type: String, required: true, trim: true },
    period: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    website: { type: String, default: '', trim: true },
    description: { type: String, required: true, trim: true },
    skills: { type: [String], default: [] },
    order: { type: Number, default: 0 }
  },
  { timestamps: true }
)

const Experience = models.Experience || model('Experience', experienceSchema)

export default Experience
