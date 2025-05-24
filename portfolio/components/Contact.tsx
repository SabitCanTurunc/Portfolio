'use client'

import { motion } from 'framer-motion'
import { FaLinkedin, FaInstagram, FaGithub, FaFacebookMessenger } from 'react-icons/fa'

const Contact = () => {
  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Available for select freelance opportunities
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Have an exciting project you need help with?
            Send me an email or contact me via instant message!
          </p>
          <a
            href="mailto:turuncsc@gmail.com"
            className="text-xl text-gray-800 hover:underline"
          >
            turuncsc@gmail.com
          </a>

          <div className="flex justify-center gap-6 mt-8">
            
            <a
              href="https://www.linkedin.com/in/sabit-can-turunc-15204a1b5/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors text-xl"
            >
              <FaLinkedin /> LinkedIn
            </a>
            <a
              href="https://www.instagram.com/sabitcanturunc/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors text-xl"
            >
              <FaInstagram /> Instagram
            </a>
            <a
              href="https://github.com/SabitCanTurunc"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors text-xl"
            >
              <FaGithub /> Github
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact 