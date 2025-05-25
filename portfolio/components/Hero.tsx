'use client'

import { useScroll, useTransform, motion } from 'framer-motion'
import Image from 'next/image'
import { useRef, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import '../i18n'

const ANIMATION_DURATION = 600 // ms

const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    if (media.matches !== matches) {
      setMatches(media.matches)
    }
    const listener = () => setMatches(media.matches)
    media.addEventListener('change', listener)
    return () => media.removeEventListener('change', listener)
  }, [matches, query])

  return matches
}

const Hero = () => {
  const containerRef = useRef(null)
  const { t } = useTranslation()
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const isDesktop = useMediaQuery('(min-width: 768px)')
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const [hoveredSide, setHoveredSide] = useState<null | 'designer' | 'coder'>(null)
  const [zIndexSide, setZIndexSide] = useState<null | 'designer' | 'coder'>(null)
  const [selectedSide, setSelectedSide] = useState<null | 'designer' | 'coder'>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (hoveredSide) {
      setZIndexSide(hoveredSide)
    } else {
      const timeout = setTimeout(() => setZIndexSide(null), ANIMATION_DURATION)
      return () => clearTimeout(timeout)
    }
  }, [hoveredSide])

  const handleSideClick = (side: 'designer' | 'coder') => {
    setSelectedSide(selectedSide === side ? null : side)
  }

  if (!mounted) {
    return null
  }

  return (
    <div ref={containerRef} className="h-screen w-full relative z-20 mt-20 overflow-hidden bg-primary flex items-center  md:pt-32">
      {/* Sol Taraf - Coder */}
      <motion.div
        className="absolute left-0 w-1/2 h-full z-30 md:hidden cursor-pointer"
        onClick={() => handleSideClick('coder')}
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: selectedSide === 'coder' ? 1 : 0,
          y: selectedSide === 'coder' ? 0 : 20 
        }}
        className="absolute left-4 bottom-20 z-40 text-left md:hidden"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-transparent -z-10" />
          <h1 className="text-4xl font-bold mb-4 text-shadow-lg">{t('hero.coder.title')}</h1>
          <p className="text-text-secondary text-base max-w-[42vw] text-shadow">
            {t('hero.coder.description')}
          </p>
        </div>
      </motion.div>

      {/* Masaüstü Sol Taraf */}
      <div
        className="absolute left-[10%] top-[30%] z-10 text-left hidden md:block"
        onMouseEnter={() => setHoveredSide('coder')}
        onMouseLeave={() => setHoveredSide(null)}
        style={{
          opacity: hoveredSide === 'designer' ? 0.3 : 1,
          transition: 'opacity 0.4s'
        }}
      >
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-transparent -z-10" />
          <h1 className="text-7xl font-bold mb-6 text-shadow-lg">{t('hero.coder.title')}</h1>
          <p className="text-text-secondary text-xl max-w-sm text-shadow">
            {t('hero.coder.description')}
          </p>
        </div>
      </div>

      {/* Sağ Taraf - Problem Çözücü */}
      <motion.div
        className="absolute right-0 w-1/2 h-full z-30 md:hidden cursor-pointer"
        onClick={() => handleSideClick('designer')}
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: selectedSide === 'designer' ? 1 : 0,
          y: selectedSide === 'designer' ? 0 : 20 
        }}
        className="absolute right-4 bottom-20 z-40 text-right md:hidden"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-transparent -z-10" />
          <h1 className="text-4xl font-bold mb-4 text-shadow-lg">{t('hero.problemSolver.title')}</h1>
          <p className="text-text-secondary text-base max-w-[42vw] ml-auto text-shadow">
            {t('hero.problemSolver.description')}
          </p>
        </div>
      </motion.div>

      {/* Masaüstü Sağ Taraf */}
      <div
        className="absolute right-[10%] top-[30%] z-10 text-right hidden md:block"
        onMouseEnter={() => setHoveredSide('designer')}
        onMouseLeave={() => setHoveredSide(null)}
        style={{
          opacity: hoveredSide === 'coder' ? 0.3 : 1,
          transition: 'opacity 0.4s'
        }}
      >
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-transparent -z-10" />
          <h1 className="text-7xl font-bold mb-6 text-shadow-lg">{t('hero.problemSolver.title')}</h1>
          <p className="text-text-secondary text-xl max-w-sm ml-auto text-shadow">
            {t('hero.problemSolver.description')}
          </p>
        </div>
      </div>

      {/* Orta - Profil Fotoğrafları */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="relative w-[900px] h-[900px]">
          {/* Coder Fotoğrafı */}
          <motion.div
            style={{
              transform: `translateY(${imageY})`,
              zIndex: zIndexSide === 'coder' ? 30 : 20
            }}
            className="absolute inset-0 w-full h-full"
            animate={{
              clipPath:
                isDesktop
                  ? hoveredSide === 'coder'
                    ? 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
                    : hoveredSide === 'designer'
                      ? 'polygon(0 0, 50% 0, 50% 100%, 0 100%)'
                      : 'polygon(0 0, 50% 0, 50% 100%, 0 100%)'
                  : selectedSide === 'coder'
                    ? 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
                    : selectedSide === 'designer'
                      ? 'polygon(0 0, 0 0, 0 100%, 0 100%)'
                      : 'polygon(0 0, 50% 0, 50% 100%, 0 100%)'
            }}
            transition={{ duration: ANIMATION_DURATION / 1000, ease: 'easeInOut' }}
          >
            <Image
              src="/profile_picture_code.png"
              alt={t('hero.coder.title')}
              fill
              sizes="900px"
              quality={100}
              className="object-contain bg-primary"
              style={{ objectPosition: 'center' }}
              priority
            />
          </motion.div>

          {/* Problem Çözücü Fotoğrafı */}
          <motion.div
            style={{
              transform: `translateY(${imageY})`,
              zIndex: zIndexSide === 'designer' ? 30 : 20
            }}
            className="absolute inset-0 w-full h-full"
            animate={{
              clipPath:
                isDesktop
                  ? hoveredSide === 'designer'
                    ? 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
                    : hoveredSide === 'coder'
                      ? 'polygon(50% 0, 100% 0, 100% 100%, 50% 100%)'
                      : 'polygon(50% 0, 100% 0, 100% 100%, 50% 100%)'
                  : selectedSide === 'designer'
                    ? 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
                    : selectedSide === 'coder'
                      ? 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)'
                      : 'polygon(50% 0, 100% 0, 100% 100%, 50% 100%)'
            }}
            transition={{ duration: ANIMATION_DURATION / 1000, ease: 'easeInOut' }}
          >
            <Image
              src="/profile_picture.png"
              alt={t('hero.problemSolver.title')}
              fill
              sizes="900px"
              quality={100}
              className="object-contain bg-primary"
              style={{ objectPosition: 'center' }}
              priority
            />
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Hero 