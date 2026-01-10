"use client";

import { motion } from "framer-motion";
import {
  Shield,
  Zap,
  Code,
  AlertTriangle,
  MessageSquare,
  Terminal,
} from "lucide-react";

const features = [
  {
    icon: <Shield className="w-6 h-6 text-emerald-400" />,
    title: "Security & Risk Detection",
    description:
      "Automatically identify vulnerabilities, secrets, and risky patterns before they merge.",
  },
  {
    icon: <Zap className="w-6 h-6 text-yellow-400" />,
    title: "Performance Insights",
    description:
      "Catch O(n^2) loops, memory leaks, and unoptimized database queries.",
  },
  {
    icon: <Code className="w-6 h-6 text-blue-400" />,
    title: "Code Style Enforcement",
    description:
      "Stop bike-shedding. Inspectra enforces your team's style guide automatically.",
  },
  {
    icon: <MessageSquare className="w-6 h-6 text-purple-400" />,
    title: "Context-Aware Comments",
    description:
      "Reviews that understand your architecture, not just the lines changed.",
  },
  {
    icon: <AlertTriangle className="w-6 h-6 text-orange-400" />,
    title: "Bug Prediction",
    description:
      "AI analyzes complexity and churn to predict potential bugs in complex diffs.",
  },
  {
    icon: <Terminal className="w-6 h-6 text-pink-400" />,
    title: "Custom Instructions",
    description:
      "Teach the AI your specific preferences with a simple configuration file.",
  },
];

export function Features() {
  return (
    <section className="py-32 relative z-10 bg-[#0a0a0a]">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
            Everything you need for <br />
            <span className="text-zinc-500">world-class code reviews</span>
          </h2>
          <p className="text-zinc-400 text-lg">
            Replace manual checklists with an intelligent agent that never
            sleeps.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ feature, index }: { feature: any; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="p-8 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group cursor-default"
    >
      <div className="mb-6 p-3 rounded-xl bg-white/5 w-fit border border-white/5 group-hover:scale-110 transition-transform duration-300">
        {feature.icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
      <p className="text-zinc-400 leading-relaxed text-sm">
        {feature.description}
      </p>
    </motion.div>
  );
}
