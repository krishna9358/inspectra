
import { CheckIcon } from './icons';
import type { TBILLING_PLAN } from './pricing-data';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { PropsWithChildren } from 'react';

type Props = {
    plan: TBILLING_PLAN;
    billingPeriod: keyof TBILLING_PLAN['pricing'];
};

export function PricingCard({ plan, billingPeriod }: Props) {
    return (
        <div className="relative">
            <div
                className={`bg-white dark:bg-dark-primary rounded-[20px] shadow-one relative z-10 h-full ${plan.popular ? 'relative border-2 border-primary-500' : ''
                    }`}
            >
                <div className="p-8">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-400">
                            {plan.name}
                        </h2>
                        {plan.popular && (
                            <span className="px-2 py-1 text-xs font-medium dark:text-pir rounded-full dark:bg-primary-500/15 bg-primary-50 text-primary-500">
                                Popular
                            </span>
                        )}
                    </div>
                    <p className="flex items-baseline mt-4">
                        <span className="text-4xl font-semibold text-gray-800 dark:text-white/90">
                            {plan.pricing[billingPeriod].formattedPrice}
                        </span>

                        {!!plan.pricing[billingPeriod].amount && (
                            <span className="ml-1 text-sm text-gray-500 dark:text-gray-400">
                                {billingPeriod === 'yearly' ? 'Per year' : 'Per month'}
                            </span>
                        )}
                    </p>
                    <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                        {plan.description}
                    </p>

                    {plan.name.includes('Enterprise') ? (
                        <ContactSalesLink>{plan.cta}</ContactSalesLink>
                    ) : (
                        <button
                            className={cn(
                                'block w-full px-8 py-3.5 mt-7 text-sm font-medium text-center rounded-full transition',
                                {
                                    'dark:bg-dark-primary dark:text-white/90 dark:hover:bg-gray-800 dark:border-gray-800 text-gray-800 bg-white border border-gray-200 hover:bg-gray-50':
                                        plan.name.includes('Free'),
                                    'gradient-btn text-white': plan.popular,
                                    'dark:hover:bg-primary-500 dark:bg-white/[0.03] hover:bg-gray-900 text-white bg-gray-700':
                                        !plan.popular && !plan.name.includes('Free'),
                                }
                            )}
                        >
                            {plan.cta}
                        </button>
                    )}
                </div>
                <div className="px-8 pb-7">
                    <ul className="space-y-3">
                        {plan.features.map((feature) => (
                            <li key={feature} className="flex items-start">
                                <div className="flex-shrink-0 text-gray-500 dark:text-gray-400">
                                    <CheckIcon />
                                </div>

                                <p className="ml-2 text-sm text-gray-800 dark:text-white/90">
                                    {feature}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {plan.popular && (
                <div className="absolute -left-20 -top-20 w-60 h-60 bg-gradient-to-br from-primary-500/20 to-pink-500/20 rounded-full blur-3xl max-lg:hidden" />
            )}
        </div>
    );
}

function ContactSalesLink({ children }: PropsWithChildren) {
    return (
        <Link
            href="/contact"
            className="block w-full px-8 py-3.5 mt-7 text-sm font-medium text-center rounded-full transition dark:hover:bg-primary-500 dark:bg-white/[0.03] hover:bg-gray-900 text-white bg-gray-700"
        >
            {children}
        </Link>
    );
}
