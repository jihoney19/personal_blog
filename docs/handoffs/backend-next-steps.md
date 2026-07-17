# DEV.LOG Backend Handoff

## Current State

The comments vertical slice is implemented locally and the development backend is operational:

- SQL migration for comments, RLS, indexes, rate-limit state, and atomic rate-limit RPC
- Follow-up migration for the PostgreSQL `current_time` name collision found during live RPC verification
- Supabase Edge Function for approved-comment reads and moderated submissions
- Pure validation tests for slug, author, content, normalization, and honeypot behavior
- Astro comment list and submission form on every published post detail page
- Loading, empty, loaded, retry, pending-moderation, and configuration states
- Playwright functional and axe accessibility scenarios with a mocked backend
- GitHub Pages build variables for enabling the feature after backend setup

Development project `xnttxukulsbqyapzirkw` (`dev-log-development`) now has both migrations applied, the `comments` Edge Function deployed with JWT verification disabled, and the required Edge Function secrets configured. Live HTTP verification passed for approved reads, pending writes, CORS, validation, honeypot behavior, approval visibility, and the five-request rate limit. All verification rows and rate-limit state were removed afterward.

The production project and live site configuration were not modified. The development function currently allows only `http://localhost:4321`.

## Completed Development Setup

1. Inspected the empty development `public` schema before applying changes.
2. Applied `20260717130000_create_comments.sql` and the RPC repair migration.
3. Verified both tables, constraints, indexes, RLS, policy, trigger, and service-role-only RPC privileges.
4. Configured `COMMENTS_ALLOWED_ORIGINS` and a generated `COMMENTS_HASH_SECRET` without storing their values in Git.
5. Deployed the `comments` Edge Function as a public endpoint with application-level CORS and validation.
6. Verified real GET, POST, OPTIONS, invalid-input, forbidden-origin, honeypot, moderation, and rate-limit behavior.
7. Removed all development verification data.

## Release Steps Requiring Separate Approval

1. Decide the actual live site origin and add it to `COMMENTS_ALLOWED_ORIGINS`.
2. Add the development or production public URL, publishable key, and enabled flag to the intended build environment.
3. Run the full site against the live backend and complete browser QA.
4. Create or select a production Supabase project.
5. Apply the verified migrations, secrets, and function to production only after explicit approval.

## Useful Commands

```powershell
npm exec supabase -- login
npm exec supabase -- secrets list --project-ref <project-ref>
npm exec supabase -- functions deploy comments --project-ref <project-ref> --no-verify-jwt
```

Do not place project secrets in `.env.example`, source files, screenshots, task messages, or Git history.

## Development Backend Completion Gate

The backend is not operational until all of the following are true:

- The migration is applied to the intended Supabase project.
- RLS behavior is verified with anonymous credentials.
- Edge Function secrets and allowed origins are configured.
- The deployed function accepts valid submissions and rejects invalid or rate-limited requests.
- A pending comment remains invisible until approved.
- Verification rows and rate-limit identifiers are removed after testing.

All development-backend completion items passed on 2026-07-17. Live-site enablement and production rollout remain separate release work.
