/**
 * Types definition for Wali & Son's Engineering Works
 * Designed for future migration to Firebase/Supabase/PostgreSQL.
 */

export interface BusinessStats {
  yearsExperience: number;
  projectsCompleted: number;
  happyClients: number;
  servicesCount: number;
}

export interface SocialLinks {
  facebook: string;
  instagram: string;
  youtube: string;
  tiktok: string;
}

export interface HeroSectionSettings {
  title: string;
  subtitle: string;
  description: string;
  heroImage: string;
}

export interface ShopSettings {
  businessName: string;
  tagline: string;
  description: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  openingHours: string;
  googleMapsEmbedUrl: string;
  stats: BusinessStats;
  social: SocialLinks;
  hero: HeroSectionSettings;
  updatedAt: string;
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  icon: string;
  image: string;
  category: string;
  featured: boolean;
  active: boolean;
  capabilities: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  location: string;
  date: string;
  image: string;
  beforeImage?: string;
  afterImage?: string;
  featured: boolean;
  client?: string;
  scope?: string[];
  createdAt: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  createdAt: string;
}

export interface Review {
  id: string;
  customerName: string;
  rating: number; // 1 to 5
  review: string;
  date: string;
  approved: boolean;
  isSampleData: boolean;
  projectType?: string;
}

export type InquiryStatus = 'New' | 'Contacted' | 'In Progress' | 'Completed' | 'Cancelled';

export interface Inquiry {
  id: string;
  name: string;
  phone: string;
  whatsapp?: string;
  email?: string;
  service: string;
  description: string;
  quantity?: string;
  preferredDate?: string;
  budget?: string;
  notes?: string;
  attachmentName?: string;
  attachmentDataUrl?: string; // Small image/preview data URI or notice
  status: InquiryStatus;
  createdAt: string;
}

export interface AdminUser {
  id: string;
  username: string;
  email: string;
  name: string;
  role: 'admin' | 'editor';
}

export interface AuthSession {
  isAuthenticated: boolean;
  user: AdminUser | null;
  token: string | null;
  loggedInAt: string | null;
}

export interface AppData {
  version: string;
  settings: ShopSettings;
  services: Service[];
  projects: Project[];
  gallery: GalleryItem[];
  reviews: Review[];
  inquiries: Inquiry[];
  exportedAt: string;
}

export type ThemeMode = 'dark' | 'light';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  message: string;
  duration?: number;
}
