'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslations, useLocale } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'

const menuItems = [
  { title: 'home', hash: 'home' },
  { title: 'expertise', hash: 'expertise' },
  { title: 'work', hash: 'work' },
  { title: 'experience', hash: 'experience' },
  { title: 'contact', hash: 'contact' },
] as const

// JavaScript scroll intercept removed: using CSS scroll-behavior: smooth
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const t = useTranslations()
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  /** Hash linkleri goreli oldugunda /admin gibi sayfalarda /admin#home olur; her zaman ana sayfaya sabitle */
  const anaSayfaBolum = (hash: string) => `/${locale}#${hash}`

  const toggleLanguage = () => {
    const newLang = locale === 'tr' ? 'en' : 'tr'
    const newPath = pathname === `/${locale}`
      ? `/${newLang}`
      : pathname.replace(`/${locale}/`, `/${newLang}/`)
    router.replace(newPath)
  }

  return (
    <nav className="fixed w-full bg-black/90 backdrop-blur-sm z-50 py-3 shadow-lg">
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
        <a href={anaSayfaBolum('home')} className="text-white text-2xl font-bold tracking-widest select-none">
          Sabit Can Turunç
        </a>
        {/* Masaüstü Menü */}
        <div className="hidden md:flex items-center space-x-8">
          {menuItems.map((item) => (
            <a
              key={item.hash}
              href={anaSayfaBolum(item.hash)}
              className="uppercase text-white/80 hover:text-cyan-400 font-semibold tracking-wide transition-colors duration-300 px-2 py-1"
            >
              {'// ' + t(`nav.${item.title}`)}
            </a>
          ))}
          <button
            type="button"
            onClick={toggleLanguage}
            className="px-3 py-1 rounded-md bg-cyan-600 hover:bg-cyan-500 text-white font-medium transition-colors duration-200"
          >
            {locale === 'tr' ? 'EN' : 'TR'}
          </button>
        </div>
        {/* Mobil Menü Butonu */}
        <div className="md:hidden flex items-center space-x-4">
          <button
            type="button"
            onClick={toggleLanguage}
            className="px-3 py-1 rounded-md bg-cyan-600 hover:bg-cyan-500 text-white font-medium transition-colors duration-200"
          >
            {locale === 'tr' ? 'EN' : 'TR'}
          </button>
          <button
            type="button"
            className="text-white"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Menüyü Kapat" : "Menüyü Aç"}
            aria-expanded={isOpen}
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
                key={item.hash}
                href={anaSayfaBolum(item.hash)}
                onClick={() => setIsOpen(false)}
                className="uppercase text-white/80 hover:text-cyan-400 font-semibold tracking-wide transition-colors duration-300 px-2 py-1"
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