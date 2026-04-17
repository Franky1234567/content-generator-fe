export interface User {
  id: number;
  name: string;
  email: string;
}

export interface ContentGeneration {
  id: number;
  user_id: number;
  content_type: string;
  topic: string;
  keywords: string | null;
  target_audience: string | null;
  tone: string;
  language: string;
  generated_content: string;
  word_count: number;
  created_at: string;
  updated_at: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export const CONTENT_TYPES = [
  { value: "blog post", label: "Blog Post" },
  { value: "ad copy", label: "Ad Copy" },
  { value: "email", label: "Email" },
  { value: "social media post", label: "Social Media Post" },
  { value: "product description", label: "Product Description" },
  { value: "press release", label: "Press Release" },
];

export const TONES = [
  { value: "formal", label: "Formal" },
  { value: "casual", label: "Casual" },
  { value: "persuasive", label: "Persuasive" },
  { value: "informative", label: "Informative" },
  { value: "humorous", label: "Humorous" },
  { value: "inspirational", label: "Inspirational" },
];

export const LANGUAGES = [
  { value: "Bahasa Indonesia", label: "Bahasa Indonesia" },
  { value: "English", label: "English" },
  { value: "Malay", label: "Bahasa Melayu" },
  { value: "Spanish", label: "Spanish" },
  { value: "French", label: "French" },
  { value: "Japanese", label: "Japanese" },
];