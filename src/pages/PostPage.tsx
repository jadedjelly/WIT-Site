
import { useMemo, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import postsData from '../posts'
import { Card, Tag } from '../components/UI'
import { Calendar, Tag as TagIcon, Clock } from 'lucide-react'

export default function PostPage() {
  const { slug } = useParams()
  const all = useMemo(() => postsData, [])
  const metas = useMemo(() => all.map(p => p.meta), [all])
  const postRec = all.find(p => p.meta.slug === slug)

  // Local tag filter for the timeline in the sidebar
  const [activeTag, setActiveTag] = useState<string | null>(null)

  // Popular tags (global frequency)
  const popularTags = useMemo(() => {
    const counts: Record<string, number> = {}
    for (const p of metas) for (const t of p.tags) counts[t] = (counts[t] ?? 0) + 1
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 12)
      .map(([tag, count]) => ({ tag, count }))
  }, [metas])

  // Timeline uses filtered set by activeTag (newest->oldest within each year)
  const filteredForTimeline = useMemo(() => {
    if (!activeTag) return metas
    const n = (s: string) => s.toLowerCase()
    return metas.filter(p => p.tags.some(t => n(t) === n(activeTag)))
  }, [metas, activeTag])

  const timelineByYear = useMemo(() => {
    const map = new Map<string, typeof metas>()
    for (const p of filteredForTimeline) {
      const year = new Date(p.date).getFullYear().toString()
      if (!map.has(year)) map.set(year, [] as any)
      map.get(year)!.push(p)
    }
    for (const [, arr] of map) arr.sort((a, b) => (a.date < b.date ? 1 : -1))
    return Array.from(map.entries()).sort((a, b) => (a[0] < b[0] ? 1 : -1))
  }, [filteredForTimeline])

  if (!postRec) {
    return (
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-14">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-6 dark:text-gray-100">Post not found</h2>
        <Card>
          <p className="mb-4">We couldn't find that post.</p>
          <Link to="/posts" className="underline">Go back to all posts</Link>
        </Card>
      </div>
    )
  }

  const { meta, Component } = postRec

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-14">
      <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-6 dark:text-gray-100">
        {meta.title}
      </h2>

      <div
        className="
          grid gap-8 lg:gap-12
          md:grid-cols-[minmax(0,1fr)_minmax(260px,340px)]
          lg:grid-cols-[minmax(0,1.8fr)_minmax(280px,380px)]
        "
      >
        {/* MAIN COLUMN */}
        <div>
          <Card>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <span className="text-sm text-gray-600 inline-flex items-center gap-2 dark:text-gray-400">
                <Calendar size={16} /> {new Date(meta.date).toLocaleDateString()}
              </span>
              <div className="flex flex-wrap gap-2">
                {meta.tags.map(t => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setActiveTag(t)}
                    className="px-2 py-1 rounded-full text-xs border
                               bg-white text-gray-700 border-gray-300 hover:bg-gray-50
                               dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 hover:dark:bg-gray-800"
                    title={`Filter timeline by ${t}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* MDX content */}
            <article className="prose max-w-none prose-headings:scroll-mt-24 dark:prose-invert">
              <Component />
            </article>
          </Card>

          {/* Related posts */}
          {(() => {
            const score = (p: typeof all[number]) =>
              p.meta.slug === meta.slug ? -1 :
              p.meta.tags.filter(t => meta.tags.includes(t)).length
            const related = all
              .map(p => ({ p, s: score(p) }))
              .filter(x => x.s > 0)
              .sort((a, b) => b.s - a.s)
              .slice(0, 3)
              .map(x => x.p.meta)

            return related.length > 0 ? (
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-3">Related posts</h3>
                <div className="grid gap-4">
                  {related.map(r => (
                    <Card key={r.slug}>
                      <Link to={`/posts/${r.slug}`} className="text-base font-semibold hover:underline">{r.title}</Link>
                      {r.summary && <p className="text-gray-700 dark:text-gray-300 mt-1">{r.summary}</p>}
                      <div className="mt-2">{r.tags.map(t => <Tag key={t}>{t}</Tag>)}</div>
                    </Card>
                  ))}
                  <div className="text-sm">
                    <Link to="/posts" className="underline">See all posts →</Link>
                  </div>
                </div>
              </div>
            ) : null
          })()}
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
                      {list.map(p => {
                        const isCurrent = p.slug === meta.slug
                        return (
                          <li key={p.slug} className="mb-3 ms-4">
                            <div className={`absolute w-2 h-2 rounded-full mt-2 -start-1 ${isCurrent ? 'bg-indigo-500' : 'bg-gray-400 dark:bg-gray-600'}`}></div>
                            <div className="flex items-center justify-between gap-2">
                              <Link to={`/posts/${p.slug}`} className={`text-sm hover:underline ${isCurrent ? 'font-semibold' : ''}`}>
                                {p.title}
                              </Link>
                              <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                                {new Date(p.date).toLocaleDateString()}
                              </span>
                            </div>
                          </li>
                        )
                      })}
                    </ol>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </aside>
      </div>
    </div>
  )
}
