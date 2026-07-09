// src/app/blog/components/BlogLayout.tsx
import type { ReactNode } from 'react';
import Image from 'next/image';
import type { PostMeta } from '../posts/types';
import Breadcrumbs from './Breadcrumbs';
import { displayFont } from '../blogFont';
import '../article.css';

export default function BlogLayout({
  meta,
  children,
}: {
  meta: PostMeta;
  children: ReactNode;
}) {
  const published = new Date(meta.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <main className={`${displayFont.variable} min-h-screen bg-white`}>
      {/* Hero */}
      <section className="relative h-72 overflow-hidden md:h-[28rem]">
        <Image src={meta.heroImage} alt={meta.heroAlt} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-black/10" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <div className="mx-auto max-w-3xl">
            <span className="font-display inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.12em] text-primary-300 before:h-[3px] before:w-6 before:bg-primary-400 before:content-['']">
              {meta.category}
            </span>
            <h1 className="font-display mt-3 text-4xl font-bold uppercase leading-[0.98] tracking-tight text-white md:text-6xl">
              {meta.title}
            </h1>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Blog', href: '/blog/' },
            { name: meta.title, href: `/blog/${meta.slug}/` },
          ]}
        />

        <div className="font-display mb-10 flex items-center gap-3 text-sm uppercase tracking-wider text-warm-500">
          <span>By {meta.author}</span>
          <span aria-hidden>/</span>
          <time dateTime={meta.date}>{published}</time>
        </div>

        <article className="article">{children}</article>
      </div>
    </main>
  );
}
