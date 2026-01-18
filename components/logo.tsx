import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface LogoProps {
  showText?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
  href?: string;
}

export const Logo = ({ 
  showText = true, 
  size = "md",
  className = "",
  href = "/"
}: LogoProps) => {
  const sizeClasses = {
    sm: "size-6",
    md: "size-8",
    lg: "size-12"
  };

  const textSizes = {
    sm: "text-base",
    md: "text-xl",
    lg: "text-2xl"
  };

  const LogoIcon = () => (
    <motion.div
      className={`${sizeClasses[size]} relative flex items-center justify-center group`}
      whileHover={{ scale: 1.1, rotate: 5 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Background circle with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary/80 rounded-full shadow-lg shadow-primary/30 group-hover:shadow-primary/50 transition-shadow duration-300" />
      
      {/* Magnifying glass SVG */}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="relative z-10 w-full h-full p-1.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Magnifying glass circle */}
        <circle cx="11" cy="11" r="7" className="text-primary-foreground" />
        {/* Handle */}
        <path d="m20 20-4-4" className="text-primary-foreground" strokeWidth="2.5" />
        {/* Detective hat accent (small badge) */}
        <circle cx="11" cy="8" r="1.5" className="text-primary-foreground/60" fill="currentColor" />
      </svg>
      
      {/* Shine effect */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
  );

  const content = (
    <div className={`flex items-center gap-2 ${className}`}>
      <LogoIcon />
      {showText && (
        <span className={`${textSizes[size]} font-bold tracking-tight text-foreground`}>
          Inspectra
        </span>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="inline-block">
        {content}
      </Link>
    );
  }

  return content;
};
