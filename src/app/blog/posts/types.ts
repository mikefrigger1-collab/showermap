// src/app/blog/posts/types.ts
import type { ComponentType } from 'react';

export interface PostMeta {
  /** URL slug, must match the registry key and the filename. */
  slug: string;
  title: string;
  description: string;
  /** ISO date, e.g. '2026-06-17'. Used for sorting + schema datePublished. */
  date: string;
  /** ISO date of last meaningful edit. Defaults to `date` if omitted. */
  updated?: string;
  /** Hero image path (under /public) or a remote URL. */
  heroImage: string;
  heroAlt: string;
  keywords: string[];
  author: string;
  category: string;
}

export interface BlogPost {
  meta: PostMeta;
  /** The post body as a React component (renders JSX, geo blocks, CTAs…). */
  Content: ComponentType;
}
