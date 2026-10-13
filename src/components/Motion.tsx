import { useEffect, useState, type ElementType, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

export const EASE = [0.16, 1, 0.3, 1] as const;

export function Reveal({
  children,
  delay = 0,
  y = 24,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Typewriter({
  text,
  delay = 900,
  speed = 38,
  as: Tag = "p",
  className = "",
}: {
  text: string;
  delay?: number;
  speed?: number;
  as?: ElementType;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const [n, setN] = useState(reduce ? text.length : 0);
  const [done, setDone] = useState(!!reduce);

  useEffect(() => {
    if (reduce) {
      setN(text.length);
      return;
    }
    let i = 0;
    let iv: number;
    const to = window.setTimeout(() => {
      iv = window.setInterval(() => {
        i += 1;
        setN(i);
        if (i >= text.length) {
          clearInterval(iv);
          window.setTimeout(() => setDone(true), 1600);
        }
      }, speed);
    }, delay);
    return () => {
      clearTimeout(to);
      clearInterval(iv);
    };
  }, [text, delay, speed, reduce]);

  return (
    <Tag className={`relative ${className}`} aria-label={text}>
      <span className="invisible" aria-hidden="true">
        {text}
      </span>
      <span className={`absolute inset-0 ${done ? "" : "caret"}`} aria-hidden="true">
        {text.slice(0, n)}
      </span>
    </Tag>
  );
}

export function useTilt(max = 8) {
  const reduce = useReducedMotion();
  return {
    onPointerMove: (e: React.PointerEvent<HTMLElement>) => {
      if (reduce || e.pointerType !== "mouse") return;
      const el = e.currentTarget;
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      el.style.transition = "transform 0.12s ease-out";
      el.style.transform = `perspective(900px) rotateX(${(-py * max).toFixed(2)}deg) rotateY(${(px * max).toFixed(2)}deg) translateY(-6px) scale(1.02)`;
    },
    onPointerLeave: (e: React.PointerEvent<HTMLElement>) => {
      const el = e.currentTarget;
      el.style.transition = "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)";
      el.style.transform = "";
    },
  };
}
