# LOGICAL LORDS // The Initiative

A fully interactive, animated 3D portfolio site for **Logical Lords** — a student developer
organization — themed as a SHIELD-style "Avengers Initiative" personnel file.

All visuals are **original geometry** built from primitive shapes and custom shaders. There
are **no Marvel logos, movie stills, fonts, or character models** anywhere on this site — it
only borrows the *language* of the Avengers theme (colors, codenames, dossier/stamp/monospace
UI language).

## Tech stack

- [React 19](https://react.dev) + [Vite 6](https://vite.dev)
- [react-three-fiber](https://docs.pmnd.rs/react-three-fiber) + [drei](https://github.com/pmndrs/drei) — all 3D scenes
- [GSAP](https://gsap.com) (+ ScrollTrigger) — boot sequence, scroll reveals, stat counters, card flips
- [Tailwind CSS v4](https://tailwindcss.com) — layout + typography, themed via `@theme` tokens

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
```

## Build & deploy

```bash
npm run build    # outputs a static build to ./dist
npm run preview  # serve the production build locally
```

Deploy-ready for Vercel / Netlify: point either service at this repo with
build command `npm run build` and output directory `dist`. No server is required.

## Structure

```
src/
  App.jsx                  # page shell + section order
  index.css                # @theme design tokens + global styles
  lib/
    tokens.js              # color tokens shared between CSS and the 3D scenes
    gsap.js                # gsap + ScrollTrigger, pre-registered
    device.js              # WebGL / reduced-motion / low-end / touch detection
    hooks.js               # prefersReducedMotion, useElementInView (lazy-mount canvases)
  data/
    roster.js              # the 6 agents (edit bios here)
    missions.js            # portfolios + shipped projects (edit links/descriptions here)
  components/
    Hero3D.jsx             # hero section, boot timeline + static fallback shield
    About.jsx              # directive copy, founder quote, animated stat counters
    TeamInitiative.jsx     # rover grid for the 6 dossier cards
    DossierCard.jsx        # hologram card + GSAP flip to the declassified panel
    MissionFiles.jsx       # "file drawer" cards that eject + tilt on hover
    Footer.jsx / Nav.jsx / SectionHeader.jsx / Reveal.jsx / FlatIcon.jsx
  scenes/
    HeroScene.jsx          # WebGL: layered hexagonal shield, red/gold rim lights, particles
    DossierScene.jsx       # WebGL: per-card hologram panel + spinning low-poly icons
```

## Customization

### Real team bios
The roster lives in `src/data/roster.js`. Only **Sudharsan C**'s bio is confirmed from his
real GitHub profile. The other five bios are **placeholder flavor text** — every entry is
marked with `bioConfirmed: false` and a `// TODO` comment. Replace the `blurb` for each person
with a real one-liner pulled from their actual GitHub profile. The founder quote in
`src/components/About.jsx` is also a placeholder (marked with a `// TODO`).

### Links & descriptions
Update `src/data/missions.js` for portfolio/project URLs. The one-line descriptions are
lightly-edited flavor copy — tighten them to match the real repos.

### Colors & fonts
Design tokens are defined once in `@theme` inside `src/index.css` (and mirrored in
`src/lib/tokens.js` for the WebGL scenes). Fonts are Anton (display), Inter (body) and
JetBrains Mono (labels/stamps), loaded from Google Fonts in `index.html`.

## Interaction & accessibility

- **Reduced motion**: every animation is disabled when `prefers-reduced-motion: reduce` is set —
  content renders statically and fully legible.
- **No WebGL / low-end devices**: hero falls back to a styled SVG shield; dossier cards render
  a static panel with an SVG icon; no layout breaks.
- **Lazy WebGL**: three.js is code-split and the react-three-fiber canvases below the fold only
  mount when scrolled near the viewport.
- **Keyboard**: all cards are `tabIndex={0}` `<button>`-semantics with visible `:focus-visible`
  outlines; `Enter`/`Space` flip the dossier, `Escape` closes it, and focus moves to the
  "View GitHub" link when a card is opened.
- **Touch**: cursor-parallax tilt is replaced with tap-to-flip; particle counts are capped on
  small screens and low-power hardware.

## Legal note

Held to the brief: no Marvel-owned artwork appears. The shield is an abstract layered hexagonal
disc, the icons are original low-poly primitives (icosahedron core, hex shield, extruded bolt,
blocky fist, hourglass, target rings), and the type is licensed open-source (OFL / Apache-2.0).