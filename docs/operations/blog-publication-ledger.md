# Blog Publication Ledger

This file is the durable duplicate-prevention record for posts created by the pre-push workflow in `BLOG_POSTING.md`. Codex maintains it automatically; the user does not need to update it by hand.

## Rules

- Add one row only after the user approves a publication-ready post and before the post's requested push.
- Use a stable lowercase, hyphenated topic key for the continuing subject.
- Use a stable lowercase, hyphenated stage key for the independently publishable step within that subject.
- Treat an existing topic-key and stage-key pair as already authored even when commit SHAs change through rebase, squash, cherry-pick, or force-push.
- Use the same topic key and a new stage key for an approved follow-up post.
- Keep a ledger entry local when a push fails so a retry does not generate a duplicate.
- Do not add rejected, incomplete, low-value, or unapproved post candidates.
- Do not record secrets, private project names, embargoed details, or other information that is unsafe to commit.
- Do not remove or rewrite an entry without explicit user approval.

## Entries

| Topic key | Stage key | Post slug | Source branch | Publication date | Notes |
|---|---|---|---|---|---|
| moderated-supabase-comments | backend-integration | building-moderated-supabase-comments | codex/moderated-supabase-comments | 2026-07-17 | Approved schema, RLS, Edge Function, rate limiting, comments UI, and QA |
| moderated-supabase-comments | keyless-public-endpoint | removing-public-api-keys-from-static-comments | codex/remove-public-comment-key | 2026-07-18 | Approved browser key removal, public Edge Function Origin checks, deployment fix, and QA |
| development-blog-v1 | static-mvp-completion | finishing-development-blog-v1 | codex/remove-public-comment-key | 2026-07-18 | Approved v1 scope completion, content schema alignment, static SEO/RSS, and three-browser QA |
