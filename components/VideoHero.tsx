"use client";

import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { IconPlayerPlay, IconArrowRight } from "@tabler/icons-react";


interface VideoHeroProps {
  onOpenLeadForm: () => void;
}

export function VideoHero({ onOpenLeadForm }: VideoHeroProps) {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const headline = "Revolutionizing the Art of Acquiring Customers with AI";
  const words = headline.split(" ");

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 lg:pt-24">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        {/* Placeholder/Fallback Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0a0a0a] to-black" />

        {/* Video Element */}
        <video
          autoPlay
          muted
          loop
          playsInline
          onLoadedData={() => setIsVideoLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${isVideoLoaded ? "opacity-40" : "opacity-0"
            }`}
        >
          <source src="/video/hero-video.mp4" type="video/mp4" />
        </video>

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />

        {/* Animated Glow Effects */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] animate-pulse delay-1000" />

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 grid-pattern opacity-30" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-sm font-medium text-blue-300 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500" />
            </span>
            AI-Powered Growth Systems
          </span>
        </motion.div>

        {/* Headline with Word Animation */}
        <h1 className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
          {words.map((word, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                duration: 0.5,
                delay: 0.3 + index * 0.08,
                ease: "easeOut",
              }}
              className={`inline-block mr-[0.25em] ${word === "AI" ? "gradient-text" : ""
                }`}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="mx-auto max-w-2xl text-lg text-white/70 sm:text-xl mb-10"
        >
          We don&apos;t just automate marketing. We engineer autonomous growth systems
          that acquire customers while you sleep.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          {/* Primary CTA */}
          <button
            onClick={onOpenLeadForm}
            className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(59,130,246,0.5)] hover:-translate-y-1"
          >
            <span className="relative z-10">Book a Strategy Call</span>
            <IconArrowRight className="relative z-10 h-5 w-5 transition-transform group-hover:translate-x-1" />
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </button>

          {/* Secondary CTA */}
          <a
            href="https://profile.agenz.my"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white border border-white/20 rounded-full transition-all duration-300 hover:bg-white/10 hover:border-white/40"
          >
            <IconPlayerPlay className="h-5 w-5" />
            View Our Company Profile
          </a>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.6 }}
          className="mt-16 grid grid-cols-2 gap-8 sm:grid-cols-4 sm:gap-12"
        >
          {[
            { value: "20+", label: "Clients Served" },
            { value: "3x", label: "Average ROAS" },
            { value: "<30s", label: "AI Response Time" },
            { value: "40%", label: "Lower CAC" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.6 + index * 0.1 }}
              className="text-center"
            >
              <div className="text-2xl font-bold text-white sm:text-3xl gradient-text-cyan">
                {stat.value}
              </div>
              <div className="mt-1 text-sm text-white/50">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <a
            href="#trusted-by"
            className="flex flex-col items-center gap-2 text-white/40 hover:text-white/60 transition-colors"
          >
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-5 h-8 rounded-full border-2 border-current flex items-start justify-center p-1"
            >
              <div className="w-1 h-2 rounded-full bg-current" />
            </motion.div>
          </a>
        </motion.div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-10" />
    </section>
  );
}

export default VideoHero;
