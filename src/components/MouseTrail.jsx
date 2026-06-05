import { useEffect, useRef } from 'react'
import styles from './MouseTrail.module.css'

export default function MouseTrail() {
  const canvasRef = useRef(null)
  const mouse = useRef({ x: 0, y: 0, moved: false })
  const points = useRef([])
  const particles = useRef([])
  const MAX_POINTS = 20

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animationId

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const onMouseMove = (e) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY
      mouse.current.moved = true
      
      // Calculate velocity and spawn particles if moving fast
      if (points.current.length > 0) {
        const lastPoint = points.current[points.current.length - 1]
        const dx = e.clientX - lastPoint.x
        const dy = e.clientY - lastPoint.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        
        if (dist > 10) {
          for (let i = 0; i < 2; i++) {
            particles.current.push({
              x: e.clientX,
              y: e.clientY,
              vx: (Math.random() - 0.5) * 4,
              vy: (Math.random() - 0.5) * 4,
              life: 1.0,
              size: Math.random() * 2 + 1
            })
          }
        }
      }
    }

    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMouseMove)
    resize()

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      if (mouse.current.moved) {
        points.current.push({ x: mouse.current.x, y: mouse.current.y })
        if (points.current.length > MAX_POINTS) {
          points.current.shift()
        }
      }

      // Draw trail
      if (points.current.length > 1) {
        ctx.beginPath()
        ctx.moveTo(points.current[0].x, points.current[0].y)

        for (let i = 1; i < points.current.length; i++) {
          const pt = points.current[i]
          ctx.lineTo(pt.x, pt.y)
        }

        // Tapering glow effect
        const gradient = ctx.createLinearGradient(
          points.current[0].x, points.current[0].y,
          points.current[points.current.length - 1].x, points.current[points.current.length - 1].y
        )
        
        // Use colors that fit the space theme
        ctx.strokeStyle = '#00f2ff'
        ctx.lineWidth = 2
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'
        
        // Glow
        ctx.shadowBlur = 10
        ctx.shadowColor = '#00f2ff'
        
        ctx.stroke()
        
        // Draw a brighter head
        const head = points.current[points.current.length - 1]
        ctx.beginPath()
        ctx.arc(head.x, head.y, 4, 0, Math.PI * 2)
        ctx.fillStyle = '#fff'
        ctx.shadowBlur = 20
        ctx.fill()
      }

      // Draw particles
      particles.current.forEach((p, index) => {
        p.x += p.vx
        p.y += p.vy
        p.life -= 0.02
        
        if (p.life <= 0) {
          particles.current.splice(index, 1)
        } else {
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(0, 242, 255, ${p.life})`
          ctx.shadowBlur = 5
          ctx.fill()
        }
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return <canvas ref={canvasRef} className={styles.canvas} />
}
