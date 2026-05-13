import { GitFork } from 'lucide-react';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { ReactNode } from 'react';
import { getDocsTree } from '@/lib/page-tree';
import { ApiDropdown } from '@/components/ApiDropdown';

export function DocsChrome({
  children,
  currentApi,
}: {
  children: ReactNode;
  currentApi?: string;
  currentPath?: string;
}) {
  return (
    <DocsLayout
      tree={getDocsTree(currentApi)}
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
        defaultOpenLevel: 0,
        prefetch: false,
        banner: <ApiDropdown key="api-dropdown" currentApiSlug={currentApi} />,
      }}
    >
      {children}
    </DocsLayout>
  );
}
