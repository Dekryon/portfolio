/* Phase drives the visual treatment:
 *  - 'live'         → browser frame + real screenshot + "View live"
 *  - 'building'     → browser frame + real screenshot + "View live"
 *  - 'coming-soon'  → blueprint spec card, no fake browser URL, no live link
 *
 * github is null for repos that are private — clicking through would 404
 * for any visitor without access. Only the portfolio repo is public.
 */

export const PROJECTS = [
  {
    id: 'ordo',
    title: 'Ordo',
    subtitle: 'AI Phone Receptionist',
    category: 'AI · Product',
    featured: true,
    year: '2026',
    role: 'Founder · Design + Engineering',
    phase: 'building',
    pitch:
      'The AI receptionist that answers every phone call · books, orders, messages, FAQs · in your brand voice, 24/7. Same brain, three doors.',
    problem:
      'Restaurants, hotels, and medical clinics lose customers every hour the front desk is mid-shift or off-shift. Hiring a real receptionist starts at $40k a year. Voicemail loses the caller in seconds.',
    solution:
      'An AI receptionist that picks up on the first ring, books or takes the order in your voice, then texts the team a clean summary. 94% of orders handled end-to-end · operator override on the rest. One brain, three vertical doors (restaurants, hotels, medical) · live in 24 hours. $149 per line per month, 30 days free.',
    features: [
      'Three verticals · restaurants, hotels, medical',
      'Books reservations, takes orders, handles FAQs',
      'Texts the team a summary after every call',
      '94% orders handled end-to-end',
      'Operator portal at app.useordo.org'
    ],
    tech: ['Next.js', 'Node.js', 'Voice AI', 'WebSockets', 'Tailwind'],
    learned:
      'Trust beats autonomy. Operators only let the AI talk to their best customer once they can see every word it said.',
    status: 'Live pilot · Canada · 30 days free, no card',
    github: null,
    demo: 'https://useordo.org',
    accent: '#ff5b22',
    image: '/projects/ordo.jpg',
    mockType: 'marketing',
    label: 'useordo.org'
  },
  {
    id: 'signal',
    title: 'Signal',
    subtitle: 'AI Trading Intelligence',
    category: 'AI · Finance',
    featured: true,
    year: '2026',
    role: 'Solo · Design + Engineering',
    phase: 'building',
    pitch:
      'Five specialized AI agents brief Claude Opus, which writes one BUY / SELL / HOLD / AVOID call per ticker in ~30 seconds. Paper-traded until the win rate is proven.',
    problem:
      'Solo traders chase signals from a dozen sources and can\'t tell which to trust. Most trading tools sell certainty they can\'t back up.',
    solution:
      'Five agents (Insider 35%, Options 30%, News 20%, Pre-Market 10%, Macro 5%) brief Claude Opus, which writes one decision per ticker with stop loss, take profit, and position size. Every call auto-runs as a paper trade · live money only after the win rate clears the bar.',
    features: [
      'Five-lane intelligence · Insider, Options, News, Pre-Market, Macro',
      'Claude Opus synthesizes one BUY/SELL/HOLD/AVOID per ticker',
      'Outputs stop loss, take profit, position size',
      'Auto paper-trade until win rate is proven',
      'Signal feed shows every reasoning step'
    ],
    tech: ['Next.js', 'TypeScript', 'Supabase', 'Anthropic API', 'Finnhub', 'Polymarket'],
    learned:
      'Distrust by default. A trading product that says "beat the market" but can\'t show its track record is selling noise. Build proof first, then earn the click.',
    status: 'In the works · Paper-trade validation phase',
    github: null,
    demo: 'https://signal-tracker-roan.vercel.app',
    accent: '#10b981',
    image: '/projects/signal.jpg',
    mockType: 'dashboard',
    label: 'signal-tracker-roan.vercel.app'
  },
  {
    id: 'ai-saas-factory',
    title: 'AI SaaS Factory',
    subtitle: 'Autonomous Agent Mesh',
    category: 'AI · Platform',
    featured: true,
    year: '2026',
    role: 'Solo · Design + Engineering',
    phase: 'building',
    pitch:
      'A mesh of specialist agents that turn a one-line product brief into a deployable SaaS in the time it usually takes to write the README.',
    problem:
      'Going from idea to shipped SaaS still eats weeks of setup · brief, copy, schema, routes, marketing, security. Most of it is the same every time, and most of it is what stalls people.',
    solution:
      'An orchestrator fans out to builder, marketing, and security agents in parallel. Results land in one dashboard you can review, edit, and deploy. The boring 80% becomes an afternoon.',
    features: [
      'Orchestrator → builder · marketing · security in parallel',
      'Product brief, file structure, landing copy on input',
      'Live deploy feed · v2.4.1 shipped 14s ago, in real time',
      'Stats panel · active builders, revenue, ship time',
      'Public open-beta sign-up · no friction'
    ],
    tech: ['Next.js', 'TypeScript', 'Anthropic API', 'E2B', 'Supabase', 'Replicate'],
    learned:
      'Multi-agent works when each agent owns a narrow lane and the orchestrator merges. One model trying to do everything just gives you tangled prompts.',
    status: 'In the works · Open beta',
    github: null,
    demo: 'https://ai-saas-factory-ten.vercel.app',
    accent: '#a78bfa',
    image: '/projects/ai-saas-factory.jpg',
    mockType: 'marketing',
    label: 'ai-saas-factory-ten.vercel.app'
  },
  {
    id: 'quality-auto',
    title: 'Quality Auto Signatures',
    subtitle: 'Tokunbo Specialists',
    category: 'Web · Production',
    featured: true,
    year: '2025',
    role: 'Solo · Design + Build',
    phase: 'live',
    pitch:
      'Trust-first website for a Nigerian vehicle business · inventory, contact, and a brand that closes deals on first scroll.',
    problem:
      'A growing car business needed a credible online home. Buyers wanted to browse inventory, verify the dealer, and reach out without friction · most car sites do none of that well.',
    solution:
      'A fast, mobile-first site with an inventory grid, vehicle detail pages, a secure contact flow, WhatsApp routing, and visual cues that build trust on first scroll.',
    features: [
      'Inventory grid with filters',
      'Vehicle detail pages with image galleries',
      'WhatsApp + email contact flow',
      'Mobile-first responsive layout',
      'SEO and Open Graph metadata'
    ],
    tech: ['HTML', 'CSS', 'JavaScript', 'Netlify'],
    learned:
      'For a buying decision this big, presentation IS the product. Spacing, type, and clear photos outperform any feature you can add.',
    status: 'Live · Since 2025',
    github: null,
    demo: 'https://qualityautosignatures.com',
    accent: '#d4a574',
    image: '/projects/quality-auto.jpg',
    mockType: 'marketing',
    label: 'qualityautosignatures.com'
  },
  {
    id: 'portfolio',
    title: 'This Portfolio',
    subtitle: 'gregoryuku.com',
    category: 'Web · Personal',
    featured: true,
    year: '2026',
    role: 'Solo · Design + Code + 3D',
    phase: 'live',
    pitch:
      'A cinematic portfolio that opens with a real WebGL hero and treats each project like a magazine spread.',
    problem:
      'Most student portfolios look the same · dark mode, glass cards, gradient text. Recruiters skim them in seconds. So do investors.',
    solution:
      'Real Three.js hero with a wireframe core and bloom, Lenis smooth scroll, sticky-scroll project sections with device mockups, Instrument Serif display, single ember accent.',
    features: [
      'React Three Fiber + postprocessing',
      'Lenis smooth scroll integration',
      'Sticky-scroll project sections',
      'Instrument Serif + Geist typography',
      'Reduced-motion safe'
    ],
    tech: ['React', 'Vite', 'Three.js', 'R3F', 'Lenis', 'Framer Motion'],
    learned:
      'A portfolio IS a product. Motion and typography do the persuading before any copy is read.',
    status: 'Live · 2026',
    github: 'https://github.com/Dekryon/portfolio',
    demo: 'https://gregoryuku.com',
    accent: '#a5f3fc',
    image: '/projects/portfolio.jpg',
    mockType: 'marketing',
    label: 'gregoryuku.com'
  },
  {
    id: 'gradesys',
    title: 'Gradesys',
    subtitle: 'SaaS Grade Tracker',
    category: 'SaaS · Edu',
    featured: false,
    year: '2026',
    role: 'Solo · Design + Engineering',
    phase: 'coming-soon',
    target: 'Q3 2026',
    pitch:
      'Modern grade tracking for the people who actually use grade software · students seeing their progress, teachers running classes, institutions reporting.',
    problem:
      'Existing grade tools split badly. Spreadsheets are private but unstructured. LMS gradebooks are official but unloved. Students don\'t see their own data clearly.',
    solution:
      'A freemium SaaS that lets students self-track with predictions, lets teachers manage classes, and lets institutions roll up. Mobile-first dashboard, clean exports.',
    features: [
      'Student self-tracking with grade predictions',
      'Teacher class management',
      'Institution rollup and clean exports',
      'Mobile-first responsive dashboard',
      'Freemium gate at the right level'
    ],
    tech: ['Next.js', 'TypeScript', 'Supabase', 'Tailwind'],
    learned: null,
    status: 'Building · Private alpha · Q3 2026',
    github: null,
    demo: null,
    accent: '#7cffcb',
    image: null,
    mockType: null,
    label: null
  }
]
