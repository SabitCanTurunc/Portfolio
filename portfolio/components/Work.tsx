'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const projects = [
  {
    title: 'Flight Local',
    subtitle: 'B2B Travel Solution',
    category: 'Web Development',
    image: 'https://placehold.co/800x600/6E07F3/FFFFFF/webp?text=Flight+Local',
  },
  {
    title: 'AI Lab Granada',
    category: 'Web Development',
    image: 'https://placehold.co/800x600/6E07F3/FFFFFF/webp?text=AI+Lab+Granada',
  },
  {
    title: 'Tryotel',
    subtitle: 'Cross-Platform Travel App',
    category: 'Mobile Development',
    image: 'https://placehold.co/800x600/6E07F3/FFFFFF/webp?text=Tryotel+App',
    featured: true,
  },
  {
    title: 'Khora',
    subtitle: 'Urban Thinkers Consulting Firm',
    category: 'Web Development',
    image: 'https://placehold.co/800x600/6E07F3/FFFFFF/webp?text=Khora',
  },
  {
    title: 'Tapy',
    subtitle: 'Download. Connect. Unlock.',
    category: 'Web Development',
    image: 'https://placehold.co/800x600/6E07F3/FFFFFF/webp?text=Tapy',
  },
  {
    title: 'Walker IP',
    subtitle: 'Pty Ltd',
    category: 'Web Development',
    image: 'https://placehold.co/800x600/6E07F3/FFFFFF/webp?text=Walker+IP',
  },
  {
    title: 'Tryotel Web',
    subtitle: 'B2C Platform',
    category: 'Web Development',
    image: 'https://placehold.co/800x600/6E07F3/FFFFFF/webp?text=Tryotel+Web',
  },
  {
    title: 'Kananaskis Nordic Spa',
    subtitle: 'Website',
    category: 'Web Development',
    image: 'https://placehold.co/800x600/6E07F3/FFFFFF/webp?text=Kananaskis',
  },
  {
    title: 'A Higher Thought',
    category: 'Web Development',
    image: 'https://placehold.co/800x600/6E07F3/FFFFFF/webp?text=A+Higher+Thought',
  },
  {
    title: 'All the roads of Chittagong',
    category: 'Data Visualization',
    image: 'https://placehold.co/800x600/6E07F3/FFFFFF/webp?text=Chittagong',
  },
]

const categories = [
  { id: 'all', name: 'All', count: projects.length },
  { 
    id: 'data-visualization', 
    name: 'Data Visualization',
    count: projects.filter(p => p.category === 'Data Visualization').length 
  },
  { 
    id: 'web-development', 
    name: 'Web Development',
    count: projects.filter(p => p.category === 'Web Development').length 
  },
]

const Work = () => {
  return (
    <section id="work" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-text-primary">
            Çalışmalarım
          </h2>
          <p className="text-text-secondary max-w-3xl mx-auto mb-12">
            React SPA ve PWA kullanarak ölçeklenebilir seyahat, etkinlik ve teletıp web ve hibrit mobil uygulamaları geliştirdim.
            Dünya çapında 50+ müşteri ile 140+ projede işbirliği yaptım.
          </p>

          {/* Kategori Filtreleme */}
          <div className="flex justify-center gap-4 mb-12">
            <span className="text-text-secondary">Filter by</span>
            {categories.map((cat) => (
              <button
                key={cat.id}
                className="text-text-secondary hover:text-text-primary transition-colors"
              >
                {cat.name} {cat.count.toString().padStart(2, '0')}
              </button>
            ))}
          </div>

          {/* Featured Project */}
          {projects.filter(p => p.featured).map((project) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h3 className="text-2xl font-bold mb-4 text-text-primary">Öne Çıkan Proje</h3>
              <h4 className="text-3xl font-bold mb-8 text-text-primary">
                {project.title}
                {project.subtitle && <span className="block text-xl text-text-secondary mt-2">{project.subtitle}</span>}
              </h4>
              <div className="aspect-video relative max-w-4xl mx-auto">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            </motion.div>
          ))}

          {/* Project Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.filter(p => !p.featured).map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className="aspect-video relative">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover rounded-lg"
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