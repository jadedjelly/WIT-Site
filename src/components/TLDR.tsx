
import type { ReactNode } from 'react'
import { Zap } from 'lucide-react'

export default function TLDR({
  title = "TL;DR",
  children,
}: {
  title?: string
  children: ReactNode
}) {
  return (
    // not-prose prevents Typography plugin from overriding our card styles
    <aside className="not-prose my-6 rounded-xl border p-4
                      border-amber-300/60 bg-amber-50/60
                      dark:border-amber-400/30 dark:bg-amber-900/15">
      <div className="mb-2 flex items-center gap-2">
        <Zap size={16} className="opacity-80" />
        <span className="text-sm font-semibold tracking-wide">{title}</span>
      </div>
      <div className="text-sm leading-relaxed text-gray-800 dark:text-gray-200">
        {children}
      </div>
    </aside>
  )
}
