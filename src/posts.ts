import type { ComponentType } from 'react'

export type PostMeta = {
  slug: string
  title: string
  date: string
  summary?: string
  tags: string[]
}

export type PostRecord = {
  meta: PostMeta
  Component: ComponentType<any>
}

// Strongly typed glob (requires the vite/client types from step 1)
const modules = import.meta.glob<{
  default: ComponentType<any>
  frontmatter?: Partial<PostMeta>
}>('./posts/*.mdx', { eager: true })

const toSlug = (path: string) => path.split('/').pop()!.replace(/\.mdx$/, '')

const posts: PostRecord[] = Object.entries(modules).map(([path, mod]) => {
  const fm = mod.frontmatter ?? {}
  const slug = fm.slug ?? toSlug(path)
  return {
    meta: {
      slug,
      title: fm.title ?? slug,
      date: fm.date ?? '1970-01-01',
      summary: fm.summary ?? '',
      tags: fm.tags ?? [],
    },
    Component: mod.default,
  }
})

posts.sort((a, b) => (a.meta.date < b.meta.date ? 1 : -1))
export default posts
