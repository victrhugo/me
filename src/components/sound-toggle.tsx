"use client"

import { useEffect, useState } from "react"
import { Volume2, VolumeX } from "lucide-react"
import { isMuted, subscribeMuted, toggleMuted } from "@/lib/sound"

export function SoundToggle() {
  const [muted, setMutedState] = useState(false)

  useEffect(() => {
    setMutedState(isMuted())
    return subscribeMuted(setMutedState)
  }, [])

  return (
    <button
      type="button"
      onClick={toggleMuted}
      aria-label={muted ? "Unmute sound effects" : "Mute sound effects"}
      aria-pressed={muted}
      title={muted ? "Sound off" : "Sound on"}
      className="inline-flex items-center justify-center w-9 h-9 shrink-0 rounded-full border border-border text-muted-foreground transition-colors hover:text-amber hover:border-amber/40 cursor-pointer"
    >
      {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
    </button>
  )
}
