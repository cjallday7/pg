# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # start dev server at localhost:3000
npm run build    # production build (also type-checks)
```

There are no tests and no lint script.

## Architecture

This is an **interactive experiment gallery** — a Next.js app that displays self-contained creative coding experiments (cursor effects, scroll interactions, WebGL/Three.js, GLSL shaders).

### Adding an experiment (the only recurring task)

Every experiment lives in `src/experiments/<slug>/` and needs exactly two files:

- **`Component.tsx`** — `'use client'` React component. Must fill its container (`w-full h-full`). Receives no props. Self-contained: all state, effects, and event listeners live here.
- **`meta.ts`** — exports a named `meta: ExperimentMeta` object (see `src/types/index.ts` for the shape — `slug`, `title`, `description`, `explanation`, `phase`, `category`, `tech`, `difficulty`, `tags`).

Then register both in **`src/lib/registry.ts`** — one line in `metaModules`, one line in `componentModules`. That's it; the gallery, routing, and code viewer all pick it up automatically.

### How the gallery works

- **Home (`src/app/page.tsx`)** — server component that calls `getAllExperiments()` and passes the sorted list to `<Gallery>`.
- **Gallery / ExperimentCard** — client components. Cards show a live scaled-down preview of the actual component (`scale(0.35)` via `PreviewContainer`). Clicking a card opens `ExperimentModal` using a Framer Motion `layoutId` shared-element transition.
- **ExperimentModal** — split panel: full-size live preview on the left, "About" + "Code" tabs on the right. Source code is fetched lazily from `/api/source?slug=` and syntax-highlighted server-side with Shiki.
- **`/[slug]` route** — renders the component full-screen (`w-screen h-screen`), useful for development and direct linking.

### Key constraints for experiment components

- Card previews render at **35% scale** via a CSS transform on the wrapper — the component itself renders at full size and is scaled down. This means mouse coordinates from `getBoundingClientRect()` are correct in the modal/route but will be offset in the card thumbnail (acceptable; interactivity in the card is decorative).
- Components must work inside a **fixed-size container** — do not assume full viewport. Use `position: absolute` (relative to container), not `position: fixed`.
- `cursor: none` on the container div is the correct pattern for cursor experiments — not on `body`.

### Styling

Tailwind v4 (`@import "tailwindcss"` in `globals.css`, `@theme inline` for token overrides). Dark background throughout — `bg-neutral-950` is the canvas color for experiments.

### Animation

Framer Motion handles gallery UI transitions (`layoutId`, `AnimatePresence`, `whileHover`). Experiment components use `requestAnimationFrame` loops and inline `style` mutations for performance-critical interactive effects — avoid mixing CSS `transition` on `transform` with rAF-driven transforms on the same element.
