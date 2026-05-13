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
      nav={{
        title: (
          <span className="he-brand-title">
            <span className="he-brand-orb" />
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
      themeSwitch={{
        mode: 'light-dark-system',
      }}
    >
      {children}
    </DocsLayout>
  );
}
