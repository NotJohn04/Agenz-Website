"use client";

import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useParams } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { LeadFormModal } from "@/components/LeadFormModal";
import {
  IconArrowRight,
  IconCheck,
  IconQuote,
} from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";

// Case study data
const caseStudiesData: Record<string, {
  title: string;
  category: string;
  client: string;
  industry: string;
  duration: string;
  image: string;
  challenge: string;
  solution: string[];
  results: { metric: string; value: string; description: string }[];
  testimonial?: { quote: string; author: string; role: string };
  services: string[];
}> = {
  "fashion-ecommerce-40-conversion-boost": {
    title: "Fashion E-commerce: 40% Conversion Boost",
    category: "E-commerce",
    client: "Fashion Retailer",
    industry: "E-commerce / Fashion",
    duration: "3 months",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop",
    challenge:
      "A growing fashion e-commerce brand was struggling with high cart abandonment rates and slow response times to customer inquiries. Their small team couldn't keep up with the volume of messages across WhatsApp, Instagram, and their website.",
    solution: [
      "Implemented AI-powered WhatsApp chatbot for instant customer support",
      "Set up automated cart abandonment recovery sequences",
      "Created personalized product recommendation engine",
      "Integrated all communication channels into unified inbox",
      "Deployed AI creative generation for social media ads",
    ],
    results: [
      { metric: "Conversion Rate", value: "+40%", description: "Increase in overall conversion rate" },
      { metric: "Response Time", value: "<30s", description: "Average customer inquiry response" },
      { metric: "Cart Recovery", value: "25%", description: "Abandoned carts recovered" },
      { metric: "Customer Satisfaction", value: "4.8/5", description: "Post-purchase rating" },
    ],
    testimonial: {
      quote: "Our WhatsApp follow-ups became instant. Conversion rate jumped 40% in the first month. The AI knows exactly when and how to reach out.",
      author: "Sarah Chen",
      role: "Founder, Fashion E-commerce Brand",
    },
    services: ["AI Chatbot", "WhatsApp Automation", "AI Creatives", "CRM Integration"],
  },
  "hr-tech-80-inquiry-automation": {
    title: "HR Tech Startup: 80% Inquiry Automation",
    category: "SaaS",
    client: "HR Tech Startup",
    industry: "SaaS / Technology",
    duration: "2 months",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1200&auto=format&fit=crop",
    challenge:
      "A fast-growing HR tech SaaS company was overwhelmed with repetitive customer inquiries. Their support team spent 80% of their time answering the same questions, leaving little time for complex issues and sales conversations.",
    solution: [
      "Deployed AI chatbot trained on product documentation and FAQs",
      "Created intelligent routing for complex queries to human agents",
      "Implemented automated lead qualification and scoring",
      "Set up self-service knowledge base with AI search",
      "Integrated chatbot with CRM for seamless handoffs",
    ],
    results: [
      { metric: "Automated Inquiries", value: "80%", description: "Inquiries handled without human intervention" },
      { metric: "Support Cost", value: "-60%", description: "Reduction in support team costs" },
      { metric: "Lead Quality", value: "+35%", description: "Improvement in qualified leads" },
      { metric: "First Response", value: "Instant", description: "24/7 immediate response" },
    ],
    testimonial: {
      quote: "The AI chatbot handles 80% of inquiries automatically. Our team can finally focus on closing deals instead of answering repetitive questions.",
      author: "Marcus Tan",
      role: "CEO, HR Tech Startup",
    },
    services: ["AI Chatbot", "CRM Integration", "Lead Qualification", "Knowledge Base"],
  },
  "property-developer-lead-distribution": {
    title: "Property Developer: Automated Lead Distribution",
    category: "Real Estate",
    client: "Property Developer",
    industry: "Real Estate",
    duration: "4 months",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1200&auto=format&fit=crop",
    challenge:
      "A major property developer with multiple projects and a large sales team struggled with lead management. Leads were being lost, response times were slow, and there was no visibility into the sales pipeline.",
    solution: [
      "Built automated lead distribution system based on agent availability and expertise",
      "Implemented instant lead notification and response tracking",
      "Created automated follow-up sequences for each stage of the buyer journey",
      "Set up comprehensive dashboard for pipeline visibility",
      "Deployed AI chatbot for initial lead qualification on website and ads",
    ],
    results: [
      { metric: "Lead Response", value: "Instant", description: "Immediate lead assignment and notification" },
      { metric: "Sales Pipeline", value: "+55%", description: "Increase in qualified pipeline" },
      { metric: "Agent Efficiency", value: "+70%", description: "More deals per agent" },
      { metric: "Lead Leakage", value: "0%", description: "No leads lost in the system" },
    ],
    testimonial: {
      quote: "Lead distribution and automated follow-ups transformed our sales pipeline. Best investment we've made this year.",
      author: "David Lim",
      role: "Director, Property Developer",
    },
    services: ["Lead Distribution", "CRM Integration", "Workflow Automation", "AI Chatbot"],
  },
  "restaurant-chain-5x-outlets-no-staff": {
    title: "Restaurant Chain: 5 Outlets, No Added Sales Staff",
    category: "F&B",
    client: "Restaurant Chain",
    industry: "Food & Beverage",
    duration: "6 months",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop",
    challenge:
      "A successful restaurant wanted to expand from 1 to 5 outlets but didn't want to multiply their reservation and marketing staff. They needed a scalable solution that could handle increased volume without proportional staff growth.",
    solution: [
      "Implemented AI-powered booking system across all channels",
      "Set up automated confirmation and reminder sequences",
      "Created centralized reservation management dashboard",
      "Deployed AI chatbot for menu inquiries and special requests",
      "Automated social media marketing with AI-generated content",
    ],
    results: [
      { metric: "Outlets Scaled", value: "5x", description: "Grew from 1 to 5 locations" },
      { metric: "Booking Rate", value: "+85%", description: "Increase in online reservations" },
      { metric: "Staff Added", value: "0", description: "No additional sales staff needed" },
      { metric: "No-shows", value: "-45%", description: "Reduction in missed reservations" },
    ],
    testimonial: {
      quote: "From ads to WhatsApp to booking - everything is automated. We've scaled to 5 outlets without adding sales staff.",
      author: "Amy Wong",
      role: "Operations Manager, Restaurant Chain",
    },
    services: ["Booking Automation", "AI Chatbot", "Social Media Management", "WhatsApp Integration"],
  },
  "solar-company-3x-roas": {
    title: "Solar Company: 3x ROAS with AI Creatives",
    category: "Energy",
    client: "Solar Energy Company",
    industry: "Renewable Energy",
    duration: "4 months",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=1200&auto=format&fit=crop",
    challenge:
      "A solar energy company was spending heavily on Facebook and Google ads but seeing diminishing returns. Creative fatigue was a major issue, and they couldn't produce ad variations fast enough to keep up with testing needs.",
    solution: [
      "Deployed AI creative generation for unlimited ad variations",
      "Set up automated A/B testing framework for creatives",
      "Implemented AI-powered lead qualification chatbot",
      "Created automated nurture sequences for different lead segments",
      "Built performance dashboard with real-time optimization alerts",
    ],
    results: [
      { metric: "ROAS", value: "3x", description: "Return on ad spend" },
      { metric: "Lead Cost", value: "-45%", description: "Reduction in cost per lead" },
      { metric: "Conversion", value: "+67%", description: "Increase in lead-to-customer rate" },
      { metric: "Creative Output", value: "100+/month", description: "Ad variations generated" },
    ],
    services: ["AI Creatives", "Digital Advertising", "Lead Qualification", "Analytics"],
  },
  "healthcare-clinic-booking-automation": {
    title: "Healthcare Clinic: 24/7 Booking Automation",
    category: "Healthcare",
    client: "Medical Clinic",
    industry: "Healthcare",
    duration: "3 months",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1200&auto=format&fit=crop",
    challenge:
      "A busy medical clinic was losing potential patients because they couldn't answer calls during peak hours. Staff spent hours each day on appointment scheduling and reminders instead of patient care.",
    solution: [
      "Implemented 24/7 AI booking assistant on website and WhatsApp",
      "Set up automated appointment reminders via SMS and WhatsApp",
      "Created intelligent rescheduling system for cancellations",
      "Deployed AI chatbot for common health inquiries and clinic information",
      "Integrated with existing clinic management software",
    ],
    results: [
      { metric: "Bookings", value: "+120%", description: "Increase in online appointments" },
      { metric: "No-shows", value: "-40%", description: "Reduction in missed appointments" },
      { metric: "Staff Time", value: "25hrs/week", description: "Time saved on scheduling" },
      { metric: "After-hours Bookings", value: "35%", description: "Bookings made outside office hours" },
    ],
    services: ["Booking Automation", "AI Chatbot", "WhatsApp Integration", "SMS Automation"],
  },
};

