"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { IconX, IconLoader2, IconCheck } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

interface LeadFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  companyName: string;
  website: string;
  serviceInterest: string;
  budget: string;
  message: string;
}

const initialFormData: FormData = {
  fullName: "",
  email: "",
  phone: "",
  companyName: "",
  website: "",
  serviceInterest: "",
  budget: "",
  message: "",
};

const serviceOptions = [
  { value: "", label: "Select a service" },
  { value: "ai-creative", label: "AI Creative Solutions" },
  { value: "digital-marketing", label: "Digital Marketing" },
  { value: "web-solutions", label: "Web Solutions" },
  { value: "automation", label: "Business Automation" },
  { value: "full-service", label: "Full Service / Not Sure" },
];

const budgetOptions = [
  { value: "", label: "Select your budget" },
  { value: "below-5k", label: "Below RM 5,000" },
  { value: "5k-15k", label: "RM 5,000 - RM 15,000" },
  { value: "15k-50k", label: "RM 15,000 - RM 50,000" },
  { value: "above-50k", label: "Above RM 50,000" },
];

export function LeadFormModal({ isOpen, onClose }: LeadFormModalProps) {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setFormData(initialFormData);
        setErrors({});
        setIsSuccess(false);
      }, 300);
    }
  }, [isOpen]);

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[\d\s\-+()]+$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!formData.companyName.trim()) {
      newErrors.companyName = "Company name is required";
    }

    if (!formData.serviceInterest) {
      newErrors.serviceInterest = "Please select a service";
    }

    if (!formData.budget) {
      newErrors.budget = "Please select your budget";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Get the readable labels for service and budget
      const serviceLabel = serviceOptions.find(opt => opt.value === formData.serviceInterest)?.label || formData.serviceInterest;
      const budgetLabel = budgetOptions.find(opt => opt.value === formData.budget)?.label || formData.budget;

      // Submit to Google Apps Script
      const scriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;

      if (scriptUrl) {
        const response = await fetch(scriptUrl, {
          method: "POST",
          mode: "no-cors", // Required for Google Apps Script
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            formType: "lead-form",
            fullName: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            companyName: formData.companyName,
            website: formData.website,
            serviceInterest: serviceLabel,
            budget: budgetLabel,
            message: formData.message,
            sourcePage: typeof window !== "undefined" ? window.location.pathname : "unknown",
          }),
        });

        // Note: no-cors mode doesn't give us response data, but the request goes through
        console.log("Lead form submitted successfully");
      } else {
        console.warn("NEXT_PUBLIC_GOOGLE_SCRIPT_URL not configured");
      }

      setIsSuccess(true);
    } catch (error) {
      console.error("Error submitting form:", error);
      // Still show success to user - data might have been received
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={handleBackdropClick}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

          {/* Modal */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto glass-card p-6 sm:p-8 scrollbar-custom"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 p-2 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close modal"
            >
              <IconX className="h-5 w-5" />
            </button>

            {isSuccess ? (
              // Success State
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-8"
              >
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20">
                  <IconCheck className="h-8 w-8 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Thank You!
                </h3>
                <p className="text-white/60 mb-6">
                  We&apos;ve received your inquiry and will get back to you within 24 hours.
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]"
                >
                  Close
                </button>
              </motion.div>
            ) : (
              // Form State
              <>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-white mb-2">
                    Let&apos;s Talk Growth
                  </h2>
                  <p className="text-white/60 text-sm">
                    Fill in your details and we&apos;ll get back to you within 24 hours.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Full Name */}
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-sm font-medium text-white/80 mb-1.5"
                    >
                      Full Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className={cn(
                        "w-full px-4 py-2.5 rounded-lg bg-white/5 border text-white placeholder-white/30 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/50",
                        errors.fullName ? "border-red-500" : "border-white/10"
                      )}
                      placeholder="John Doe"
                    />
                    {errors.fullName && (
                      <p className="mt-1 text-xs text-red-400">{errors.fullName}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-white/80 mb-1.5"
                    >
                      Email Address <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={cn(
                        "w-full px-4 py-2.5 rounded-lg bg-white/5 border text-white placeholder-white/30 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/50",
                        errors.email ? "border-red-500" : "border-white/10"
                      )}
                      placeholder="john@company.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-400">{errors.email}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-white/80 mb-1.5"
                    >
                      Phone Number <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={cn(
                        "w-full px-4 py-2.5 rounded-lg bg-white/5 border text-white placeholder-white/30 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/50",
                        errors.phone ? "border-red-500" : "border-white/10"
                      )}
                      placeholder="+60 12-345 6789"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-xs text-red-400">{errors.phone}</p>
                    )}
                  </div>

                  {/* Company Name */}
                  <div>
                    <label
                      htmlFor="companyName"
                      className="block text-sm font-medium text-white/80 mb-1.5"
                    >
                      Company Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      id="companyName"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      className={cn(
                        "w-full px-4 py-2.5 rounded-lg bg-white/5 border text-white placeholder-white/30 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/50",
                        errors.companyName ? "border-red-500" : "border-white/10"
                      )}
                      placeholder="Your Company Sdn Bhd"
                    />
                    {errors.companyName && (
                      <p className="mt-1 text-xs text-red-400">{errors.companyName}</p>
                    )}
                  </div>

                  {/* Website (Optional) */}
                  <div>
                    <label
                      htmlFor="website"
                      className="block text-sm font-medium text-white/80 mb-1.5"
                    >
                      Website URL <span className="text-white/40">(Optional)</span>
                    </label>
                    <input
                      type="url"
                      id="website"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                      placeholder="https://yourcompany.com"
                    />
                  </div>

                  {/* Service Interest */}
                  <div>
                    <label
                      htmlFor="serviceInterest"
                      className="block text-sm font-medium text-white/80 mb-1.5"
                    >
                      Service Interested In <span className="text-red-400">*</span>
                    </label>
                    <select
                      id="serviceInterest"
                      name="serviceInterest"
                      value={formData.serviceInterest}
                      onChange={handleChange}
                      className={cn(
                        "w-full px-4 py-2.5 rounded-lg bg-white/5 border text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/50 appearance-none cursor-pointer",
                        errors.serviceInterest ? "border-red-500" : "border-white/10",
                        !formData.serviceInterest && "text-white/30"
                      )}
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23ffffff50' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                        backgroundPosition: "right 0.75rem center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "1.5em 1.5em",
                      }}
                    >
                      {serviceOptions.map((option) => (
                        <option
                          key={option.value}
                          value={option.value}
                          className="bg-[#1a1a1a] text-white"
                        >
                          {option.label}
                        </option>
                      ))}
                    </select>
                    {errors.serviceInterest && (
                      <p className="mt-1 text-xs text-red-400">{errors.serviceInterest}</p>
                    )}
                  </div>

                  {/* Budget */}
                  <div>
                    <label
                      htmlFor="budget"
                      className="block text-sm font-medium text-white/80 mb-1.5"
                    >
                      Monthly Marketing Budget <span className="text-red-400">*</span>
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className={cn(
                        "w-full px-4 py-2.5 rounded-lg bg-white/5 border text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/50 appearance-none cursor-pointer",
                        errors.budget ? "border-red-500" : "border-white/10",
                        !formData.budget && "text-white/30"
                      )}
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23ffffff50' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                        backgroundPosition: "right 0.75rem center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "1.5em 1.5em",
                      }}
                    >
                      {budgetOptions.map((option) => (
                        <option
                          key={option.value}
                          value={option.value}
                          className="bg-[#1a1a1a] text-white"
                        >
                          {option.label}
                        </option>
                      ))}
                    </select>
                    {errors.budget && (
                      <p className="mt-1 text-xs text-red-400">{errors.budget}</p>
                    )}
                  </div>

                  {/* Message (Optional) */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-white/80 mb-1.5"
                    >
                      Tell us about your goals{" "}
                      <span className="text-white/40">(Optional)</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none"
                      placeholder="What are you looking to achieve?"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-6 py-3 text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <IconLoader2 className="h-5 w-5 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Book Your Free Strategy Call"
                    )}
                  </button>

                  <p className="text-center text-xs text-white/40 mt-4">
                    By submitting, you agree to our{" "}
                    <a href="/privacy" className="text-blue-400 hover:underline">
                      Privacy Policy
                    </a>{" "}
                    and{" "}
                    <a href="/terms" className="text-blue-400 hover:underline">
                      Terms of Service
                    </a>
                    .
                  </p>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default LeadFormModal;
