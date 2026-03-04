import Hero from "./sections/Hero"; 
import Skills from "./sections/Skills"; // Import the new Skills section
import Projects from "./sections/Projects";

export default function Home() {
  return (
    <div className="bg-[#0a0a0c] min-h-screen selection:bg-indigo-500/30 selection:text-indigo-200">
      
      <main>
        {/* 1. Identity */}
        <Hero />
        
        <div className="h-px w-full bg-gradient-to-r from-transparent via-indigo-500/10 to-transparent" />
        <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent" />

        {/* 3. Impact */}
        <Projects />
      </main>
      
      <footer className="py-20 text-center bg-[#0a0a0c] border-t border-white/5">
        <p className="text-slate-500 font-mono text-xs tracking-[0.3em] uppercase mb-4">
          Built with Resilience & Logic
        </p>
        <div className="text-slate-600 text-sm font-light">
          © {new Date().getFullYear()} KHUSHI PATEL — Designed with Intent
        </div>
      </footer>
    </div>
  );
}