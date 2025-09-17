
import { useMemo, useState } from 'react'
import { Calendar, ExternalLink, MapPin, FileDown } from 'lucide-react'
import { site } from '../content'
import postsData from '../posts'
import { Section, Card, Tag } from '../components/UI'
import { CollapseItem } from '../components/Accordion'
import { Link } from 'react-router-dom'

export default function Home() {
  // --- Posts (latest 3) ---
  const latest = useMemo(() => postsData.slice(0, 3).map(p => p.meta), [])

  // --- Projects filtering ---
  const [activeTag, setActiveTag] = useState<string | null>(null)

  const allTags = useMemo(() => {
    const set = new Set<string>()
    for (const p of site.projects) for (const t of p.tags) set.add(t)
    return Array.from(set).sort((a, b) => a.localeCompare(b))
  }, [])

  const filteredProjects = useMemo(() => {
    if (!activeTag) return site.projects
    const norm = (s: string) => s.toLowerCase()
    return site.projects.filter((p) => p.tags.some((t) => norm(t) === norm(activeTag)))
  }, [activeTag])

  return (
    <>
      {/* Hero */}
      <section className="max-w-5xl mx-auto px-4 md:px-6 pt-14 pb-10">
        <div className="grid md:grid-cols-[1.2fr_.8fr] gap-8 items-center">
          <div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
              {site.title}
            </h1>
            <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">{site.tagline}</p>

            {/* Location + Resume */}
            <div className="mt-5 flex flex-wrap items-center gap-3 text-sm">
              <span className="inline-flex items-center gap-2">
                <MapPin size={16} /> {site.location}
              </span>
              {site.resumeUrl && (
                <a
                  className="inline-flex items-center gap-2 hover:underline"
                  href={site.resumeUrl}
                  download
                >
                  <FileDown size={16} /> Resume
                </a>
              )}
            </div>
          </div>

          {/* At a glance */}
          <div className="rounded-2xl border border-gray-200/70 shadow-sm p-6 bg-white dark:bg-gray-900 dark:border-gray-800">
            <h3 className="font-medium mb-3">At a glance</h3>
            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300 list-disc list-inside">
              {site.about.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* About */}
      <Section id="about" title="About">
        <Card>
          <p className="text-gray-800 dark:text-gray-200 leading-relaxed">{site.about.blurb}</p>
        </Card>
      </Section>

      {/* Experience (collapsible) */}
      <Section id="experience" title="Experience">
        {site.experience.map((xp) => (
          <CollapseItem
            key={xp.role + xp.company}
            title={`${xp.role} · ${xp.company}`}
            subtitle={
              <span className="inline-flex items-center gap-2">
                <Calendar size={16} /> {xp.period}
              </span>
            }
            meta={xp.location}
            defaultOpen={false}
          >
            <ul className="mt-1 space-y-2 text-gray-800 dark:text-gray-200 list-disc list-inside">
              {xp.bullets.map((b: string) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </CollapseItem>
        ))}
      </Section>

      {/* Projects with tag filter */}
      <Section id="projects" title="Projects">
        {/* Filter bar */}
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTag(null)}
            aria-pressed={activeTag === null}
            className={`px-3 py-1.5 rounded-full text-xs border transition
                        ${activeTag === null
                          ? 'bg-gray-900 text-white border-gray-900 dark:bg-gray-100 dark:text-gray-900 dark:border-gray-100'
                          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 hover:dark:bg-gray-800'}`}
          >
            All
          </button>

          {allTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setActiveTag(tag)}
              aria-pressed={activeTag === tag}
              className={`px-3 py-1.5 rounded-full text-xs border transition
                          ${activeTag === tag
                            ? 'bg-gray-900 text-white border-gray-900 dark:bg-gray-100 dark:text-gray-900 dark:border-gray-100'
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 hover:dark:bg-gray-800'}`}
            >
              {tag}
            </button>
          ))}

          {activeTag && (
            <button
              type="button"
              onClick={() => setActiveTag(null)}
              className="ml-1 text-xs underline text-gray-600 dark:text-gray-300"
            >
              Clear filter
            </button>
          )}
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredProjects.map((p) => (
            <Card key={p.name}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  {p.link ? (
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-lg font-semibold hover:underline inline-flex items-center gap-2"
                    >
                      {p.name} <ExternalLink size={16} />
                    </a>
                  ) : (
                    <span className="text-lg font-semibold">{p.name}</span>
                  )}
                  <p className="text-gray-700 dark:text-gray-300 mt-1">{p.description}</p>
                </div>
              </div>

              {/* Clickable tags */}
              <div className="mt-3 flex flex-wrap gap-2">
                {p.tags.map((t: string) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setActiveTag(t)}
                    className={`px-2 py-1 rounded-full text-xs border
                                ${activeTag === t
                                  ? 'bg-gray-900 text-white border-gray-900 dark:bg-gray-100 dark:text-gray-900 dark:border-gray-100'
                                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 hover:dark:bg-gray-800'}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* Latest posts */}
      <Section id="posts" title="Latest posts">
        {latest.map((post) => (
          <Card key={post.slug}>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <Link to={`/posts/${post.slug}`} className="text-lg font-semibold hover:underline">
                {post.title}
              </Link>
              <span className="text-sm text-gray-600 inline-flex items-center gap-2">
                <Calendar size={16} /> {new Date(post.date).toLocaleDateString()}
              </span>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mt-1">{post.summary}</p>
            <div className="mt-2">
              {post.tags.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
          </Card>
        ))}
        <div className="text-sm">
          <Link to="/posts" className="underline">
            See all posts →
          </Link>
        </div>
      </Section>
    </>
  )
}
