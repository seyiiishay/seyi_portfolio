/**
 * Projects — "Selected Work" grid.
 *
 * Each card (ProjectCard) alternates image/text sides, applies a subtle scroll
 * parallax to the image, and reveals colour + zoom on hover.
 *
 * Links: `primaryUrl` = live URL if present, else GitHub URL, else null.
 *  - Real URLs open in a new tab (target=_blank + rel=noopener noreferrer).
 *  - Cards with no real URL are intentionally non-navigating.
 *  - "View Live" / "Source" buttons render only when their URL is real.
 * Missing images (onError) fall back to a numbered gradient placeholder so a
 * broken-image icon never appears. Project data lives in src/data.js.
 */
import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { PROJECTS } from "../data";

// Treat "#" / empty as a placeholder (not a working link).
const isReal = (url) => url && url !== "#";

function ProjectCard({ project, index }) {
  const ref = useRef(null); // image wrapper (drives parallax)
  const [imgError, setImgError] = useState(false); // swap to placeholder on 404
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]); // parallax drift
  const isEven = index % 2 === 0; // alternate layout sides

  // Prefer the live site; fall back to GitHub; else no link.
  const primaryUrl = isReal(project.liveUrl)
    ? project.liveUrl
    : isReal(project.githubUrl)
      ? project.githubUrl
      : null;

  return (
    <Reveal>
      <div
        data-testid={`project-${project.id}`}
        className="group grid grid-cols-1 items-center gap-8 border-t border-white/10 py-12 md:grid-cols-12 md:gap-12 md:py-20"
      >
        {/* Image — clipped, spotlight (links to primary url) */}
        <div
          className={`relative order-1 md:col-span-7 ${
            isEven ? "md:order-1" : "md:order-2"
          }`}
        >
          <a
            href={primaryUrl || undefined}
            target={primaryUrl ? "_blank" : undefined}
            rel={primaryUrl ? "noopener noreferrer" : undefined}
            data-cursor="hover"
            data-testid={`project-${project.id}-image-link`}
            aria-label={`Open ${project.title}`}
            className={`block ${primaryUrl ? "cursor-pointer" : "cursor-default"}`}
            onClick={(e) => {
              if (!primaryUrl) e.preventDefault();
            }}
          >
            <div
              ref={ref}
              className="relative aspect-[4/3] overflow-hidden bg-[#121212]"
            >
              {!imgError ? (
                <motion.img
                  style={{ y: imgY, scale: 1.25 }}
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  onError={() => setImgError(true)}
                  className="h-full w-full object-cover opacity-95 transition-opacity duration-700 ease-out group-hover:opacity-100"
                />
              ) : (
                <div
                  className="flex h-full w-full items-center justify-center"
                  style={{
                    background:
                      "radial-gradient(120% 120% at 30% 20%, #23252d 0%, #0c0d11 60%, #050506 100%)",
                  }}
                >
                  <span className="font-display text-7xl font-black tracking-tighter text-white/10 md:text-8xl">
                    {project.id}
                  </span>
                </div>
              )}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050505]/25 to-transparent" />
              <span className="absolute left-5 top-5 font-mono text-xs uppercase tracking-[0.2em] text-white/70">
                {project.year}
              </span>
            </div>
          </a>
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
            <a
              href={primaryUrl || undefined}
              target={primaryUrl ? "_blank" : undefined}
              rel={primaryUrl ? "noopener noreferrer" : undefined}
              data-cursor="hover"
              data-testid={`project-${project.id}-title-link`}
              onClick={(e) => {
                if (!primaryUrl) e.preventDefault();
              }}
              className="font-display text-3xl font-bold uppercase tracking-tight text-white transition-colors duration-300 hover:text-[#a1a1aa] md:text-4xl"
            >
              {project.title}
            </a>
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

          {/* Action links */}
          {(isReal(project.liveUrl) || isReal(project.githubUrl)) && (
            <div className="mt-8 flex flex-wrap items-center gap-4">
              {isReal(project.liveUrl) && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="hover"
                  data-testid={`project-${project.id}-live`}
                  className="group/link inline-flex items-center gap-2 border border-white/20 px-5 py-3 font-mono text-xs uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:border-white hover:bg-white hover:text-[#050505]"
                >
                  View Live
                  <ArrowUpRight
                    size={14}
                    className="transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                  />
                </a>
              )}
              {isReal(project.githubUrl) && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="hover"
                  data-testid={`project-${project.id}-github`}
                  className="group/link inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-[#a1a1aa] transition-colors duration-300 hover:text-white"
                >
                  Source
                  <ArrowUpRight
                    size={14}
                    className="transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                  />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
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
