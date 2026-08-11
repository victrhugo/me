"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight, Github, Linkedin, Search, User, Briefcase, Layers, FolderGit2, Mail } from "lucide-react"
import { CommandPalette } from "@/components/command-palette"
import { ProjectCard } from "@/components/project-card"
import { ImageModal } from "@/components/image-modal"
import { ContactForm } from "@/components/contact-form"
import { getFeaturedProjects } from "@/data/projects"
import { getAllExperiences, getExperienceYears } from "@/data/experience"
import { skillCategories } from "@/data/skills"

const navItems = [
  { href: '#me', label: 'Me', icon: User, activeClass: 'border-cyan text-cyan bg-cyan/5', iconBg: 'bg-cyan/10 text-cyan' },
  { href: '#experience', label: 'Experience', icon: Briefcase, activeClass: 'border-purple text-purple bg-purple/5', iconBg: 'bg-purple/10 text-purple' },
  { href: '#skills', label: 'Skills', icon: Layers, activeClass: 'border-orange text-orange bg-orange/5', iconBg: 'bg-orange/10 text-orange' },
  { href: '#projects', label: 'Projects', icon: FolderGit2, activeClass: 'border-green text-green bg-green/5', iconBg: 'bg-green/10 text-green' },
  { href: '#contact', label: 'Contact', icon: Mail, activeClass: 'border-pink text-pink bg-pink/5', iconBg: 'bg-pink/10 text-pink' },
]

const sectionIds = ['me', 'experience', 'skills', 'projects', 'contact']