export default function CaseStudyPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [isLeadFormOpen, setIsLeadFormOpen] = useState(false);
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  const openLeadForm = () => setIsLeadFormOpen(true);
  const closeLeadForm = () => setIsLeadFormOpen(false);

  const study = caseStudiesData[slug];

  if (!study) {
    return (
      <main className="min-h-screen bg-black">
        <Navbar onOpenLeadForm={openLeadForm} />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Case Study Not Found</h1>
            <p className="text-white/60 mb-8">
              The case study you&apos;re looking for doesn&apos;t exist.
            </p>
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
            >
              ← Back to Case Studies
            </Link>
          </div>
        </div>
        <Footer />
        <LeadFormModal isOpen={isLeadFormOpen} onClose={closeLeadForm} />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black">
      <Navbar onOpenLeadForm={openLeadForm} />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 radial-glow opacity-50" />
        <div className="absolute inset-0 grid-pattern opacity-5" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8"
          >
            ← Back to Case Studies
          </Link>

          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl"
          >
            <span className="inline-flex items-center px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-sm font-medium text-blue-300 backdrop-blur-sm mb-6">
              {study.category}
            </span>
            <h1 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl mb-6">
              {study.title}
            </h1>
            <div className="flex flex-wrap gap-6 text-sm text-white/60">
              <div>
                <span className="text-white/40">Client:</span> {study.client}
              </div>
              <div>
                <span className="text-white/40">Industry:</span> {study.industry}
              </div>
              <div>
                <span className="text-white/40">Duration:</span> {study.duration}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Hero Image */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative h-64 sm:h-96 lg:h-[500px] rounded-2xl overflow-hidden"
          >
            <Image
              src={study.image}
              alt={study.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </motion.div>
        </div>
      </section>

      {/* Results Highlight */}
      <section className="relative py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {study.results.map((result, index) => (
              <motion.div
                key={result.metric}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 rounded-xl border border-white/10 bg-white/5"
              >
                <p className="text-3xl sm:text-4xl font-bold gradient-text-cyan">
                  {result.value}
                </p>
                <p className="text-white font-medium mt-2">{result.metric}</p>
                <p className="text-sm text-white/50 mt-1">{result.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Challenge & Solution */}
      <section className="relative py-20 bg-[#0a0a0a]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Challenge */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-flex items-center px-4 py-2 rounded-full border border-red-500/30 bg-red-500/10 text-sm font-medium text-red-300 backdrop-blur-sm mb-6">
                The Challenge
              </span>
              <p className="text-lg text-white/80 leading-relaxed">{study.challenge}</p>
            </motion.div>

            {/* Solution */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-flex items-center px-4 py-2 rounded-full border border-green-500/30 bg-green-500/10 text-sm font-medium text-green-300 backdrop-blur-sm mb-6">
                Our Solution
              </span>
              <ul className="space-y-4">
                {study.solution.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500/20 text-green-400 flex-shrink-0 mt-0.5">
                      <IconCheck className="h-3.5 w-3.5" />
                    </div>
                    <span className="text-white/80">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      {study.testimonial && (
        <section className="relative py-20">
          <div className="absolute inset-0 radial-glow opacity-30" />
          <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 lg:p-12"
            >
              <IconQuote className="h-12 w-12 text-blue-500/30 mb-6" />
              <blockquote className="text-xl lg:text-2xl text-white leading-relaxed mb-8">
                &ldquo;{study.testimonial.quote}&rdquo;
              </blockquote>
              <div>
                <p className="font-semibold text-white">{study.testimonial.author}</p>
                <p className="text-white/60">{study.testimonial.role}</p>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Services Used */}
      <section className="relative py-20 bg-[#0a0a0a]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm font-medium text-white/60 backdrop-blur-sm mb-6">
              Services Used
            </span>
            <h2 className="text-3xl font-bold text-white">
              Technologies & Services Deployed
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-4"
          >
            {study.services.map((service) => (
              <span
                key={service}
                className="px-6 py-3 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300"
              >
                {service}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24">
        <div className="absolute inset-0 radial-glow opacity-30" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white sm:text-4xl mb-4">
              Want Similar Results for Your Business?
            </h2>
            <p className="text-lg text-white/60 mb-8">
              Let&apos;s discuss how we can help you achieve your growth goals.
            </p>
            <button
              onClick={openLeadForm}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full overflow-hidden transition-all duration-300 hover:shadow-[0_0_50px_rgba(59,130,246,0.5)] hover:-translate-y-1"
            >
              Book Free Strategy Call
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
