/**
 * Reveal helpers — scroll-triggered entrance animations used across sections.
 *
 * Reveal:     fades + slides a block up when it enters the viewport (once).
 * MaskReveal: the "line wipe" effect — text starts pushed 110% below a clipping
 *             box (.line-mask has overflow:hidden) and slides up to 0%.
 *
 * IMPORTANT: MaskReveal observes the STABLE outer <span> with useInView (not the
 * translated inner span). Observing the moving/clipped inner element previously
 * caused headings to never trigger and stay hidden — this is the reliable fix.
 */
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1]; // gentle ease-out for fades

// Fade-and-rise wrapper. `amount: 0.05` = fire when 5% is visible.
export const Reveal = ({ children, delay = 0, className = "", y = 40 }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.05 }}
    transition={{ duration: 0.9, delay, ease: EASE }}
  >
    {children}
  </motion.div>
);

// Line-by-line text wipe. Wrap each line in its own <MaskReveal>.
export const MaskReveal = ({ children, delay = 0, className = "" }) => {
  const ref = useRef(null); // ref on the stable clipping container
  const inView = useInView(ref, { once: true, amount: 0.2 });
  return (
    <span ref={ref} className="line-mask">
      <motion.span
        className={`block ${className}`}
        initial={{ y: "110%" }}
        animate={inView ? { y: "0%" } : { y: "110%" }}
        transition={{ duration: 1, delay, ease: [0.76, 0, 0.24, 1] }}
      >
        {children}
      </motion.span>
    </span>
  );
};
