import { useEffect, useRef, useState } from 'react'

export function useCursor() {
  const dotRef   = useRef(null)
  const ringRef  = useRef(null)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    let cx = window.innerWidth / 2
    let cy = window.innerHeight / 2
    let rx = cx, ry = cy
    let animId

    const onMove = (e) => {
      cx = e.clientX
      cy = e.clientY
      if (dotRef.current) {
        dotRef.current.style.left = cx + 'px'
        dotRef.current.style.top  = cy + 'px'
      }
    }

    const lerp = () => {
      rx += (cx - rx) * 0.13
      ry += (cy - ry) * 0.13
      if (ringRef.current) {
        ringRef.current.style.left = rx + 'px'
        ringRef.current.style.top  = ry + 'px'
      }
      animId = requestAnimationFrame(lerp)
    }

    window.addEventListener('mousemove', onMove)
    animId = requestAnimationFrame(lerp)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(animId)
    }
  }, [])

  const bindHover = {
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
  }

  return { dotRef, ringRef, hovered, bindHover }
}
