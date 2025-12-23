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
    default: "Victor Hugo - Tech Lead, SRE & Cloud Architect",
    template: "%s | Victor Hugo"
  },
  description: "Technical Leader specializing in cloud engineering, AI automation, and DevOps excellence. Currently at Johnson & Johnson leading Digital & Full Stack LATAM. Expert in AWS, Azure, Kubernetes, and AI-powered solutions.",
  keywords: [
    "Victor Hugo",
    "Software Engineer",
    "Site Reliability Engineer",
    "SRE",
    "Tech Lead",
    "Cloud Architect",
    "Cloud Engineering",
    "DevOps Engineer",
    "AI Automation",
    "LLM",
    "AI Agents",
    "Infrastructure as Code",
    "IaC",
    "Kubernetes",
    "AWS",
    "Azure",
    "GCP",
    "Terraform",
    "Docker",
    "CI/CD",
    "Platform Engineering",
    "Johnson & Johnson",
    "Brazil",
    "São José dos Campos",
    "Full Stack Developer",
    "TypeScript",
    "Python",
    "React",
    "Next.js",
    "LangChain",
    "Langflow",
    "LangGraph"
  ],
  authors: [{ name: "Victor Hugo", url: "https://victrhugo.com" }],
  creator: "Victor Hugo",
  publisher: "Victor Hugo",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: ["/favicon-32.ico"],
    apple: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
    ],
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
    title: "Victor Hugo - Tech Lead, SRE & Cloud Architect",
    description: "Technical Leader specializing in cloud engineering, AI automation, and DevOps excellence. Expert in AWS, Azure, Kubernetes, and AI-powered solutions.",
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
    jobTitle: "Tech Lead & Site Reliability Engineer",
    worksFor: {
      "@type": "Organization",
      name: "Johnson & Johnson",
    },
    description: "Technical Leader specializing in cloud engineering, AI automation, and DevOps excellence. Expert in AWS, Azure, Kubernetes, and AI-powered solutions.",
    sameAs: [
      "https://github.com/victrhugo",
      "https://www.linkedin.com/in/victrhugo/",
    ],
    knowsAbout: [
      "Cloud Engineering",
      "Site Reliability Engineering",
      "DevOps",
      "AI Automation",
      "Kubernetes",
      "AWS",
      "Azure",
      "GCP",
      "Infrastructure as Code",
      "Platform Engineering",
      "Software Architecture",
      "Full Stack Development",
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
