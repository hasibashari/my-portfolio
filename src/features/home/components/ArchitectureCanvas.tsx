'use client'

import { useEffect, useRef } from 'react'

export default function ArchitectureCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    let animationFrameId: number
    let isRunning = true
    let width = 0
    let height = 0
    let dpr = 1

    // Mouse coordinates and state
    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      radius: 140,
      active: false,
      alpha: 0,
      targetAlpha: 0,
    }

    const GRID_SPACING = 38 // Distance between dots
    const BASE_DOT_RADIUS = 1.2
    const ACTIVE_DOT_RADIUS = 2.4
    const NEIGHBOR_CONNECT_DIST = 52

    interface Dot {
      x: number
      y: number
      col: number
      row: number
    }

    let dots: Dot[] = []

    const initGrid = () => {
      dots = []
      const cols = Math.ceil(width / GRID_SPACING) + 1
      const rows = Math.ceil(height / GRID_SPACING) + 1

      // Center offset
      const offsetX = (width - (cols - 1) * GRID_SPACING) / 2
      const offsetY = (height - (rows - 1) * GRID_SPACING) / 2

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          dots.push({
            x: offsetX + c * GRID_SPACING,
            y: offsetY + r * GRID_SPACING,
            col: c,
            row: r,
          })
        }
      }
    }

    const resize = () => {
      const parent = canvas.parentElement
      if (!parent) return

      const rect = parent.getBoundingClientRect()
      width = rect.width
      height = rect.height
      dpr = Math.min(window.devicePixelRatio || 1, 2)

      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`

      ctx.scale(dpr, dpr)
      initGrid()
    }

    resize()

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const parent = canvas.parentElement
      if (!parent) return

      const rect = parent.getBoundingClientRect()
      let clientX = 0
      let clientY = 0

      if ('touches' in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX
        clientY = e.touches[0].clientY
      } else if ('clientX' in e) {
        clientX = e.clientX
        clientY = e.clientY
      } else {
        return
      }

      mouse.targetX = clientX - rect.left
      mouse.targetY = clientY - rect.top
      mouse.active = true
      mouse.targetAlpha = 1

      if (!isRunning) {
        isRunning = true
        render()
      }
    }

    const handlePointerLeave = () => {
      mouse.active = false
      mouse.targetAlpha = 0
    }

    const parent = canvas.parentElement
    if (parent) {
      parent.addEventListener('mousemove', handlePointerMove, { passive: true })
      parent.addEventListener('touchmove', handlePointerMove, { passive: true })
      parent.addEventListener('mouseleave', handlePointerLeave)
      parent.addEventListener('touchend', handlePointerLeave)
    }

    const resizeObserver = new ResizeObserver(() => {
      resize()
    })
    if (parent) resizeObserver.observe(parent)

    // Render loop
    const render = () => {
      // Smooth lerp mouse position & alpha
      mouse.x += (mouse.targetX - mouse.x) * 0.12
      mouse.y += (mouse.targetY - mouse.y) * 0.12
      mouse.alpha += (mouse.targetAlpha - mouse.alpha) * 0.08

      // Clear canvas
      ctx.clearRect(0, 0, width, height)

      // Active dots array for drawing connection lines
      const activeDots: { dot: Dot; intensity: number }[] = []

      // 1. Draw Dots
      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i]
        const dx = dot.x - mouse.x
        const dy = dot.y - mouse.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        let intensity = 0
        if (mouse.alpha > 0.01 && dist < mouse.radius) {
          intensity = (1 - dist / mouse.radius) * mouse.alpha
          activeDots.push({ dot, intensity })
        }

        // Calculate dynamic dot size & color
        const dotRadius = BASE_DOT_RADIUS + (ACTIVE_DOT_RADIUS - BASE_DOT_RADIUS) * intensity
        
        ctx.beginPath()
        ctx.arc(dot.x, dot.y, dotRadius, 0, Math.PI * 2)

        if (intensity > 0.02) {
          // Glow state: warm terracotta / coral accent
          ctx.fillStyle = `rgba(204, 120, 92, ${0.25 + intensity * 0.75})`
        } else {
          // Idle state: subtle muted hairline dot
          ctx.fillStyle = 'rgba(20, 20, 19, 0.055)'
        }
        ctx.fill()
      }

      // 2. Draw Architectural Network Lines between neighboring active dots
      if (activeDots.length > 1) {
        ctx.lineWidth = 1
        for (let i = 0; i < activeDots.length; i++) {
          const a = activeDots[i]
          for (let j = i + 1; j < activeDots.length; j++) {
            const b = activeDots[j]
            const lineDist = Math.hypot(a.dot.x - b.dot.x, a.dot.y - b.dot.y)

            // Connect only immediate horizontal/vertical/diagonal grid neighbors
            if (lineDist <= NEIGHBOR_CONNECT_DIST) {
              const lineAlpha = (a.intensity * b.intensity) * 0.45
              if (lineAlpha > 0.01) {
                ctx.beginPath()
                ctx.moveTo(a.dot.x, a.dot.y)
                ctx.lineTo(b.dot.x, b.dot.y)
                ctx.strokeStyle = `rgba(204, 120, 92, ${lineAlpha})`
                ctx.stroke()
              }
            }
          }
        }
      }

      // 3. Check idle sleep to save 0% CPU
      if (!mouse.active && mouse.alpha < 0.005) {
        mouse.alpha = 0
        ctx.clearRect(0, 0, width, height)
        // Redraw only static idle dots once
        for (let i = 0; i < dots.length; i++) {
          const dot = dots[i]
          ctx.beginPath()
          ctx.arc(dot.x, dot.y, BASE_DOT_RADIUS, 0, Math.PI * 2)
          ctx.fillStyle = 'rgba(20, 20, 19, 0.055)'
          ctx.fill()
        }
        isRunning = false
        return
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      isRunning = false
      cancelAnimationFrame(animationFrameId)
      if (parent) {
        parent.removeEventListener('mousemove', handlePointerMove)
        parent.removeEventListener('touchmove', handlePointerMove)
        parent.removeEventListener('mouseleave', handlePointerLeave)
        parent.removeEventListener('touchend', handlePointerLeave)
        resizeObserver.unobserve(parent)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
      aria-hidden="true"
    />
  )
}
