
import Image from "next/image";
import Link from "next/link";
import React from "react";
import BenefitsGraphics from "./benefits-graphics";

export default function BenefitsGrid() {
    return (
        <section className="bg-gray-900 py-14 md:py-28">
            <div className="wrapper">
                <div className="max-w-2xl mx-auto mb-12 text-center">
                    <h2 className="max-w-lg mx-auto mb-3 font-bold text-center text-white dark:text-white/90 text-3xl md:text-title-lg">
                        Why Teams Choose Inspectra
                    </h2>
                    <p className="max-w-2xl mx-auto text-base dark: font-normal leading-6 text-white/50">
                        Join thousands of developers who ship faster and with more confidence
                        using AI-powered code reviews.
                    </p>
                </div>
                <div className="max-w-[1008px] mx-auto">
                    <div className="grid lg:grid-cols-12 gap-8">
                        <div className="lg:col-span-6">
                            <div className="relative flex flex-col justify-between bg-primary-500 rounded-[20px] p-9 md:p-13">
                                <div className="max-w-sm mb-32">
                                    <h3 className="font-bold text-white text-2xl md:text-3xl mb-4">
                                        Catch Bugs Before Your Users Do
                                    </h3>
                                    <p className="text-base text-white/70">
                                        Our AI analyzes every line of code to find bugs, edge cases,
                                        and logic errors that human reviewers often miss.
                                    </p>
                                </div>
                                <div>
                                    <BenefitsGraphics />

                                    <Image
                                        src="/images/benefits/bn-1.svg"
                                        className="-mb-8 md:-mb-13 w-full"
                                        alt=""
                                        width={488}
                                        height={288}
                                        sizes="100vw"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="lg:col-span-6">
                            <div className="benefits-bg rounded-[20px] p-12 overflow-hidden">
                                <div>
                                    <Image
                                        src="/images/benefits/bn-2.svg"
                                        alt=""
                                        width={306}
                                        height={279}
                                    />
                                </div>
                                <div>
                                    <h3 className="font-bold max-w-xs text-white text-2xl md:text-3xl mb-4">
                                        Review PRs 10x Faster
                                    </h3>
                                    <p className="text-base max-w-sm text-white/70">
                                        Stop waiting hours for code reviews. Get instant, comprehensive
                                        feedback on every pull request in seconds.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="lg:col-span-12">
                            <div className="lg:px-12 p-8 bg-[#2D0B70] lg:pb-0 lg:p-12 relative rounded-[20px] h-full lg:flex lg:flex-row justify-between bg-cover flex-col gap-5">
                                <div className="max-w-sm relative z-10">
                                    <h3 className="font-bold text-white text-2xl md:text-3xl mb-4">
                                        Ship Secure Code with Confidence
                                    </h3>
                                    <p className="text-base text-white/70 mb-8">
                                        Automated security scanning catches vulnerabilities before they
                                        reach production. Stay compliant and protect your users.
                                    </p>
                                    <Link
                                        href="/signup"
                                        className="font-medium inline-block text-sm text-white rounded-full bg-primary-500 hover:bg-primary-600 transition py-3 px-6"
                                    >
                                        Start Free Trial
                                    </Link>
                                </div>
                                <div>
                                    <Image
                                        src="/images/benefits/bn-3.svg"
                                        className="hidden lg:block relative z-10"
                                        alt=""
                                        width={359}
                                        height={318}
                                    />
                                </div>
                                <Image
                                    src="/images/benefits/blur-shape.png"
                                    alt=""
                                    className="h-full w-full -z-0 absolute top-0 right-0"
                                    width={399}
                                    height={399}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
