import type React from "react"
import type { Metadata } from "next"
import { Newsreader, Caveat } from "next/font/google"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { SoundProvider } from "@/components/sound-provider"
import { CommandPalette } from "@/components/command-palette"
import { CursorTrail } from "@/components/cursor-trail"
import "./globals.css"

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
})

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-caveat",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://victrhugo.com"),
  title: {
    default: "Victor Hugo - Software Engineer",
    template: "%s | Victor Hugo"
  },
  description: "Software Engineer passionate about building scalable enterprise applications. Currently at GFT Technologies working with Spring, Angular, microservices, and cloud technologies. Focused on backend development and distributed systems.",
  keywords: [
    "Victor Hugo",
    "Java Developer",
    "Software Engineer",
    "Backend Developer",
    "Spring Boot",
    "Spring Framework",
    "Quarkus",
    "Angular",
    "Microservices",
    "REST API",
    "Java",
    "PostgreSQL",
    "Docker",
    "Kafka",
    "RabbitMQ",
    "Redis",
    "JWT",
    "Keycloak",
    "Maven",
    "JPA",
    "Hibernate",
    "Terraform",
    "AWS",
    "GFT Technologies",
    "Itaú Unibanco",
    "Brazil",
    "Enterprise Applications",
    "Distributed Systems",
    "Event-Driven Architecture",
    "Prometheus",
    "Grafana"
  ],
  authors: [{ name: "Victor Hugo", url: "https://victrhugo.com" }],
  creator: "Victor Hugo",
  publisher: "Victor Hugo",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://victrhugo.com",
    title: "Victor Hugo - Tech Lead, SRE & Cloud Architect",
    description: "Technical Leader specializing in cloud engineering, AI automation, and DevOps excellence. Expert in AWS, Azure, Kubernetes, and AI-powered solutions.",
    siteName: "Victor Hugo",
    images: [
      {
        url: "/me.png",
        width: 759,
        height: 845,
        alt: "Victor Hugo - Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Victor Hugo - Software Engineer",
    description: "Software Engineer passionate about building scalable enterprise applications with Spring, Angular, and microservices. Focused on backend development and distributed systems.",
    images: ["/me.png"],
    creator: "@victrhugo",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://victrhugo.com",
  },
  category: "technology",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Victor Hugo",
    url: "https://victrhugo.com",
    image: "https://victrhugo.com/me.png",
    jobTitle: "Software Engineer",
    worksFor: {
      "@type": "Organization",
      name: "GFT Technologies",
    },
    description: "Java Developer passionate about building scalable enterprise applications with Spring, Angular, and microservices. Focused on backend development and distributed systems.",
    sameAs: [
      "https://github.com/victrhugo",
      "https://www.linkedin.com/in/victrhugo/",
    ],
    knowsAbout: [
      "Java",
      "Spring Framework",
      "Spring Boot",
      "Quarkus",
      "Angular",
      "Microservices",
      "REST APIs",
      "PostgreSQL",
      "Docker",
      "Apache Kafka",
      "RabbitMQ",
      "Redis",
      "Terraform",
      "AWS",
      "Backend Development",
      "Distributed Systems",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "São José dos Campos",
      addressRegion: "SP",
      addressCountry: "BR",
    },
  }

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`font-serif ${newsreader.variable} ${caveat.variable} ${GeistMono.variable} antialiased`}>
        <SoundProvider />
        <CommandPalette />
        <CursorTrail />
        <SiteHeader />
        <Suspense fallback={
          <div className="min-h-screen flex items-center justify-center bg-background">
            <span className="font-mono text-sm text-muted-foreground animate-pulse">loading…</span>
          </div>
        }>{children}</Suspense>
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  )
}
