# Happy Endpoint Docs

SEO-first API documentation website for Happy Endpoint APIs sold on RapidAPI.

This is a Next.js App Router project with Fumadocs UI styling, custom OpenAPI parsing, and static export for Cloudflare Pages. It replaced the older Astro + Scalar documentation site because each API endpoint needs its own crawlable URL.

## Current State

- Next.js 15 app using static export.
- Fumadocs UI package is used for docs styling/provider basics.
- The visible docs shell is custom-built to resemble the Fumadocs dark documentation style.
- OpenAPI JSON files are parsed locally by `lib/openapi.ts`.
- Every OpenAPI operation becomes a static page at `/{api}/{endpoint}/`.
- Each API overview renders a short summary plus the full OpenAPI `info.description` markdown.
- The sidebar is contextual: inside `/sephora/`, it shows Sephora endpoints instead of every API.
- The search box scopes results to the current API when browsing an API section.
- `sitemap.xml`, `robots.txt`, and `llms.txt` are included for discovery.

## Routes

```text
/                         API catalogue
/{guide}/                 Shared guide page
/{api}/                   API overview page
/{api}/{endpoint}/        Static endpoint reference page
/openapi/{api}.json       Public OpenAPI source document
/sitemap.xml              Generated sitemap
```

Example routes:

```text
/sephora/
/sephora/auto-complete/
/ikea/search-by-keyword/
/status-codes/
```

## Current APIs

```text
bayut
ikea
priceline
propertyfinder
sephora
tesco
```

The current specs generate 65 endpoint reference pages. The latest verified production build generated 85 total static pages.

## Important Files

```text
app/page.tsx
  API catalogue homepage.

app/[slug]/page.tsx
  Handles both shared guide pages and API overview pages.

app/[slug]/[endpoint]/page.tsx
  Static endpoint reference pages generated from OpenAPI operations.

app/global.css
  Dark Fumadocs-like visual system and layout styling.

components/DocsChrome.tsx
  Sidebar, contextual navigation, and main docs shell.

components/SearchBox.tsx
  Client-side contextual search.

components/ApiReference.tsx
  Endpoint detail renderer with parameters, request body, responses, and curl sample.

components/MarkdownBlock.tsx
  Small markdown renderer for OpenAPI `info.description` content.

lib/openapi.ts
  Reads OpenAPI JSON files and generates API/endpoint data.

lib/site.ts
  API metadata, guide content, and site constants.

openapi/*.json
  Source specs used during static generation.

public/openapi/*.json
  Publicly accessible OpenAPI files.
```

## Local Development

Install with scripts disabled:

```bash
npm install --ignore-scripts
```

Run locally:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

If port 3000 is busy:

```bash
npm run dev -- -p 3001
```

## Security Notes

Dependency safety is intentionally conservative:

- Direct dependencies are pinned exactly.
- `.npmrc` sets `ignore-scripts=true`.
- `.npmrc` sets `save-exact=true`.
- `fumadocs-openapi` is intentionally not used because it pulled vulnerable Scalar/YAML parser dependencies during audit.
- OpenAPI parsing is handled locally for JSON specs only.

Recommended checks after install:

```bash
npm audit
npm audit signatures
```

Do not use `npm audit fix --force` casually. It can install breaking dependency versions.

## Build

Run:

```bash
npm run build
```

The production build has been verified successfully through Next directly:

```text
Compiled successfully
Generating static pages (85/85)
Exporting (2/2)
```

The Next config uses:

```js
output: 'export'
images: { unoptimized: true }
trailingSlash: true
```

Static output directory:

```text
out
```

## Cloudflare Pages

Use these settings:

```text
Build command: npm run build
Build output directory: out
Node version: 22+
```

The project is designed to host at:

```text
https://docs.happyendpoint.com/
```

## Adding An API

1. Add the source spec:

```text
openapi/{slug}.json
```

2. Add the public copy:

```text
public/openapi/{slug}.json
```

3. Add metadata in:

```text
lib/site.ts
```

4. Run:

```bash
npm run build
```

The route list and sitemap are generated from the OpenAPI operations at build time.

## Adding A Guide

Add the guide entry to `guides` in:

```text
lib/site.ts
```

The guide will be available at:

```text
/{guide-slug}/
```

## Architecture Notes

This project intentionally does not use the old Astro + Scalar architecture.

It also does not use Scalar as the endpoint UI because the primary goal is SEO. The endpoint pages are server-rendered/static React pages generated from OpenAPI, so Google can index each operation at a clean permanent URL.
