"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export function Testimonials() {
  return (
    <section className="py-24 bg-[#0a0a0a] border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
                <h2 className="text-4xl font-bold text-white mb-6">Why engineering teams trust Horsify</h2>
                <div className="space-y-4">
                    <Benefit text="No more rubber-stamp reviews" />
                    <Benefit text="Catches race conditions before CI runs" />
                    <Benefit text="Consistent code style across 50+ repositories" />
                    <Benefit text="Reduces review cycle time by 60%" />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
                <Stat number="10k+" label="PRs Reviewed" delay={0} />
                <Stat number="50k+" label="Bugs Caught" delay={0.1} />
                <Stat number="24/7" label="Availability" delay={0.2} />
                <Stat number="0" label="Nitpicks" delay={0.3} />
            </div>
        </div>
        
        <div className="mt-24 pt-12 border-t border-white/5 mx-auto max-w-4xl text-center">
            <p className="text-zinc-500 mb-8 uppercase tracking-widest text-xs font-bold">Trusted by developers at</p>
            <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                {/* Text based logos for simplicity as I don't have SVGs */}
                <h3 className="text-2xl font-bold text-white">ACME Corp</h3>
                <h3 className="text-2xl font-bold text-white">Stark Ind</h3>
                <h3 className="text-2xl font-bold text-white">Cyberdyne</h3>
                <h3 className="text-2xl font-bold text-white">Soylent</h3>
            </div>
        </div>
      </div>
    </section>
  );
}

function Benefit({ text }: { text: string }) {
    return (
        <div className="flex items-center gap-3 text-lg text-zinc-300">
            <CheckCircle2 className="w-5 h-5 text-blue-500" />
            {text}
        </div>
    );
}

function Stat({ number, label, delay }: { number: string, label: string, delay: number }) {
    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
            className="p-6 rounded-2xl bg-white/5 border border-white/5 text-center"
        >
            <div className="text-3xl font-bold text-white mb-1 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">{number}</div>
            <div className="text-sm text-zinc-500">{label}</div>
        </motion.div>
    );
}
