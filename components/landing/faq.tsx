"use client";

import { MinusIcon, PlusIcon } from "./icons";
import { useState } from "react";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export default function FaqAccordion() {
  const [activeItem, setActiveItem] = useState<number | null>(1);

  const faqItems: FAQItem[] = [
    {
      id: 1,
      question: "How does Inspectra's AI code review work?",
      answer:
        "Inspectra analyzes your pull requests using advanced AI models trained on millions of code samples. It checks for bugs, security vulnerabilities, code style violations, and performance issues, then provides actionable suggestions directly in your PR comments.",
    },
    {
      id: 2,
      question: "Which programming languages are supported?",
      answer:
        "Inspectra supports all major languages including JavaScript, TypeScript, Python, Go, Java, C#, Ruby, PHP, Rust, and more. Our AI continuously learns and improves its understanding of language-specific patterns and best practices.",
    },
    {
      id: 3,
      question: "How do I integrate Inspectra with my repository?",
      answer:
        "Simply install our GitHub/GitLab/Bitbucket app and authorize access to your repositories. Inspectra will automatically start reviewing PRs within minutes. No complex configuration required - it works out of the box.",
    },
    {
      id: 4,
      question: "Will Inspectra slow down my CI/CD pipeline?",
      answer:
        "No. Inspectra runs in parallel with your existing CI/CD workflow and typically completes reviews in under 30 seconds. It adds comments to your PR without blocking merges, so your team stays productive.",
    },
    {
      id: 5,
      question: "Is my code secure with Inspectra?",
      answer:
        "Absolutely. We never store your source code permanently - it is analyzed in memory and immediately discarded. We are SOC 2 Type II certified, use end-to-end encryption, and offer on-premise deployment for enterprise customers.",
    },
  ];

  const toggleItem = (itemId: number) => {
    setActiveItem(activeItem === itemId ? null : itemId);
  };

  return (
    <section id="faq" className="py-14 md:py-28 dark:bg-[#171f2e]">
      <div className="wrapper">
        <div className="max-w-2xl mx-auto mb-12 text-center">
          <h2 className="mb-3 font-bold text-center text-gray-800 text-3xl dark:text-white/90 md:text-title-lg">
            Frequently Asked Questions
          </h2>
          <p className="max-w-md mx-auto leading-6 text-gray-500 dark:text-gray-400">
            Answered all frequently asked questions, Still confused? feel free
            contact with us
          </p>
        </div>
        <div className="max-w-[600px] mx-auto">
          <div className="space-y-4">
            {faqItems.map((item) => (
              <FAQItem
                key={item.id}
                item={item}
                isActive={activeItem === item.id}
                onToggle={() => toggleItem(item.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQItem({
  item,
  isActive,
  onToggle,
}: {
  item: FAQItem;
  isActive: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="pb-5 border-b border-gray-200 dark:border-gray-800">
      <button
        type="button"
        className="flex items-center justify-between w-full text-left"
        onClick={onToggle}
        aria-expanded={isActive}
      >
        <span className="text-lg font-medium text-gray-800 dark:text-white/90">
          {item.question}
        </span>
        <span className="flex-shrink-0 ml-6">
          {isActive ? <MinusIcon /> : <PlusIcon />}
        </span>
      </button>
      {isActive && (
        <div className="mt-5">
          <p className="text-base leading-7 text-gray-500 dark:text-gray-400">
            {item.answer}
          </p>
        </div>
      )}
    </div>
  );
}
