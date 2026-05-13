import { ArrowRight, Database, ShieldCheck, Sparkles } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { DocsChrome } from '@/components/DocsChrome';
import { getApiOperations } from '@/lib/openapi';
import { apiReferences, groupedApis, guides, site } from '@/lib/site';
import { Card, Cards } from 'fumadocs-ui/components/card';

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
    <DocsChrome>
      <div className="mx-auto max-w-7xl px-6 py-14 sm:py-20 lg:px-12">
        <section>
          <div className="text-fd-primary mb-5 text-sm font-semibold flex items-center gap-2">
            <Sparkles aria-hidden="true" className="size-4" /> Data APIs for production teams
          </div>
          <h1 className="text-fd-foreground text-4xl sm:text-5xl font-bold tracking-tight">
            Happy Endpoint API Documentation
          </h1>
          <p className="text-fd-muted-foreground mt-5 max-w-2xl text-lg leading-relaxed">
            Browse endpoint-level documentation for retail, real estate, travel, and marketplace
            data APIs sold on RapidAPI.
          </p>
        </section>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <Stat icon={<Database className="size-5" />} label="API references" value={String(apiReferences.length)} />
          <Stat icon={<ArrowRight className="size-5" />} label="Indexed endpoint pages" value={String(endpointCount)} />
          <Stat icon={<ShieldCheck className="size-5" />} label="Shared guides" value={String(guides.length)} />
        </div>

        <section className="mt-16">
          {Object.entries(groups).map(([group, apis]) => (
            <div className="mt-12" key={group}>
              <h2 className="text-fd-foreground mb-4 text-xl font-semibold">{group}</h2>
              <Cards>
                {apis.map((api) => (
                  <Card
                    key={api.slug}
                    href={`/${api.slug}/`}
                    title={
                      <div className="flex items-center justify-between gap-4">
                        <span>{api.title}</span>
                        <span className="bg-fd-secondary text-fd-muted-foreground rounded-md px-2 py-1 text-xs font-normal">
                          {getApiOperations(api.slug).length} endpoints
                        </span>
                      </div>
                    }
                    description={api.description}
                  />
                ))}
              </Cards>
            </div>
          ))}
        </section>
      </div>
    </DocsChrome>
  );
}

function Stat({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="bg-fd-card border-fd-border rounded-xl border p-5">
      <div className="text-fd-muted-foreground flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
        {icon}
        <span>{label}</span>
      </div>
      <div className="text-fd-foreground mt-3 text-3xl font-semibold font-mono">{value}</div>
    </div>
  );
}
