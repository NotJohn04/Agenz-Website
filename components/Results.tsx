"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import { IconUser } from "@tabler/icons-react";

// Import testimonial avatars
import MaxThamAvatar from "@/components/partners/MaxTham.png";
import JustinYeeAvatar from "@/components/partners/JustinYee.png";
import JechoniasSushantAvatar from "@/components/partners/JechoniasSushant.png";

type Testimonial = {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar?: string | StaticImageData;
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
        "Really appreciate the service from Agenz. The team was always eager to help and delivered everything as promised. They managed our campaigns, built automation systems, revamped our website, and even recorded a video for us. Great job all around.",
      author: "Max Tham Weng How",
      role: "Group Managing Director",
      company: "Kemuning Structures & Vantage Steel",
      avatar: MaxThamAvatar,
    },
    {
      quote:
        "Agenz built automation for our company that changed everything. We used to manually update all our lists - it was either hire someone or do it ourselves. All that repetitive work? Gone. Agenz handles it all now. Literally replaced a whole job.",
      author: "Nicholas Puah",
      role: "CEO",
      company: "Elevated Studios",
    },
    {
      quote:
        "In the first week of working with Agenz, they ran a campaign that easily topped all our previous ones. Just based on cost per lead alone, it ranked in our top 10 lowest ever. And the quality was solid too - not just cheap leads, actually good ones.",
      author: "Justin Yee",
      role: "CEO",
      company: "TwentyThree Florist",
      avatar: JustinYeeAvatar,
    },
    {
      quote:
        "Amazing service!! Truly grateful to Agenz for putting in the effort - they were literally working day and night on our campaign. I'd see messages popping up in the chat at 3am, working on the project non-stop. All that dedication for an affordable price too.",
      author: "Jechonias Sushant",
      role: "CEO",
      company: "Geosav",
      avatar: JechoniasSushantAvatar,
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
                <div className="relative h-12 w-12 rounded-full overflow-hidden bg-white/10 flex items-center justify-center">
                  {testimonial.avatar ? (
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.author}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <IconUser className="h-6 w-6 text-white/40" />
                  )}
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
