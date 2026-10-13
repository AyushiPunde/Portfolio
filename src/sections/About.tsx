import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { User, Linkedin, Github, ChevronDown } from "lucide-react";
import { MagneticButton } from "../components/MagneticButton";
import { EASE, Reveal } from "../components/Motion";
import {
  ScribbleUnderline,
  DoodleStar,
  SparkleBurst,
  HalftoneDots,
  TapeStrip,
  Squiggle,
  DashedArrow,
} from "../components/Doodles";

export const LINKEDIN = "https://www.linkedin.com/in/ayushi-punde-9520a0366";
export const GITHUB = "https://github.com/AyushiPunde";

const STATS = [
  { value: "500+", label: "News articles analysed with FinBERT" },
  { value: "2", label: "Data projects built" },
  { value: "5", label: "Certifications earned" },
];

const MORE_INFO = [
  "Most recently I built MarketPulse-AI, a platform that pulls in financial news and live market data, scores sentiment with FinBERT and uses a retrieval pipeline to reduce AI hallucinations. Before that, I built a system that detects epileptic activity in EEG signals.",
  "I finished a B.Tech in Computer Science Engineering and then completed a Post Graduate Diploma in Big Data Analytics at C-DAC.",
  "Outside of work I enjoy gaming, badminton and trekking, and I'm curious about Generative AI. I speak Hindi, Marathi and English, and I've volunteered at college cultural events and blood donation camps.",
];

export function About() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section id="about" className="relative overflow-x-hidden px-6 py-20 md:px-12">
      <HalftoneDots className="pointer-events-none absolute left-2 top-6 h-24 w-40 text-(--color-secondary) opacity-25 md:left-10" />
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 md:grid-cols-2">
        <Reveal className="relative flex justify-center">
          <div className="relative -rotate-2 rounded-[2rem] bg-(--color-surface) p-6 shadow-[8px_10px_0_0_var(--color-shadow)]">
            <TapeStrip color="var(--color-warm)" className="absolute -top-3 left-10 z-10" />
            <img
              src={`${import.meta.env.BASE_URL}img/ayushi-portrait.png`}
              alt="Illustration of Ayushi working on a laptop with charts"
              loading="lazy"
              className="w-64 rounded-2xl md:w-72"
            />
            <SparkleBurst className="pointer-events-none absolute -right-4 -top-4 h-9 w-9 text-(--color-primary)" />
            <DoodleStar className="pointer-events-none absolute -bottom-3 -left-3 h-6 w-6 text-(--color-accent)" />
            <div className="pointer-events-none absolute -right-10 top-1/3 hidden rotate-3 rounded-xl bg-(--color-warm) px-3 py-1.5 font-display text-xs font-extrabold text-(--color-on-warm) shadow-[3px_4px_0_0_var(--color-bg)] sm:block">
              Hi there!
            </div>
            <Squiggle className="pointer-events-none absolute -bottom-8 left-1/2 h-4 w-24 -translate-x-1/2 text-(--color-text)/20" />
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="font-display text-sm font-extrabold uppercase tracking-widest text-(--color-primary)">
            &#9673; About Me
          </p>
          <h2 className="relative mt-2 inline-block font-display text-3xl font-extrabold tracking-tight md:text-4xl">
            Hi, I&rsquo;m Ayushi &mdash; I turn data into stories.
            <ScribbleUnderline className="absolute -bottom-2 left-0 h-3 w-full text-(--color-secondary)" />
          </h2>
          <p className="mt-5 max-w-lg text-(--color-text)/85">
            I&rsquo;m an aspiring data analyst who enjoys turning raw data into insights people can act on. I work with
            Python, SQL, Excel and Power BI, and I like cleaning messy data, exploring it and telling the story behind
            it. One highlight so far is running sentiment analysis on 500+ financial news articles with FinBERT.
            I&rsquo;m now looking for an entry-level data analyst role where I can put these skills to work.
          </p>

          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="overflow-hidden"
              >
                <div className="mt-4 max-w-lg space-y-3 border-l-2 border-dashed border-(--color-primary)/40 pl-4 text-(--color-text)/80">
                  {MORE_INFO.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-8 flex flex-wrap gap-8">
            {STATS.map((s) => (
              <div key={s.label} className="max-w-[9rem]">
                <p className="font-display text-3xl font-extrabold text-(--color-primary)">{s.value}</p>
                <p className="text-sm text-(--color-muted)">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="relative mt-9 flex flex-wrap items-center gap-4">
            <DashedArrow className="pointer-events-none absolute -top-9 left-6 hidden h-8 w-16 -rotate-[100deg] text-(--color-text)/30 sm:block" />
            <MagneticButton
              onClick={() => setExpanded((v) => !v)}
              aria-expanded={expanded}
              className="glow-hover flex items-center gap-2 rounded-full bg-(--color-primary) px-7 py-4 font-display text-sm font-extrabold text-(--color-on-primary) shadow-[4px_6px_0_0_var(--color-shadow)] hover:bg-(--color-primary-hover)"
            >
              <User size={16} />
              {expanded ? "Show Less" : "More About Me"}
              <ChevronDown size={16} className={`transition-transform duration-300 ${expanded ? "rotate-180" : ""}`} />
            </MagneticButton>
            <div className="flex items-center gap-3">
              <a
                href={LINKEDIN}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="grow"
                aria-label="LinkedIn"
                className="glow-hover flex h-11 w-11 items-center justify-center rounded-full border-2 border-(--color-border-strong) hover:border-(--color-primary) hover:text-(--color-primary)"
              >
                <Linkedin size={18} />
              </a>
              <a
                href={GITHUB}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="grow"
                aria-label="GitHub"
                className="glow-hover flex h-11 w-11 items-center justify-center rounded-full border-2 border-(--color-border-strong) hover:border-(--color-primary) hover:text-(--color-primary)"
              >
                <Github size={18} />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
