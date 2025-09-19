import { useEffect, useState } from 'react'

type Heading = { id: string; text: string; level: number }

export default function Toc({
  rootSelector = 'article.prose',
  watch, // re-run when this changes (e.g., slug)
}: {
  rootSelector?: string
  watch?: unknown
}) {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [active, setActive] = useState<string>('')

  useEffect(() => {
    const root = document.querySelector(rootSelector)
    if (!root) return
    const nodes = Array.from(
      root.querySelectorAll('h2, h3, h4')
    ) as HTMLHeadingElement[]

    const items = nodes
      .filter(h => !!h.id)
      .map(h => ({
        id: h.id,
        text: h.textContent ?? '',
        level: Number(h.tagName[1]), // 2,3,4
      }))

    setHeadings(items)

    // Scroll-spy: highlight section as it enters viewport
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) setActive((e.target as HTMLElement).id)
        })
      },
      { rootMargin: '0% 0% -70% 0%', threshold: [0, 1] }
    )
    nodes.forEach(h => obs.observe(h))
    return () => obs.disconnect()
  }, [rootSelector, watch])

  if (headings.length < 3) return null

  const indent = (lvl: number) =>
    lvl === 2 ? '' : lvl === 3 ? 'pl-4' : 'pl-8'

  return (
    <nav
      aria-label="Table of contents"
      className="rounded-xl border border-gray-200 dark:border-gray-800 p-4
                 bg-white/60 dark:bg-gray-900/60"
    >
      <div className="text-sm font-medium mb-2">On this page</div>
      <ul className="space-y-1 text-sm">
        {headings.map(h => (
          <li key={h.id} className={indent(h.level)}>
            <a
              href={`#${h.id}`}
              className={`hover:underline ${
                active === h.id ? 'font-semibold' : ''
              }`}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
