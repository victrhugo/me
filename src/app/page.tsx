"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react"
import { CommandPalette } from "@/components/command-palette"
import { ProjectCard } from "@/components/project-card"
import { ImageModal } from "@/components/image-modal"
import { getFeaturedProjects } from "@/data/projects"
import { getAllExperiences, getExperienceYears } from "@/data/experience"

export default function Home() {
  const [expandedExperiences, setExpandedExperiences] = useState<Set<string>>(new Set())
  const [selectedImage, setSelectedImage] = useState<{ image: string; title: string; description: string } | null>(null)
  const [activeSection, setActiveSection] = useState<string>('now')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set(['now']))
  const [isMac, setIsMac] = useState(false)

  const toggleMobileMenu = () => {
    setMobileMenuOpen(prev => !prev)
  }

  // Detect macOS
  useEffect(() => {
    setIsMac(navigator.platform.toUpperCase().indexOf('MAC') >= 0)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['now', 'about', 'experience', 'projects']
      const scrollPosition = window.scrollY + 100 // Offset for better detection

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i])
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i])
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Check initial position

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id
            setVisibleSections((prev) => new Set(prev).add(sectionId))
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -10% 0px'
      }
    )

    const sections = ['now', 'about', 'experience', 'projects']
    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  // Separate useEffect for mobile menu scroll closing
  useEffect(() => {
    if (!mobileMenuOpen) return

    let isScrolling = false
    let scrollTimer: NodeJS.Timeout

    const handleScroll = () => {
      if (!isScrolling) {
        isScrolling = true
        clearTimeout(scrollTimer)
        scrollTimer = setTimeout(() => {
          setMobileMenuOpen(false)
          isScrolling = false
        }, 100)
      }
    }

    // Add a small delay before attaching scroll listener to prevent immediate closure
    const attachTimer = setTimeout(() => {
      window.addEventListener('scroll', handleScroll)
    }, 200)

    return () => {
      clearTimeout(attachTimer)
      clearTimeout(scrollTimer)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [mobileMenuOpen])

  const toggleExperience = (id: string) => {
    setExpandedExperiences(prev => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  const featuredProjects = getFeaturedProjects()
  const experiences = getAllExperiences()
  const yearsOfExperience = getExperienceYears()

  return (
    <div className="min-h-screen bg-background text-foreground">
      <CommandPalette />

      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur border-b border-border animate-slide-down">
        <div className="flex items-center justify-between p-4">
          <Link href="/" className="flex items-center gap-3 animate-fade-in">
            <div className="text-lg font-bold">
              Guilherme <span className="gradient-text">Pozo</span>
            </div>
          </Link>

          <div className="flex items-center gap-2 animate-fade-in animate-delay-100">
            <button
              onClick={toggleMobileMenu}
              className="p-2 text-muted-foreground hover:text-foreground transition-all duration-200 border border-transparent hover:border-border hover:bg-muted/20 rounded transform hover:scale-105 active:scale-95"
              aria-label="Toggle menu"
              type="button"
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center relative">
                <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ease-out absolute ${
                  mobileMenuOpen
                    ? 'rotate-45'
                    : '-translate-y-1.5'
                }`} />
                <span className={`block w-6 h-0.5 bg-current transition-all duration-200 ease-out ${
                  mobileMenuOpen
                    ? 'opacity-0 scale-0'
                    : 'opacity-100 scale-100'
                }`} />
                <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ease-out absolute ${
                  mobileMenuOpen
                    ? '-rotate-45'
                    : 'translate-y-1.5'
                }`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`overflow-hidden transition-all duration-500 ease-in-out border-t border-border bg-background/95 backdrop-blur ${mobileMenuOpen ? 'max-h-96' : 'max-h-0 border-t-transparent'}`}>
          <div className={`p-4 space-y-1 transition-all duration-300 ${mobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}`}>
            {[
              { href: '#now', label: 'Now', activeClass: 'text-yellow bg-yellow/10', hoverClass: 'hover:text-yellow hover:bg-yellow/5', barClass: 'bg-yellow', delay: '50ms' },
              { href: '#about', label: 'About', activeClass: 'text-cyan bg-cyan/10', hoverClass: 'hover:text-cyan hover:bg-cyan/5', barClass: 'bg-cyan', delay: '100ms' },
              { href: '#experience', label: 'Experience', activeClass: 'text-purple bg-purple/10', hoverClass: 'hover:text-purple hover:bg-purple/5', barClass: 'bg-purple', delay: '150ms' },
              { href: '#projects', label: 'Projects', activeClass: 'text-green bg-green/10', hoverClass: 'hover:text-green hover:bg-green/5', barClass: 'bg-green', delay: '200ms' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                style={{ transitionDelay: mobileMenuOpen ? item.delay : '0ms' }}
                className={`block transition-all duration-200 text-sm uppercase tracking-wider py-3 px-4 rounded-lg relative overflow-hidden group ${
                  activeSection === item.href.slice(1)
                    ? `${item.activeClass} font-medium`
                    : `text-muted-foreground ${item.hoverClass}`
                } ${mobileMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}`}
              >
                <span className={`absolute left-0 top-0 h-full w-1 ${item.barClass} transform transition-transform duration-200 ${
                  activeSection === item.href.slice(1) ? 'scale-y-100' : 'scale-y-0 group-hover:scale-y-100'
                }`}></span>
                {item.label}
              </Link>
            ))}

            {/* Mobile Social Links */}
            <div
              className={`flex gap-4 pt-4 mt-3 border-t border-border transition-all duration-300 ${mobileMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}`}
              style={{ transitionDelay: mobileMenuOpen ? '350ms' : '0ms' }}
            >
              <Link
                href="https://github.com/guilhermepozo"
                className="text-muted-foreground hover:text-purple transition-all duration-200 transform hover:scale-110 hover:-translate-y-0.5 relative group"
                aria-label="GitHub Profile"
                title="Visit my GitHub profile"
              >
                <Github className="w-5 h-5" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/guilhermepozo/"
                className="text-muted-foreground hover:text-cyan transition-all duration-200 transform hover:scale-110 hover:-translate-y-0.5 relative group"
                aria-label="LinkedIn Profile"
                title="Connect with me on LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="flex min-h-screen">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-64 border-r border-border p-8 flex-col justify-between z-40 animate-slide-in-left">
          <div>
            <Link href="/" className="block mb-16 animate-fade-in group">
              <div className="text-2xl font-bold transform transition-all duration-200 hover:scale-105">
                Guilherme <span className="gradient-text">Pozo</span>
              </div>
              <div className="relative flex items-start gap-3 mt-1">
                <div className="text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground">Software Engineer</div>
                <div className="relative group/dog">
                  <div
                    className="relative w-20 h-20 transition-all duration-300 group-hover/dog:scale-110 cursor-pointer mt-[-6px]"
                    onClick={() => setSelectedImage({ image: '/shiva.png', title: 'Shiva', description: 'My Blue Heeler dog, one of the site inspirations 🐾' })}
                  >
                    <Image
                      src="/shiva.png"
                      alt="Shiva"
                      width={60}
                      height={60}
                      className="object-contain"
                      priority
                    />
                  </div>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1.5 bg-foreground text-background text-xs rounded-lg whitespace-nowrap opacity-0 group-hover/dog:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
                    <span className="flex items-center gap-1.5">
                      🐾 Shiva, my dog, one of the site inspirations
                    </span>
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 -mb-1 border-4 border-transparent border-b-foreground"></div>
                  </div>
                </div>
              </div>
            </Link>

            <nav className="space-y-2">
              {[
                { href: '#now', label: 'Now', activeClass: 'text-yellow bg-yellow/10', hoverClass: 'hover:text-yellow hover:bg-yellow/5', barClass: 'bg-yellow', delay: '100ms' },
                { href: '#about', label: 'About', activeClass: 'text-cyan bg-cyan/10', hoverClass: 'hover:text-cyan hover:bg-cyan/5', barClass: 'bg-cyan', delay: '150ms' },
                { href: '#experience', label: 'Experience', activeClass: 'text-purple bg-purple/10', hoverClass: 'hover:text-purple hover:bg-purple/5', barClass: 'bg-purple', delay: '200ms' },
                { href: '#projects', label: 'Projects', activeClass: 'text-green bg-green/10', hoverClass: 'hover:text-green hover:bg-green/5', barClass: 'bg-green', delay: '250ms' },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{ animationDelay: item.delay }}
                  className={`block transition-all duration-200 text-sm uppercase tracking-wider py-2 px-3 rounded-lg relative overflow-hidden group animate-slide-in-left ${
                    activeSection === item.href.slice(1)
                      ? `${item.activeClass} font-medium`
                      : `text-muted-foreground ${item.hoverClass}`
                  }`}
                >
                  <span className={`absolute left-0 top-0 h-full w-1 ${item.barClass} transform transition-all duration-300 ${
                    activeSection === item.href.slice(1) ? 'scale-y-100' : 'scale-y-0 group-hover:scale-y-100'
                  }`}></span>
                  <span className="relative z-10 block transform transition-transform duration-200 group-hover:translate-x-1">
                    {item.label}
                  </span>
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex gap-4 animate-fade-in animate-delay-400">
            <Link
              href="https://github.com/guilhermepozo"
              className="text-muted-foreground hover:text-purple transition-all duration-200 transform hover:scale-110 hover:-translate-y-1 hover:rotate-3 relative group"
              aria-label="GitHub Profile"
              title="Visit my GitHub profile"
            >
              <Github className="w-5 h-5" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/guilhermepozo/"
              className="text-muted-foreground hover:text-cyan transition-all duration-200 transform hover:scale-110 hover:-translate-y-1 hover:rotate-3 relative group"
              aria-label="LinkedIn Profile"
              title="Connect with me on LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </Link>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:ml-64 pt-16 lg:pt-0">
          {/* Hero Section */}
          <section id="now" className="min-h-screen flex items-center px-4 sm:px-8 lg:px-16 py-20">
            <div className="max-w-3xl animate-fade-up">
              <div className="text-sm text-yellow mb-4 animate-fade-in animate-delay-100">Hey there, I'm Pozo</div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 lg:mb-8 leading-tight text-balance animate-fade-up animate-delay-200">
                Building <span className="gradient-text">scalable cloud applications</span> and AI-powered solutions
              </h1>
              <p className="text-lg lg:text-xl text-comment leading-relaxed mb-6 lg:mb-8 animate-fade-up animate-delay-300">
                Currently leading Digital & Full Stack LATAM at <Link href="https://www.jnj.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-1">Johnson & Johnson <ArrowUpRight className="w-4 h-4" /></Link>,
                where I architect cloud solutions, drive DevOps excellence, and pioneer AI/Agentic automation across the
                software development lifecycle.
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 animate-fade-up animate-delay-400">
                <Link href="#experience" className="btn-primary text-center">
                  View my works
                </Link>
                <button
                  onClick={() => {
                    const event = new KeyboardEvent('keydown', {
                      key: 'k',
                      code: 'KeyK',
                      ctrlKey: true,
                      metaKey: true,
                      bubbles: true
                    });
                    document.dispatchEvent(event);
                  }}
                  className="group relative px-6 py-3 rounded-lg border border-border hover:border-transparent transition-all duration-300 hover:-translate-y-1 overflow-hidden text-center cursor-pointer"
                >
                  {/* Gradient border on hover */}
                  <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-pink via-purple to-cyan p-[1px]">
                    <div className="h-full w-full bg-background rounded-lg"></div>
                  </div>

                  {/* Gradient background glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-pink/5 via-purple/5 to-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>

                  <div className="relative inline-flex items-center gap-2 text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                    <span className="text-sm font-medium">Press</span>
                    <kbd className="inline-flex items-center gap-1 px-2 py-1 bg-muted text-foreground border border-border rounded font-mono text-sm shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:border-purple/50">
                      {isMac ? (
                        <>
                          <span>⌘</span>
                          <span>K</span>
                        </>
                      ) : (
                        <>
                          <span className="text-xs">ctrl</span>
                          <span>K</span>
                        </>
                      )}
                    </kbd>
                    <span className="text-sm font-medium">to start</span>
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </button>
              </div>
            </div>
          </section>

          {/* About Section */}
          <section id="about" className="px-4 sm:px-8 lg:px-16 py-16 lg:py-20 border-t border-border">
            <div className="max-w-3xl">
              <h2 className={`text-sm uppercase tracking-wider mb-6 lg:mb-8 transition-colors ${visibleSections.has('about') ? 'animate-fade-up' : 'opacity-0'} ${activeSection === 'about' ? 'text-cyan' : 'text-muted-foreground'}`}>About</h2>
              <p className={`text-base lg:text-lg text-comment leading-relaxed mb-4 lg:mb-6 ${visibleSections.has('about') ? 'animate-fade-up animate-delay-100' : 'opacity-0'}`}>
                I'm a Software Architect who thrives on bridging the gap between complex technical challenges and real business impact.
                My world spans from architecting <span className="text-purple">cloud infrastructure</span> (AWS, Azure and GCP) and leading engineering teams,
                to hands-on coding of <span className="text-green">intuitive frontend experiences</span> and robust
                 <span className="text-orange"> backend systems</span>. I believe the best solutions come from understanding the entire stack, and <span className="text-pink">the people</span> who build it.
              </p>
              <p className={`text-base lg:text-lg text-comment leading-relaxed mb-4 lg:mb-6 ${visibleSections.has('about') ? 'animate-fade-up animate-delay-200' : 'opacity-0'}`}>
                I'm working with teams across the <span className="text-cyan">Globe</span>, showing them how <span className="text-orange">AI agents</span> and <span className="text-purple">LLMs</span> can transform the way we build software, making it
                not just <span className="text-green">faster</span>, but genuinely more <span className="text-yellow">enjoyable</span> and <span className="text-pink">efficient</span>, delivering <span className="text-foreground font-medium">real value to the business</span>. You'll often find me experimenting technologies like <span className="text-cyan">Langflow</span>, <span className="text-purple">LangGraph</span>, and <span className="text-orange">LangChain</span>,
                taking those <span className="text-green">"what if we could..."</span> conversations and actually <span className="text-foreground font-medium">making them happen</span>.
              </p>
              <p className={`text-base lg:text-lg text-comment leading-relaxed ${visibleSections.has('about') ? 'animate-fade-up animate-delay-300' : 'opacity-0'}`}>
                I call <span className="text-foreground">São José dos Campos, Brazil</span> home, and I've been
                fortunate to work with amazing teams at places like <span className="text-foreground">Johnson & Johnson</span>, <span className="text-foreground">Embraer</span>, and <span className="text-foreground">Ambev</span>, plus some
                really cool startups like <span className="text-foreground">Quero Educação</span>. What drives me is making developers' lives easier and building systems that can actually scale.
              </p>
            </div>
          </section>

          {/* Now Section */}
          {/* <section id="now" className="px-16 py-20 border-t border-border">
            <div className="max-w-3xl">
              <h2 className="text-sm uppercase tracking-wider text-muted-foreground mb-8 animate-fade-up">What I'm doing now</h2>

              <div className="space-y-6 animate-fade-up animate-delay-100">
                <div className="group p-6 border border-border rounded-lg hover:border-yellow transition-colors">
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-yellow transition-colors mb-3">
                    🤖 AI/Agentic Automation at J&J
                  </h3>
                  <p className="text-comment leading-relaxed">
                    Leading the implementation of LLM-powered automation across our software development lifecycle.
                    Currently building intelligent agents for code review, testing, and deployment optimization.
                  </p>
                </div>

                <div className="group p-6 border border-border rounded-lg hover:border-yellow transition-colors">
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-yellow transition-colors mb-3">
                    🌎 LATAM Communities of Practice
                  </h3>
                  <p className="text-comment leading-relaxed">
                    Organizing and mentoring Communities of Practice across Latin America, focusing on
                    Infrastructure & Cloud, Software Engineering, and Platform Engineering excellence.
                  </p>
                </div>

                <div className="group p-6 border border-border rounded-lg hover:border-yellow transition-colors">
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-yellow transition-colors mb-3">
                    📚 Learning & Writing
                  </h3>
                  <p className="text-comment leading-relaxed">
                    Deep diving into advanced Kubernetes patterns, exploring the latest in AI/ML tooling,
                    and writing about scaling engineering teams. Always sharing knowledge through articles and talks.
                  </p>
                </div>

                <div className="group p-6 border border-border rounded-lg hover:border-yellow transition-colors">
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-yellow transition-colors mb-3">
                    🛠️ Side Projects
                  </h3>
                  <p className="text-comment leading-relaxed">
                    Building personal automation tools and experimenting with new technologies.
                    Currently working on a developer productivity platform using AI agents.
                  </p>
                </div>
              </div>

              <div className="mt-8 text-center">
                <Link href="/now" className="btn-secondary">
                  Read More
                </Link>
              </div>
            </div>
          </section> */}

          {/* Experience Section */}
          <section id="experience" className="px-4 sm:px-8 lg:px-16 py-16 lg:py-20 border-t border-border">
            <div className="max-w-4xl">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 lg:mb-12">
                <h2 className={`text-sm uppercase tracking-wider mb-2 sm:mb-0 transition-colors ${visibleSections.has('experience') ? 'animate-fade-up' : 'opacity-0'} ${activeSection === 'experience' ? 'text-purple' : 'text-muted-foreground'}`}>Experience</h2>
                <div className={`text-sm text-muted-foreground ${visibleSections.has('experience') ? 'animate-fade-up animate-delay-100' : 'opacity-0'}`}>
                  {yearsOfExperience}+ years in tech
                </div>
              </div>

              <div className="space-y-12 lg:space-y-16">
                {experiences.map((experience, index) => (
                  <div
                    key={experience.id}
                    className={`group relative ${visibleSections.has('experience') ? `animate-fade-up animate-delay-${Math.min((index + 2) * 100, 500)}` : 'opacity-0'}`}
                  >
                    {/* Timeline dot - hidden on mobile */}
                    <div className="hidden sm:block absolute left-0 top-6 w-3 h-3 bg-border rounded-full group-hover:bg-purple transition-colors"></div>
                    <div className="hidden sm:block absolute left-1.5 top-9 w-px h-full bg-border"></div>

                    <div className="sm:ml-8">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                            <h3 className="text-lg lg:text-xl font-semibold text-foreground group-hover:text-purple transition-colors">
                              {experience.title}
                            </h3>
                            <div className="flex gap-2">
                              {experience.current && (
                                <span className="px-2 py-1 bg-green/10 text-green rounded-full text-xs whitespace-nowrap">
                                  Current
                                </span>
                              )}
                              <span className="px-2 py-1 bg-purple/10 text-purple rounded-full text-xs whitespace-nowrap">
                                {experience.type}
                              </span>
                            </div>
                          </div>
                          <div className="text-comment font-medium mb-1">
                            {experience.company.link ? (
                              <Link
                                href={experience.company.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-purple transition-colors inline-flex items-center gap-1"
                              >
                                {experience.company.name}
                                <ArrowUpRight className="w-3 h-3" />
                              </Link>
                            ) : (
                              experience.company.name
                            )}
                          </div>
                          <div className="text-xs text-muted-foreground mb-4">{experience.location}</div>
                        </div>
                        <div className="text-sm text-muted-foreground lg:ml-6 mb-4 lg:mb-0">
                          {new Date(experience.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} —{' '}
                          {experience.current ? 'Present' : new Date(experience.endDate!).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                        </div>
                      </div>

                      <div className="space-y-3 mb-4">
                        {experience.description.map((desc, descIndex) => (
                          <p key={descIndex} className="text-sm lg:text-base text-comment leading-relaxed">
                            {desc}
                          </p>
                        ))}
                      </div>

                      {experience.achievements.length > 0 && (
                        <div className="mb-4">
                          <h4 className="text-sm font-medium text-foreground mb-2">Key Achievements:</h4>
                          <ul className="space-y-1">
                            {experience.achievements.map((achievement, achIndex) => (
                              <li key={achIndex} className="text-sm text-comment flex items-start gap-2">
                                <span className="text-green mt-1 flex-shrink-0">•</span>
                                <span>{achievement}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div className="flex flex-wrap gap-2">
                        {(expandedExperiences.has(experience.id)
                          ? experience.technologies
                          : experience.technologies.slice(0, 8)
                        ).map((tech, techIndex) => {
                          const colorVariants = [
                            'bg-cyan/10 text-cyan',
                            'bg-purple/10 text-purple',
                            'bg-green/10 text-green',
                            'bg-orange/10 text-orange',
                            'bg-pink/10 text-pink',
                            'bg-yellow/10 text-yellow'
                          ]
                          const colorClass = colorVariants[techIndex % 6]
                          
                          return (
                            <span
                              key={techIndex}
                              className={`px-2 lg:px-3 py-1 ${colorClass} rounded-full text-xs`}
                            >
                              {tech}
                            </span>
                          )
                        })}
                        {experience.technologies.length > 8 && (
                          <button
                            onClick={() => toggleExperience(experience.id)}
                            className="px-2 lg:px-3 py-1 bg-muted/10 text-muted-foreground rounded-full text-xs hover:bg-purple/10 hover:text-purple transition-all duration-200 hover:scale-105 cursor-pointer"
                          >
                            {expandedExperiences.has(experience.id)
                              ? 'Show less'
                              : `+${experience.technologies.length - 8} more`
                            }
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Projects Section */}
          <section id="projects" className="px-4 sm:px-8 lg:px-16 py-16 lg:py-20 border-t border-border">
            <div className="max-w-6xl">
              <h2 className={`text-sm uppercase tracking-wider mb-8 lg:mb-12 transition-colors ${visibleSections.has('projects') ? 'animate-fade-up' : 'opacity-0'} ${activeSection === 'projects' ? 'text-green' : 'text-muted-foreground'}`}>Projects</h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                {featuredProjects.map((project, index) => (
                  <div
                    key={project.id}
                    className={visibleSections.has('projects') ? `animate-fade-up animate-delay-${(index + 1) * 100}` : 'opacity-0'}
                  >
                    <ProjectCard project={project} featured />
                  </div>
                ))}
              </div>

              {/* <div className="text-center mt-12">
                <Link href="/projects" className="btn-secondary">
                  View All Projects
                </Link>
              </div> */}
            </div>
          </section>

          {/* Image Modal for Shiva */}
          {selectedImage && (
            <ImageModal
              images={[selectedImage.image]}
              title={selectedImage.title}
              description={selectedImage.description}
              isOpen={!!selectedImage}
              onClose={() => setSelectedImage(null)}
            />
          )}

          {/* Contact Section */}
          {/* <section id="contact" className="px-4 sm:px-8 lg:px-16 py-16 lg:py-20 border-t border-border">

          {/* Contact Section */}
          {/* <section id="contact" className="px-4 sm:px-8 lg:px-16 py-16 lg:py-20 border-t border-border">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8 lg:mb-12">
                <h2 className="text-sm uppercase tracking-wider text-muted-foreground mb-4 lg:mb-6 animate-fade-up">Get In Touch</h2>
                <p className="text-lg lg:text-2xl text-comment leading-relaxed animate-fade-up animate-delay-100">
                  I'm always interested in hearing about new projects and opportunities. Whether you have a question or
                  just want to say hi, feel free to reach out.
                </p>
              </div>
              <div className="text-center animate-fade-up animate-delay-200">
                <div className="inline-flex flex-col items-center gap-4 lg:gap-6 p-6 lg:p-8 border border-border rounded-lg hover:border-cyan transition-colors">
                  <Mail className="w-10 h-10 lg:w-12 lg:h-12 text-cyan" />
                  <div>
                    <p className="text-sm text-muted-foreground mb-2 lg:mb-3">Drop me a line at</p>
                    <Link
                      href="mailto:hello@guilhermepozo.com"
                      className="text-lg lg:text-2xl font-medium text-foreground hover:text-cyan transition-colors inline-flex items-center gap-2 break-all sm:break-normal"
                    >
                      hello@guilhermepozo.com
                      <ArrowUpRight className="w-4 h-4 lg:w-5 lg:h-5 flex-shrink-0" />
                    </Link>
                  </div>
                  <p className="text-sm text-muted-foreground max-w-md text-center">
                    I typically respond within 24 hours
                  </p>
                </div>
              </div>
            </div>
          </section> */}

          {/* Footer */}
          <footer className="px-4 sm:px-8 lg:px-16 py-8 lg:py-12 border-t border-border">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-sm text-muted-foreground">
                <div>© 2025 Guilherme Pozo. All rights reserved.</div>
                <div>Designed & built with care in Brazil 🇧🇷</div>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-xs text-muted-foreground">
                <span>Design inspired by:</span>
                <div className="flex items-center gap-3 flex-wrap">
                  <Link
                    href="https://draculatheme.com/pro"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-purple transition-all duration-200 inline-flex items-center gap-1 group"
                  >
                    Dracula Pro
                    <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                  <span className="text-border">•</span>
                  <Link
                    href="https://zenorocha.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-cyan transition-all duration-200 inline-flex items-center gap-1 group"
                  >
                    Zeno Rocha
                    <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                  <span className="text-border">•</span>
                  <button
                    onClick={() => setSelectedImage({ image: '/shiva.png', title: 'Shiva', description: 'My Blue Heeler dog, one of the site inspirations 🐾' })}
                    className="hover:text-pink transition-colors inline-flex items-center gap-1 cursor-pointer group"
                  >
                    Shiva, my Blue Heeler dog 🐾
                  </button>
                </div>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  )
}
