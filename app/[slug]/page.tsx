import type { Metadata } from 'next';
import { ArrowRight, Boxes, ExternalLink, FileJson, PlugZap, Server, Tags } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';
import { DocsChrome } from '@/components/DocsChrome';
import { MarkdownBlock } from '@/components/MarkdownBlock';
import { apiReferences, guides, site, type Guide } from '@/lib/site';
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
      openGraph: {
        images: [{ url: `/og/${slug}/image.png`, width: 1200, height: 630 }],
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
    openGraph: {
      images: [{ url: `/og/${guide.slug}/image.png`, width: 1200, height: 630 }],
    },
  };
}

import { DocsPage, DocsBody } from 'fumadocs-ui/page';

export default async function GuideOrApiPage({ params }: Props) {
  const { slug } = await params;
  const api = getApiInfo(slug);
  if (api) return <ApiOverview slug={slug} />;

  const guide = guides.find((item) => item.slug === slug);
  if (!guide) notFound();

  return (
    <DocsChrome>
      <DocsPage>
        <DocsBody>
          <article className="prose prose-fd dark:prose-invert max-w-none">
            <div className="he-kicker mb-4">Guide</div>
            <h1 className="he-title">{guide.title}</h1>
            <p className="he-lede mt-4">{guide.intro}</p>

            <GuideContent guide={guide} />
          </article>
        </DocsBody>
      </DocsPage>
    </DocsChrome>
  );
}

function GuideContent({ guide }: { guide: Guide }) {
  if (guide.slug === 'status-codes') return <StatusCodesGuide guide={guide} />;
  if (guide.slug === 'glossary') return <GlossaryGuide guide={guide} />;

  return (
    <div className="mt-10 space-y-10">
      {guide.sections.map((section) => (
        <section className="he-doc-section" id={slugify(section.title)} key={section.title}>
          <h2 className="text-xl font-bold text-fd-foreground">{section.title}</h2>
          <div className="he-doc-list">
            {section.items.map((item) => (
              <div className="he-doc-item" key={item.heading}>
                <h3>{item.heading}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function StatusCodesGuide({ guide }: { guide: Guide }) {
  const rows = guide.sections.flatMap((section) =>
    section.items.map((item) => {
      const [code, ...statusParts] = item.heading.split(' ');
      return {
        code,
        status: statusParts.join(' ') || item.heading,
        description: item.body,
      };
    }),
  );

  return (
    <section className="he-doc-section mt-10" id="response-reference">
      <h2 className="text-xl font-bold text-fd-foreground">Response Reference</h2>
      <div className="mt-5 overflow-x-auto">
        <table className="he-doc-table">
          <thead>
            <tr>
              <th>Code</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={`${row.code}-${row.status}`}>
                <td>
                  <span className="he-code-pill">{row.code}</span>
                </td>
                <td className="font-semibold text-fd-foreground">{row.status}</td>
                <td>{row.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function GlossaryGuide({ guide }: { guide: Guide }) {
  return (
    <div className="mt-10 space-y-10">
      {guide.sections.map((section) => (
        <section className="he-doc-section" id={slugify(section.title)} key={section.title}>
          <h2 className="text-xl font-bold text-fd-foreground">{section.title}</h2>
          <dl className="he-doc-list">
            {section.items.map((item) => (
              <div className="he-doc-item" key={item.heading}>
                <dt>
                  <h3>{item.heading}</h3>
                </dt>
                <dd className="m-0">
                  <p>{item.body}</p>
                </dd>
              </div>
            ))}
          </dl>
        </section>
      ))}
    </div>
  );
}

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-');
}

function ApiOverview({ slug }: { slug: string }) {
  const info = getApiInfo(slug);
  if (!info) notFound();

  const operations = getApiOperations(slug);
  const tags = Array.from(new Set(operations.flatMap((operation) => operation.tags))).filter(Boolean);

  return (
    <DocsChrome currentApi={slug}>
      <DocsPage>
        <DocsBody>
          <section>
            <div className="he-kicker mb-4">
              <PlugZap aria-hidden="true" className="size-4" />
              {info.group}
            </div>
            <h1 className="he-title">{info.title}</h1>
            <p className="he-lede mt-4">{info.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a className="he-button-primary" href={info.rapidApiUrl} rel="noreferrer" target="_blank">
                Open on RapidAPI <ExternalLink aria-hidden="true" className="ml-2 size-4" />
              </a>
              <a className="he-button-secondary" href={`/openapi/${slug}.json`}>
                <FileJson aria-hidden="true" className="size-4" />
                OpenAPI JSON
              </a>
            </div>
          </section>

          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            <Fact icon={<Tags className="size-5" />} label="Version" value={info.version} />
            <Fact icon={<Server className="size-5" />} label="Server" value={info.serverUrl} />
            <Fact icon={<Boxes className="size-5" />} label="Endpoints" value={String(operations.length)} />
          </div>

          {tags.length ? (
            <div className="mt-8 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span className="border-fd-border text-fd-muted-foreground rounded-md border px-3 py-1 text-sm" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
          ) : null}

          <section className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Endpoints</h2>
            <div className="grid gap-4 lg:grid-cols-2">
              {operations.map((operation) => (
                <Link
                  className="he-api-card min-h-[170px]"
                  href={`/${operation.apiSlug}/${operation.slug}/`}
                  key={`${operation.method}-${operation.path}`}
                >
                  <span>
                    <span className="flex items-start justify-between gap-4">
                      <span className="he-api-title">{operation.summary}</span>
                      <span className={`method method-${operation.method.toLowerCase()}`}>{operation.method}</span>
                    </span>
                    <span className="he-api-desc block">{operation.description}</span>
                  </span>
                  <span className="he-api-meta">
                    <span className="font-mono">{operation.path}</span>
                    <span>
                      <ArrowRight aria-hidden="true" className="size-4 text-fd-primary" />
                      Details
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </section>

          {info.markdownDescription ? (
            <section className="markdown-panel mt-16">
              <h2 className="text-2xl font-bold mb-6">About this API</h2>
              <MarkdownBlock markdown={info.markdownDescription} />
            </section>
          ) : null}
        </DocsBody>
      </DocsPage>
    </DocsChrome>
  );
}

function Fact({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="he-stat">
      <div className="he-stat-label">
        {icon}
        <span>{label}</span>
      </div>
      <div className={`he-stat-value ${value.length > 18 ? 'he-stat-value-long' : ''}`}>
        {value}
      </div>
    </div>
  );
}
