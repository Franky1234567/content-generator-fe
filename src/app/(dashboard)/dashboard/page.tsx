"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import api from "@/lib/axios";
import { SalesPageGeneration, SalesPageData, STYLE_TEMPLATES } from "@/types";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import ModernTemplate from "@/components/templates/ModernTemplate";
import MinimalTemplate from "@/components/templates/MinimalTemplate";
import BoldTemplate from "@/components/templates/BoldTemplate";

const schema = z.object({
  product_name:    z.string().min(2,  "Product name is required"),
  description:     z.string().min(10, "Description must be at least 10 characters"),
  features:        z.string().min(1,  "Add at least one feature"),
  target_audience: z.string().min(2,  "Target audience is required"),
  price:           z.string().min(1,  "Price is required"),
  usp:             z.string().optional(),
  style_template:  z.string().min(1,  "Select a style template"),
});

type FormData = z.infer<typeof schema>;

const TEMPLATE_COMPONENTS = {
  modern:  ModernTemplate,
  minimal: MinimalTemplate,
  bold:    BoldTemplate,
} as const;

function DashboardContent() {
  const searchParams = useSearchParams();
  const [result, setResult] = useState<SalesPageGeneration | null>(null);
  const [parsedData, setParsedData] = useState<SalesPageData | null>(null);
  const [activeTemplate, setActiveTemplate] = useState("modern");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { style_template: "modern" },
  });

  useEffect(() => {
    const product_name = searchParams.get("product_name");
    if (!product_name) return;
    reset({
      product_name:    product_name || "",
      description:     searchParams.get("description")     || "",
      features:        searchParams.get("features")        || "",
      target_audience: searchParams.get("target_audience") || "",
      price:           searchParams.get("price")           || "",
      usp:             searchParams.get("usp")             || "",
      style_template:  searchParams.get("style_template")  || "modern",
    });
  }, [searchParams, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      setError("");
      setResult(null);
      setParsedData(null);
      const res = await api.post("/generations", data);
      const generation: SalesPageGeneration = res.data;
      setResult(generation);
      setParsedData(JSON.parse(generation.generated_json));
      setActiveTemplate(generation.style_template);
    } catch (err: unknown) {
      const e = err as { response?: { data?: { message?: string } } };
      setError(e.response?.data?.message || "Failed to generate sales page. Please try again.");
    }
  };

  const buildHtmlDocument = (title: string) => {
    const body = previewRef.current?.innerHTML ?? "";
    return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title></head><body style="margin:0;padding:0;">${body}</body></html>`;
  };

  const handleCopyHtml = async () => {
    if (!previewRef.current || !result) return;
    await navigator.clipboard.writeText(buildHtmlDocument(result.product_name));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFullPreview = () => {
    if (!previewRef.current || !result) return;
    const blob = new Blob([buildHtmlDocument(result.product_name)], { type: "text/html" });
    window.open(URL.createObjectURL(blob), "_blank");
  };

  const handleDownload = () => {
    if (!previewRef.current || !result) return;
    const html = buildHtmlDocument(result.product_name);
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${result.product_name.replace(/\s+/g, "_")}_sales_page.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const TemplateComponent = TEMPLATE_COMPONENTS[activeTemplate as keyof typeof TEMPLATE_COMPONENTS] || ModernTemplate;

  return (
    <div className="max-w-6xl mx-auto lg:h-[calc(100vh-4rem)] flex flex-col">
      <div className="mb-6 shrink-0">
        <h1 className="text-2xl font-bold text-slate-900">Generate Sales Page</h1>
        <p className="text-slate-500 mt-1">Fill in your product details and AI will generate conversion-ready copy</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:flex-1 lg:min-h-0">
        {/* Form */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 lg:overflow-y-auto">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Product Name</label>
              <input
                {...register("product_name")}
                placeholder="e.g. TaskFlow Pro"
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              />
              {errors.product_name && <p className="mt-1 text-xs text-red-600">{errors.product_name.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Product Description</label>
              <textarea
                {...register("description")}
                rows={3}
                placeholder="What does your product do? What problem does it solve?"
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm resize-none"
              />
              {errors.description && <p className="mt-1 text-xs text-red-600">{errors.description.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Features</label>
              <textarea
                {...register("features")}
                rows={3}
                placeholder="Feature 1, Feature 2, Feature 3, ..."
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm resize-none"
              />
              {errors.features && <p className="mt-1 text-xs text-red-600">{errors.features.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Target Audience</label>
                <input
                  {...register("target_audience")}
                  placeholder="e.g. Startup founders"
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                />
                {errors.target_audience && <p className="mt-1 text-xs text-red-600">{errors.target_audience.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Price</label>
                <input
                  {...register("price")}
                  placeholder="e.g. Rp 299.000 / month"
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                />
                {errors.price && <p className="mt-1 text-xs text-red-600">{errors.price.message}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Unique Selling Points <span className="text-slate-400 font-normal">(optional)</span>
              </label>
              <input
                {...register("usp")}
                placeholder="e.g. 30-day money back, No credit card required"
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Default Style</label>
              <div className="grid grid-cols-3 gap-2">
                {STYLE_TEMPLATES.map((t) => {
                  const selected = watch("style_template") === t.value;
                  const activeColors: Record<string, string> = {
                    modern:  "border-indigo-500 bg-indigo-600 text-white shadow-md shadow-indigo-200",
                    minimal: "border-slate-500 bg-slate-700 text-white shadow-md shadow-slate-200",
                    bold:    "border-orange-500 bg-orange-500 text-white shadow-md shadow-orange-200",
                  };
                  const icons: Record<string, string> = {
                    modern:  "✦",
                    minimal: "○",
                    bold:    "◆",
                  };
                  return (
                    <label key={t.value} className="cursor-pointer">
                      <input {...register("style_template")} type="radio" value={t.value} className="sr-only" />
                      <div className={`flex flex-col items-center gap-1 py-3 border-2 rounded-xl text-sm font-semibold transition-all ${
                        selected
                          ? activeColors[t.value]
                          : "border-slate-200 bg-white text-slate-400 hover:border-slate-300 hover:text-slate-600"
                      }`}>
                        <span className="text-base">{icons[t.value]}</span>
                        <span>{t.label}</span>
                        {selected && <span className="text-[10px] opacity-75 font-normal">Selected</span>}
                      </div>
                    </label>
                  );
                })}
              </div>
              {errors.style_template && <p className="mt-1 text-xs text-red-600">{errors.style_template.message}</p>}
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">{error}</div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white font-semibold py-3 rounded-full transition-colors flex items-center justify-center gap-2"
            >
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
                  Generate Sales Page
                </>
              )}
            </button>
          </form>
        </div>

        {/* Result */}
        <div className="bg-white rounded-2xl border border-slate-200 flex flex-col lg:min-h-0 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 shrink-0">
            <h2 className="font-semibold text-slate-900">Preview</h2>
            {parsedData && (
              <div className="flex bg-slate-100 rounded-lg p-0.5 gap-0.5">
                {STYLE_TEMPLATES.map((t) => (
                  <button
                    key={t.value}
                    onClick={() => setActiveTemplate(t.value)}
                    className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors ${
                      activeTemplate === t.value
                        ? "bg-white text-slate-900 shadow-sm"
                        : "text-slate-500 hover:text-slate-700"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Body */}
          <div className="flex-1 lg:overflow-y-auto">
            {!parsedData && !isSubmitting && (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 min-h-[400px]">
                <svg className="w-12 h-12 text-slate-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="text-slate-400 text-sm">Your sales page preview will appear here</p>
                <p className="text-slate-300 text-xs mt-1">Switch templates after generating - no re-generation needed</p>
              </div>
            )}

            {isSubmitting && (
              <div className="h-full flex items-center justify-center min-h-[400px]">
                <LoadingSpinner text="AI is writing your sales page..." />
              </div>
            )}

            {parsedData && <div ref={previewRef}><TemplateComponent data={parsedData} /></div>}
          </div>

          {/* Actions */}
          {parsedData && result && (
            <div className="flex gap-2 p-4 border-t border-slate-100 shrink-0">
              <button
                onClick={handleCopyHtml}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                {copied ? "Copied!" : "Copy HTML"}
              </button>
              <button
                onClick={handleFullPreview}
                className="flex items-center justify-center gap-2 px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Full Preview
              </button>
              <button
                onClick={handleDownload}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-sm font-medium text-white transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download .html
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense>
      <DashboardContent />
    </Suspense>
  );
}
