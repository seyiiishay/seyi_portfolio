import { useLenis } from "lenis/react";
import { PROFILE } from "../data";

export default function Footer() {
  const lenis = useLenis();
  const scrollTop = () => {
    if (lenis) lenis.scrollTo(0, { duration: 1.4 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      data-testid="footer"
      className="relative border-t border-white/10 bg-[#050505] px-6 py-12 md:px-12 lg:px-24"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 md:flex-row md:items-center">
        <div>
          <button
            onClick={scrollTop}
            data-testid="footer-back-to-top"
            className="font-display text-4xl font-black uppercase tracking-tighter text-white transition-colors duration-300 hover:text-[#a1a1aa] md:text-5xl"
          >
            Back to top ↑
          </button>
        </div>

        <div className="flex flex-col gap-2 md:items-end">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#a1a1aa]">
            {PROFILE.name} — {PROFILE.role}
          </p>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#8a8a94]">
            © 2026 — Designed &amp; built in the browser
          </p>
        </div>
      </div>
    </footer>
  );
}
