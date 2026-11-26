# Project rules

This file belongs to the repo. Write the rules that are true for this repo only: the stack,
the conventions of the code, the names of things. Build and the lanes read it.

Keep it short. A rule that is true for all repos belongs in the blueprint, not here.

- Stack: one Next.js 16 app (App Router, TypeScript) at the repo root. `next-intl` routes
  under `app/[locale]/`. Tailwind CSS v4 and shadcn/ui. npm, with `package-lock.json`.
  Node from `.nvmrc`.
- The scripts `lint` (Biome, `biome check .`), `typecheck` (`tsc --noEmit`) and `test`
  (Vitest, `tests/`) are the code checks of the workflow `ci`. Biome does not check `.icm/`
  and `.claude/` (`biome.json`).
- PT and EN move together. A string added to `messages/pt.json` is added to
  `messages/en.json` in the same change, and the reverse. A missing key is a defect, not a
  fallback.
- The brand is in `BRAND.md`, the one source of the visual identity (from the guidelines
  deck in `public/images/brand/`). Its tokens are not yet in the app: `app/globals.css`
  has the default shadcn slate theme. An off-brand look is that gap, not a fault of a
  component. Do not put brand colours in component files: the design pass replaces the
  defaults in `app/globals.css`.
- `README.md` is still the text of the starter template, and `package.json` has the name
  `project-name`. Neither is a statement about Jardim.
- The contact form uses Resend. The env names are in `.env.example`. A secret is an env
  value only, never in git.
