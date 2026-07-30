/**
 * Preloader — the full-screen intro overlay with a 000→100 counter.
 *
 * Why requestAnimationFrame + wall-clock time (not setInterval)?
 * When the app first boots, the main thread is busy parsing JS. setInterval
 * gets throttled and the counter can stall. By computing progress from the
 * REAL elapsed time (now - start) we always reach 100 in ~DURATION ms, even if
 * a few frames are dropped. When done, it slides up and calls onComplete().
 */
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const DURATION = 2400; // total count-up time in milliseconds

export default function Preloader({ onComplete }) {
  const [count, setCount] = useState(0); // 0..100 shown on screen
  const [done, setDone] = useState(false); // triggers the slide-up exit
  const startRef = useRef(null); // timestamp of the first frame

  useEffect(() => {
    let raf;
    let timer;
    const tick = (now) => {
      if (startRef.current === null) startRef.current = now;
      const elapsed = now - startRef.current;
      const progress = Math.min(elapsed / DURATION, 1); // 0..1
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setCount(Math.round(eased * 100));
      if (progress < 1) {
        raf = requestAnimationFrame(tick); // keep counting
      } else {
        timer = setTimeout(() => setDone(true), 350); // brief hold, then exit
      }
    };
    raf = requestAnimationFrame(tick);
    // Cancel the frame + pending timeout if unmounted mid-count.
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
  }, []);

  return (
    // AnimatePresence lets the exit (y: -100%) animation play; when it finishes
    // onExitComplete fires onComplete() which sets `ready` in App.
    <AnimatePresence onExitComplete={onComplete}>
      {!done && (
        <motion.div
          data-testid="preloader"
          exit={{ y: "-100%" }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050505]"
        >
          {/* Masked label: text slides up from inside an overflow-hidden box */}
          <div className="line-mask">
            <motion.p
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
              className="font-mono text-xs uppercase tracking-[0.4em] text-[#8a8a94]"
            >
              Loading Experience
            </motion.p>
          </div>
          {/* The big 000-padded counter */}
          <div className="mt-6 overflow-hidden">
            <span className="block font-display text-7xl font-black tabular-nums tracking-tighter text-white md:text-9xl">
              {String(count).padStart(3, "0")}
            </span>
          </div>
          {/* Thin progress bar that fills to `count`% */}
          <div className="mt-8 h-px w-48 overflow-hidden bg-white/10 md:w-64">
            <div className="h-full bg-white" style={{ width: `${count}%` }} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
