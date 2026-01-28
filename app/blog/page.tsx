"use client";

import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { LeadFormModal } from "@/components/LeadFormModal";
import {
  IconArrowRight,
  IconCalendar,
  IconClock,
  IconSearch,
} from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";

const blogPosts = [
  {
    slug: "ai-transforming-customer-acquisition-2025",
    title: "How AI is Transforming Customer Acquisition in 2025",
    excerpt:
      "Discover the latest AI technologies that are revolutionizing how businesses attract and convert customers at scale.",
    category: "AI & Automation",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop",
    author: "Agenz Team",
    date: "Jan 15, 2025",
    readTime: "8 min read",
    featured: true,
  },
  {
    slug: "whatsapp-automation-guide-malaysian-business",
    title: "The Complete WhatsApp Automation Guide for Malaysian Businesses",
    excerpt:
      "Learn how to set up WhatsApp Business API automation to handle leads 24/7 and boost your conversion rates.",
    category: "WhatsApp Marketing",
    image: "https://images.unsplash.com/photo-1611746872915-64382b5c76da?q=80&w=800&auto=format&fit=crop",
    author: "Agenz Team",
    date: "Jan 10, 2025",
    readTime: "12 min read",
    featured: false,
  },
  {
    slug: "ai-chatbot-vs-human-support",
    title: "AI Chatbot vs Human Support: Finding the Right Balance",
    excerpt:
      "When should you use AI and when do you need human touch? We break down the optimal approach for different scenarios.",
    category: "AI & Automation",
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=800&auto=format&fit=crop",
    author: "Agenz Team",
    date: "Jan 5, 2025",
    readTime: "6 min read",
    featured: false,
  },
  {
    slug: "meta-ads-best-practices-2025",
    title: "Meta Ads Best Practices for Malaysian Businesses in 2025",
    excerpt:
      "Updated strategies for Facebook and Instagram advertising that actually work in the Malaysian market.",
    category: "Digital Marketing",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=800&auto=format&fit=crop",
    author: "Agenz Team",
    date: "Dec 28, 2024",
    readTime: "10 min read",
    featured: false,
  },
  {
    slug: "crm-automation-small-business",
    title: "CRM Automation: A Small Business Owner's Guide",
    excerpt:
      "How to set up your CRM to automatically qualify, route, and follow up with leads without manual work.",
    category: "Business Automation",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
    author: "Agenz Team",
    date: "Dec 20, 2024",
    readTime: "9 min read",
    featured: false,
  },
  {
    slug: "ai-creatives-vs-traditional-design",
    title: "AI-Generated Creatives vs Traditional Design: A Comparison",
    excerpt:
      "We tested AI-generated ads against traditionally designed ones. Here are the surprising results.",
    category: "AI & Automation",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800&auto=format&fit=crop",
    author: "Agenz Team",
    date: "Dec 15, 2024",
    readTime: "7 min read",
    featured: false,
  },
];

const categories = ["All", "AI & Automation", "Digital Marketing", "WhatsApp Marketing", "Business Automation"];

export default function BlogPage() {
  const [isLeadFormOpen, setIsLeadFormOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  const openLeadForm = () => setIsLeadFormOpen(true);
  const closeLeadForm = () => setIsLeadFormOpen(false);

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = activeCategory === "All" || post.category === activeCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = blogPosts.find((post) => post.featured);
  const regularPosts = filteredPosts.filter((post) => !post.featured);

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
              Blog
            </span>
            <h1 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl mb-6">
              Insights &{" "}
              <span className="gradient-text">Resources</span>
            </h1>
            <p className="text-lg text-white/60">
              Learn about AI marketing, automation strategies, and business growth
              from our team of experts.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="relative py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between"
          >
            {/* Search */}
            <div className="relative max-w-md w-full">
              <IconSearch className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeCategory === category
                      ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white"
                      : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && activeCategory === "All" && !searchQuery && (
        <section className="relative py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Link
                href={`/blog/${featuredPost.slug}`}
                className="group block relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-blue-500/50"
              >
                <div className="grid md:grid-cols-2">
                  {/* Image */}
                  <div className="relative h-64 md:h-auto">
                    <Image
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent md:bg-gradient-to-l" />
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-300 backdrop-blur-sm border border-blue-500/30">
                      Featured
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-8 md:p-12 flex flex-col justify-center">
                    <span className="text-sm text-blue-400 mb-3">
                      {featuredPost.category}
                    </span>
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">
                      {featuredPost.title}
                    </h2>
                    <p className="text-white/60 mb-6">{featuredPost.excerpt}</p>
                    <div className="flex items-center gap-4 text-sm text-white/50">
                      <div className="flex items-center gap-2">
                        <IconCalendar className="h-4 w-4" />
                        {featuredPost.date}
                      </div>
                      <div className="flex items-center gap-2">
                        <IconClock className="h-4 w-4" />
                        {featuredPost.readTime}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* Blog Grid */}
      <section className="relative py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {regularPosts.length > 0 ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {regularPosts.map((post, index) => (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group block relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-blue-500/50 hover:-translate-y-2"
                  >
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-white/80 backdrop-blur-sm">
                        {post.category}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-sm text-white/60 mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-white/50">
                        <div className="flex items-center gap-2">
                          <IconCalendar className="h-3.5 w-3.5" />
                          {post.date}
                        </div>
                        <div className="flex items-center gap-2">
                          <IconClock className="h-3.5 w-3.5" />
                          {post.readTime}
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-white/60">No articles found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="relative py-24 bg-[#0a0a0a]">
        <div className="absolute inset-0 radial-glow opacity-30" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white sm:text-4xl mb-4">
              Stay Updated with AI Marketing Insights
            </h2>
            <p className="text-lg text-white/60 mb-8">
              Get the latest strategies and tips delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-blue-500"
              />
              <button className="px-6 py-3 font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]">
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
      <LeadFormModal isOpen={isLeadFormOpen} onClose={closeLeadForm} />
    </main>
  );
}
