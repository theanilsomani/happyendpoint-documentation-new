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
    <DocsChrome>
      <div className="he-page">
        <section>
          <div className="he-eyebrow">
            <Sparkles aria-hidden="true" className="inline size-4" /> Data APIs for production teams
          </div>
          <h1 className="he-title">Happy Endpoint API Documentation</h1>
          <p className="he-lede">
            Browse endpoint-level documentation for retail, real estate, travel, and marketplace
            data APIs sold on RapidAPI.
          </p>
        </section>

        <div className="he-stats">
          <Stat icon={<Database className="size-5" />} label="API references" value={String(apiReferences.length)} />
          <Stat icon={<ArrowRight className="size-5" />} label="Indexed endpoint pages" value={String(endpointCount)} />
          <Stat icon={<ShieldCheck className="size-5" />} label="Shared guides" value={String(guides.length)} />
        </div>

        <section className="mt-12">
          {Object.entries(groups).map(([group, apis]) => (
            <div className="mt-9" key={group}>
              <h2 className="he-section-title">{group}</h2>
              <div className="he-card-grid">
                {apis.map((api) => (
                  <Link className="he-card" href={`/${api.slug}/`} key={api.slug}>
                    <div className="he-card-top">
                      <h3>{api.title}</h3>
                      <span className="he-count">{getApiOperations(api.slug).length} endpoints</span>
                    </div>
                    <p>{api.description}</p>
                    <span className="he-card-link">
                      View reference <ArrowRight aria-hidden="true" className="size-4" />
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
      <div className="flex items-center gap-2 text-fd-muted-foreground">
        {icon}
        <span>{label}</span>
      </div>
      <div className="mt-3 text-3xl font-semibold text-fd-foreground">{value}</div>
    </div>
  );
}
