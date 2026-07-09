// src/app/blog/components/Breadcrumbs.tsx
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export interface Crumb {
  name: string;
  href: string;
}

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="not-prose mb-6">
      <ol className="flex flex-wrap items-center gap-1 text-sm text-warm-500">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={item.href} className="flex items-center gap-1">
              {isLast ? (
                <span className="font-medium text-warm-700" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <>
                  <Link href={item.href} className="hover:text-primary-600">
                    {item.name}
                  </Link>
                  <ChevronRight className="h-4 w-4 text-warm-300" />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
