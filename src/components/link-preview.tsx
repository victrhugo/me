"use client"

import { useRef, useState, type ReactNode } from "react"
import Link from "next/link"
import { playKey } from "@/lib/sound"

interface PreviewData {
  title: string
  description: string
  image: string | null
  favicon: string | null
  siteName: string
}

const cache = new Map<string, PreviewData>()

interface LinkPreviewProps {
  href: string
  children: ReactNode
}

export function LinkPreview({ href, children }: LinkPreviewProps) {
  const [preview, setPreview] = useState<PreviewData | null>(cache.get(href) ?? null)
  const [visible, setVisible] = useState(false)
  const showTimer = useRef<ReturnType<typeof setTimeout>>(undefined)

  const load = async () => {
    if (cache.has(href)) return
    try {
      const res = await fetch(`/api/link-preview?url=${encodeURIComponent(href)}`)
      if (!res.ok) return
      const data: PreviewData = await res.json()
      cache.set(href, data)
      setPreview(data)
    } catch {
      // preview is decorative — the link itself still works without it
    }
  }

  const handleEnter = () => {
    playKey()
    load()
    showTimer.current = setTimeout(() => setVisible(true), 200)
  }

  const handleLeave = () => {
    clearTimeout(showTimer.current)
    setVisible(false)
  }

  return (
    <span className="relative inline-block" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <Link href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </Link>

      {visible && preview && (
        <span
          className="pointer-events-none absolute left-1/2 top-full z-50 mt-3 w-72 -translate-x-1/2 rounded-xl border border-border bg-card p-3 text-left shadow-2xl animate-fade-in"
          style={{ animationDuration: "0.15s" }}
        >
          {preview.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={preview.image} alt="" className="mb-3 h-32 w-full rounded-lg object-cover" />
          )}
          <span className="flex items-center gap-2 mb-1.5 font-mono text-xs text-muted-foreground">
            {preview.favicon && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={preview.favicon} alt="" className="h-4 w-4 rounded-sm" />
            )}
            {preview.siteName}
          </span>
          <span className="block font-sans text-sm font-medium text-foreground leading-snug">
            {preview.title}
          </span>
          {preview.description && (
            <span className="mt-1 block font-sans text-xs text-muted-foreground leading-relaxed line-clamp-2">
              {preview.description}
            </span>
          )}
        </span>
      )}
    </span>
  )
}
