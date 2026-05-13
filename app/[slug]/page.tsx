import type { Metadata } from 'next';
import { ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { DocsChrome } from '@/components/DocsChrome';
import { MarkdownBlock } from '@/components/MarkdownBlock';
import { apiReferences, guides } from '@/lib/site';
import { getApiInfo, getApiOperations } from '@/lib/openapi';
import { Card, Cards } from 'fumadocs-ui/components/card';
import { buttonVariants } from 'fumadocs-ui/components/ui/button';

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
            <h1 className="text-4xl font-bold tracking-tight">{guide.title}</h1>
            <p className="text-fd-muted-foreground mt-4 text-xl leading-relaxed">{guide.intro}</p>

            <div className="mt-12 space-y-12">
              {guide.sections.map((section) => (
                <section id={section.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')} key={section.title}>
                  <h2 className="text-2xl font-bold">{section.title}</h2>
                  <div className="mt-6">
                    <Cards>
                      {section.items.map((item) => (
                        <Card key={item.heading} title={item.heading} description={item.body} />
                      ))}
                    </Cards>
                  </div>
                </section>
              ))}
            </div>
          </article>
        </DocsBody>
      </DocsPage>
    </DocsChrome>
  );
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
            <div className="text-fd-primary mb-4 font-semibold">{info.group}</div>
            <h1 className="text-4xl font-bold tracking-tight">{info.title}</h1>
            <p className="text-fd-muted-foreground mt-4 text-xl leading-relaxed">{info.description}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a className={buttonVariants({ variant: 'default' })} href={info.rapidApiUrl} rel="noreferrer" target="_blank">
                Open on RapidAPI <ExternalLink aria-hidden="true" className="ml-2 size-4" />
              </a>
              <a className={buttonVariants({ variant: 'outline' })} href={`/openapi/${slug}.json`}>
                OpenAPI JSON
              </a>
            </div>
          </section>

          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            <Fact label="Version" value={info.version} />
            <Fact label="Server" value={info.serverUrl} />
            <Fact label="Endpoints" value={String(operations.length)} />
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
            <Cards>
              {operations.map((operation) => (
                <Card
                  key={`${operation.method}-${operation.path}`}
                  href={`/${operation.apiSlug}/${operation.slug}/`}
                  title={
                    <div className="flex items-center justify-between gap-4">
                      <span className="font-semibold">{operation.summary}</span>
                      <span className={`method method-${operation.method.toLowerCase()}`}>{operation.method}</span>
                    </div>
                  }
                  description={operation.description}
                />
              ))}
            </Cards>
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

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-fd-card border-fd-border rounded-xl border p-5">
      <div className="text-fd-muted-foreground text-xs font-bold uppercase tracking-wider">{label}</div>
      <div className="text-fd-foreground mt-2 font-mono">{value}</div>
    </div>
  );
}
