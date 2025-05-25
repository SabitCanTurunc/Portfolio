'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import '../i18n'

const menuItems = [
  { title: 'home', href: '#home' },
  { title: 'expertise', href: '#expertise' },
  { title: 'work', href: '#work' },
  { title: 'experience', href: '#experience' },
  { title: 'contact', href: '#contact' },
]

const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
  if (href === '#home') {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }
  if (href.startsWith('#')) {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { t, i18n } = useTranslation()

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleLanguage = () => {
    const newLang = i18n.language === 'tr' ? 'en' : 'tr'
    i18n.changeLanguage(newLang)
    localStorage.setItem('i18nextLng', newLang)
  }

  if (!mounted) {
    return null
  }

  return (
    <nav className="fixed w-full bg-black/90 backdrop-blur-sm z-50 py-3 shadow-lg">
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
        <a href="#home" className="text-white text-2xl font-bold tracking-widest select-none" onClick={e => scrollToSection(e, '#home')}>
          Sabit Can Turunç
        </a>
        {/* Masaüstü Menü */}
        <div className="hidden md:flex items-center space-x-8">
          {menuItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={e => scrollToSection(e, item.href)}
              className="uppercase text-white/80 hover:text-cyan-400 font-semibold tracking-wide transition-colors duration-200 px-2 py-1 nav-link"
            >
              {'// ' + t(`nav.${item.title}`)}
            </a>
          ))}
          <button
            onClick={toggleLanguage}
            className="px-3 py-1 rounded-md bg-cyan-600 hover:bg-cyan-500 text-white font-medium transition-colors duration-200"
          >
            {i18n.language === 'tr' ? 'EN' : 'TR'}
          </button>
        </div>
        {/* Mobil Menü Butonu */}
        <div className="md:hidden flex items-center space-x-4">
          <button
            onClick={toggleLanguage}
            className="px-3 py-1 rounded-md bg-cyan-600 hover:bg-cyan-500 text-white font-medium transition-colors duration-200"
          >
            {i18n.language === 'tr' ? 'EN' : 'TR'}
          </button>
          <button
            className="text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>
      {/* Mobil Menü */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-black/95 px-4 pt-4 pb-6"
        >
          <div className="flex flex-col space-y-4">
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={e => { scrollToSection(e, item.href); setIsOpen(false); }}
                className="uppercase text-white/80 hover:text-cyan-400 font-semibold tracking-wide transition-colors duration-200 px-2 py-1 nav-link"
              >
                {'// ' + t(`nav.${item.title}`)}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  )
}

export default Navbar 