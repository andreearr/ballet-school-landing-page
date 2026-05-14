# AGENTS.md

## Commands

```bash
npm start                          # dev server with live reload at http://localhost:3131
```

## Architecture

Pure static site — no build step, no framework, no runtime dependencies. Dev server uses `live-server` for auto-reload on file changes. Full design spec: [`spec.md`](spec.md).

```
public/
├── index.html, clases.html, alquiler.html, contacto.html
├── css/styles.css
├── js/main.js
├── fragments/footer.html   # loaded by js/footer.js into empty <footer> on each page
└── imgs/                   # originals also in user_input_files/ at repo root
```

## Gotchas

- **`fragments/footer.html` is the footer source of truth**, loaded by `js/footer.js` into empty `<footer>` elements on each page. All pages include both the script and the empty placeholder.

## Design System (source of truth: `css/styles.css`)

| CSS variable | Value | Role |
|---|---|---|
| `--color-primary` | `#2C2C2C` | Main text |
| `--color-secondary` | `#8B7355` | Warm accents |
| `--color-accent` | `#D4AF37` | Gold details / CTAs |
| `--color-bg-light` | `#FAF8F5` | Page backgrounds |
| `--color-bg-dark` | `#1A1A1A` | Dark sections |

Fonts: **Playfair Display** (headings), **Cormorant Garamond** (body), **Montserrat** (UI) — loaded from Google Fonts.

Scroll animations use `.fade-in` → `.fade-in.visible` (IntersectionObserver at 20% threshold). CTAs: `.btn--primary` (gold fill), `.btn--secondary` (gold outline).

## Key URLs

- `clases.html` hash sub-links: `#tipos`, `#horarios`, `#precios` — JS handles scroll-aware active state for these.
