# AGENTS.md — Layer 0: Repository Identity & Routing

> This is the **first file any agent session reads.** It says what this repo is and where
> to go for a given task. Keep it short; detail lives in the routed files.

## What this repo is

**cafe-jardim** — the website for **Jardim · Café · Galeria**, a café and gallery. A
bilingual **PT/EN** Next.js 16 (App Router) site: `next-intl` routing under
`app/[locale]/`, Tailwind CSS v4 + shadcn/ui, Biome for lint and format, Vitest for tests,
Resend for the contact form, deployed on Vercel. There is a `ci.yml` workflow.

> **`README.md` is still the starter template's** — "Website Starter Template!", and
> `package.json` still says `"name": "project-name"`. Do not read either as a statement
> about Jardim; this file and `BRAND.md` are the identity, and the stale README is worth
> a ticket rather than a workaround.

**Brand:** [`BRAND.md`](BRAND.md) is the single source of truth for Jardim's visual
identity, extracted from the official guidelines deck (PDF and source assets under
`public/images/brand/`). It carries its own warning and it is important: **the tokens in
it are not yet wired into the app.** `app/globals.css` still ships the default shadcn
slate theme. Anything that looks off-brand is that gap, not a bug in a component.

## Routing — "if the task is… → go to…"

| The task | Go to |
|---|---|
| Pages, layout, routes | [`app/[locale]/`](app/) — plus `error.tsx`, `global-error.tsx`, `manifest.ts`, `robots.ts`, `sitemap.ts` at the root |
| Copy in either language | [`messages/pt.json`](messages/pt.json) · [`messages/en.json`](messages/en.json) — **keep the two in step** |
| Locale routing, negotiation, config | [`i18n/`](i18n/) — `routing.ts`, `request.ts`, `config.ts` |
| Colours, type, logo usage — anything brand | [`BRAND.md`](BRAND.md), then `app/globals.css` |
| Brand source files, the guidelines PDF | [`public/images/brand/`](public/images/brand/) — see its README |
| Components | [`components/`](components/) |
| Tests | [`tests/`](tests/) — Vitest |
| CI | [`.github/workflows/ci.yml`](.github/workflows/ci.yml) |
| Plan or track work on this repo | [`.icm/intake/`](.icm/intake/) — epics and stubs, contract in its README |

## Standing rules

- **PT and EN move together.** A string added to one `messages/` file is added to both in
  the same change. A missing key is a visible defect, not a fallback.
- **Brand lives in `BRAND.md`, not in components.** When the design pass happens it
  replaces the shadcn defaults in `app/globals.css` — do not scatter brand colours into
  component files ahead of it.
- **CI is the source of truth.** Never run `build`/`lint`/`typecheck`/`test` locally —
  push and read the checks.
- **Planning is tickets.** Any plan or backlog becomes stubs in `.icm/intake/`, never a
  loose `TODO.md`. Ticket-only commits go straight to `main`; everything else through a PR
  on a `claude/` branch.
- **Gates are human checkboxes** — read them, never tick them.
- **No secrets in git, ever.** Env vars only (`.env.example` documents the names); flag any
  plaintext credential found.
