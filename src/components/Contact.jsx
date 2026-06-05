import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Mail, Github, Linkedin, Check, Send } from 'lucide-react'

const EMAIL = 'ukugregory@gmail.com'

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState(null)
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  // Fallback: hand off to the visitor's mail client so the message still
  // reaches the inbox if the serverless email backend is down/unconfigured.
  const mailtoHandoff = () => {
    const subject = encodeURIComponent(`Portfolio inquiry — ${form.name || 'someone'}`)
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} · ${form.email}`)
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setSending(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      if (!res.ok) throw new Error('Request failed')
      setSent(true)
    } catch {
      // Server send failed — fall back to the mail client rather than losing it.
      mailtoHandoff()
      setSent(true)
    } finally {
      setSending(false)
    }
  }

  // After "Sent · talk soon" stays visible for 3s, reset so a user typing
  // a second message doesn't hit a disabled form with no explanation.
  useEffect(() => {
    if (!sent) return
    const id = setTimeout(() => {
      setSent(false)
      setForm({ name: '', email: '', message: '' })
    }, 3000)
    return () => clearTimeout(id)
  }, [sent])

  return (
    <section id="contact" aria-labelledby="contact-heading" className="relative container-x py-24 sm:py-32">
      <div className="flex items-center gap-4 mb-12">
        <span className="marker">09 / Contact</span>
        <div className="flex-1 h-px bg-line" />
      </div>

      <motion.h2
        id="contact-heading"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="h-display text-[16vw] sm:text-[10vw] lg:text-[10rem] leading-[0.9] text-bone mb-12"
      >
        Let's <span className="italic blend-glow">build</span><br />
        something real.
      </motion.h2>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
        {/* Form */}
        <motion.form
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 space-y-6"
        >
          <Field
            label="Name"
            name="name"
            value={form.name}
            onChange={onChange}
            required
            placeholder="What should I call you?"
          />
          <Field
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={onChange}
            required
            placeholder="you@somewhere.com"
          />
          <Field
            label="Message"
            name="message"
            as="textarea"
            rows={5}
            value={form.message}
            onChange={onChange}
            required
            placeholder="Internship, freelance, collaboration, or just a hello…"
          />

          <button
            type="submit"
            disabled={sent || sending}
            aria-disabled={sent || sending}
            className={`btn-ember group ${sent || sending ? 'opacity-70 cursor-default' : ''}`}
          >
            {sent ? (
              <>
                <Check size={14} /> Sent · talk soon
              </>
            ) : sending ? (
              <>Sending…</>
            ) : (
              <>
                Send message
                <ArrowUpRight size={14} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
              </>
            )}
          </button>

          {/* Status + error live region — screen readers announce sent/error. */}
          <div role="status" aria-live="polite" aria-atomic="true" className="min-h-[1.25rem]">
            {sent && (
              <p className="sr-only">Message sent. I'll reply soon.</p>
            )}
            {error && (
              <p className="font-mono text-[11px] text-ember">{error}</p>
            )}
          </div>

          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-bone-dim">
            // goes straight to my inbox · I read everything
          </p>
        </motion.form>

        {/* Side direct links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 space-y-2"
        >
          <DirectLink
            href="mailto:ukugregory@gmail.com"
            label="Email"
            value="ukugregory@gmail.com"
            icon={Mail}
          />
          <DirectLink
            href="https://github.com/Dekryon"
            label="GitHub"
            value="github.com/Dekryon"
            icon={Github}
            external
          />
          <DirectLink
            href="https://www.linkedin.com/in/gregory-uku-8b632724b"
            label="LinkedIn"
            value="linkedin.com/in/gregory-uku"
            icon={Linkedin}
            external
          />
          <DirectLink
            href="/resume.pdf"
            label="Resume"
            value="resume.pdf · download"
            download
          />

          <div className="mt-10 p-6 border border-line">
            <div className="marker mb-3">Response time</div>
            <div className="font-serif text-2xl text-bone leading-tight mb-2">
              Within 24 hours.
            </div>
            <div className="text-sm text-bone-muted">
              Ontario time. Faster on weekdays. I read everything.
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function Field({ label, as = 'input', name, required, ...props }) {
  const id = `field-${name}`
  return (
    <div className="border-b border-line-strong focus-within:border-ember transition-colors">
      <label htmlFor={id} className="block marker mb-3 pt-1">
        {label}
        {required && <span className="text-ember ml-1" aria-hidden="true">*</span>}
      </label>
      {as === 'textarea' ? (
        <textarea
          id={id}
          name={name}
          required={required}
          aria-required={required || undefined}
          className="w-full bg-transparent border-0 outline-none text-bone text-lg placeholder:text-bone-dim resize-none pb-3"
          {...props}
        />
      ) : (
        <input
          id={id}
          name={name}
          required={required}
          aria-required={required || undefined}
          className="w-full bg-transparent border-0 outline-none text-bone text-lg placeholder:text-bone-dim pb-3"
          {...props}
        />
      )}
    </div>
  )
}

function DirectLink({ href, label, value, icon: Icon = Mail, external, download }) {
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
      download={download || undefined}
      className="group flex items-center gap-5 py-5 border-b border-line hover:border-ember transition-colors"
    >
      <div className="w-9 h-9 border border-line-strong flex items-center justify-center group-hover:border-ember group-hover:text-ember transition-colors">
        <Icon size={14} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="marker mb-1">{label}</div>
        <div className="text-bone group-hover:text-ember transition-colors truncate">
          {value}
        </div>
      </div>
      <ArrowUpRight
        size={16}
        className="text-bone-muted group-hover:text-ember group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all shrink-0"
      />
    </a>
  )
}
