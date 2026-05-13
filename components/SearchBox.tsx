'use client';

import { Search, X } from 'lucide-react';
import Link from 'next/link';
import { useMemo, useState } from 'react';

export type SearchRecord = {
  title: string;
  href: string;
  section: string;
  apiSlug?: string;
  description: string;
};

export function SearchBox({
  records,
  currentApi,
}: {
  records: SearchRecord[];
  currentApi?: string;
}) {
  const [query, setQuery] = useState('');
  const normalized = query.trim().toLowerCase();
  const scopedRecords = currentApi
    ? records.filter((record) => !record.apiSlug || record.apiSlug === currentApi)
    : records;

  const results = useMemo(() => {
    if (!normalized) return scopedRecords.slice(0, 6);

    return scopedRecords
      .filter((record) =>
        `${record.title} ${record.section} ${record.description}`
          .toLowerCase()
          .includes(normalized),
      )
      .slice(0, 8);
  }, [normalized, scopedRecords]);

  return (
    <div className="relative">
      <label className="sr-only" htmlFor="docs-search">
        Search documentation
      </label>
      <Search aria-hidden="true" className="absolute left-3 top-3 h-4 w-4 text-[var(--he-muted)]" />
      <input
        id="docs-search"
        className="focus-ring h-10 w-full rounded-md border border-[var(--he-line)] bg-[var(--he-bg)] pl-9 pr-9 text-sm"
        placeholder={currentApi ? `Search ${currentApi} docs` : 'Search docs'}
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      {query ? (
        <button
          aria-label="Clear search"
          className="absolute right-2 top-2 rounded-md p-1.5 text-[var(--he-muted)] hover:bg-[var(--he-panel-strong)]"
          onClick={() => setQuery('')}
          type="button"
        >
          <X aria-hidden="true" className="h-4 w-4" />
        </button>
      ) : null}
      {query ? (
        <div className="absolute z-30 mt-2 max-h-96 w-full overflow-auto rounded-md border border-[var(--he-line)] bg-[var(--he-bg)] p-2 shadow-xl">
          {results.length ? (
            results.map((record) => (
              <Link
                className="block rounded-md px-3 py-2 hover:bg-[var(--he-panel)]"
                href={record.href}
                key={record.href}
                onClick={() => setQuery('')}
              >
                <span className="block text-sm font-semibold">{record.title}</span>
                <span className="mt-0.5 block text-xs text-[var(--he-muted)]">{record.section}</span>
              </Link>
            ))
          ) : (
            <div className="px-3 py-6 text-center text-sm text-[var(--he-muted)]">No results found.</div>
          )}
        </div>
      ) : null}
    </div>
  );
}
