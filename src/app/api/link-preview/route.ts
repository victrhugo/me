const ALLOWED_HOSTS = new Set(["www.gft.com", "gft.com", "github.com", "www.linkedin.com", "linkedin.com"])

// Captures the opening quote char and backreferences it, so values that
// contain the *other* quote char (e.g. an apostrophe inside a "..." attr)
// aren't truncated early.
function extractMeta(html: string, attr: "property" | "name", key: string): string | undefined {
  const patterns = [
    new RegExp(`<meta[^>]+${attr}=["']${key}["'][^>]+content=(["'])((?:(?!\\1)[\\s\\S])*?)\\1`, "i"),
    new RegExp(`<meta[^>]+content=(["'])((?:(?!\\1)[\\s\\S])*?)\\1[^>]+${attr}=["']${key}["']`, "i"),
  ]
  for (const pattern of patterns) {
    const match = html.match(pattern)
    if (match) return match[2]
  }
  return undefined
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const target = searchParams.get("url")
  if (!target) {
    return Response.json({ error: "missing url" }, { status: 400 })
  }

  let parsed: URL
  try {
    parsed = new URL(target)
  } catch {
    return Response.json({ error: "invalid url" }, { status: 400 })
  }

  if (!ALLOWED_HOSTS.has(parsed.hostname)) {
    return Response.json({ error: "domain not allowed" }, { status: 403 })
  }

  try {
    const res = await fetch(parsed.toString(), {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; victrhugo-link-preview/1.0)" },
      next: { revalidate: 86400 },
      signal: AbortSignal.timeout(5000),
    })
    const html = await res.text()
    const finalUrl = new URL(res.url)

    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i)
    const faviconMatch = html.match(
      /<link[^>]+rel=["'][^"']*icon[^"']*["'][^>]+href=(["'])((?:(?!\1)[\s\S])*?)\1/i
    )

    const image = extractMeta(html, "property", "og:image")
    const favicon = faviconMatch?.[2]

    const data = {
      title: extractMeta(html, "property", "og:title") || titleMatch?.[1]?.trim() || finalUrl.hostname,
      description:
        extractMeta(html, "property", "og:description") || extractMeta(html, "name", "description") || "",
      image: image ? new URL(image, finalUrl).toString() : null,
      favicon: favicon ? new URL(favicon, finalUrl).toString() : null,
      siteName: extractMeta(html, "property", "og:site_name") || finalUrl.hostname,
    }

    return Response.json(data, { headers: { "Cache-Control": "public, max-age=86400" } })
  } catch {
    return Response.json({ error: "fetch failed" }, { status: 502 })
  }
}
