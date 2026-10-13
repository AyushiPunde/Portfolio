import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const enabled = () =>
  !matchMedia("(pointer: coarse)").matches && !matchMedia("(prefers-reduced-motion: reduce)").matches;

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [grow, setGrow] = useState(false);
  const on = enabled();

  useEffect(() => {
    if (!on) return;
    document.documentElement.classList.add("has-custom-cursor");

    const dotX = gsap.quickTo(dotRef.current!, "x", { duration: 0.06, ease: "power3.out" });
    const dotY = gsap.quickTo(dotRef.current!, "y", { duration: 0.06, ease: "power3.out" });
    const ringX = gsap.quickTo(ringRef.current!, "x", { duration: 0.18, ease: "power3.out" });
    const ringY = gsap.quickTo(ringRef.current!, "y", { duration: 0.18, ease: "power3.out" });
    const glowX = gsap.quickTo(glowRef.current!, "x", { duration: 0.4, ease: "power3.out" });
    const glowY = gsap.quickTo(glowRef.current!, "y", { duration: 0.4, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
      glowX(e.clientX);
      glowY(e.clientY);
    };
    const onOver = (e: MouseEvent) => {
      setGrow(!!(e.target as HTMLElement).closest('[data-cursor="grow"], a, button'));
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, [on]);

  if (!on) return null;

  return (
    <>
      <div
        ref={glowRef}
        className="pointer-events-none fixed left-0 top-0 z-[90] -ml-40 -mt-40 h-80 w-80 rounded-full opacity-40"
        style={{ background: "radial-gradient(circle, var(--color-glow), transparent 65%)" }}
      />
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[100] -ml-1 -mt-1 h-2 w-2 rounded-full bg-(--color-primary)"
      />
      <div
        ref={ringRef}
        className={`pointer-events-none fixed left-0 top-0 z-[100] -ml-5 -mt-5 h-10 w-10 rounded-full border-2 border-(--color-primary) transition-transform duration-300 ${
          grow ? "scale-150" : "scale-100"
        }`}
      />
    </>
  );
}
