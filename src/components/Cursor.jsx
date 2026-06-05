import { useEffect, useRef } from 'react'
import styles from './Cursor.module.css'

export default function Cursor() {
  const dotRef  = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    let cx = window.innerWidth  / 2
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

  // Hover expansion
  useEffect(() => {
    const expand = () => {
      if (dotRef.current)  dotRef.current.classList.add(styles.hovered)
      if (ringRef.current) ringRef.current.classList.add(styles.hovered)
    }
    const shrink = () => {
      if (dotRef.current)  dotRef.current.classList.remove(styles.hovered)
      if (ringRef.current) ringRef.current.classList.remove(styles.hovered)
    }
    document.querySelectorAll('a, button, [data-hover]').forEach(el => {
      el.addEventListener('mouseenter', expand)
      el.addEventListener('mouseleave', shrink)
    })
    return () => {
      document.querySelectorAll('a, button, [data-hover]').forEach(el => {
        el.removeEventListener('mouseenter', expand)
        el.removeEventListener('mouseleave', shrink)
      })
    }
  }, [])

  return (
    <>
      <div ref={dotRef}  className={styles.dot}  />
      <div ref={ringRef} className={styles.ring} />
    </>
  )
}
