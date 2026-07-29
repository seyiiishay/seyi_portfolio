import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const DURATION = 2400; // ms

export default function Preloader({ onComplete }) {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);
  const startRef = useRef(null);

  useEffect(() => {
    let raf;
    const tick = (now) => {
      if (startRef.current === null) startRef.current = now;
      const elapsed = now - startRef.current;
      const progress = Math.min(elapsed / DURATION, 1);
      // ease-out
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * 100));
      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setDone(true), 350);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!done && (
        <motion.div
          data-testid="preloader"
          exit={{ y: "-100%" }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050505]"
        >
          <div className="line-mask">
            <motion.p
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
              className="font-mono text-xs uppercase tracking-[0.4em] text-[#52525b]"
            >
              Loading Experience
            </motion.p>
          </div>
          <div className="mt-6 overflow-hidden">
            <span className="block font-display text-7xl font-black tabular-nums tracking-tighter text-white md:text-9xl">
              {String(count).padStart(3, "0")}
            </span>
          </div>
          <div className="mt-8 h-px w-48 overflow-hidden bg-white/10 md:w-64">
            <div
              className="h-full bg-white"
              style={{ width: `${count}%` }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
