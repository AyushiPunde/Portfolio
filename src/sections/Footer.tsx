import { Mail, Phone, Linkedin, Github } from "lucide-react";
import { MagneticButton } from "../components/MagneticButton";
import { Reveal } from "../components/Motion";
import { DoodleStar, SparkleBurst, HalftoneDots, ScribbleUnderline, Squiggle, TapeStrip } from "../components/Doodles";
import { GITHUB, LINKEDIN } from "./About";

export function Footer() {
  return (
    <footer id="contact" className="relative overflow-hidden px-6 pb-10 pt-16 md:px-12">
      <HalftoneDots className="pointer-events-none absolute left-4 top-4 h-24 w-40 text-(--color-accent) opacity-20 md:left-16" />
      <DoodleStar className="pointer-events-none absolute right-[8%] top-2 h-5 w-5 rotate-6 text-(--color-cool) opacity-60" />
      <Squiggle className="pointer-events-none absolute bottom-10 left-[6%] h-4 w-24 text-(--color-text)/15" />
      <Reveal>
        <div className="relative mx-auto max-w-6xl rounded-[2.5rem] border-2 border-dashed border-(--color-border) bg-(--color-surface) px-8 py-14 text-center shadow-[8px_10px_0_0_var(--color-shadow)] md:px-16">
          <TapeStrip color="var(--color-secondary)" className="absolute -top-3 left-1/2 z-10 -translate-x-1/2" />
          <DoodleStar className="pointer-events-none absolute -left-3 -top-3 h-8 w-8 text-(--color-accent)" />
          <SparkleBurst className="pointer-events-none absolute -right-4 -top-4 h-10 w-10 text-(--color-primary)" />
          <DoodleStar className="pointer-events-none absolute -bottom-3 right-10 h-6 w-6 text-(--color-cool)" />
          <p className="font-display text-sm font-extrabold uppercase tracking-widest text-(--color-primary)">
            &#9673; Let&rsquo;s Talk
          </p>
          <h2 className="relative mt-3 inline-block font-display text-4xl font-extrabold tracking-tight md:text-6xl">
            Hiring Data Analysts?<br /> Let&rsquo;s talk.
            <ScribbleUnderline className="absolute -bottom-3 left-1/2 h-4 w-2/3 -translate-x-1/2 text-(--color-primary)" />
          </h2>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <MagneticButton
              onClick={() => { window.location.href = "mailto:ayushipunde57@gmail.com"; }}
              className="glow-hover flex items-center gap-2 rounded-full bg-(--color-primary) px-8 py-4 font-display text-sm font-extrabold text-(--color-on-primary) shadow-[4px_6px_0_0_var(--color-shadow)] hover:bg-(--color-primary-hover)"
            >
              <Mail size={16} />
              ayushipunde57@gmail.com
            </MagneticButton>
            <MagneticButton
              onClick={() => { window.location.href = "tel:+919096942134"; }}
              className="glow-hover flex items-center gap-2 rounded-full border-2 border-(--color-border-strong) px-8 py-4 font-display text-sm font-extrabold hover:border-(--color-primary) hover:text-(--color-primary)"
            >
              <Phone size={16} /> +91-9096942134
            </MagneticButton>
          </div>
        </div>
      </Reveal>

      <div className="mx-auto mt-10 flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-(--color-muted) md:flex-row">
        <p>&copy; {new Date().getFullYear()} Ayushi Punde. All rights reserved.</p>
        <div className="flex items-center gap-3">
          <a
            href={LINKEDIN}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="grow"
            aria-label="LinkedIn"
            className="glow-hover flex h-9 w-9 items-center justify-center rounded-full border border-(--color-border-strong) hover:border-(--color-primary) hover:text-(--color-primary)"
          >
            <Linkedin size={15} />
          </a>
          <a
            href={GITHUB}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="grow"
            aria-label="GitHub"
            className="glow-hover flex h-9 w-9 items-center justify-center rounded-full border border-(--color-border-strong) hover:border-(--color-primary) hover:text-(--color-primary)"
          >
            <Github size={15} />
          </a>
        </div>
      </div>
    </footer>
  );
}
