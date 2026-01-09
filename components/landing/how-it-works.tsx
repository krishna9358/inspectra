"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { GitBranch, GitPullRequest, Zap, ArrowRight } from "lucide-react";

export function HowItWorks() {
  const container = useRef(null);
  
  const steps = [
    {
      id: 1,
      icon: <GitBranch className="w-6 h-6 text-white" />,
      title: "Connect",
      description: "Install on your repo in 1-click",
      badge: "Setup",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      id: 2,
      icon: <GitPullRequest className="w-6 h-6 text-white" />,
      title: "Open PR",
      description: "Code as usual, push changes",
      badge: "Automatic Trigger",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      id: 3,
      icon: <Zap className="w-6 h-6 text-white" />,
      title: "Get Review",
      description: "Instant AI usage & security analysis",
      badge: "Result",
      gradient: "from-emerald-500 to-lime-500"
    }
  ];

  return (
    <section className="py-32 bg-[#0a0a0a] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-blue-900/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                Workflow on Autopilot
            </h2>
            <p className="text-zinc-400 text-lg max-w-xl mx-auto">
                No complex setup. No configuration files. Just effective code reviews.
            </p>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-12 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-1/2 left-20 right-20 h-0.5 bg-gradient-to-r from-transparent via-zinc-800 to-transparent -translate-y-8 z-0" />
            
            {steps.map((step, index) => (
                <div key={step.id} className="relative z-10 group">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.2 }}
                        className="flex flex-col items-center text-center"
                    >
                        {/* Icon Container */}
                        <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.gradient} p-[1px] mb-8 relative shadow-xl shadow-black/50 group-hover:-translate-y-2 transition-transform duration-300`}>
                            <div className="w-full h-full bg-[#0F1117] rounded-2xl flex items-center justify-center relative overflow-hidden">
                                <div className={`absolute inset-0 bg-gradient-to-br ${step.gradient} opacity-10 group-hover:opacity-20 transition-opacity`} />
                                {step.icon}
                            </div>
                            
                            {/* Step Number Badge */}
                            <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-[#161b22] border border-zinc-800 flex items-center justify-center text-sm font-bold text-zinc-400 z-10 shadow-lg">
                                {step.id}
                            </div>
                        </div>

                        <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                        <p className="text-zinc-500 text-sm max-w-[200px] leading-relaxed">
                            {step.description}
                        </p>
                        
                        {/* Mobile Connect Line */}
                        {index < steps.length - 1 && (
                            <div className="md:hidden w-0.5 h-12 bg-gradient-to-b from-zinc-800 to-transparent my-4" />
                        )}
                    </motion.div>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
}
