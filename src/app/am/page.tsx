import { getAllExperiences, getExperienceYears } from "@/data/experience"
import { skillCategories } from "@/data/skills"
import { ChatAside } from "@/components/chat-aside"
import { HandwrittenNote } from "@/components/handwritten-note"
import { LinkPreview } from "@/components/link-preview"

export const metadata = {
  title: "am",
  description: "Who Victor Hugo is.",
}

export default function AmPage() {
  const experiences = getAllExperiences()
  const years = getExperienceYears()

  return (
    <main className="max-w-2xl mx-auto px-6 sm:px-10 pt-8 sm:pt-16 pb-16">
      <h1 className="text-4xl mb-4 animate-fade-up">am</h1>

      <div className="space-y-6 text-lg text-comment leading-relaxed mb-10 animate-fade-up animate-delay-100">
        <p>
          a software engineer who fell into java the way most people fall into
          their first job: by accident, then on purpose. {years}+ years in, i
          still like it.
        </p>
        <p>
          my path started in it support, fixing other people&apos;s computers and
          learning that &ldquo;it&apos;s broken&rdquo; rarely means what people think it
          means. these days i build backend services and microservices
          instead, which is the same job with better error messages.
        </p>
        <p>
          i care about systems that stay understandable as they grow, apis
          that don&apos;t lie about what they do, and code reviews that catch the
          bug before production does.
        </p>
      </div>

      <div className="relative mb-16 animate-fade-up animate-delay-200">
        <ChatAside
          exchanges={[
            { from: "prompt", text: "so… what do you do?" },
            { from: "reply", text: "i'm a software engineer" },
            { from: "prompt", text: "that's it?" },
            { from: "reply", text: "no, but the other answer takes like 40 minutes" },
          ]}
        />
        <HandwrittenNote className="absolute top-28 -right-72 w-48">
          wrote this page instead of updating my resume
        </HandwrittenNote>
      </div>

      <section className="animate-fade-up animate-delay-300">
        <h2 className="text-2xl mb-8">where i&apos;ve been</h2>
        <div className="space-y-10">
          {experiences.map((experience) => (
            <div key={experience.id}>
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4 mb-1">
                <h3 className="text-xl text-foreground">{experience.title}</h3>
                <span className="font-mono text-xs text-muted-foreground whitespace-nowrap">
                  {new Date(experience.startDate).toLocaleDateString("en-US", {
                    month: "short",
                    year: "numeric",
                  })}{" "}
                  —{" "}
                  {experience.current
                    ? "now"
                    : new Date(experience.endDate!).toLocaleDateString("en-US", {
                        month: "short",
                        year: "numeric",
                      })}
                </span>
              </div>
              <div className="text-comment mb-3">
                {experience.company.link ? (
                  <LinkPreview href={experience.company.link}>{experience.company.name}</LinkPreview>
                ) : (
                  experience.company.name
                )}
                <span className="text-muted-foreground"> · {experience.location}</span>
              </div>
              <p className="text-comment leading-relaxed">{experience.description[0]}</p>
              {experience.technologies.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2 font-mono text-xs">
                  {experience.technologies.map((tech) => (
                    <span key={tech} className="px-2 py-1 rounded-full border border-border text-muted-foreground">
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16 animate-fade-up animate-delay-400">
        <h2 className="text-2xl mb-8">what i reach for</h2>
        <div className="space-y-4 font-mono text-sm">
          {skillCategories.map((category) => (
            <div key={category.title} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
              <span className="text-muted-foreground sm:w-48 shrink-0">
                {category.title.toLowerCase()}
              </span>
              <span className="text-comment">{category.skills.join(" · ")}</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
