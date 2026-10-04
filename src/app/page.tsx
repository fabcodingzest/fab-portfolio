import Nav from "@/components/Nav";
import SectionRail from "@/components/SectionRail";
import Intro from "@/components/Intro";
import CaseStudy from "@/components/CaseStudy";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import NextRole from "@/components/NextRole";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Nav />
      <SectionRail />
      <main>
        <Intro />
        <CaseStudy />
        <Experience />
        <Skills />
        <Projects />
        <NextRole />
      </main>
      <Contact />
    </>
  );
}
