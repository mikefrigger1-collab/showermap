// src/app/blog/components/BlogCard.tsx
import Link from 'next/link';
import Image from 'next/image';
import type { PostMeta } from '../posts/types';

export default function BlogCard({ meta }: { meta: PostMeta }) {
  return (
    <article className="group overflow-hidden border border-warm-200 bg-white transition-colors duration-200 hover:border-warm-300">
      <Link href={`/blog/${meta.slug}/`} className="block">
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={meta.heroImage}
            alt={meta.heroAlt}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
        <div className="p-5">
          <span className="font-display text-xs font-semibold uppercase tracking-[0.12em] text-primary-600">
            {meta.category}
          </span>
          <h2 className="font-display mt-2 text-xl font-semibold uppercase leading-[1.05] tracking-tight text-warm-900 group-hover:text-primary-600">
            {meta.title}
          </h2>
          <p className="mt-2 line-clamp-2 text-sm text-warm-600">{meta.description}</p>
          <time dateTime={meta.date} className="font-display mt-3 block text-xs uppercase tracking-wider text-warm-400">
            {new Date(meta.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
        </div>
      </Link>
    </article>
  );
}
