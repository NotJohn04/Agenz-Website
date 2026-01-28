"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

type Testimonial = {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
};

type Stat = {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  sublabel: string;
};

function CountUp({
  value,
  suffix = "",
  prefix = "",
}: {
  value: number;
  suffix?: string;
  prefix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 800;
    const step = Math.max(1, Math.floor(value / 40));
    const interval = setInterval(() => {
      start += step;
      if (start >= value) {
        start = value;
        clearInterval(interval);
      }
      setCount(start);
    }, duration / 40);
    return () => clearInterval(interval);
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

export function Results() {
  const testimonials: Testimonial[] = [
    {
      quote:
        "Our WhatsApp follow-ups became instant. Conversion rate jumped 40% in the first month. The AI knows exactly when and how to reach out.",
      author: "Sarah Chen",
      role: "Founder",
      company: "Fashion E-commerce",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=320&h=320&auto=format&fit=facearea&facepad=2",
    },
    {
      quote:
        "The AI chatbot handles 80% of inquiries automatically. Our team can finally focus on closing deals instead of answering repetitive questions.",
      author: "Marcus Tan",
      role: "CEO",
      company: "HR Tech Startup",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=320&h=320&auto=format&fit=facearea&facepad=2",
    },
    {
      quote:
        "Lead distribution and automated follow-ups transformed our sales pipeline. Best investment we've made this year.",
      author: "David Lim",
      role: "Director",
      company: "Property Developer",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=320&h=320&auto=format&fit=facearea&facepad=2",
    },
    {
      quote:
        "From ads to WhatsApp to booking - everything is automated. We've scaled to 5 outlets without adding sales staff.",
      author: "Amy Wong",
      role: "Operations Manager",
      company: "Restaurant Chain",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=320&h=320&auto=format&fit=facearea&facepad=2",
    },
  ];

  const stats: Stat[] = [
    {
      label: "Average ROAS",
      value: 3,
      suffix: "x",
      sublabel: "across all campaigns",
    },
    {
      label: "Lead Response Time",
      value: 30,
      prefix: "<",
      suffix: "s",
      sublabel: "instant AI response",
    },
    {
      label: "Lower CAC",
      value: 40,
      suffix: "%",
      sublabel: "reduced acquisition cost",
    },
    {
      label: "Conversion Increase",
      value: 67,
      suffix: "%",
      sublabel: "with automation",
    },
  ];

  return (
    <section
      id="results"
      className="relative overflow-hidden bg-[#0a0a0a] py-24 sm:py-32"
    >
      {/* Background Effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 right-1/3 h-[36rem] w-[36rem] rounded-full blur-[150px] opacity-20 bg-blue-500/30" />
        <div className="absolute -bottom-24 left-1/3 h-[30rem] w-[30rem] rounded-full blur-[150px] opacity-15 bg-cyan-500/30" />
      </div>
      <div className="absolute inset-0 grid-pattern opacity-5" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mb-16"
        >
          <span className="inline-flex items-center px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-sm font-medium text-blue-300 backdrop-blur-sm mb-6">
            Proven Results
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Trusted by Growing Businesses
          </h2>
          <p className="text-lg text-white/60">
            Real growth driven by AI automation, instant follow-ups, and data-driven
            optimization across multiple industries.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 text-center"
            >
              <p className="text-sm text-white/50 mb-2">{stat.label}</p>
              <p className="text-4xl sm:text-5xl font-bold gradient-text-cyan">
                <CountUp
                  value={stat.value}
                  suffix={stat.suffix}
                  prefix={stat.prefix}
                />
              </p>
              <p className="mt-2 text-sm text-white/40">{stat.sublabel}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials */}
        <div className="grid gap-6 sm:grid-cols-2">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.08]"
            >
              {/* Quote */}
              <p className="text-white/80 leading-relaxed mb-6">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="relative h-12 w-12 rounded-full overflow-hidden">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold text-white">{testimonial.author}</p>
                  <p className="text-sm text-white/50">
                    {testimonial.role} | {testimonial.company}
                  </p>
                </div>
              </div>

              {/* Hover Glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/10 via-transparent to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Results;
