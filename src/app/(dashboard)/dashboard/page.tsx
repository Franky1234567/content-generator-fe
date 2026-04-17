"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import api from "@/lib/axios";
import { downloadTxt } from "@/utils/format";
import { ContentGeneration, CONTENT_TYPES, TONES, LANGUAGES } from "@/types";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

const schema = z.object({
  content_type: z.string().min(1, "Select a content type"),
  topic: z.string().min(3, "Topic must be at least 3 characters"),
  keywords: z.string().optional(),
  target_audience: z.string().optional(),
  tone: z.string().min(1, "Select a tone"),
  language: z.string().min(1, "Select a language"),
  custom_language: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function DashboardPage() {
  const searchParams = useSearchParams();
  const [result, setResult] = useState<ContentGeneration | null>(null);
  const [isCustomLang, setIsCustomLang] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const { register, handleSubmit, watch, reset, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { content_type: "", tone: "", language: "Bahasa Indonesia" },
  });
  const languageValue = watch("language");

  useEffect(() => {
    const content_type = searchParams.get("content_type");
    if (!content_type) return;
    reset({
      content_type: content_type || "",
      topic: searchParams.get("topic") || "",
      keywords: searchParams.get("keywords") || "",
      target_audience: searchParams.get("target_audience") || "",
      tone: searchParams.get("tone") || "",
      language: searchParams.get("language") || "Bahasa Indonesia",
    });
  }, [searchParams, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      setError("");
      setResult(null);
      const payload = {
        ...data,
        language: data.language === "custom" ? (data.custom_language || "Bahasa Indonesia") : data.language,
      };
      const res = await api.post("/generations", payload);
      setResult(res.data);
    } catch (err: unknown) {
      const e = err as { response?: { data?: { message?: string } } };
      setError(e.response?.data?.message || "Failed to generate content. Please try again.");
    }
  };

  const handleCopy = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(result.generated_content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto lg:h-[calc(100vh-4rem)] flex flex-col">
      <div className="mb-6 shrink-0">
        <h1 className="text-2xl font-bold text-slate-900">Generate Content</h1>
        <p className="text-slate-500 mt-1">Fill in the details below to generate AI-powered content</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:flex-1 lg:min-h-0">
        {/* Form */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 lg:overflow-y-auto overflow-x-visible">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Content Type</label>
                <select {...register("content_type")} className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm bg-white">
                  <option value="">Select type...</option>
                  {CONTENT_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
                </select>
                {errors.content_type && <p className="mt-1 text-xs text-red-600">{errors.content_type.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Tone</label>
                <select {...register("tone")} className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm bg-white">
                  <option value="">Select tone...</option>
                  {TONES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
                </select>
                {errors.tone && <p className="mt-1 text-xs text-red-600">{errors.tone.message}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Topic / Subject</label>
              <input {...register("topic")} placeholder="e.g. Remote work tips for startups" className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm" />
              {errors.topic && <p className="mt-1 text-xs text-red-600">{errors.topic.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Keywords <span className="text-slate-400 font-normal">(optional)</span>
              </label>
              <input {...register("keywords")} placeholder="productivity, remote, async, tools" className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm" />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Target Audience <span className="text-slate-400 font-normal">(optional)</span>
              </label>
              <input {...register("target_audience")} placeholder="Startup founders & remote teams" className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm" />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Language</label>
              <select
                {...register("language")}
                onChange={(e) => setIsCustomLang(e.target.value === "custom")}
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm bg-white"
              >
                {LANGUAGES.map((l) => <option key={l.value} value={l.value}>{l.label}</option>)}
                <option value="custom">Other (custom)...</option>
              </select>
              {(isCustomLang || languageValue === "custom") && (
                <input {...register("custom_language")} placeholder="e.g. Javanese, Arabic, Korean..." className="mt-2 w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm" />
              )}
              {errors.language && <p className="mt-1 text-xs text-red-600">{errors.language.message}</p>}
            </div>

            {error && <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">{error}</div>}

            <button type="submit" disabled={isSubmitting} className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white font-semibold py-3 rounded-full transition-colors flex items-center justify-center gap-2">
              {isSubmitting ? (
                <>
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Generating...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                  Generate Content
                </>
              )}
            </button>
          </form>
        </div>

        {/* Result */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col lg:min-h-0">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-slate-900">Generated Content</h2>
            {result && <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-full">{result.word_count} words</span>}
          </div>

          {!result && !isSubmitting && (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-slate-200 rounded-xl">
              <svg className="w-12 h-12 text-slate-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-slate-400 text-sm">Your generated content will appear here</p>
            </div>
          )}

          {isSubmitting && (
            <div className="flex-1 flex items-center justify-center">
              <LoadingSpinner text="AI is generating your content..." />
            </div>
          )}

          {result && (
            <>
              <div className="flex-1 bg-slate-50 rounded-xl p-4 overflow-y-auto text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
                {result.generated_content}
              </div>
              <div className="flex gap-2 mt-4">
                <button onClick={handleCopy} className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  {copied ? "Copied!" : "Copy"}
                </button>
                <button onClick={() => downloadTxt(result)} className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-sm font-medium text-white transition-colors">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download .txt
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}