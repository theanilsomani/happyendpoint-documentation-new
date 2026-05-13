import { createOpenAPI } from 'fumadocs-openapi/server';
import { createAPIPage } from 'fumadocs-openapi/ui';
import type { ServerApiPageProps } from 'fumadocs-openapi/ui/base';
import type { ComponentType } from 'react';
import type { ApiOperation } from '@/lib/openapi';
import { apiReferences } from '@/lib/site';
import client from './api-page.client';

const apiPages = Object.fromEntries(
  apiReferences.map((api) => {
    const openapi = createOpenAPI({
      input: [`./openapi/${api.slug}.json`],
    });

    return [
      api.slug,
      createAPIPage(openapi, {
        client,
      }),
    ];
  }),
) as unknown as Record<string, ComponentType<ServerApiPageProps>>;

export function FumadocsApiPage({ operation }: { operation: ApiOperation }) {
  const APIPage = apiPages[operation.apiSlug];

  if (!APIPage) return null;

  return (
    <APIPage
      document={`./openapi/${operation.apiSlug}.json`}
      showTitle={false}
      showDescription={false}
      operations={[
        {
          method: operation.method.toLowerCase() as never,
          path: operation.path,
        },
      ]}
    />
  );
}
