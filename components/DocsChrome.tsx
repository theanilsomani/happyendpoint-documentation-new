import { BookOpen, Braces, ChevronRight, Gauge, Home, KeyRound, PanelLeft, ShieldCheck } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { apiReferences, guides } from '@/lib/site';
import { getApiOperations, getSearchRecords } from '@/lib/openapi';
import { SearchBox } from './SearchBox';

const guideIcons = {
  credits: Gauge,
  'status-codes': Braces,
  usage: BookOpen,
  'global-parameters': KeyRound,
  'best-practices': ShieldCheck,
  'error-handling': Braces,
  timeouts: Gauge,
  'api-keys': KeyRound,
  glossary: BookOpen,
};

export function DocsChrome({
  children,
  currentApi,
  currentPath,
}: {
  children: ReactNode;
  currentApi?: string;
  currentPath?: string;
}) {
  const records = getSearchRecords();
  const operations = currentApi ? getApiOperations(currentApi) : [];
  const activeApi = apiReferences.find((api) => api.slug === currentApi);
  const groupedOperations = operations.reduce<Record<string, typeof operations>>((groups, operation) => {
    const tag = operation.tags[0] || 'Endpoints';
    groups[tag] ??= [];
    groups[tag].push(operation);
    return groups;
  }, {});

  return (
    <div className="docs-shell">
      <aside className="docs-sidebar">
        <div className="brand-row">
          <Link className="brand-mark" href="/">
            <Image alt="Happy Endpoint" className="brand-logo" height={28} src="/happyendpoint-com-logo.png" width={28} />
          </Link>
          <Link href="/">
            <div>
              <div className="brand-title">Happy Endpoint</div>
              <div className="brand-subtitle">API documentation</div>
            </div>
          </Link>
          <PanelLeft aria-hidden="true" className="nav-icon" style={{ marginLeft: 'auto', color: 'var(--he-muted)' }} />
        </div>

        <div className="sidebar-search">
          <SearchBox currentApi={currentApi} records={records} />
        </div>

        <nav className="docs-nav">
          <NavLink active={currentPath === '/'} href="/" icon={<Home className="h-4 w-4" />}>
            API Catalogue
          </NavLink>

          <NavGroup title="Guides">
            {guides.map((guide) => {
              const Icon = guideIcons[guide.slug as keyof typeof guideIcons] ?? BookOpen;
              return (
                <NavLink
                  active={currentPath === `/${guide.slug}/`}
                  href={`/${guide.slug}/`}
                  icon={<Icon className="h-4 w-4" />}
                  key={guide.slug}
                >
                  {guide.title}
                </NavLink>
              );
            })}
          </NavGroup>

          {activeApi ? (
            <>
            <NavGroup title={activeApi.title}>
              <NavLink active={currentPath === `/${activeApi.slug}/`} href={`/${activeApi.slug}/`}>
                Overview
              </NavLink>
            </NavGroup>
            {Object.entries(groupedOperations).map(([tag, tagOperations]) => (
              <NavGroup key={tag} title={tag}>
                {tagOperations.map((operation) => (
                  <NavLink
                    active={currentPath === `/${operation.apiSlug}/${operation.slug}/`}
                    href={`/${operation.apiSlug}/${operation.slug}/`}
                    key={`${operation.method}-${operation.path}`}
                    method={operation.method}
                  >
                    {operation.summary}
                  </NavLink>
                ))}
              </NavGroup>
            ))}
            </>
          ) : (
            <NavGroup title="APIs">
              {apiReferences.map((api) => (
                <NavLink active={currentPath === `/${api.slug}/`} href={`/${api.slug}/`} key={api.slug}>
                  <span>{api.title.replace(' API', '')}</span>
                  <ChevronRight aria-hidden="true" className="ml-auto h-4 w-4 opacity-45" />
                </NavLink>
              ))}
            </NavGroup>
          )}
        </nav>
      </aside>

      <main className="docs-main">{children}</main>
    </div>
  );
}

function NavGroup({ children, title }: { children: ReactNode; title: string }) {
  return (
    <div className="nav-group">
      <div className="nav-group-title">{title}</div>
      <div className="nav-group-items">{children}</div>
    </div>
  );
}

function NavLink({
  active,
  children,
  href,
  icon,
  method,
}: {
  active?: boolean;
  children: ReactNode;
  href: string;
  icon?: ReactNode;
  method?: string;
}) {
  return (
    <Link
      className={['focus-ring nav-link', active ? 'nav-link-active' : ''].join(' ')}
      href={href}
    >
      {icon ? <span className="nav-icon">{icon}</span> : null}
      <span className="nav-label">{children}</span>
      {method ? (
        <span className={`method method-${method.toLowerCase()} nav-method`}>{method}</span>
      ) : null}
    </Link>
  );
}
