"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navItems = [
  { href: "/built", label: "built" },
  { href: "/am", label: "am" },
  { href: "/now", label: "now" },
]

function openCommandPalette() {
  document.dispatchEvent(
    new KeyboardEvent("keydown", { key: "k", metaKey: true, ctrlKey: true, bubbles: true })
  )
}

export function SiteHeader() {
  const pathname = usePathname()
  const [isMac, setIsMac] = useState(false)

  useEffect(() => {
    setIsMac(navigator.platform.toUpperCase().indexOf("MAC") >= 0)
  }, [])

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between px-6 sm:px-10 py-6 bg-background/90 backdrop-blur-sm font-mono text-sm">
      <Link href="/" className="no-underline text-foreground hover:text-amber">
        vh
      </Link>
      <div className="flex items-center gap-4 sm:gap-6">
        <nav className="flex items-center gap-1.5 sm:gap-2.5">
          {navItems.map((item, index) => (
            <span key={item.href} className="flex items-center gap-1.5 sm:gap-2.5">
              <Link
                href={item.href}
                className={`no-underline transition-colors ${
                  pathname === item.href ? "text-amber" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
              {index < navItems.length - 1 && <span className="text-border">/</span>}
            </span>
          ))}
        </nav>

        <button
          type="button"
          onClick={openCommandPalette}
          aria-label="Open command palette"
          title="Open command palette"
          className="hidden sm:inline-flex items-center gap-1 rounded-md border border-border px-1.5 py-1 text-xs text-muted-foreground transition-colors hover:text-amber hover:border-amber/40 cursor-pointer no-underline"
        >
          <kbd className="font-mono">{isMac ? "⌘" : "ctrl"}</kbd>
          <kbd className="font-mono">K</kbd>
        </button>
      </div>
    </header>
  )
}
