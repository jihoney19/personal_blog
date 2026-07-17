# Pre-Push Blog Posting Workflow

## 1. Purpose and Trigger

This document defines the mandatory content workflow that Codex must complete whenever the user requests a Git remote push from this repository. Its purpose is to turn verified, worthwhile project work into publication-ready Korean blog posts without publishing routine noise or fabricated experience.

- Read this file after implementation and impact-based verification, but before the requested push.
- Apply it to every push request, including requests that only push commits already created locally.
- A direct request to push authorizes the remote push under `AGENTS.md`, but it does not bypass the blog-post review gate in this document.
- At the start of the pre-push workflow, tell the user that insufficient evidence or pending post approval will pause the entire requested push.
- This single-user project has no urgent-push exception. Never bypass the evidence or approval gate based on inferred urgency.
- Generated posts and their assets must be included in the same requested push as the existing authorized changes. Do not push the posts separately.
- This workflow does not authorize deployment, domain changes, analytics, a CMS, or any other external publication mechanism beyond the requested Git push.

## 2. Scope Since the Previous Push

Use a hybrid scope so that meaningful work is neither omitted nor attributed incorrectly.

1. Resolve the current branch's configured upstream with `@{upstream}`. Treat that remote-tracking ref as the last known successful-push boundary for the current branch.
2. Inspect `@{upstream}..HEAD`, the complete diff from `@{upstream}` to the current worktree, and relevant untracked files. This covers local commits plus staged, unstaged, and untracked work.
3. Read `docs/operations/blog-publication-ledger.md` and all existing production posts before deciding what is new.
4. Review the Codex task conversations associated with that work, including technical decisions, alternatives, failed attempts, and verification results.
5. Divide the scope by independently meaningful technical topic, not by commit count, file count, or chat turn.
6. Exclude changes made by the user or another contributor unless their provenance and facts are clear and the user has confirmed that they may be included.
7. Compare semantic topic and stage identifiers, post slugs, existing article content, and follow-up links. Do not rely on commit SHA alone to detect duplicates.

The publication ledger and existing posts are the durable duplicate-prevention record when rebase, squash, cherry-pick, or force-push changes commit identities. Do not use a standalone last-SHA marker as the only source of truth.

Apply this workflow on every branch push. A post and ledger entry created on a feature branch must travel with that branch. When the work is later merged or squashed, reuse the existing post and ledger entry instead of generating the same topic and stage again. If the post was intentionally excluded from the merge, reassess the topic from the publication branch rather than assuming it was published.

If the branch has no configured upstream, the remote-tracking ref is stale or missing, or rewritten history makes the boundary materially ambiguous, stop before authoring or pushing and ask the user to establish the correct baseline. Do not guess from timestamps.

## 3. Evidence Rules

Posts may use both repository evidence and verified task context.

Acceptable evidence includes:

- diffs, commits, source files, tests, configuration, and planning documents;
- commands actually executed and their observed results;
- browser and accessibility verification actually performed;
- technical decisions, alternatives, and failed attempts recorded in the relevant Codex conversation;
- user-confirmed facts about the work.

Conversation context may explain why a decision was made, but it is not proof that an implementation works. Claims about completion, behavior, performance, accessibility, or test results require corresponding verification evidence.

Never infer or invent experience, intent, duration, authorship, metrics, outcomes, links, or commands. Do not convert a proposal into a claim that it was implemented.

Determine provenance in this order:

1. current and associated Codex task conversations plus the observed edits made during those tasks;
2. the relevant diff, commit history, and user confirmations;
3. Git author and email only as supporting hints, never as decisive proof.

If provenance remains unclear, do not attribute the work or include it in a post until the user confirms it. Neutral writing style does not replace provenance verification.

## 4. Publication-Value Gate

Create a post only when the work provides a coherent, reusable insight for a developer reader. Qualifying signals include at least one of the following:

- a non-obvious problem, root cause, attempted approach, and verified resolution;
- an architectural, product, design, accessibility, or testing decision with a meaningful tradeoff;
- a reusable implementation or debugging technique;
- a project milestone supported by concrete implementation and QA evidence;
- an independently understandable insight from an in-progress feature, even when the entire feature is not complete.

