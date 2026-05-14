import fs from 'node:fs';
import path from 'node:path';
import { apiReferences, getApi, guides, site } from './site';

type Json = Record<string, unknown>;

type Operation = {
  apiSlug: string;
  apiTitle: string;
  method: string;
  path: string;
  slug: string;
  title: string;
  summary: string;
  description: string;
  tags: string[];
  parameters: Array<{
    name: string;
    in: string;
    required: boolean;
    description: string;
    schema: string;
  }>;
  responses: Array<{
    code: string;
    description: string;
  }>;
  requestBody?: {
    required: boolean;
    contentTypes: string[];
  };
  serverUrl: string;
};

const METHODS = new Set(['get', 'post', 'put', 'patch', 'delete', 'head', 'options']);

export type ApiOperation = Operation;

export function getSpec(apiSlug: string): Json {
  const file = path.join(process.cwd(), 'openapi', `${apiSlug}.json`);
  if (!fs.existsSync(file)) {
    return {
      info: { title: apiSlug, version: '1.0' },
      paths: {},
    };
  }
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8')) as Json;
  } catch (e) {
    console.error(`Error parsing OpenAPI spec for ${apiSlug}:`, e);
    return {
      info: { title: apiSlug, version: '1.0' },
      paths: {},
    };
  }
}

export function getApiInfo(apiSlug: string) {
  const meta = getApi(apiSlug);
  if (!meta) return undefined;
  const spec = getSpec(apiSlug);
  return {
    ...meta,
    openapiTitle: readString((spec.info as Json | undefined)?.title, meta.title),
    version: readString((spec.info as Json | undefined)?.version, '1.0'),
    description: meta.description,
    markdownDescription: readString((spec.info as Json | undefined)?.description, ''),
    serverUrl: getServerUrl(spec),
  };
}

export function getApiOperations(apiSlug: string): Operation[] {
  const meta = getApi(apiSlug);
  if (!meta) return [];

  const spec = getSpec(apiSlug);
  const paths = (spec.paths ?? {}) as Record<string, Json>;
  const seen = new Map<string, number>();

  return Object.entries(paths).flatMap(([operationPath, pathItem]) => {
    const sharedParameters = Array.isArray(pathItem.parameters)
      ? (pathItem.parameters as Json[])
      : [];

    return Object.entries(pathItem)
      .filter(([method]) => METHODS.has(method.toLowerCase()))
      .map(([method, operation]) => {
        const op = operation as Json;
        const baseSlug = slugForOperation(operationPath, op);
        const count = seen.get(baseSlug) ?? 0;
        seen.set(baseSlug, count + 1);
        const slug = count === 0 ? baseSlug : `${baseSlug}-${method.toLowerCase()}`;
        const summary = readString(op.summary, humanizePath(operationPath));
        const title = readString(op.operationId, summary);

        return {
          apiSlug,
          apiTitle: meta.title,
          method: method.toUpperCase(),
          path: operationPath,
          slug,
          title: cleanTitle(title),
          summary,
          description: readString(op.description, meta.description),
          tags: Array.isArray(op.tags) ? op.tags.map(String) : [],
          parameters: collectParameters(sharedParameters, op.parameters as Json[] | undefined),
          responses: collectResponses(op.responses as Json | undefined),
          requestBody: collectRequestBody(op.requestBody as Json | undefined),
          serverUrl: getServerUrl(spec),
        };
      });
  });
}

export function getAllOperations() {
  return apiReferences.flatMap((api) => getApiOperations(api.slug));
}

export function getOperation(apiSlug: string, endpointSlug: string) {
  return getApiOperations(apiSlug).find((operation) => operation.slug === endpointSlug);
}

export function getSearchRecords() {
  const guideRecords = guides.map((guide) => ({
    title: guide.title,
    href: `/${guide.slug}/`,
    section: 'Guides',
    description: guide.description,
  }));

  const apiRoots = apiReferences.map((api) => ({
    title: api.title,
    href: `/${api.slug}/`,
    section: api.title,
    apiSlug: api.slug,
    description: api.description,
  }));

  const endpoints = getAllOperations().map((operation) => ({
    title: `${operation.method} ${operation.path}`,
    href: `/${operation.apiSlug}/${operation.slug}/`,
    section: operation.apiTitle,
    apiSlug: operation.apiSlug,
    description: operation.summary || operation.description,
  }));

  return [...guideRecords, ...apiRoots, ...endpoints];
}

export function endpointUrl(operation: Operation) {
  return `${site.url}/${operation.apiSlug}/${operation.slug}/`;
}

function collectParameters(shared: Json[], operationParameters: Json[] | undefined) {
  return [...shared, ...(Array.isArray(operationParameters) ? operationParameters : [])].map((param) => {
    const schema = (param.schema ?? {}) as Json;
    return {
      name: readString(param.name, 'parameter'),
      in: readString(param.in, 'query'),
      required: Boolean(param.required),
      description: readString(param.description, ''),
      schema: schemaToText(schema),
    };
  });
}

function collectResponses(responses: Json | undefined) {
  if (!responses) return [];

  return Object.entries(responses).map(([code, response]) => ({
    code,
    description: readString((response as Json).description, 'Response'),
  }));
}

function collectRequestBody(requestBody: Json | undefined) {
  if (!requestBody) return undefined;
  const content = (requestBody.content ?? {}) as Json;

  return {
    required: Boolean(requestBody.required),
    contentTypes: Object.keys(content),
  };
}

function getServerUrl(spec: Json) {
  const servers = Array.isArray(spec.servers) ? (spec.servers as Json[]) : [];
  const first = servers[0];
  return readString(first?.url, 'https://example.com');
}

function schemaToText(schema: Json) {
  const type = readString(schema.type, '');
  const format = readString(schema.format, '');
  const enumValues = Array.isArray(schema.enum) ? schema.enum.map(String).join(' | ') : '';
  return [type, format && `(${format})`, enumValues && `enum: ${enumValues}`]
    .filter(Boolean)
    .join(' ');
}

function slugForOperation(operationPath: string, operation: Json) {
  const operationId = readString(operation.operationId, '');
  const source = operationId || operationPath;
  const slug = source
    .replace(/[{}]/g, '')
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();

  return slug || 'endpoint';
}

function humanizePath(operationPath: string) {
  return operationPath
    .split('/')
    .filter(Boolean)
    .map((part) => part.replace(/[{}_-]/g, ' '))
    .join(' ');
}

function cleanTitle(value: string) {
  return value.replace(/[-_]/g, ' ').replace(/\s+/g, ' ').trim();
}

function readString(value: unknown, fallback: string) {
  return typeof value === 'string' && value.trim() ? value.trim() : fallback;
}
