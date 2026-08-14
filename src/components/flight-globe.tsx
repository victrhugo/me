"use client"

import { useEffect, useRef } from "react"
import { geoOrthographic, geoPath, geoDistance, geoInterpolate, geoContains } from "d3-geo"
import { feature } from "topojson-client"
import type { Topology, GeometryCollection } from "topojson-specification"
import landTopology from "world-atlas/land-110m.json"
import { flights, type City } from "@/data/travels"

const topology = landTopology as unknown as Topology<{ land: GeometryCollection }>
const land = feature(topology, topology.objects.land)

const DOTS: [number, number][] = (() => {
  const points: [number, number][] = []
  for (let lat = -80; lat <= 80; lat += 4) {
    for (let lon = -180; lon < 180; lon += 4) {
      if (geoContains(land, [lon, lat])) points.push([lon, lat])
    }
  }
  return points
})()

function greatCircle(from: City, to: City, steps = 64) {
  const interpolate = geoInterpolate([from.lon, from.lat], [to.lon, to.lat])
  return {
    type: "LineString" as const,
    coordinates: Array.from({ length: steps + 1 }, (_, i) => interpolate(i / steps)),
  }
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3)
}

const SIZE = 300
const FOCUS_MS = 700

interface FlightGlobeProps {
  activeIndex: number | null
}

export function FlightGlobe({ activeIndex }: FlightGlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const activeIndexRef = useRef<number | null>(activeIndex)

  useEffect(() => {
    activeIndexRef.current = activeIndex
  }, [activeIndex])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    canvas.width = SIZE * dpr
    canvas.height = SIZE * dpr
    ctx.scale(dpr, dpr)

    const projection = geoOrthographic()
      .scale(SIZE / 2 - 4)
      .translate([SIZE / 2, SIZE / 2])
      .clipAngle(90)
    const path = geoPath(projection, ctx)

    const rotation: [number, number] = [60, -8]
    let mode: "idle" | "focusing" | "focused" = "idle"
    let focusStart: [number, number] = [...rotation]
    let focusTarget: [number, number] = [...rotation]
    let focusStartTime = 0
    let lastFocusedFlight: number | null = null

    function isVisible(point: [number, number]) {
      return geoDistance(point, [-rotation[0], -rotation[1]]) < Math.PI / 2
    }

    const cities = new Map<string, City>()
    flights.forEach((f) => {
      cities.set(f.from.name, f.from)
      cities.set(f.to.name, f.to)
    })

    function draw() {
      projection.rotate(rotation)
      ctx!.clearRect(0, 0, SIZE, SIZE)

      ctx!.beginPath()
      path({ type: "Sphere" })
      ctx!.fillStyle = "rgba(255,255,255,0.02)"
      ctx!.fill()
      ctx!.strokeStyle = "rgba(255,255,255,0.12)"
      ctx!.lineWidth = 1
      ctx!.stroke()

      ctx!.fillStyle = "rgba(255,255,255,0.22)"
      for (const d of DOTS) {
        if (!isVisible(d)) continue
        const p = projection(d)
        if (!p) continue
        ctx!.beginPath()
        ctx!.arc(p[0], p[1], 0.7, 0, Math.PI * 2)
        ctx!.fill()
      }

      const active = activeIndexRef.current

      flights.forEach((f, i) => {
        if (i === active) return
        ctx!.strokeStyle = active === null ? "oklch(0.75 0.13 70 / 0.55)" : "rgba(255,255,255,0.08)"
        ctx!.lineWidth = 1
        ctx!.beginPath()
        path(greatCircle(f.from, f.to))
        ctx!.stroke()
      })

      if (active !== null && flights[active]) {
        ctx!.strokeStyle = "oklch(0.75 0.13 70)"
        ctx!.lineWidth = 2
        ctx!.beginPath()
        path(greatCircle(flights[active].from, flights[active].to))
        ctx!.stroke()
      }

      const activeCities = new Set<string>()
      if (active !== null && flights[active]) {
        activeCities.add(flights[active].from.name)
        activeCities.add(flights[active].to.name)
      }

      for (const city of cities.values()) {
        const point: [number, number] = [city.lon, city.lat]
        if (!isVisible(point)) continue
        const p = projection(point)
        if (!p) continue
        const isActiveCity = activeCities.has(city.name)
        ctx!.fillStyle = isActiveCity ? "oklch(0.75 0.13 70)" : "rgba(255,255,255,0.35)"
        ctx!.beginPath()
        ctx!.arc(p[0], p[1], isActiveCity ? 3 : 1.6, 0, Math.PI * 2)
        ctx!.fill()
      }
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    let frame: number
    function tick(now: number) {
      const active = activeIndexRef.current

      if (active !== null && active !== lastFocusedFlight) {
        // a new flight was activated — animate the globe to face its midpoint
        const flight = flights[active]
        const mid = geoInterpolate([flight.from.lon, flight.from.lat], [flight.to.lon, flight.to.lat])(0.5)
        focusStart = [...rotation]
        focusTarget = [-mid[0], -mid[1]]
        focusStartTime = now
        mode = "focusing"
        lastFocusedFlight = active
      } else if (active === null && lastFocusedFlight !== null) {
        mode = "idle"
        lastFocusedFlight = null
      }

      if (mode === "focusing") {
        const t = Math.min(1, (now - focusStartTime) / FOCUS_MS)
        const eased = easeOutCubic(t)
        rotation[0] = focusStart[0] + (focusTarget[0] - focusStart[0]) * eased
        rotation[1] = focusStart[1] + (focusTarget[1] - focusStart[1]) * eased
        if (t >= 1) mode = "focused"
      } else if (mode === "idle" && !reduceMotion) {
        rotation[0] += 0.12
      }

      draw()
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)

    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ width: SIZE, height: SIZE }}
      className="mx-auto"
      role="img"
      aria-label="A rotating globe with arcs tracing flights Victor has taken, highlighting the flight currently hovered in the list"
    />
  )
}
