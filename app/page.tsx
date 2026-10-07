import Hero from "./sections/Hero";
import Projects from "./sections/Projects";
import Experience from "./sections/Experience";
import Skills from "./sections/Skills";
import Closing from "./sections/Closing";
import Nav from "./components/Nav";
import { ViewProvider } from "./components/ViewContext";

export default function Home() {
  return (
    <ViewProvider>
      <Nav />
      <main>
        <Hero />
        <Projects />
        <Experience />
        <Skills />
        <Closing />
      </main>
      <footer className="max-w-5xl mx-auto px-6 md:px-10 py-10 border-t border-rule text-sm text-muted">
        © {new Date().getFullYear()} Khushi Patel. Set in Fraunces and Krub.
      </footer>
    </ViewProvider>
  );
}
