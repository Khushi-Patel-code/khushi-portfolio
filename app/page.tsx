import Hero from "./sections/Hero"; // Adjust path based on your folder structure

export default function Home() {
  return (
    /* We use 'dark' class or a dark background to match the Hero's vibe */
    <div className="bg-[#0a0a0c] min-h-screen selection:bg-indigo-500/30">
      {/* Optional: Add a simple nav or just let the Hero shine */}
      <main>
        <Hero />
        
        {/* Placeholder for your next section to test scrolling */}
        <section id="projects" className="min-h-screen bg-[#0a0a0c] flex items-center justify-center border-t border-white/5">
          <h2 className="text-white/20 text-4xl font-bold tracking-widest uppercase">
            Project Gallery Coming Soon
          </h2>
        </section>
      </main>
      
      <footer className="py-10 text-center text-slate-600 text-sm border-t border-white/5 bg-[#0a0a0c]">
        © {new Date().getFullYear()} — Designed with Intent
      </footer>
    </div>
  );
}