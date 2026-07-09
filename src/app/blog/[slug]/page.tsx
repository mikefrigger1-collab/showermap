// src/app/blog/[slug]/page.tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import GlobalHeader from '../../components/GlobalHeader';
import GlobalFooter from '../../components/GlobalFooter';
import BlogLayout from '../components/BlogLayout';
import { getPostBySlug, getPostSlugs } from '../posts/registry';

const SITE = 'https://www.showermap.com';

export async function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.',
      robots: { index: false, follow: true },
    };
  }

  const { meta } = post;
  const url = `${SITE}/blog/${meta.slug}/`;

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    authors: [{ name: meta.author }],
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title: meta.title,
      description: meta.description,
      siteName: 'ShowerMap',
      publishedTime: meta.date,
      modifiedTime: meta.updated ?? meta.date,
      authors: [meta.author],
      images: [{ url: meta.heroImage, width: 1200, height: 630, alt: meta.heroAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      images: [meta.heroImage],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const { meta, Content } = post;
  const url = `${SITE}/blog/${meta.slug}/`;
  const imageUrl = meta.heroImage.startsWith('http') ? meta.heroImage : `${SITE}${meta.heroImage}`;

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: meta.title,
    description: meta.description,
    image: [imageUrl],
    datePublished: meta.date,
    dateModified: meta.updated ?? meta.date,
    author: { '@type': 'Organization', name: meta.author, url: SITE },
    publisher: {
      '@type': 'Organization',
      name: 'ShowerMap',
      logo: { '@type': 'ImageObject', url: `${SITE}/images/logo.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    keywords: meta.keywords.join(', '),
    articleSection: meta.category,
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE}/blog/` },
      { '@type': 'ListItem', position: 3, name: meta.title, item: url },
    ],
  };

  return (
    <>
      <GlobalHeader />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <BlogLayout meta={meta}>
        <Content />
      </BlogLayout>
      <GlobalFooter />
    </>
  );
}
