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
    <div className="px-2 mb-6">
      <SidebarTabsDropdown
        options={options}
        placeholder={
          <div className="flex items-center gap-2">
            <Boxes className="size-4 text-fd-muted-foreground" />
            <span className="text-sm font-medium text-fd-muted-foreground">Select API...</span>
          </div>
        }
        className="w-full h-auto py-2.5 bg-fd-secondary/30 hover:bg-fd-accent border-none shadow-none ring-1 ring-fd-border/50"
      />
    </div>
  );
}
