# Jardim — Café · Galeria — Brand Reference

The single source of truth for Jardim's visual identity, extracted from the official
brand guidelines deck. Use this when building UI, choosing colours, or picking type.

- **Full guidelines PDF (10 pages):** [public/images/brand/guidelines/jardim-brand-guidelines.pdf](public/images/brand/guidelines/jardim-brand-guidelines.pdf)
- **All brand assets (logos, fonts, source files):** [public/images/brand/](public/images/brand/) — see [its README](public/images/brand/README.md)

> ⚠️ **Not yet wired into the app.** `app/globals.css` still ships the default
> shadcn slate theme. The tokens below are the *intended* brand system and should
> replace those defaults when the design pass happens.

---

## Brand

| | |
|---|---|
| **Name** | Jardim |
| **Descriptor** | Café · Galeria |
| **Concept** | A café + art gallery. Botanical, natural, warm. "Jardim" = *garden* (Portuguese). |
| **Logo mark** | Handwritten "Jardim" script; the dot on the *i* is a small leaf. |

## Colour palette

Two-colour palette (from guidelines p.7 "Palete cores"):

| Token | Role | HEX | RGB | CMYK |
|---|---|---|---|---|
| `brand-green` | Primary — deep forest green | `#00453A` | `0, 69, 58` | `91, 43, 69, 53` |
| `brand-cream` | Secondary — warm sand / cream | `#F7E1C3` | `247, 225, 195` | `4, 13, 27, 0` |

Supporting neutrals used in the mono logos: pure black `#000000` and white `#FFFFFF`.

```css
/* Suggested CSS custom properties */
:root {
  --brand-green: #00453A;
  --brand-cream: #F7E1C3;
}
```

## Typography

| Use | Typeface | Weight / Size |
|---|---|---|
| Display / logo lettering | **Poppins** | — (bundled at `public/images/brand/fonts/poppins/`) |
| H1 | Roboto ExtraBold | 34 pt |
| H2 | Roboto Bold | 22 pt |
| H3 | Roboto SemiBold | 18 pt |
| Body | Roboto Medium | 14 pt |
| Description / caption | Roboto Regular | 14 pt |

- **Poppins** is included in the repo (18 `.ttf` weights + `OFL.txt`).
- **Roboto** is not bundled — load it from Google Fonts / `next/font` when wiring the type scale.

## Logo assets

Six official lockups, each provided as **PNG** (hi-res, use for web) and **JPG** (flat),
in `public/images/brand/logos/`:

| File stem | Variant | Use on |
|---|---|---|
| `jardim-logo-primary-green` | Primary wordmark, green | Light / white backgrounds |
| `jardim-logo-mono-white` | Negative, white | Dark / photo backgrounds |
| `jardim-logo-mono-black` | Positive, black | Mono / print, single-colour |
| `jardim-logo-badge-circular` | Circular badge lockups | Stamps, stickers, avatars |
| `jardim-logo-botanical-cream` | Wordmark + fern on cream | Warm/editorial hero art |
| `jardim-logo-botanical-green` | Wordmark + leaf on green | Dark hero / brand moments |

- **Editable source:** `logos/source/jardim-brand.eps` and `logos/source/jardim-brand-package.zip`
- **Large-format print:** `logos/jardim-logo-90x90cm.pdf`

## Graphic language

Vintage botanical illustrations — leaves, ferns, flowers (guidelines p.8 "Graphic
artifacts"). Rendered tonally: green-on-green or sepia-on-cream. Use as subtle
background texture, never competing with the wordmark.
