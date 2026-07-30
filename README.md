# NOVA — Scroll-Based 3D Tech Portfolio

An award-style, motion-first developer portfolio: a kinetic hero with an interactive
3D "liquid chrome" centerpiece, smooth momentum scrolling, masked text reveals, an
editorial marquee, and a visual contact form. **Dark, futuristic, frontend-only.**

---

## Tech stack
- **React** (Create React App + CRACO, `@` path alias → `src/`)
- **Tailwind CSS** + **shadcn/ui** components
- **framer-motion** — entrance reveals, parallax, micro-interactions
- **lenis** — smooth momentum scrolling
- **three / @react-three/fiber / @react-three/drei** — the WebGL hero sphere
- **react-fast-marquee** — the Skills marquee
- **sonner** — toast notifications
- **lucide-react** — icons

> Backend (FastAPI) and MongoDB exist from the template but are **not used** — the
> site is fully static/client-side and saves nothing.

---

## Run it
```bash
cd frontend
yarn            # install
yarn start      # dev server (managed by supervisor in this environment)
yarn build      # production bundle
```
Use `yarn` (never `npm`).

---

## Editing content (the important bit)
**All copy and links live in `frontend/src/data.js`.** Change it there and the whole
site updates — no component edits needed.

| Export | Drives | Notes |
|---|---|---|
| `PROFILE` | Hero, Navbar, Contact, Footer | name, role, tagline, email, `socials[]` |
| `MANIFESTO` | About chapters | `{ id, title, body }` |
| `SKILLS` | Skills marquee | array of strings |
| `PROJECTS` | Projects cards | `{ id, title, category, year, description, image, liveUrl, githubUrl }` |

**Link rule:** `"#"` means *"no link yet"* — that social/button simply won't render.
Put a real URL to make it appear and open in a new tab.

**Project images:** `image` points to a file in `frontend/public` (e.g.
`/images/projects/wealth-builder.jpg`). If the file is missing, the card shows a
numbered gradient placeholder automatically.

---

## Project structure
```
/app
├── frontend/
│   ├── public/
│   │   ├── index.html          # HTML shell — fonts (Outfit + JetBrains Mono), meta
│   │   └── images/projects/    # (add your project images here)
│   └── src/
│       ├── index.js            # React entry point (mounts <App/>)
│       ├── index.css           # global styles + design tokens + utility classes
│       ├── App.css             # small wrapper styles
│       ├── App.js              # root layout: overlays + sections inside LenisProvider
│       ├── data.js             # ⭐ ALL content (edit this)
│       ├── lib/
│       │   └── perf.js         # hasHardwareGPU() — WebGL vs CSS-fallback decision
│       └── components/
│           ├── LenisProvider.jsx   # smooth-scroll wrapper
│           ├── Preloader.jsx       # 000→100 intro loader (rAF, elapsed-time)
│           ├── CustomCursor.jsx    # dot + trailing ring cursor
│           ├── Navbar.jsx          # glass nav + mobile drawer (Lenis scrollTo)
│           ├── Hero.jsx            # kinetic hero; picks 3D vs CSS orb; parallax
│           ├── Hero3D.jsx          # react-three-fiber liquid-chrome sphere
│           ├── HeroOrbFallback.jsx # pure-CSS orb for non-GPU / reduced-motion
│           ├── Reveal.jsx          # <Reveal> fade-rise + <MaskReveal> line wipe
│           ├── About.jsx           # manifesto chapters
│           ├── Skills.jsx          # dual-direction marquee
│           ├── Projects.jsx        # work grid + smart links + image fallback
│           ├── Contact.jsx         # visual-only form + email/socials
│           ├── Footer.jsx          # back-to-top + identity line
│           └── ui/                 # shadcn/ui primitives
└── design_guidelines.json          # the design blueprint this UI follows
```

---

## How it fits together
1. `index.js` renders `App.js`.
2. `App` shows the **Preloader**; when it finishes it flips `ready = true`.
3. **Hero** runs `hasHardwareGPU()` and mounts either the WebGL `Hero3D`
   (lazy-loaded) or the CSS `HeroOrbFallback` — so it stays smooth on any device.
4. Every section reads its text from **`data.js`**.
5. **Navbar / Footer** use the Lenis instance to animate scrolling; **Reveal /
   MaskReveal** animate each section as it enters the viewport.

---

## Performance notes
- three.js is **code-split** (React.lazy) so the initial bundle stays small; the 3D
  scene only mounts after the intro and only on real-GPU devices.
- The WebGL render loop **pauses** when the hero scrolls offscreen.
- Software-rendered / headless browsers get the CSS fallback (no janky WebGL).

---

## Known limitations / next steps
- The **contact form is visual-only** — it validates + toasts but sends nothing.
  To make it real, POST the form data to an email service inside `Contact.jsx`'s
  `onSubmit`.
- Replace placeholder projects/images with your real work.
- Add SEO/OpenGraph tags and a favicon for sharing.

