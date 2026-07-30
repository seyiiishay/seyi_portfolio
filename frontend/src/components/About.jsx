/**
 * About — "manifesto" section.
 * A large masked intro statement, then numbered chapters (01/02/03) laid out on
 * a technical 12-column border grid, and finally an availability line.
 * Content (MANIFESTO array + PROFILE.availability) is edited in src/data.js.
 */
import { Reveal, MaskReveal } from "./Reveal";
import { MANIFESTO, PROFILE } from "../data";

export default function About() {
  return (
    <section
      id="about"
      data-testid="about-section"
      className="relative border-t border-white/10 bg-[#050505] px-6 py-28 md:px-12 md:py-40 lg:px-24"
    >
      <div className="mx-auto max-w-7xl">
        {/* Intro statement — each line wipes up via MaskReveal */}
        <div className="mb-24 max-w-4xl md:mb-36">
          <Reveal>
            <span className="mb-8 block font-mono text-xs uppercase tracking-[0.3em] text-[#8a8a94]">
              [ Manifesto ]
            </span>
          </Reveal>
          <h2 className="font-display text-3xl font-light leading-tight tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
            <MaskReveal>A designer who codes,</MaskReveal>
            <MaskReveal delay={0.08}>
              <span className="text-[#8a8a94]">an engineer who obsesses</span>
            </MaskReveal>
            <MaskReveal delay={0.16}>over the details.</MaskReveal>
          </h2>
        </div>

        {/* Numbered chapters — map over MANIFESTO; number brightens on hover */}
        <div className="border-t border-white/10">
          {MANIFESTO.map((chapter, i) => (
            <Reveal key={chapter.id} delay={i * 0.05}>
              <div className="group grid grid-cols-1 gap-6 border-b border-white/10 py-10 transition-colors duration-500 hover:bg-white/[0.02] md:grid-cols-12 md:gap-10 md:py-14">
                <div className="col-span-1 md:col-span-2">
                  <span className="font-display text-5xl font-black tracking-tighter text-[#1f1f22] transition-colors duration-500 group-hover:text-white md:text-6xl">
                    {chapter.id}
                  </span>
                </div>
                <div className="col-span-1 md:col-span-3">
                  <h3 className="font-display text-xl font-bold uppercase tracking-tight text-white md:text-2xl">
                    {chapter.title}
                  </h3>
                </div>
                <div className="col-span-1 md:col-span-7">
                  <p className="max-w-xl font-mono text-sm font-light leading-relaxed text-[#a1a1aa] md:text-base">
                    {chapter.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Availability line */}
        <Reveal delay={0.1}>
          <p className="mt-16 font-mono text-xs uppercase tracking-[0.25em] text-[#8a8a94]">
            {PROFILE.availability}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
