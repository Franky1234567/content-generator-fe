"use client";

import { useRouter } from "next/navigation";
import ContentBadge from "@/components/ui/ContentBadge";

interface Template {
  id: number;
  title: string;
  description: string;
  content_type: string;
  topic: string;
  keywords: string;
  target_audience: string;
  tone: string;
  language: string;
}

const TEMPLATES: Template[] = [
  {
    id: 1,
    title: "Remote Work Productivity",
    description: "Tips & strategies for staying productive while working remotely.",
    content_type: "blog post",
    topic: "10 Tips for Remote Work Productivity",
    keywords: "remote work, productivity, async communication, deep work",
    target_audience: "Startup founders & remote teams",
    tone: "casual",
    language: "English",
  },
  {
    id: 2,
    title: "Product Launch Announcement",
    description: "Professional email announcing a new product to existing clients.",
    content_type: "email",
    topic: "Product Launch Announcement",
    keywords: "new product, launch, features, benefits",
    target_audience: "B2B clients",
    tone: "formal",
    language: "English",
  },
  {
    id: 3,
    title: "Flash Sale Ad Copy",
    description: "Urgent, persuasive ad copy for a limited-time sale campaign.",
    content_type: "ad copy",
    topic: "Flash Sale Campaign — Limited Time Offer",
    keywords: "discount, limited time, sale, deal",
    target_audience: "E-commerce shoppers",
    tone: "persuasive",
    language: "English",
  },
  {
    id: 4,
    title: "LinkedIn Thought Leadership",
    description: "Professional social media post to establish authority in your niche.",
    content_type: "social media post",
    topic: "AI Trends Reshaping the Industry in 2025",
    keywords: "AI, technology, innovation, future of work",
    target_audience: "LinkedIn professionals",
    tone: "informative",
    language: "English",
  },
  {
    id: 5,
    title: "SaaS Product Description",
    description: "Clear, benefit-focused description for a software product page.",
    content_type: "product description",
    topic: "AI-Powered Content Generation Tool",
    keywords: "AI, content, automation, productivity, SaaS",
    target_audience: "Marketing teams & content creators",
    tone: "persuasive",
    language: "English",
  },
  {
    id: 6,
    title: "Company Milestone Press Release",
    description: "Formal press release announcing a major company achievement.",
    content_type: "press release",
    topic: "Company Reaches 10,000 Active Users Milestone",
    keywords: "milestone, growth, users, achievement",
    target_audience: "Media & journalists",
    tone: "formal",
    language: "English",
  },
  {
    id: 7,
    title: "Onboarding Welcome Email",
    description: "Warm welcome email for new users to get started quickly.",
    content_type: "email",
    topic: "Welcome to the Platform — Getting Started Guide",
    keywords: "welcome, onboarding, getting started, tips",
    target_audience: "New users",
    tone: "casual",
    language: "English",
  },
  {
    id: 8,
    title: "Tips Investasi Saham",
    description: "Artikel blog edukasi tentang investasi saham untuk pemula.",
    content_type: "blog post",
    topic: "Panduan Investasi Saham untuk Pemula",
    keywords: "investasi, saham, pemula, finansial, portofolio",
    target_audience: "Anak muda usia 20-30 tahun",
    tone: "informative",
    language: "Bahasa Indonesia",
  },
];

const toneColors: Record<string, string> = {
  formal: "bg-blue-50 text-blue-600",
  casual: "bg-green-50 text-green-600",
  persuasive: "bg-orange-50 text-orange-600",
  informative: "bg-sky-50 text-sky-600",
  humorous: "bg-yellow-50 text-yellow-600",
  inspirational: "bg-purple-50 text-purple-600",
};

export default function TemplatesPage() {
  const router = useRouter();

  const useTemplate = (template: Template) => {
    const params = new URLSearchParams({
      content_type: template.content_type,
      topic: template.topic,
      keywords: template.keywords,
      target_audience: template.target_audience,
      tone: template.tone,
      language: template.language,
    });
    router.push(`/dashboard?${params.toString()}`);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Templates</h1>
        <p className="text-slate-500 mt-1">Start from a pre-built template edit and generate in seconds.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {TEMPLATES.map((template) => (
          <div
            key={template.id}
            className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col hover:border-indigo-300 hover:shadow-sm transition-all cursor-pointer group"
            onClick={() => useTemplate(template)}
          >
            <div className="flex items-start justify-between gap-2 mb-3">
              <ContentBadge type={template.content_type} />
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${toneColors[template.tone] || "bg-slate-50 text-slate-600"}`}>
                {template.tone}
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