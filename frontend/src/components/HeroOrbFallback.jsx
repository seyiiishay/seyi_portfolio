import { motion, useReducedMotion } from "framer-motion";

// Lightweight, GPU-free stand-in for the WebGL hero object.
// Renders a dark chrome sphere with layered radial highlights + slow float.
export default function HeroOrbFallback() {
  const reduce = useReducedMotion();
  return (
    <div
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
      aria-hidden="true"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={
          reduce
            ? { scale: 1, opacity: 1 }
            : { scale: 1, opacity: 1, y: [0, -18, 0], rotate: [0, 4, 0] }
        }
        transition={
          reduce
            ? { duration: 1 }
            : {
                scale: { duration: 1.4, ease: [0.22, 1, 0.36, 1] },
                opacity: { duration: 1.4 },
                y: { duration: 7, repeat: Infinity, ease: "easeInOut" },
                rotate: { duration: 9, repeat: Infinity, ease: "easeInOut" },
              }
        }
        className="relative h-[62vmin] w-[62vmin] rounded-full"
        style={{
          background:
            "radial-gradient(35% 35% at 62% 28%, #6b7fa8 0%, #2a2f3a 22%, #0c0d11 55%, #050506 100%)",
          boxShadow:
            "inset -30px -40px 90px rgba(0,0,0,0.9), inset 30px 30px 80px rgba(120,150,210,0.12), 0 40px 140px rgba(0,0,0,0.8)",
        }}
      >
        {/* specular highlight */}
        <div
          className="absolute rounded-full blur-[2px]"
          style={{
            top: "20%",
            left: "58%",
            width: "10%",
            height: "10%",
            background:
              "radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0) 70%)",
          }}
        />
        {/* cool rim reflection */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(60% 90% at 20% 80%, rgba(80,120,200,0.18) 0%, rgba(0,0,0,0) 55%)",
          }}
        />
        {/* bottom edge light */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(40% 12% at 50% 96%, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 70%)",
          }}
        />
      </motion.div>
    </div>
  );
}
