import { useState } from "react";
import { toast } from "sonner";
import { ArrowUpRight } from "lucide-react";
import { Reveal, MaskReveal } from "./Reveal";
import { PROFILE } from "../data";

const isReal = (url) => url && url !== "#";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in every field.");
      return;
    }
    toast.success("Message ready — this is a demo form for now.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section
      id="contact"
      data-testid="contact-section"
      className="relative border-t border-white/10 bg-[#0a0a0a] px-6 py-28 md:px-12 md:py-40 lg:px-24"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-20 md:mb-28">
          <Reveal>
            <span className="mb-8 block font-mono text-xs uppercase tracking-[0.3em] text-[#8a8a94]">
              [ Get in touch ]
            </span>
          </Reveal>
          <h2 className="font-display text-6xl font-black uppercase leading-[0.85] tracking-tighter text-white sm:text-7xl md:text-8xl lg:text-[10vw]">
            <MaskReveal>Let&apos;s</MaskReveal>
            <MaskReveal delay={0.08}>Talk.</MaskReveal>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-16 md:grid-cols-12 md:gap-12">
          {/* Form */}
          <div className="md:col-span-7">
            <form
              onSubmit={onSubmit}
              data-testid="contact-form"
              className="flex flex-col gap-10"
            >
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="name"
                  className="font-mono text-xs uppercase tracking-[0.2em] text-[#8a8a94]"
                >
                  01 / Your name
                </label>
                <input
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  data-testid="contact-name"
                  placeholder="John Appleseed"
                  className="w-full border-b border-white/20 bg-transparent py-3 font-mono text-lg text-white placeholder:text-[#7d7d86] transition-colors duration-300 focus:border-white focus:outline-none focus:ring-0"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="email"
                  className="font-mono text-xs uppercase tracking-[0.2em] text-[#8a8a94]"
                >
                  02 / Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={onChange}
                  data-testid="contact-email"
                  placeholder="you@studio.com"
                  className="w-full border-b border-white/20 bg-transparent py-3 font-mono text-lg text-white placeholder:text-[#7d7d86] transition-colors duration-300 focus:border-white focus:outline-none focus:ring-0"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="message"
                  className="font-mono text-xs uppercase tracking-[0.2em] text-[#8a8a94]"
                >
                  03 / Tell me about the project
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={onChange}
                  data-testid="contact-message"
                  rows={3}
                  placeholder="I'm building something ambitious..."
                  className="w-full resize-none border-b border-white/20 bg-transparent py-3 font-mono text-lg text-white placeholder:text-[#7d7d86] transition-colors duration-300 focus:border-white focus:outline-none focus:ring-0"
                />
              </div>

              <button
                type="submit"
                data-testid="contact-submit-btn"
                data-cursor="hover"
                className="group mt-4 flex w-full items-center justify-between border border-white/20 px-8 py-6 transition-colors duration-300 hover:border-white hover:bg-white md:w-auto md:gap-16"
              >
                <span className="font-display text-lg font-bold uppercase tracking-tight text-white transition-colors duration-300 group-hover:text-[#050505]">
                  Send Message
                </span>
                <ArrowUpRight
                  size={24}
                  className="text-white transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#050505]"
                />
              </button>
            </form>
          </div>

          {/* Direct details */}
          <div className="md:col-span-5 md:pl-12">
            <div className="flex flex-col gap-12">
              <div>
                <span className="mb-3 block font-mono text-xs uppercase tracking-[0.2em] text-[#8a8a94]">
                  Email
                </span>
                <a
                  href={`mailto:${PROFILE.email}`}
                  data-testid="contact-email-link"
                  className="font-display text-xl font-medium text-white underline-offset-4 transition-colors duration-300 hover:underline md:text-2xl"
                >
                  {PROFILE.email}
                </a>
              </div>

              <div>
                <span className="mb-3 block font-mono text-xs uppercase tracking-[0.2em] text-[#8a8a94]">
                  Based in
                </span>
                <p className="font-display text-xl font-medium text-white md:text-2xl">
                  {PROFILE.location}
                </p>
              </div>

              <div>
                <span className="mb-4 block font-mono text-xs uppercase tracking-[0.2em] text-[#8a8a94]">
                  Elsewhere
                </span>
                <div className="flex flex-col gap-3">
                  {PROFILE.socials.filter((s) => isReal(s.href)).length ===
                  0 ? (
                    <span className="font-mono text-sm text-[#8a8a94]">
                      Links coming soon.
                    </span>
                  ) : (
                    PROFILE.socials
                      .filter((s) => isReal(s.href))
                      .map((s) => (
                        <a
                          key={s.label}
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-cursor="hover"
                          data-testid={`social-${s.label.toLowerCase().replace(/[^a-z]/g, "")}`}
                          className="group flex w-fit items-center gap-2 font-mono text-sm text-[#a1a1aa] transition-colors duration-300 hover:text-white"
                        >
                          {s.label}
                          <ArrowUpRight
                            size={14}
                            className="opacity-0 transition-all duration-300 group-hover:opacity-100"
                          />
                        </a>
                      ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
