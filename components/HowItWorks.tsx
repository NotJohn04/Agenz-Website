"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  IconSearch,
  IconBulb,
  IconRocket,
  IconTrendingUp,
} from "@tabler/icons-react";

interface HowItWorksProps {
  onOpenLeadForm?: () => void;
}

const steps = [
  {
    number: "01",
    title: "Discovery",
    description:
      "We analyze your business, market, and current systems to understand your unique challenges and opportunities.",
    icon: IconSearch,
  },
  {
    number: "02",
    title: "Strategy",
    description:
      "We design your AI-powered growth system blueprint, mapping out every automation and touchpoint.",
    icon: IconBulb,
  },
  {
    number: "03",
    title: "Build",
    description:
      "We implement automation, ads, AI chatbots, and all the tools needed for autonomous lead generation.",
    icon: IconRocket,
  },
  {
    number: "04",
    title: "Scale",
    description:
      "We optimize, iterate, and grow with data — continuously improving your results over time.",
    icon: IconTrendingUp,
  },
];

function StepCard({
  step,
  index,
  isLast,
}: {
  step: (typeof steps)[0];
  index: number;
  isLast: boolean;
}) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="relative"
    >
      {/* Connector Line (Desktop) */}
      {!isLast && (
        <div className="hidden lg:block absolute top-12 left-[calc(50%+24px)] w-[calc(100%-48px)] h-[2px]">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.8, delay: index * 0.15 + 0.3 }}
            className="h-full bg-gradient-to-r from-blue-500/50 to-cyan-500/50 origin-left"
          />
        </div>
      )}

      {/* Connector Line (Mobile) */}
      {!isLast && (
        <div className="lg:hidden absolute left-6 top-24 w-[2px] h-[calc(100%-48px)]">
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 0.8, delay: index * 0.15 + 0.3 }}
            className="h-full bg-gradient-to-b from-blue-500/50 to-cyan-500/50 origin-top"
          />
        </div>
      )}

      <div className="relative flex flex-row lg:flex-col items-start lg:items-center gap-4 lg:gap-6 text-left lg:text-center">
        {/* Step Number & Icon */}
        <div className="relative">
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 15,
              delay: index * 0.15,
            }}
            className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-500"
          >
            <step.icon className="h-6 w-6 text-white" />
          </motion.div>
          {/* Glow behind icon */}
          <div className="absolute inset-0 rounded-full bg-blue-500/30 blur-lg" />
        </div>

        {/* Content */}
        <div className="flex-1 lg:flex-none">
          {/* Step Number Badge */}
          <span className="inline-block text-xs font-bold text-blue-400 tracking-wider mb-2">
            STEP {step.number}
          </span>

          {/* Title */}
          <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>

          {/* Description */}
          <p className="text-white/60 text-sm leading-relaxed max-w-xs lg:mx-auto">
            {step.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export function HowItWorks({ onOpenLeadForm }: HowItWorksProps) {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section
      id="how-it-works"
      className="relative py-24 sm:py-32 overflow-hidden bg-[#0a0a0a]"
    >
      {/* Background */}
      <div className="absolute inset-0 radial-glow" />
      <div className="absolute inset-0 grid-pattern opacity-10" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 lg:mb-20"
        >
          <span className="inline-flex items-center px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-sm font-medium text-cyan-300 backdrop-blur-sm mb-6">
            Our Process
          </span>
          <h2 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl mb-4">
            How It Works
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-white/60">
            A proven 4-step process to transform your customer acquisition with AI
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid gap-12 lg:grid-cols-4 lg:gap-8">
          {steps.map((step, index) => (
            <StepCard
              key={step.number}
              step={step}
              index={index}
              isLast={index === steps.length - 1}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 lg:mt-20 text-center"
        >
          <p className="text-white/50 mb-6">
            Ready to start your journey?
          </p>
          <button
            onClick={onOpenLeadForm}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full transition-all duration-300 hover:shadow-[0_0_40px_rgba(59,130,246,0.5)] hover:-translate-y-1"
          >
            Start Your Discovery Call
          </button>
        </motion.div>
      </div>
    </section>
  );
}

export default HowItWorks;
