import { GitFork, X } from 'lucide-react';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import Image from 'next/image';
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
          <span className="he-brand">
            <Image
              alt="Happy Endpoint"
              className="he-brand-logo"
              height={58}
              priority
              src="/happyendpoint-com-logo.png"
              width={220}
            />
          </span>
        ),
        url: '/',
      }}
      links={[
        {
          type: 'icon',
          label: 'GitHub',
          text: 'GitHub',
          url: 'https://github.com/happyendpointhq/',
          icon: <GitFork />,
          external: true,
        },
        {
          type: 'icon',
          label: 'Twitter',
          text: 'Twitter',
          url: 'https://x.com/happyendpointhq',
          icon: <X />,
          external: true,
        },
      ]}
      sidebar={{
        defaultOpenLevel: 0,
        prefetch: false,
        banner: <ApiDropdown key="api-dropdown" currentApiSlug={currentApi} />,
      }}
      searchToggle={{
        enabled: false,
      }}
    >
      <div className="he-shell-bg">{children}</div>
    </DocsLayout>
  );
}
