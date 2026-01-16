"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion, Variants } from "framer-motion";
import {
  ArrowRight,
  Github,
  Gitlab,
  FileCode2,
} from "lucide-react";
import GridSmallBackgroundDemo from "@/components/ui/grid-small-background-demo";
import { PointerHighlight } from "@/components/pointer-highlight";

// Animation Variants
const fadeIn: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const cardHover: Variants = {
  hover: {
    y: -5,
    transition: { duration: 0.2, ease: "easeInOut" }
  }
};

// Components
const Header = () => (
  <motion.header
    initial={{ y: -100 }}
    animate={{ y: 0 }}
    transition={{ duration: 0.5 }}
    className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-background/80 backdrop-blur-md"
  >
    <div className="container mx-auto px-4 h-16 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="size-8 bg-primary rounded-full flex items-center justify-center">
          <span className="font-bold text-primary-foreground">I</span>
        </div>
        <span className="text-xl font-bold tracking-tight">Inspectra</span>
      </div>

      <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground/80">
        {['Features', 'Enterprise', 'Customers', 'Pricing', 'Blog'].map((item) => (
          <Link key={item} href={`#${item.toLowerCase()}`} className="hover:text-foreground transition-colors relative group">
            {item}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-4">
        <Link href="/login" className="text-sm font-medium hover:text-primary transition-colors hidden sm:block">
          Log In
        </Link>
        <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors group">
          Get a free trial
        </Button>
      </div>
    </div>
  </motion.header>
);

const Hero = () => (
  <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden z-10 w-full">
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="container mx-auto px-4 relative z-10 text-center"
    >
      <motion.h1 variants={fadeIn} className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold tracking-tight leading-[1.05] mb-8">
        Cut code review time <br />
        & bugs in <span className="text-primary">           <PointerHighlight
                        rectangleClassName="rounded-md bg-orange-500/12 ring-1 ring-inset ring-orange-400/20 backdrop-blur-[1px]"
                        pointerClassName="text-orange-400 drop-shadow-[0_0_18px_rgba(255,165,0,0.35)]"
                        containerClassName="inline-block relative max-w-full"
                      >half Instantly.</PointerHighlight></span>
      </motion.h1>

      <motion.p variants={fadeIn} className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-12 font-mono">
        Reviews for AI-powered teams who <br />
        move fast (but don't break things)
      </motion.p>

      <motion.div variants={fadeIn} className="flex flex-col items-center gap-6">
        <Button size="lg" className="h-14 px-8 text-lg bg-white text-black hover:bg-white/90 group relative overflow-hidden">
          <span className="relative z-10 flex items-center">
            Try it for free
            <div className="ml-2 size-6 rounded-full bg-primary flex items-center justify-center group-hover:scale-110 transition-transform">
              <ArrowRight className="size-4 text-white" />
            </div>
          </span>
        </Button>

        <div className="flex items-center gap-2 text-sm text-muted-foreground font-mono">
          <span>2-click install</span>
          <Github className="size-5 text-white" />
          <Gitlab className="size-5 text-orange-500" />
          <span className="text-white/20">|</span>
          <FileCode2 className="size-5" />
        </div>
      </motion.div>
    </motion.div>
  </section>
);

const Stats = () => (
  <section className="py-20 border-y border-white/5 bg-white/[0.02]">
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
      className="container mx-auto px-4"
    >
      <motion.div variants={fadeIn} className="text-center mb-16">
        <p className="font-mono text-muted-foreground mb-4">Also Available in <span className="underline decoration-primary underline-offset-4 text-foreground cursor-pointer">CLI</span> & <span className="underline decoration-primary underline-offset-4 text-foreground cursor-pointer">IDE</span></p>
        <h2 className="text-3xl md:text-4xl font-heading font-bold">The leader in AI code reviews</h2>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-px bg-white/10 max-w-5xl mx-auto border border-white/10 rounded-lg overflow-hidden">
        <motion.div variants={fadeIn} className="bg-background p-12 flex flex-col items-center justify-center text-center gap-4 hover:bg-white/[0.02] transition-colors">
          <span className="text-sm font-medium text-muted-foreground">Most installed AI App</span>
          <div className="flex items-center gap-3 mt-2">
            <div className="flex items-center gap-1.5 font-bold text-xl"><Github className="size-6" /> GitHub</div>
            <div className="flex items-center gap-1.5 font-bold text-xl text-orange-500"><Gitlab className="size-6" /> GitLab</div>
          </div>
        </motion.div>

        <motion.div variants={fadeIn} className="bg-background p-12 flex flex-col items-center justify-center text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,.2)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%,100%_100%] bg-[position:-100%_0,0_0] bg-no-repeat animate-[shine_3s_infinite]" />
          <span className="text-5xl md:text-6xl font-bold tabular-nums group-hover:scale-110 transition-transform duration-500">2M</span>
          <span className="text-primary font-medium mt-2">Repositories</span>
        </motion.div>

        <motion.div variants={fadeIn} className="bg-background p-12 flex flex-col items-center justify-center text-center hover:bg-white/[0.02] transition-colors">
          <span className="text-5xl md:text-6xl font-bold tabular-nums">13M</span>
          <span className="text-primary font-medium mt-2">Pull Requests</span>
        </motion.div>
      </div>

      <motion.div variants={fadeIn} className="mt-12 flex justify-center">
        <div className="flex items-center gap-2 group cursor-pointer hover:opacity-80 transition-opacity">
          <span className="text-primary underline decoration-primary underline-offset-4">Why teams prefer Inspectra</span>
          <div className="text-2xl animate-bounce">🥕</div>
        </div>
      </motion.div>
    </motion.div>
  </section>
);

const FeatureCard = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => (
  <motion.div
    variants={fadeIn}
    whileHover="hover"
    className="bg-background p-8 min-h-[400px] flex flex-col justify-between group overflow-hidden relative"
  >
    {children}
    <motion.div
      className="absolute inset-0 border-2 border-primary/0 rounded-none pointer-events-none"
      variants={{ hover: { borderColor: "rgba(224, 74, 5, 0.2)" } }} // subtle orange border on hover
    />
  </motion.div>
);

const FeatureGrid = () => (
  <section className="py-24 container mx-auto px-4">
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
      className="mb-20"
    >
      <motion.h2 variants={fadeIn} className="text-4xl md:text-5xl font-heading font-bold mb-6">Faster reviews + better code.</motion.h2>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <motion.p variants={fadeIn} className="text-xl text-muted-foreground font-mono max-w-2xl text-balance">
          We do the heavy lifting & spot the hard to find issues. <br />
          You do the final 10%.
        </motion.p>
        <motion.div variants={fadeIn}>
          <Link href="#" className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-mono">
            See a sample review <ArrowRight className="size-4" />
          </Link>
        </motion.div>
      </div>
    </motion.div>

    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={staggerContainer}
      className="grid md:grid-cols-3 gap-px bg-white/10 border border-white/10 rounded-lg overflow-hidden"
    >
      {/* Card 1 */}
      <FeatureCard>
        <div className="flex-1 flex items-center justify-center py-10 opacity-80 group-hover:opacity-100 transition-opacity">
          <motion.div variants={cardHover} className="relative border border-white/10 bg-white/5 p-4 rounded w-48 text-center font-mono text-sm">
            <span className="text-green-400">Fix with AI</span>
            <div className="absolute -bottom-6 -right-6 size-8 bg-orange-500 rounded-tl-none rounded-full blur-[2px] opacity-50" />
            <svg className="absolute -bottom-4 -right-4 size-6 text-white fill-current" viewBox="0 0 24 24"><path d="M7 2l12 11.2-5.8.5 3.3 7.3-2.2.9-3.2-7.4-4.4 4z" /></svg>
          </motion.div>
        </div>
        <div className="space-y-4 relative z-10">
          <h3 className="text-primary font-mono text-sm">// 1-click & AI fixes</h3>
          <h4 className="text-2xl font-heading font-bold">Catch fast. Fix fast.</h4>
          <p className="text-muted-foreground text-sm font-mono leading-relaxed">
            1-click commits for easy fixes and a "Fix with AI" button for harder ones.
          </p>
        </div>
      </FeatureCard>

      {/* Card 2 */}
      <FeatureCard>
        <div className="flex-1 flex items-center justify-center py-10 opacity-80 group-hover:opacity-100 transition-opacity">
          <motion.div variants={cardHover} className="w-full max-w-[200px] space-y-2 font-mono text-[10px] text-muted-foreground border border-white/10 bg-black/40 p-3 rounded">
            <div className="flex justify-between text-xs pb-2 mb-2 border-b border-white/5">
              <span>Sequence Diagram</span>
              <span className="text-red-400">-19</span>
              <span className="text-green-400">+19</span>
            </div>
            <div className="h-2 w-full bg-white/10 rounded" />
            <div className="h-2 w-2/3 bg-white/10 rounded" />
            <div className="flex justify-center mt-4">
              <div className="size-8 rounded border border-white/20 flex items-center justify-center">⚙️</div>
            </div>
          </motion.div>
        </div>
        <div className="space-y-4 relative z-10">
          <h3 className="text-primary font-mono text-sm">// Summaries & visual diagrams</h3>
          <h4 className="text-2xl font-heading font-bold">TL;DR for your diff.</h4>
          <p className="text-muted-foreground text-sm font-mono leading-relaxed">
            Quick context with a summary of changes, a walkthrough & an architectural diagram.
          </p>
        </div>
      </FeatureCard>

      {/* Card 3 */}
      <FeatureCard>
        <div className="flex-1 flex items-center justify-center py-10 opacity-80 group-hover:opacity-100 transition-opacity">
          <motion.div variants={cardHover} className="relative size-32 border border-dashed border-white/20 rounded-full flex items-center justify-center">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-px bg-primary/20" />
              <div className="h-full w-px bg-primary/20 absolute" />
            </div>
            <div className="size-16 relative">
              <span className="text-4xl absolute inset-0 flex items-center justify-center animate-pulse">🐛</span>
            </div>
            <div className="absolute top-0 left-0 size-4 border-t-2 border-l-2 border-primary" />
            <div className="absolute top-0 right-0 size-4 border-t-2 border-r-2 border-primary" />
            <div className="absolute bottom-0 left-0 size-4 border-b-2 border-l-2 border-primary" />
            <div className="absolute bottom-0 right-0 size-4 border-b-2 border-r-2 border-primary" />
          </motion.div>
        </div>
        <div className="space-y-4 relative z-10">
          <h3 className="text-primary font-mono text-sm">// Agentic reviews</h3>
          <h4 className="text-2xl font-heading font-bold">Find the bugs. Skip the noise.</h4>
          <p className="text-muted-foreground text-sm font-mono leading-relaxed">
            We find bugs humans miss - & flag the time consuming and tedious. Without the noise.
          </p>
        </div>
      </FeatureCard>

      {/* Card 4 */}
      <motion.div
        variants={fadeIn}
        whileHover="hover"
        className="bg-background p-8 min-h-[300px] flex flex-col justify-between group md:col-span-1 border-t border-white/10 md:border-t-0"
      >
        <div className="flex-1 flex items-center py-6">
          <motion.div variants={cardHover} className="flex items-center gap-3">
            <div className="size-10 rounded-full bg-secondary overflow-hidden">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=jenn" alt="avatar" className="size-full object-cover" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm">jennjenn</span>
                <span className="text-[10px] border border-white/20 rounded px-1 text-muted-foreground">author</span>
                <span className="text-[10px] text-muted-foreground">2 minute ago</span>
              </div>
              <p className="text-sm mt-1">@inspectra we want to get rid of the star imports</p>
            </div>
          </motion.div>
        </div>
        <div className="space-y-4">
          <h3 className="text-primary font-mono text-sm">// Chat</h3>
          <h4 className="text-2xl font-heading font-bold">Chat with the bot directly.</h4>
          <p className="text-muted-foreground text-sm font-mono leading-relaxed">
            Give feedback on reviews to create Learnings. Or create issues, trigger docstrings & more.
          </p>
        </div>
      </motion.div>

      {/* Card 5 */}
      <motion.div
        variants={fadeIn}
        whileHover="hover"
        className="bg-background p-8 min-h-[300px] flex flex-col justify-between group md:col-span-1 border-t md:border-l border-white/10"
      >
        <div className="flex-1 flex items-center justify-center py-6">
          <motion.div variants={cardHover} className="font-mono text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-green-400 to-green-800">
            YAML
          </motion.div>
        </div>
        <div className="space-y-4">
          <h3 className="text-primary font-mono text-sm">// Your code, your way</h3>
          <h4 className="text-2xl font-heading font-bold">Most customizable tool.</h4>
          <p className="text-muted-foreground text-sm font-mono leading-relaxed">
            Customize everything from your coding guidelines to your workflow in a yaml file.
          </p>
        </div>
      </motion.div>

      {/* Card 6 */}
      <motion.div
        variants={fadeIn}
        whileHover="hover"
        className="bg-background p-8 min-h-[300px] flex flex-col justify-between group md:col-span-1 border-t md:border-l border-white/10"
      >
        <div className="flex-1 flex items-center py-6">
          <motion.div variants={cardHover} className="space-y-2 font-mono text-sm w-full">
            <div className="flex justify-between text-green-400">
              <span>98 issues found</span>
            </div>
            <div className="flex justify-between text-orange-400">
              <span>44 refactor suggestions</span>
            </div>
            <div className="flex justify-between text-blue-400">
              <span>39 accepted improvements</span>
            </div>
          </motion.div>
        </div>
        <div className="space-y-4">
          <h3 className="text-primary font-mono text-sm">// Automated reports</h3>
          <h4 className="text-2xl font-heading font-bold">The reports you need.</h4>
          <p className="text-muted-foreground text-sm font-mono leading-relaxed">
            Automate the creation of your daily standup reports, sprint reviews, and more.
          </p>
        </div>
      </motion.div>

    </motion.div>
  </section>
);

const ContextSection = () => (
  <section className="py-24 container mx-auto px-4 border-t border-white/5">
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={staggerContainer}
      className="mb-20"
    >
      <motion.div variants={fadeIn} className="inline-block bg-orange-950/30 text-orange-500 text-xs font-mono font-bold px-2 py-1 mb-4 rounded">
        CR_Quality
      </motion.div>
      <motion.h2 variants={fadeIn} className="text-4xl md:text-5xl font-heading font-bold mb-6">Industry-leading context.</motion.h2>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <motion.p variants={fadeIn} className="text-xl text-muted-foreground font-mono max-w-2xl text-balance">
          Codebase-awareness is tablestakes. We pull in dozens more points of context than other tools.
        </motion.p>
        <motion.div variants={fadeIn}>
          <Link href="#" className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-mono uppercase text-sm tracking-wider">
            See a sample review <ArrowRight className="size-4" />
          </Link>
        </motion.div>
      </div>
    </motion.div>

    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={staggerContainer}
      className="grid md:grid-cols-3 gap-px bg-white/10 border border-white/10 rounded-lg overflow-hidden"
    >
      {/* Card 1: Codebase Intelligence */}
      <motion.div variants={fadeIn} whileHover={{ backgroundColor: "rgba(255,255,255,0.02)" }} className="bg-background p-8 min-h-[400px] flex flex-col justify-between group transition-colors">
        <div className="flex-1 flex items-center justify-center py-10 relative">
          <div className="relative w-full h-40">
            <svg className="w-full h-full" viewBox="0 0 300 150">
              <path d="M150 20 L80 80 M150 20 L220 80 M80 80 L50 130 M80 80 L110 130 M220 80 L190 130 M220 80 L250 130" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
              <circle cx="150" cy="20" r="6" fill="#6366f1" className="animate-pulse" />
              <circle cx="80" cy="80" r="6" fill="#8b5cf6" />
              <circle cx="220" cy="80" r="6" fill="#10b981" />
              <circle cx="50" cy="130" r="6" fill="#3b82f6" />
              <circle cx="110" cy="130" r="6" fill="#f59e0b" />
              <circle cx="190" cy="130" r="6" fill="#ec4899" />
              <circle cx="250" cy="130" r="6" fill="#ef4444" />
            </svg>
          </div>
        </div>
        <div className="space-y-4">
          <h4 className="text-xl font-heading font-bold">1. Codebase intelligence</h4>
          <p className="text-muted-foreground text-sm font-mono leading-relaxed">
            Codegraph and custom guidelines help us understand complex dependencies across files to uncover the impact of changes.
          </p>
        </div>
      </motion.div>

      {/* Card 2: External Context */}
      <motion.div variants={fadeIn} whileHover={{ backgroundColor: "rgba(255,255,255,0.02)" }} className="bg-background p-8 min-h-[400px] flex flex-col justify-between group transition-colors">
        <div className="flex-1 flex items-center justify-center py-10">
          <div className="relative flex items-center gap-4">
            <div className="flex flex-col gap-2">
              <div className="size-8 bg-[#5E6AD2] rounded p-1.5"><svg viewBox="0 0 24 24" fill="white"><path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2-5-2 5zm0 0L2 17l10 5 10-5-10-5z" /></svg></div>
              <div className="size-8 bg-black border border-white/20 rounded p-1.5 flex items-center justify-center font-bold text-xs">N</div>
            </div>
            <div className="h-px w-12 bg-white/20" />
            <div className="size-12 bg-primary/20 rounded-full flex items-center justify-center text-primary">
              <span className="font-bold text-xl">I</span>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <h4 className="text-xl font-heading font-bold">2. External context</h4>
          <p className="text-muted-foreground text-sm font-mono leading-relaxed">
            We bring the right context via MCP servers, Linked Issues (Jira & Linear) & Web Query (to fetch the latest info on the web).
          </p>
        </div>
      </motion.div>

      {/* Card 3: Linters & Scanners */}
      <motion.div variants={fadeIn} whileHover={{ backgroundColor: "rgba(255,255,255,0.02)" }} className="bg-background p-8 min-h-[400px] flex flex-col justify-between group transition-colors">
        <div className="flex-1 flex items-center justify-center py-10 relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:16px_16px]" />
          <div className="relative z-10 grid grid-cols-5 gap-2 opacity-50">
            {[...Array(15)].map((_, i) => (
              <div key={i} className={`size-1.5 rounded-full ${[3, 7, 11].includes(i) ? 'bg-orange-500 animate-pulse' : 'bg-white/20'}`} />
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <h4 className="text-xl font-heading font-bold">3. Linters & Scanners</h4>
          <p className="text-muted-foreground text-sm font-mono leading-relaxed">
            40+ linters and security scanners catch more bugs - while we filter out the noise from false positives.
          </p>
        </div>
      </motion.div>
    </motion.div>
  </section>
);

const LearningSection = () => (
  <section className="py-24 container mx-auto px-4 border-t border-white/5">
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={staggerContainer}
      className="mb-20"
    >
      <motion.div variants={fadeIn} className="inline-block bg-orange-950/30 text-orange-500 text-xs font-mono font-bold px-2 py-1 mb-4 rounded">
        CR_Intelligence
      </motion.div>
      <motion.h2 variants={fadeIn} className="text-4xl md:text-5xl font-heading font-bold mb-6">Code reviews that learn from you.</motion.h2>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <motion.p variants={fadeIn} className="text-xl text-muted-foreground font-mono max-w-2xl text-balance">
          Set the baseline with your rules and style guides, then train the agent with feedback via replies. Reviews improve continuously.
        </motion.p>
      </div>
    </motion.div>

    <div className="grid lg:grid-cols-2 gap-12 items-start">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="space-y-2"
      >
        {['Inspectra learnings', 'Path & AST-based instructions', 'Coding agent guidelines'].map((item, i) => (
          <motion.div variants={fadeIn} key={i} className={`p-6 border-l-2 cursor-pointer transition-colors ${i === 1 ? 'border-primary bg-white/5' : 'border-white/10 hover:bg-white/5 text-muted-foreground'}`}>
            <h3 className={`text-lg font-heading font-medium ${i === 1 ? 'text-foreground' : ''}`}>{item}</h3>
            {i === 1 && (
              <p className="mt-2 text-sm text-muted-foreground font-mono">
                Easily configurable instructions that let you quickly share how you want your code reviewed.
              </p>
            )}
            {i === 1 && (
              <div className="mt-6 w-1/3 h-0.5 bg-primary" />
            )}
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="bg-[#0D1117] rounded-lg border border-white/10 p-6 font-mono text-sm overflow-hidden relative shadow-2xl"
      >
        <div className="absolute top-0 left-0 w-full h-8 bg-white/5 flex items-center px-4 gap-2 border-b border-white/5">
          <div className="size-3 rounded-full bg-red-500/20" />
          <div className="size-3 rounded-full bg-yellow-500/20" />
          <div className="size-3 rounded-full bg-green-500/20" />
          <span className="ml-4 text-xs text-muted-foreground">.inspectra.yaml</span>
        </div>
        <div className="mt-8 space-y-1 text-gray-400">
          <p><span className="text-gray-600">1</span> <span className="text-purple-400"># .inspectra.yaml</span></p>
          <p><span className="text-gray-600">2</span> <span className="text-blue-400">language:</span> <span className="text-green-400">en</span></p>
          <p><span className="text-gray-600">3</span> <span className="text-blue-400">early_access:</span> <span className="text-blue-400">true</span></p>
          <p><span className="text-gray-600">4</span> <span className="text-blue-400">reviews:</span></p>
          <p><span className="text-gray-600">5</span> <span className="text-purple-400 pl-4">profile:</span> <span className="text-green-400">chill</span></p>
          <p><span className="text-gray-600">6</span> <span className="text-purple-400 pl-4">instructions:</span> <span className="text-yellow-400">&gt;-</span></p>
          <p><span className="text-gray-600">7</span> <span className="text-gray-500 pl-8"># Code Review Instructions</span></p>
          <p><span className="text-gray-600">8</span></p>
          <p><span className="text-gray-600">9</span> <span className="text-gray-300 pl-8">- Ensure the code follows best practices.</span></p>
          <p><span className="text-gray-600">10</span> <span className="text-gray-300 pl-8">- For **Python** code, follow PEP-8.</span></p>
        </div>
      </motion.div>
    </div>
  </section>
);

const SecuritySection = () => (
  <section className="py-24 container mx-auto px-4 border-t border-white/5">
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={staggerContainer}
      className="mb-20"
    >
      <motion.div variants={fadeIn} className="inline-block bg-orange-950/30 text-orange-500 text-xs font-mono font-bold px-2 py-1 mb-4 rounded">
        CR_Security
      </motion.div>
      <motion.h2 variants={fadeIn} className="text-4xl md:text-5xl font-heading font-bold mb-6">We take security seriously.</motion.h2>
    </motion.div>

    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={staggerContainer}
      className="grid md:grid-cols-3 gap-8"
    >
      {/* Security 1 */}
      <motion.div variants={fadeIn} whileHover={{ y: -10 }} className="group">
        <div className="h-48 bg-white/5 border border-white/10 rounded-lg mb-6 flex items-center justify-center overflow-hidden relative transition-colors group-hover:bg-white/10">
          {/* Visual: Eye with slash */}
          <svg className="size-16 text-purple-400/50 group-hover:text-purple-400 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
            <line x1="1" y1="1" x2="23" y2="23" />
          </svg>
          <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-purple-500/0 via-purple-500 to-purple-500/0 opacity-50" />
        </div>
        <h3 className="text-xl font-heading font-bold mb-2">Architected for security</h3>
        <p className="text-muted-foreground text-sm font-mono leading-relaxed">
          We protect your code and privacy with an architecture designed to ensure your code is private.
        </p>
      </motion.div>

      {/* Security 2 */}
      <motion.div variants={fadeIn} whileHover={{ y: -10 }} className="group">
        <div className="h-48 bg-white/5 border border-white/10 rounded-lg mb-6 flex items-center justify-center overflow-hidden relative transition-colors group-hover:bg-white/10">
          {/* Visual: Asterisks */}
          <div className="flex gap-2 text-2xl font-mono text-green-400/50 group-hover:text-green-400 transition-colors">
            <span>*</span><span>*</span><span>*</span><span>*</span><span>*</span><span>*</span>
          </div>
          <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-green-500/0 via-green-500 to-green-500/0 opacity-50" />
        </div>
        <h3 className="text-xl font-heading font-bold mb-2">SSL encrypted data</h3>
        <p className="text-muted-foreground text-sm font-mono leading-relaxed">
          End-to-end encryption protects your code during reviews with zero data retention post-review.
        </p>
      </motion.div>

      {/* Security 3 */}
      <motion.div variants={fadeIn} whileHover={{ y: -10 }} className="group">
        <div className="h-48 bg-white/5 border border-white/10 rounded-lg mb-6 flex items-center justify-center overflow-hidden relative transition-colors group-hover:bg-white/10">
          {/* Visual: Fingerprint */}
          <svg className="size-16 text-orange-400/50 group-hover:text-orange-400 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M2 12C2 6.48 6.48 2 12 2s10 4.48 10 10" />
            <path d="M12 2v10" />
            <path d="M12 12c0 3-2 5-2 8" />
            <path d="M12 12c0 3 2 5 2 8" />
          </svg>
          <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-orange-500/0 via-orange-500 to-orange-500/0 opacity-50" />
        </div>
        <h3 className="text-xl font-heading font-bold mb-2">SOC 2 Type II certified</h3>
        <p className="text-muted-foreground text-sm font-mono leading-relaxed">
          Enterprise-grade security validated annually through independent SOC2 Type II audits.
        </p>
      </motion.div>
    </motion.div>
  </section>
);

const BigFooter = () => (
  <motion.footer
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 1 }}
    viewport={{ once: true }}
    className="border-t border-white/10 bg-black pt-20 pb-0 overflow-hidden"
  >
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-20">
        {/* Brand */}
        <div className="col-span-2 lg:col-span-1">
          <div className="flex items-center gap-2 mb-6">
            <div className="size-8 bg-primary rounded-full flex items-center justify-center">
              <span className="font-bold text-primary-foreground">I</span>
            </div>
            <span className="text-xl font-bold tracking-tight">Inspectra</span>
          </div>
        </div>

        {/* Products */}
        <div className="space-y-4">
          <h4 className="text-orange-500 font-bold text-sm">Products</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li><Link href="#" className="hover:text-primary transition-colors">Pull Request Reviews</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">IDE Reviews</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">CLI Reviews</Link></li>
          </ul>
        </div>

        {/* Navigation */}
        <div className="space-y-4">
          <h4 className="text-orange-500 font-bold text-sm">Navigation</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li><Link href="#" className="hover:text-primary transition-colors">About Us</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">Features</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">FAQ</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">System Status</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">Careers</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">DPA</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">Startup Program</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">Vulnerability Disclosure</Link></li>
          </ul>
        </div>

        {/* Resources */}
        <div className="space-y-4">
          <h4 className="text-orange-500 font-bold text-sm">Resources</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li><Link href="#" className="hover:text-primary transition-colors">Blog</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">Docs</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">Changelog</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">Case Studies</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">Trust Center</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">Brand Guidelines</Link></li>
          </ul>
        </div>

        {/* Contact & Subscribe */}
        <div className="space-y-8">
          <div className="space-y-4">
            <h4 className="text-orange-500 font-bold text-sm">Contact</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-primary transition-colors">Support</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Sales</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Pricing</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Partnerships</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <input
              type="email"
              placeholder="youremail@domain.com"
              className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-sm focus:outline-none focus:border-primary transition-colors"
            />
            <Button className="w-full border border-orange-500 text-orange-500 hover:bg-orange-500/10">Subscribe</Button>
            <p className="text-[10px] text-muted-foreground">
              By signing up you agree to our <Link href="#" className="underline decoration-muted-foreground">Terms of Use</Link> and <Link href="#" className="underline decoration-muted-foreground">Privacy Policy</Link>
            </p>
          </div>

          <div className="flex gap-4 text-muted-foreground">
            <Github className="size-5 hover:text-white transition-colors cursor-pointer" />
            <Gitlab className="size-5 hover:text-white transition-colors cursor-pointer" />
            {/* Social Placeholders */}
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center text-xs text-muted-foreground border-t border-white/5 py-8">
        <div className="flex gap-4">
          <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
        </div>
        <div>Inspectra Inc © 2026</div>
      </div>
    </div>

    {/* Big Text Overlay */}
    <div className="w-full flex justify-center overflow-hidden pointer-events-none select-none opacity-50 relative h-[15vw] min-h-[100px]">
      <span className="text-[18vw] font-bold leading-none text-transparent bg-clip-text bg-gradient-to-b from-white/5 to-transparent absolute -bottom-[4vw]">
        Inspectra
      </span>
      <span className="text-[18vw] font-bold leading-none text-transparent stroke-text absolute -bottom-[4vw]" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.1)' }}>
        Inspectra
      </span>
    </div>
  </motion.footer>
);

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20 overflow-x-hidden">
      <Header />
      <main>
        <GridSmallBackgroundDemo>
          <Hero />
        </GridSmallBackgroundDemo>
        <Stats />
        <FeatureGrid />
        <ContextSection />
        <LearningSection />
        <SecuritySection />
      </main>
      <BigFooter />
    </div>
  );
}
