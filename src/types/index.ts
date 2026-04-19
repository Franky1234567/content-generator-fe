export interface User {
  id: number;
  name: string;
  email: string;
}

export interface SalesPageData {
  headline: string;
  subheadline: string;
  hook?: string;
  overview: string;
  benefits: { icon: string; title: string; description: string }[];
  features: { name: string; description: string }[];
  testimonials: { quote: string; name: string; role: string; company?: string }[];
  pricing: { price: string; period?: string | null; includes: string[] };
  cta_primary: string;
  cta_secondary?: string | null;
  urgency?: string | null;
}

export interface SalesPageGeneration {
  id: number;
  user_id: number;
  product_name: string;
  description: string;
  features: string;
  target_audience: string | null;
  price: string;
  usp: string | null;
  generated_json: string;
  style_template: string;
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

export const STYLE_TEMPLATES = [
  { value: "modern",  label: "Modern"  },
  { value: "minimal", label: "Minimal" },
  { value: "bold",    label: "Bold"    },
];
