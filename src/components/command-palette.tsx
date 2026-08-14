"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Link2, Code2, Home, User, Hammer, Clock } from "lucide-react"

const navItems = [
  { path: "/", label: "Home", description: "Go to top", icon: Home, key: "h" },
  { path: "/am", label: "Am", description: "Who I am", icon: User, key: "a" },
  { path: "/built", label: "Built", description: "Things I've shipped", icon: Hammer, key: "b" },
  { path: "/now", label: "Now", description: "What I'm up to", icon: Clock, key: "n" },
]

export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }

      if (open) {
        if (e.key === "l") {
          e.preventDefault()
          copyLink()
        } else if (e.key === "s") {
          e.preventDefault()
          viewSource()
        } else if (e.key === "g") {
          e.preventDefault()
          const handleNext = (nextE: KeyboardEvent) => {
            const match = navItems.find((item) => item.key === nextE.key)
            if (match) navigateTo(match.path)
            document.removeEventListener("keydown", handleNext)
          }
          document.addEventListener("keydown", handleNext)
          setTimeout(() => {
            document.removeEventListener("keydown", handleNext)
          }, 3000)
        }
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [open])

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setOpen(false)
  }

  const viewSource = () => {
    window.open("https://github.com/victrhugo", "_blank")
    setOpen(false)
  }

  const navigateTo = (path: string) => {
    router.push(path)
    setOpen(false)
  }

  return (
    <>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." className="text-base border-none" />
        <CommandList>
          <CommandEmpty>
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="w-16 h-16 rounded-full bg-foreground/5 flex items-center justify-center mb-4">
                <span className="text-2xl">🔍</span>
              </div>
              <p className="text-sm text-muted-foreground">No results found.</p>
            </div>
          </CommandEmpty>

          <CommandGroup heading="ACTIONS">
            <CommandItem onSelect={copyLink} className="flex items-center justify-between py-3 px-4 rounded-lg hover:bg-muted data-[selected=true]:bg-muted transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                  <Link2 className="w-4 h-4 text-muted-foreground" />
                </div>
                <div>
                  <span className="font-medium text-foreground">Copy Link</span>
                  <p className="text-xs text-muted-foreground">Copy current page URL</p>
                </div>
              </div>
              <kbd className="px-2 py-1 text-xs bg-muted border border-border rounded font-mono text-muted-foreground">L</kbd>
            </CommandItem>

            <CommandItem onSelect={viewSource} className="flex items-center justify-between py-3 px-4 rounded-lg hover:bg-muted data-[selected=true]:bg-muted transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                  <Code2 className="w-4 h-4 text-muted-foreground" />
                </div>
                <div>
                  <span className="font-medium text-foreground">View Source</span>
                  <p className="text-xs text-muted-foreground">Check out my GitHub</p>
                </div>
              </div>
              <kbd className="px-2 py-1 text-xs bg-muted border border-border rounded font-mono text-muted-foreground">S</kbd>
            </CommandItem>
          </CommandGroup>

          <CommandGroup heading="NAVIGATION">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <CommandItem
                  key={item.path}
                  onSelect={() => navigateTo(item.path)}
                  className="flex items-center justify-between py-3 px-4 rounded-lg hover:bg-muted data-[selected=true]:bg-muted transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                      <Icon className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div>
                      <span className="font-medium text-foreground">{item.label}</span>
                      <p className="text-xs text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <kbd className="px-2 py-1 text-xs bg-muted border border-border rounded font-mono text-muted-foreground">G</kbd>
                    <kbd className="px-2 py-1 text-xs bg-muted border border-border rounded font-mono text-muted-foreground">
                      {item.key.toUpperCase()}
                    </kbd>
                  </div>
                </CommandItem>
              )
            })}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
