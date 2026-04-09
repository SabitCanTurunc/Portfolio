export type ProjectItem = {
  _id: string
  title: string
  subtitle: string
  category: string
  imageUrl: string
  /** Dis baglanti (demo, repo, canli site) */
  projectUrl: string
  order: number
}

export type ExperienceItem = {
  _id: string
  title: string
  company: string
  period: string
  location: string
  website: string
  description: string
  skills: string[]
  order: number
}
