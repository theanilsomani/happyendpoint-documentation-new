import { BookOpen, Braces, ChevronRight, Gauge, Home, KeyRound, ShieldCheck } from 'lucide-react';
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

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[300px_minmax(0,1fr)]">
      <aside className="border-b border-[var(--he-line)] bg-[var(--he-panel)] lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto lg:border-b-0 lg:border-r">
        <div className="p-5">
          <Link className="flex items-center gap-3" href="/">
            <Image
              alt="Happy Endpoint"
              className="h-9 w-9 rounded-md object-contain"
              height={36}
              src="/happyendpoint-com-logo.png"
              width={36}
            />
            <div>
              <div className="font-semibold leading-tight">Happy Endpoint</div>
              <div className="text-xs text-[var(--he-muted)]">API documentation</div>
            </div>
          </Link>

          <div className="mt-5">
            <SearchBox currentApi={currentApi} records={records} />
          </div>
        </div>

        <nav className="px-3 pb-6 text-sm">
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
            <NavGroup title={activeApi.title}>
              <NavLink active={currentPath === `/${activeApi.slug}/`} href={`/${activeApi.slug}/`}>
                Overview
              </NavLink>
              {operations.map((operation) => (
                <NavLink
                  active={currentPath === `/${operation.apiSlug}/${operation.slug}/`}
                  href={`/${operation.apiSlug}/${operation.slug}/`}
                  key={`${operation.method}-${operation.path}`}
                >
                  <span className={`method method-${operation.method.toLowerCase()}`}>
                    {operation.method}
                  </span>
                  <span className="min-w-0 truncate">{operation.summary}</span>
                </NavLink>
              ))}
            </NavGroup>
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

      <main>{children}</main>
    </div>
  );
}

function NavGroup({ children, title }: { children: ReactNode; title: string }) {
  return (
    <div className="mt-6">
      <div className="px-3 pb-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--he-muted)]">
        {title}
      </div>
      <div className="space-y-1">{children}</div>
    </div>
  );
}

function NavLink({
  active,
  children,
  href,
  icon,
}: {
  active?: boolean;
  children: ReactNode;
  href: string;
  icon?: ReactNode;
}) {
  return (
    <Link
      className={[
        'focus-ring flex min-h-10 items-center gap-2 rounded-md px-3 py-2',
        active
          ? 'bg-[var(--he-text)] text-[var(--he-bg)]'
          : 'text-[var(--he-muted)] hover:bg-[var(--he-panel-strong)] hover:text-[var(--he-text)]',
      ].join(' ')}
      href={href}
    >
      {icon}
      {children}
    </Link>
  );
}
