'use client';

import { ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { apiReferences } from '@/lib/site';

export function ApiDropdown({ currentApiSlug }: { currentApiSlug?: string }) {
  const router = useRouter();

  return (
    <div className="relative w-full mb-4 px-2">
      <select
        value={currentApiSlug || ''}
        onChange={(e) => {
          if (e.target.value) {
            router.push(`/${e.target.value}/`);
          } else {
            router.push('/');
          }
        }}
        className="w-full appearance-none rounded-lg border border-fd-border bg-fd-card px-3 py-2 pr-8 text-sm font-medium text-fd-foreground hover:bg-fd-accent focus:outline-none"
      >
        <option value="">Select an API...</option>
        {apiReferences.map((api) => (
          <option key={api.slug} value={api.slug}>
            {api.title}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-5 top-1/2 size-4 -translate-y-1/2 text-fd-muted-foreground" />
    </div>
  );
}
