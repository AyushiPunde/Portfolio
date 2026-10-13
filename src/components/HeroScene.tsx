import { useEffect, useRef, useState } from "react";
import { BOX_EDGES, boxVerts, icosphere, prefersReducedMotion, rotate, themeColors, type V3 } from "../lib/scene3d";

const CAM = 4.2;

export default function HeroScene() {
  const ref = useRef<HTMLCanvasElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      setFailed(true);
      return;
    }
    const mobile = window.innerWidth < 768;
    const reduced = prefersReducedMotion();
    const dprCap = mobile ? 1.5 : 2;
    const colors = themeColors();
    const { verts, edges } = icosphere(mobile ? 1 : 2);
    const barColors = [colors.warm, colors.cool, colors.accent, colors.primary, colors.warm];
    const bars = Array.from({ length: mobile ? 3 : 5 }, (_, i) => ({
      r: 1.45 + (i % 3) * 0.22,
      speed: 0.35 + i * 0.07,
      phase: (i / 5) * Math.PI * 2,
      tilt: 0.45 + i * 0.12,
      verts: boxVerts(0.16, 0.22 + ((i * 37) % 5) * 0.09, 0.16),
      color: barColors[i % barColors.length],
    }));

    let w = 0, h = 0, dpr = 1;
    const resize = () => {
      const r = canvas.getBoundingClientRect();
      w = r.width;
      h = r.height;
      dpr = Math.min(window.devicePixelRatio || 1, dprCap);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMove = (e: PointerEvent) => {
      mouse.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    if (!reduced) window.addEventListener("pointermove", onMove, { passive: true });

    const project = (p: V3, scale: number): [number, number, number] => {
      const s = CAM / (CAM - p[2]);
      return [w / 2 + p[0] * scale * s, h / 2 - p[1] * scale * s, p[2]];
    };

    const draw = (t: number) => {
      mouse.x += (mouse.tx - mouse.x) * 0.06;
      mouse.y += (mouse.ty - mouse.y) * 0.06;
      const scroll = window.scrollY;
      const yaw = t * 0.22 + scroll * 0.0025 + mouse.x * 0.6;
      const pitch = 0.35 + mouse.y * 0.35 + scroll * 0.0009;
      const scale = Math.min(w, h) * 0.32;

      ctx.clearRect(0, 0, w, h);
      ctx.lineCap = "round";

      const pv = verts.map((v) => project(rotate(v, yaw, pitch), scale));
      ctx.lineWidth = 1.1;
      ctx.strokeStyle = colors.primary;
      for (const [a, b] of edges) {
        const z = (pv[a][2] + pv[b][2]) / 2;
        ctx.globalAlpha = 0.14 + ((z + 1) / 2) * 0.55;
        ctx.beginPath();
        ctx.moveTo(pv[a][0], pv[a][1]);
        ctx.lineTo(pv[b][0], pv[b][1]);
        ctx.stroke();
      }
      ctx.fillStyle = colors.secondary;
      for (const p of pv) {
        ctx.globalAlpha = 0.35 + ((p[2] + 1) / 2) * 0.65;
        ctx.beginPath();
        ctx.arc(p[0], p[1], 1.6 + ((p[2] + 1) / 2) * 1.4, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.lineWidth = 1.6;
      for (const bar of bars) {
        const a = t * bar.speed + bar.phase;
        const orbit: V3 = [Math.cos(a) * bar.r, 0, Math.sin(a) * bar.r];
        const ct = Math.cos(bar.tilt), st = Math.sin(bar.tilt);
        const center: V3 = [orbit[0], orbit[1] * ct - orbit[2] * st, orbit[1] * st + orbit[2] * ct];
        const pts = bar.verts.map((v) => {
          const r = rotate(v, a, 0.4);
          return project(rotate([r[0] + center[0], r[1] + center[1], r[2] + center[2]], yaw * 0.5, pitch), scale);
        });
        ctx.strokeStyle = bar.color;
        for (const [i, j] of BOX_EDGES) {
          ctx.globalAlpha = 0.35 + (((pts[i][2] + pts[j][2]) / 2 + 1.8) / 3.6) * 0.65;
          ctx.beginPath();
          ctx.moveTo(pts[i][0], pts[i][1]);
          ctx.lineTo(pts[j][0], pts[j][1]);
          ctx.stroke();
        }
      }
      ctx.globalAlpha = 1;
    };

    let raf = 0;
    let running = false;
    let visible = true;
    const start = performance.now();
    const loop = (now: number) => {
      draw((now - start) / 1000);
      raf = requestAnimationFrame(loop);
    };
    const sync = () => {
      const should = visible && !document.hidden && !reduced;
      if (should && !running) {
        running = true;
        raf = requestAnimationFrame(loop);
      } else if (!should && running) {
        running = false;
        cancelAnimationFrame(raf);
      }
    };
    if (reduced) draw(2);
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      sync();
    });
    io.observe(canvas);
    document.addEventListener("visibilitychange", sync);
    sync();

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  if (failed) return <SceneFallback />;
  return <canvas ref={ref} className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true" />;
}

export function SceneFallback() {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden="true">
      <div className="h-3/5 w-3/5 rounded-full border-2 border-dashed border-(--color-primary)/60" />
      <div className="absolute h-2/5 w-2/5 rounded-full border-2 border-(--color-secondary)/70" />
    </div>
  );
}
