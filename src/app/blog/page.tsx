// src/app/blog/page.tsx
import type { Metadata } from 'next';
import GlobalHeader from '../components/GlobalHeader';
import GlobalFooter from '../components/GlobalFooter';
import BlogCard from './components/BlogCard';
import { getAllPosts } from './posts/registry';
import { displayFont } from './blogFont';

const SITE = 'https://www.showermap.com';

export const metadata: Metadata = {
  title: 'Blog: Showering on the Road, Travel Hygiene & Van Life Tips',
  description:
    'Guides on finding public showers, van life hygiene, portable shower gear and staying clean while travelling, from the team behind ShowerMap.',
  alternates: { canonical: `${SITE}/blog/` },
  openGraph: {
    type: 'website',
    url: `${SITE}/blog/`,
    title: 'ShowerMap Blog: Travel Hygiene & Shower Guides',
    description:
      'Guides on finding public showers, van life hygiene and staying clean while travelling.',
    siteName: 'ShowerMap',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'ShowerMap Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ShowerMap Blog: Travel Hygiene & Shower Guides',
    description: 'Guides on finding public showers and staying clean while travelling.',
    images: ['/images/og-image.jpg'],
  },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  const blogJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'ShowerMap Blog',
    url: `${SITE}/blog/`,
    description:
      'Guides on finding public showers, van life hygiene and staying clean while travelling.',
    blogPost: posts.map((p) => ({
      '@type': 'BlogPosting',
      headline: p.meta.title,
      url: `${SITE}/blog/${p.meta.slug}/`,
      datePublished: p.meta.date,
      dateModified: p.meta.updated ?? p.meta.date,
      author: { '@type': 'Organization', name: p.meta.author },
    })),
  };

  return (
    <>
      <GlobalHeader />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />
      <main className={`${displayFont.variable} min-h-screen bg-white`}>
        <section className="border-b border-warm-200 bg-warm-50">
          <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
            <span className="font-display flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-primary-600 before:h-[3px] before:w-6 before:bg-primary-500 before:content-['']">
              The ShowerMap Blog
            </span>
            <h1 className="font-display mt-3 text-4xl font-bold uppercase leading-[0.98] tracking-tight text-warm-900 md:text-6xl">
              Staying Clean on the Road
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-warm-600">
              Practical guides on finding public showers, van life hygiene, portable shower gear and
              staying clean wherever the road takes you.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <p className="text-warm-500">No posts yet. Check back soon.</p>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((p) => (
                <BlogCard key={p.meta.slug} meta={p.meta} />
              ))}
            </div>
          )}
        </div>
      </main>
      <GlobalFooter />
    </>
  );
}
