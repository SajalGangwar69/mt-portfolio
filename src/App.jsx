import { useState, useEffect, useRef, Suspense, lazy } from 'react'
import { AnimatePresence } from 'framer-motion'

import { useSection } from './hooks/useSection'
import Nav from './components/Nav'
import SectionDots from './components/SectionDots'
import SectionWrapper from './components/SectionWrapper'
import Cursor from './components/Cursor'
import HUD from './components/HUD'
import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
import SkillsSection from './components/SkillsSection'
import ExperienceSection from './components/ExperienceSection'
import ProjectsSection from './components/ProjectsSection'
import GitHubSection from './components/GitHubSection'
import ContactSection from './components/ContactSection'
import MouseTrail from './components/MouseTrail'


// Lazy load the heavy 3D scene
const Scene = lazy(() => import('./components/Scene'))

const SECTIONS = [
  HeroSection,
  AboutSection,
  SkillsSection,
  ExperienceSection,
  ProjectsSection,
  GitHubSection,
  ContactSection,
]

export default function App() {
  const { current, goTo, progress, label, total } = useSection()
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e) => {
      setMouse({
        x: (e.clientX / window.innerWidth  - 0.5) * 2,
        y: -(e.clientY / window.innerHeight - 0.5) * 2,
      })
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  const CurrentSection = SECTIONS[current]

  return (
    <>
      {/* Custom cursor and trail */}
      <MouseTrail />
      <Cursor />

      {/* Three.js background */}
      <Suspense fallback={null}>
        <Scene section={current} mouseX={mouse.x} mouseY={mouse.y} />
      </Suspense>

      {/* Navigation */}
      <Nav current={current} goTo={goTo} />
      <SectionDots current={current} total={total} goTo={goTo} />
      <HUD progress={progress} label={label} />

      {/* Animated section swap */}
      <AnimatePresence mode="wait">
        <SectionWrapper key={current} id={`section-${current}`}>
          <CurrentSection goTo={goTo} />
        </SectionWrapper>
      </AnimatePresence>
    </>
  )
}
