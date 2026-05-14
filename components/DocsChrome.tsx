import { X } from 'lucide-react';
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
          icon: <GitHubLogo />,
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

function GitHubLogo() {
  return (
    <svg
      aria-hidden="true"
      className="size-4"
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.92.58.1.79-.25.79-.56v-2.15c-3.2.7-3.87-1.36-3.87-1.36-.52-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.17 1.18A10.96 10.96 0 0 1 12 6.04c.98 0 1.96.13 2.88.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.23 2.75.11 3.04.74.81 1.19 1.83 1.19 3.09 0 4.42-2.69 5.39-5.25 5.68.42.36.78 1.07.78 2.16v3.14c0 .31.21.67.79.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}
