import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";

export function CTA() {
  return (
    <section className="py-32 relative overflow-hidden bg-[#0a0a0a]">
      {/* Glow effect */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight">
          Ship better code. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            Every PR.
          </span>
        </h2>
        <p className="text-xl text-zinc-400 mb-12 max-w-2xl mx-auto">
          Join the new standard of code review. Trusted by open source
          maintainers and engineering teams worldwide.
        </p>
        <div className="flex justify-center">
          <Button
            size="lg"
            className="h-16 px-10 rounded-full bg-white text-black hover:bg-zinc-200 text-lg font-bold shadow-2xl shadow-blue-900/20 hover:shadow-blue-900/40 transition-all hover:-translate-y-1"
          >
            <Github className="mr-2 w-5 h-5" />
            Install on GitHub
          </Button>
        </div>
      </div>
    </section>
  );
}
