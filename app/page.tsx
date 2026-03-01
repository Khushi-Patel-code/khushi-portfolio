import Hero from "./sections/Hero"; 
import Projects from "./sections/Projects"; // Path to your new component

export default function Home() {
  return (
    /* Global wrapper with the deep-space background and indigo selection */
    <div className="bg-[#0a0a0c] min-h-screen selection:bg-indigo-500/30 selection:text-indigo-200">
      
      <main>
        {/* The Hero Section: Introduction & Identity */}
        <Hero />
        
        {/* Subtle separator glow to lead the eye to projects */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />

        {/* The Projects Section: Featured Works & Innovation */}
        <Projects />
      </main>
      
      {/* Footer: Simple, Minimalist, and Disciplined */}
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