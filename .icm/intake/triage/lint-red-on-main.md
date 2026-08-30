# Stub: `main` is red — 13 Biome errors

- feature-slug: lint-red-on-main
- lane: bug
- priority: P2
- sources: found during the estate AGENTS.md rollout, 2026-08-30 · CI run 33307145266

## What this is

The `Lint & Type Check` workflow fails on `main`, and has for at least the last three
pushes — including two that touched nothing but `.icm/` and `.claude/`. Every PR opened
here inherits a red check, so a real failure is indistinguishable from the background one.

Biome reports **13 errors across 87 files**, of two kinds:

- `assist/source/organize` (×3) — import order in `components/menu-section.tsx:3`,
  `components/opening-hours.tsx:3`, `components/reviews-section.tsx:3`. Mechanical;
  `biome check --write` fixes them.
- `lint/suspicious/noArrayIndexKey` (×1 reported) — `components/reviews-section.tsx:48`.
  A real one: a list keyed by array index reorders wrongly when the list changes. The fix
  is a stable key from the review itself, not a suppression.

The counts do not add to 13 in the log excerpt, so read the full run before assuming the
list above is complete.

## Worth knowing

This repo's `main` also carries the commit *"Mark repo dormant: build-once-hand-off, no
board to be off (ICM-003)"*. If it is genuinely handed off, the right answer may be to
turn the workflow off rather than fix it — a red check nobody reads is worse than no check.
That is Jamie's call and it is the first thing to settle.

## Prompt

Get cafe-jardim's `main` green, or decide it should not have a CI workflow at all. Read
.icm/intake/triage/lint-red-on-main.md first, and settle the dormancy question before
doing any work — this repo was marked build-once-hand-off. If it is being fixed: run the
full run to get the complete error list, let `biome check --write` handle the
`assist/source/organize` ones, and fix `noArrayIndexKey` in
`components/reviews-section.tsx:48` with a stable key rather than a suppression. Open a PR
on a claude/ branch and read the result from CI.
