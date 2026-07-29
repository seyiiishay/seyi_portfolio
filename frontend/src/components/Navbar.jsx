import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { PROFILE } from "../data";

const LINKS = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (href) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      data-testid="navbar"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 2.4, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 z-50 w-full border-b transition-colors duration-500 ${
        scrolled
          ? "border-white/10 bg-[#050505]/60 backdrop-blur-xl"
          : "border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex items-center justify-between px-6 py-5 md:px-12 lg:px-24">
        <button
          data-testid="nav-logo"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="font-display text-lg font-black uppercase tracking-tighter text-white"
        >
          {PROFILE.name.split(" ")[0]}
          <span className="text-[#52525b]">®</span>
        </button>

        <div className="hidden items-center gap-10 md:flex">
          {LINKS.map((l) => (
            <button
              key={l.href}
              data-testid={`nav-${l.label.toLowerCase()}`}
              onClick={() => go(l.href)}
              className="group relative font-mono text-xs uppercase tracking-[0.2em] text-[#a1a1aa] transition-colors duration-300 hover:text-white"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-white transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
        </div>

        <button
          data-testid="nav-toggle"
          onClick={() => setOpen((o) => !o)}
          className="md:hidden text-white"
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-white/10 bg-[#050505]/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col px-6 py-4">
              {LINKS.map((l) => (
                <button
                  key={l.href}
                  data-testid={`nav-mobile-${l.label.toLowerCase()}`}
                  onClick={() => go(l.href)}
                  className="border-b border-white/5 py-4 text-left font-display text-2xl font-bold uppercase tracking-tight text-white"
                >
                  {l.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
