import { lazy, Suspense } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Sparkles, ArrowUpRight, ChevronDown, Star } from "lucide-react";
import { MagneticButton } from "../components/MagneticButton";
import { EASE, Typewriter } from "../components/Motion";
import { SceneFallback } from "../components/HeroScene";
import {
  ScribbleUnderline,
  DashedArrow,
  DoodleStar,
  HalftoneDots,
  SparkleBurst,
  Squiggle,
  ComicBurst,
} from "../components/Doodles";

const HeroScene = lazy(() => import("../components/HeroScene"));

const container = { hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } } };
const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

function NameLine({ text, delay, reduce }: { text: string; delay: number; reduce: boolean | null }) {
  return (
    <span className="block overflow-hidden pb-1" aria-hidden="true">
      {text.split("").map((c, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={reduce ? false : { y: "105%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: EASE, delay: delay + i * 0.05 }}
        >
          {c}
        </motion.span>
      ))}
    </span>
  );
}

export function Hero() {
  const reduce = useReducedMotion();
  return (
    <section id="top" className="relative overflow-hidden px-6 pb-24 pt-32 md:px-12 md:pt-40">
      <div className="pointer-events-none absolute -left-16 top-24 h-64 w-64 rounded-full bg-(--color-secondary)/25 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-52 h-72 w-72 rounded-full bg-(--color-primary)/15 blur-3xl" />
      <HalftoneDots className="pointer-events-none absolute bottom-10 left-4 h-28 w-44 text-(--color-cool) opacity-40 md:left-10" />
      <SparkleBurst className="pointer-events-none absolute right-[8%] top-16 h-8 w-8 text-(--color-accent) opacity-70 md:right-[28%]" />
      <DoodleStar className="pointer-events-none absolute left-[6%] top-1/2 h-5 w-5 text-(--color-warm) opacity-70" />

      <motion.div
        variants={container}
        initial={reduce ? false : "hidden"}
        animate="show"
        className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 md:grid-cols-2"
      >
        <div>
          <motion.div
            variants={item}
            className="relative mb-4 inline-flex items-center gap-2 rounded-full bg-(--color-surface) px-4 py-1.5 text-sm font-medium text-(--color-text)/80"
          >
            <Sparkles size={14} className="text-(--color-primary)" />
            Hey, I&rsquo;m
            <Squiggle className="pointer-events-none absolute -bottom-4 left-2 h-3 w-16 text-(--color-text)/25" />
          </motion.div>

          <h1
            aria-label="Ayushi Punde"
            className="relative font-display text-6xl font-extrabold leading-[0.95] tracking-tight sm:text-7xl md:text-8xl"
          >
            <NameLine text="AYUSHI" delay={0.2} reduce={reduce} />
            <NameLine text="PUNDE" delay={0.5} reduce={reduce} />
            <ScribbleUnderline className="absolute -bottom-3 left-0 h-4 w-48 text-(--color-primary) sm:w-56 md:w-64" />
          </h1>

          <motion.p variants={item} className="mt-9 max-w-md text-lg font-medium text-(--color-text)/85">
            Aspiring Data Analyst&nbsp;&middot;&nbsp;Python&nbsp;&middot;&nbsp;SQL&nbsp;&middot;&nbsp;Power BI
          </motion.p>
          <Typewriter
            text="Turning raw data into insights worth acting on."
            delay={1300}
            className="mt-3 block max-w-md min-h-14 text-base text-(--color-muted)"
          />

          <motion.div variants={item} className="relative mt-8 flex flex-wrap items-center gap-4">
            <MagneticButton
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" })}
              className="glow-hover flex items-center gap-2 rounded-full bg-(--color-primary) px-7 py-4 font-display text-sm font-extrabold text-(--color-on-primary) shadow-[4px_6px_0_0_var(--color-shadow)] hover:bg-(--color-primary-hover)"
            >
              View Projects
              <ArrowUpRight size={16} />
            </MagneticButton>
            <MagneticButton
              onClick={() => { window.location.href = "mailto:ayushipunde57@gmail.com"; }}
              className="glow-hover rounded-full border-2 border-(--color-border-strong) px-7 py-4 font-display text-sm font-extrabold text-(--color-text) hover:border-(--color-primary) hover:text-(--color-primary)"
            >
              Get in touch
            </MagneticButton>
            <DashedArrow className="pointer-events-none absolute -right-16 top-1/2 hidden h-10 w-20 -translate-y-1/2 rotate-6 text-(--color-text)/40 lg:block" />
          </motion.div>
        </div>

        <motion.div variants={item} className="relative flex justify-center md:justify-end">
          <div className="pointer-events-none absolute h-72 w-72 rounded-full bg-(--color-secondary)/35 blur-3xl" />
          <HalftoneDots className="pointer-events-none absolute -right-4 bottom-0 h-24 w-40 text-(--color-accent) opacity-40" />
          <div className="relative aspect-square w-full max-w-md">
            <Suspense fallback={<SceneFallback />}>
              <HeroScene />
            </Suspense>
            <motion.div
              animate={reduce ? undefined : { rotate: [0, 8, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              className="pointer-events-none absolute right-0 top-2 z-20 rounded-2xl bg-(--color-cool) px-4 py-2 font-display text-xs font-extrabold text-(--color-on-cool) shadow-[3px_4px_0_0_var(--color-bg)]"
            >
              Let&rsquo;s turn data<br />into stories!
            </motion.div>
            <Star className="pointer-events-none absolute left-0 top-10 z-20 text-(--color-accent)" size={28} fill="currentColor" />
            <Sparkles className="pointer-events-none absolute bottom-6 right-2 z-20 text-(--color-primary)" size={24} />
            <ComicBurst
              color="var(--color-warm)"
              className="pointer-events-none absolute bottom-10 left-0 z-20 hidden h-16 w-16 -rotate-[8deg] font-display text-[10px] font-extrabold text-(--color-on-warm) sm:flex"
            >
              EDA
            </ComicBurst>
          </div>
        </motion.div>
      </motion.div>

      <motion.a
        href="#projects"
        data-cursor="grow"
        animate={reduce ? undefined : { y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-(--color-muted) md:flex"
        aria-label="Scroll down"
      >
        <span className="font-display text-xs font-bold uppercase tracking-widest">Scroll</span>
        <ChevronDown size={18} />
      </motion.a>
    </section>
  );
}
