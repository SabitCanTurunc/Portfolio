'use client'

import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useState, useEffect } from 'react'
import '../i18n'

const Expertise = () => {
  const { t } = useTranslation()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const expertiseData = [
    {
      title: (
        <span className="inline-block border-b-4 border-pink-500 px-2 pb-1">
          {t('expertise.backend.title')}
        </span>
      ),
      subtitle: t('expertise.backend.subtitle'),
      description: t('expertise.backend.description'),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-14 h-14 mx-auto mb-4 text-text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      title: (
        <span className="inline-block border-b-4 border-blue-500 px-2 pb-1">
          {t('expertise.frontend.title')}
        </span>
      ),
      subtitle: t('expertise.frontend.subtitle'),
      description: t('expertise.frontend.description'),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-14 h-14 mx-auto mb-4 text-text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
  ]

  if (!mounted) {
    return null
  }

  return (
    <section id="expertise" className="py-8 relative bg-primary">
      {/* Arka plan kodu */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: 'url("/hello-world-html-code.webp")',
          backgroundRepeat: 'repeat',
          backgroundSize: '800px auto',
          backgroundPosition: 'center',
          opacity: 0.05,
          transform: 'rotate(-5deg) scale(1.5)',
        }}
      />

      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-text-primary">
            {t('expertise.title')}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto justify-items-center">
          {expertiseData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-[#18181b] border border-border rounded-xl p-8 flex flex-col items-center w-full max-w-md min-h-[340px] shadow-lg"
            >
              {item.icon}
              <h3 className="text-2xl font-bold mb-2 text-text-primary text-center">{item.title}</h3>
              <h4 className="text-text-secondary mb-4 text-center">{item.subtitle}</h4>
              <p className="text-text-secondary text-center font-mono text-base">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Expertise 