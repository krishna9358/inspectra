"use client";

import Image from "next/image";
import { useState } from "react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Chen",
    company: "Senior Engineer at Stripe",
    image: "/images/users/user-1.png",
    testimonial:
      "Inspectra caught a critical SQL injection vulnerability that our team missed. It has become an essential part of our security-first development workflow.",
  },
  {
    id: 2,
    name: "Marcus Johnson",
    company: "Tech Lead at Vercel",
    image: "/images/users/user-2.png",
    testimonial:
      "Our PR review time dropped from 4 hours to 30 minutes. The AI suggestions are surprisingly accurate and help junior devs learn best practices.",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    company: "CTO at Acme Startup",
    image: "/images/users/user-3.png",
    testimonial:
      "We ship 3x faster now. Inspectra handles the routine code reviews so our senior engineers can focus on architecture and mentoring.",
  },
  {
    id: 4,
    name: "David Park",
    company: "Platform Engineer at Shopify",
    image: "/images/users/user-4.png",
    testimonial:
      "The integration was seamless - literally 5 minutes to set up. Now every PR gets instant feedback without waiting for reviewers.",
  },
  {
    id: 5,
    name: "Lisa Thompson",
    company: "Engineering Manager at Notion",
    image: "/images/users/user-1.png",
    testimonial:
      "My team loves the learning aspect. Inspectra explains WHY something is an issue, helping everyone write better code over time.",
  },
  {
    id: 6,
    name: "James Williams",
    company: "DevOps Lead at GitLab",
    image: "/images/users/user-2.png",
    testimonial:
      "Finally, a code review tool that understands context. It doesn't just flag issues blindly - it gives actionable, relevant suggestions.",
  },
];

export default function TestimonialsSection() {
  const [showAll, setShowAll] = useState(false);

  const visibleTestimonials = showAll ? testimonials : testimonials.slice(0, 6);

  return (
    <section className="md:py-28 py-14 relative">
      <div className="wrapper">
        <div>
          <div className="max-w-2xl mx-auto mb-12 text-center">
            <h2 className="mb-3 font-bold text-center text-gray-800 text-3xl dark:text-white/90 md:text-title-lg">
              Loved by Engineering Teams
            </h2>
            <p className="max-w-xl mx-auto leading-6 text-gray-500 dark:text-gray-400">
              Join thousands of developers who ship better code faster with
              AI-powered reviews that catch issues before production.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3 max-w-[72rem] mx-auto">
            {visibleTestimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>

          <div className="mt-8 text-center relative z-10">
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 px-6 py-3.5 text-sm font-medium text-gray-800 bg-white border border-gray-200 dark:hover:bg-gray-900 rounded-full shadow-theme-xs hover:bg-gray-50 focus:outline-none"
            >
              <span>{showAll ? "Show less..." : "Show more..."}</span>
            </button>
          </div>
        </div>
      </div>

      {!showAll && (
        <div className="white-gradient h-[264px]  w-full absolute bottom-0"></div>
      )}
    </section>
  );
}

function TestimonialCard({
  testimonial,
}: {
  testimonial: (typeof testimonials)[number];
}) {
  return (
    <div className="p-2 bg-gray-50 dark:bg-white/5 dark:border-gray-800 dark:hover:border-white/10 border rounded-[20px] border-gray-100 hover:border-primary-200 transition">
      <div className="flex items-center p-3 mb-3 bg-white/90 dark:bg-white/[0.03] rounded-2xl">
        <div>
          <Image
            src={testimonial.image || "/placeholder.svg"}
            alt={testimonial.name}
            width={52}
            height={52}
            className="size-13 object-cover ring-2 ring-white dark:ring-gray-700 mr-4 rounded-full drop-shadow-[0_8px_20px_rgba(0,0,0,0.08)]"
          />
        </div>
        <div>
          <h3 className="text-gray-800 font-base dark:text-white/90">
            {testimonial.name}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {testimonial.company}
          </p>
        </div>
      </div>
      <div className="p-5 rounded-2xl bg-white/90 dark:bg-white/[0.03]">
        <p className="text-base leading-6 text-gray-700 dark:text-gray-400">
          {testimonial.testimonial}
        </p>
      </div>
    </div>
  );
}
