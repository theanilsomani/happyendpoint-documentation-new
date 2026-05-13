import { BookOpen, Boxes, Database } from 'lucide-react';
import type { Folder, Item, Root } from 'fumadocs-core/page-tree';
import { getApiOperations } from './openapi';
import { apiReferences, guides } from './site';

const guideNodes: Item[] = guides.map((guide) => ({
  type: 'page',
  name: guide.title,
  url: `/${guide.slug}/`,
  description: guide.description,
}));

export const docsTree: Root = {
  name: 'Happy Endpoint',
  children: [
    {
      type: 'folder',
      name: 'Start',
      root: true,
      defaultOpen: true,
      icon: <BookOpen />,
      index: {
        type: 'page',
        name: 'API Catalogue',
        url: '/',
        description: 'Browse every Happy Endpoint API reference.',
      },
      children: [
        {
          type: 'separator',
          name: 'Guides',
        },
        ...guideNodes,
      ],
    },
    ...apiReferences.map<Folder>((api) => {
      const operations = getApiOperations(api.slug);
      const groups = operations.reduce<Record<string, typeof operations>>((acc, operation) => {
        const group = operation.tags[0] || 'Endpoints';
        acc[group] ??= [];
        acc[group].push(operation);
        return acc;
      }, {});

      return {
        type: 'folder',
        name: api.title,
        root: true,
        defaultOpen: true,
        icon: <Database />,
        description: api.description,
        index: {
          type: 'page',
          name: 'Overview',
          url: `/${api.slug}/`,
          description: api.description,
        },
        children: Object.entries(groups).map<Folder>(([group, groupOperations]) => ({
          type: 'folder',
          name: group,
          defaultOpen: true,
          icon: <Boxes />,
          children: groupOperations.map<Item>((operation) => ({
            type: 'page',
            name: (
              <span className="he-tree-page">
                <span>{operation.summary}</span>
                <span className={`he-method he-method-${operation.method.toLowerCase()}`}>
                  {operation.method}
                </span>
              </span>
            ),
            url: `/${operation.apiSlug}/${operation.slug}/`,
            description: operation.description,
          })),
        })),
      };
    }),
  ],
};
