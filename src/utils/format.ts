import { SalesPageGeneration, SalesPageData } from "@/types";
import { generateHtml } from "./generateHtml";

export const formatDate = (str: string) =>
  new Date(str).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

export const badgeColor = (template: string): string => {
  const map: Record<string, string> = {
    modern:  "bg-indigo-100 text-indigo-700",
    minimal: "bg-slate-100 text-slate-700",
    bold:    "bg-orange-100 text-orange-700",
  };
  return map[template] || "bg-slate-100 text-slate-700";
};

export const downloadHtml = (item: SalesPageGeneration, activeTemplate?: string) => {
  const data: SalesPageData = JSON.parse(item.generated_json);
  const template = activeTemplate || item.style_template;
  const html = generateHtml(data, template);
  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${item.product_name.replace(/\s+/g, "_")}_sales_page.html`;
  a.click();
  URL.revokeObjectURL(url);
};
