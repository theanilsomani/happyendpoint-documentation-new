# Happy Endpoint Docs

Fumadocs-powered Next.js documentation website for Happy Endpoint APIs sold on RapidAPI.

## What This Site Does

- Hosts multiple independent OpenAPI JSON documents.
- Generates one static, crawlable URL per API endpoint.
- Keeps API sidebars contextual: `/sephora/` shows Sephora endpoints, not every API.
- Uses exact pinned dependency versions and disables npm lifecycle scripts by default.
- Exports static files for Cloudflare Pages.

## Routes

```text
/                         API catalogue
/{guide}/                 Shared guide pages
/{api}/                   API overview
/{api}/{endpoint}/        Endpoint reference page
/openapi/{api}.json       Source OpenAPI document
```

Current APIs:

```text
sephora
tesco
ikea
propertyfinder
bayut
priceline
```

## Local Development

```bash
npm install
npm run dev
```

The current shell used by Codex did not have `npm` on PATH, so dependency installation and a local build were not run during scaffolding.

## Build

```bash
npm run build
```

The Next.js config uses:

```js
output: 'export'
images: { unoptimized: true }
trailingSlash: true
```

Cloudflare Pages settings:

```text
Build command: npm run build
Build output directory: out
Node version: 22+
```

## Adding An API

1. Add the source spec to `openapi/{slug}.json`.
2. Add the public copy to `public/openapi/{slug}.json`.
3. Add API metadata in `lib/site.ts`.
4. Run `npm run build` to regenerate all static routes and `sitemap.xml`.

## Notes

This project intentionally does not use the old Astro + Scalar architecture. The API reference pages are generated as static React Server Components from the OpenAPI specs for better SEO.

The implementation does not depend on `fumadocs-openapi`; the OpenAPI files are parsed locally by `lib/openapi.ts`. This keeps the dependency tree smaller and avoids pulling Scalar parser packages into the install path.
