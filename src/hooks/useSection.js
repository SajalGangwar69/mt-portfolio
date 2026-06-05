import { useState, useEffect, useCallback, useRef } from 'react'
import { SECTION_LABELS } from '../data/portfolio'

const TOTAL_SECTIONS = 6

export function useSection() {
  const [current, setCurrent] = useState(0)
  const transitioning = useRef(false)

  const goTo = useCallback((idx) => {
    if (transitioning.current) return
    if (idx < 0 || idx >= TOTAL_SECTIONS) return
    transitioning.current = true
    setCurrent(idx)
    setTimeout(() => { transitioning.current = false }, 700)
  }, [])

  const next = useCallback(() => goTo(current + 1), [current, goTo])
  const prev = useCallback(() => goTo(current - 1), [current, goTo])

  // Wheel
  useEffect(() => {
    let lastWheel = 0
    const onWheel = (e) => {
      const now = Date.now()
      if (now - lastWheel < 800) return
      lastWheel = now
      if (e.deltaY > 0) next()
      else prev()
    }
    window.addEventListener('wheel', onWheel, { passive: true })
    return () => window.removeEventListener('wheel', onWheel)
  }, [next, prev])

  // Touch
  useEffect(() => {
    let startY = 0
    const onTouchStart = (e) => { startY = e.touches[0].clientY }
    const onTouchEnd = (e) => {
      const dy = startY - e.changedTouches[0].clientY
      if (Math.abs(dy) > 50) {
        if (dy > 0) next()
        else prev()
      }
    }
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchend', onTouchEnd, { passive: true })
    return () => {
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchend', onTouchEnd)
    }
  }, [next, prev])

  // Keyboard
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown') next()
      if (e.key === 'ArrowUp'   || e.key === 'PageUp')   prev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev])

  const progress = (current / (TOTAL_SECTIONS - 1)) * 100
  const label = SECTION_LABELS[current]

  return { current, goTo, next, prev, progress, label, total: TOTAL_SECTIONS }
}
