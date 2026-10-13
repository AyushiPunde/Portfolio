import { useEffect, useRef } from "react";
import { prefersReducedMotion, rotate, themeColors, type V3 } from "../lib/scene3d";

export function ParticleField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const mobile = window.innerWidth < 768;
    const reduced = prefersReducedMotion();
    const c = themeColors();
    const palette = [c.primary, c.secondary, c.cool];
    const count = mobile ? 40 : 90;
    const pts = Array.from({ length: count }, (_, i) => ({
      p: [(Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2] as V3,
      color: palette[i % palette.length],
      size: 1 + Math.random() * 1.6,
    }));

    let w = 0, h = 0;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, mobile ? 1.5 : 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = (t: number) => {
      const yaw = t * 0.03 + window.scrollY * 0.0006;
      const pitch = window.scrollY * 0.0003;
      ctx.clearRect(0, 0, w, h);
      const span = Math.max(w, h) * 0.75;
      for (const q of pts) {
        const r = rotate(q.p, yaw, pitch);
        const s = 3 / (3 - r[2]);
        ctx.globalAlpha = 0.25 + ((r[2] + 1) / 2) * 0.75;
        ctx.fillStyle = q.color;
        ctx.beginPath();
        ctx.arc(w / 2 + r[0] * span * s * 0.7, h / 2 + r[1] * span * s * 0.55, q.size * s, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    let raf = 0;
    const start = performance.now();
    const loop = (now: number) => {
      draw((now - start) / 1000);
      raf = requestAnimationFrame(loop);
    };
    const sync = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden && !reduced) raf = requestAnimationFrame(loop);
    };
    if (reduced) draw(0);
    document.addEventListener("visibilitychange", sync);
    sync();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-40"
    />
  );
}
