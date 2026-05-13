export type ApiMeta = {
  slug: string;
  title: string;
  group: string;
  description: string;
  rapidApiUrl: string;
};

export type Guide = {
  slug: string;
  title: string;
  description: string;
  intro: string;
  sections: Array<{
    title: string;
    items: Array<{
      heading: string;
      body: string;
    }>;
  }>;
};

export const site = {
  name: 'Happy Endpoint',
  url: 'https://docs.happyendpoint.com',
  description:
    'Production API documentation for Happy Endpoint data APIs on RapidAPI.',
};

export const apiReferences: ApiMeta[] = [
  {
    slug: 'sephora',
    title: 'Sephora API',
    group: 'Retail APIs',
    description:
      'Beauty catalog, keyword search, brand, category, store, and product detail data.',
    rapidApiUrl: 'https://rapidapi.com/',
  },
  {
    slug: 'tesco',
    title: 'Tesco API',
    group: 'Retail APIs',
    description:
      'Grocery product search, pricing, catalog, and product detail data.',
    rapidApiUrl: 'https://rapidapi.com/',
  },
  {
    slug: 'ikea',
    title: 'IKEA API',
    group: 'Retail APIs',
    description:
      'Furniture, home goods, product detail, search, and catalog data.',
    rapidApiUrl: 'https://rapidapi.com/',
  },
  {
    slug: 'propertyfinder',
    title: 'PropertyFinder API',
    group: 'Real Estate APIs',
    description:
      'UAE property listings, locations, prices, agencies, and real estate market data.',
    rapidApiUrl: 'https://rapidapi.com/',
  },
  {
    slug: 'bayut',
    title: 'Bayut API',
    group: 'Real Estate APIs',
    description:
      'UAE real estate search, listing detail, agency, location, and price data.',
    rapidApiUrl: 'https://rapidapi.com/',
  },
  {
    slug: 'priceline',
    title: 'Priceline API',
    group: 'Travel APIs',
    description:
      'Hotel, destination, pricing, and travel discovery data for booking workflows.',
    rapidApiUrl: 'https://rapidapi.com/',
  },
];

