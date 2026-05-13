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
      <div className="page-wrap">
        <section className="prose-docs max-w-6xl">
          <div className="eyebrow">
            <Sparkles aria-hidden="true" className="nav-icon" />
            Data APIs for production teams
          </div>
          <h1>Happy Endpoint API Documentation</h1>
          <p className="hero-lede">
            Browse endpoint-level documentation for retail, real estate, travel, and marketplace data APIs sold on RapidAPI.
          </p>
        </section>

        <div className="stat-grid" style={{ marginTop: '2.5rem' }}>
          <Stat icon={<Database className="h-5 w-5" />} label="API references" value={String(apiReferences.length)} />
          <Stat icon={<ArrowRight className="h-5 w-5" />} label="Indexed endpoint pages" value={String(endpointCount)} />
          <Stat icon={<ShieldCheck className="h-5 w-5" />} label="Shared guides" value={String(guides.length)} />
        </div>

        <section style={{ marginTop: '3rem' }}>
          {Object.entries(groups).map(([group, apis]) => (
            <div key={group} style={{ marginTop: '2.2rem' }}>
              <h2 className="section-title">{group}</h2>
              <div className="api-grid">
                {apis.map((api) => (
                  <Link
                    className="focus-ring api-card"
                    href={`/${api.slug}/`}
                    key={api.slug}
                  >
                    <div className="api-card-top">
                      <h3>{api.title}</h3>
                      <span className="count-pill">
                        {getApiOperations(api.slug).length} endpoints
                      </span>
                    </div>
                    <p>{api.description}</p>
                    <span className="card-link-label">
                      View reference <ArrowRight aria-hidden="true" className="nav-icon" />
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
    <div className="fact-box">
      <div style={{ alignItems: 'center', color: 'var(--he-muted)', display: 'flex', gap: '0.65rem' }}>
        {icon}
        <span>{label}</span>
      </div>
      <div style={{ fontSize: '2rem', fontWeight: 700, marginTop: '0.65rem' }}>{value}</div>
    </div>
  );
}
