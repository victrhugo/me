import Link from "next/link"
import { projects } from "@/data/projects"

export const metadata = {
  title: "built",
  description: "Projects Victor Hugo has built.",
}

export default function BuiltPage() {
  return (
    <main className="max-w-2xl mx-auto px-6 sm:px-10 pt-8 sm:pt-16 pb-16">
      <h1 className="text-4xl mb-4 animate-fade-up">built</h1>
      <p className="text-comment text-lg mb-12 animate-fade-up animate-delay-100">
        the stuff that actually shipped, from hackathon weekends to a full
        e-commerce store
      </p>

      <div className="space-y-12">
        {projects.map((project, index) => (
          <article
            key={project.id}
            className={index < 4 ? `animate-fade-up animate-delay-${Math.min((index + 1) * 100, 400)}` : ""}
          >
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4 mb-1">
              <h2 className="text-xl text-foreground">{project.title}</h2>
              <span className="font-mono text-xs text-muted-foreground whitespace-nowrap">
                {project.timeline}
              </span>
            </div>
            <p className="text-comment leading-relaxed mb-3">{project.description}</p>
            <p className="font-mono text-xs text-muted-foreground mb-2">
              {project.technologies.join(" / ")}
            </p>
            {project.links && project.links.length > 0 && (
              <div className="flex gap-4 font-mono text-sm">
                {project.links.map((link) => (
                  <Link key={link.url} href={link.url} target="_blank" rel="noopener noreferrer">
                    {link.label.toLowerCase()}
                  </Link>
                ))}
              </div>
            )}
          </article>
        ))}
      </div>
    </main>
  )
}
