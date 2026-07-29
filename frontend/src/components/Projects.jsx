import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { PROJECTS } from "../data";

function ProjectCard({ project, index }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const isEven = index % 2 === 0;

  return (
    <Reveal>
      <a
        href="#"
        data-testid={`project-${project.id}`}
        data-cursor="hover"
        onClick={(e) => e.preventDefault()}
        className="group grid grid-cols-1 items-center gap-8 border-t border-white/10 py-12 md:grid-cols-12 md:gap-12 md:py-20"
      >
        {/* Image — clipped, spotlight */}
        <div
          className={`relative order-1 md:col-span-7 ${
            isEven ? "md:order-1" : "md:order-2"
          }`}
        >
          <div
            ref={ref}
            className="relative aspect-[4/3] overflow-hidden bg-[#121212]"
          >
            <motion.img
              style={{ y: imgY, scale: 1.25 }}
              src={project.image}
              alt={project.title}
              loading="lazy"
              className="h-full w-full object-cover opacity-70 grayscale transition-all duration-700 ease-out group-hover:opacity-100 group-hover:grayscale-0"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050505]/60 to-transparent" />
            <span className="absolute left-5 top-5 font-mono text-xs uppercase tracking-[0.2em] text-white/70">
              {project.year}
            </span>
          </div>
        </div>

        {/* Meta */}
        <div
          className={`order-2 md:col-span-5 ${
            isEven ? "md:order-2 md:pl-8" : "md:order-1 md:pr-8"
          }`}
        >
          <span className="font-display text-6xl font-black tracking-tighter text-[#1f1f22] transition-colors duration-500 group-hover:text-white md:text-7xl">
            {project.id}
          </span>
          <div className="mt-4 flex items-start justify-between gap-4">
            <h3 className="font-display text-3xl font-bold uppercase tracking-tight text-white md:text-4xl">
              {project.title}
            </h3>
            <ArrowUpRight
              size={28}
              className="mt-1 shrink-0 text-[#8a8a94] transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white"
            />
          </div>
          <p className="mt-3 font-mono text-xs uppercase tracking-[0.2em] text-[#a1a1aa]">
            {project.category}
          </p>
          <p className="mt-6 max-w-md font-mono text-sm font-light leading-relaxed text-[#a1a1aa]">
            {project.description}
          </p>
        </div>
      </a>
    </Reveal>
  );
}

export default function Projects() {
  return (
    <section
      id="work"
      data-testid="projects-section"
      className="relative border-t border-white/10 bg-[#050505] px-6 py-28 md:px-12 md:py-40 lg:px-24"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 flex flex-col justify-between gap-6 md:mb-24 md:flex-row md:items-end">
          <Reveal>
            <span className="mb-6 block font-mono text-xs uppercase tracking-[0.3em] text-[#8a8a94]">
              [ Selected Work ]
            </span>
            <h2 className="font-display text-5xl font-black uppercase tracking-tighter text-white md:text-7xl lg:text-8xl">
              Projects
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-xs font-mono text-sm font-light leading-relaxed text-[#a1a1aa]">
              A curated selection of experiments, products and collaborations
              from 2023—2025.
            </p>
          </Reveal>
        </div>

        <div>
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
