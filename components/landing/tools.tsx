
'use client';

import type React from 'react';
import { Fragment, useState } from 'react';

import {
    CodeGeneratorIcon,
    TextGeneratorIcon,
    ImageGeneratorIcon,
    VideoGeneratorIcon,
    EmailGeneratorIcon,
} from './icons';
import Image from 'next/image';
import { cn } from '@/lib/utils';

// Define the tab type
interface Tab {
    id: string;
    label: string;
    icon: React.ReactNode;
    lightImage: string;
    darkImage: string;
    title: string;
    description: string;
}

export default function AIToolsTabs() {
    const [activeTab, setActiveTab] = useState('pr-review');

    // Tab data for code review features
    const tabs: Tab[] = [
        {
            id: 'pr-review',
            label: 'PR Review',
            icon: <CodeGeneratorIcon className="w-8 h-8" />,
            lightImage: '/images/tab-image/tab-image-1.jpg',
            darkImage: '/images/tab-image/tab-image-1-dark.jpg',
            title: 'Instant Pull Request Analysis',
            description:
                'Get comprehensive code reviews on every PR in seconds. Our AI analyzes your changes for bugs, security issues, and code quality problems before they reach production.',
        },
        {
            id: 'security',
            label: 'Security Scan',
            icon: <ImageGeneratorIcon className="w-8 h-8" />,
            lightImage: '/images/tab-image/tab-image-2.jpg',
            darkImage: '/images/tab-image/tab-image-2-dark.jpg',
            title: 'Find Vulnerabilities Before Hackers Do',
            description:
                'Detect OWASP Top 10 vulnerabilities, insecure dependencies, and security anti-patterns. Get actionable fixes with severity ratings and remediation guidance.',
        },
        {
            id: 'code-quality',
            label: 'Code Quality',
            icon: <TextGeneratorIcon className="w-8 h-8" />,
            lightImage: '/images/tab-image/tab-image-3.jpg',
            darkImage: '/images/tab-image/tab-image-3-dark.jpg',
            title: 'Enforce Best Practices Automatically',
            description:
                'Maintain consistent code standards across your team. Inspectra checks for code smells, complexity issues, and ensures adherence to your style guide.',
        },
        {
            id: 'performance',
            label: 'Performance',
            icon: <VideoGeneratorIcon className="w-8 h-8" />,
            lightImage: '/images/tab-image/tab-image-4.jpg',
            darkImage: '/images/tab-image/tab-image-4-dark.jpg',
            title: 'Catch Performance Issues Early',
            description:
                'Identify memory leaks, N+1 queries, inefficient algorithms, and performance bottlenecks before they impact your users in production.',
        },
        {
            id: 'suggestions',
            label: 'AI Suggestions',
            icon: <EmailGeneratorIcon className="w-8 h-8" />,
            lightImage: '/images/tab-image/tab-image-5.jpg',
            darkImage: '/images/tab-image/tab-image-5-dark.jpg',
            title: 'Learn as You Code',
            description:
                'Get intelligent refactoring suggestions and learn industry best practices. Our AI explains why changes are recommended so your team continuously improves.',
        },
    ];

    // Find the active tab
    const currentTab = tabs.find((tab) => tab.id === activeTab) || tabs[0];

    return (
        <section id="tools" className="py-14 md:py-28 dark:bg-dark-primary">
            <div className="wrapper">
                <div className="max-w-2xl mx-auto mb-12 text-center">
                    <h2 className="mb-3 font-bold text-center text-gray-800 dark:text-white/90 text-3xl md:text-title-lg">
                        Everything You Need to Ship Better Code
                    </h2>
                    <p className="max-w-2xl mx-auto leading-6 text-gray-500 dark:text-gray-400">
                        From security scanning to performance optimization, Inspectra covers
                        every aspect of code quality so you can focus on building features.
                    </p>
                </div>

                <div className="max-w-[1008px] mx-auto">
                    <div>
                        {/* Tab Navigation */}
                        <div className="overflow-x-auto custom-scrollbar mx-auto max-w-fit relative">
                            <div className="flex gap-2 min-w-max rounded-full bg-gray-100 dark:bg-white/5 p-1">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`flex items-center h-12 gap-2 px-4 py-3 text-sm font-medium transition-colors duration-200 rounded-full ${activeTab === tab.id
                                            ? 'bg-white dark:text-white/90 dark:bg-white/10 text-gray-800'
                                            : 'text-gray-500 dark:text-gray-400 bg-transparent'
                                            }`}
                                    >
                                        {tab.icon}
                                        <span className="truncate">{tab.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Tab Content */}

                        <div className="p-6 tab-img-bg overflow-hidden rounded-4xl mt-8">
                            <div className="p-3 tab-img-overlay">
                                {tabs.map((tab) => (
                                    <Fragment key={tab.id}>
                                        <Image
                                            src={tab.lightImage || '/placeholder.svg'}
                                            alt={tab.label}
                                            width={936}
                                            height={535}
                                            className={cn(
                                                'w-full rounded-2xl block dark:hidden',
                                                currentTab.id !== tab.id && 'hidden!'
                                            )}
                                            quality={90}
                                            priority
                                        />

                                        <Image
                                            src={tab.darkImage || '/placeholder.svg'}
                                            alt={tab.label}
                                            width={936}
                                            height={535}
                                            className={cn(
                                                'w-full rounded-2xl hidden dark:block',
                                                currentTab.id !== tab.id && 'hidden!'
                                            )}
                                            quality={90}
                                            priority
                                        />
                                    </Fragment>
                                ))}
                            </div>
                        </div>

                        {/* Bottom Section */}
                        <div className="mt-6 text-center">
                            <h2 className="mb-2 text-xl font-bold text-gray-800 dark:text-white/90">
                                {currentTab.title}
                            </h2>
                            <p className="max-w-xl mx-auto mb-6 text-sm text-gray-500 dark:text-gray-400">
                                {currentTab.description}
                            </p>
                            <button className="px-6 py-3 text-sm font-medium text-white transition-colors rounded-full bg-primary-500 hover:bg-primary-600">
                                Start Free Trial
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
