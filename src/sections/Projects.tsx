import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { X } from "lucide-react";
import { ScribbleUnderline, TapeStrip, DoodleStar, SparkleBurst, HalftoneDots, ComicBurst } from "../components/Doodles";
import { EASE, Reveal, useTilt } from "../components/Motion";

const PROJECTS = [
  {
    title: "MarketPulse-AI",
    tag: "Data + AI",
    date: "February 2026",
    img: `${import.meta.env.BASE_URL}img/project-marketpulse.png`,
    accent: "--color-secondary",
    rotate: "-rotate-1",
    description:
      "A real-time financial intelligence platform that ingests financial news and live market data, runs FinBERT sentiment analysis and answers questions through an agentic RAG pipeline.",
    tech: ["Python", "Llama 3.2 (Ollama)", "RAG", "FinBERT", "ChromaDB", "BeautifulSoup", "FastAPI", "APScheduler"],
    bullets: [
      "Developed a real-time financial intelligence platform with a FastAPI-based backend to ingest, process, and analyze financial news and live market data.",
      "Built an agentic Retrieval-Augmented Generation (RAG) pipeline using ChromaDB and Llama 3.2, with a self-healing mechanism that refreshes stale context with live stock data to reduce AI hallucinations.",
      "Implemented a privacy-first AI pipeline by running local LLMs via Ollama for offline article summarization, and integrated FinBERT for real-time bullish/bearish sentiment analysis.",
      "Designed a scalable automation and alerting system using concurrent web scrapers and APScheduler to monitor user stock watchlists and trigger personalized, sentiment-aware email notifications.",
    ],
  },
  {
    title: "Epilepsy Detection System",
    tag: "Machine Learning",
    date: "June 2024",
    img: `${import.meta.env.BASE_URL}img/project-epilepsy.png`,
    accent: "--color-warm",
    rotate: "rotate-1",
    description:
      "A Python system that analyzes EEG signal data to detect epileptic activity, using an SVM classifier to tell normal and seizure patterns apart.",
    tech: ["Python", "Machine Learning", "SVM"],
    bullets: [
      "Developed a Python-based system that analyzes EEG signal data to detect epileptic activity.",
      "Applied data preprocessing and classification techniques, including normalization, artifact removal, and feature extraction, to differentiate normal and seizure patterns.",
      "Trained and tuned an SVM classifier using cross-validation, with a focus on a user-friendly interface to support data-driven healthcare applications.",
    ],
  },
];

type Project = (typeof PROJECTS)[number];
const on = (accent: string) => accent.replace("--color-", "--color-on-");

function ProjectCard({ p, i, onOpen }: { p: Project; i: number; onOpen: (p: Project) => void }) {
  const tilt = useTilt(8);
  return (
    <Reveal delay={i * 0.12}>
      <button
        type="button"
        onClick={() => onOpen(p)}
        data-cursor="grow"
        {...tilt}
        className={`group relative block w-full rounded-3xl border-2 border-dashed border-(--color-border) bg-(--color-surface) p-3 text-left shadow-[6px_8px_0_0_var(--color-shadow)] will-change-transform ${p.rotate}`}
      >
        <TapeStrip
          color={`var(${p.accent})`}
          className={`absolute -top-3 z-10 ${i % 2 === 0 ? "left-6 -rotate-[8deg]" : "right-6 rotate-[6deg]"}`}
        />
        {i === 0 && (
          <ComicBurst
            color="var(--color-primary)"
            className="absolute -right-4 -top-4 z-10 h-12 w-12 rotate-6 font-display text-[10px] font-extrabold text-(--color-on-primary)"
          >
            NEW
          </ComicBurst>
        )}
        <div className="overflow-hidden rounded-2xl">
          <img
            src={p.img}
            alt={`${p.title} project illustration`}
            loading="lazy"
            className="aspect-square w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        </div>
        <div className="px-1 pb-1 pt-4">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className="rounded-full px-3 py-1 text-xs font-bold"
              style={{ backgroundColor: `var(${p.accent})`, color: `var(${on(p.accent)})` }}
            >
              {p.tag}
            </span>
            <span className="text-xs font-medium text-(--color-muted)">{p.date}</span>
          </div>
          <h3 className="mt-3 font-display text-xl font-extrabold tracking-tight">{p.title}</h3>
          <p className="mt-2 text-sm text-(--color-muted)">{p.description}</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {p.tech.slice(0, 4).map((t) => (
              <span key={t} className="rounded-full border border-(--color-border) px-2.5 py-0.5 text-xs text-(--color-text)/85">
                {t}
              </span>
            ))}
            {p.tech.length > 4 && (
              <span className="rounded-full border border-(--color-border) px-2.5 py-0.5 text-xs text-(--color-muted)">
                +{p.tech.length - 4}
              </span>
            )}
          </div>
        </div>
        <DoodleStar className="pointer-events-none absolute -right-2 -top-2 h-5 w-5 text-(--color-accent) opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </button>
    </Reveal>
  );
}

