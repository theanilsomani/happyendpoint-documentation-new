# Happy Endpoint API Documentation

The official, premium documentation portal for **Happy Endpoint** data APIs. Built for high performance, developer utility, and maximum SEO impact.

## 🚀 Key Features

- **Contextual Navigation**: A dynamic sidebar that adapts to the selected API, featuring collapsible folders for Guides and Endpoints.
- **Premium UI**: Built with [Fumadocs](https://fumadocs.dev/) and Tailwind CSS v4, featuring a custom API selection dropdown and high-density technical layouts.
- **SEO Optimized**: 
  - Every API endpoint has a permanent, static URL.
  - Automatic JSON-LD structured data for every operation.
  - Server-side rendered (SSR) content for perfect search engine indexing.
- **Full-Text Search**: Integrated search functionality covering all guides and API references.
- **Three-Panel Reference**: Industry-standard API documentation layout with parameter tables and request/response panels.

## 🛠️ Architecture

### Tech Stack
- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
- **UI Components**: [Fumadocs UI](https://fumadocs.dev/)
- **API Processing**: [Fumadocs OpenAPI](https://fumadocs.dev/docs/openapi)
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React

### Directory Structure
```text
├── app/
│   ├── [slug]/                 # Guide and API Overview pages
│   ├── [slug]/[endpoint]/      # Individual API Endpoint pages
│   ├── api/search/             # Search API implementation
│   └── layout.tsx              # Global layout and Root Provider
├── components/                 # Custom UI components (ApiDropdown, MarkdownBlock, etc.)
├── lib/
│   ├── openapi.ts              # OpenAPI spec parsing and operation extraction
│   ├── page-tree.tsx           # Dynamic sidebar tree generation logic
│   └── site.ts                 # Centralized site configuration and guide content
├── openapi/                    # Source OpenAPI JSON files
└── public/                     # Static assets (Favicons, logos)
```

## 📋 Centralized Configuration

Most site content is managed via `lib/site.ts`. This file controls:
- **API References**: Slugs, titles, groups, and RapidAPI URLs.
- **Guides**: Multi-section documentation guides with metadata.
- **Brand Info**: Social links, support email, and SEO descriptions.

## 🚦 Getting Started

### Development
```bash
npm run dev
```

### Adding a New API
1. Place the OpenAPI JSON spec in the `openapi/` directory.
2. Add the API metadata to `apiReferences` in `lib/site.ts`.
3. The platform will automatically generate the sidebar entries and endpoint pages on the next build.

### Adding a New Guide
1. Define the guide structure in the `guides` array in `lib/site.ts`.
2. The guide will be automatically available at `/{slug}/`.

## 📩 Support

For technical assistance or custom data requests:
- **Email**: happyendpointhq@gmail.com
- **X (Twitter)**: [@happyendpointhq](https://x.com/happyendpointhq)
- **GitHub**: [happyendpointhq](https://github.com/happyendpointhq)

---
© 2026 Happy Endpoint. Built for the modern data ecosystem.
