export const PROJECTS = [
  {
    id: 'ai-drive-thru',
    title: 'AI Drive-Thru Ordering System',
    category: 'AI',
    featured: true,
    year: '2026',
    role: 'Solo · Design + Engineering',
    pitch:
      'Voice-first drive-thru assistant that takes orders, confirms items, and hands a clean ticket to the kitchen.',
    problem:
      'Drive-thrus lose revenue to mis-heard orders, slow lines, and inconsistent staff experience · especially with diverse accents and noisy environments.',
    solution:
      'A speech-to-intent pipeline that listens for menu items, handles modifiers, and asks short clarifying questions when confidence is low. A simple operator dashboard shows the live order and lets staff override anything in one tap.',
    features: [
      'Real-time speech to structured order',
      'Menu logic with combos, sizes, and modifiers',
      'Confidence-aware confirmation flow',
      'Operator override dashboard',
      'Per-location menu config'
    ],
    tech: ['React', 'Node.js', 'OpenAI API', 'WebSockets', 'Tailwind'],
    learned:
      'Designing for uncertainty · when an AI is unsure, the UX matters more than the model. A clear confirmation loop beats raw accuracy every time.',
    status: 'In Development',
    github: 'https://github.com/Dekryon/drive-thru-ai',
    demo: 'https://ordo-portal-liart.vercel.app',
    accent: '#ff5b22',
    image: '/projects/drive-thru.jpg',
    mockType: 'dashboard',
    label: 'ordo-portal-liart.vercel.app'
  },
  {
    id: 'quality-auto',
    title: 'Quality Auto Signatures',
    category: 'Web',
    featured: true,
    year: '2025',
    role: 'Solo · Design + Build',
    pitch:
      'Trust-first website for a Nigerian vehicle business · inventory, contact, and a clean, professional brand presence.',
    problem:
      'A growing car business needed a credible online home. Buyers wanted to browse inventory, verify the dealer, and reach out without friction.',
    solution:
      'A fast, mobile-first site with an inventory grid, vehicle detail pages, a secure contact flow, and visual cues that build trust on first scroll.',
    features: [
      'Inventory grid with filters',
      'Vehicle detail pages with image galleries',
      'WhatsApp + email contact flow',
      'Mobile-first responsive layout',
      'SEO and Open Graph metadata'
    ],
    tech: ['HTML', 'CSS', 'JavaScript', 'Netlify'],
    learned:
      'For a buying decision this big, presentation IS the product. Spacing, typography, and clear photos do more than any feature you can add.',
    status: 'Completed',
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
    category: 'Web',
    featured: true,
    year: '2026',
    role: 'Solo · Design + Code + 3D',
    pitch:
      'A cinematic portfolio that opens with a real WebGL hero and treats each project like a magazine spread.',
    problem:
      'Most student portfolios look the same · dark mode, glass cards, gradient text. Recruiters skim them in seconds.',
    solution:
      'Real Three.js hero with a wireframe core and bloom, Lenis-driven smooth scroll, sticky-scroll project sections with device mockups, Instrument Serif display type, ember-orange single accent.',
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
    status: 'Completed',
    github: 'https://github.com/Dekryon/portfolio',
    demo: 'https://portfolio-qualityauto-signatures.vercel.app',
    accent: '#a5f3fc',
    image: '/projects/portfolio.jpg',
    mockType: 'marketing',
    label: 'portfolio-qualityauto-signatures.vercel.app'
  },
  {
    id: 'grades-manager',
    title: 'Student Grades Manager',
    category: 'Software',
    featured: false,
    year: '2024',
    role: 'Coursework · Solo',
    pitch:
      'Console application that records, calculates, and reports on student grades.',
    problem:
      'Tracking grades by hand is slow and error-prone. A small CLI tool fixes the loop without forcing teachers into a heavy LMS.',
    solution:
      'A C#/Java-style menu app with input validation, arrays of records, and clean calculations for averages, top performers, and pass/fail breakdowns.',
    features: [
      'Add, edit, delete, list students',
      'Average, highest, lowest, pass rate',
      'Input validation and error handling',
      'Save and load from local file',
      'Menu-driven UX'
    ],
    tech: ['C#', 'File I/O', 'OOP'],
    learned:
      'Even a console app benefits from a real UX pass. Loops, prompts, and error messages are interface.',
    status: 'Completed',
    github: null,
    demo: null,
    accent: '#7cffcb',
    image: '/projects/grades.jpg',
    mockType: 'terminal',
    label: 'gradesys ~ /home/gu'
  },
  {
    id: 'web-course-projects',
    title: 'Web Development Coursework',
    category: 'Web',
    featured: false,
    year: '2024',
    role: 'Coursework · Solo',
    pitch:
      'Collection of projects from web development coursework · from semantic HTML to interactive JavaScript apps.',
    problem:
      'School projects often die in a zip file. I rebuilt the best ones as standalone demos that prove fundamentals end-to-end.',
    solution:
      'A small set of demos covering layout, forms, DOM events, fetch APIs, and accessibility · each refactored after the course to match how I write code today.',
    features: [
      'Semantic, accessible markup',
      'Responsive layouts',
      'API-backed mini apps',
      'Form validation patterns',
      'Vanilla JS interactivity'
    ],
    tech: ['HTML', 'CSS', 'JavaScript', 'Fetch API'],
    learned:
      'Fundamentals scale. Knowing the platform makes every framework cheaper to learn.',
    status: 'Completed',
    github: null,
    demo: null,
    accent: '#c084fc',
    image: '/projects/web-coursework.jpg',
    mockType: 'marketing',
    label: 'coursework.gregoryuku.com'
  },
  {
    id: 'ai-saas-factory',
    title: 'AI SaaS Factory',
    category: 'AI',
    featured: true,
    year: '2026',
    role: 'Solo · Design + Engineering',
    pitch:
      'Autonomous AI agent mesh that turns a business idea into a deployable product in minutes.',
    problem:
      'Going from idea to shipped SaaS takes weeks of repetitive setup · product brief, landing copy, schema, API routes, marketing posts, security checklist. Most of it is the same every time.',
    solution:
      'An orchestrator that fans out to builder, marketing, and security agents in parallel, then drops the results into a single dashboard you can review, copy, and deploy.',
    features: [
      'Orchestrator → builder · marketing · security in parallel',
      'Product brief, file structure, landing copy generated on input',
      'Live deploy feed (v2.4.1 shipped 14s ago style)',
      'Stats panel · active builders, revenue, ship time',
      'Open-beta UX with public sign-up'
    ],
    tech: ['Next.js', 'TypeScript', 'Anthropic API', 'E2B', 'Supabase', 'Replicate'],
    learned:
      'Multi-agent works when each agent owns a narrow lane and the orchestrator does the merging. One model trying to do everything gives you tangled prompts.',
    status: 'In Development',
    github: 'https://github.com/Dekryon/ai-saas-factory',
    demo: 'https://ai-saas-factory-ten.vercel.app',
    accent: '#a78bfa',
    image: '/projects/ai-saas-factory.jpg',
    mockType: 'marketing',
    label: 'ai-saas-factory-ten.vercel.app'
  },
  {
    id: 'business-landing',
    title: 'Small Business Landing System',
    category: 'Web',
    featured: false,
    year: '2025',
    role: 'Solo · Design + Build',
    pitch:
      'Reusable landing-page kit for small businesses · fast to ship, easy to update.',
    problem:
      'Most small businesses get stuck between expensive agency sites and ugly DIY templates.',
    solution:
      'A clean, fast, accessible landing-page kit with content-first sections, a contact form, and an admin-friendly content file.',
    features: [
      'Section library: hero, features, pricing, FAQ, contact',
      'Single content file for non-technical edits',
      'Lighthouse-friendly performance',
      'Optional CMS integration',
      'Mobile-first by default'
    ],
    tech: ['Astro', 'Tailwind', 'Netlify Forms'],
    learned:
      'A great template removes 80% of decisions for the owner without removing 80% of the value.',
    status: 'Prototype',
    github: null,
    demo: null,
    accent: '#34d399',
    image: '/projects/landing-kit.jpg',
    mockType: 'marketing',
    label: 'landing-kit · template-01'
  },
  {
    id: 'study-companion',
    title: 'CS Study Companion',
    category: 'Software',
    featured: false,
    year: '2025',
    role: 'Solo · Side Project',
    pitch:
      'Spaced-repetition study tool focused on data structures and algorithms.',
    problem:
      'CS fundamentals fade without review. Generic flashcard apps do not understand code.',
    solution:
      'A focused app that ships with curated DS&A decks, supports runnable code snippets in cards, and schedules reviews around your study calendar.',
    features: [
      'Curated DS&A decks',
      'Runnable JS code in cards',
      'Spaced-repetition scheduler',
      'Daily focus streaks',
      'Export deck as JSON'
    ],
    tech: ['React', 'Vite', 'IndexedDB'],
    learned:
      'Specialization beats generality for small audiences. A tool that knows my domain saves real time.',
    status: 'Prototype',
    github: null,
    demo: null,
    accent: '#22d3ee',
    image: '/projects/study.jpg',
    mockType: 'dashboard',
    label: 'study.gregoryuku.com'
  }
]

export const PROJECT_CATEGORIES = ['All', 'AI', 'Web', 'Software']

export const STATUS_STYLES = {
  Completed: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400',
  'In Development': 'border-ember/40 bg-ember/10 text-ember',
  Prototype: 'border-cyan-500/40 bg-cyan-500/10 text-cyan-400',
  Concept: 'border-violet-500/40 bg-violet-500/10 text-violet-400'
}
