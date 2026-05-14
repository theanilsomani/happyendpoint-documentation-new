'use client';

import { usePathname, useRouter } from 'next/navigation';
import { apiReferences } from '@/lib/site';
import { SidebarTabsDropdown } from 'fumadocs-ui/components/sidebar/tabs/dropdown';
import { Boxes } from 'lucide-react';

export function ApiDropdown({ currentApiSlug }: { currentApiSlug?: string }) {
  const router = useRouter();
  const pathname = usePathname();

  const options = [
    {
      url: '/',
      title: 'All APIs',
      icon: <Boxes className="size-4" />,
    },
    ...apiReferences.map((api) => ({
      url: `/${api.slug}/`,
      title: api.title,
      icon: <Boxes className="size-4" />,
    })),
  ];

  // Find the currently active option based on the URL
  const activeOption = options.find((opt) => opt.url !== '/' && pathname.startsWith(opt.url));

  return (
    <div className="mb-6 px-2">
      <div className="mb-2 px-1 text-[0.68rem] font-bold uppercase tracking-[0.12em] text-fd-muted-foreground">
        API Workspace
      </div>
      <SidebarTabsDropdown
        options={options}
        placeholder={
          <div className="flex items-center gap-2">
            <Boxes className="size-4 text-fd-primary" />
            <span className="text-sm font-semibold text-fd-foreground">
              {activeOption?.title ?? 'All APIs'}
            </span>
          </div>
        }
        className="h-auto w-full rounded-lg border border-fd-border bg-fd-card py-2.5 shadow-none hover:bg-fd-accent"
      />
    </div>
  );
}
