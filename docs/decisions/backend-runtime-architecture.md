# DEV.LOG Backend Runtime Architecture

## 1. Decision Status

| Item | Value |
| --- | --- |
| Status | Approved; development Supabase backend deployed and verified |
| Approval date | 2026-07-17 |
| First runtime feature | Moderated reader comments |
| Content system | Markdown + Git remains unchanged |
| Runtime backend | Supabase Postgres + Data API + Edge Function |
| Development project | `xnttxukulsbqyapzirkw` (`dev-log-development`) |
| Production status | Not connected or modified |

## 2. Decision

DEV.LOG keeps author-managed posts and projects in Astro Content Collections. The runtime database stores only data created by readers. The first end-to-end backend slice is comments; likes, subscriptions, and analytics remain deferred until the comments path is operating and verified.

This boundary preserves the existing `BLOG_POSTING.md` review and Git history while adding only the runtime capability that static files cannot provide.

## 3. Runtime Flow

```text
Markdown + Git -> Astro build -> GitHub Pages

Browser -> comments Edge Function -> Supabase Data API + RLS -> approved comments only
Browser -> comments Edge Function -> pending comment in Supabase Postgres
Administrator -> Supabase Dashboard -> approve, reject, or mark spam
Codex -> Supabase MCP or CLI -> development schema and diagnostics only
```

## 4. Database Contract

### `comments`

| Column | Purpose |
| --- | --- |
| `id` | Server-generated UUID primary key |
| `post_slug` | Stable Markdown post ID used to associate a comment with a page |
| `author_name` | Public display name, 2–40 characters |
| `content` | Plain-text comment, 2–2000 characters |
| `status` | `pending`, `approved`, `rejected`, or `spam` |
| `created_at` | Submission timestamp |
| `approved_at` | Trigger-managed moderation timestamp |

Anonymous and authenticated browser roles receive `SELECT` only. The RLS policy returns rows only when `status = 'approved'`. Browser roles receive no direct `INSERT`, `UPDATE`, or `DELETE` privilege.

### `comment_rate_limits`

This internal table stores a 64-character HMAC identifier, a rolling window start, and a request count. It does not store a raw IP address. Browser roles have no privileges on the table.

The `consume_comment_rate_limit` security-definer function performs the counter update atomically, removes identifiers older than one day, and is executable only by `service_role`.

## 5. Edge Function Contract

Endpoint: `/functions/v1/comments`

- `GET ?post_slug={slug}` returns at most 100 approved comments in ascending creation order.
- `POST` accepts `postSlug`, `authorName`, `content`, and the hidden `website` honeypot field.
- A valid submission is stored as `pending` and returns HTTP `202`.
- More than five accepted attempts in ten minutes for the same HMAC identifier returns HTTP `429`.
- Origins must be explicitly listed in `COMMENTS_ALLOWED_ORIGINS`.
- Backend configuration failures and database errors return cause-neutral public messages.

## 6. Security Boundary

- `PUBLIC_SUPABASE_URL` and `PUBLIC_SUPABASE_PUBLISHABLE_KEY` may be included in the static browser build.
- `SUPABASE_SERVICE_ROLE_KEY` and `COMMENTS_HASH_SECRET` exist only in Edge Function secrets.
- Comment text is stored as plain text and rendered with DOM `textContent`, not HTML.
- The first version collects no email address and stores no raw IP address.
- Supabase MCP must target a development project. Do not give an agent write access to production reader data.
- Database changes are authored as migration files and reviewed in Git before they are applied.

## 7. Feature Flag and Failure Behavior

`PUBLIC_COMMENTS_ENABLED` defaults to false. When false, comment markup and browser requests are absent from the static build. When true but required public configuration is missing, the page displays a configuration-unavailable state instead of a broken form.

The client handles loading, empty, loaded, retryable error, submission-in-progress, accepted, and rejected-request states.

## 8. Deferred Decisions

- CAPTCHA or Turnstile integration after observing real spam pressure
- Authenticated accounts and comment ownership
- Threaded replies and edit/delete workflows
- Likes or other reactions
- Double-opt-in email subscriptions
- Visitor analytics provider
