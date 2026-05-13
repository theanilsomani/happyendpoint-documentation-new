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
    <div className="search-wrap">
      <label className="sr-only" htmlFor="docs-search">
        Search documentation
      </label>
      <Search aria-hidden="true" className="search-icon" />
      <input
        id="docs-search"
        className="focus-ring search-input"
        placeholder={currentApi ? `Search ${currentApi} docs` : 'Search docs'}
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      {query ? (
        <button
          aria-label="Clear search"
          className="search-clear"
          onClick={() => setQuery('')}
          type="button"
        >
          <X aria-hidden="true" className="h-4 w-4" />
        </button>
      ) : null}
      {query ? (
        <div className="search-results">
          {results.length ? (
            results.map((record) => (
              <Link
                className="search-result"
                href={record.href}
                key={record.href}
                onClick={() => setQuery('')}
              >
                <span className="search-result-title">{record.title}</span>
                <span className="search-result-section">{record.section}</span>
              </Link>
            ))
          ) : (
            <div className="search-empty">No results found.</div>
          )}
        </div>
      ) : null}
    </div>
  );
}
