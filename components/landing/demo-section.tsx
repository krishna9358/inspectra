"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GithubInlineComments, { DiffLine } from "@/components/landing/github-inline-comments";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function DemoSection() {
    const container = useRef(null);
    const wrapperRef = useRef(null);

    useGSAP(() => {
        gsap.from(wrapperRef.current, {
            scrollTrigger: {
                trigger: container.current,
                start: "top center",
                end: "center center",
                scrub: 1,
            },
            y: 50,
            opacity: 0,
            scale: 0.95,
            duration: 1
        });
    }, { scope: container });

    // Payment service vulnerability example
    const diff: DiffLine[] = [
        { kind: "hunk", content: "@@ -145,9 +145,11 @@" },
        { kind: "context", old: 145, new: 145, content: "  async processRefund(transactionId: string) {" },
        { kind: "context", old: 146, new: 146, content: "    const transaction = await db.getTransaction(transactionId);" },
        { kind: "context", old: 147, new: 147, content: "    " },
        { kind: "context", old: 148, new: 148, content: "    if (!transaction) throw new Error('Transaction not found');" },
        { kind: "context", old: 149, new: 149, content: "    " },
        { kind: "add", old: null, new: 150, content: "    // Refund logic" },
        { kind: "add", old: null, new: 151, content: "    await this.gateway.refund(transaction.amount);" },
        { kind: "add", old: null, new: 152, content: "    await db.updateStatus(transaction.id, 'REFUNDED');" },
        { kind: "context", old: 150, new: 153, content: "  }" },
    ];
    
    // Comment on line 151 (index 7 in the diff array)
    const initialComments = {
        7: [
             {
                 user: "Horsify AI",
                 avatar: "",
                 isAi: true,
                 time: "Just now",
                 content: "Critical Security Risk: This operation is not idempotent. If the generic refund call fails midway or times out, retrying this function could trigger a second refund.",
                 suggestion: "await this.gateway.refund(transaction.amount, { idempotencyKey: transaction.id });"
             }
        ]
    };

    return (
        <section ref={container} className="py-32 bg-[#0a0a0a] overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col items-center mb-16 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Deep Contextual Understanding</h2>
                    <p className="text-zinc-400 max-w-2xl">
                        Horsify understands the intent of your code, not just the syntax. It catches logical errors that linters miss.
                    </p>
                </div>

                <div ref={wrapperRef} className="flex justify-center">
                    <GithubInlineComments 
                        fileName="src/payment-service.ts" 
                        diff={diff}
                        initialComments={initialComments}
                    />
                </div>
            </div>
        </section>
    );
}
