# Comments Backend Runbook

## Scope

- Development project: `xnttxukulsbqyapzirkw` (`dev-log-development`)
- Production is a separate approval-gated environment.
- Posts and projects remain in Markdown and Git. Supabase stores only reader-generated comment and rate-limit data.

## Deployment Sources

- Database: `supabase/migrations/`
- Edge Function: `supabase/functions/comments/`
- Function configuration: `supabase/config.toml`

Always inspect the target project and current schema before applying a migration. Pass the project ref explicitly to remote commands and never infer a production target.

## Required Edge Function Configuration

- `COMMENTS_ALLOWED_ORIGINS`: comma-separated exact origins
- `COMMENTS_HASH_SECRET`: long random secret used only for HMAC identifiers
- Supabase-provided `SUPABASE_URL`, anonymous key, and service-role key

Never put secret values in source files, `.env.example`, screenshots, task messages, or Git history. List only secret names and digests when confirming configuration.

## Moderation

New valid submissions are stored as `pending`. Review them in the Supabase Dashboard and change `status` to `approved`, `rejected`, or `spam`. The database trigger sets `approved_at` when a comment becomes approved and clears it for every other status.

Anonymous clients must never receive direct write privileges. Public reads remain limited by the `Public can read approved comments` RLS policy.

## Verification Checklist

1. Allowed-origin `OPTIONS` returns `204` with the matching CORS origin.
2. Allowed-origin `GET` returns only approved comments.
3. Invalid slug and invalid body return `400`.
4. A forbidden Origin returns `403` without an allow-origin header.
5. A honeypot submission returns a neutral `202` response without inserting a row.
6. Valid POST returns `202` and inserts a pending row.
7. The pending row is absent from anonymous GET results.
8. Approval populates `approved_at` and makes the row visible through GET.
9. Five attempts are accepted in ten minutes and the sixth returns `429` with `Retry-After: 600`.
10. Delete all clearly labeled verification comments and their rate-limit identifiers.

## Recovery and Rotation

- Disable the site feature flag first if the endpoint is unhealthy.
- Inspect Edge Function and Postgres logs before changing code or schema.
- Rotate `COMMENTS_HASH_SECRET` if exposure is suspected; existing rate-limit identifiers can then be removed because they no longer match new HMAC values.
- Restrict `COMMENTS_ALLOWED_ORIGINS` to exact active site origins and remove obsolete origins.
- Redeploy only the `comments` function to the explicitly named project after a source change.
