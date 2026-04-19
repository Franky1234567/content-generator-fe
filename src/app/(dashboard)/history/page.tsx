"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import { SalesPageGeneration, PaginatedResponse } from "@/types";
import ContentBadge from "@/components/ui/ContentBadge";
import DeleteModal from "@/components/ui/DeleteModal";
import { formatDate } from "@/utils/format";

export default function HistoryPage() {
  const router = useRouter();
  const [data, setData] = useState<PaginatedResponse<SalesPageGeneration> | null>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<number | null>(null);
  const [confirmId, setConfirmId] = useState<number | null>(null);

  const fetchHistory = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get("/generations", {
        params: { search, page },
      });
      setData(res.data);
    } finally {
      setLoading(false);
    }
  }, [search, page]);

  useEffect(() => {
    const timer = setTimeout(fetchHistory, 300);
    return () => clearTimeout(timer);
  }, [fetchHistory]);

  const handleDeleteClick = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setConfirmId(id);
  };

  const handleDeleteConfirm = async () => {
    if (!confirmId) return;
    setDeleting(confirmId);
    try {
      await api.delete(`/generations/${confirmId}`);
      setConfirmId(null);
      fetchHistory();
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Generation History</h1>
        <p className="text-slate-500 mt-1">All your generated sales pages in one place.</p>
      </div>

      {/* Search */}
      <div className="mb-4 relative">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          placeholder="Search by product name or description..."
          className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        {/* Table header — desktop only */}
        <div className="hidden md:grid md:grid-cols-[1fr_120px_160px_90px_60px_40px] gap-4 px-4 py-3 border-b border-slate-100 text-xs font-medium text-slate-400 uppercase tracking-wide">
          <span>Product</span>
          <span>Style</span>
          <span>Audience</span>
          <span>Date</span>
          <span></span>
          <span></span>
        </div>

        {loading ? (
          Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="px-4 py-3 border-b border-slate-100 last:border-0 animate-pulse">
              <div className="h-4 bg-slate-200 rounded w-3/4" />
            </div>
          ))
        ) : data?.data.length === 0 ? (
          <div className="p-12 text-center">
            <svg className="w-10 h-10 text-slate-300 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-slate-400 text-sm">No sales pages found</p>
          </div>
        ) : (
          data?.data.map((item) => (
            <div
              key={item.id}
              onClick={() => router.push(`/history/${item.id}`)}
              className="grid grid-cols-[1fr_auto] md:grid-cols-[1fr_120px_160px_90px_60px_40px] gap-4 items-center px-4 py-3 border-b border-slate-100 last:border-0 hover:bg-slate-50 cursor-pointer transition-colors"
            >
              {/* Mobile: left col */}
              <div className="md:contents">
                <p className="font-medium text-slate-800 text-sm truncate">{item.product_name}</p>
                <div className="flex gap-3 text-xs text-slate-400 mt-0.5 md:hidden">
                  <span className="capitalize">{item.style_template}</span>
                  <span>{formatDate(item.created_at)}</span>
                </div>
              </div>

              {/* Desktop-only cols */}
              <div className="hidden md:block">
                <ContentBadge type={item.style_template} />
              </div>
              <span className="hidden md:block text-sm text-slate-500 truncate">{item.target_audience || "—"}</span>
              <span className="hidden md:block text-sm text-slate-400">{formatDate(item.created_at)}</span>
              <span className="hidden md:block text-sm font-medium text-indigo-600">View</span>

              {/* Delete — always visible */}
              <button
                onClick={(e) => handleDeleteClick(e, item.id)}
                disabled={deleting === item.id}
                className="p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))
        )}
      </div>

      <DeleteModal
        isOpen={confirmId !== null}
        loading={deleting !== null}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setConfirmId(null)}
      />

      {/* Pagination */}
      {data && data.last_page > 1 && (
        <div className="flex justify-center gap-2 pt-4">
          {Array.from({ length: data.last_page }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                page === i + 1 ? "bg-indigo-600 text-white" : "bg-white border border-slate-300 text-slate-700 hover:bg-slate-50"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}