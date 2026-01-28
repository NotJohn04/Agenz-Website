"use client";

import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useParams } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { LeadFormModal } from "@/components/LeadFormModal";
import {
  IconArrowRight,
  IconCalendar,
  IconClock,
  IconBrandFacebook,
  IconBrandLinkedin,
  IconBrandX,
  IconLink,
} from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";

// Blog post data
const blogPostsData: Record<string, {
  title: string;
  excerpt: string;
  category: string;
  image: string;
  author: string;
  authorImage: string;
  date: string;
  readTime: string;
  content: string[];
}> = {
  "ai-transforming-customer-acquisition-2025": {
    title: "How AI is Transforming Customer Acquisition in 2025",
    excerpt:
      "Discover the latest AI technologies that are revolutionizing how businesses attract and convert customers at scale.",
    category: "AI & Automation",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200&auto=format&fit=crop",
    author: "Agenz Team",
    authorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=320&auto=format&fit=facearea&facepad=2",
    date: "January 15, 2025",
    readTime: "8 min read",
    content: [
      "The landscape of customer acquisition has undergone a seismic shift. What once required armies of salespeople and massive marketing budgets can now be accomplished with intelligent systems that work around the clock.",
      "## The Rise of AI-Powered Lead Generation",
      "In 2025, AI isn't just assisting with marketing—it's leading it. From predictive analytics that identify your most valuable prospects to generative AI that creates personalized content at scale, the tools available today would have seemed like science fiction just a few years ago.",
      "The most significant change we're seeing is the move from reactive to proactive customer acquisition. Instead of waiting for leads to come to you, AI systems are now capable of identifying potential customers before they even know they need your product.",
      "## Instant Response: The New Standard",
      "Response time has always been critical in sales, but AI has changed what 'fast' means. While human teams might celebrate responding within an hour, AI systems respond in seconds—24 hours a day, 7 days a week.",
      "Our data shows that leads contacted within 30 seconds are 21 times more likely to convert than those contacted after 5 minutes. AI makes this instant response possible at any scale.",
      "## Personalization at Scale",
      "Perhaps the most powerful application of AI in customer acquisition is hyper-personalization. AI systems can analyze hundreds of data points about each prospect to craft messages that resonate on a personal level—something that would be impossible for human teams to do manually.",
      "This isn't about inserting someone's name into a template. It's about understanding their pain points, their industry context, their previous interactions, and their likely objections—all in real-time.",
      "## The Human Element",
      "Despite all this automation, the human element remains crucial. The best AI systems know when to hand off to a human. Complex negotiations, emotional situations, and high-value deals still benefit from the human touch.",
      "The key is using AI to handle the routine so your human team can focus on what they do best: building relationships and closing deals.",
      "## What This Means for Your Business",
      "If you're not already exploring AI for customer acquisition, you're falling behind. The businesses that will thrive in 2025 and beyond are those that embrace these technologies early and integrate them thoughtfully into their operations.",
      "The good news is that you don't need to build these systems from scratch. Partners like Agenz specialize in implementing AI solutions that work seamlessly with your existing processes.",
    ],
  },
  "whatsapp-automation-guide-malaysian-business": {
    title: "The Complete WhatsApp Automation Guide for Malaysian Businesses",
    excerpt:
      "Learn how to set up WhatsApp Business API automation to handle leads 24/7 and boost your conversion rates.",
    category: "WhatsApp Marketing",
    image: "https://images.unsplash.com/photo-1611746872915-64382b5c76da?q=80&w=1200&auto=format&fit=crop",
    author: "Agenz Team",
    authorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=320&auto=format&fit=facearea&facepad=2",
    date: "January 10, 2025",
    readTime: "12 min read",
    content: [
      "WhatsApp is the dominant messaging platform in Malaysia, with over 24 million active users. For businesses, this represents an enormous opportunity—if you know how to leverage it properly.",
      "## Why WhatsApp Automation Matters",
      "In a market where consumers expect instant responses, WhatsApp automation is no longer optional—it's essential. Studies show that 79% of Malaysian consumers prefer messaging businesses over calling or emailing.",
      "But here's the challenge: your team can't be online 24/7. WhatsApp automation solves this by ensuring every inquiry gets an immediate, intelligent response.",
      "## Getting Started with WhatsApp Business API",
      "The first step is moving beyond the basic WhatsApp Business app to the WhatsApp Business API. This unlocks powerful features like automated responses, chatbots, and integration with your CRM.",
      "You'll need to work with an official WhatsApp Business Solution Provider (BSP) to access the API. They handle the technical setup and ensure compliance with WhatsApp's policies.",
      "## Building Your Automation Flows",
      "Effective WhatsApp automation isn't about replacing human conversation—it's about enhancing it. Here are the key flows you should implement:",
      "**Welcome Flow**: Greet new contacts and qualify their needs immediately. Ask key questions to route them to the right team or provide relevant information.",
      "**FAQ Automation**: Handle common questions automatically. This alone can reduce your support workload by 60-80%.",
      "**Lead Qualification**: Use a series of questions to determine if a lead is qualified before passing to sales. Include budget, timeline, and decision-making authority.",
      "**Appointment Booking**: Let prospects book meetings directly through WhatsApp. Sync with your calendar and send automatic reminders.",
      "**Follow-up Sequences**: Automate follow-up messages at strategic intervals. This ensures no lead falls through the cracks.",
      "## Best Practices for Malaysian Market",
      "When implementing WhatsApp automation for the Malaysian market, consider these cultural factors:",
      "- Use Bahasa Malaysia options for broader reach\n- Be respectful of timing—avoid messaging during prayer times\n- Keep messages concise—Malaysians prefer quick, direct communication\n- Include emoji and casual language where appropriate—it matches local communication style",
      "## Measuring Success",
      "Track these key metrics to measure your WhatsApp automation success: response time, conversation completion rate, lead qualification rate, and conversion to appointments.",
      "Most businesses see a 40-60% improvement in lead response rates within the first month of implementing proper WhatsApp automation.",
    ],
  },
  "ai-chatbot-vs-human-support": {
    title: "AI Chatbot vs Human Support: Finding the Right Balance",
    excerpt:
      "When should you use AI and when do you need human touch? We break down the optimal approach for different scenarios.",
    category: "AI & Automation",
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=1200&auto=format&fit=crop",
    author: "Agenz Team",
    authorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=320&auto=format&fit=facearea&facepad=2",
    date: "January 5, 2025",
    readTime: "6 min read",
    content: [
      "The debate between AI chatbots and human support isn't about choosing one or the other—it's about finding the right balance for your business and customers.",
      "## When AI Excels",
      "AI chatbots are perfect for handling routine, repetitive inquiries. They excel at providing instant responses 24/7, answering FAQs, collecting initial information, and routing inquiries to the right department.",
      "For businesses handling high volumes of similar questions, AI can reduce support costs by up to 70% while actually improving customer satisfaction through faster response times.",
      "## When Humans Are Essential",
      "Complex problems, emotional situations, and high-value negotiations still require human involvement. Customers dealing with sensitive issues or significant purchases want to know there's a real person who understands their situation.",
      "The key is knowing when to make the handoff. The best AI systems recognize these moments and seamlessly transfer to a human agent with full context.",
      "## The Hybrid Approach",
      "The most effective customer service strategy combines both AI and human support. AI handles the first line of contact, qualifies inquiries, and resolves simple issues. Humans step in for complex cases and relationship-building moments.",
      "This approach gives you the best of both worlds: efficiency and cost savings from AI, plus the empathy and problem-solving ability of human agents.",
    ],
  },
};

