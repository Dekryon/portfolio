import { useEffect } from 'react'
import SmoothScroll from './components/SmoothScroll.jsx'
import Loader from './components/Loader.jsx'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Manifesto from './components/Manifesto.jsx'
import About from './components/About.jsx'
import TechMarquee from './components/TechMarquee.jsx'
import Projects from './components/Projects.jsx'
import NowPlaying from './components/NowPlaying.jsx'
import Skills from './components/Skills.jsx'
import ExperienceTimeline from './components/ExperienceTimeline.jsx'
import Education from './components/Education.jsx'
import Philosophy from './components/Philosophy.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import BackToTop from './components/BackToTop.jsx'

export default function App() {
  useEffect(() => {
    document.body.classList.add('grain')
    return () => document.body.classList.remove('grain')
  }, [])

  return (
    <SmoothScroll>
      <Loader />
      <Navbar />
      <main className="relative">
        <Hero />
        <Manifesto />
        <About />
        <TechMarquee />
        <Projects />
        <NowPlaying />
        <Skills />
        <ExperienceTimeline />
        <Education />
        <Philosophy />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </SmoothScroll>
  )
}
