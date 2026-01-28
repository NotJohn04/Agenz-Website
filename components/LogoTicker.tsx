"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { StaticImageData } from "next/image";


type Logo = {
    src: string | StaticImageData;
    alt: string;
    href?: string;
};

type Props = {
    logos: Logo[];
    speed?: number;
    logoHeight?: number;
    cardHeight?: number;
};

export default function LogoTicker({
    logos,
    speed = 22,
    logoHeight = 56,
    cardHeight = 96,
}: Props) {
    const reduceMotion = useReducedMotion();
    const segmentRef = React.useRef<HTMLDivElement | null>(null);
    const [distance, setDistance] = React.useState(0);

    React.useLayoutEffect(() => {
        const measure = () => {
            if (!segmentRef.current) return;
            setDistance(segmentRef.current.getBoundingClientRect().width);
        };
        measure();
        const ro = new ResizeObserver(measure);
        if (segmentRef.current) ro.observe(segmentRef.current);
        window.addEventListener("resize", measure);
        return () => {
            ro.disconnect();
            window.removeEventListener("resize", measure);
        };
    }, [logos.length]);

    return (
        <section className="relative w-full overflow-hidden py-12 sm:py-16 bg-neutral-950">
            {/* glow background */}
            <div className="pointer-events-none absolute inset-x-0 bottom-[-30%] h-[160%] bg-[radial-gradient(60%_60%_at_50%_90%,rgba(56,189,248,0.25),transparent_70%)] blur-3xl" />

            {/* fade edges */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-neutral-950 to-transparent z-10" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-neutral-950 to-transparent z-10" />

            <div className="relative mx-auto max-w-[1200px] px-4 sm:px-10">
                <div className="mb-6 text-center">
                    <span className="inline-flex items-center rounded-full border border-sky-400/30 bg-sky-400/10 px-4 py-1 text-xs font-medium text-sky-300 backdrop-blur">
                        Trusted by solar teams across Malaysia
                    </span>
                </div>

                <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-4 sm:p-6">
                    <motion.div
                        key={distance}
                        className="flex items-center gap-6 will-change-transform"
                        animate={
                            reduceMotion || distance === 0
                                ? undefined
                                : { x: [0, -distance] }
                        }
                        transition={
                            reduceMotion || distance === 0
                                ? undefined
                                : { duration: speed, ease: "linear", repeat: Infinity }
                        }
                    >
                        <div ref={segmentRef} className="flex items-center gap-6">
                            {logos.map((logo, i) => (
                                <LogoCard
                                    key={`A-${logo.alt}-${i}`}
                                    logo={logo}
                                    logoHeight={logoHeight}
                                    cardHeight={cardHeight}
                                />
                            ))}
                        </div>
                        <div aria-hidden className="flex items-center gap-6">
                            {logos.map((logo, i) => (
                                <LogoCard
                                    key={`B-${logo.alt}-${i}`}
                                    logo={logo}
                                    logoHeight={logoHeight}
                                    cardHeight={cardHeight}
                                />
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

function LogoCard({
    logo,
    logoHeight,
    cardHeight,
}: {
    logo: Logo;
    logoHeight: number;
    cardHeight: number;
}) {
    const Img = (
        <img
            src={typeof logo.src === "string" ? logo.src : logo.src.src}
            alt={logo.alt}
            className="
        h-10 sm:h-12 md:h-14
        object-contain
        opacity-80
        transition-all duration-300
        group-hover:opacity-100
        group-hover:scale-[1.03]
      "
            style={{ maxHeight: logoHeight }}
            draggable={false}
            onError={(e) => {
                console.warn(`[LogoTicker] Failed to load logo: ${logo.alt}`);
                (e.currentTarget as HTMLImageElement).style.opacity = "0.4";
            }}
        />
    );

    const Card = (
        <div
            className="
        group
        relative flex shrink-0 items-center justify-center
        rounded-2xl
        bg-white/90
        dark:bg-white/10
        px-6 sm:px-8
        w-[160px] sm:w-[200px] md:w-[240px]
        h-20 sm:h-24 md:h-28
        border border-white/20
        shadow-[0_10px_40px_rgba(0,0,0,0.35)]
        backdrop-blur-md
        transition-transform duration-300
        hover:-translate-y-1
      "
            style={{ maxHeight: cardHeight }}
        >
            {/* glow ring */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-sky-400/30 via-transparent to-purple-400/30 opacity-0 group-hover:opacity-100 transition-opacity blur-md" />
            <div className="relative z-10">{Img}</div>
        </div>
    );

    return logo.href ? (
        <a
            href={logo.href}
            aria-label={logo.alt}
            target="_blank"
            rel="noreferrer"
            className="focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/60 rounded-2xl"
        >
            {Card}
        </a>
    ) : (
        Card
    );
}
