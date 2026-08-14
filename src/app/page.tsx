"use client"

import Link from "next/link"
import { HandwrittenNote } from "@/components/handwritten-note"
import { LinkPreview } from "@/components/link-preview"
import { playKey } from "@/lib/sound"

const TAGLINE = "i make backends behave (mostly)"
const HUES = [350, 30, 90, 150, 200, 260, 310]

function ColorfulTagline({ text }: { text: string }) {
  return (
    <p className="font-mono text-sm sm:text-base tracking-tight">
      {text.split("").map((char, index) => (
        <span
          key={index}
          onMouseEnter={char === " " ? undefined : () => playKey()}
          className={char === " " ? undefined : "inline-block transition-transform duration-150 ease-out hover:-translate-y-1 hover:scale-125"}
          style={char === " " ? undefined : { color: `oklch(0.72 0.15 ${HUES[index % HUES.length]})` }}
        >
          {char}
        </span>
      ))}
    </p>
  )
}

export default function Home() {
  return (
    <main className="max-w-2xl mx-auto px-6 sm:px-10 pt-8 sm:pt-16 pb-16">
      <h1 className="text-4xl sm:text-5xl mb-4 animate-fade-up">hi, i&apos;m victor 👋</h1>

      <div className="relative mb-10 animate-fade-up animate-delay-100">
        <ColorfulTagline text={TAGLINE} />
        <HandwrittenNote className="absolute top-1 -right-44 w-44">
          still workshopping this line
        </HandwrittenNote>
      </div>

      <div className="space-y-6 text-lg text-comment leading-relaxed animate-fade-up animate-delay-200">
        <p>
          currently a software engineer at{" "}
          <LinkPreview href="https://www.gft.com/">GFT Technologies</LinkPreview>
          , where i build and maintain backend services in java and spring boot for
          systems that are, charitably, enterprise-scale. before that i did it support
          at a school, which taught me more about staying calm under pressure than any
          course did.
        </p>
        <p>
          i like java, spring, and the unglamorous parts of software: the migrations,
          the on-call, the systems nobody notices until they break. forever a student,
          still figuring out the rest as i go.
        </p>
        <p>
          there&apos;s more of that scattered around here: what i&apos;ve{" "}
          <Link href="/built">built</Link>, who i <Link href="/am">am</Link>, and what
          i&apos;m up to <Link href="/now">now</Link>.
        </p>
      </div>
    </main>
  )
}
