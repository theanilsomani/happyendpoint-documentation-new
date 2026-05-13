import { getSearchRecords } from '@/lib/openapi';
import { createSearchAPI } from 'fumadocs-core/search/server';

export const { GET } = createSearchAPI('static', {
  indexes: getSearchRecords().map((record) => ({
    title: record.title,
    content: record.description || record.title,
    url: record.href,
    id: record.href,
    structuredData: {
      headings: [],
      contents: [],
    },
  })),
});
