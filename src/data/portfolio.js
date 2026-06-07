// ── NAVIGATION ────────────────────────────────────────────────────────────
export const NAV_ITEMS = [
  { label: 'Home',       id: 0 },
  { label: 'About',      id: 1 },
  { label: 'Skills',     id: 2 },
  { label: 'Experience', id: 3 },
  { label: 'Projects',   id: 4 },
  { label: 'GitHub',     id: 5 },
  { label: 'Contact',    id: 6 },
]

export const SECTION_LABELS = [
  '01 / HERO',
  '02 / ABOUT',
  '03 / SKILLS',
  '04 / EXPERIENCE',
  '05 / PROJECTS',
  '06 / GITHUB',
  '07 / CONTACT',
]

export const GITHUB_PROFILE = {
  username: 'SajalGangwar69',
  url: 'https://github.com/SajalGangwar69',
  contributionsApiUrl: 'https://github-contributions-api.jogruber.de/v4/SajalGangwar69?y=last',
}


export const SKILLS = [
  { name: 'HTML',         icon: '🌐', color: '#e34f26' },
  { name: 'CSS',          icon: '🎨', color: '#1572b6' },
  { name: 'JavaScript',   icon: '⚡', color: '#f7df1e' },
  { name: 'React',        icon: '⚛',  color: '#61dafb' },
  { name: 'Node.js',      icon: '🟩', color: '#339933' },
  { name: 'Express',      icon: '🚂', color: '#aaaaaa' },
  { name: 'MongoDB',      icon: '🍃', color: '#47a248' },
  { name: 'MySQL',        icon: '🐬', color: '#4479a1' },
  { name: 'Git',          icon: '🐙', color: '#f05032' },
  { name: 'GitHub',       icon: '⚙️', color: '#ffffff' },
  { name: 'Postman',      icon: '📮', color: '#ff6c37' },
  { name: 'Graphic Design', icon: '🎭', color: '#bf00ff' },
  { name: 'Cyber Security', icon: '🔐', color: '#00f5ff' },
  { name: 'Social Media', icon: '📣', color: '#ff0090' },
  { name: 'Visual Content', icon: '🎬', color: '#ffb800' },
]

// ── EXPERIENCE ────────────────────────────────────────────────────────────
export const EXPERIENCE = [
  {
    company:  'Hoverin Aerospace',
    role:     'Graphic Designer & Social Media Handler',
    desc:     'Designed high-impact marketing creatives and managed social media campaigns, significantly boosting audience engagement and brand visibility across all platforms.',
    tags:     ['Design', 'Social', 'Marketing'],
    color:    '#00f5ff',
    icon:     '🚀',
  },
  {
    company:  'Aureole',
    role:     'Founder & Lead Designer',
    desc:     'Founded and led the brand from ground zero — built the entire identity, handled all design operations, and managed the complete digital presence end-to-end.',
    tags:     ['Founder', 'Brand Identity', 'Design'],
    color:    '#bf00ff',
    icon:     '👑',
  },
  {
    company:  'Zephryx Tech',
    role:     'Creative Designer',
    desc:     'Designed UI concepts and collaborated tightly with developers to maintain consistent, polished design systems across all products and interfaces.',
    tags:     ['UI Design', 'Systems', 'Dev Collab'],
    color:    '#39ff14',
    icon:     '💡',
  },
]

// ── EDUCATION ─────────────────────────────────────────────────────────────
export const EDUCATION = [
  {
    title: 'High School & Intermediate',
    institution: 'Seth Anandram Jaipuria School, Ghaziabad',
    icon: '🏫',
  },
  {
    title: 'B.Tech — Computer Science Engineering',
    institution: 'Dr. Bhimrao Ambedkar University, Agra',
    icon: '🎓',
  },
]

// ── PROJECTS ──────────────────────────────────────────────────────────────
export const PROJECTS = [
  {
    name:     'Auto Plant Watering System',
    desc:     'A smart IoT-enabled mobile application built with React Native and Expo to monitor soil moisture and automate irrigation remotely.',
    tags:     ['React Native', 'Expo', 'Node.js', 'API Integration'],
    badge:    '📱 Live APK',
    featured: true,
    color:    '#00ff87', // Neon Mint Green
    link:     'https://drive.google.com/file/d/1iPmpIsJqUu1-KeBkWP3vCJe9olbNK3qD/view?usp=drivesdk',
    demo:     false,
    details:  'Developed a smart plant watering mobile application using React Native and Expo that helps users monitor soil moisture levels and automate irrigation remotely. Key Features: • Real-time soil moisture monitoring • Automated watering system control • Mobile-based remote access • Clean, responsive UI • Secure backend connectivity with Node.js. Mobile app built and tested via Expo; APK version available for download.'
  },
  {
    name:     'EGAMING LEAGUE 2.0',
    desc:     'Led end-to-end social media campaigns for a major esports event — growing brand presence, designing creatives, and promoting competitive gaming culture across digital platforms.',
    tags:     ['Social Media', 'Campaign', 'Esports', 'Branding'],
    badge:    '⭐ Featured',
    featured: true,
    color:    '#00f5ff',
    link:     '#',
    demo:     false,
    details:  'Led the creative design, complete visual system, and strategic social campaign execution for a major esports event. Successfully grew digital footprint and engagement across gaming communities.'
  },
  {
    name:     'Brand Identity System',
    desc:     'Comprehensive brand identity project encompassing logo design, visual language, color systems, typography, and full digital asset creation.',
    tags:     ['Design', 'Branding', 'Visual Identity'],
    badge:    '🚀 Coming Soon',
    featured: false,
    color:    '#ff0090',
    link:     '#',
    demo:     true,
    details:  '🚀 Currently in development. Designing a complete visual identity including typography scales, adaptive color palettes, design system guidelines, and cross-platform digital brand assets.'
  },
  {
    name:     'Cybersecurity Tool',
    desc:     'A security-focused project applying core cybersecurity principles with practical tooling. Currently in active development — details to follow.',
    tags:     ['Security', 'Python', 'CLI Tools'],
    badge:    '🚀 Coming Soon',
    featured: false,
    color:    '#bf00ff', // Purple color
    link:     '#',
    demo:     true,
    details:  '🚀 Currently in development. Building a security auditing utility in Python to automate system diagnostics, vulnerability analysis, and network packet analysis.'
  },
]

// ── SOCIAL LINKS ──────────────────────────────────────────────────────────
export const SOCIALS = [
  { label: 'LI',  href: 'https://www.linkedin.com/in/sajal-gangwar-69abc',    name: 'LinkedIn'  },
  { label: 'GH',  href: 'https://github.com/SajalGangwar69',                  name: 'GitHub'    },
  { label: 'IG',  href: 'https://www.instagram.com/ck.sajal.fu?igsh=anE0eHJzbTQ4anVy',       name: 'Instagram' },
  { label: 'YT',  href: '#',                                         name: 'YouTube'   },
  { label: '@',   href: 'mailto:sajalgangwar2222@gmail.com',         name: 'Email'     },
]

// ── CAMERA POSITIONS PER SECTION ──────────────────────────────────────────
export const CAM_POSITIONS = [
  { x: 0,   y: 0,  z: 28 },   // Hero
  { x: -5,  y: 2,  z: 22 },   // About
  { x: 0,   y: -3, z: 20 },   // Skills
  { x: 7,   y: 1,  z: 24 },   // Experience
  { x: -4,  y: -2, z: 18 },   // Projects
  { x: 5,   y: -1, z: 24 },   // GitHub
  { x: 0,   y: 0,  z: 30 },   // Contact
]
