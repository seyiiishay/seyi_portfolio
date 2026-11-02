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

The contact form posts to the FastAPI backend at `http://localhost:8000` by default
and stores messages in MongoDB. Set `REACT_APP_API_URL` when the backend runs at a
different URL.

For Resend delivery, create `backend/.env` with these server-only values:

```env
MONGO_URL=mongodb://localhost:27017
DB_NAME=portfolio
RESEND_API_KEY=re_...
RESEND_FROM_EMAIL=Portfolio <contact@notify.elorasuite.ca>
CONTACT_TO_EMAIL=your-inbox@example.com
```

In Resend, verify `notify.elorasuite.ca` first. The `RESEND_FROM_EMAIL` address
must use that verified domain. `CONTACT_TO_EMAIL` is the inbox that receives
portfolio inquiries, and visitor replies are supported through `reply_to`.

