"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/animate-ui/components/radix/accordion";

const faqs = [
  {
    question: "What industries do you work with?",
    answer:
      "We work with businesses across all industries including e-commerce, SaaS, real estate, healthcare, F&B, professional services, and more. Our AI-powered solutions are adaptable to any business model that needs customer acquisition and lead management.",
  },
  {
    question: "How does your AI automation actually work?",
    answer:
      "Our AI systems integrate with your existing tools (CRM, WhatsApp, social media, calendar) to automate lead capture, qualification, follow-ups, and booking. When a lead comes in, our AI responds instantly, qualifies them based on your criteria, and either books them directly or routes them to your sales team with full context.",
  },
  {
    question: "What's the typical timeline to see results?",
    answer:
      "Most clients see initial results within the first 2-4 weeks of implementation. Lead response times typically drop to under 30 seconds immediately. Conversion improvements usually become measurable within the first month as the AI learns and optimizes.",
  },
  {
    question: "Do I need technical knowledge to use your systems?",
    answer:
      "No technical knowledge required. We handle all the setup, integration, and ongoing optimization. You'll get a simple dashboard to monitor performance, and our team is always available for support. Your job is to close deals - we handle everything else.",
  },
  {
    question: "How much does it cost to work with Agenz?",
    answer:
      "Our pricing is customized based on your business needs, volume, and the services you require. We offer packages starting from RM 5,000/month for small businesses up to comprehensive enterprise solutions. Book a strategy call to get a tailored quote.",
  },
  {
    question: "What makes Agenz different from other marketing agencies?",
    answer:
      "We're not a traditional marketing agency - we're an AI automation company. While others focus on running ads, we build complete autonomous systems that handle everything from lead generation to qualification to booking. Our AI works 24/7, responds instantly, and continuously improves through data.",
  },
];

export function FAQ() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden bg-black">
      {/* Background */}
      <div className="absolute inset-0 radial-glow opacity-50" />
      <div className="absolute inset-0 grid-pattern opacity-5" />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm font-medium text-white/60 backdrop-blur-sm mb-6">
            FAQ
          </span>
          <h2 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Everything you need to know about our AI-powered marketing and automation
            solutions.
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-white/10 bg-white/5 backdrop-blur-sm px-6 rounded-xl overflow-hidden transition-colors hover:border-white/20"
              >
                <AccordionTrigger className="hover:no-underline py-5 text-left text-white font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-white/60 pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 text-center"
        >
          <p className="text-white/50 mb-4">Still have questions?</p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors font-medium"
          >
            Contact our team →
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export default FAQ;
