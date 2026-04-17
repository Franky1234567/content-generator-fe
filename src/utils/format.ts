import { ContentGeneration } from "@/types";

export const formatDate = (str: string) =>
  new Date(str).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

export const badgeColor = (type: string): string => {
  const map: Record<string, string> = {
    "blog post": "bg-blue-100 text-blue-700",
    "ad copy": "bg-purple-100 text-purple-700",
    email: "bg-green-100 text-green-700",
    "social media post": "bg-pink-100 text-pink-700",
    "product description": "bg-orange-100 text-orange-700",
    "press release": "bg-yellow-100 text-yellow-700",
  };
  return map[type] || "bg-slate-100 text-slate-700";
};

export const downloadTxt = (item: ContentGeneration) => {
  const blob = new Blob([item.generated_content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${item.topic.replace(/\s+/g, "_")}.txt`;
  a.click();
  URL.revokeObjectURL(url);
};