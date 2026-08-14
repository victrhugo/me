"use client"

import { useEffect, useRef } from "react"

interface Point {
  x: number
  y: number
  t: number
}

const TRAIL_MS = 450
const MAX_WIDTH = 1.6

export function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    if (!window.matchMedia("(pointer: fine)").matches) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let width = window.innerWidth
    let height = window.innerHeight

    function resize() {
      width = window.innerWidth
      height = window.innerHeight
      canvas!.width = width * dpr
      canvas!.height = height * dpr
      ctx!.scale(dpr, dpr)
    }
    resize()
    window.addEventListener("resize", resize)

    const points: Point[] = []

    function handlePointerMove(event: PointerEvent) {
      points.push({ x: event.clientX, y: event.clientY, t: performance.now() })
    }
    window.addEventListener("pointermove", handlePointerMove)

    let frame: number
    function draw() {
      const now = performance.now()
      while (points.length && now - points[0].t > TRAIL_MS) points.shift()

      ctx!.clearRect(0, 0, width, height)

      if (points.length > 1) {
        for (let i = 1; i < points.length; i++) {
          const previous = points[i - 1]
          const point = points[i]
          const age = 1 - (now - point.t) / TRAIL_MS
          if (age <= 0) continue

          ctx!.beginPath()
          ctx!.moveTo(previous.x, previous.y)
          ctx!.lineTo(point.x, point.y)
          ctx!.strokeStyle = `oklch(0.75 0.13 70 / ${(age * 0.5).toFixed(3)})`
          ctx!.lineWidth = Math.max(0.4, age * MAX_WIDTH)
          ctx!.lineCap = "round"
          ctx!.stroke()
        }
      }

      frame = requestAnimationFrame(draw)
    }
    frame = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("resize", resize)
      window.removeEventListener("pointermove", handlePointerMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ width: "100vw", height: "100vh" }}
      className="pointer-events-none fixed inset-0 z-30"
      aria-hidden="true"
    />
  )
}
