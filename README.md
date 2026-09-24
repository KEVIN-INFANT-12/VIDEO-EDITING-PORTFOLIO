# Kevin Infant — Video Editor Portfolio

A premium, cinematic single-page portfolio built with React, TypeScript, Vite,
Tailwind CSS, Framer Motion and Lenis smooth scrolling.

## Run it

```bash
npm install
npm run dev
```

Then open http://localhost:5173

Other scripts:

```bash
npm run build     # type-check + production build to /dist
npm run preview   # preview the production build
```

## Where to edit things

Everything you'll want to change lives in `src/data/`:

| File | What's in it |
| --- | --- |
| `src/data/site.ts` | Name, role, nav links, **stats**, **contact details**, showreel id |
| `src/data/projects.ts` | **Short-form & long-form projects** (YouTube ids, titles, durations…) |
| `src/data/services.ts` | Services, software list, About qualities |

### Add your photos

Drop two portrait photos into `public/photos/`:

- `about.jpg` — About section
- `contact.jpg` — Contact section

Until then, tasteful placeholders show where to add them. See
`public/photos/README.txt`.

### Project covers

Covers are pulled automatically from each YouTube video. To use your own
image for a project, add a `thumbnail: '/covers/your-file.jpg'` field in
`src/data/projects.ts` and drop the file in `public/covers/`.

## Features

- Cinematic dark UI with neon-violet accents, film grain, vignette & light leaks
- Line-by-line hero reveal with blur-to-sharp highlight
- Smooth scrolling (Lenis) + scroll-reveal, parallax glows, floating particles
- Custom desktop cursor (auto-disabled on touch), magnetic buttons
- Work section split into **Short Form** (draggable horizontal gallery) and
  **Long Form** (cinematic grid), with animated filters
- Cinematic video modal (YouTube embed) — ESC / backdrop / button to close
- Animated stat count-ups, navbar transformation on scroll, active-section
  underline, fullscreen mobile menu
- Fully responsive, `prefers-reduced-motion` aware, keyboard accessible

## Tech

React 18 · TypeScript · Vite · Tailwind CSS · Framer Motion · GSAP · Lenis ·
Lucide React
