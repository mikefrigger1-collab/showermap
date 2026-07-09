// src/app/blog/posts/registry.ts
import type { BlogPost, PostMeta } from './types';

// Import each post module. Adding a post = add one import + one registry entry.
import * as howVanLifersShower from './how-van-lifers-shower';

/**
 * Slug → post module. Each module exports `meta: PostMeta` and `Content`.
 */
const modules: Record<string, { meta: PostMeta; Content: BlogPost['Content'] }> = {
  'how-van-lifers-shower': howVanLifersShower,
};

export const POSTS: BlogPost[] = Object.values(modules)
  .map((m) => ({ meta: m.meta, Content: m.Content }))
  // Newest first.
  .sort((a, b) => +new Date(b.meta.date) - +new Date(a.meta.date));

export function getAllPosts(): BlogPost[] {
  return POSTS;
}

export function getPostSlugs(): string[] {
  return POSTS.map((p) => p.meta.slug);
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  const m = modules[slug];
  return m ? { meta: m.meta, Content: m.Content } : undefined;
}
