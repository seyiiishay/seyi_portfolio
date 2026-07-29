# PRD — Scroll-Based 3D Tech Portfolio ("NOVA" / personalized)

## Original Problem Statement
"A scroll based 3d landing page with smooth animations for my tech portfolio."
System directive: Awwwards Site-of-the-Day level — bold cohesive art direction, kinetic
hero with a signature on-load masked line-by-line reveal, numbered manifesto chapters,
one slow editorial marquee, deliberate product photography, premium purposeful motion
(framer-motion + lenis), one subtle parallax/3D hero moment.

## User Choices
- Placeholder content (user edits later — already personalized to real name/email).
- Interactive 3D object/model as centerpiece.
- Dark futuristic theme.
- Keep all sections: Hero, About, Skills, Projects, Contact.
- Contact form: visual only (no backend).

## Architecture
- Frontend-only (React 19 + CRACO). No backend/DB usage (default template untouched).
- Stack additions: three, @react-three/fiber, @react-three/drei, lenis, react-fast-marquee
  (framer-motion, lucide-react, sonner pre-installed).
- Design system from /app/design_guidelines.json: Outfit (display) + JetBrains Mono (body),
  dark #050505 palette, technical 1px-border grid, editorial brutalist motion.

## Implemented (2026-07)
- Preloader: rAF elapsed-time counter (~2.4s) with reliable completion + cleanup.
- Hero: kinetic "CREATIVE TECHNOLOGIST" masked line-by-line on-load reveal, tagline,
  scroll cue, corner meta, scroll parallax.
- Hero 3D: react-three-fiber liquid-chrome icosahedron (MeshDistortMaterial, Lightformer
  Environment). Lazy-loaded (keeps three.js out of critical bundle) and gated to mount
  only after preloader. Pauses frameloop when offscreen.
- GPU capability detection (lib/perf.js): software renderers (SwiftShader/llvmpipe) or
  prefers-reduced-motion get a polished CSS "chrome orb" fallback (HeroOrbFallback) instead
  of WebGL — smooth on low-power/headless devices; real GPUs get the animated sphere.
- About: numbered manifesto chapters (01/02/03) on a technical border grid + masked headline.
- Skills: dual-row editorial marquee (outline stroke + solid) via react-fast-marquee.
- Projects: 4 cards with parallax, grayscale→color hover, clipped frames, treated imagery.
- Contact: brutalist visual-only form (sonner toast on submit) + direct contact details.
- Navbar (glass blur, desktop + mobile drawer) & Footer use Lenis scrollTo for smooth nav.
- Custom cursor (dot + trailing ring, mix-blend-difference), grain overlay.
- Reveal/MaskReveal helpers (useInView on stable container — reliable reveals).

## Testing
- iteration_3.json: frontend 98%. All functional flows pass (preloader <6s, desktop+mobile
  nav, footer back-to-top, masked reveals, 4 projects+images, marquee, contact error/success
  toasts + no network). No console/page errors. GPU fallback verified on headless.
- Post-test fixes: reduced-motion now freezes fallback orb; contact placeholder contrast
  bumped; template ui lint (calendar/command) silenced. Lint clean.
- NOTE: raw FPS on the GPU-less headless preview is environment-throttled (~6fps even near
  static); real GPU devices render at 60fps.

## Backlog / Next
- P1: Wire contact form to a real backend + email (e.g., Resend) if lead capture wanted.
- P1: Replace placeholder projects with real case studies + dedicated project detail pages.
- P2: Add GLTF model option / draggable OrbitControls for the hero 3D.
- P2: SEO meta/OpenGraph, favicon, sitemap.
- P2: Analytics on CTA clicks; downloadable resume.
