import Link from "next/link"
import { useState } from "react"
import { ArrowUpRight, Calendar, TrendingUp, Trophy, Users, Target, ChevronDown, ChevronUp, ExternalLink, Github, Globe, FileText, Lightbulb, Zap, CheckCircle, AlertTriangle, BookOpen } from "lucide-react"
import type { Project } from "@/data/projects"

interface ProjectCardProps {
  project: Project
  featured?: boolean
}

export function ProjectCard({ project, featured = false }: ProjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  
  const getCategoryColor = (category: Project['category']) => {
    switch (category) {
      case 'Infrastructure': return 'cyan'
      case 'Frontend': return 'pink'
      case 'Backend': return 'purple'
      case 'DevOps': return 'green'
      case 'AI/ML': return 'orange'
      case 'Entrepreneurship': return 'amber'
      default: return 'muted'
    }
  }

  const getCategoryIcon = (category: Project['category']) => {
    switch (category) {
      case 'Entrepreneurship': return Trophy
      case 'AI/ML': return Zap
      case 'DevOps': return Target
      default: return Calendar
    }
  }

  const getLinkIcon = (type: 'github' | 'demo' | 'case-study' | 'article') => {
    switch (type) {
      case 'github': return Github
      case 'demo': return Globe
      case 'case-study': return FileText
      case 'article': return ExternalLink
      default: return ExternalLink
    }
  }

  const categoryColor = getCategoryColor(project.category)
  const CategoryIcon = getCategoryIcon(project.category)

  // Get category color classes
  const getCategoryColorClasses = (category: Project['category']) => {
    switch (category) {
      case 'Infrastructure':
        return {
          badge: 'bg-cyan/10 text-cyan',
          button: 'bg-cyan/10 text-cyan hover:bg-cyan/20',
          text: 'text-cyan'
        }
      case 'Frontend':
        return {
          badge: 'bg-pink/10 text-pink',
          button: 'bg-pink/10 text-pink hover:bg-pink/20',
          text: 'text-pink'
        }
      case 'Backend':
        return {
          badge: 'bg-purple/10 text-purple',
          button: 'bg-purple/10 text-purple hover:bg-purple/20',
          text: 'text-purple'
        }
      case 'DevOps':
        return {
          badge: 'bg-green/10 text-green',
          button: 'bg-green/10 text-green hover:bg-green/20',
          text: 'text-green'
        }
      case 'AI/ML':
        return {
          badge: 'bg-orange/10 text-orange',
          button: 'bg-orange/10 text-orange hover:bg-orange/20',
          text: 'text-orange'
        }
      case 'Entrepreneurship':
        return {
          badge: 'bg-amber/10 text-amber',
          button: 'bg-amber/10 text-amber hover:bg-amber/20',
          text: 'text-amber'
        }
      default:
        return {
          badge: 'bg-muted/10 text-muted-foreground',
          button: 'bg-muted/10 text-muted-foreground hover:bg-muted/20',
          text: 'text-muted-foreground'
        }
    }
  }

  const colorClasses = getCategoryColorClasses(project.category)

  if (featured) {
    return (
      <div className={`group relative overflow-hidden rounded-lg border bg-card transition-all duration-500 ease-out ${
        isExpanded
          ? 'border-green scale-[1.02]'
          : 'border-border hover:border-green/50 hover-lift cursor-pointer'
      }`}
      onClick={() => setIsExpanded(!isExpanded)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          setIsExpanded(!isExpanded)
        }
      }}
      aria-expanded={isExpanded}
      aria-label={`${isExpanded ? 'Collapse' : 'Expand'} project details for ${project.title}`}
      >
        <div className="p-6">
          {/* Expandable indicator - visible on mobile only */}
          <div className={`absolute top-2 right-2 sm:hidden transition-all duration-300 ${
            isExpanded ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
          }`}>
            <div className="flex items-center gap-1 px-2 py-1 bg-green/10 text-green rounded-full text-xs animate-pulse">
              <span>Tap to expand</span>
              <ChevronDown className="w-3 h-3" />
            </div>
          </div>

          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3 flex-wrap">
              <span className={`px-3 py-1.5 ${colorClasses.badge} rounded-full text-xs font-medium flex items-center gap-1.5 transition-all duration-300 ${
                isExpanded ? 'scale-110' : ''
              }`}>
                <CategoryIcon className="w-3 h-3" />
                {project.category}
              </span>
              <span className={`px-2 py-1 bg-green/10 text-green rounded-full text-xs transition-all duration-300 ${
                isExpanded ? 'scale-110' : ''
              }`}>
                {project.status}
              </span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation()
                setIsExpanded(!isExpanded)
              }}
              className={`w-10 h-10 rounded-full transition-all duration-300 flex items-center justify-center flex-shrink-0 cursor-pointer ${
                isExpanded
                  ? 'bg-green text-background rotate-180 scale-110'
                  : 'bg-green/10 text-green hover:bg-green/20 hover:scale-110'
              }`}
              aria-label={isExpanded ? 'Collapse details' : 'Expand details'}
            >
              <ChevronDown className="w-5 h-5" />
            </button>
          </div>

          {/* Title and Description */}
          <h3 className={`text-xl font-semibold transition-all duration-300 mb-3 ${
            isExpanded ? 'text-green' : 'text-foreground group-hover:text-green'
          }`}>
            {project.title}
          </h3>

          <div className="overflow-hidden transition-all duration-500 ease-in-out">
            <p className={`text-muted-foreground text-sm leading-relaxed mb-4 transition-all duration-500 ${
              isExpanded ? 'opacity-100' : 'opacity-90'
            }`}>
              {isExpanded ? project.longDescription : project.description}
            </p>
          </div>

          {/* Timeline */}
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">{project.timeline}</span>
          </div>

          {/* Metrics Grid */}
          {project.metrics && (
            <div className={`grid grid-cols-2 gap-4 mb-6 transition-all duration-500 ${
              isExpanded ? 'opacity-100 scale-100' : 'opacity-90 scale-95'
            }`}>
              {(isExpanded ? project.metrics : project.metrics.slice(0, 2)).map((metric, index) => (
                <div
                  key={index}
                  className={`text-center p-3 rounded-lg bg-muted transition-all duration-300 hover:bg-muted/70 hover:scale-105 ${
                    isExpanded ? 'border border-green/20' : ''
                  }`}
                  style={{ transitionDelay: isExpanded ? `${index * 50}ms` : '0ms' }}
                >
                  <div className={`text-lg font-semibold ${colorClasses.text} mb-1`}>
                    {metric.value}
                  </div>
                  <div className="text-xs text-muted-foreground mb-1">{metric.label}</div>
                  {metric.improvement && (
                    <div className="text-xs text-green flex items-center justify-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      {metric.improvement}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Technologies */}
          <div className={`mb-4 transition-all duration-500 ${
            isExpanded ? 'mb-6' : ''
          }`}>
            <div className="flex flex-wrap gap-2">
              {(isExpanded ? project.technologies : project.technologies.slice(0, 4)).map((tech, index) => (
                <span
                  key={index}
                  className={`text-xs bg-muted text-foreground px-2 py-1 rounded border transition-all duration-300 hover:border-green hover:bg-green/5 ${
                    isExpanded ? 'border-green/30' : 'border-border'
                  }`}
                  style={{ transitionDelay: isExpanded ? `${index * 30}ms` : '0ms' }}
                >
                  {tech}
                </span>
              ))}
              {!isExpanded && project.technologies.length > 4 && (
                <span className="text-xs text-muted-foreground px-2 py-1">+{project.technologies.length - 4} more</span>
              )}
            </div>
          </div>

          {/* Expanded Content */}
          <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
            isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
          }`}>
            <div className="space-y-6 pt-4 border-t border-green/20">
              {/* Key Outcomes */}
              {project.outcomes && project.outcomes.length > 0 && (
                <div className="animate-slide-up" style={{ animationDelay: '100ms' }}>
                  <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green animate-bounce-in" />
                    Key Outcomes
                  </h4>
                  <ul className="space-y-2">
                    {project.outcomes.map((outcome, index) => (
                      <li
                        key={index}
                        className="text-xs text-muted-foreground flex items-start gap-2 animate-slide-in-right"
                        style={{ animationDelay: `${150 + index * 50}ms` }}
                      >
                        <div className="w-1.5 h-1.5 bg-green rounded-full mt-1.5 flex-shrink-0" />
                        {outcome}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Highlights */}
              {project.highlights && project.highlights.length > 0 && (
                <div className="animate-slide-up" style={{ animationDelay: '200ms' }}>
                  <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Lightbulb className={`w-4 h-4 ${colorClasses.text} animate-bounce-in`} />
                    Key Highlights
                  </h4>
                  <ul className="space-y-2">
                    {project.highlights.map((highlight, index) => (
                      <li
                        key={index}
                        className="text-xs text-muted-foreground flex items-start gap-2 animate-slide-in-right"
                        style={{ animationDelay: `${250 + index * 50}ms` }}
                      >
                        <div className={`w-1.5 h-1.5 ${colorClasses.text.replace('text-', 'bg-')} rounded-full mt-1.5 flex-shrink-0`} />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Challenges */}
              {project.challenges && project.challenges.length > 0 && (
                <div className="animate-slide-up" style={{ animationDelay: '300ms' }}>
                  <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-orange animate-bounce-in" />
                    Challenges
                  </h4>
                  <ul className="space-y-2">
                    {project.challenges.map((challenge, index) => (
                      <li
                        key={index}
                        className="text-xs text-muted-foreground flex items-start gap-2 animate-slide-in-right"
                        style={{ animationDelay: `${350 + index * 50}ms` }}
                      >
                        <div className="w-1.5 h-1.5 bg-orange rounded-full mt-1.5 flex-shrink-0" />
                        {challenge}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Learnings */}
              {project.learnings && project.learnings.length > 0 && (
                <div className="animate-slide-up" style={{ animationDelay: '400ms' }}>
                  <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-cyan animate-bounce-in" />
                    Key Learnings
                  </h4>
                  <ul className="space-y-2">
                    {project.learnings.map((learning, index) => (
                      <li
                        key={index}
                        className="text-xs text-muted-foreground flex items-start gap-2 animate-slide-in-right"
                        style={{ animationDelay: `${450 + index * 50}ms` }}
                      >
                        <div className="w-1.5 h-1.5 bg-cyan rounded-full mt-1.5 flex-shrink-0" />
                        {learning}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Links */}
              {project.links && project.links.length > 0 && (
                <div className="animate-slide-up" style={{ animationDelay: '500ms' }}>
                  <h4 className="text-sm font-semibold text-foreground mb-3">Links</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.links.map((link, index) => {
                      const LinkIcon = getLinkIcon(link.type)
                      return (
                        <Link
                          key={index}
                          href={link.url}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green/10 text-green rounded text-xs transition-all duration-200 hover:scale-105 hover:-translate-y-0.5 hover:bg-green/20 animate-bounce-in"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          style={{ animationDelay: `${550 + index * 50}ms` }}
                        >
                          <LinkIcon className="w-3 h-3" />
                          {link.label}
                        </Link>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Bottom expand indicator - only when collapsed and on mobile */}
          {!isExpanded && (
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none sm:hidden">
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-bounce">
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-green animate-pulse"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-green animate-pulse" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-green animate-pulse" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <Link
      href={`/projects/${project.id}`}
      className="group block p-6 border border-border rounded-lg hover-lift animate-fade-up transition-all duration-300 hover:border-green"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className={`px-3 py-1.5 ${colorClasses.badge} rounded-full text-xs font-medium flex items-center gap-1.5`}>
            <CategoryIcon className="w-3 h-3" />
            {project.category}
          </span>
          <span className={`px-2 py-1 bg-green/10 text-green rounded-full text-xs`}>
            {project.status}
          </span>
        </div>
        <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-green transition-colors" />
      </div>

      <h3 className="text-xl font-semibold text-foreground group-hover:text-green transition-colors mb-3">
        {project.title}
      </h3>

      <p className="text-muted-foreground text-sm leading-relaxed mb-4">
        {project.description}
      </p>

      {/* Timeline */}
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="w-4 h-4 text-muted-foreground" />
        <span className="text-xs text-muted-foreground">{project.timeline}</span>
      </div>

      {/* Quick Metrics */}
      {project.metrics && project.metrics.length > 0 && (
        <div className="grid grid-cols-2 gap-3 mb-4">
          {project.metrics.slice(0, 2).map((metric, index) => (
            <div key={index} className="text-center p-2 rounded bg-muted">
              <div className={`text-sm font-semibold ${colorClasses.text}`}>
                {metric.value}
              </div>
              <div className="text-xs text-muted-foreground">{metric.label}</div>
            </div>
          ))}
        </div>
      )}

      {/* Technologies */}
      <div className="flex flex-wrap gap-2 mb-3">
        {project.technologies.slice(0, 3).map((tech, index) => (
          <span key={index} className="text-xs bg-muted text-foreground px-2 py-1 rounded border">
            {tech}
          </span>
        ))}
        {project.technologies.length > 3 && (
          <span className="text-xs text-muted-foreground px-2 py-1">+{project.technologies.length - 3} more</span>
        )}
      </div>

      {/* Quick outcomes preview */}
      {project.outcomes && project.outcomes.length > 0 && (
        <div className="border-t border-border/50 pt-3 mt-3">
          <div className="text-xs text-muted-foreground mb-2">Key Achievement:</div>
          <div className="text-xs text-muted-foreground flex items-start gap-2">
            <CheckCircle className="w-3 h-3 text-green mt-0.5 flex-shrink-0" />
            {project.outcomes[0]}
          </div>
        </div>
      )}
    </Link>
  )
}