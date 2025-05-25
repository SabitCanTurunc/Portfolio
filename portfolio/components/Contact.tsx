'use client'

import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { FaLinkedin, FaInstagram, FaGithub } from 'react-icons/fa'
import { motion } from 'framer-motion'

const Contact = () => {
  const { t } = useTranslation()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <section id="contact" className="relative -mt-32 py-20 px-4 md:py-32 bg-transparent overflow-hidden">
      {/* Arka plan efekti */}
      <div className="absolute inset-0 -top-64">
        <div 
          className="absolute inset-0 bg-gradient-to-b from-card-bg via-card-bg to-card-bg"
          style={{ backdropFilter: 'blur(100px)' }}
        />
        <div className="absolute top-0 left-0 w-96 h-96 bg-accent-blue/10 rounded-full filter blur-[128px]" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-purple/10 rounded-full filter blur-[128px]" />
      </div>

      <div className="relative max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-primary text-transparent bg-clip-text">
            {t('contact.title')}
          </h2>
          <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-8">
            {t('contact.description')}
          </p>
          <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-12">
            {t('contact.cta')}
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col items-center gap-8"
        >
          <div className="flex justify-center gap-8 md:gap-16">
            <motion.a
              href="https://www.linkedin.com/in/sabit-can-turunc-15204a1b5/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t('contact.social.linkedin')}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-primary rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
              <div className="w-16 h-16 md:w-20 md:h-20 text-text-secondary group-hover:text-accent-blue transition-colors duration-300 flex items-center justify-center">
                <FaLinkedin size="100%" />
              </div>
            </motion.a>

            <motion.a
              href="https://www.instagram.com/sabitcanturunc/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t('contact.social.instagram')}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-primary rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
              <div className="w-16 h-16 md:w-20 md:h-20 text-text-secondary group-hover:text-accent-blue transition-colors duration-300 flex items-center justify-center">
                <FaInstagram size="100%" />
              </div>
            </motion.a>

            <motion.a
              href="https://github.com/sabitcanturunc"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t('contact.social.github')}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-primary rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
              <div className="w-16 h-16 md:w-20 md:h-20 text-text-secondary group-hover:text-accent-blue transition-colors duration-300 flex items-center justify-center">
                <FaGithub size="100%" />
              </div>
            </motion.a>
          </div>

          <motion.a
            href="mailto:turuncsc@gmail.com"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-12 px-8 py-4 bg-gradient-primary rounded-full text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-shadow duration-300 backdrop-blur-sm bg-opacity-80 flex items-center gap-3"
          >
            <span>turuncsc@gmail.com</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact 