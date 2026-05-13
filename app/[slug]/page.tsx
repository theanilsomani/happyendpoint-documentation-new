import type { Metadata } from 'next';
import { ArrowRight, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { DocsChrome } from '@/components/DocsChrome';
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
      <div className="grid gap-10 px-5 py-10 sm:px-8 lg:grid-cols-[minmax(0,1fr)_240px] lg:px-12">
        <article className="prose-docs min-w-0">
          <h1>{guide.title}</h1>
          <p className="mt-5 text-xl">{guide.intro}</p>

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

        <aside className="hidden lg:block">
          <div className="sticky top-6 rounded-md border border-[var(--he-line)] bg-[var(--he-panel)] p-4">
            <div className="text-sm font-semibold">On this page</div>
            <div className="mt-3 space-y-2 text-sm text-[var(--he-muted)]">
              {guide.sections.map((section) => (
                <Link
                  className="block hover:text-[var(--he-text)]"
                  href={`#${section.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                  key={section.title}
                >
                  {section.title}
                </Link>
              ))}
            </div>
          </div>
        </aside>
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
      <div className="px-5 py-10 sm:px-8 lg:px-12">
        <section className="prose-docs">
          <div className="mb-5 text-sm font-semibold text-[var(--he-accent)]">{info.group}</div>
          <h1>{info.title}</h1>
          <p className="mt-5 text-xl">{info.description}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              className="focus-ring inline-flex items-center gap-2 rounded-md bg-[var(--he-text)] px-4 py-2 text-sm font-semibold text-[var(--he-bg)]"
              href={info.rapidApiUrl}
              rel="noreferrer"
              target="_blank"
            >
              Open on RapidAPI <ExternalLink aria-hidden="true" className="h-4 w-4" />
            </a>
            <a
              className="focus-ring inline-flex items-center gap-2 rounded-md border border-[var(--he-line)] px-4 py-2 text-sm font-semibold"
              href={`/openapi/${slug}.json`}
            >
              OpenAPI JSON
            </a>
          </div>
        </section>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <Fact label="Version" value={info.version} />
          <Fact label="Server" value={info.serverUrl} />
          <Fact label="Endpoints" value={String(operations.length)} />
        </div>

        {tags.length ? (
          <div className="mt-8 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span className="rounded-md border border-[var(--he-line)] px-3 py-1 text-sm text-[var(--he-muted)]" key={tag}>
                {tag}
              </span>
            ))}
          </div>
        ) : null}

        <section className="mt-12">
          <h2 className="text-xl font-semibold">Endpoints</h2>
          <div className="mt-4 divide-y divide-[var(--he-line)] rounded-md border border-[var(--he-line)] bg-[var(--he-panel)]">
            {operations.map((operation) => (
              <Link
                className="focus-ring flex items-center gap-4 p-4 hover:bg-[var(--he-panel-strong)]"
                href={`/${operation.apiSlug}/${operation.slug}/`}
                key={`${operation.method}-${operation.path}`}
              >
                <span className={`method method-${operation.method.toLowerCase()}`}>{operation.method}</span>
                <div className="min-w-0 flex-1">
                  <div className="truncate font-semibold">{operation.summary}</div>
                  <div className="truncate font-mono text-xs text-[var(--he-muted)]">{operation.path}</div>
                </div>
                <ArrowRight aria-hidden="true" className="h-4 w-4 text-[var(--he-muted)]" />
              </Link>
            ))}
          </div>
        </section>
      </div>
    </DocsChrome>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-[var(--he-line)] bg-[var(--he-panel)] p-4">
      <div className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--he-muted)]">{label}</div>
      <div className="mt-2 break-words font-mono text-sm">{value}</div>
    </div>
  );
}
