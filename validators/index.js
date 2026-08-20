import { z } from 'zod';

export const businessSchema = z.object({
  name: z.string().optional(),
  category: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email().optional().or(z.literal('')),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zipCode: z.string().optional(),
  country: z.string().optional(),
  googleRating: z.number().min(0).max(5).optional(),
  googleReviewCount: z.number().min(0).optional(),
  googleBusinessUrl: z.string().url().optional().or(z.literal('')),
  googleMapsUrl: z.string().url().optional().or(z.literal('')),
  serviceArea: z.string().optional(),
  hours: z.record(z.string()).optional(),
  socialLinks: z.record(z.string()).optional(),
  seo: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    keywords: z.array(z.string()).optional(),
  }).optional(),
});

export const serviceSchema = z.object({
  title: z.string().min(1).max(100),
  slug: z.string().min(1).max(100),
  shortDescription: z.string().min(1).max(200),
  description: z.string().min(1).max(2000),
  icon: z.string().optional(),
  image: z.string().optional(),
  category: z.string().optional(),
  verified: z.boolean().optional(),
  published: z.boolean().optional(),
  featured: z.boolean().optional(),
  order: z.number().optional(),
  seoTitle: z.string().max(60).optional(),
  seoDescription: z.string().max(160).optional(),
});

export const projectSchema = z.object({
  title: z.string().min(1).max(100),
  slug: z.string().min(1).max(100),
  category: z.string().optional(),
  description: z.string().min(1).max(2000),
  location: z.string().optional(),
  images: z.array(z.string()).optional(),
  coverImage: z.string().optional(),
  beforeImage: z.string().optional(),
  afterImage: z.string().optional(),
  isVerified: z.boolean().optional(),
  published: z.boolean().optional(),
  featured: z.boolean().optional(),
  order: z.number().optional(),
});

export const reviewSchema = z.object({
  authorName: z.string().min(1).max(100),
  rating: z.number().min(1).max(5),
  reviewText: z.string().min(1).max(1000),
  source: z.string().optional(),
  sourceUrl: z.string().url().optional().or(z.literal('')),
  verified: z.boolean().optional(),
  published: z.boolean().optional(),
  featured: z.boolean().optional(),
});

export const faqSchema = z.object({
  question: z.string().min(1).max(200),
  answer: z.string().min(1).max(2000),
  published: z.boolean().optional(),
  order: z.number().optional(),
});

export const leadSchema = z.object({
  name: z.string().min(1),
  phone: z.string().min(1),
  email: z.string().email().optional().or(z.literal('')),
  projectType: z.string().min(1),
  propertyLocation: z.string().min(1),
  description: z.string().min(1),
  preferredContactMethod: z.enum(['phone', 'email', 'either']).optional(),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const registerSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(['admin', 'editor']).optional(),
});
