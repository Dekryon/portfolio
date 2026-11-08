import { useState } from 'react'

const EMAIL = 'ukugregory@gmail.com'

function Field({ label, as: Tag = 'input', ...props }) {
  return (
    <label className="block">
      <span className="label">{label}</span>
      <Tag
        {...props}
        className="mt-2 block w-full rounded border border-line bg-paper px-4 py-3 text-ink placeholder:text-ink-3 focus:border-accent"
      />
    </label>
  )
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [state, setState] = useState('idle') // idle | sending | sent | error

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const mailto = `mailto:${EMAIL}?subject=${encodeURIComponent(
    `Portfolio inquiry from ${form.name || 'a visitor'}`
  )}&body=${encodeURIComponent(`${form.message}\n\n${form.name} · ${form.email}`)}`

  const onSubmit = async (e) => {
    e.preventDefault()
    setState('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      if (!res.ok) throw new Error('failed')
      setState('sent')
      setForm({ name: '', email: '', message: '' })
    } catch {
      setState('error')
    }
  }

  return (
    <section id="contact" aria-labelledby="contact-title" className="section border-t border-line">
      <div className="grid gap-12 md:grid-cols-12 md:gap-14">
        <div className="md:col-span-5">
          <h2 id="contact-title" className="h2">
            Get in touch
          </h2>
          <p className="mt-6 max-w-sm text-ink-2">
            For internships, freelance work or a partnership, write to me directly or use the form.
          </p>
          <ul className="mt-8 space-y-1 text-[15px]">
            <li>
              <a className="link inline-block py-1.5" href={`mailto:${EMAIL}`}>
                {EMAIL}
              </a>
            </li>
            <li>
              <a className="link inline-block py-1.5" href="https://github.com/Dekryon" target="_blank" rel="noreferrer">
                GitHub
              </a>
            </li>
            <li>
              <a
                className="link inline-block py-1.5"
                href="https://www.linkedin.com/in/gregory-uku-8b632724b"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a className="link inline-block py-1.5" href="/resume.pdf" download>
                Résumé (PDF)
              </a>
            </li>
          </ul>
        </div>

        <form onSubmit={onSubmit} className="space-y-5 md:col-span-7">
          <Field label="Name" name="name" value={form.name} onChange={onChange} required autoComplete="name" />
          <Field label="Email" name="email" type="email" value={form.email} onChange={onChange} required autoComplete="email" />
          <Field label="Message" name="message" as="textarea" rows={5} value={form.message} onChange={onChange} required />
          <div className="flex flex-wrap items-center gap-5">
            <button type="submit" disabled={state === 'sending'} className="btn-solid disabled:opacity-60">
              {state === 'sending' ? 'Sending' : 'Send message'}
            </button>
            <p role="status" aria-live="polite" className="text-[15px] text-ink-2">
              {state === 'sent' && 'Sent. I will reply by email.'}
              {state === 'error' && (
                <>
                  The form could not send.{' '}
                  <a className="link" href={mailto}>
                    Open it as an email
                  </a>{' '}
                  instead.
                </>
              )}
            </p>
          </div>
        </form>
      </div>
    </section>
  )
}
