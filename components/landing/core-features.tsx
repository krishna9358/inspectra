
import Image from "next/image";
import { CORE_FEATURES } from "./core-features-data";
import { Subheading } from "./subheading";

export function CoreFeatures() {
    return (
        <section id="features" className="py-14 md:py-28 dark:bg-[#171F2E]">
            <div className="wrapper">
                <div className="max-w-2xl mx-auto text-center mb-14">
                    <Subheading text="Why Developers Love Inspectra" />
                    <h2 className="text-gray-800 dark:text-white/90 font-bold text-3xl md:text-title-lg mb-3">
                        AI That Understands Your Code
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400">
                        Ship better code faster with intelligent analysis that catches issues humans miss
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
                    {CORE_FEATURES.map((feature) => (
                        <div
                            key={feature.title}
                            className="bg-white p-9 border border-gray-200 dark:bg-white/5 dark:border-white/3 rounded-[20px] shadow-[0px_30px_50px_-32px_rgba(107,110,148,0.04)]"
                        >
                            <div className="core-feature-icon mb-9">
                                <Image
                                    src={feature.iconUrl}
                                    alt={feature.title}
                                    role="presentation"
                                    width={40}
                                    height={40}
                                />
                            </div>

                            <h3 className="mb-4 text-gray-800 dark:text-white/90 font-bold text-xl md:text-2xl">
                                {feature.title}
                            </h3>
                            <p className="text-gray-500 dark:text-gray-400">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
