
import { useMemo, useState } from 'react'
import { site } from '../content'
import { Section, Card, Tag } from '../components/UI'
import { ExternalLink } from 'lucide-react'

type Course = {
  title: string
  org?: string
  year?: number | string
  status?: 'completed' | 'in-progress' | 'planned'
  certificateUrl?: string
  credentialUrl?: string // alias
  url?: string
  tags?: string[]
  note?: string
}

type Book = {
  title: string
  author?: string
  year?: number | string
  url?: string
  tags?: string[]
  note?: string
}

export default function Education() {
  const courses: Course[] = (site as any)?.education?.courses ?? []
  const books: Book[] = (site as any)?.education?.books ?? []

  // Build tag list from courses + books (union, alpha sorted)
  const allTags = useMemo(() => {
    const s = new Set<string>()
    for (const c of courses) for (const t of (c.tags ?? [])) s.add(t)
    for (const b of books) for (const t of (b.tags ?? [])) s.add(t)
    return Array.from(s).sort((a, b) => a.localeCompare(b))
  }, [courses, books])

  const [activeTag, setActiveTag] = useState<string | null>(null)

  const norm = (x: string) => x.toLowerCase()

  // Filtered courses for main list
  const filteredCourses = useMemo(() => {
    if (!activeTag) return courses
    return courses.filter(c => (c.tags ?? []).some(t => norm(t) === norm(activeTag)))
  }, [courses, activeTag])

  // Filtered books for sidebar
  const filteredBooks = useMemo(() => {
    if (!activeTag) return []
    return books.filter(b => (b.tags ?? []).some(t => norm(t) === norm(activeTag)))
  }, [books, activeTag])

  // Group courses by year (desc)
  const coursesByYear = useMemo(() => {
    const map = new Map<string, Course[]>()
    for (const c of filteredCourses) {
      const y = (c.year ?? 'Other') + ''
      if (!map.has(y)) map.set(y, [])
      map.get(y)!.push(c)
    }
    for (const [, arr] of map) arr.sort((a, b) => (a.title > b.title ? 1 : -1))
    return Array.from(map.entries()).sort((a, b) => (a[0] < b[0] ? 1 : -1))
  }, [filteredCourses])

  return (
    <Section title="Courses & Certifications" size="wide">
      <div className="grid gap-8 lg:gap-12 md:grid-cols-[minmax(0,1fr)_minmax(280px,360px)]">
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

          {coursesByYear.length === 0 ? (
            <Card><p className="text-sm text-gray-600 dark:text-gray-300">Add courses in <code>src/content.ts</code> → <code>site.education.courses</code>.</p></Card>
          ) : (
            <div className="space-y-8">
              {coursesByYear.map(([year, list]) => (
                <div key={year}>
                  <div className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-2">
                    {year}
                  </div>
                  <div className="grid gap-4">
                    {list.map((c) => (
                      <Card key={c.title + (c.org ?? '')}>
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div>
                            <div className="text-base font-semibold">{c.title}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              {c.org}
                              {c.status ? ` · ${c.status.replace('-', ' ')}` : ''}
                            </div>
                            {c.note && <p className="text-sm mt-1 text-gray-700 dark:text-gray-300">{c.note}</p>}
                            {c.tags && c.tags.length > 0 && (
                              <div className="mt-2 flex flex-wrap gap-2">
                                {c.tags.map(t => <Tag key={t}>{t}</Tag>)}
                              </div>
                            )}
                          </div>

                          {/* Links */}
                          <div className="flex items-center gap-3">
                            {c.url && (
                              <a
                                href={c.url}
                                target="_blank" rel="noreferrer"
                                className="text-sm underline underline-offset-4 inline-flex items-center gap-1"
                                title="Course page"
                              >
                                Course <ExternalLink size={14} />
                              </a>
                            )}
                            {(c.certificateUrl || c.credentialUrl) && (
                              <a
                                href={c.certificateUrl ?? c.credentialUrl}
                                target="_blank" rel="noreferrer"
                                className="text-sm underline underline-offset-4 inline-flex items-center gap-1"
                                title="View credential"
                              >
                                Credential <ExternalLink size={14} />
                              </a>
                            )}
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* SIDEBAR */}
        <aside className="md:sticky md:top-24 lg:pl-10 space-y-6">
          {/* Books for <tag> */}
          <Card>
            {activeTag ? (
              <>
                <h4 className="font-medium mb-2">Books for “{activeTag}”</h4>
                {filteredBooks.length === 0 ? (
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    No books yet. Add some under <code>site.education.books</code> with the <code>{activeTag}</code> tag.
                  </p>
                ) : (
                  <ul className="text-sm space-y-2">
                    {filteredBooks.map((b) => (
                      <li key={b.title + (b.author ?? '')}>
                        <div className="font-medium">{b.title}</div>
                        <div className="text-gray-600 dark:text-gray-400">
                          {[b.author, b.year].filter(Boolean).join(' · ')}
                        </div>
                        {b.url && (
                          <a
                            href={b.url}
                            target="_blank" rel="noreferrer"
                            className="inline-flex items-center gap-1 underline underline-offset-4 mt-1"
                          >
                            Link <ExternalLink size={14} />
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </>
            ) : (
              <>
                <h4 className="font-medium mb-2">Books</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Pick a tag above to see recommended books.
                </p>
              </>
            )}
          </Card>
        </aside>
      </div>
    </Section>
  )
}
