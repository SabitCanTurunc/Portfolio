import Hero from '@/components/Hero'
import Expertise from '@/components/Expertise'
import Work from '@/components/Work'
import Experience from '@/components/Experience'
import Contact from '@/components/Contact'

export default function Home() {
  return (
    <main className="min-h-screen bg-primary">
      <Hero />
      <Expertise />
      <Work />
      <Experience />
      <Contact />
    </main>
  )
}
