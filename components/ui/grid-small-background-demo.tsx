import { cn } from "@/lib/utils";
import React from "react";

export default function GridSmallBackgroundDemo({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <div className={cn("relative flex w-full min-h-screen items-center justify-center bg-background px-4", className)}>
            {/* Grid Pattern */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.15]"
                style={{
                    backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
                    backgroundSize: '25px 25px',
                    backgroundRepeat: 'repeat',
                }}
            />

            {/* Radial Gradient Overlay (Vignette) */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

            {/* Content */}
            <div className="relative z-20 w-full max-w-9xl mx-auto">
                {children}
            </div>
        </div>
    );
}
