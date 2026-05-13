import type { Metadata } from 'next';
import { ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { DocsChrome } from '@/components/DocsChrome';
import { MarkdownBlock } from '@/components/MarkdownBlock';
import { apiReferences, guides } from '@/lib/site';
import { getApiInfo, getApiOperations } from '@/lib/openapi';

type Props = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return [...guides.map((guide) => ({ slug: guide.slug })), ...apiReferences.map((api) => ({ slug: api.slug }))];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = guides.find((item) => item.slug === slug);
  const api = getApiInfo(slug);

  if (api) {
    return {
      title: `${api.title} Reference`,
      description: api.description,
      alternates: {
        canonical: `/${slug}/`,
      },
    };
  }

  if (!guide) return {};

  return {
    title: guide.title,
    description: guide.description,
    alternates: {
      canonical: `/${guide.slug}/`,
    },
  };
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const api = getApiInfo(slug);
  if (api) return <ApiOverview slug={slug} />;

  const guide = guides.find((item) => item.slug === slug);
  if (!guide) notFound();

  return (
    <DocsChrome currentPath={`/${guide.slug}/`}>
      <div className="page-wrap page-wrap-narrow">
        <article className="prose-docs min-w-0">
          <h1>{guide.title}</h1>
          <p className="hero-lede">{guide.intro}</p>

          {guide.sections.map((section) => (
            <section id={section.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')} key={section.title}>
              <h2>{section.title}</h2>
              <div className="space-y-5">
                {section.items.map((item) => (
                  <div key={item.heading}>
                    <h3>{item.heading}</h3>
                    <p>{item.body}</p>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </article>
      </div>
    </DocsChrome>
  );
}

function ApiOverview({ slug }: { slug: string }) {
  const info = getApiInfo(slug);
  if (!info) notFound();

  const operations = getApiOperations(slug);
  const tags = Array.from(new Set(operations.flatMap((operation) => operation.tags))).filter(Boolean);

  return (
    <DocsChrome currentApi={slug} currentPath={`/${slug}/`}>
      <div className="page-wrap">
        <section className="prose-docs">
          <div className="eyebrow">{info.group}</div>
          <h1>{info.title}</h1>
          <p className="hero-lede">{info.description}</p>
          <div className="hero-actions">
            <a
              className="focus-ring button-primary"
              href={info.rapidApiUrl}
              rel="noreferrer"
              target="_blank"
            >
              Open on RapidAPI <ExternalLink aria-hidden="true" className="nav-icon" />
            </a>
            <a
              className="focus-ring button-secondary"
              href={`/openapi/${slug}.json`}
            >
              OpenAPI JSON
            </a>
          </div>
        </section>

        <div className="fact-grid">
          <Fact label="Version" value={info.version} />
          <Fact label="Server" value={info.serverUrl} />
          <Fact label="Endpoints" value={String(operations.length)} />
        </div>

        {tags.length ? (
          <div className="tag-row">
            {tags.map((tag) => (
              <span className="tag-pill" key={tag}>
                {tag}
              </span>
            ))}
          </div>
        ) : null}

        <section>
          <h2 className="section-title">Endpoints</h2>
          <div className="endpoint-grid">
            {operations.map((operation) => (
              <Link
                className="focus-ring endpoint-card"
                href={`/${operation.apiSlug}/${operation.slug}/`}
                key={`${operation.method}-${operation.path}`}
              >
                <div className="endpoint-card-title">
                  {operation.summary}
                  <span className={`method method-${operation.method.toLowerCase()}`}>{operation.method}</span>
                </div>
                <p className="endpoint-card-description">{operation.description}</p>
              </Link>
            ))}
          </div>
        </section>

        {info.markdownDescription ? (
          <section className="markdown-panel">
            <h2 className="section-title">About this API</h2>
            <MarkdownBlock markdown={info.markdownDescription} />
          </section>
        ) : null}
      </div>
    </DocsChrome>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="fact-box">
      <div className="fact-label">{label}</div>
      <div className="fact-value">{value}</div>
    </div>
  );
}