Do not create a post solely for:

- typo, wording, formatting, or comment-only cleanup;
- mechanical renaming, file movement, or routine refactoring with no reusable decision;
- trivial visual adjustment with no meaningful design or accessibility reasoning;
- generated artifacts, lockfile-only churn, or routine command execution;
- a change whose only evidence is a commit message or an unverified statement.

When no topic passes this gate, do not create filler content. Report briefly that no post was generated and why, then continue the already-authorized push.

## 5. Topic Splitting and Continuations

- There is no maximum number of posts per push.
- Create a separate post for every independent topic that passes the publication-value gate.
- Combine changes only when they answer the same reader question or form one inseparable decision path.
- Do not split a single idea merely to increase the post count.
- When later work continues an existing published topic, create a new follow-up post rather than rewriting the earlier post.
- A follow-up post must link to the previous stage, summarize what that stage completed, and remain understandable when read on its own.
- Prefer stable internal post URLs based on the existing slug rules.

Assign each approved post a stable lowercase, hyphenated topic key and stage key. Before drafting, compare the pair against `docs/operations/blog-publication-ledger.md`.

- The same topic key and stage key means the work is already covered; do not create a duplicate on another branch or after a history rewrite.
- The same topic key with a genuinely new stage key means a follow-up post may be created.
- Add one ledger entry only after the user approves the post and before the requested push.
- Never modify a key merely to evade duplicate detection.

## 6. Insufficient-Evidence Gate

If a topic has clear publication value but cannot yet support a truthful, publication-ready post, stop the push and ask the user for supplementation. The request must include:

- the exact facts or verification evidence that are missing;
- why the missing evidence prevents publication;
- practical ideas for obtaining it, such as a focused test, browser scenario, comparison, screenshot, reproduction step, or user fact check;
- one or more viable article angles or outlines that would become possible after supplementation.

Do not silently omit a valuable topic, lower the publication standard, fabricate missing details, or push first and defer the post.

This gate blocks the entire requested push. There is no urgency, hotfix, timeout, or convenience exception in this single-user project unless the user explicitly changes this policy in a later instruction.

## 7. Writing and Classification Rules

- Write the title, description, and body in Korean. Use English only where the site taxonomy, code, proper nouns, or technical clarity requires it.
- Use a neutral project-record voice such as `이번 작업에서는`. Do not write as if the user personally performed an action unless that authorship is explicitly confirmed.
- Distinguish the user, Codex, and other tools when the distinction matters. Do not paste private prompts or imply that an AI suggestion was the user's original decision.
- Do not add a generic disclosure label or boilerplate stating that AI helped write the post. Mention Codex only when its participation is itself relevant to the verified technical story.
- Choose the article structure freely according to the topic. Avoid forcing every post into the same heading template.
- Explain the problem, reasoning, decision, and verification where relevant, but do not turn a diff or commit log into prose line by line.
- Keep limitations and unfinished work visible when they affect the reader's understanding.
- Include only code examples that were verified or that exactly reflect the verified repository state.
- When external technical claims require sources, prefer primary official documentation and link the exact supporting page.

Before writing frontmatter, inspect `src/content.config.ts` and the current taxonomy constants. Follow the current schema rather than stale examples in planning documents.

- Select `type`, `category`, and `tags` automatically from the current allowed values and the actual subject of the post.
- Set every generated post to `draft: false` and, when the current schema supports it, `status: Published`.
- Use the current date in the `Asia/Seoul` timezone for the publication date.
- Use a unique, descriptive, lowercase English filename or slug containing only allowed characters.
- Do not set optional metadata without evidence or a concrete display purpose.
- Create a new post and publication date for a continuation; do not use the earlier post's update field as a substitute.

## 8. Screenshots and Other Images

Codex may capture and include an image when it materially improves a post about UI, responsive behavior, visual design, accessibility presentation, or another result that benefits from visual evidence.

