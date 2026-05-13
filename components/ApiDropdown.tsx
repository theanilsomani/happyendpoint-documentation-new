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
      description: 'Back to API Catalogue',
      icon: (
        <div className="flex size-7 items-center justify-center rounded-md border bg-fd-secondary text-fd-secondary-foreground md:size-6">
          <Boxes className="size-4" />
        </div>
      ),
    },
    ...apiReferences.map((api) => ({
      url: `/${api.slug}/`,
      title: api.title,
      description: api.description,
      icon: (
        <div className="flex size-7 items-center justify-center rounded-md border bg-fd-primary/10 text-fd-primary md:size-6">
          <Boxes className="size-4" />
        </div>
      ),
    })),
  ];

  // Find the currently active option based on the URL
  const activeOption = options.find((opt) => opt.url !== '/' && pathname.startsWith(opt.url));

  return (
    <div className="px-2 mb-6">
      <SidebarTabsDropdown
        options={options}
        placeholder={
          <div className="flex items-center gap-2">
            <div className="flex size-6 items-center justify-center rounded-md border bg-fd-secondary text-fd-muted-foreground">
              <Boxes className="size-3.5" />
            </div>
            <span className="text-sm font-medium text-fd-muted-foreground">Select API...</span>
          </div>
        }
        className="w-full h-auto py-2.5 bg-fd-secondary/30 hover:bg-fd-accent border-none shadow-none ring-1 ring-fd-border/50"
      />
    </div>
  );
}