const relatedPosts = [
  {
    slug: "whatsapp-automation-guide-malaysian-business",
    title: "The Complete WhatsApp Automation Guide",
    category: "WhatsApp Marketing",
    image: "https://images.unsplash.com/photo-1611746872915-64382b5c76da?q=80&w=400&auto=format&fit=crop",
  },
  {
    slug: "ai-chatbot-vs-human-support",
    title: "AI Chatbot vs Human Support",
    category: "AI & Automation",
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=400&auto=format&fit=crop",
  },
  {
    slug: "meta-ads-best-practices-2025",
    title: "Meta Ads Best Practices for 2025",
    category: "Digital Marketing",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=400&auto=format&fit=crop",
  },
];

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [isLeadFormOpen, setIsLeadFormOpen] = useState(false);
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  const openLeadForm = () => setIsLeadFormOpen(true);
  const closeLeadForm = () => setIsLeadFormOpen(false);

  const post = blogPostsData[slug];

  if (!post) {
    return (
      <main className="min-h-screen bg-black">
        <Navbar onOpenLeadForm={openLeadForm} />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Post Not Found</h1>
            <p className="text-white/60 mb-8">
              The blog post you&apos;re looking for doesn&apos;t exist.
            </p>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
            >
              ← Back to Blog
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
      <section className="relative pt-32 pb-12 overflow-hidden">
        <div className="absolute inset-0 radial-glow opacity-50" />
        <div className="absolute inset-0 grid-pattern opacity-5" />

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8"
          >
            ← Back to Blog
          </Link>

          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-300 backdrop-blur-sm border border-blue-500/30 mb-4">
              {post.category}
            </span>
            <h1 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl mb-6">
              {post.title}
            </h1>
            <p className="text-xl text-white/60 mb-8">{post.excerpt}</p>

            {/* Author & Meta */}
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="relative h-10 w-10 rounded-full overflow-hidden">
                  <Image
                    src={post.authorImage}
                    alt={post.author}
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="text-white font-medium">{post.author}</span>
              </div>
              <div className="flex items-center gap-4 text-sm text-white/50">
                <div className="flex items-center gap-2">
                  <IconCalendar className="h-4 w-4" />
                  {post.date}
                </div>
                <div className="flex items-center gap-2">
                  <IconClock className="h-4 w-4" />
                  {post.readTime}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="relative">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative h-64 sm:h-96 lg:h-[500px] rounded-2xl overflow-hidden"
          >
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <section className="relative py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="prose prose-invert prose-lg max-w-none"
          >
            {post.content.map((paragraph, index) => {
              if (paragraph.startsWith("## ")) {
                return (
                  <h2 key={index} className="text-2xl font-bold text-white mt-12 mb-4">
                    {paragraph.replace("## ", "")}
                  </h2>
                );
              }
              if (paragraph.startsWith("**")) {
                return (
                  <p key={index} className="text-white/80 leading-relaxed mb-4">
                    <strong className="text-white">{paragraph.split("**")[1]}</strong>
                    {paragraph.split("**")[2]}
                  </p>
                );
              }
              if (paragraph.startsWith("- ")) {
                const items = paragraph.split("\n");
                return (
                  <ul key={index} className="list-disc list-inside space-y-2 text-white/80 mb-4">
                    {items.map((item, i) => (
                      <li key={i}>{item.replace("- ", "")}</li>
                    ))}
                  </ul>
                );
              }
              return (
                <p key={index} className="text-white/80 leading-relaxed mb-4">
                  {paragraph}
                </p>
              );
            })}
          </motion.article>

          {/* Share Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 pt-8 border-t border-white/10"
          >
            <p className="text-sm text-white/50 mb-4">Share this article</p>
            <div className="flex gap-3">
              <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/60 hover:border-blue-500/50 hover:text-blue-400 transition-all">
                <IconBrandFacebook className="h-5 w-5" />
              </button>
              <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/60 hover:border-blue-500/50 hover:text-blue-400 transition-all">
                <IconBrandLinkedin className="h-5 w-5" />
              </button>
              <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/60 hover:border-blue-500/50 hover:text-blue-400 transition-all">
                <IconBrandX className="h-5 w-5" />
              </button>
              <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/60 hover:border-blue-500/50 hover:text-blue-400 transition-all">
                <IconLink className="h-5 w-5" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Posts */}
      <section className="relative py-20 bg-[#0a0a0a]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl font-bold text-white">Related Articles</h2>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedPosts.map((relatedPost, index) => (
              <motion.div
                key={relatedPost.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={`/blog/${relatedPost.slug}`}
                  className="group block rounded-xl border border-white/10 bg-white/5 overflow-hidden hover:border-blue-500/50 transition-all"
                >
                  <div className="relative h-40">
                    <Image
                      src={relatedPost.image}
                      alt={relatedPost.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <span className="text-xs text-blue-400">{relatedPost.category}</span>
                    <h3 className="text-white font-medium mt-1 group-hover:text-blue-400 transition-colors">
                      {relatedPost.title}
                    </h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
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
              Ready to Transform Your Marketing with AI?
            </h2>
            <p className="text-lg text-white/60 mb-8">
              Let&apos;s discuss how we can implement these strategies for your business.
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
