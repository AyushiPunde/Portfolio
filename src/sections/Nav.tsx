import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Menu, X } from "lucide-react";
import { DoodleStar, ScribbleUnderline } from "../components/Doodles";
import { EASE } from "../components/Motion";

const LINKS = [
  { label: "Home", id: "top" },
  { label: "Projects", id: "projects" },
  { label: "Skills", id: "skills" },
  { label: "Education", id: "education" },
  { label: "About", id: "about" },
  { label: "Contact", id: "contact" },
];

export function Nav() {
  const reduce = useReducedMotion();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("top");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      if (Math.abs(y - last) > 6) {
        setHidden(y > last && y > 160);
        last = y;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const els = LINKS.map((l) => document.getElementById(l.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <motion.header
      initial={reduce ? false : { y: -30, opacity: 0 }}
      animate={{ y: hidden && !open ? "-110%" : 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: EASE }}
      className={`fixed left-0 right-0 top-0 z-40 transition-colors duration-500 ${
        scrolled || open ? "bg-(--color-overlay) backdrop-blur-md" : ""
      }`}
    >
      <div className="flex items-center justify-between px-6 py-5 md:px-12">
        <a href="#top" onClick={go("top")} data-cursor="grow" className="relative font-display text-xl font-extrabold tracking-tight">
          AYUSHI<span className="text-(--color-primary)">.</span>
          <DoodleStar className="pointer-events-none absolute -right-4 -top-3 h-3.5 w-3.5 rotate-12 text-(--color-accent)" />
        </a>
        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
          {LINKS.map((l) => {
            const on = active === l.id;
            return (
              <a
                key={l.id}
                href={`#${l.id}`}
                onClick={go(l.id)}
                data-cursor="grow"
                aria-current={on ? "true" : undefined}
                className={`group relative text-sm font-medium transition-colors duration-300 hover:text-(--color-primary) ${
                  on ? "text-(--color-primary)" : "text-(--color-text)/80"
                }`}
              >
                {l.label}
                <ScribbleUnderline
                  className={`absolute -bottom-2 left-0 h-2 w-full text-(--color-primary) transition-opacity duration-300 ${
                    on ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                  }`}
                />
              </a>
            );
          })}
        </nav>
        <button
          data-cursor="grow"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-dashed border-(--color-border-strong) text-(--color-text) md:hidden"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="flex flex-col gap-1 px-6 pb-5 md:hidden"
            aria-label="Mobile"
          >
            {LINKS.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                onClick={go(l.id)}
                className={`rounded-xl px-3 py-3 font-display text-base font-extrabold ${
                  active === l.id ? "bg-(--color-surface) text-(--color-primary)" : "text-(--color-text)"
                }`}
              >
                {l.label}
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
