# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start dev server (localhost:3000)
npm run build        # Production build
npm run lint         # ESLint
npm run generate-types  # Generate TypeScript types from Contentful JSON exports
```

No test runner is configured.

## Architecture

Next.js 14 App Router site for Broadhill Estate (London estate agency). Dark-theme only (`html.dark`), deployed on Vercel with ISR and Contentful webhook-based revalidation.

### Data Flow

- **CMS**: Contentful (headless). Properties are the core content type.
- **Content delivery**: `src/app/libs/contenful-client.ts` wraps the Contentful JS SDK. Note the typo in the filename — keep it consistent unless renaming across the codebase.
- **Type generation**: Export JSON from Contentful CLI → place in `src/contentful-types/` → run `npm run generate-types`. Output lands in `src/app/generated-types/`. After generation, manually fix `Entry` → `EntrySkeletonType` in `TypeProperty.ts`.
- **ISR + webhook**: API routes use `export const revalidate = 86400` (24h fallback). `/api/revalidate` receives Contentful webhooks (secret-authenticated) and calls `revalidatePath` for property/asset changes.

### API Routes (`src/app/api/`)

| Route | Purpose |
|---|---|
| `/api/properties` | Search/filter properties from Contentful (location via Google Maps geocoding, price, beds, type, status, sort) |
| `/api/property` | Single property by ID |
| `/api/email` | Contact form submission via Resend |
| `/api/revalidate` | Contentful webhook for ISR cache invalidation |
| `/api/maps/geocode` | Google Maps geocoding proxy |
| `/api/maps/autocomplete` | Google Maps Places autocomplete proxy |

### Client-Side Data

- React Query (`@tanstack/react-query`) via `QueryClientProvider` in `src/app/providers.tsx` (staleTime: 60s)
- Query hooks in `src/app/properties/queries.ts`

### UI Layer

- **shadcn/ui** (default style, neutral base color, CSS variables) — components in `src/components/ui/`
- **App components** in `src/app/components/` (navigation, footer, gallery, etc.)
- Tailwind CSS with `tailwindcss-animate`
- Forms: `react-hook-form` + `zod` validation

### Key Domain Types (`src/app/types.ts`)

`Property`, `PropertyType`, `TransactionType` (Sales/Lettings), `PropertyStatus` (Available/Unavailable/PendingCompletion/UnderOffer). Status labels differ by transaction type (e.g., "For Sale" vs "To Let").

### Path Aliases

`@/*` maps to `./src/*`

## Environment Variables

Required (never commit these):
- `CONTENTFUL_SPACE_ID`, `CONTENTFUL_ACCESS_TOKEN` — Contentful delivery API
- `NEXT_PUBLIC_GOOGLE_MAP_API_KEY` — Google Maps (exposed to client)
- `RESEND_API_KEY` — Email sending
- `REVALIDATION_SECRET` — Webhook auth for ISR revalidation
