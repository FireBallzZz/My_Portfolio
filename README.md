# Forhad Siddique Rajon — Portfolio

A cinematic, animation-driven portfolio built with Next.js 16 (App Router),
TypeScript, Tailwind CSS v4, Framer Motion, GSAP, and a subtle Three.js
particle field.

## Signature idea

Every section is framed as a stage in an ML pipeline — `[ 00 · INPUT ]`
through `[ 05 · OUTPUT ]` — and the "attention: locked" status chip under
the portrait is a quiet nod to the gaze-estimation module in the thesis
work.

## Run it locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. Fonts (Space Grotesk, Inter, JetBrains Mono)
load from Google Fonts at build time via `next/font/google`, so the machine
you build on needs normal internet access.

```bash
npm run build   # production build
npm run lint    # eslint
```

## Before you ship this

Everything below is a placeholder — the site runs fine without touching
any of it, but it isn't *your* site until you do.

- [ ] **`lib/data.ts`** — the single file that holds all copy: your bio,
      project descriptions, skills, timeline, email and social links.
      Search the file for `// EDIT ME`.
- [ ] **`public/avatar.jpg`** — drop in a portrait. Until then the hero
      shows a gradient initials fallback, which also looks intentional if
      you'd rather skip a photo.
- [ ] **`public/resume.pdf`** — the "Download CV" button links here.
- [ ] **Voice Bridge & Sneakers project copy** — drafted as plausible
      placeholders in `lib/data.ts`; tighten them to what those projects
      actually do, and swap the `#` links for real repos/demos.
- [ ] **`app/layout.tsx`** — `metadataBase` URL, for correct social-share
      previews once this is deployed.
- [ ] **Timeline years** (`lib/data.ts`) — drafted from what's in the
      thesis progress notes; adjust to your actual dates.

## Structure

```
app/            # layout, page, global styles
components/     # all UI — one concern per file
lib/data.ts     # content — edit this, not the components
lib/hooks.ts    # mouse position, touch detection, active-section tracking
```

## Performance notes

- The Three.js particle field no-ops on touch devices and respects
  `prefers-reduced-motion`.
- Animations use `whileInView` with `once: true` so nothing re-triggers
  on scroll-back, keeping scroll performance steady.
- Fonts are self-hosted by Next at build time (no runtime Google Fonts
  request), and `next/image` handles the portrait.
