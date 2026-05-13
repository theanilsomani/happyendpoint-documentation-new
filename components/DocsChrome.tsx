import { GitFork } from 'lucide-react';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { ReactNode } from 'react';
import { docsTree } from '@/lib/page-tree';

export function DocsChrome({
  children,
}: {
  children: ReactNode;
  currentApi?: string;
  currentPath?: string;
}) {
  return (
    <DocsLayout
      tree={docsTree}
      tabMode="top"
      nav={{
        title: (
          <span className="font-semibold flex items-center gap-2">
            Happy Endpoint
          </span>
        ),
        url: '/',
      }}
      links={[
        {
          type: 'icon',
          label: 'GitHub',
          text: 'GitHub',
          url: 'https://github.com/',
          icon: <GitFork />,
          external: true,
        },
      ]}
      sidebar={{
        defaultOpenLevel: 1,
        prefetch: false,
      }}
    >
      {children}
    </DocsLayout>
  );
}
