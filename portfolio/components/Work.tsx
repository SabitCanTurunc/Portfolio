'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import { useState, useEffect } from 'react'
import '../i18n'

const Work = () => {
  const { t } = useTranslation()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const projects = [
    {
      title: t('work.projects.convexus.title'),
      subtitle: t('work.projects.convexus.subtitle'),
      category: t('work.projects.convexus.category'),
      images: ['/projects/ConvexusBanner.gif','/projects/PoweredByConvexuS.gif'],
    },  
    {
      title: t('work.projects.neowrite.title'),
      subtitle: t('work.projects.neowrite.subtitle'),
      category: t('work.projects.neowrite.category'),
      images: ['/projects/NeoWrite.png'],
    },
    {
      title: t('work.projects.stepofhope.title'),
      subtitle: t('work.projects.stepofhope.subtitle'),
      category: t('work.projects.stepofhope.category'),
      images: ['/projects/StepOfHope.png'],
    },
  ]

  if (!mounted) {
    return null
  }

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
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className="aspect-video relative flex items-center justify-center bg-black rounded-lg">
                  <Image
                    src={project.images[0]}
                    alt={project.title}
                    fill
                    className="object-contain rounded-lg"
                  />
                  <div className="absolute inset-0 bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
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
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Work