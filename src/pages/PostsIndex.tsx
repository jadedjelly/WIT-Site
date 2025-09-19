
import { useMemo, useState } from 'react'
import { Calendar, Tag as TagIcon, Clock, ArrowRight } from 'lucide-react'
import postsData from '../posts'
import { Card } from '../components/UI'
import { Link } from 'react-router-dom'

export default function PostsIndex() {
  const metas = useMemo(() => postsData.map(p => p.meta), [])

  // Popular tags by frequency
  const popularTags = useMemo(() => {
    const counts: Record<string, number> = {}
    for (const p of metas) for (const t of p.tags) counts[t] = (counts[t] ?? 0) + 1
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 12)
      .map(([tag, count]) => ({ tag, count }))
  }, [metas])

  // Selected tag filter
  const [activeTag, setActiveTag] = useState<string | null>(null)

  // Apply filter to list
  const filtered = useMemo(() => {
    if (!activeTag) return metas
    const n = (x: string) => x.toLowerCase()
    return metas.filter(p => p.tags.some(t => n(t) === n(activeTag)))
  }, [metas, activeTag])

  // Timeline grouped by year (uses filtered posts)
  const timelineByYear = useMemo(() => {
    const map = new Map<string, typeof metas>()
    for (const p of filtered) {
      const year = new Date(p.date).getFullYear().toString()
      if (!map.has(year)) map.set(year, [] as any)
      map.get(year)!.push(p)
    }
    for (const [, arr] of map) arr.sort((a, b) => (a.date < b.date ? 1 : -1))
    return Array.from(map.entries()).sort((a, b) => (a[0] < b[0] ? 1 : -1))
  }, [filtered])

  // Alphabetical all-tags list for filter bar
  const allTags = useMemo(() => {
    const s = new Set<string>()
    for (const p of metas) for (const t of p.tags) s.add(t)
    return Array.from(s).sort((a, b) => a.localeCompare(b))
  }, [metas])

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 py-14">
      <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-6 dark:text-gray-100">All posts</h2>

      <div
        className="
          grid gap-8 lg:gap-12
          md:grid-cols-[minmax(0,1fr)_minmax(260px,340px)]
          lg:grid-cols-[minmax(0,1.8fr)_minmax(280px,380px)]
        "
      >
        {/* MAIN COLUMN */}
        <div>
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

            {allTags.map(tag => (
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

          {/* Post cards */}
          <div className="grid gap-6">
            {filtered.map(post => (
              <Card key={post.slug}>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-lg font-semibold">{post.title}</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400 inline-flex items-center gap-2">
                    <Calendar size={16} /> {new Date(post.date).toLocaleDateString()}
                  </span>
                </div>

                {post.summary && (
                  <p className="text-gray-700 dark:text-gray-300 mt-1">{post.summary}</p>
                )}

                {/* Clickable tags */}
                <div className="mt-2 flex flex-wrap gap-2">
                  {post.tags.map(t => (
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

                {/* Secondary read link */}
                <div className="mt-3">
                  <Link
                    to={`/posts/${post.slug}`}
                    className="inline-flex items-center gap-1 text-sm underline underline-offset-4 hover:decoration-2"
                  >
                    Read <ArrowRight size={14} />
                  </Link>
                </div>
              </Card>
            ))}

            {filtered.length === 0 && (
              <p className="text-sm text-gray-600 dark:text-gray-300">No posts match that tag.</p>
            )}
          </div>
        </div>

        {/* SIDEBAR */}
        <aside className="md:sticky md:top-24 lg:pl-10 space-y-6">
          {/* Popular Tags */}
          <Card>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium inline-flex items-center gap-2">
                <TagIcon size={16} /> Popular tags
              </h3>
              {activeTag && (
                <button
                  type="button"
                  onClick={() => setActiveTag(null)}
                  className="text-xs underline text-gray-600 dark:text-gray-300"
                >
                  Clear
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {popularTags.map(({ tag, count }) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setActiveTag(tag)}
                  aria-pressed={activeTag === tag}
                  title={`${count} post${count === 1 ? '' : 's'}`}
                  className={`px-2 py-1 rounded-full text-xs border
                              ${activeTag === tag
                                ? 'bg-gray-900 text-white border-gray-900 dark:bg-gray-100 dark:text-gray-900 dark:border-gray-100'
                                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 hover:dark:bg-gray-800'}`}
                >
                  {tag} <span className="opacity-60">({count})</span>
                </button>
              ))}
            </div>
          </Card>

          {/* Timeline */}
          <Card>
            <h3 className="font-medium mb-3 inline-flex items-center gap-2">
              <Clock size={16} /> Timeline
            </h3>

            {timelineByYear.length === 0 ? (
              <p className="text-sm text-gray-600 dark:text-gray-300">No posts.</p>
            ) : (
              <div className="space-y-6">
                {timelineByYear.map(([year, list]) => (
                  <div key={year}>
                    <div className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-2">
                      {year}
                    </div>
                    <ol className="relative border-s border-gray-200 dark:border-gray-800 ms-2">
                      {list.map(p => (
                        <li key={p.slug} className="mb-3 ms-4">
                          <div className="absolute w-2 h-2 bg-gray-400 dark:bg-gray-600 rounded-full mt-2 -start-1"></div>
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-sm">{p.title}</span>
                            <div className="flex items-center gap-3">
                              <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                                {new Date(p.date).toLocaleDateString()}
                              </span>
                              <Link
                                to={`/posts/${p.slug}`}
                                className="text-xs underline underline-offset-4 hover:decoration-2 inline-flex items-center gap-1"
                                title="Open post"
                              >
                                Open <ArrowRight size={12} />
                              </Link>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ol>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </aside>
      </div>
    </section>
  )
}
