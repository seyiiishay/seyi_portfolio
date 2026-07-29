import { useRef, useState, useEffect, lazy, Suspense } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { PROFILE } from "../data";
import { hasHardwareGPU } from "../lib/perf";
import HeroOrbFallback from "./HeroOrbFallback";

const Hero3D = lazy(() => import("./Hero3D"));

const EASE = [0.76, 0, 0.24, 1];

const LINES = ["CREATIVE", "TECHNO-", "LOGIST"];

function MaskLine({ children, delay }) {
  return (
    <span className="line-mask">
      <motion.span
        className="block"
        initial={{ y: "110%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 1.2, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export default function Hero({ ready = false }) {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "0px 0px -20% 0px" });
  const [gpu, setGpu] = useState(false);

  useEffect(() => {
    setGpu(hasHardwareGPU());
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const canvasY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "120%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      data-testid="hero-section"
      className="relative h-screen w-full overflow-hidden"
    >
      {/* 3D layer (WebGL on GPU devices, CSS orb fallback otherwise) */}
      <motion.div style={{ y: canvasY }} className="absolute inset-0 z-0">
        {ready &&
          (gpu ? (
            <Suspense fallback={<HeroOrbFallback />}>
              <Hero3D active={inView} />
            </Suspense>
          ) : (
            <HeroOrbFallback />
          ))}
      </motion.div>

      {/* Kinetic type layer */}
      <motion.div
        style={{ y: textY, opacity }}
        className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-center px-6 md:px-12 lg:px-24"
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1 }}
          className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-[#a1a1aa]"
        >
          {PROFILE.name} — {PROFILE.location}
        </motion.p>

        <h1
          className={`font-display text-6xl font-black uppercase leading-[0.85] tracking-tighter text-white sm:text-7xl md:text-8xl lg:text-[11vw] ${
            gpu ? "mix-blend-difference" : ""
          }`}
        >
          {LINES.map((line, i) => (
            <MaskLine key={line} delay={0.3 + i * 0.12}>
              {line}
            </MaskLine>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 1, ease: EASE }}
          className="mt-8 max-w-md font-mono text-sm font-light leading-relaxed text-[#a1a1aa] md:text-base"
        >
          {PROFILE.tagline}
        </motion.p>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.6, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#8a8a94]">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <ArrowDown size={16} className="text-white" />
        </motion.div>
      </motion.div>

      {/* Corner meta */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.8, duration: 1 }}
        className="absolute bottom-8 right-6 z-10 hidden text-right font-mono text-[10px] uppercase tracking-[0.25em] text-[#8a8a94] md:block md:right-12 lg:right-24"
      >
        Portfolio © 2026
        <br />
        Edition 01
      </motion.div>
    </section>
  );
}
