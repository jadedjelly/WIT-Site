import type { ReactNode } from 'react'


export function Section({
  id,
  title,
  children,
  size = 'default',
}: {
  id?: string
  title: string
  children: ReactNode
  size?: 'default' | 'wide'    // ← new
}) {
  const maxW = size === 'wide' ? 'max-w-7xl' : 'max-w-5xl'  // ← new
  return (
    <section id={id} className={`${maxW} mx-auto px-4 md:px-6 py-14`}>
      <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-6 dark:text-gray-100">{title}</h2>
      <div className="grid gap-6">{children}</div>
    </section>
  )
}

export function Card({ children }: { children: ReactNode }) {
  return <div className="rounded-2xl border border-gray-200/70 shadow-sm p-5 md:p-6 bg-white dark:bg-gray-900 dark:border-gray-800">{children}</div>;
}

export function Tag({ children }: { children: ReactNode }) {
  return <span className="px-2 py-1 rounded-full text-xs border mr-2 mb-2 inline-block dark:border-gray-700">{children}</span>;
}