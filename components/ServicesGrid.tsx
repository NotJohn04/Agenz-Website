"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  IconSparkles,
  IconTarget,
  IconWorld,
  IconBolt,
  IconArrowRight,
} from "@tabler/icons-react";

const services = [
  {
    title: "AI Creative Solutions",
    description: "Generate scroll-stopping content at scale with AI-powered creativity",
    icon: IconSparkles,
    features: ["AI Creatives", "AI Videos", "Real Content Creation"],
    color: "from-purple-500 to-pink-500",
    glowColor: "purple",
    href: "/services?category=ai-creative",
  },
  {
    title: "Digital Marketing",
    description: "Data-driven campaigns that convert across all platforms",
    icon: IconTarget,
    features: ["Social Media Management", "Influencer Marketing", "Ads & Analytics"],
    color: "from-blue-500 to-cyan-500",
    glowColor: "blue",
    href: "/services?category=digital-marketing",
  },
  {
    title: "Web Solutions",
    description: "Beautiful websites that perform and convert visitors",
    icon: IconWorld,
    features: ["Website Design", "Website Development", "Website Hosting"],
    color: "from-emerald-500 to-teal-500",
    glowColor: "emerald",
    href: "/services?category=web-solutions",
  },
  {
    title: "Business Automation",
    description: "Automate everything, miss nothing with intelligent systems",
    icon: IconBolt,
    features: ["CRM Integration", "AI Chatbot", "Workflow Automation"],
    color: "from-orange-500 to-amber-500",
    glowColor: "orange",
    href: "/services?category=automation",
  },
];

function ServiceCard({
  service,
  index,
}: {
  service: (typeof services)[0];
  index: number;
}) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative"
    >
      <a href={service.href} className="block h-full">
        <div className="relative h-full rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 sm:p-8 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.08] hover:-translate-y-2">
          {/* Glow Effect on Hover */}
          <div
            className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl -z-10 ${
              service.glowColor === "purple"
                ? "bg-purple-500/20"
                : service.glowColor === "blue"
                ? "bg-blue-500/20"
                : service.glowColor === "emerald"
                ? "bg-emerald-500/20"
                : "bg-orange-500/20"
            }`}
          />

          {/* Icon */}
          <div
            className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${service.color} mb-6`}
          >
            <service.icon className="h-6 w-6 text-white" />
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>

          {/* Description */}
          <p className="text-white/60 mb-6 leading-relaxed">
            {service.description}
          </p>

          {/* Features */}
          <ul className="space-y-2 mb-6">
            {service.features.map((feature) => (
              <li
                key={feature}
                className="flex items-center gap-2 text-sm text-white/50"
              >
                <div className={`h-1.5 w-1.5 rounded-full bg-gradient-to-r ${service.color}`} />
                {feature}
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="flex items-center gap-2 text-sm font-medium text-white/70 group-hover:text-white transition-colors">
            <span>Explore</span>
            <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </a>
    </motion.div>
  );
}

export function ServicesGrid() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section id="services" className="relative py-24 sm:py-32 overflow-hidden bg-black">
      {/* Background */}
      <div className="absolute inset-0 radial-glow-bottom" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-sm font-medium text-blue-300 backdrop-blur-sm mb-6">
            Our Capabilities
          </span>
          <h2 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl mb-4">
            What We Build For You
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-white/60">
            End-to-end AI-powered solutions for modern businesses looking to scale
            their customer acquisition.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>

        {/* View All Services CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <a
            href="/services"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white/70 border border-white/20 rounded-full transition-all duration-300 hover:bg-white/10 hover:text-white hover:border-white/40"
          >
            View All Services
            <IconArrowRight className="h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export default ServicesGrid;
