import Link from "next/link"
import { SoundToggle } from "@/components/sound-toggle"

const socials = [
  { label: "github", blurb: "proof i actually write code", href: "https://github.com/victrhugo" },
  { label: "linkedin", blurb: "the buttoned-up version of me", href: "https://www.linkedin.com/in/v-ictorh/" },
]

export function SiteFooter() {
  return (
    <footer className="relative mt-24 border-t border-border px-6 sm:px-10 py-16">
      <div className="absolute top-8 right-6 sm:right-10">
        <SoundToggle />
      </div>

      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row sm:items-start sm:justify-between gap-10">
        <div>
          <div className="text-3xl mb-6">vh</div>
          <div className="space-y-1.5 font-mono text-sm">
            {socials.map((social) => (
              <div key={social.label}>
                <span className="text-muted-foreground">{social.label}: </span>
                <Link
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground hover:text-amber"
                >
                  {social.blurb}
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="font-mono text-xs text-muted-foreground sm:text-right">
          © {new Date().getFullYear()} victor hugo
        </div>
      </div>
    </footer>
  )
}
