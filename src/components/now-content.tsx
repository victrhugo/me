"use client"

import { useState } from "react"
import { getCurrentExperience } from "@/data/experience"
import { FlightGlobe } from "@/components/flight-globe"
import { LinkPreview } from "@/components/link-preview"
import { flights, distanceKm, estimateDuration } from "@/data/travels"
import { playKey } from "@/lib/sound"

export function NowContent() {
  const current = getCurrentExperience()
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const active = activeIndex !== null ? flights[activeIndex] : null
  const activeDistance = active ? distanceKm(active.from, active.to) : null

  const orderedIndices = flights.map((_, i) => i).reverse()
  const indicesByYear = new Map<number, number[]>()
  orderedIndices.forEach((i) => {
    const year = flights[i].year
    if (!indicesByYear.has(year)) indicesByYear.set(year, [])
    indicesByYear.get(year)!.push(i)
  })

  return (
    <main className="max-w-5xl mx-auto px-6 sm:px-10 pt-8 sm:pt-16 pb-16">
      <h1 className="text-4xl mb-4 animate-fade-up">now</h1>
      <p className="text-comment text-lg mb-10 max-w-2xl animate-fade-up animate-delay-100">
        a dated snapshot of whatever currently has my attention. updated
        whenever i remember to.
      </p>

      <div className="space-y-6 text-lg text-comment leading-relaxed mb-16 max-w-2xl animate-fade-up animate-delay-200">
        {current && (
          <p>
            right now, i work at{" "}
            {current.company.link ? (
              <LinkPreview href={current.company.link}>{current.company.name}</LinkPreview>
            ) : (
              current.company.name
            )}
            , building backend services in java and spring boot, with some
            angular and docker on the side.
          </p>
        )}
        <p>
          most days are some mix of REST APIs, microservices, code reviews,
          and figuring out why something that worked yesterday doesn&apos;t work
          today.
        </p>
      </div>

      <section className="animate-fade-up animate-delay-300">
        <h2 className="text-2xl mb-2">plans are not mileage</h2>
        <p className="text-comment mb-10 max-w-2xl">
          buenos aires in 2010, toronto in 2018, and six months in the us in
          2025 — dallas first, then the last month on the road through
          arizona, new mexico, colorado, taos, and the grand canyon. hover a
          route to see it on the globe.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-10 items-start">
          <div>
            <FlightGlobe activeIndex={activeIndex} />

            <div className="mt-6 min-h-[110px] font-mono text-xs rounded-xl border border-border bg-card p-4">
              {active && activeDistance !== null ? (
                <>
                  <div className="text-muted-foreground mb-2">{active.date}</div>
                  <div className="font-sans text-base text-foreground mb-2">
                    {active.from.name} to {active.to.name}
                  </div>
                  <div className="text-muted-foreground leading-relaxed">
                    {active.from.airport} ({active.from.code}) to {active.to.airport} (
                    {active.to.code}). ~{estimateDuration(activeDistance)} in the air, about{" "}
                    {activeDistance}km
                  </div>
                </>
              ) : (
                <div className="text-muted-foreground">hover a route on the right →</div>
              )}
            </div>
          </div>

          <div className="font-mono text-sm">
            {Array.from(indicesByYear.entries()).map(([year, indices]) => (
              <div key={year} className="mt-10 first:mt-0 pt-6 first:pt-0 border-t border-border first:border-t-0">
                <div className="text-xs text-muted-foreground mb-4">{year}</div>
                {indices.map((index) => {
                  const flight = flights[index]
                  const isActive = activeIndex === index
                  return (
                    <button
                      key={flight.id}
                      onMouseEnter={() => {
                        setActiveIndex(index)
                        playKey()
                      }}
                      onMouseLeave={() => setActiveIndex(null)}
                      className={`block w-full text-left py-3 border-b border-border transition-colors cursor-pointer ${
                        isActive ? "text-amber" : "text-foreground hover:text-amber"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <span>
                          {flight.from.code} → {flight.to.code}
                        </span>
                        <span className="text-muted-foreground whitespace-nowrap">{flight.date}</span>
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {flight.from.name} to {flight.to.name}
                      </div>
                    </button>
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
