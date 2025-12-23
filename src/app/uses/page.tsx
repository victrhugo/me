import Link from "next/link"
import { ArrowUpRight, Star, ExternalLink } from "lucide-react"
import { getAllCategories } from "@/data/uses"

export const metadata = {
  title: "Uses - Victor Hugo",
  description: "Tools, software, and hardware I use for development, productivity, and daily work.",
}

export default function UsesPage() {
  const categories = getAllCategories()

  const getRatingStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 ${i < rating ? 'fill-yellow text-yellow' : 'text-muted'}`}
      />
    ))
  }

  const getPriceBadgeColor = (price?: string) => {
    switch (price) {
      case 'Free': return 'bg-green/10 text-green'
      case 'Paid': return 'bg-orange/10 text-orange'
      case 'Freemium': return 'bg-cyan/10 text-cyan'
      default: return 'bg-muted/10 text-muted'
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-8 py-20">
        {/* Header */}
        <div className="mb-16 animate-fade-up">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted hover:text-cyan transition-colors mb-8"
          >
            ← Back to home
          </Link>

          <h1 className="text-4xl font-bold mb-6">Uses</h1>
          <p className="text-xl text-comment leading-relaxed">
            Here's a comprehensive list of tools, software, and hardware I use for development,
            productivity, and daily work. Inspired by{' '}
            <Link
              href="https://uses.tech"
              className="text-cyan hover:text-cyan/80 transition-colors"
            >
              uses.tech
            </Link>.
          </p>
        </div>

        {/* Categories */}
        <div className="space-y-16">
          {categories.map((category, categoryIndex) => (
            <section
              key={category.title}
              className={`animate-fade-up animate-delay-${(categoryIndex + 1) * 100}`}
            >
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-foreground mb-3">
                  {category.title}
                </h2>
                <p className="text-comment leading-relaxed">
                  {category.description}
                </p>
              </div>

              <div className="grid gap-6">
                {category.tools.map((tool, toolIndex) => (
                  <div
                    key={`${tool.name}-${toolIndex}`}
                    className="group p-6 border border-border rounded-lg hover-lift"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-foreground group-hover:text-cyan transition-colors">
                            {tool.name}
                          </h3>
                          {tool.price && (
                            <span className={`px-2 py-1 rounded-full text-xs ${getPriceBadgeColor(tool.price)}`}>
                              {tool.price}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="flex items-center gap-1">
                            {getRatingStars(tool.recommendation)}
                          </div>
                          <span className="text-xs text-muted">
                            {tool.recommendation}/5
                          </span>
                        </div>
                      </div>
                      {tool.url && (
                        <Link
                          href={tool.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted hover:text-cyan transition-colors"
                          aria-label={`Visit ${tool.name}`}
                        >
                          <ExternalLink className="w-5 h-5" />
                        </Link>
                      )}
                    </div>

                    <p className="text-comment leading-relaxed">
                      {tool.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-20 pt-12 border-t border-border text-center">
          <p className="text-comment mb-4">
            This list is constantly evolving as I discover new tools and workflows.
          </p>
          <p className="text-sm text-muted">
            Last updated: {new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>
      </div>
    </div>
  )
}