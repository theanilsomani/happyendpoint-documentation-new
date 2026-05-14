import { ArrowRight, Boxes, Database, PlugZap, Search, ShieldCheck, Sparkles, Star, Users } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { DocsChrome } from '@/components/DocsChrome';
import { SearchBox } from '@/components/SearchBox';
import { getApiOperations, getSearchRecords } from '@/lib/openapi';
import { apiReferences, groupedApis, guides, site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Happy Endpoint API Documentation',
  description: site.description,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    images: [{ url: '/og/image.png', width: 1200, height: 630 }],
  },
};

export default function HomePage() {
  const groups = groupedApis();
  const endpointCount = apiReferences.reduce(
    (total, api) => total + getApiOperations(api.slug).length,
    0,
  );
  const searchRecords = getSearchRecords();

  return (
    <DocsChrome>
      <div className="mx-auto max-w-7xl px-5 py-10 sm:py-14 lg:px-10">
        <section className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-end">
          <div>
            <div className="mb-5 flex flex-wrap gap-2">
              <span className="he-chip">
                <Star aria-hidden="true" className="size-4 text-amber-400" />
                5.0 rating
              </span>
              <span className="he-chip">
                <Users aria-hidden="true" className="size-4 text-fd-primary" />
                1k+ API community
              </span>
            </div>
            <div className="he-kicker mb-4">
              <Sparkles aria-hidden="true" className="size-4" /> Production data APIs
            </div>
            <h1 className="he-title">
              Happy Endpoint API Documentation
            </h1>
            <p className="he-lede mt-5">
              HTTP endpoints for clean, structured web data. Browse API references, check
              parameters, and test live data through RapidAPI.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="https://rapidapi.com/user/happyendpoint"
                rel="noreferrer"
                target="_blank"
                className="he-button-primary"
              >
                Get started for free <ArrowRight className="size-4" />
              </a>
              <Link href="#apis" className="he-button-secondary">
                <Boxes className="size-4" />
                Browse API library
              </Link>
            </div>
          </div>

          <div className="he-card">
            <div className="he-kicker mb-4">
              <Search aria-hidden="true" className="size-4" /> Find an endpoint
            </div>
            <SearchBox records={searchRecords} />
            <div className="mt-5 grid gap-3 text-sm text-fd-muted-foreground">
              <div className="flex items-center justify-between gap-4 border-t border-fd-border pt-4">
                <span>API references</span>
                <span className="font-mono text-fd-foreground">{apiReferences.length}</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span>Documented endpoints</span>
                <span className="font-mono text-fd-foreground">{endpointCount}</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span>Integration guides</span>
                <span className="font-mono text-fd-foreground">{guides.length}</span>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <Stat icon={<Database className="size-5" />} label="Total APIs" value="11+" />
          <Stat icon={<PlugZap className="size-5" />} label="Endpoints" value={String(endpointCount)} />
          <Stat icon={<ShieldCheck className="size-5" />} label="Service Score" value="9.9/10" />
        </div>

        <section className="mt-14" id="apis">
          <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="he-kicker mb-2">API Library</div>
              <h2 className="text-2xl font-bold tracking-normal text-fd-foreground">
                Choose the data source you need
              </h2>
            </div>
            <a
              className="text-sm font-semibold text-fd-primary hover:text-fd-foreground"
              href={site.rapidApi}
              rel="noreferrer"
              target="_blank"
            >
              View all on RapidAPI
            </a>
          </div>

          {Object.entries(groups).map(([group, apis]) => (
            <div className="mt-10" key={group}>
              <div className="mb-4 flex items-center justify-between gap-4">
                <h3 className="text-lg font-bold text-fd-foreground">{group}</h3>
                <span className="text-sm text-fd-muted-foreground">{apis.length} APIs</span>
              </div>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {apis.map((api) => (
                  <Link
                    className="he-api-card"
                    href={`/${api.slug}/`}
                    key={api.slug}
                  >
                    <span>
                      <span className="he-api-icon">
                        <PlugZap aria-hidden="true" className="size-5" />
                      </span>
                      <span className="mt-4 block he-api-title">{api.title}</span>
                      <span className="he-api-desc block">{api.description}</span>
                    </span>
                    <span className="he-api-meta">
                      <span>
                        <Boxes aria-hidden="true" className="size-4 text-fd-primary" />
                        {getApiOperations(api.slug).length} endpoints
                      </span>
                      <span>
                        <ArrowRight aria-hidden="true" className="size-4 text-fd-primary" />
                        Reference
                      </span>
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
    <div className="he-stat">
      <div className="he-stat-label">
        {icon}
        <span>{label}</span>
      </div>
      <div className="he-stat-value">{value}</div>
    </div>
  );
}
