# Jardim · Café · Galeria — cafe-jardim

The website of Jardim · Café · Galeria, a café and gallery. A bilingual PT/EN Next.js 16 app
(App Router) on Vercel, with no database. The contact form sends mail through Resend.

The work pipeline is the BAXTER blueprint (`.icm/_system/`, version in
`.icm/_system/VERSION`, answers in `.icm/.copier-answers.yml`). This file is identity and
routing only. The rules live once, in the files it points at.

## Routing

@.icm/_system/ROUTER.md

The router has the commands, the stages and the lanes. A ticket is a markdown stub in
`.icm/intake/`. The files below belong to this repo.

| You are asked to | Go to |
|---|---|
| read the stack and the conventions of the code | `.icm/project-rules.md` |
| read where the build runs | `.icm/environments.md`, the one home of the addresses |
| change pages, layout or routes | `app/[locale]/`, and `error.tsx`, `global-error.tsx`, `manifest.ts`, `robots.ts`, `sitemap.ts` at the root of `app/` |
| change copy in one of the two languages | `messages/pt.json` and `messages/en.json`, together |
| change locale routing, negotiation or config | `i18n/` (`routing.ts`, `request.ts`, `config.ts`) |
| change colours, type or the logo use | `BRAND.md`, then `app/globals.css` |
| read the brand source files or the guidelines PDF | `public/images/brand/` (see its README) |
| do a setup act in Vercel or GitHub | `.icm/setup/`: one file for each act. A person ticks its boxes |
| change what CI checks | the blueprint. `ci.yml` and `icm.yml` come from it |
