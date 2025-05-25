'use client'

import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

const Footer = () => {
  const { t } = useTranslation()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <footer className="py-5 text-center">
      <p className="text-sm mt-2 opacity-50">
        {t('footer.copyright', { year: new Date().getFullYear() })}
      </p>
      <p className="text-sm mt-2 opacity-50">
        {t('footer.rights')}
      </p>
    </footer>
  )
}

export default Footer 