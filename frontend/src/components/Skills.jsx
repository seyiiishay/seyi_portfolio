import Marquee from "react-fast-marquee";
import { Reveal } from "./Reveal";
import { SKILLS } from "../data";

export default function Skills() {
  return (
    <section
      id="skills"
      data-testid="skills-section"
      className="relative border-t border-white/10 bg-[#0a0a0a] py-28 md:py-40"
    >
      <div className="mb-16 px-6 md:mb-24 md:px-12 lg:px-24">
        <Reveal>
          <span className="mb-4 block font-mono text-xs uppercase tracking-[0.3em] text-[#52525b]">
            [ Capabilities ]
          </span>
          <h2 className="max-w-2xl font-display text-3xl font-bold tracking-tight text-white md:text-4xl">
            The tools I bend to my will.
          </h2>
        </Reveal>
      </div>

      {/* Editorial outline marquee */}
      <div
        className="select-none border-y border-white/10 py-8"
        aria-hidden="true"
      >
        <Marquee speed={40} gradient={false} autoFill>
          {SKILLS.map((skill, i) => (
            <span
              key={`row1-${skill}`}
              className="mx-8 font-display text-6xl font-black uppercase tracking-tighter text-stroke md:text-8xl lg:text-9xl"
            >
              {skill}
              <span className="text-stroke-solid px-6 text-4xl">◦</span>
            </span>
          ))}
        </Marquee>
      </div>

      <div className="mt-6 border-b border-white/10 py-8" aria-hidden="true">
        <Marquee speed={30} direction="right" gradient={false} autoFill>
          {SKILLS.slice()
            .reverse()
            .map((skill) => (
              <span
                key={`row2-${skill}`}
                className="text-stroke-solid mx-8 font-display text-6xl font-black uppercase tracking-tighter md:text-8xl lg:text-9xl"
              >
                {skill}
                <span className="text-stroke px-6 text-4xl">◦</span>
              </span>
            ))}
        </Marquee>
      </div>

      {/* Accessible list */}
      <ul className="sr-only">
        {SKILLS.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>
    </section>
  );
}