- Capture the actual verified local result, preferably from a production preview.
- Use the relevant viewport and theme; do not add redundant screenshots merely for decoration.
- Do not capture secrets, personal information, private URLs, browser chrome containing sensitive data, or temporary test data that could be mistaken for real content.
- Store the image as a local post asset using the repository's supported asset path and verify that the production build renders it.
- Crop to the useful content, avoid dimensions larger than the rendered need, and use an appropriate optimized format. Aim for no more than `500 KiB` per image; any image larger than `1 MiB` requires optimization or an explicit justification in the approval summary.
- Provide specific alternative text and a useful caption or surrounding explanation.
- Do not create fake screenshots or placeholder images.

## 9. Security and Public-Safety Review

Before presenting a post for approval, inspect its Markdown, code blocks, links, and images for information that must not be public. At minimum, exclude:

- secrets, tokens, passwords, environment values, cookies, and authentication material;
- personal information, private contact details, and private or temporary URLs;
- sensitive local filesystem paths and machine-specific identifiers;
- raw internal prompts, hidden instructions, or private conversation details;
- exploitable security details that are unnecessary to explain the lesson;
- unlicensed third-party text, code, fonts, or images.
- unreleased features, product plans, or launch dates that have not been approved for public disclosure;
- client, contract, partnership, competitive, or internal strategy information even when it is not a technical secret;
- embargoed work or any project whose public scope has not been confirmed.

Use sanitized examples only when they preserve technical accuracy. If safe sanitization would make the post misleading, block the post and explain the issue.

## 10. Validation Before Approval

Treat every generated post as production content, not as a fixture.

1. Validate frontmatter against the current content schema.
2. Check internal links, follow-up links, code fences, headings, and image references.
3. Run the content/schema regression scope required by `AGENTS.md`, including the production build.
4. Run any additional tests needed to substantiate claims made in the post.
5. For posts containing screenshots or layout claims, inspect the rendered article and affected screen in the relevant viewport and theme.
6. Confirm that the normal production build contains the post but no test fixtures, secrets, or temporary QA captures.

A post is not publication-ready while any required validation is failing or unavailable without a clearly resolved reason.

The blog-specific regression scope covers content schema validation, the production build, links and assets, and tests needed to support claims in the post. It does not automatically expand to unrelated features. Handle pre-existing or unrelated repository failures under `AGENTS.md`, report them separately, and never relabel or hide them as blog-content failures.

## 11. User Review Gate

After the post files and optional assets are complete and validated, but before pushing, present all proposed posts together. For each post show:

- title;
- filename or slug;
- selected type, category, and tags;
- description and a concise content summary;
- the previous-stage link when it is a follow-up post;
- verification performed for claims or images that materially affect publication readiness.

Ask for explicit approval of the proposed posts. Do not run `git push` while approval is pending.

- If the user requests revisions, update the posts, rerun affected validation, and present the revised set again.
- If the user rejects a post, do not include it merely to satisfy this workflow. Reassess whether the rejection exposes missing facts that should block the push under section 6.
- One approval may cover the full proposed set when the user clearly approves all listed posts.
- If the user does not respond or the session ends, keep the generated files local and do not push. On the next request, rescan the scope, confirm that the proposed content has not changed, and request approval again.

## 12. Push Completion

After approval:

1. Reinspect the complete diff and Git status so no unrelated, generated, or sensitive file is included accidentally.
2. Ensure the approved post files and assets are included in the same requested push as the existing authorized changes. They may use separate commits when preserving history requires it, but must not be sent as a separate push.
3. Do not rewrite or discard existing user commits merely to combine the history.
4. Ensure every approved post has its topic and stage recorded in `docs/operations/blog-publication-ledger.md`.
5. Perform the requested push and report the branch, included posts, verification results, and any remaining limitations according to `AGENTS.md`.

If the push fails, preserve the generated posts, ledger entries, assets, and commits locally. Diagnose and report the exact rejection or conflict. Do not force-push, rewrite history, discard files, or select a merge/rebase strategy without the authority required by `AGENTS.md`. If recovery changes a post, its evidence, or its included source scope, rerun affected validation and obtain approval again. If a later session resumes the failed push, reconfirm approval even when the content appears unchanged.

The workflow is complete only when every valuable topic has either an approved post or a user-resolved reason for exclusion, all approved content is validated, and the requested push succeeds.
