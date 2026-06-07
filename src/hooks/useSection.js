import { useState, useEffect, useCallback, useRef } from 'react'
import { SECTION_LABELS } from '../data/portfolio'

const TOTAL_SECTIONS = 6
const TRANSITION_MS = 700
const WHEEL_COOLDOWN_MS = 900
const TOUCH_THRESHOLD = 40  // px – lower = more sensitive

export function useSection() {
  const [current, setCurrent] = useState(0)
  const transitioning = useRef(false)

  const goTo = useCallback((idx) => {
    if (transitioning.current) return
    if (idx < 0 || idx >= TOTAL_SECTIONS) return
    transitioning.current = true
    setCurrent(idx)
    setTimeout(() => { transitioning.current = false }, TRANSITION_MS)
  }, [])

  const next = useCallback(() => goTo(current + 1), [current, goTo])
  const prev = useCallback(() => goTo(current - 1), [current, goTo])

  // ── Wheel (desktop) ───────────────────────────────────────────────
  useEffect(() => {
    let accumulated = 0
    let lastTime = 0

    const onWheel = (e) => {
      const now = Date.now()
      // Reset accumulator if enough time passed between scrolls
      if (now - lastTime > 200) accumulated = 0
      lastTime = now

      accumulated += e.deltaY

      if (transitioning.current) return

      if (Math.abs(accumulated) > 50) {
        if (accumulated > 0) next()
        else prev()
        accumulated = 0
      }
    }

    window.addEventListener('wheel', onWheel, { passive: true })
    return () => window.removeEventListener('wheel', onWheel)
  }, [next, prev])

  // ── Touch (mobile) — smooth one-finger swipe ─────────────────────
  useEffect(() => {
    let startY = 0
    let startX = 0
    let swiped = false          // prevent multi-fire per gesture

    const onTouchStart = (e) => {
      startY = e.touches[0].clientY
      startX = e.touches[0].clientX
      swiped = false
    }

    const onTouchMove = (e) => {
      if (swiped || transitioning.current) return

      const dy = startY - e.touches[0].clientY
      const dx = startX - e.touches[0].clientX

      // Only act on vertical swipes (ignore horizontal)
      if (Math.abs(dy) < TOUCH_THRESHOLD) return
      if (Math.abs(dx) > Math.abs(dy)) return   // horizontal swipe

      // Prevent native scroll so it feels like a controlled slide
      e.preventDefault()
      swiped = true

      if (dy > 0) next()
      else prev()
    }

    // passive: false so we can preventDefault on touchmove
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: false })

    return () => {
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
    }
  }, [next, prev])

  // ── Keyboard ──────────────────────────────────────────────────────
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