export function Projects() {
  const reduce = useReducedMotion();
  const [selected, setSelected] = useState<Project | null>(null);

  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [selected]);

  return (
    <section id="projects" className="relative overflow-hidden px-6 py-20 md:px-12">
      <HalftoneDots className="pointer-events-none absolute right-4 top-2 h-24 w-40 text-(--color-warm) opacity-25 md:right-14" />
      <SparkleBurst className="pointer-events-none absolute left-[3%] top-24 h-7 w-7 text-(--color-cool) opacity-70" />
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="font-display text-sm font-extrabold uppercase tracking-widest text-(--color-primary)">
            &#9673; Projects
          </p>
          <h2 className="relative mt-2 inline-block font-display text-3xl font-extrabold tracking-tight md:text-4xl">
            Data work I&rsquo;m proud of
            <ScribbleUnderline className="absolute -bottom-2 left-0 h-3 w-full text-(--color-warm)" />
          </h2>
        </Reveal>

        <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-10 sm:grid-cols-2" style={{ perspective: 1200 }}>
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.title} p={p} i={i} onOpen={setSelected} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-(--color-shadow)/80 px-4 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={reduce ? false : { opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ duration: 0.4, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
              data-lenis-prevent
              role="dialog"
              aria-modal="true"
              aria-label={selected.title}
              className="relative max-h-[88vh] w-full max-w-xl overflow-y-auto rounded-3xl border-2 border-dashed border-(--color-border-strong) bg-(--color-surface) p-6 shadow-[8px_10px_0_0_var(--color-shadow)] sm:p-8"
            >
              <TapeStrip color={`var(${selected.accent})`} className="absolute -top-3 left-8 z-10" />
              <SparkleBurst className="pointer-events-none absolute -right-3 -top-3 h-9 w-9 text-(--color-primary)" />
              <button
                data-cursor="grow"
                onClick={() => setSelected(null)}
                aria-label="Close project details"
                className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-(--color-bg) text-(--color-text) transition-transform duration-300 hover:scale-110"
              >
                <X size={16} />
              </button>

              <div className="overflow-hidden rounded-2xl">
                <img src={selected.img} alt={`${selected.title} project illustration`} className="aspect-[16/10] w-full object-cover" />
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span
                  className="rounded-full px-3 py-1 text-xs font-bold"
                  style={{ backgroundColor: `var(${selected.accent})`, color: `var(${on(selected.accent)})` }}
                >
                  {selected.tag}
                </span>
                <span className="text-xs font-medium text-(--color-muted)">{selected.date}</span>
              </div>
              <h3 className="relative mt-3 inline-block font-display text-2xl font-extrabold tracking-tight">
                {selected.title}
                <ScribbleUnderline className="absolute -bottom-2 left-0 h-2 w-full text-(--color-primary)" />
              </h3>
              <ul className="mt-5 space-y-3 text-sm text-(--color-text)/85">
                {selected.bullets.map((b) => (
                  <li key={b} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-(--color-primary)" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {selected.tech.map((t) => (
                  <span key={t} className="rounded-full border border-(--color-border-strong) px-3 py-1 text-xs">
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
