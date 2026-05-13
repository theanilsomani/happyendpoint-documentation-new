import { ArrowRight, Database, ShieldCheck, Sparkles } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { DocsChrome } from '@/components/DocsChrome';
import { getApiOperations } from '@/lib/openapi';
import { apiReferences, groupedApis, guides, site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Happy Endpoint API Documentation',
  description: site.description,
  alternates: {
    canonical: '/',
  },
};

export default function HomePage() {
  const groups = groupedApis();
  const endpointCount = apiReferences.reduce(
    (total, api) => total + getApiOperations(api.slug).length,
    0,
  );

  return (
    <DocsChrome currentPath="/">
      <div className="px-5 py-10 sm:px-8 lg:px-12">
        <section className="prose-docs max-w-6xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-md border border-[var(--he-line)] bg-[var(--he-panel)] px-3 py-1 text-sm text-[var(--he-muted)]">
            <Sparkles aria-hidden="true" className="h-4 w-4 text-[var(--he-accent)]" />
            Data APIs for production teams
          </div>
          <h1>Happy Endpoint API Documentation</h1>
          <p className="mt-5 text-xl">
            Browse endpoint-level documentation for retail, real estate, travel, and marketplace data APIs sold on RapidAPI.
          </p>
        </section>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <Stat icon={<Database className="h-5 w-5" />} label="API references" value={String(apiReferences.length)} />
          <Stat icon={<ArrowRight className="h-5 w-5" />} label="Indexed endpoint pages" value={String(endpointCount)} />
          <Stat icon={<ShieldCheck className="h-5 w-5" />} label="Shared guides" value={String(guides.length)} />
        </div>

        <section className="mt-12 space-y-10">
          {Object.entries(groups).map(([group, apis]) => (
            <div key={group}>
              <h2 className="text-xl font-semibold">{group}</h2>
              <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {apis.map((api) => (
                  <Link
                    className="focus-ring block rounded-md border border-[var(--he-line)] bg-[var(--he-panel)] p-5 transition hover:-translate-y-0.5 hover:border-[var(--he-accent)]"
                    href={`/${api.slug}/`}
                    key={api.slug}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="font-semibold">{api.title}</h3>
                      <span className="rounded-md bg-[var(--he-panel-strong)] px-2 py-1 text-xs text-[var(--he-muted)]">
                        {getApiOperations(api.slug).length} endpoints
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-[var(--he-muted)]">{api.description}</p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--he-accent)]">
                      View reference <ArrowRight aria-hidden="true" className="h-4 w-4" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </section>
      </div>
    </DocsChrome>
  );
}

function Stat({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-md border border-[var(--he-line)] bg-[var(--he-panel)] p-5">
      <div className="flex items-center gap-3 text-[var(--he-muted)]">
        {icon}
        <span className="text-sm">{label}</span>
      </div>
      <div className="mt-3 text-3xl font-semibold">{value}</div>
    </div>
  );
}
