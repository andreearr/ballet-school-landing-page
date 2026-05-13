# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Dev Server

```bash
npm start
# equivalent:
cd israel-rueda-ballet && python3 -m http.server 3030
```

Site runs at http://localhost:3030

## Validation

```bash
# Fast static check (no browser required) — checks asset references and WhatsApp link
python3 simple_validate.py

# Full browser-based check via Playwright — checks console errors and network requests
python3 validate_site.py
```

Note: both validation scripts hardcode `/workspace/israel-rueda-ballet` as the base path. When running locally, image/CSS/JS paths are checked relative to `israel-rueda-ballet/`, so missing asset warnings may be path artifacts rather than real bugs.

## Architecture

Pure static site — no build step, no framework, no dependencies at runtime.

```
israel-rueda-ballet/
├── index.html, clases.html, alquiler.html, contacto.html
├── css/styles.css       — single stylesheet with CSS custom properties
├── js/main.js           — single IIFE, vanilla ES6+
└── imgs/                — all images (originals in user_input_files/ at repo root)
```

All four pages share the same `styles.css` and `main.js`. The JS handles: sticky header with blur, mobile hamburger menu, scroll-triggered fade-in via IntersectionObserver, smooth scroll, parallax on hero images, scroll-based active nav state (including hash-based sub-links on `clases.html`), and contact form with real-time validation. The form submission is currently simulated with `setTimeout` — there is no backend endpoint wired up.

## Design System

CSS custom properties are the source of truth for the visual language (defined in `styles.css`):

| Token | Value | Usage |
|---|---|---|
| Primary | `#2C2C2C` | Main text |
| Secondary | `#8B7355` | Warm accents |
| Accent | `#D4AF37` | Gold details, CTAs |
| Background Light | `#FAF8F5` | Page backgrounds |
| Background Dark | `#1A1A1A` | Dark sections |

Fonts loaded from Google Fonts: **Playfair Display** (headings), **Cormorant Garamond** (body), **Montserrat** (UI). Spacing base unit is 8px; section padding is 80px desktop / 48px mobile.

Scroll animations use the class pattern `.fade-in` → `.fade-in.visible` (triggered at 20% viewport threshold). CTAs follow a two-variant system: `.btn--primary` (gold fill) and `.btn--secondary` (gold outline).

## Key Details

- WhatsApp CTA links to `wa.me/34633473565` — present on every page as both a floating mobile button and inline CTAs.
- `clases.html` has three hash-linked sub-sections (`#tipos`, `#horarios`, `#precios`) with scroll-aware active nav highlighting.
- The contact form on `contacto.html` validates email, phone (9+ digits), and required fields on blur and input.
- Google Maps iframe embeds the studio address: Carrer del Torrent d'En Vidalet, 14, Gràcia, Barcelona.
