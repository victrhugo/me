"use client"

import { Fragment, useEffect, useRef, useState } from "react"
import { playWrite } from "@/lib/sound"

interface HandwrittenNoteProps {
  children: string
  className?: string
}

const STEP_MS = 65
const START_DELAY_MS = 350

export function HandwrittenNote({ children, className = "" }: HandwrittenNoteProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true)
          observer.disconnect()
        }
      },
      { threshold: 0.6 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return
    children.split("").forEach((char, index) => {
      if (char.trim() === "") return
      setTimeout(() => playWrite(), START_DELAY_MS + index * STEP_MS)
    })
  }, [started, children])

  const words = children.split(" ")

  return (
    <div ref={ref} className={`hidden lg:flex items-stretch gap-3 select-none ${className}`}>
      <svg width="10" viewBox="0 0 10 100" preserveAspectRatio="none" fill="none" className="h-full shrink-0 text-amber/60">
        <path
          d="M8,2 L2,2 L2,98 L8,98"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={started ? 0 : 1}
          className="transition-[stroke-dashoffset] duration-700 ease-out"
        />
      </svg>
      <p className="font-hand font-normal text-2xl text-amber/75 leading-relaxed pt-1">
        {words.map((word, wordIndex) => {
          const offset = words.slice(0, wordIndex).join(" ").length + (wordIndex > 0 ? 1 : 0)
          return (
            <Fragment key={wordIndex}>
              <span className="inline-block whitespace-nowrap">
                {word.split("").map((char, charIndex) => (
                  <span
                    key={charIndex}
                    className="inline-block transition-all duration-500 ease-out"
                    style={{
                      opacity: started ? 1 : 0,
                      transform: started ? "translateY(0)" : "translateY(5px)",
                      transitionDelay: `${START_DELAY_MS + (offset + charIndex) * STEP_MS}ms`,
                    }}
                  >
                    {char}
                  </span>
                ))}
              </span>
              {wordIndex < words.length - 1 ? " " : ""}
            </Fragment>
          )
        })}
      </p>
    </div>
  )
}
