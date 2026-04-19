"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import api from "@/lib/axios";
import { SalesPageGeneration, SalesPageData, STYLE_TEMPLATES } from "@/types";
import ContentBadge from "@/components/ui/ContentBadge";
import { formatDate } from "@/utils/format";
import ModernTemplate from "@/components/templates/ModernTemplate";
import MinimalTemplate from "@/components/templates/MinimalTemplate";
import BoldTemplate from "@/components/templates/BoldTemplate";
import DeleteModal from "@/components/ui/DeleteModal";

const TEMPLATE_COMPONENTS = {
  modern:  ModernTemplate,
  minimal: MinimalTemplate,
  bold:    BoldTemplate,
} as const;

export default function HistoryDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [item, setItem] = useState<SalesPageGeneration | null>(null);
  const [parsedData, setParsedData] = useState<SalesPageData | null>(null);
  const [activeTemplate, setActiveTemplate] = useState("modern");
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    api.get(`/generations/${id}`)
      .then((res) => {
        const gen: SalesPageGeneration = res.data;
        setItem(gen);
        setParsedData(JSON.parse(gen.generated_json));
        setActiveTemplate(gen.style_template);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const buildHtmlDocument = () => {
    const body = previewRef.current?.innerHTML ?? "";
    const title = item?.product_name ?? "Sales Page";
    return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title></head><body style="margin:0;padding:0;">${body}</body></html>`;
  };

  const handleCopyHtml = async () => {
    if (!previewRef.current) return;
    await navigator.clipboard.writeText(buildHtmlDocument());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFullPreview = () => {
    if (!previewRef.current) return;
    const blob = new Blob([buildHtmlDocument()], { type: "text/html" });
    window.open(URL.createObjectURL(blob), "_blank");
  };

  const handleDownload = () => {
    if (!previewRef.current || !item) return;
    const html = buildHtmlDocument();
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${item.product_name.replace(/\s+/g, "_")}_sales_page.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDeleteConfirm = async () => {
    setDeleting(true);
    try {
      await api.delete(`/generations/${id}`);
      router.push("/history");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto animate-pulse space-y-4">
        <div className="h-4 bg-slate-200 rounded w-32" />
        <div className="h-8 bg-slate-200 rounded w-2/3" />
        <div className="h-64 bg-slate-200 rounded" />
      </div>
    );
  }

  if (!item || !parsedData) {
    return (
      <div className="max-w-5xl mx-auto text-center py-20">
        <p className="text-slate-500">Sales page not found.</p>
        <Link href="/history" className="text-indigo-600 text-sm mt-2 inline-block">← Back to History</Link>
      </div>
    );
  }

  const TemplateComponent = TEMPLATE_COMPONENTS[activeTemplate as keyof typeof TEMPLATE_COMPONENTS] || ModernTemplate;

  return (
    <div className="max-w-5xl mx-auto">
      {/* Back */}
      <Link href="/history" className="inline-flex items-center gap-1.5 text-sm text-indigo-600 hover:text-indigo-700 mb-4">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to History
      </Link>

      {/* Title row */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">{item.product_name}</h1>
          <div className="flex flex-wrap gap-2">
            <ContentBadge type={item.style_template} />
            {item.target_audience && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600">{item.target_audience}</span>
            )}
            <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">{item.price}</span>
          </div>
        </div>
        <p className="text-sm text-slate-400 shrink-0">{formatDate(item.created_at)}</p>
      </div>

      {/* Template Switcher */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xs text-slate-400 font-medium">Style:</span>
        <div className="flex bg-slate-100 rounded-lg p-0.5 gap-0.5">
          {STYLE_TEMPLATES.map((t) => (
            <button
              key={t.value}
              onClick={() => setActiveTemplate(t.value)}
              className={`px-4 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                activeTemplate === t.value
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <span className="text-xs text-slate-300">Switch template without re-generating</span>
      </div>

      {/* Preview + Actions */}
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Sales page preview */}
        <div className="flex-1 bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div ref={previewRef}><TemplateComponent data={parsedData} /></div>
        </div>

        {/* Actions */}
        <div className="lg:w-48 shrink-0">
          <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-2 lg:sticky lg:top-4">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Actions</p>
            <button
              onClick={handleCopyHtml}
              className="w-full px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors"
            >
              {copied ? "Copied!" : "Copy HTML"}
            </button>
            <button
              onClick={handleFullPreview}
              className="w-full px-4 py-2.5 border border-slate-300 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-50 transition-colors"
            >
              Full Preview
            </button>
            <button
              onClick={handleDownload}
              className="w-full px-4 py-2.5 border border-slate-300 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-50 transition-colors"
            >
              Download .html
            </button>
            <button
              onClick={() => setShowDeleteModal(true)}
              disabled={deleting}
              className="w-full px-4 py-2.5 border border-red-200 text-red-600 text-sm font-medium rounded-lg hover:bg-red-50 transition-colors disabled:opacity-60"
            >
              {deleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </div>

      <DeleteModal
        isOpen={showDeleteModal}
        loading={deleting}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setShowDeleteModal(false)}
      />
    </div>
  );
}
