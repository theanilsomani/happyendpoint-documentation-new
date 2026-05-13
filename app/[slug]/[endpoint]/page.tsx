import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { DocsChrome } from '@/components/DocsChrome';
import { FumadocsApiPage } from '@/components/FumadocsApiPage';
import { endpointUrl, getAllOperations, getOperation } from '@/lib/openapi';

type Props = {
  params: Promise<{ slug: string; endpoint: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllOperations().map((operation) => ({
    slug: operation.apiSlug,
    endpoint: operation.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, endpoint } = await params;
  const operation = getOperation(slug, endpoint);
  if (!operation) return {};

  return {
    title: `${operation.method} ${operation.path} | ${operation.apiTitle} Reference`,
    description: operation.summary || operation.description,
    alternates: {
      canonical: `/${slug}/${endpoint}/`,
    },
    openGraph: {
      title: `${operation.method} ${operation.path}`,
      description: operation.summary || operation.description,
      url: endpointUrl(operation),
      type: 'article',
    },
  };
}

export default async function EndpointPage({ params }: Props) {
  const { slug, endpoint } = await params;
  console.log('EndpointPage params:', { slug, endpoint });
  const operation = getOperation(slug, endpoint);
  if (!operation) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: `${operation.method} ${operation.path}`,
    description: operation.summary || operation.description,
    url: endpointUrl(operation),
    about: operation.apiTitle,
  };

  return (
    <DocsChrome currentApi={slug}>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        type="application/ld+json"
      />
      <div className="mx-auto max-w-5xl px-6 py-14">
        <FumadocsApiPage operation={operation} />
      </div>
    </DocsChrome>
  );
}
