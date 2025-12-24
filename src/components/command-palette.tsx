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
import { Link2, Code2, Home, User, Briefcase, FolderGit2, FileText, Mic } from "lucide-react"

export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [isMac, setIsMac] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Detect if user is on Mac
    setIsMac(navigator.platform.toUpperCase().indexOf('MAC') >= 0)
  }, [])

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
      
      // Handle shortcuts when command palette is open
      if (open) {
        if (e.key === "l") {
          e.preventDefault()
          copyLink()
        } else if (e.key === "s") {
          e.preventDefault()
          viewSource()
        } else if (e.key === "g") {
          e.preventDefault()
          // Wait for next key
          const handleNext = (nextE: KeyboardEvent) => {
            if (nextE.key === "h") {
              navigateTo("#")
            } else if (nextE.key === "a") {
              navigateTo("#about")
            } else if (nextE.key === "e") {
              navigateTo("#experience")
            } else if (nextE.key === "p") {
              navigateTo("#projects")
            } else if (nextE.key === "s") {
              navigateTo("#speaking")
            }
            document.removeEventListener("keydown", handleNext)
          }
          document.addEventListener("keydown", handleNext)
          // Remove listener after 3 seconds
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

  const navigateTo = (hash: string) => {
    const element = document.querySelector(hash)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setOpen(false)
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed top-4 right-4 lg:top-6 lg:right-6 px-3 py-2.5 lg:px-4 lg:py-3 text-sm text-muted-foreground hover:text-foreground border border-border rounded-xl hover:border-foreground/20 transition-all duration-300 flex items-center gap-2 bg-background/95 backdrop-blur-lg z-50 shadow-lg hover:shadow-2xl group min-h-[44px] lg:min-h-auto"
      >
        <span className="hidden md:inline text-xs lg:text-sm">Quick Actions</span>
        <div className="flex items-center gap-1">
          <kbd className="px-1.5 py-1 lg:px-2 lg:py-1 text-xs bg-foreground/5 border border-foreground/10 rounded font-mono shadow-sm group-hover:bg-foreground/10 group-hover:border-foreground/20 transition-colors">
            {isMac ? '⌘' : 'Ctrl'}
          </kbd>
          <kbd className="px-1.5 py-1 lg:px-2 lg:py-1 text-xs bg-foreground/5 border border-foreground/10 rounded font-mono shadow-sm group-hover:bg-foreground/10 group-hover:border-foreground/20 transition-colors">
            K
          </kbd>
        </div>
      </button>

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
            <CommandItem onSelect={copyLink} className="flex items-center justify-between py-3 px-4 rounded-lg hover:bg-muted/10 data-[selected=true]:bg-muted/80 transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center">
                  <Link2 className="w-4 h-4 text-muted-foreground" />
                </div>
                <div>
                  <span className="font-medium text-foreground">Copy Link</span>
                  <p className="text-xs text-muted-foreground">Copy current page URL</p>
                </div>
              </div>
              <kbd className="px-2 py-1 text-xs bg-muted/50 border border-border rounded font-mono text-muted-foreground">L</kbd>
            </CommandItem>

            <CommandItem onSelect={viewSource} className="flex items-center justify-between py-3 px-4 rounded-lg hover:bg-muted/80 data-[selected=true]:bg-muted/80 transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center">
                  <Code2 className="w-4 h-4 text-muted-foreground" />
                </div>
                <div>
                  <span className="font-medium text-foreground">View Source</span>
                  <p className="text-xs text-muted-foreground">Check out my GitHub</p>
                </div>
              </div>
              <kbd className="px-2 py-1 text-xs bg-muted/50 border border-border rounded font-mono text-muted-foreground">S</kbd>
            </CommandItem>
          </CommandGroup>

          <CommandGroup heading="NAVIGATION">
            <CommandItem onSelect={() => navigateTo("#")} className="flex items-center justify-between py-3 px-4 rounded-lg hover:bg-muted/80 data-[selected=true]:bg-muted/80 transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center">
                  <Home className="w-4 h-4 text-muted-foreground" />
                </div>
                <div>
                  <span className="font-medium text-foreground">Home</span>
                  <p className="text-xs text-muted-foreground">Go to top</p>
                </div>
              </div>
              <div className="flex gap-1">
                <kbd className="px-2 py-1 text-xs bg-muted/50 border border-border rounded font-mono text-muted-foreground">G</kbd>
                <kbd className="px-2 py-1 text-xs bg-muted/50 border border-border rounded font-mono text-muted-foreground">H</kbd>
              </div>
            </CommandItem>

            <CommandItem onSelect={() => navigateTo("#about")} className="flex items-center justify-between py-3 px-4 rounded-lg hover:bg-muted/80 data-[selected=true]:bg-muted/80 transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center">
                  <User className="w-4 h-4 text-muted-foreground" />
                </div>
                <div>
                  <span className="font-medium text-foreground">About</span>
                  <p className="text-xs text-muted-foreground">Learn more about me</p>
                </div>
              </div>
              <div className="flex gap-1">
                <kbd className="px-2 py-1 text-xs bg-muted/50 border border-border rounded font-mono text-muted-foreground">G</kbd>
                <kbd className="px-2 py-1 text-xs bg-muted/50 border border-border rounded font-mono text-muted-foreground">A</kbd>
              </div>
            </CommandItem>

            <CommandItem onSelect={() => navigateTo("#experience")} className="flex items-center justify-between py-3 px-4 rounded-lg hover:bg-muted/80 data-[selected=true]:bg-muted/80 transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center">
                  <Briefcase className="w-4 h-4 text-muted-foreground" />
                </div>
                <div>
                  <span className="font-medium text-foreground">Experience</span>
                  <p className="text-xs text-muted-foreground">Professional background</p>
                </div>
              </div>
              <div className="flex gap-1">
                <kbd className="px-2 py-1 text-xs bg-muted/50 border border-border rounded font-mono text-muted-foreground">G</kbd>
                <kbd className="px-2 py-1 text-xs bg-muted/50 border border-border rounded font-mono text-muted-foreground">E</kbd>
              </div>
            </CommandItem>

            <CommandItem onSelect={() => navigateTo("#projects")} className="flex items-center justify-between py-3 px-4 rounded-lg hover:bg-muted/80 data-[selected=true]:bg-muted/80 transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center">
                  <FolderGit2 className="w-4 h-4 text-muted-foreground" />
                </div>
                <div>
                  <span className="font-medium text-foreground">Projects</span>
                  <p className="text-xs text-muted-foreground">Featured work</p>
                </div>
              </div>
              <div className="flex gap-1">
                <kbd className="px-2 py-1 text-xs bg-muted/50 border border-border rounded font-mono text-muted-foreground">G</kbd>
                <kbd className="px-2 py-1 text-xs bg-muted/50 border border-border rounded font-mono text-muted-foreground">P</kbd>
              </div>
            </CommandItem>

            <CommandItem onSelect={() => navigateTo("#speaking")} className="flex items-center justify-between py-3 px-4 rounded-lg hover:bg-muted/80 data-[selected=true]:bg-muted/80 transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center">
                  <Mic className="w-4 h-4 text-muted-foreground" />
                </div>
                <div>
                  <span className="font-medium text-foreground">Speaking</span>
                  <p className="text-xs text-muted-foreground">Talks & workshops</p>
                </div>
              </div>
              <div className="flex gap-1">
                <kbd className="px-2 py-1 text-xs bg-muted/50 border border-border rounded font-mono text-muted-foreground">G</kbd>
                <kbd className="px-2 py-1 text-xs bg-muted/50 border border-border rounded font-mono text-muted-foreground">S</kbd>
              </div>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
