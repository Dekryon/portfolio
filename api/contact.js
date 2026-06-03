// Vercel Serverless Function — receives contact-form submissions and emails
// them via Resend (https://resend.com). Framework-agnostic: Vercel exposes any
// file under /api as a function automatically, including for Vite projects.
//
// Required env var (Vercel → Project → Settings → Environment Variables):
//   RESEND_API_KEY   your Resend API key (re_...)
//
// With no custom domain, Resend lets you send to your own account email from
// onboarding@resend.dev — which is exactly this case (TO_EMAIL is the owner).

const TO_EMAIL = 'ukugregory@gmail.com'
const FROM_EMAIL = 'Portfolio <onboarding@resend.dev>'

const escapeHtml = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    // Signals the frontend to use its mail-client fallback.
    return res.status(503).json({ error: 'Email backend not configured' })
  }

  // Body may arrive pre-parsed (Vercel) or as a raw JSON string.
  let body = req.body
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body)
    } catch {
      body = {}
    }
  }

  const name = String(body?.name || '').trim()
  const email = String(body?.email || '').trim()
  const message = String(body?.message || '').trim()

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' })
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email address' })
  }
  if (message.length > 5000) {
    return res.status(400).json({ error: 'Message too long' })
  }

  try {
    const resp = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [TO_EMAIL],
        reply_to: email,
        subject: `🔴 Portfolio inquiry — ${name}`,
        text: `${message}\n\n— ${name} · ${email}`,
        html: `<div style="font-family:system-ui,-apple-system,sans-serif;line-height:1.6;color:#111">
          <h2 style="margin:0 0 8px">New portfolio inquiry</h2>
          <p style="margin:0 0 4px"><strong>From:</strong> ${escapeHtml(name)}</p>
          <p style="margin:0 0 12px"><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
          <p style="white-space:pre-wrap;margin:0">${escapeHtml(message)}</p>
        </div>`
      })
    })

    if (!resp.ok) {
      const detail = await resp.text()
      return res.status(502).json({ error: 'Email provider error', detail })
    }

    return res.status(200).json({ ok: true })
  } catch {
    return res.status(500).json({ error: 'Failed to send' })
  }
}
