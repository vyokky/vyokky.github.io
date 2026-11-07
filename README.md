# vyokky.github.io

Personal homepage of Chaoyun Zhang. Live at https://vyokky.github.io/.

## Stack

- [Astro 7](https://astro.build) renders the whole page to static HTML at build time.
- React 19 islands only where the page is interactive: the hero network field, the NorthCUA
  experience loop and model switcher, and the publication filter.
- Tailwind CSS 4 (tokens live in `src/styles/global.css` under `@theme`).
- Scroll effects use native CSS scroll-driven animations, with a small fallback in
  `src/scripts/enhance.ts`. `prefers-reduced-motion` freezes all motion.

## Layout

```
src/pages/index.astro      page composition (section order)
src/sections/*.astro       static sections: hero, NorthCUA spotlight, about, experience, news, ...
src/islands/*.tsx          interactive React islands
src/data/publications.ts   publication list (title, authors, venue, links)
src/data/links.ts          contact links and nav sections
src/assets/                images (Astro generates AVIF/WebP sizes)
public/                    copied as-is (favicon, .nojekyll, verification file)
```

## Develop

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # astro check + static build into dist/
npm run preview
```

## Deploy

GitHub Pages serves the `gh-pages` branch. `npm run deploy` builds and pushes `dist/`
(including `.nojekyll`, which keeps Pages from dropping the `_astro/` folder).
