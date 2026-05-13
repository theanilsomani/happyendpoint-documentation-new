import { BookOpen, Boxes, Database, FileText } from 'lucide-react';
import type { Folder, Item, Root } from 'fumadocs-core/page-tree';
import { getApiOperations } from './openapi';
import { apiReferences, guides } from './site';

const guideNodes: Item[] = guides.map((guide) => ({
  type: 'page',
  name: guide.title,
  url: `/${guide.slug}/`,
  description: guide.description,
  icon: <FileText />,
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
      type: 'folder',
      name: 'Guides',
      icon: <Database />,
      children: guideNodes,
      defaultOpen: !activeApiSlug,
    },
  ];

  if (activeApiSlug) {
    const api = apiReferences.find((a) => a.slug === activeApiSlug);
    if (api) {
      const operations = getApiOperations(api.slug);
      const endpointNodes = operations.map<Item>((operation) => ({
        type: 'page',
        name: (
          <span className="he-tree-page" key={`${operation.method}-${operation.path}`}>
            <span key="summary">{operation.summary}</span>
            <span
              key="method"
              className={`he-method he-method-${operation.method.toLowerCase()}`}
            >
              {operation.method}
            </span>
          </span>
        ),
        url: `/${operation.apiSlug}/${operation.slug}/`,
        description: operation.description,
      }));

      children.push({
        type: 'folder',
        name: 'Endpoints',
        icon: <Boxes />,
        children: endpointNodes,
        defaultOpen: true,
      });
    }
  }

  return {
    name: 'Happy Endpoint',
    children,
  };
}
