'use client'

import { motion } from 'framer-motion'

const experiences = [
  {
    title: 'Co-Founder',
    company: 'Life Coach Elevate',
    period: '2024 - Present',
    location: 'Arizona, USA',
    website: 'lifecoachelevate.com',
    description: 'Co-founded Life Coach Elevate, managing end-to-end technical infrastructure, including server architecture, automation pipeline development, leadership of the web development and design team, and driving initiatives to optimize scalability and system performance.',
    skills: ['DevOps', 'CI/CD', 'Kubernetes', 'JS/TS', 'NextJS'],
  },
  {
    title: 'Senior Lead Software Engineer',
    company: 'Saimon Global Ltd',
    period: '2019 - 2024',
    location: 'Dhaka, Bangladesh',
    website: 'saimonglobal.com',
    description: 'Led a frontend team to design and develop robust B2C and B2B Travel Tech solutions, utilizing React/Next.js for web applications, with a focus on responsive design, scalability, and enhanced user experience.',
    skills: ['Java','Python','Angular', 'TS', 'React', 'NextJS',],
  },
  {
    title: 'Web Developer',
    company: 'influenceTHIS Canada',
    period: '2018-2019',
    location: 'Remote (Toronto, Canada)',
    website: 'influencethis.ca',
    description: 'Developed the UI and UX eco-system for a conference event platform using modular component structures with JS, SCSS, Gulp on Node.',
    skills: ['JS', 'GULP', 'SCSS', 'Nodejs'],
  },
]

const Experience = () => {
  return (
    <section id="experience" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-text-primary">
            Professional Experience
          </h2>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-12">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative pl-8 border-l-2 border-border"
            >
              <div className="absolute -left-2.5 top-0 w-5 h-5 rounded-full bg-secondary"></div>
              <div className="mb-4">
                <h6 className="text-sm text-text-secondary mb-1">{exp.period}</h6>
                <h3 className="text-xl font-bold text-text-primary">{exp.title} @ {exp.company}</h3>
                <div className="flex items-center gap-2 text-sm text-text-secondary">
                  <span>{exp.location}</span>
                  <span>•</span>
                  <a
                    href={`https://${exp.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {exp.website}
                  </a>
                </div>
              </div>
              <p className="text-text-secondary mb-4">{exp.description}</p>
              <div className="flex flex-wrap gap-2">
                {exp.skills.map((skill) => (
                  <span
                    key={skill}
                    className="bg-card-bg text-text-secondary px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience 