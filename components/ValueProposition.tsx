"use client";

import React from "react";
import { motion } from "motion/react";
import { useInView } from "framer-motion";
import { useRef } from "react";

const paragraphs = [
  {
    text: "At Agenz, we're not building another marketing agency.",
    highlight: false,
  },
  {
    text: "We're engineering the future of customer acquisition.",
    highlight: true,
  },
  {
    text: "If AI is transforming the fundamental nature of work itself — and it is — then using AI to acquire customers means building systems that work tirelessly, intelligently, and at scale.",
    highlight: false,
  },
  {
    text: "While others hire more salespeople, we deploy AI that never sleeps.",
    highlight: false,
    isContrast: true,
  },
  {
    text: "While others guess at what works, we let data decide.",
    highlight: false,
    isContrast: true,
  },
  {
    text: "While others chase leads manually, we build machines that attract, qualify, and convert automatically.",
    highlight: false,
    isContrast: true,
  },
  {
    text: "70% of work will be augmented or replaced by AI.",
    highlight: true,
    isStat: true,
  },
  {
    text: "We're here to accelerate that outcome for your business — ethically, strategically, and profitably.",
    highlight: false,
  },
  {
    text: "The question isn't whether AI will transform your industry. It's whether you'll be leading that transformation or chasing it.",
    highlight: true,
    isClosing: true,
  },
];

function AnimatedParagraph({
  text,
  highlight,
  isContrast,
  isStat,
  isClosing,
  index,
}: {
  text: string;
  highlight?: boolean;
  isContrast?: boolean;
  isStat?: boolean;
  isClosing?: boolean;
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.p
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`
        ${highlight ? "text-2xl sm:text-3xl md:text-4xl font-bold" : "text-lg sm:text-xl md:text-2xl"}
        ${highlight && !isStat && !isClosing ? "gradient-text" : ""}
        ${isStat ? "text-3xl sm:text-4xl md:text-5xl font-bold gradient-text-cyan" : ""}
        ${isClosing ? "text-xl sm:text-2xl md:text-3xl font-semibold text-white" : ""}
        ${isContrast ? "text-white/80 pl-4 border-l-2 border-blue-500/50" : ""}
        ${!highlight && !isContrast ? "text-white/60" : ""}
        leading-relaxed
      `}
    >
      {text}
    </motion.p>
  );
}

export function ValueProposition() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden bg-black">
      {/* Background Effects */}
      <div className="absolute inset-0 radial-glow" />
      <div className="absolute inset-0 radial-glow-bottom" />
      <div className="absolute inset-0 grid-pattern opacity-20" />

      {/* Floating Glow Orbs */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-blue-500/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-cyan-500/5 rounded-full blur-[100px]" />

      <div ref={containerRef} className="relative mx-auto max-w-4xl px-6 lg:px-8">
        {/* Section Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <span className="inline-flex items-center px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm font-medium text-white/60 backdrop-blur-sm">
            Our Philosophy
          </span>
        </motion.div>

        {/* Content */}
        <div className="space-y-8 text-center">
          {paragraphs.map((para, index) => (
            <AnimatedParagraph
              key={index}
              text={para.text}
              highlight={para.highlight}
              isContrast={para.isContrast}
              isStat={para.isStat}
              isClosing={para.isClosing}
              index={index}
            />
          ))}
        </div>

        {/* Decorative Elements */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-16 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"
        />
      </div>
    </section>
  );
}

export default ValueProposition;
