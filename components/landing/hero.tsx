"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Github, Play } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export function Hero() {
  const container = useRef<HTMLElement>(null);
  const headline = useRef<HTMLHeadingElement>(null);
  const subline = useRef<HTMLParagraphElement>(null);
  const buttons = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from(headline.current, {
      y: 100,
      opacity: 0,
      duration: 1.5
    })
    .from(subline.current, {
      y: 20,
      opacity: 0,
      duration: 1,
    }, "-=1")
    .from(buttons.current, {
      y: 20,
      opacity: 0,
      duration: 1,
    }, "-=0.8");
  }, { scope: container });

  return (
    <section ref={container} className="relative h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      {/* Background elements moved to Scene component */}

      <div className="z-10 max-w-5xl mx-auto space-y-8">
        <h1 ref={headline} className="text-6xl md:text-8xl font-black tracking-tighter leading-[1.1] text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-white/50">
          Your AI Code Reviewer <br />
          <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
             for Every GitHub PR
          </span>
        </h1>
        
        <p ref={subline} className="text-xl md:text-2xl text-zinc-400 max-w-2xl mx-auto font-light leading-relaxed">
          Instant reviews. Smarter suggestions. Zero nitpicks.
        </p>
        
        <div ref={buttons} className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Button size="lg" className="h-14 px-8 rounded-full bg-white text-black hover:bg-zinc-200 text-lg font-medium transition-all hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.3)]">
            <Github className="mr-2 w-5 h-5" />
            Install GitHub App
          </Button>
          <Button size="lg" variant="outline" className="h-14 px-8 rounded-full border-zinc-800 text-zinc-300 hover:bg-white/10 hover:text-white text-lg font-medium transition-all backdrop-blur-sm">
            <Play className="mr-2 w-4 h-4" />
            View Demo PR
          </Button>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-1 h-12 rounded-full bg-gradient-to-b from-white/0 via-white/20 to-white/0" />
      </div>
    </section>
  );
}
