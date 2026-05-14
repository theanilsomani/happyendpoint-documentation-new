import { generateOGImage } from 'fumadocs-ui/og';
import { getAllOperations, getApiInfo, getOperation } from '@/lib/openapi';
import { apiReferences, getGuide, guides, site } from '@/lib/site';

export const revalidate = false;

export function generateStaticParams() {
  return [
    { slug: ['image.png'] },
    ...guides.map((g) => ({ slug: [g.slug, 'image.png'] })),
    ...apiReferences.map((a) => ({ slug: [a.slug, 'image.png'] })),
    ...getAllOperations().map((op) => ({ slug: [op.apiSlug, op.slug, 'image.png'] })),
  ];
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string[] }> },
) {
  const { slug } = await params;
  const parts = slug.slice(0, -1); // strip trailing 'image.png'

  if (parts.length === 0) {
    return generateOGImage({
      title: 'Happy Endpoint API Documentation',
      description: site.description,
      site: 'docs.happyendpoint.com',
      primaryColor: '#3b82f6',
      primaryTextColor: '#ffffff',
      width: 1200,
      height: 630,
    });
  }

  if (parts.length === 1) {
    const [segment] = parts;

    const guide = getGuide(segment);
    if (guide) {
      return generateOGImage({
        title: guide.title,
        description: guide.description,
        site: 'Happy Endpoint Docs',
        primaryColor: '#3b82f6',
        primaryTextColor: '#ffffff',
        width: 1200,
        height: 630,
      });
    }

    const api = getApiInfo(segment);
    if (api) {
      return generateOGImage({
        title: api.title,
        description: api.description,
        site: api.group,
        primaryColor: '#3b82f6',
        primaryTextColor: '#ffffff',
        width: 1200,
        height: 630,
      });
    }
  }

  if (parts.length === 2) {
    const [apiSlug, endpointSlug] = parts;
    const operation = getOperation(apiSlug, endpointSlug);
    if (operation) {
      return generateOGImage({
        title: operation.summary,
        description: `${operation.method} ${operation.path}`,
        site: operation.apiTitle,
        primaryColor: '#3b82f6',
        primaryTextColor: '#ffffff',
        width: 1200,
        height: 630,
      });
    }
  }

  return new Response('Not found', { status: 404 });
}
