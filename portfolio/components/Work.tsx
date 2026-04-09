'use client'

import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import type { ProjectItem } from '@/types/content'

function disBaglantiHref(url: string) {
  const t = url.trim()
  if (!t) {
    return '#'
  }
  if (/^https?:\/\//i.test(t)) {
    return t
  }
  return `https://${t}`
}

const Work = () => {
  const t = useTranslations()

  const fallbackProjects: Omit<ProjectItem, '_id' | 'order'>[] = [
    {
      title: t('work.projects.convexus.title'),
      subtitle: t('work.projects.convexus.subtitle'),
      category: t('work.projects.convexus.category'),
      imageUrl: '/projects/ConvexusBanner.gif',
      projectUrl: ''
    },
    {
      title: t('work.projects.neowrite.title'),
      subtitle: t('work.projects.neowrite.subtitle'),
      category: t('work.projects.neowrite.category'),
      imageUrl: '/projects/NeoWrite.png',
      projectUrl: ''
    },
    {
      title: t('work.projects.stepofhope.title'),
      subtitle: t('work.projects.stepofhope.subtitle'),
      category: t('work.projects.stepofhope.category'),
      imageUrl: '/projects/StepOfHope.png',
      projectUrl: ''
    }
  ]
  const [projects, setProjects] = useState<ProjectItem[]>([])

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const response = await fetch('/api/projects', { cache: 'no-store' })
        if (!response.ok) {
          return
        }
        const data = (await response.json()) as ProjectItem[]
        setProjects(data)
      } catch {
        setProjects([])
      }
    }

    void loadProjects()
  }, [])

  const displayedProjects = projects.length > 0
    ? projects
    : fallbackProjects.map((item, index) => ({
      _id: `fallback-${index}`,
      order: index,
      ...item
    }))

  return (
    <section id="work" className="py-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl pb-10 font-bold mb-4 text-text-primary">
            {t('work.title')}
          </h2>
          {/* <p className="text-text-secondary max-w-3xl mx-auto mb-12">
            React SPA ve PWA kullanarak ölçeklenebilir seyahat, etkinlik ve teletıp web ve hibrit mobil uygulamaları geliştirdim.
            Dünya çapında 50+ müşteri ile 140+ projede işbirliği yaptım.
          </p> */}

          {/* Project Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedProjects.map((project, index) => {
              const link = (project.projectUrl ?? '').trim()
              return (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className="aspect-video relative flex items-center justify-center bg-black rounded-lg">
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    className="object-contain rounded-lg"
                  />
                  {link ? (
                    <a
                      href={disBaglantiHref(link)}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={t('work.openProjectLink')}
                      className="absolute top-3 right-3 z-20 rounded-full bg-black/55 p-2 text-cyan-400 ring-1 ring-white/10 transition hover:bg-cyan-600 hover:text-white"
                    >
                      <ArrowTopRightOnSquareIcon className="h-5 w-5" />
                    </a>
                  ) : null}
                  <div className="pointer-events-none absolute inset-0 bg-primary/60 opacity-0 transition-opacity group-hover:opacity-100 flex items-center justify-center">
                    <div className="text-center text-text-primary p-4">
                      <p className="text-sm uppercase tracking-wider mb-2">{project.category}</p>
                      <h3 className="text-xl font-bold">
                        {project.title}
                        {project.subtitle && <span className="block text-sm mt-1">{project.subtitle}</span>}
                      </h3>
                    </div>
                  </div>
                </div>
              </motion.div>
            )})}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Work