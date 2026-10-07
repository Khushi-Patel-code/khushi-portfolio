import Hero from "./sections/Hero";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Experience from "./sections/Experience";
import Projects from "./sections/Projects";
import CaseStudyTeaser from "./sections/CaseStudyTeaser";
import Closing from "./sections/Closing";
import Nav from "./components/Nav";
import { ViewProvider } from "./components/ViewContext";

export default function Home() {
  return (
    <ViewProvider>
      <div className="bg-[#0a0a0c] min-h-screen overflow-x-clip selection:bg-indigo-500/30 selection:text-indigo-200">
        <Nav />
        <main>
          <Hero />
          <About />
          <Experience />
          <CaseStudyTeaser />
          <Projects />
          <Skills />
          <Closing />
        </main>

        <footer className="py-12 text-center bg-[#0a0a0c] border-t border-white/5">
          <div className="text-slate-600 text-sm font-light">
            © {new Date().getFullYear()} Khushi Patel
          </div>
        </footer>
      </div>
    </ViewProvider>
  );
}
