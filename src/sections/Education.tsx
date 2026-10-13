import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { Award, GraduationCap } from "lucide-react";
import { DoodleStar, HalftoneDots, ScribbleUnderline, SparkleBurst, TapeStrip } from "../components/Doodles";
import { Reveal } from "../components/Motion";

const EDUCATION = [
  {
    school: "Centre for Development of Advanced Computing (C-DAC)",
    degree: "Post Graduate Diploma in Big Data Analytics",
    detail: "Grade: B",
    years: "Aug 2025 – Feb 2026",
    place: "Navi Mumbai, India",
    accent: "--color-primary",
  },
  {
    school: "Nutan College of Engineering and Research",
    degree: "B.Tech in Computer Science Engineering",
    detail: "CGPA: 6.94",
    years: "2021 – 2025",
    place: "Pune, India",
    accent: "--color-secondary",
  },
  {
    school: "Horizon English Medium School and Jr. College",
    degree: "12th Science",
    detail: "78%",
    years: "2021",
    place: "Pune, India",
    accent: "--color-cool",
  },
  {
    school: "Priyadarshani High School",
    degree: "10th Grade",
    detail: "66%",
    years: "2019",
    place: "Pune, India",
    accent: "--color-warm",
  },
];

const CERTS = [
  "AWS Academy Graduate – Data Engineering",
  "AWS Academy Graduate – Cloud Foundations",
  "AWS Academy – Generative AI Foundations",
  "Databricks Fundamentals Accreditation – Databricks",
  "Excel Basics for Data Analysis – Coursera",
];

export function Education() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const draw = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <section id="education" className="relative overflow-hidden px-6 py-20 md:px-12">
      <HalftoneDots className="pointer-events-none absolute right-2 top-6 h-24 w-40 text-(--color-secondary) opacity-30 md:right-10" />
      <DoodleStar className="pointer-events-none absolute left-[4%] top-10 h-5 w-5 text-(--color-accent) opacity-70" />
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="font-display text-sm font-extrabold uppercase tracking-widest text-(--color-primary)">
            &#9673; Education
          </p>
          <h2 className="relative mt-2 inline-block font-display text-3xl font-extrabold tracking-tight md:text-4xl">
            Where I&rsquo;ve learned
            <ScribbleUnderline className="absolute -bottom-2 left-0 h-3 w-full text-(--color-secondary)" />
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div ref={ref} className="relative pl-10 md:pl-14">
            <div className="absolute bottom-2 left-[11px] top-2 w-0.5 rounded-full bg-(--color-border) md:left-[15px]" />
            <motion.div
              style={{ scaleY: reduce ? 1 : draw, transformOrigin: "top" }}
              className="absolute bottom-2 left-[11px] top-2 w-0.5 rounded-full bg-(--color-primary) shadow-[0_0_12px_var(--color-glow)] md:left-[15px]"
            />
            <ol className="space-y-10">
              {EDUCATION.map((e, i) => (
                <li key={e.school} className="relative">
                  <span
                    className="absolute -left-10 top-1.5 flex h-6 w-6 items-center justify-center rounded-full border-4 border-(--color-bg) md:-left-14 md:h-8 md:w-8"
                    style={{ backgroundColor: `var(${e.accent})` }}
                  >
                    {i === 0 && <GraduationCap size={14} className="text-(--color-bg)" />}
                  </span>
                  <Reveal delay={0.05}>
                    <div className="rounded-2xl border-2 border-dashed border-(--color-border) bg-(--color-surface) p-5 shadow-[4px_5px_0_0_var(--color-shadow)]">
                      <p className="font-display text-xs font-extrabold uppercase tracking-widest text-(--color-muted)">
                        {e.years}
                      </p>
                      <h3 className="mt-1 font-display text-lg font-extrabold leading-snug">{e.school}</h3>
                      <p className="mt-1 text-(--color-text)/85">
                        {e.degree} <span className="text-(--color-muted)">— {e.detail}</span>
                      </p>
                      <p className="mt-1 text-sm text-(--color-muted)">{e.place}</p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>

          <Reveal delay={0.1}>
            <div className="relative h-fit rounded-3xl border-2 border-dashed border-(--color-border-strong) bg-(--color-surface) p-6 shadow-[8px_10px_0_0_var(--color-shadow)] lg:sticky lg:top-28">
              <TapeStrip color="var(--color-accent)" className="absolute -top-3 left-8 z-10" />
              <SparkleBurst className="pointer-events-none absolute -right-3 -top-3 h-8 w-8 text-(--color-primary)" />
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-(--color-accent) text-(--color-on-accent)">
                  <Award size={18} />
                </span>
                <h3 className="font-display text-xl font-extrabold">Certifications</h3>
              </div>
              <ul className="mt-5 space-y-3">
                {CERTS.map((c) => (
                  <li key={c} className="flex gap-3 text-sm text-(--color-text)/90">
                    <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-(--color-primary)" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
