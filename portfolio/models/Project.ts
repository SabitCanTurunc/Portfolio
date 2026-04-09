import { Schema, model, models } from 'mongoose'

const projectSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    subtitle: { type: String, default: '', trim: true },
    category: { type: String, default: '', trim: true },
    imageUrl: { type: String, required: true, trim: true },
    projectUrl: { type: String, default: '', trim: true },
    order: { type: Number, default: 0 }
  },
  { timestamps: true }
)

const Project = models.Project || model('Project', projectSchema)

export default Project
