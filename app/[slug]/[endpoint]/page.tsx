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
    title: `${operation.summary} — ${operation.apiTitle} Reference`,
    description: operation.summary || operation.description,
    alternates: {
      canonical: `/${slug}/${endpoint}/`,
    },
    openGraph: {
      title: `${operation.method} ${operation.path}`,
      description: operation.summary || operation.description,
      url: endpointUrl(operation),
      type: 'article',
      images: [{ url: `/og/${slug}/${endpoint}/image.png`, width: 1200, height: 630 }],
    },
  };
}

import { DocsPage, DocsBody, DocsTitle, DocsDescription } from 'fumadocs-ui/page';

export default async function EndpointPage({ params }: Props) {
  const { slug, endpoint } = await params;
  const operation = getOperation(slug, endpoint);
  if (!operation) notFound();

  return (
    <DocsChrome currentApi={slug}>
      <DocsPage>
        <DocsTitle>{operation.summary}</DocsTitle>
        <DocsDescription>{operation.description}</DocsDescription>
        <DocsBody>
          <FumadocsApiPage operation={operation} />
        </DocsBody>
      </DocsPage>
    </DocsChrome>
  );
}
