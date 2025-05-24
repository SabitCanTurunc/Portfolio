'use client'

import { useScroll, useTransform, motion } from 'framer-motion'
import Image from 'next/image'
import { useRef, useState, useEffect } from 'react'

const ANIMATION_DURATION = 600 // ms

const Hero = () => {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const [hoveredSide, setHoveredSide] = useState<null | 'designer' | 'coder'>(null)
  const [zIndexSide, setZIndexSide] = useState<null | 'designer' | 'coder'>(null)

  useEffect(() => {
    if (hoveredSide) {
      setZIndexSide(hoveredSide)
    } else {
      const timeout = setTimeout(() => setZIndexSide(null), ANIMATION_DURATION)
      return () => clearTimeout(timeout)
    }
  }, [hoveredSide])

  return (
    <div ref={containerRef} className="h-screen w-full relative overflow-hidden bg-primary flex items-center">
      {/* Sol Taraf - Designer */}
      <div
        className="absolute left-[10%] top-[30%] z-10"
        onMouseEnter={() => setHoveredSide('designer')}
        onMouseLeave={() => setHoveredSide(null)}
        style={{
          opacity: hoveredSide === 'coder' ? 0.3 : 1,
          transition: 'opacity 0.4s'
        }}
      >
        <h1 className="text-7xl font-bold mb-6">dert babası</h1>
        <p className="text-text-secondary text-xl max-w-sm">
        Karmaşık problemleri dikkatle inceler, pratik ve kalıcı yazılım çözümleri üretirim.
        </p>
      </div>

      {/* Sağ Alt - Coder */}
      <div
        className="absolute right-[10%] top-[30%] z-10 text-right"
        onMouseEnter={() => setHoveredSide('coder')}
        onMouseLeave={() => setHoveredSide(null)}
        style={{
          opacity: hoveredSide === 'designer' ? 0.3 : 1,
          transition: 'opacity 0.4s'
        }}
      >
        <h1 className="text-7xl font-bold mb-6">{`<coder/>`}</h1>
        <p className="text-text-secondary text-xl max-w-sm ml-auto">
          Full-stack geliştirici, temiz ve
          etkili kod yazma konusunda deneyimli.
        </p>
      </div>

      {/* Orta - Profil Fotoğrafları */}
      <div className="absolute left-1/2 top-[60%] -translate-x-1/2 -translate-y-1/2">
        <div className="relative w-[900px] h-[900px]">
          {/* Designer Fotoğrafı */}
          <motion.div
            style={{
              transform: `translateY(${imageY})`,
              zIndex: zIndexSide === 'designer' ? 30 : 20
            }}
            className="absolute inset-0 w-full h-full"
            animate={{
              clipPath:
                hoveredSide === 'designer'
                  ? 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
                : hoveredSide === 'coder'
                  ? 'polygon(0 0, 50% 0, 50% 100%, 0 100%)'
                : 'polygon(0 0, 50% 0, 50% 100%, 0 100%)'
            }}
            transition={{ duration: ANIMATION_DURATION / 1000, ease: 'easeInOut' }}
          >
            <Image
              src="/profile_picture.png"
              alt="Designer Profile"
              fill
              sizes="900px"
              quality={100}
              className="object-contain bg-primary"
              style={{ objectPosition: 'center' }}
              priority
            />
          </motion.div>

          {/* Coder Fotoğrafı */}
          <motion.div
            style={{
              transform: `translateY(${imageY})`,
              zIndex: zIndexSide === 'coder' ? 30 : 20
            }}
            className="absolute inset-0 w-full h-full"
            animate={{
              clipPath:
                hoveredSide === 'coder'
                  ? 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
                : hoveredSide === 'designer'
                  ? 'polygon(50% 0, 100% 0, 100% 100%, 50% 100%)'
                : 'polygon(50% 0, 100% 0, 100% 100%, 50% 100%)'
            }}
            transition={{ duration: ANIMATION_DURATION / 1000, ease: 'easeInOut' }}
          >
            <Image
              src="/profile_picture_code.png"
              alt="Coder Profile"
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