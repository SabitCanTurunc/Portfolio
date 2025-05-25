'use client'

import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useState, useEffect } from 'react'
import '../i18n'

const Experience = () => {
  const { t } = useTranslation()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const experiences = [
    {
      title: t('experience.items.mantis.title'),
      company: t('experience.items.mantis.company'),
      period: t('experience.items.mantis.period'),
      location: t('experience.items.mantis.location'),
      website: 'mantis.com.tr',
      description: t('experience.items.mantis.description'),
      skills: ['Java', 'Angular', 'Pyhton', 'SpringBoot', 'FastaPi'],
    },
    {
      title: t('experience.items.smartpulse.title'),
      company: t('experience.items.smartpulse.company'),
      period: t('experience.items.smartpulse.period'),
      location: t('experience.items.smartpulse.location'),
      website: 'www.smartpulse.io',
      description: t('experience.items.smartpulse.description'),
      skills: ['C#','.Net','Angular'],
    },
    {
      title: t('experience.items.blockchain.title'),
      company: t('experience.items.blockchain.company'),
      period: t('experience.items.blockchain.period'),
      location: t('experience.items.blockchain.location'),
      website: '',
      description: t('experience.items.blockchain.description'),
      skills: ['JS', 'Smart Contrats', 'Solidity', 'CSS', 'Nodejs'],
    },
  ]

  if (!mounted) {
    return null
  }

  return (
    <section id="experience" className="py-8 relative">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-text-primary">
            {t('experience.title')}
          </h2>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-12 pb-32">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative pl-8 ${index !== experiences.length - 1 ? 'border-l-2 border-border' : ''}`}
            >
              {/* Timeline çizgisinin gradient ile bitişi */}
              {index === experiences.length - 1 && (
                <div className="absolute left-0 top-0 w-0.5 h-24 bg-gradient-to-b from-border to-transparent" />
              )}
              <div className="absolute -left-2.5 top-0 w-5 h-5 rounded-full bg-secondary"></div>
              <div className="mb-4">
                <h6 className="text-sm text-text-secondary mb-1">{exp.period}</h6>
                <h3 className="text-xl font-bold text-text-primary">{exp.title} @ {exp.company}</h3>
                <div className="flex items-center gap-2 text-sm text-text-secondary">
                  <span>{exp.location}</span>
                  {exp.website && (
                    <>
                      <span>•</span>
                      <a
                        href={`https://${exp.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        {exp.website}
                      </a>
                    </>
                  )}
                </div>
              </div>
              <p className="text-text-secondary mb-4">{exp.description}</p>
              <div className="flex flex-wrap gap-2">
                {exp.skills.map((skill) => (
                  <span
                    key={skill}
                    className="bg-card-bg text-text-secondary px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      {/* Contact bölümüne geçiş için gradient ve blur efektleri */}
      <div className="absolute bottom-0 left-0 right-0 h-[400px] bg-gradient-to-b from-transparent via-card-bg/50 to-card-bg pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-blue/10 rounded-full filter blur-[128px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-purple/10 rounded-full filter blur-[128px] pointer-events-none" />
    </section>
  )
}

export default Experience 