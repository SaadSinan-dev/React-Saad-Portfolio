# Saad Sinan — Portfolio

Personal portfolio for a Flutter developer and Software Engineering student.
React 18 + Vite + Tailwind + Framer Motion. Bilingual (EN / AR with RTL) and
dual-theme.

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # → dist/
npm run preview   # serve the production build
```

## Design system

The identity is a single graphite ramp. There is no brand colour: contrast does
the work an accent normally would, and the one chromatic token — `signal` — is
reserved for availability status.

Everything resolves from CSS custom properties in `src/index.css`:

| Token group | Where it lives | Consumed as |
| --- | --- | --- |
| Colour | `--c-base`, `--c-surface`, `--c-line`, `--c-ink`, `--c-muted`, `--c-faint`, `--c-signal` | `bg-base`, `border-line`, `text-muted`, … |
| Type | `--fs-display` … `--fs-lead` (fluid `clamp`) | `text-display`, `text-h1`, `text-lead` |
| Layout | `--shell`, `--gutter`, `--section-y`, `--nav-h` | `.shell`, `py-section` |
| Motion | `--dur-*`, `--ease-*` (CSS) and `src/lib/motion.js` (JS) | `EASE`, `DUR`, `SPRING`, `STAGGER` |

Themes are a variable swap under `.dark` — components contain no `dark:`
variants and no `isDark` prop-drilling. `tailwind.config.js` maps the semantic
names onto those variables with alpha support.

### Motion

`src/lib/motion.js` is the single source for durations, easings, springs and
stagger, plus the variant factories (`rise`, `maskLine`, `slideIn`, `fade`,
`drawRule`, `stagger`). Each factory takes a `reduced` flag and collapses to a
short fade, so `prefers-reduced-motion` is honoured everywhere; `index.css`
covers the declarative side. Only `transform` and `opacity` are animated.

Cursor-driven behaviour (custom cursor, magnetic buttons, the hover preview in
Work) is gated behind `(hover: hover) and (pointer: fine)` — on touch devices
those listeners are never attached.

## Structure

```
src/
├── App.jsx                     composition root
├── index.css                   tokens, base, component utilities
├── lib/motion.js               motion system
├── data/
│   ├── portfolio.js            ← personal info, projects
│   └── stack.js                ← technical index
├── hooks/
│   ├── useDarkMode.js          theme, synced with the pre-paint script
│   ├── useLang.jsx             language + direction context
│   ├── useMediaQuery.js        media queries / pointer capability
│   └── useDialog.js            scroll lock, focus trap, focus restore
└── components/
    ├── layout/                 Navbar, Footer, MobileBottomNav
    ├── sections/               Hero, About, Stack, Work, Contact
    ├── work/                   ProjectSheet, MediaCarousel, asset registry
    └── ui/                     Reveal, MaskHeading, SectionHeader,
                                Magnetic, GridRules, CustomCursor, Icons
```

## Editing content

All copy lives in `src/data/`. Nothing is hard-coded in components.

- **`portfolio.js`** — `personalInfo`, `heroFacts`, `principles`, `projects`.
  Each project carries `titleEn/Ar`, short and long descriptions, `featuresEn/Ar`,
  `focusEn/Ar`, `stack`, `demoUrl`, `codeUrl` and `imageKeys`.
- **`stack.js`** — technical groups and their entries, with a `level` of
  `Expert` / `Advanced` / `Intermediate`.

To add a project screenshot, drop the file in `src/assets/projects/`, import it
in `src/components/work/assets.js`, and reference its key from `imageKeys`. Only
imported files are bundled.

## Notes

- The theme and language are applied by an inline script in `index.html` before
  first paint, so there is no flash on load.
- Screenshots are committed as PNGs. Converting them to WebP/AVIF would cut
  roughly 60% off the largest assets — the only meaningful payload left.
