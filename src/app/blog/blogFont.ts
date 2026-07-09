// src/app/blog/blogFont.ts
// Condensed display face for blog headings, paired with the site's Inter body.
// Self-hosted via next/font (no layout shift, no extra render-blocking request).
import { Oswald } from 'next/font/google';

export const displayFont = Oswald({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  display: 'swap',
  variable: '--font-display',
});
