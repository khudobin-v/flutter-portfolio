import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import About from '@/components/sections/About'
import AIStack from '@/components/sections/AIStack'
import Portfolio from '@/components/sections/Portfolio'
import Process from '@/components/sections/Process'
import TechStack from '@/components/sections/TechStack'
import Pricing from '@/components/sections/Pricing'
import Testimonials from '@/components/sections/Testimonials'
import FAQ from '@/components/sections/FAQ'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/sections/Footer'

export default function Home() {
  return (
    <div className="density-comfy">
      <Nav darkHero />
      <Hero dark />
      <About />
      <AIStack />
      <Portfolio />
      <Process />
      <TechStack />
      <Pricing />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  )
}
