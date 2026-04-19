"use client";

import { useRouter } from "next/navigation";
import ContentBadge from "@/components/ui/ContentBadge";

interface Template {
  id: number;
  title: string;
  description: string;
  product_name: string;
  description_text: string;
  features: string;
  target_audience: string;
  price: string;
  usp: string;
  style_template: string;
}

const TEMPLATES: Template[] = [
  {
    id: 1,
    title: "SaaS Product",
    description: "High-converting sales page for a software-as-a-service product.",
    product_name: "TaskFlow Pro",
    description_text: "TaskFlow Pro is an AI-powered project management tool that helps remote teams stay aligned, ship faster, and eliminate status meetings.",
    features: "AI task prioritization, Real-time collaboration, Slack & GitHub integration, Time tracking, Custom dashboards, Mobile app",
    target_audience: "Remote startup teams and project managers",
    price: "$29 / month per team",
    usp: "14-day free trial, No credit card required, Cancel anytime",
    style_template: "modern",
  },
  {
    id: 2,
    title: "Physical Product",
    description: "Persuasive sales page for a premium physical product.",
    product_name: "ErgoDesk Pro Standing Desk",
    description_text: "The ErgoDesk Pro is a height-adjustable standing desk engineered for professionals who demand comfort, durability, and style in their home office.",
    features: "Electric height adjustment, Memory presets, Anti-fatigue mat included, Cable management system, 10-year warranty, Ships assembled",
    target_audience: "Home office professionals and remote workers",
    price: "$599 - Free shipping",
    usp: "30-day money-back guarantee, Assembled in 10 minutes",
    style_template: "bold",
  },
  {
    id: 3,
    title: "Online Course",
    description: "Enrollment-focused sales page for a digital course.",
    product_name: "Full-Stack Mastery Bootcamp",
    description_text: "A comprehensive 12-week online program that takes you from zero to job-ready full-stack developer with hands-on projects, mentorship, and career support.",
    features: "120+ video lessons, Live weekly Q&A sessions, 10 real-world projects, Career coaching, Private community, Lifetime access",
    target_audience: "Career changers and aspiring developers",
    price: "Rp 2.999.000 - One-time payment",
    usp: "Job guarantee or money back, Learn at your own pace",
    style_template: "modern",
  },
  {
    id: 4,
    title: "Consulting Service",
    description: "Authority-building sales page for a professional consulting service.",
    product_name: "Growth Marketing Consulting",
    description_text: "We help B2B SaaS companies scale from $1M to $10M ARR with data-driven growth strategies, paid acquisition, and retention optimization.",
    features: "Monthly strategy sessions, Full funnel audit, A/B testing roadmap, Weekly performance reports, Slack access, Dedicated account manager",
    target_audience: "B2B SaaS founders and marketing leaders",
    price: "$5,000 / month",
    usp: "Results in 90 days or refund, No long-term contract",
    style_template: "minimal",
  },
  {
    id: 5,
    title: "Mobile App",
    description: "App store-style sales page for a mobile application.",
    product_name: "FitTrack AI - Fitness Coach",
    description_text: "FitTrack AI is a personal fitness coach in your pocket - it builds custom workout and meal plans, tracks your progress, and adapts to your schedule.",
    features: "AI-generated workout plans, Macro & calorie tracking, Progress photos, Apple Watch sync, 500+ exercise library, Offline mode",
    target_audience: "Fitness enthusiasts and busy professionals",
    price: "Rp 59.000 / month or Rp 499.000 / year",
    usp: "7-day free trial, Used by 200,000+ users",
    style_template: "bold",
  },
  {
    id: 6,
    title: "E-commerce Store",
    description: "Sales page for launching an online store or product line.",
    product_name: "NatureCraft Skincare Collection",
    description_text: "NatureCraft is a clean, plant-based skincare line formulated by dermatologists using sustainably sourced ingredients - effective, ethical, and affordable.",
    features: "Dermatologist formulated, Vegan & cruelty-free, No parabens or sulfates, Sustainable packaging, Suitable for all skin types, Ships worldwide",
    target_audience: "Eco-conscious consumers aged 25–45",
    price: "From Rp 149.000 per product",
    usp: "Free samples with every order, 60-day return policy",
    style_template: "minimal",
  },
  {
    id: 7,
    title: "Digital Download",
    description: "Sales page for a downloadable digital product like a template or ebook.",
    product_name: "Notion Business OS - Ultimate Template",
    description_text: "A complete Notion workspace template system for entrepreneurs and solopreneurs - manage projects, clients, finances, and goals all in one place.",
    features: "50+ linked Notion templates, CRM database, Finance tracker, Project management hub, Content calendar, Goal tracker, Lifetime updates",
    target_audience: "Freelancers, solopreneurs, and small business owners",
    price: "$47 - Instant digital download",
    usp: "Instant delivery, Works with free Notion plan",
    style_template: "modern",
  },
  {
    id: 8,
    title: "Membership Site",
    description: "Sales page for a recurring membership or community.",
    product_name: "The Founder's Inner Circle",
    description_text: "An exclusive monthly membership for early-stage startup founders - get access to expert AMAs, peer accountability groups, investor intros, and a curated resource library.",
    features: "Monthly live AMAs with top founders, Private Slack community, Weekly accountability groups, Investor database access, Resource library, Job board",
    target_audience: "Early-stage startup founders (pre-seed to Series A)",
    price: "$99 / month - Cancel anytime",
    usp: "First month free, Backed by 500+ active founders",
    style_template: "bold",
  },
];

const styleColors: Record<string, string> = {
  modern: "bg-indigo-50 text-indigo-600",
  minimal: "bg-slate-50 text-slate-600",
  bold: "bg-orange-50 text-orange-600",
};

export default function TemplatesPage() {
  const router = useRouter();

  const useTemplate = (template: Template) => {
    const params = new URLSearchParams({
      product_name: template.product_name,
      description: template.description_text,
      features: template.features,
      target_audience: template.target_audience,
      price: template.price,
      usp: template.usp,
      style_template: template.style_template,
    });
    router.push(`/dashboard?${params.toString()}`);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Templates</h1>
        <p className="text-slate-500 mt-1">Start from a pre-built template  click to prefill the form and generate in seconds.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {TEMPLATES.map((template) => (
          <div
            key={template.id}
            className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col hover:border-indigo-300 hover:shadow-sm transition-all cursor-pointer group"
            onClick={() => useTemplate(template)}
          >
            <div className="flex items-start justify-between gap-2 mb-3">
              <ContentBadge type={template.style_template} />
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${styleColors[template.style_template] || "bg-slate-50 text-slate-600"}`}>
                {template.style_template}
              </span>
            </div>

            <h3 className="font-semibold text-slate-900 text-sm mb-1 group-hover:text-indigo-700 transition-colors">
              {template.title}
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed flex-1">{template.description}</p>

            {template.target_audience && (
              <p className="text-xs text-slate-400 mt-3 flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {template.target_audience}
              </p>
            )}

            <div className="mt-4 pt-3 border-t border-slate-100">
              <span className="text-xs font-medium text-indigo-600 group-hover:text-indigo-700">
                Use this template →
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
