import { useEffect } from "react";
import { Cursor } from "./components/Cursor";
import { CornerMarks } from "./components/CornerMarks";
import { ParticleField } from "./components/ParticleField";
import { Nav } from "./sections/Nav";
import { Hero } from "./sections/Hero";
import { Projects } from "./sections/Projects";
import { Skills } from "./sections/Skills";
import { Education } from "./sections/Education";
import { About } from "./sections/About";
import { Footer } from "./sections/Footer";
import { initLenis } from "./lib/lenis";
import { WavyDivider } from "./components/Doodles";

function Divider({ color }: { color: string }) {
  return (
    <div className="px-6 md:px-12">
      <WavyDivider className="mx-auto h-6 w-full max-w-6xl" color={color} />
    </div>
  );
}

export default function App() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = initLenis();
    return () => lenis.destroy();
  }, []);

  return (
    <>
      <ParticleField />
      <Cursor />
      <CornerMarks />
      <Nav />
      <main className="relative z-10">
        <Hero />
        <Divider color="var(--color-secondary)" />
        <Projects />
        <Divider color="var(--color-warm)" />
        <Skills />
        <Divider color="var(--color-cool)" />
        <Education />
        <Divider color="var(--color-accent)" />
        <About />
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
    </>
  );
}
