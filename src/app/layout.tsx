import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL("https://victrhugo.com"),
  title: {
    default: "Victor Hugo - Java Developer",
    template: "%s | Victor Hugo"
  },
  description: "Java Developer passionate about building scalable enterprise applications. Currently at GFT Technologies working with Spring, Angular, microservices, and cloud technologies. Focused on backend development and distributed systems.",
  keywords: [
    "Victor Hugo",
    "Java Developer",
    "Software Engineer",
    "Backend Developer",
    "Spring Boot",
    "Spring Framework",
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
    "GFT Technologies",
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
        alt: "Victor Hugo - Java Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Victor Hugo - Java Developer",
    description: "Java Developer passionate about building scalable enterprise applications with Spring, Angular, and microservices. Focused on backend development and distributed systems.",
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
    jobTitle: "Java Developer",
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
      "Angular",
      "Microservices",
      "REST APIs",
      "PostgreSQL",
      "Docker",
      "Apache Kafka",
      "RabbitMQ",
      "Redis",
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
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <Suspense fallback={
          <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="flex flex-col items-center gap-6">
              <div className="relative w-20 h-20">
                {/* Spinning gradient circle */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-pink via-purple to-cyan animate-spin opacity-75" style={{ animationDuration: '1.5s' }}></div>
                <div className="absolute inset-2 rounded-full bg-background"></div>
              </div>

              {/* Animated text */}
              <div className="flex items-center gap-2">
                <span className="text-lg font-medium gradient-text animate-pulse">Loading</span>
                <span className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-pink rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-1.5 h-1.5 bg-purple rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-1.5 h-1.5 bg-cyan rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </span>
              </div>
            </div>
          </div>
        }>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
