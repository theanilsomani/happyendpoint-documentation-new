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

export function getDocsTree(activeApiSlug?: string): Root {
  const children: (Item | Folder | { type: 'separator'; name: string })[] = [
    {
      type: 'page',
      name: 'API Catalogue',
      url: '/',
      icon: <BookOpen />,
    },
    {
      type: 'separator',
      name: 'Guides',
    },
    ...guideNodes,
  ];

  if (activeApiSlug) {
    const api = apiReferences.find((a) => a.slug === activeApiSlug);
    if (api) {
      const operations = getApiOperations(api.slug);
      const groups = operations.reduce<Record<string, typeof operations>>((acc, operation) => {
        const group = operation.tags[0] || 'Endpoints';
        acc[group] ??= [];
        acc[group].push(operation);
        return acc;
      }, {});

      children.push({
        type: 'separator',
        name: 'Endpoints',
      });

      const endpointFolders = Object.entries(groups).map<Folder>(([group, groupOperations]) => ({
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
      }));

      children.push(...endpointFolders);
    }
  }

  return {
    name: 'Happy Endpoint',
    children,
  };
}
