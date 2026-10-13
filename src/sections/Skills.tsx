import { motion } from "motion/react";
import { Code2, BarChart3, Boxes, Database, BrainCircuit, Workflow, Cloud } from "lucide-react";
import { ScribbleUnderline, DoodleStar, DashedArrow, HalftoneDots, SparkleBurst } from "../components/Doodles";
import { Reveal, useTilt } from "../components/Motion";

const GROUPS = [
  { name: "Programming", icon: Code2, accent: "--color-primary", items: ["Python", "SQL"] },
  {
    name: "Data Analysis & Visualization",
    icon: BarChart3,
    accent: "--color-warm",
    items: ["Data Cleaning", "EDA", "Excel", "Power BI", "Tableau", "Matplotlib", "Seaborn"],
  },
  {
    name: "Libraries & Frameworks",
    icon: Boxes,
    accent: "--color-cool",
    items: ["Pandas", "NumPy", "FastAPI", "BeautifulSoup", "ChromaDB", "APScheduler"],
  },
  { name: "Databases", icon: Database, accent: "--color-accent", items: ["MySQL", "SQLite"] },
  {
    name: "Machine Learning",
    icon: BrainCircuit,
    accent: "--color-secondary",
    items: ["SVM", "Feature Engineering", "Model Evaluation", "FinBERT"],
  },
  {
    name: "Data Engineering",
    icon: Workflow,
    accent: "--color-warm",
    items: ["ETL", "Data Pipelines", "REST API Development", "RAG"],
  },
  { name: "Cloud", icon: Cloud, accent: "--color-cool", items: ["AWS (S3, EC2)", "Databricks"] },
];

const on = (accent: string) => accent.replace("--color-", "--color-on-");

function GroupCard({ g, i }: { g: (typeof GROUPS)[number]; i: number }) {
  const tilt = useTilt(6);
  const Icon = g.icon;
  return (
    <Reveal delay={(i % 3) * 0.08}>
      <div
        {...tilt}
        className="group relative h-full rounded-2xl border-2 border-dashed border-(--color-border) bg-(--color-surface) p-5 shadow-[4px_5px_0_0_var(--color-shadow)] will-change-transform"
      >
        <div className="flex items-center gap-3">
          <span
            className="flex h-10 w-10 flex-none items-center justify-center rounded-full"
            style={{ backgroundColor: `var(${g.accent})`, color: `var(${on(g.accent)})` }}
          >
            <Icon size={18} />
          </span>
          <h3 className="font-display text-base font-extrabold leading-tight">{g.name}</h3>
        </div>
        <ul className="mt-4 flex flex-wrap gap-2">
          {g.items.map((s) => (
            <motion.li
              key={s}
              whileHover={{ scale: 1.1, y: -2 }}
              transition={{ type: "spring", stiffness: 320, damping: 16 }}
              className="rounded-full border border-(--color-border-strong) bg-(--color-bg)/60 px-3 py-1 text-sm font-medium text-(--color-text)/90"
            >
              {s}
            </motion.li>
          ))}
        </ul>
        <DoodleStar className="pointer-events-none absolute -right-2 -top-2 h-4 w-4 rotate-6 text-(--color-accent) opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>
    </Reveal>
  );
}

export function Skills() {
  return (
    <section id="skills" className="relative overflow-hidden px-6 py-20 md:px-12">
      <HalftoneDots className="pointer-events-none absolute bottom-4 right-2 h-24 w-40 text-(--color-primary) opacity-25 md:right-12" />
      <DoodleStar className="pointer-events-none absolute left-[5%] top-4 h-5 w-5 text-(--color-cool) opacity-70" />
      <SparkleBurst className="pointer-events-none absolute right-[6%] top-10 h-6 w-6 text-(--color-warm) opacity-70" />
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="font-display text-sm font-extrabold uppercase tracking-widest text-(--color-primary)">
            &#9673; Skills
          </p>
          <h2 className="relative mt-2 inline-block font-display text-3xl font-extrabold tracking-tight md:text-4xl">
            Tools that turn data into answers
            <ScribbleUnderline className="absolute -bottom-2 left-0 h-3 w-full text-(--color-primary)" />
          </h2>
          <DashedArrow className="pointer-events-none mt-1 hidden h-8 w-16 text-(--color-text)/30 sm:block" />
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" style={{ perspective: 1200 }}>
          {GROUPS.map((g, i) => (
            <GroupCard key={g.name} g={g} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
