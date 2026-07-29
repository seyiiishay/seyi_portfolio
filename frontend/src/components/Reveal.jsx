import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];

export const Reveal = ({ children, delay = 0, className = "", y = 40 }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.9, delay, ease: EASE }}
  >
    {children}
  </motion.div>
);

export const MaskReveal = ({ children, delay = 0, className = "" }) => (
  <span className="line-mask">
    <motion.span
      className={`block ${className}`}
      initial={{ y: "110%" }}
      whileInView={{ y: "0%" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1, delay, ease: [0.76, 0, 0.24, 1] }}
    >
      {children}
    </motion.span>
  </span>
);
