"use client"

import { useEffect } from "react"
import { playClick, unlockAudio } from "@/lib/sound"

export function SoundProvider() {
  useEffect(() => {
    // Browsers require a real gesture — click, key press, or touch — before
    // audio can play. Unlock on the earliest of these, anywhere on the
    // page, so hover-triggered sounds elsewhere already work afterward.
    const unlock = () => {
      unlockAudio()
      document.removeEventListener("pointerdown", unlock)
      document.removeEventListener("keydown", unlock)
      document.removeEventListener("touchstart", unlock)
    }
    document.addEventListener("pointerdown", unlock)
    document.addEventListener("keydown", unlock)
    document.addEventListener("touchstart", unlock)

    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null
      if (target?.closest("a, button")) {
        playClick()
      }
    }
    document.addEventListener("click", handleClick)

    return () => {
      document.removeEventListener("pointerdown", unlock)
      document.removeEventListener("keydown", unlock)
      document.removeEventListener("touchstart", unlock)
      document.removeEventListener("click", handleClick)
    }
  }, [])

  return null
}
