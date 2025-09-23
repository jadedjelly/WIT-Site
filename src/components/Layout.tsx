import { useEffect, useState, type ReactNode } from 'react'
import { Github, Mail, Linkedin, ChevronDown } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { site } from '../content'
import ThemeToggle from './ThemeToggle'

export default function Layout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1))
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
    }
  }, [location.pathname, location.hash])

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-900
                    dark:from-gray-950 dark:to-gray-900 dark:text-gray-100">
      <header className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b
                         dark:bg-gray-900/70 dark:border-gray-800">
        <div className="max-w-5xl mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">
          <Link to="/" className="font-semibold inline-flex items-center gap-3">
            {site.logoUrl && (
              <img
                src={site.logoUrl}
                alt="Site logo"
                className="h-10 w-10 md:h-12 md:w-12 shrink-0 object-contain rounded-md"
                width={48}
                height={48}
                loading="eager"
                decoding="async"
              />
            )}
            <span>{site.title}</span>
          </Link>
          <nav className="hidden md:flex items-center gap-4 text-sm">
            <Link to="/" className="hover:underline">Home</Link>
            <a href="/#about" className="hover:underline">About</a>
            <Link to="/education" className="hover:underline">Education</Link>
            <Link to="/posts" className="hover:underline">Posts</Link>
            <a href="/#projects" className="hover:underline">Projects</a>
            <Link to="/contact" className="hover:underline">Contact</Link>
            <ThemeToggle />
          </nav>
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button className="" onClick={() => setOpen(!open)} aria-label="Toggle menu">
              <ChevronDown className={"transition " + (open ? 'rotate-180' : 'rotate-0')} />
            </button>
          </div>
        </div>
        {open && (
          <div className="md:hidden border-t dark:border-gray-800">
            <div className="max-w-5xl mx-auto px-4 py-3 flex flex-col gap-2 text-sm">
              <Link to="/" className="py-1" onClick={() => setOpen(false)}>Home</Link>
              <Link to="/posts" className="py-1" onClick={() => setOpen(false)}>Posts</Link>
              <a href="/#about" className="py-1" onClick={() => setOpen(false)}>About</a>
              <a href="/#projects" className="py-1" onClick={() => setOpen(false)}>Projects</a>
              <a href="/#contact" className="py-1" onClick={() => setOpen(false)}>Contact</a>
            </div>
          </div>
        )}
      </header>

      <main>{children}</main>

      <footer id="contact" className="border-t mt-10 dark:border-gray-800">
        <div className="max-w-5xl mx-auto px-4 md:px-6 py-8 text-sm text-gray-600 dark:text-gray-300">
          <div className="flex flex-wrap items-center gap-4 text-sm mb-2">
            <a className="inline-flex items-center gap-2 hover:underline" href={`mailto:${site.email}`}><Mail size={16} /> {site.email}</a>
            {site.social.github && (
              <a className="inline-flex items-center gap-2 hover:underline" href={site.social.github} target="_blank" rel="noreferrer">
                <Github size={16} /> GitHub
              </a>
            )}
            {site.social.linkedin && (
              <a className="inline-flex items-center gap-2 hover:underline" href={site.social.linkedin} target="_blank" rel="noreferrer">
                <Linkedin size={16} /> LinkedIn
              </a>
            )}
          </div>
          © {new Date().getFullYear()} {site.title}. Built with React + Tailwind.
        </div>
      </footer>
    </div>
  )
}