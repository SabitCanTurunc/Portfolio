'use client'

import { motion } from 'framer-motion'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center text-sm text-text-secondary"
        >
          © {currentYear}. Made with passion by Sabit Can Turunç.
          <br />
          All rights reserved.
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer 