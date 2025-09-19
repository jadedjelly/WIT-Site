
import { Github, ExternalLink } from 'lucide-react'

type Props = {
  href: string
  label?: string
  variant?: 'solid' | 'outline'
  className?: string
}

export default function RepoLink({
  href,
  label = 'View repository',
  variant = 'outline',
  className = '',
}: Props) {
  const base =
    'not-prose inline-flex items-center gap-2 text-sm rounded-lg border px-3 py-2 transition'
  const solid =
    'bg-gray-900 text-white border-gray-900 hover:opacity-90 dark:bg-gray-100 dark:text-gray-900 dark:border-gray-100'
  const outline =
    'bg-white text-gray-800 border-gray-300 hover:bg-gray-50 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700 hover:dark:bg-gray-800'

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`${base} ${variant === 'solid' ? solid : outline} ${className}`}
    >
      <Github size={16} />
      <span>{label}</span>
      <ExternalLink size={14} className="opacity-70" />
    </a>
  )
}
