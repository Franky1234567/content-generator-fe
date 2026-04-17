"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import api from "@/lib/axios";
import { ContentGeneration } from "@/types";
import ContentBadge from "@/components/ui/ContentBadge";
import { formatDate, downloadTxt } from "@/utils/format";

export default function HistoryDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [item, setItem] = useState<ContentGeneration | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    api.get(`/generations/${id}`)
      .then((res) => setItem(res.data))
      .finally(() => setLoading(false));
  }, [id]);

  const handleCopy = async () => {
    if (!item) return;
    await navigator.clipboard.writeText(item.generated_content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDelete = async () => {
    if (!confirm("Delete this generation?")) return;
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

  if (!item) {
    return (
      <div className="max-w-5xl mx-auto text-center py-20">
        <p className="text-slate-500">Content not found.</p>
        <Link href="/history" className="text-indigo-600 text-sm mt-2 inline-block">← Back to History</Link>
      </div>
    );
  }

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
          <h1 className="text-2xl font-bold text-slate-900 mb-2">{item.topic}</h1>
          <div className="flex flex-wrap gap-2">
            <ContentBadge type={item.content_type} />
            <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600 capitalize">{item.tone}</span>
            {item.target_audience && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600">{item.target_audience}</span>
            )}
          </div>
        </div>
        <div className="text-sm text-slate-400 shrink-0 sm:text-right">
          <p>{formatDate(item.created_at)}</p>
          <p>{item.word_count} words</p>
        </div>
      </div>

      {/* Content + Actions */}
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Content */}
        <div className="flex-1 bg-white rounded-xl border border-slate-200 p-5">
          <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
            {item.generated_content}
          </p>
        </div>

        {/* Actions */}
        <div className="lg:w-48 shrink-0">
          <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-2 lg:sticky lg:top-4">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Actions</p>
            <button
              onClick={handleCopy}
              className="w-full px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors"
            >
              {copied ? "Copied!" : "Copy to Clipboard"}
            </button>
            <button
              onClick={() => downloadTxt(item)}
              className="w-full px-4 py-2.5 border border-slate-300 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-50 transition-colors"
            >
              Download .txt
            </button>
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="w-full px-4 py-2.5 border border-red-200 text-red-600 text-sm font-medium rounded-lg hover:bg-red-50 transition-colors disabled:opacity-60"
            >
              {deleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}