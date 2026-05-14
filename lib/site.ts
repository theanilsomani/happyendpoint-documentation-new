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
    'The official documentation for Happy Endpoint data APIs on RapidAPI. Access real-time Retail, Real Estate, and Travel data with stable, high-performance endpoints.',
  email: 'happyendpointhq@gmail.com',
  twitter: 'https://x.com/happyendpointhq',
  github: 'https://github.com/happyendpointhq',
  rapidApi: 'https://rapidapi.com/user/happyendpoint',
  apify: 'https://apify.com/happyendpoint',
};

export const apiReferences: ApiMeta[] = [
  {
    slug: 'sephora',
    title: 'Sephora API',
    group: 'Retail APIs',
    description:
      'Real-time beauty catalog, keyword search, brand, category, store, and product detail data.',
    rapidApiUrl: 'https://rapidapi.com/happyendpoint/api/real-time-sephora-api/',
  },
  {
    slug: 'tesco',
    title: 'Tesco API',
    group: 'Retail APIs',
    description:
      'Grocery product search, pricing, catalog, and product detail data for UK and Ireland.',
    rapidApiUrl: 'https://rapidapi.com/happyendpoint/api/tesco-data-api/',
  },
  {
    slug: 'ikea',
    title: 'IKEA API',
    group: 'Retail APIs',
    description:
      'Furniture, home goods, product detail, search, and catalog data for global markets.',
    rapidApiUrl: 'https://rapidapi.com/happyendpoint/api/ikea-api-pro/',
  },
  {
    slug: 'propertyfinder',
    title: 'PropertyFinder API',
    group: 'Real Estate APIs',
    description:
      'UAE property listings, locations, prices, agencies, and real estate market data.',
    rapidApiUrl: 'https://rapidapi.com/happyendpoint/api/propertyfinder-uae-data',
  },
  {
    slug: 'bayut',
    title: 'Bayut API',
    group: 'Real Estate APIs',
    description:
      'UAE real estate search, listing detail, agency, location, and price data.',
    rapidApiUrl: 'https://rapidapi.com/happyendpoint/api/bayut14/',
  },
  // {
  //   slug: 'priceline',
  //   title: 'Priceline API',
  //   group: 'Travel APIs',
  //   description:
  //     'Hotel, destination, pricing, and travel discovery data for booking workflows.',
  //   rapidApiUrl: 'https://rapidapi.com/happyendpoint/api/priceline-api-pro/',
  // },
  {
    slug: 'fotocasa',
    title: 'Fotocasa API',
    group: 'Real Estate APIs',
    description:
      'Spanish real estate listings, property search, and market data across Spain.',
    rapidApiUrl: 'https://rapidapi.com/happyendpoint/api/fotocasa3',
  },
  {
    slug: 'uae-realestate',
    title: 'UAE Real Estate API',
    group: 'Real Estate APIs',
    description:
      'Comprehensive UAE property data combining Bayut and PropertyFinder listings.',
    rapidApiUrl: 'https://rapidapi.com/happyendpoint/api/uae-real-estate-api',
  },
];

export const guides: Guide[] = [
  {
    slug: 'welcome',
    title: 'Welcome',
    description:
      'Introduction to Happy Endpoint APIs, official links, and support channels.',
    intro:
      'Happy Endpoint is a premium provider of real-time data APIs for Retail, Real Estate, and Travel. We focus on providing high-quality, stable, and developer-friendly access to complex datasets.',
    sections: [
      {
        title: 'Our Ecosystem',
        items: [
          {
            heading: 'Main Website',
            body: 'Visit happyendpoint.com for our full catalog of services and high-level product details.',
          },
          {
            heading: 'RapidAPI Hub',
            body: 'Browse all 11+ Happy Endpoint APIs on our official RapidAPI profile. We maintain 9.9+ service scores and high performance across all endpoints.',
          },
          {
            heading: 'Apify Scrapers',
            body: 'For custom scraping needs and large-scale data extraction, visit our Apify profile at apify.com/happyendpoint.',
          },
        ],
      },
      {
        title: 'Support & Community',
        items: [
          {
            heading: 'Direct Email',
            body: 'Need help or have a custom data request? Email us at happyendpointhq@gmail.com. We typically respond within 24 hours.',
          },
          {
            heading: 'Twitter (X)',
            body: 'Follow @happyendpointhq on X for real-time status updates, new API launches, and technical tips.',
          },
          {
            heading: 'GitHub',
            body: 'Find our official SDKs, community examples, and issue trackers at github.com/happyendpointhq.',
          },
        ],
      },
    ],
  },
  {
    slug: 'credits',
    title: 'Credits',
    description:
      'Understanding RapidAPI credits, plan quotas, and request limits for Happy Endpoint.',
    intro:
      'All Happy Endpoint APIs use the RapidAPI credit system. Each plan (Basic, Pro, Ultra, Mega) provides a specific monthly quota designed to scale with your production needs.',
    sections: [
      {
        title: 'Choose the right plan',
        items: [
          {
            heading: 'Predictable Pricing',
            body: 'We design our quotas to be generous. Always check the Pricing tab on our RapidAPI listings for the most up-to-date monthly request limits.',
          },
          {
            heading: 'Monitor your usage',
            body: 'Use the RapidAPI Dashboard to track your credit consumption in real-time and set up alerts before you hit your limits.',
          },
        ],
      },
    ],
  },
  {
    slug: 'status-codes',
    title: 'Status Codes',
    description:
      'HTTP status code reference for Happy Endpoint APIs, from success to rate limits.',
    intro:
      'Happy Endpoint APIs follow standard REST conventions. Use these status codes to build robust, automated data workflows that handle success and failure gracefully.',
    sections: [
      {
        title: 'Response Reference',
        items: [
          {
            heading: '200 OK',
            body: 'The request was successful and the data is in the response body. If the search yielded no results, you will still get a 200 with an empty data array.',
          },
          {
            heading: '429 Rate Limit',
            body: 'You have exceeded your plan’s rate limit. We recommend implementing exponential backoff or upgrading to a higher tier on RapidAPI.',
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
  {
    slug: 'support',
    title: 'Support',
    description: 'Contact Happy Endpoint for technical assistance, custom data, or feedback.',
    intro: 'We are here to help you build better with our data. Whether you have a technical question or need a custom scraping solution, feel free to reach out.',
    sections: [
      {
        title: 'Get in Touch',
        items: [
          {
            heading: 'Technical Support',
            body: 'For questions about endpoint behavior or integration issues, email us at happyendpointhq@gmail.com.',
          },
          {
            heading: 'Custom Data Requests',
            body: 'If you need data that is not currently available in our RapidAPI catalogue, or require bulk data exports, let us know via email.',
          },
        ],
      },
      {
        title: 'Community & Social',
        items: [
          {
            heading: 'X / Twitter',
            body: 'Follow @happyendpointhq for news and updates.',
          },
          {
            heading: 'GitHub',
            body: 'Check out our community repositories and examples.',
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
