"use client";

import { useState } from "react";
import { BILLING_PERIODS, BILLING_PLANS } from "./pricing-data";
import { cn } from "@/lib/utils";
import { PricingCard } from "./pricing-card";
import { Subheading } from "./subheading";

type BillingPeriodKey = (typeof BILLING_PERIODS)[number]["key"];

export default function PricingSection() {
  const [activeBillingPeriodKey, setActiveBillingPeriodKey] =
    useState<BillingPeriodKey>("monthly");

  return (
    <section id="pricing" className="pb-14 md:pb-28 dark:bg-[#171F2E]">
      <div className="container px-4 mx-auto sm:px-6 lg:px-7">
        <div className="max-w-2xl mx-auto mb-14 text-center">
          <Subheading text="Simple, Transparent Pricing" />
          <h2 className="mb-3 font-bold text-center text-gray-800 text-3xl dark:text-white/90 md:text-title-lg">
            Start Free, Scale When Ready
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            No credit card required. Start reviewing code in minutes.
          </p>
        </div>

        <div>
          {/* Billing Toggle */}
          <div className="flex justify-center relative z-30 mt-12">
            <div className="relative flex p-1 bg-white dark:bg-[#1D2939] rounded-full shadow-theme-xs">
              {BILLING_PERIODS.map((period) => (
                <button
                  key={period.key}
                  onClick={() => setActiveBillingPeriodKey(period.key)}
                  className={cn(
                    "relative flex items-center gap-2 px-6 py-2 text-sm font-medium transition-colors duration-200" +
                      " rounded-full" +
                      " text-gray-700 dark:text-gray-400",
                    {
                      "bg-gray-800 dark:bg-white/[0.05] text-white dark:text-white":
                        period.key === activeBillingPeriodKey,
                      "pr-2": period.saving,
                    },
                  )}
                >
                  {period.label}

                  {period.saving && (
                    <span className="bg-orange-400 text-white text-xs px-2 py-0.5 rounded-full">
                      Save {period.saving}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-12 z-30 relative space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-6xl lg:mx-auto lg:grid-cols-3 xl:grid-cols-4">
            {BILLING_PLANS.map((plan, index) => (
              <PricingCard
                key={index}
                plan={plan}
                billingPeriod={activeBillingPeriodKey}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
