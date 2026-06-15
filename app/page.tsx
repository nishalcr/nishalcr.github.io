"use client";

import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Progress from "@/components/Progress";
import { About, Experience, Projects, Skills, Contact, Footer } from "@/components/Sections";
import { useReveal } from "@/components/useReveal";
import { useEffects } from "@/components/useEffects";

export default function Page() {
  useReveal();
  useEffects();

  return (
    <>
      <Progress />
      <Nav />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
