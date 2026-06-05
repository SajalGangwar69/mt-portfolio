# Sajal Gangwar — 3D Portfolio

A futuristic space-station aesthetic portfolio built with **React + Vite + Three.js (R3F) + Framer Motion**.

## 🚀 Tech Stack

| Layer       | Tech                                      |
|-------------|-------------------------------------------|
| Framework   | React 18 + Vite 5                         |
| 3D Engine   | Three.js r160 via @react-three/fiber      |
| 3D Helpers  | @react-three/drei (Stars, Trail)          |
| Animations  | Framer Motion 10                          |
| Styling     | CSS Modules (zero runtime CSS-in-JS)      |
| Fonts       | Orbitron · Space Mono · Syne (Google)     |

## 📁 Project Structure

```
sajal-portfolio/
├── index.html
├── vite.config.js
├── package.json
└── src/
    ├── main.jsx
    ├── App.jsx                  ← Root: wires all sections + 3D scene
    ├── data/
    │   └── portfolio.js         ← All content (skills, projects, exp, socials)
    ├── hooks/
    │   ├── useSection.js        ← Scroll/wheel/touch/keyboard section nav
    │   └── useCursor.js         ← Custom cursor logic
    ├── styles/
    │   └── globals.css          ← CSS variables, keyframes, reset
    └── components/
        ├── Scene.jsx            ← Three.js canvas (R3F): particles, core, orbits
        ├── Cursor.jsx           ← Custom neon cursor + ring
        ├── Nav.jsx              ← Top navigation bar
        ├── SectionDots.jsx      ← Right-side section dot indicators
        ├── SectionWrapper.jsx   ← Framer Motion page transition wrapper
        ├── HUD.jsx              ← Progress bar + section label overlay
        ├── HeroSection.jsx      ← Landing: name, tagline, socials
        ├── AboutSection.jsx     ← About + stat cards
        ├── SkillsSection.jsx    ← 15 skill nodes with glow hover
        ├── ExperienceSection.jsx← 3 experience cards with neon accent lines
        ├── ProjectsSection.jsx  ← 4 project cards (click to expand)
        └── ContactSection.jsx   ← Contact card with copy-email feature
```

## ⚡ Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Start dev server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173)

### 3. Build for production
```bash
npm run build
npm run preview
```

## 🎮 Controls

| Action              | Effect                    |
|---------------------|---------------------------|
| Scroll / Mousewheel | Navigate sections          |
| Swipe Up/Down       | Navigate sections (touch)  |
| Arrow Keys / PgUp/Dn| Navigate sections          |
| Nav links           | Jump to any section        |
| Side dots           | Jump to any section        |
| Move mouse          | Parallax camera + particles|
| Click project card  | Expand details             |
| Click email row     | Copy email to clipboard    |

## ✏️ Customization

### Update your info
Edit `src/data/portfolio.js` — all content lives here:
- `SKILLS` — add/remove skill nodes
- `EXPERIENCE` — update company, role, description
- `PROJECTS` — replace demo projects with your real ones
- `SOCIALS` — update links

### Add a real project
In `src/data/portfolio.js`, replace any demo entry:
```js
{
  name:     'My Project Name',
  desc:     'What it does...',
  tags:     ['React', 'Node.js'],
  badge:    '🔥 Live',
  featured: false,
  color:    '#00f5ff',
  link:     'https://yourproject.com',
  demo:     false,   // ← set false to enable "View Project" link
}
```

### Change 3D colors per section
In `src/components/Scene.jsx`, edit the `colors` array in `CoreObject`:
```js
const colors = ['#00f5ff', '#bf00ff', '#39ff14', '#ff0090', '#ffb800', '#00f5ff']
```
Each index corresponds to a section (0=Hero, 1=About, etc.)

## 🌐 Deploy

### Vercel (recommended)
```bash
npm i -g vercel
vercel
```

### Netlify
```bash
npm run build
# Upload dist/ folder to Netlify
```

### GitHub Pages
Add `base: '/repo-name/'` to `vite.config.js`, then:
```bash
npm run build
```

## 📦 Performance Notes
- 3D scene is lazy-loaded via `React.Suspense`
- Pixel ratio capped at 2 for mobile performance
- Particle count: 1600 (adjust in `Scene.jsx` → `const count = 1600`)
- All CSS is modular — no unused styles shipped
