/* Four projects, each with a real screenshot of the live site.
 * Screenshots come from `npm run screenshots` (scripts/capture-screenshots.mjs). */

export const PROJECTS = [
  {
    id: 'ordo',
    title: 'Ordo',
    tagline: 'An AI receptionist that answers a small business\'s phone.',
    year: '2026',
    role: 'Founder · design and engineering',
    status: 'Live',
    summary:
      'Ordo picks up in the business\'s own voice, takes orders and bookings, answers common questions, and texts the team a summary after each call. It is built for salons, vets, restaurants and home-service shops that miss calls when everyone is busy. Operators read a transcript of every call in a portal and can step in. It costs $99 CAD per line per month, with a 14-day money-back guarantee.',
    stack: ['Next.js', 'Node.js', 'WebSockets', 'Stripe', 'Tailwind'],
    image: '/projects/ordo.jpg',
    alt: 'The Ordo home page: the headline "Every call, answered." over a glowing orb.',
    href: 'https://useordo.org',
    host: 'useordo.org'
  },
  {
    id: 'gradus',
    title: 'Gradus',
    tagline: 'A grade tracker for Canadian students.',
    year: '2026',
    role: 'Solo · design and engineering',
    status: 'Live · mobile app in development',
    summary:
      'Gradus reads the weights off a course syllabus, keeps every mark you enter, and tells you what you need on what is left. It projects final marks on Canadian scales, including the conversion tables behind OMSAS, OLSAS and ORPAS. Grades stay on the device by default, and cloud backup is an optional paid tier.',
    stack: ['Next.js', 'TypeScript', 'Postgres', 'Drizzle', 'Auth.js', 'Stripe', 'Expo'],
    image: '/projects/gradus.jpg',
    alt: 'The Gradus home page: "Know exactly where your grade stands" beside a card showing a 78% course grade.',
    href: 'https://gradus.ca',
    host: 'gradus.ca'
  },
  {
    id: 'trentpulse',
    title: 'TrentPulse',
    tagline: 'A live map of how busy Trent\'s dining halls and study spots are.',
    year: '2026',
    role: 'HackTrent 2026 · team project',
    status: 'Live',
    summary:
      'Symons Campus is coloured green to red by how busy each building is right now. Students rate a space from 1 to 5 and everyone\'s map updates within 15 seconds. When nobody has checked in, it falls back on the usual pattern for that weekday and time, so the map is never empty. Scoring every space takes about 17 ms on the server.',
    stack: ['React', 'TypeScript', 'MapLibre', 'Fastify', 'Tiger Data', 'Gemini'],
    image: '/projects/trentpulse.jpg',
    alt: 'The TrentPulse map: satellite view of Trent\'s campus with buildings coloured green to red and a time slider along the bottom.',
    href: 'https://trentpulse.vercel.app',
    host: 'trentpulse.vercel.app'
  },
  {
    id: 'quality-auto',
    title: 'Quality Auto Signatures',
    tagline: 'A used-car dealership site for a Lagos business.',
    year: '2025',
    role: 'Solo · design and build',
    status: 'Live',
    summary:
      'Buyers browse inventory with filters, read condition reports, save cars, and reach the dealer on WhatsApp. Staff add and edit listings from an admin area. The pages are built to show the cars plainly, because for a purchase this size the photos and the honesty of the listing do the selling.',
    stack: ['Next.js', 'TypeScript', 'Tailwind', 'Supabase', 'Vercel'],
    image: '/projects/quality-auto.jpg',
    alt: 'The Quality Auto Signatures home page: "Physically inspected. Honestly priced." over a black sedan.',
    href: 'https://www.qualityautosignatures.com',
    host: 'qualityautosignatures.com'
  }
]