export const guides: Guide[] = [
  {
    slug: 'credits',
    title: 'Credits',
    description:
      'How RapidAPI credits, plan quotas, and request limits work for Happy Endpoint APIs.',
    intro:
      'Happy Endpoint APIs are sold on RapidAPI. Each API can have different Basic, Pro, Ultra, and Mega limits, so production integrations should estimate volume before launch.',
    sections: [
      {
        title: 'Choose the right plan',
        items: [
          {
            heading: 'Check the RapidAPI Pricing tab',
            body: 'Plan names are consistent, but quotas are API-specific. Confirm the exact request allowance for the API you are integrating.',
          },
          {
            heading: 'Model real monthly usage',
            body: 'Include searches, detail lookups, scheduled refreshes, retries, and background imports. A first demo run is rarely a good production estimate.',
          },
          {
            heading: 'Design for upgrades',
            body: 'Moving from Basic to Pro, Ultra, or Mega should be an operations decision, not a code rewrite.',
          },
        ],
      },
      {
        title: 'Control request volume',
        items: [
          {
            heading: 'Cache stable resources',
            body: 'Cache categories, locations, product metadata, listing metadata, and other slow-changing data when live freshness is not required.',
          },
          {
            heading: 'Queue bulk work',
            body: 'Run imports, enrichment, and monitoring in controlled jobs instead of sending bursts from user-facing routes.',
          },
        ],
      },
    ],
  },
  {
    slug: 'status-codes',
    title: 'Status Codes',
    description:
      'HTTP status code reference for authentication, validation, rate limits, retries, and upstream failures.',
    intro:
      'Every response includes an HTTP status code. Use it to decide whether to parse data, fix a request, update credentials, slow down, or retry later.',
    sections: [
      {
        title: 'Common outcomes',
        items: [
          {
            heading: '200 range',
            body: 'The request succeeded. Parse the JSON body and handle optional fields or empty arrays normally.',
          },
          {
            heading: '400 Bad Request',
            body: 'A required parameter is missing, malformed, unsupported, or outside the accepted range. Fix the request before retrying.',
          },
          {
            heading: '401 or 403',
            body: 'The RapidAPI key is missing, invalid, expired, or not subscribed to the API. Check credentials and subscription access.',
          },
          {
            heading: '429 Too Many Requests',
            body: 'A rate limit or quota window was exceeded. Back off, queue work, or review the active RapidAPI plan.',
          },
          {
            heading: '500 range and timeouts',
            body: 'Treat these as transient when safe. Retry with exponential backoff and cap retry attempts.',
          },
        ],
      },
    ],
  },
  {
    slug: 'usage',
    title: 'Usage',
    description:
      'Production usage guidance for validation, caching, batching, logging, and response handling.',
    intro:
      'A production API integration should be predictable under normal traffic and understandable when something fails.',
    sections: [
      {
        title: 'Reliable workflows',
        items: [
          {
            heading: 'Validate before sending',
            body: 'Check required fields, IDs, country codes, query values, and pagination ranges before calling an endpoint.',
          },
          {
            heading: 'Normalize responses',
            body: 'Map external responses into your own internal schema before storing or displaying data.',
          },
          {
            heading: 'Log request context',
            body: 'Record the endpoint, status code, response time, sanitized parameters, and correlation ID.',
          },
        ],
      },
    ],
  },
  {
    slug: 'global-parameters',
    title: 'Global Parameters',
    description:
      'Shared RapidAPI headers, authentication conventions, query patterns, and request rules.',
    intro:
      'Endpoint parameters vary by API, but RapidAPI authentication and safe request conventions are consistent across Happy Endpoint APIs.',
    sections: [
      {
        title: 'Required headers',
        items: [
          {
            heading: 'X-RapidAPI-Key',
            body: 'Your RapidAPI application key. Keep it secret and send requests from a backend, worker, or secure server environment.',
          },
          {
            heading: 'X-RapidAPI-Host',
            body: 'The API-specific host value shown on the RapidAPI listing. Copy it from the exact API you are integrating.',
          },
        ],
      },
      {
        title: 'Query conventions',
        items: [
          {
            heading: 'URL-encode values',
            body: 'Encode search terms, product URLs, locations, and category names so spaces and symbols do not break requests.',
          },
          {
            heading: 'Keep secrets out of URLs',
            body: 'Send credentials through headers rather than query strings because URLs often end up in logs and browser history.',
          },
        ],
      },
    ],
  },
  {
    slug: 'best-practices',
    title: 'Best Practices',
    description:
      'Build reliable, secure, and efficient Happy Endpoint API integrations.',
    intro:
      'The best integrations are boring in production: validated requests, protected keys, respected plan limits, and clear logs.',
    sections: [
      {
        title: 'Build for reliability',
        items: [
          {
            heading: 'Store keys in secrets',
            body: 'Never commit RapidAPI keys or expose them in browser code. Use environment variables or a secret manager.',
          },
          {
            heading: 'Retry only transient failures',
            body: 'Retry network failures, timeouts, and 500-range errors. Do not retry validation or authentication failures unchanged.',
          },
          {
            heading: 'Avoid request waterfalls',
            body: 'Collect identifiers through search endpoints, then fetch details through a controlled queue.',
          },
        ],
      },
    ],
  },
  {
    slug: 'error-handling',
    title: 'Error Handling',
    description:
      'Classify errors, handle retries, protect users, and keep useful diagnostics.',
    intro:
      'Separate validation problems, authentication failures, rate limits, empty results, and transient outages so each gets the right response.',
    sections: [
      {
        title: 'Failure classes',
        items: [
          {
            heading: 'Do not retry every error',
            body: 'Permanent errors need request or credential changes. Temporary errors can be retried with backoff.',
          },
          {
            heading: 'Fail closed on authentication',
            body: 'If a key is missing or unauthorized, stop the workflow and alert an operator instead of retrying the same key.',
          },
          {
            heading: 'Show graceful fallbacks',
            body: 'Use cached data, partial results, empty states, or a clear retry state in user-facing applications.',
          },
        ],
      },
    ],
  },
  {
    slug: 'timeouts',
    title: 'Timeouts',
    description:
      'Timeout guidance for clients, queues, retries, and slow upstream responses.',
    intro:
      'Timeouts protect your app from slow networks, broad queries, and upstream delays. Set explicit limits and move heavy work out of request paths.',
    sections: [
      {
        title: 'Timeout policy',
        items: [
          {
            heading: 'Set explicit client timeouts',
            body: 'Choose limits that match your user experience, worker limits, and background job schedule.',
          },
          {
            heading: 'Use backoff and jitter',
            body: 'Increase the wait after each retry and add jitter when many workers may retry at once.',
          },
          {
            heading: 'Tune heavy queries first',
            body: 'Narrow filters, lower page sizes, split jobs, or cache intermediate IDs before simply raising timeout values.',
          },
        ],
      },
    ],
  },
  {
    slug: 'api-keys',
    title: 'API Keys',
    description:
      'API key security for RapidAPI integrations, including storage, rotation, and monitoring.',
    intro:
      'RapidAPI keys authorize usage and should be handled as production secrets. Keep them server-side and rotate them deliberately.',
    sections: [
      {
        title: 'Key handling',
        items: [
          {
            heading: 'Keep keys server-side',
            body: 'Do not put keys in frontend JavaScript, mobile apps, screenshots, client logs, or public repositories.',
          },
          {
            heading: 'Use separate environments',
            body: 'Separate development, staging, CI, and production usage when possible so unexpected traffic is easier to investigate.',
          },
          {
            heading: 'Never log credentials',
            body: 'Sanitize request headers before writing logs because logs are retained and shared more widely than source code.',
          },
        ],
      },
    ],
  },
  {
    slug: 'glossary',
    title: 'Glossary',
    description:
      'Definitions for API, RapidAPI, OpenAPI, rate limits, credits, and integration terms.',
    intro:
      'Use this glossary when reading API references and building production data workflows.',
    sections: [
      {
        title: 'Terms',
        items: [
          {
            heading: 'Endpoint',
            body: 'A specific HTTP method and path, such as GET /search or GET /product-details.',
          },
          {
            heading: 'OpenAPI',
            body: 'A machine-readable specification for endpoints, parameters, responses, and authentication.',
          },
          {
            heading: 'Rate limit',
            body: 'A request limit applied by RapidAPI based on your plan or quota window.',
          },
          {
            heading: 'Backoff',
            body: 'A retry strategy that waits longer after each failed attempt.',
          },
        ],
      },
    ],
  },
];

export function getApi(slug: string) {
  return apiReferences.find((api) => api.slug === slug);
}

export function getGuide(slug: string) {
  return guides.find((guide) => guide.slug === slug);
}

export function groupedApis() {
  return apiReferences.reduce<Record<string, ApiMeta[]>>((groups, api) => {
    groups[api.group] ??= [];
    groups[api.group].push(api);
    return groups;
  }, {});
}
