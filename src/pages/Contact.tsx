
import { useState } from 'react'
import { site } from '../content'
import { Section, Card } from '../components/UI'
import { Mail, MapPin, Github, Linkedin, Loader2, CheckCircle } from 'lucide-react'

export default function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [sent, setSent] = useState(false)

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)

    // Build a mailto: URL as a zero-backend default.
    const subject = encodeURIComponent(`Portfolio contact from ${name || 'Anonymous'}`)
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`
    )
    const mailto = `mailto:${site.email}?subject=${subject}&body=${body}`

    // Trigger email client
    window.location.href = mailto
    setTimeout(() => {
      setSubmitting(false)
      setSent(true)
      setName('')
      setEmail('');
      setMessage('')
    }, 500)

    // NOTE: For Netlify Forms (static capture), remove the preventDefault above,
    // add form attributes data-netlify="true" name="contact" method="POST",
    // and include a hidden <input name="form-name" value="contact" />.
  }

  return (
    <Section title="Contact">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Left: contact info */}
        <Card>
          <h3 className="text-lg font-semibold mb-3">Get in touch</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            I’m open to DevOps, platform engineering, and CI/CD work. Email me or use the form.
          </p>

          <div className="space-y-3 text-sm">
            <a className="inline-flex items-center gap-2 hover:underline" href={`mailto:${site.email}`}>
              <Mail size={16} /> {site.email}
            </a>
            <div className="inline-flex items-center gap-2">
              <MapPin size={16} /> {site.location}
            </div>
            <div className="flex items-center gap-4">
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
          </div>
        </Card>

        {/* Right: form */}
        <Card>
          <h3 className="text-lg font-semibold mb-3">Send a message</h3>
          <form
            onSubmit={onSubmit}
            className="grid gap-3"
            // data-netlify="true" name="contact" method="POST"
          >
            {/* <input type="hidden" name="form-name" value="contact" /> */}
            <div>
              <label htmlFor="name" className="block text-sm mb-1">Name</label>
              <input
                id="name"
                name="name"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full rounded-lg border px-3 py-2 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700"
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm mb-1">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full rounded-lg border px-3 py-2 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm mb-1">Message</label>
              <textarea
                id="message"
                name="message"
                value={message}
                onChange={e => setMessage(e.target.value)}
                rows={6}
                required
                className="w-full rounded-lg border px-3 py-2 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700"
                placeholder="What can I help with?"
              />
            </div>

            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm
                           border-gray-200 bg-white hover:shadow-sm
                           dark:border-gray-700 dark:bg-gray-900"
              >
                {submitting ? <Loader2 size={16} className="animate-spin" /> : null}
                {submitting ? 'Sending…' : 'Send'}
              </button>

              {sent && (
                <span className="inline-flex items-center gap-1 text-sm text-green-600 dark:text-green-400">
                  <CheckCircle size={16} /> Sent! Check your email client.
                </span>
              )}
            </div>
          </form>
        </Card>
      </div>
    </Section>
  )
}
