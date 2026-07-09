// src/app/blog/components/ComparisonTable.tsx
import type { ReactNode } from 'react';

export interface ComparisonTableProps {
  caption?: string;
  columns: string[];
  rows: ReactNode[][];
}

export default function ComparisonTable({ caption, columns, rows }: ComparisonTableProps) {
  return (
    // not-prose: opt out of the .article typographic rules so the table keeps its
    // own editorial design (ruled rows, no card/shadow).
    <div className="not-prose my-10 overflow-x-auto">
      {caption ? (
        <p className="font-display mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-primary-600 before:h-[3px] before:w-5 before:bg-primary-500 before:content-['']">
          {caption}
        </p>
      ) : null}
      <table className="w-full border-collapse text-left text-[0.95rem]">
        <thead>
          <tr className="border-b-2 border-warm-900">
            {columns.map((col) => (
              <th
                key={col}
                scope="col"
                className="font-display whitespace-nowrap py-2.5 pr-6 text-xs font-semibold uppercase tracking-[0.08em] text-warm-900 last:pr-0"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-warm-200">
              {row.map((cell, j) => (
                <td
                  key={j}
                  className={`py-3 pr-6 align-top text-warm-700 last:pr-0 ${
                    j === 0 ? 'font-semibold text-warm-900' : ''
                  }`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
