"use client";

import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { LeadFormModal } from "@/components/LeadFormModal";
import {
  IconTarget,
  IconRocket,
  IconUsers,
  IconHeart,
  IconBulb,
  IconTrendingUp,
  IconArrowRight,
} from "@tabler/icons-react";
import Image from "next/image";

const values = [
  {
    icon: IconBulb,
    title: "Innovation First",
    description:
      "We stay at the forefront of AI and automation technology to deliver cutting-edge solutions.",
  },
  {
    icon: IconTarget,
    title: "Results Driven",
    description:
      "Every strategy is focused on measurable outcomes that directly impact your bottom line.",
  },
  {
    icon: IconUsers,
    title: "Client Partnership",
    description:
      "We see ourselves as an extension of your team, invested in your long-term success.",
  },
  {
    icon: IconHeart,
    title: "Integrity",
    description:
      "Transparent communication, honest advice, and ethical practices guide everything we do.",
  },
];

const timeline = [
  {
    year: "2024",
    title: "The Beginning",
    description:
      "Started in April 2024 as an agency exclusively working with solar companies. We wanted to niche into the solar industry and be the best in the pond before becoming the best in the ocean.",
  },
  {
    year: "2025",
    title: "Dominating Solar",
    description:
      "Successfully onboarded more than 10 clients in the solar industry and developed a proven method for customer acquisition through automation. We monopolised the solar niche by becoming the best at what we do.",
  },
  {
    year: "2026",
    title: "Agenz.MY Is Born",
    description:
      "Rebranded to Agenz.my to serve every industry. Any company that needs customers, we can help. Our proven systems now power businesses across all sectors.",
  },
];

const stats = [
  { value: "20+", label: "Clients Served" },
  { value: "3x", label: "Average ROAS" },
  { value: "RM 357K+", label: "Revenue Generated" },
  { value: "<30s", label: "Lead Response Time" },
];

export default function AboutPage() {
  const [isLeadFormOpen, setIsLeadFormOpen] = useState(false);
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  const openLeadForm = () => setIsLeadFormOpen(true);
  const closeLeadForm = () => setIsLeadFormOpen(false);

  return (
    <main className="min-h-screen bg-black">
      <Navbar onOpenLeadForm={openLeadForm} />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 radial-glow opacity-50" />
        <div className="absolute inset-0 grid-pattern opacity-5" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-flex items-center px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-sm font-medium text-blue-300 backdrop-blur-sm mb-6">
              About Us
            </span>
            <h1 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl mb-6">
              Revolutionizing Customer Acquisition with{" "}
              <span className="gradient-text">AI</span>
            </h1>
            <p className="text-lg text-white/60">
              We&apos;re on a mission to help Malaysian businesses grow faster and
              smarter through AI-powered marketing and automation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-6 sm:grid-cols-4"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 rounded-xl border border-white/10 bg-white/5"
              >
                <p className="text-3xl sm:text-4xl font-bold gradient-text-cyan">
                  {stat.value}
                </p>
                <p className="text-sm text-white/50 mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="relative py-20 bg-[#0a0a0a]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 lg:p-12"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 text-blue-400 mb-6">
                <IconTarget className="h-7 w-7" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
              <p className="text-white/60 leading-relaxed">
                To empower Malaysian businesses with AI-powered marketing and automation
                solutions that were once only available to large enterprises. We believe
                every business deserves access to cutting-edge technology that drives
                real growth.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 lg:p-12"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 text-blue-400 mb-6">
                <IconRocket className="h-7 w-7" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">Our Vision</h2>
              <p className="text-white/60 leading-relaxed">
                To become Southeast Asia&apos;s leading AI marketing agency, known for
                transforming how businesses acquire and engage customers. We envision a
                future where AI handles the heavy lifting, freeing teams to focus on
                what matters most.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="relative py-20">
        <div className="absolute inset-0 radial-glow opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <span className="inline-flex items-center px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm font-medium text-white/60 backdrop-blur-sm mb-6">
              Our Story
            </span>
            <h2 className="text-3xl font-bold text-white sm:text-4xl mb-6">
              The Journey So Far
            </h2>
            <p className="text-white/60">
              From dominating the solar industry to serving businesses across all sectors,
              here&apos;s how we&apos;ve grown.
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/50 via-cyan-500/50 to-transparent hidden lg:block" />

            <div className="space-y-12 lg:space-y-0">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative lg:flex lg:items-center ${
                    index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                >
                  <div className="lg:w-1/2 lg:px-12">
                    <div
                      className={`relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 ${
                        index % 2 === 0 ? "lg:text-right" : "lg:text-left"
                      }`}
                    >
                      <span className="text-4xl font-bold gradient-text">{item.year}</span>
                      <h3 className="text-xl font-semibold text-white mt-2 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-white/60">{item.description}</p>
                    </div>
                  </div>

                  {/* Timeline Dot */}
                  <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 h-4 w-4 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 shadow-[0_0_20px_rgba(59,130,246,0.5)]" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="relative py-20 bg-[#0a0a0a]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mb-12"
          >
            <span className="inline-flex items-center px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-sm font-medium text-blue-300 backdrop-blur-sm mb-6">
              Our Values
            </span>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              What Drives Us
            </h2>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 transition-all duration-300 hover:border-blue-500/50"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 text-blue-400 mb-4 transition-colors group-hover:from-blue-500/30 group-hover:to-cyan-500/30">
                  <value.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{value.title}</h3>
                <p className="text-sm text-white/60">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section Placeholder */}
      <section className="relative py-20">
        <div className="absolute inset-0 radial-glow opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <span className="inline-flex items-center px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm font-medium text-white/60 backdrop-blur-sm mb-6">
              Our Team
            </span>
            <h2 className="text-3xl font-bold text-white sm:text-4xl mb-4">
              Meet the People Behind Agenz
            </h2>
            <p className="text-white/60">
              A passionate team of marketers, developers, and AI specialists dedicated to
              your success.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center py-16 rounded-2xl border border-white/10 bg-white/5"
          >
            <IconUsers className="h-16 w-16 text-white/20 mx-auto mb-4" />
            <p className="text-white/40">Team profiles coming soon</p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 bg-[#0a0a0a]">
        <div className="absolute inset-0 radial-glow opacity-30" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white sm:text-4xl mb-4">
              Ready to Join Our Success Stories?
            </h2>
            <p className="text-lg text-white/60 mb-8">
              Let&apos;s discuss how we can help transform your customer acquisition.
            </p>
            <button
              onClick={openLeadForm}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full overflow-hidden transition-all duration-300 hover:shadow-[0_0_50px_rgba(59,130,246,0.5)] hover:-translate-y-1"
            >
              Get in Touch
              <IconArrowRight className="h-5 w-5" />
            </button>
          </motion.div>
        </div>
      </section>

      <Footer />
      <LeadFormModal isOpen={isLeadFormOpen} onClose={closeLeadForm} />
    </main>
  );
}