export default function Home() {
  const [expandedExperiences, setExpandedExperiences] = useState<Set<string>>(new Set())
  const [selectedImage, setSelectedImage] = useState<{ image: string; title: string; description: string } | null>(null)
  const [activeSection, setActiveSection] = useState<string>('me')
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set(['me']))
  const [isMac, setIsMac] = useState(false)

  useEffect(() => {
    setIsMac(navigator.platform.toUpperCase().indexOf('MAC') >= 0)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const section = document.getElementById(sectionIds[i])
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sectionIds[i])
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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

    sectionIds.forEach((sectionId) => {
      const element = document.getElementById(sectionId)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

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

  const openCommandPalette = () => {
    const event = new KeyboardEvent('keydown', {
      key: 'k',
      code: 'KeyK',
      ctrlKey: true,
      metaKey: true,
      bubbles: true
    })
    document.dispatchEvent(event)
  }

  const showMeAvatar = () => setSelectedImage({
    image: '/me.png',
    title: 'Victor Hugo',
    description: 'Java Developer passionate about building scalable applications ☕'
  })

  const featuredProjects = getFeaturedProjects()
  const experiences = getAllExperiences()
  const yearsOfExperience = getExperienceYears()

  return (
    <div className="min-h-screen text-foreground relative">
      <CommandPalette />

      {/* Minimal floating wordmark */}
      <Link
        href="#"
        className="fixed top-4 left-4 sm:top-6 sm:left-6 z-40 text-sm font-bold animate-fade-in"
      >
        Victor <span className="gradient-text">Hugo</span>
      </Link>

      <main className="relative z-10">
        {/* Hero */}
        <section className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-8 py-28 sm:py-32 text-center">
          <div className="max-w-2xl w-full flex flex-col items-center animate-fade-up">
            <div className="text-base sm:text-lg text-muted-foreground mb-3 animate-fade-in animate-delay-100">
              Hey, I&apos;m Victor 👋
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 leading-tight text-balance animate-fade-up animate-delay-200">
              <span className="gradient-text">Java Developer</span>
            </h1>

            <div className="relative w-40 h-40 sm:w-48 sm:h-48 mb-10 animate-scale-in animate-delay-300">
              <Image
                src="/memoji.png"
                alt="Victor Hugo"
                fill
                sizes="192px"
                className="object-contain drop-shadow-xl"
                priority
              />
            </div>

            <button
              onClick={openCommandPalette}
              className="w-full flex items-center gap-3 px-5 py-4 rounded-full border border-border bg-card shadow-sm hover:shadow-md hover:border-purple/40 transition-all duration-300 text-left animate-fade-up animate-delay-400 cursor-pointer"
            >
              <Search className="w-4 h-4 text-muted-foreground shrink-0" />
              <span className="text-muted-foreground text-sm sm:text-base flex-1">Ask me anything...</span>
              <span className="flex items-center gap-1 shrink-0">
                <kbd className="px-1.5 py-1 text-xs bg-muted text-muted-foreground border border-border rounded font-mono">
                  {isMac ? '⌘' : 'Ctrl'}
                </kbd>
                <kbd className="px-1.5 py-1 text-xs bg-muted text-muted-foreground border border-border rounded font-mono">
                  K
                </kbd>
              </span>
            </button>

            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-10 animate-fade-up animate-delay-500">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = activeSection === item.href.slice(1)
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex flex-col items-center gap-2 px-5 sm:px-6 py-4 rounded-2xl border bg-card shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 ${
                      isActive ? item.activeClass : 'border-border text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center ${item.iconBg}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium">{item.label}</span>
                  </Link>
                )
              })}
            </div>

            <div className="flex items-center gap-5 mt-10">
              <Link
                href="https://github.com/victrhugo"
                className="text-muted-foreground hover:text-purple transition-all duration-200 transform hover:scale-110 hover:-translate-y-1"
                aria-label="GitHub Profile"
                title="Visit my GitHub profile"
              >
                <Github className="w-5 h-5" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/v-ictorh/"
                className="text-muted-foreground hover:text-cyan transition-all duration-200 transform hover:scale-110 hover:-translate-y-1"
                aria-label="LinkedIn Profile"
                title="Connect with me on LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Me */}
        <section id="me" className="px-4 sm:px-8 py-16 sm:py-24 border-t border-border">
          <div className="max-w-3xl mx-auto">
            <h2 className={`text-sm uppercase tracking-wider mb-8 transition-colors ${visibleSections.has('me') ? 'animate-fade-up' : 'opacity-0'} ${activeSection === 'me' ? 'text-cyan' : 'text-muted-foreground'}`}>Me</h2>

            <p className={`text-base lg:text-lg text-comment leading-relaxed mb-6 ${visibleSections.has('me') ? 'animate-fade-up animate-delay-100' : 'opacity-0'}`}>
              Currently working as Software Developer Intern at <Link href="https://www.gft.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-1">GFT Technologies <ArrowUpRight className="w-4 h-4" /></Link>,
              where I develop robust microservices using Spring, Angular, and modern cloud technologies,
              gaining hands-on experience with enterprise-grade systems and distributed architectures.
            </p>
            <p className={`text-base lg:text-lg text-comment leading-relaxed mb-6 ${visibleSections.has('me') ? 'animate-fade-up animate-delay-200' : 'opacity-0'}`}>
              I&apos;m a passionate <span className="text-orange">Java Developer</span> who loves building <span className="text-purple">scalable backend systems</span> and <span className="text-cyan">modern web applications</span>.
              My journey in tech started with <span className="text-green">IT support</span>, where I learned the importance of understanding user needs and system reliability.
              Now, I&apos;m diving deep into <span className="text-pink">enterprise software development</span>, working with cutting-edge technologies like <span className="text-orange">Spring Framework</span>, <span className="text-cyan">microservices</span>, and <span className="text-purple">event-driven architectures</span>.
            </p>
            <p className={`text-base lg:text-lg text-comment leading-relaxed mb-6 ${visibleSections.has('me') ? 'animate-fade-up animate-delay-300' : 'opacity-0'}`}>
              Currently at <span className="text-foreground font-medium">GFT Technologies</span>, I&apos;m gaining hands-on experience with <span className="text-orange">Spring Boot</span>, <span className="text-cyan">Angular</span>, <span className="text-purple">Docker</span>, and <span className="text-green">distributed messaging systems</span> like <span className="text-yellow">Kafka</span> and <span className="text-pink">RabbitMQ</span>.
              I&apos;m fascinated by how <span className="text-cyan">microservices architectures</span> and <span className="text-orange">observability tools</span> like <span className="text-green">Prometheus</span> and <span className="text-yellow">Grafana</span> come together to build robust, production-grade systems.
            </p>
            <p className={`text-base lg:text-lg text-comment leading-relaxed ${visibleSections.has('me') ? 'animate-fade-up animate-delay-400' : 'opacity-0'}`}>
              Based in <span className="text-foreground">Brazil</span>, I&apos;m constantly learning and growing as a developer.
              My experience spans from providing <span className="text-cyan">technical support</span> at educational institutions to now building <span className="text-purple">enterprise-grade applications</span>.
              What excites me most is solving complex problems, learning new technologies, and contributing to projects that make a real impact.
            </p>
          </div>
        </section>

        {/* Experience */}
        <section id="experience" className="px-4 sm:px-8 py-16 sm:py-24 border-t border-border">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 lg:mb-12">
              <h2 className={`text-sm uppercase tracking-wider mb-2 sm:mb-0 transition-colors ${visibleSections.has('experience') ? 'animate-fade-up' : 'opacity-0'} ${activeSection === 'experience' ? 'text-purple' : 'text-muted-foreground'}`}>Experience</h2>
              <div className={`text-sm text-muted-foreground ${visibleSections.has('experience') ? 'animate-fade-up animate-delay-100' : 'opacity-0'}`}>
                {yearsOfExperience}+ years in tech
              </div>
            </div>

            <div className="space-y-6">
              {experiences.map((experience, index) => (
                <div
                  key={experience.id}
                  className={`p-6 sm:p-8 rounded-2xl border border-border bg-card shadow-sm hover:shadow-md hover:border-purple/30 transition-all duration-300 ${visibleSections.has('experience') ? `animate-fade-up animate-delay-${Math.min((index + 2) * 100, 500)}` : 'opacity-0'}`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                        <h3 className="text-lg lg:text-xl font-semibold text-foreground">
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
                        className="px-2 lg:px-3 py-1 bg-muted text-muted-foreground rounded-full text-xs hover:bg-purple/10 hover:text-purple transition-all duration-200 hover:scale-105 cursor-pointer"
                      >
                        {expandedExperiences.has(experience.id)
                          ? 'Show less'
                          : `+${experience.technologies.length - 8} more`
                        }
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="px-4 sm:px-8 py-16 sm:py-24 border-t border-border">
          <div className="max-w-4xl mx-auto">
            <h2 className={`text-sm uppercase tracking-wider mb-8 lg:mb-12 transition-colors ${visibleSections.has('skills') ? 'animate-fade-up' : 'opacity-0'} ${activeSection === 'skills' ? 'text-orange' : 'text-muted-foreground'}`}>Skills</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {skillCategories.map((category, index) => (
                <div
                  key={category.title}
                  className={`p-6 rounded-2xl border border-border bg-card shadow-sm hover:shadow-md hover:border-orange/30 transition-all duration-300 ${visibleSections.has('skills') ? `animate-fade-up animate-delay-${Math.min((index + 1) * 100, 500)}` : 'opacity-0'}`}
                >
                  <h3 className="text-sm font-semibold text-foreground mb-4">{category.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <span key={skill} className="text-xs px-3 py-1.5 rounded-full bg-orange/10 text-orange">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="px-4 sm:px-8 py-16 sm:py-24 border-t border-border">
          <div className="max-w-6xl mx-auto">
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
          </div>
        </section>

        {/* Image Modal for Profile */}
        {selectedImage && (
          <ImageModal
            images={[selectedImage.image]}
            title={selectedImage.title}
            description={selectedImage.description}
            isOpen={!!selectedImage}
            onClose={() => setSelectedImage(null)}
          />
        )}

        {/* Contact */}
        <section id="contact" className="px-4 sm:px-8 py-16 sm:py-24 border-t border-border">
          <div className="max-w-md mx-auto text-center">
            <h2 className={`text-sm uppercase tracking-wider mb-4 transition-colors ${visibleSections.has('contact') ? 'animate-fade-up' : 'opacity-0'} ${activeSection === 'contact' ? 'text-pink' : 'text-muted-foreground'}`}>Contact</h2>
            <p className={`text-base text-comment leading-relaxed mb-8 ${visibleSections.has('contact') ? 'animate-fade-up animate-delay-100' : 'opacity-0'}`}>
              I&apos;m always interested in hearing about new projects and opportunities. Whether you have a question or just want to say hi, feel free to reach out.
            </p>

            <div className={visibleSections.has('contact') ? 'animate-fade-up animate-delay-200' : 'opacity-0'}>
              <ContactForm />
            </div>

            <div className="flex items-center justify-center gap-5 mt-10">
              <Link
                href="https://github.com/victrhugo"
                className="text-muted-foreground hover:text-purple transition-all duration-200 transform hover:scale-110 hover:-translate-y-1"
                aria-label="GitHub Profile"
                title="Visit my GitHub profile"
              >
                <Github className="w-5 h-5" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/v-ictorh/"
                className="text-muted-foreground hover:text-cyan transition-all duration-200 transform hover:scale-110 hover:-translate-y-1"
                aria-label="LinkedIn Profile"
                title="Connect with me on LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-4 sm:px-8 py-8 lg:py-12 border-t border-border">
          <div className="max-w-4xl mx-auto flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-sm text-muted-foreground">
              <div>© 2025 Victor Hugo. All rights reserved.</div>
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
                  onClick={showMeAvatar}
                  className="hover:text-pink transition-colors inline-flex items-center gap-1 cursor-pointer group"
                >
                  Built with passion ☕
                </button>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}
