# Environments

This file belongs to the repo. It is the one home of addresses.

| Environment | Address | Vercel project | Database | Moves on |
|---|---|---|---|---|
| Production | <not recorded on 2026-11-26> | <not recorded> | none | each merge to main |
| Preview | One for each pull request | <not recorded> | none | each push to the branch |

A person fills each `<…>` cell. The Vercel env values reach a cloud session through
`.claude/hooks/vercel-env-hydrate.sh`, when the session has `VERCEL_TOKEN`. The env names
are in `.env.example`.
