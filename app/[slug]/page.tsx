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
  return [
    ...guides.map((guide) => ({ slug: guide.slug })),
    ...apiReferences.map((api) => ({ slug: api.slug })),
  ];
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

export default async function GuideOrApiPage({ params }: Props) {
  const { slug } = await params;
  const api = getApiInfo(slug);
  if (api) return <ApiOverview slug={slug} />;

  const guide = guides.find((item) => item.slug === slug);
  if (!guide) notFound();

  return (
    <DocsChrome>
      <div className="he-page he-page-narrow">
        <article>
          <h1 className="he-title">{guide.title}</h1>
          <p className="he-lede">{guide.intro}</p>

          {guide.sections.map((section) => (
            <section id={section.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')} key={section.title}>
              <h2 className="he-section-title">{section.title}</h2>
              <div className="grid gap-3">
                {section.items.map((item) => (
                  <div className="he-card" key={item.heading}>
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
    <DocsChrome>
      <div className="he-page">
        <section>
          <div className="he-eyebrow">{info.group}</div>
          <h1 className="he-title">{info.title}</h1>
          <p className="he-lede">{info.description}</p>
          <div className="he-actions">
            <a className="he-button-primary" href={info.rapidApiUrl} rel="noreferrer" target="_blank">
              Open on RapidAPI <ExternalLink aria-hidden="true" className="size-4" />
            </a>
            <a className="he-button-secondary" href={`/openapi/${slug}.json`}>
              OpenAPI JSON
            </a>
          </div>
        </section>

        <div className="he-stats">
          <Fact label="Version" value={info.version} />
          <Fact label="Server" value={info.serverUrl} />
          <Fact label="Endpoints" value={String(operations.length)} />
        </div>

        {tags.length ? (
          <div className="he-tags">
            {tags.map((tag) => (
              <span className="he-tag" key={tag}>
                {tag}
              </span>
            ))}
          </div>
        ) : null}

        <section>
          <h2 className="he-section-title">Endpoints</h2>
          <div className="he-endpoint-grid">
            {operations.map((operation) => (
              <Link className="he-card" href={`/${operation.apiSlug}/${operation.slug}/`} key={`${operation.method}-${operation.path}`}>
                <div className="he-card-top">
                  <h3>{operation.summary}</h3>
                  <span className={`method method-${operation.method.toLowerCase()}`}>{operation.method}</span>
                </div>
                <p>{operation.description}</p>
              </Link>
            ))}
          </div>
        </section>

        {info.markdownDescription ? (
          <section className="markdown-panel">
            <h2 className="he-section-title">About this API</h2>
            <MarkdownBlock markdown={info.markdownDescription} />
          </section>
        ) : null}
      </div>
    </DocsChrome>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="he-stat">
      <div className="he-stat-label">{label}</div>
      <div className="he-stat-value">{value}</div>
    </div>
  );
}
