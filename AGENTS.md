# Personal Development Blog Agent Work Guidelines

## 1. Purpose and Scope

This document defines implementation, verification, and reporting standards for every AI agent working in this repository. It applies to the repository root and all subdirectories. If a more specific `AGENTS.md` is added to a subdirectory, that document takes precedence within the subdirectory.

This document serves as the standard for implementation and QA from the moment the user approves it. Proposals that have not yet been approved must not be treated as implemented requirements.

## 2. Source Documents and Priority

Before starting work, read the following documents that are relevant to the change scope.

1. The user's current instructions
2. `docs/planning/development-blog-plan-en.md`
3. `docs/design/development-blog-design-plan-v1.0-en.md`
4. This `AGENTS.md`

Each document has the following responsibility.

- Service and feature plan: goals, feature scope, content structure, and completion criteria
- Design plan: visual system, layout, responsive behavior, component states, and accessibility presentation
- `AGENTS.md`: workflow, code and file rules, technology choices, testing, and result reporting

Do not arbitrarily combine conflicting requirements. The user's latest instructions take highest priority. The two planning documents were synchronized on 2026-07-15, and section `0.1 Cross-Document Alignment Status` of the design document records the rationale for the following current MVP rules.

- Content type is the format of a post, while categories are technical topics such as `AI Agents`, `Frontend`, `Backend`, and `Astro`.
- Use only GitHub as an external contact method when an actual URL has been provided. Exclude email and contact features.

If any other conflict would materially change the outcome or scope, stop implementation and report only the decisions that require user input.

## 3. Project Principles

- Implement the site as an Astro-based static site.
- Manage posts and projects as local Markdown or MDX through Astro Content Collections.
- Korean is the default language. Use English for URL slugs, code identifiers, and development filenames.
- Do not add posts to the initial production site. Do not create sample posts or fabricated learning logs.
- Record only user-verified facts in the first project, `Personal Development Blog`.
- Do not infer names, experience, achievements, dates, metrics, contact details, repository URLs, deployment URLs, or images.
- The site must build completely locally without external APIs, databases, CMSs, or runtime network requests.
- Use static HTML and CSS by default. Add browser JavaScript only when required for interactions such as theme switching, the mobile menu, the table of contents, and code copying.
- Accessibility, responsiveness, and performance are component completion criteria, not final-stage cleanup tasks.

## 4. Agent Autonomy

### 4.1 Work Allowed Without Separate Approval

Within the approved plan and current task objective, agents may autonomously perform the following work.

- Create folders and files, implement code, refactor, and fix errors
- Write content schemas, types, reusable components, and pure utilities
- Add local development dependencies and change configuration
- Write unit tests, E2E tests, accessibility checks, and test fixtures
- Run local servers and production builds, perform browser verification, and capture screenshots
- Update technical documentation and QA results required by the change scope

Do not escalate minor implementation choices to the user. Select the simplest option consistent with this document and the planning intent.

### 4.2 Work Requiring User Approval

Obtain explicit user approval before performing any of the following work.

- Expanding the MVP feature scope or removing a required feature
- External deployment, domain connection, repository publication, or pushing to a remote repository
- Using paid products, paid APIs, paid fonts, or services with recurring costs
- Connecting a database, CMS, analytics tool, comments, authentication, or an external backend
- Changes that affect personal information, contact details, secrets, or security policy
- Finalizing and publishing the user's actual experience, achievements, or project contribution scope as public content
- Introducing a UI framework other than Astro or changing the core technology stack

## 5. Standard Workflow

1. Review the relevant planning documents and the current repository state.
2. Classify the task as feature, design, content, configuration, or bug-fix work, and establish completion criteria.
3. For screens that require design approval, confirm that an approved mockup exists. If not, prepare the design-stage result before implementing the actual UI.
4. Preserve existing code and tests while implementing the smallest consistent change that satisfies the request.
5. Handle normal, empty, error, and boundary states during implementation.
6. Run static checks and automated tests appropriate to the change scope.
7. Verify functionality, keyboard use, theme behavior, and responsive layout in an actual browser.
8. Fix the cause of any failure, then rerun regression tests appropriate to the impact scope.
9. Report changes, verification results, remaining constraints, and items requiring user confirmation.

Do not report completion without verification. If a tool or environment issue prevents verification, distinguish it from a test failure and record the exact reason.

## 6. Technical Standards

### 6.1 Standard Tools

- Use only `npm` as the package manager and keep `package-lock.json` under version control.
- Record the selected Astro and Node.js versions in `package.json` under `engines` and in a version file when creating the project.
- Explicitly configure Astro for static output and do not add a server adapter.
- Use TypeScript and extend Astro's `strict` configuration.
- Use `astro check`, ESLint, and Prettier for code diagnostics.
- Use Vitest for unit tests of pure logic and Playwright for E2E tests of actual pages.
- Use Playwright and axe for automated accessibility checks. Manually inspect keyboard use and page zoom for items that cannot be automated.

### 6.2 Package Addition Criteria

Evaluate packages in the following order before adding one.

1. Can Astro, a standard browser API, or existing code solve the problem simply and safely?
2. Does it avoid unnecessarily increasing the static site's bundle size and client-side JavaScript?
3. Have maintenance status, license, security issues, and Astro compatibility been reviewed?
4. Is a package with the same role already installed?
5. Is it correctly classified as a production or development dependency?

Do not add UI frameworks, state-management libraries, CSS frameworks, or general-purpose utility libraries solely for convenience. When adding a package, include its purpose, impact, and verification results in the work report. Run the full QA suite after changing version ranges or updating dependencies.

## 7. Recommended Project Structure

Use the following structure as the baseline when creating the Astro project. Expand it only for a functional reason, and do not scatter files with the same purpose across multiple locations.

```text
/
├── AGENTS.md
├── astro.config.mjs
├── package.json
├── package-lock.json
├── tsconfig.json
├── eslint.config.js
├── playwright.config.ts
├── vitest.config.ts
├── public/
│   └── favicon and font files that require only static copying
├── src/
│   ├── assets/                 # Images and local assets processed by Astro
│   ├── components/
│   │   ├── content/            # Post lists, TOC, related posts, and code blocks
│   │   ├── layout/             # Header, footer, and page frame
│   │   ├── project/            # Project-specific components
│   │   └── ui/                 # Shared UI such as buttons, badges, and empty states
│   ├── content/
│   │   ├── posts/              # Actual post Markdown/MDX
│   │   └── projects/           # Actual project Markdown/MDX
│   ├── content.config.ts       # Collection loaders and schemas
│   ├── data/                   # Verified site and profile configuration
│   ├── layouts/                # Page and Markdown layouts
│   ├── lib/                    # Pure logic for sorting, classification, reading time, and so on
│   ├── pages/                  # File-based routes
│   ├── scripts/                # Small browser scripts that are strictly necessary
│   └── styles/
│       ├── tokens.css          # Color, spacing, font, and layout tokens
│       └── global.css          # Reset, global body, and accessibility defaults
└── tests/
    ├── e2e/
    ├── fixtures/               # Test data not exposed on the production site
    └── unit/
```

- Do not arbitrarily move or rename the currently approved documents in the repository root.
- Place only files that require no build transformation in `public/`. Place images requiring optimization in `src/assets/`.
- Place test fixtures in `tests/fixtures/` and ensure the normal build does not load them.
- Exclude generated artifacts such as `dist/`, `.astro/`, `coverage/`, `playwright-report/`, `test-results/`, and temporary QA captures from version control.

## 8. Content and Data Rules

### 8.1 Content Collections

- Explicitly define the `posts` and `projects` collections in `src/content.config.ts`.
- Load local Markdown/MDX through Astro's local glob loader and validate all frontmatter with schemas.
- Constrain dates, URLs, enums, and arrays in the schema instead of passing them through as loose strings.
- Treat schema errors as build failures. Do not conceal invalid production content with arbitrary defaults.
- Exclude draft posts from lists, classification pages, related posts, and static-detail-page generation.

### 8.2 Posts

- Required fields: `title`, `description`, `publishedAt`, `type`, `category`, `tags`, `draft`
- Optional fields: `updatedAt`, `status`
- Use the `YYYY-MM-DD` format for dates and handle them so the displayed date does not shift across time zones during sorting.
- Break ties in reverse-chronological sorting by English ID in ascending order so results remain deterministic across builds.
- Slugs and filenames may contain only lowercase English letters, numbers, and hyphens.
- Allow an empty tags array, but do not allow duplicates or leading and trailing whitespace.

### 8.3 Projects

- Required fields: `title`, `summary`, `status`, `startedAt`, `role`, `stack`
- Optional fields: `endedAt`, `repoUrl`, `demoUrl`, `relatedPosts`
- When an optional link is absent, do not render its row, button, or guidance text.
- The end date cannot be earlier than the start date.
- When related-post references exist, verify that they point to real, publicly available posts.

### 8.4 Separating Production Content from Fixtures

- Verify the empty state in a normal build where the actual `posts` folder is empty.
- Verify states with posts, long titles, code, tables, related posts, and previous/next posts using clearly identified test data in `tests/fixtures/`.
- Separate E2E into `empty` and `fixture` profiles running on different ports and build-output paths.
- Enable the fixture loader only in the test profile and make it inaccessible to a normal `npm run build`.
- Do not copy fixtures into the production content folder or include them in the final build output.
- Do not use actual personal information or secrets in fixtures.

## 9. Code Authoring Rules

### 9.1 TypeScript and General Formatting

- Indent with two spaces and use the Prettier configuration as the final formatting authority.
- Do not use `any`, unsupported type assertions, `@ts-ignore`, or unnecessary non-null assertions.
- Validate external input and frontmatter at boundaries, then use concrete types for internal logic.
- Do not duplicate the same logic across pages; extract it into pure functions under `src/lib/`.
- Do not leave unused code, commented-out code, or debug logs.
- Comments should explain a decision or an unavoidable constraint, not repeat what the code does.

### 9.2 Naming

- Astro components and types: `PascalCase`
- Functions, variables, and props: `camelCase`
- Constants: `UPPER_SNAKE_CASE` only when a value is truly a global invariant
- Routes, content files, CSS classes, and general assets: `kebab-case`
- Booleans: use prefixes that expose state, such as `is`, `has`, `can`, or `should`
- Event handlers: use names that reveal the action, such as `handleCopy` or `handleMenuToggle`

### 9.3 Astro Components

- Give each component one visual or behavioral responsibility.
- Declare props with `interface Props`, clearly identifying optional values and defaults.
- Use server-rendered `.astro` components by default. Do not add framework islands without an approved need.
- Prefer semantic HTML. Do not create clickable `div` elements, nested links, or invalid heading order.
- When an entire card is a link, use one primary-link structure and do not nest other links inside it.
- When a conditional value is absent, do not leave empty wrappers, empty separators, disabled buttons, or fake `Coming soon` links.

### 9.4 CSS and Design Tokens

- Centralize values from the design document as semantic CSS custom properties in `tokens.css`.
- Do not repeat arbitrary numeric values for approved colors, spacing, or fonts inside components.
- Use a mobile-first approach while following the exact transition points in the design document.
- Account for `:focus-visible`, `prefers-reduced-motion`, 200% zoom, and horizontal overflow in every relevant component.
- Use global selectors only for genuinely global rules such as resets, tokens, base typography, and Markdown body styling.
- Do not add shadows, gradients, glass effects, large border radii, or decorative animations.

### 9.5 Browser JavaScript

- Split behavior into small modules and avoid global state and accumulated global events.
- Event listeners must not be registered more than once, and they must be cleaned up when necessary.
- Handle failure cases for local storage and clipboard access.
- Apply the saved theme choice or operating-system preference before the first render to prevent flashing.
- Communicate menu, table-of-contents, and copy states through appropriate ARIA states or live regions in addition to their visual presentation.

## 10. Required npm Commands

Once the project is created, provide commands with the following responsibilities in `package.json`. If there is a reason to rename a command, update this document at the same time.

| Command | Purpose |
|---|---|
| `npm ci` | Install dependencies that exactly match the lockfile |
| `npm run dev` | Run the local development server |
| `npm run build` | Generate the static production build |
| `npm run preview` | Preview the build output locally |
| `npm run check` | Run Astro and TypeScript diagnostics, failing on warnings or higher |
| `npm run lint` | Run ESLint static analysis |
| `npm run format:check` | Check Prettier formatting |
| `npm run test:unit` | Run Vitest unit tests once |
| `npm run test:e2e` | Run Playwright tests against empty and fixture production previews |
| `npm run test:a11y` | Run automated accessibility scenarios |
| `npm run qa` | Run check, lint, formatting, unit, E2E, and the final normal build |

- Configure Playwright `webServer` or an equivalent orchestrator so running `test:e2e` alone prepares separate static builds and previews for the empty and fixture profiles.
- Use a separate output path for fixture builds, and rerun a fixture-free normal `npm run build` at the end of `qa`.
- Run tests against production previews rather than the development server.
- Do not use unpinned `npx` commands that download one-off packages as part of the official verification workflow.
- The formatter may modify files during implementation, but final verification must use a check command that makes no changes.

## 11. Automated Test Standards

### 11.1 Unit Tests

At minimum, test the following pure logic and data boundaries.

- Post-publication eligibility, reverse-chronological sorting, and tie-breaking
- Category and tag aggregation and sorting
- Previous- and next-post calculation
- Related-post logic: exclude the current post, prioritize shared tags, supplement by category, and limit results to three
- Estimated-reading-time boundary values
- Conditional-display decisions for optional fields and links
- Schema failures for invalid dates, URLs, statuses, and frontmatter

When fixing a bug, add a test that reproduces the failure first whenever practical, then confirm that the test passes after the fix.

### 11.2 E2E Tests

At minimum, verify the following user flows.

- On a home page with no posts, the hero and empty state appear while the category filter is hidden.
- In fixture mode, posts appear in reverse chronological order and the category filter works.
- Category and tag index counts and detail lists are accurate.
- Users can navigate from the project list to project detail, and unavailable external links are not rendered.
- The theme follows the operating-system preference and persists after the user selects a theme and refreshes.
- The mobile menu opens and closes correctly, including `Esc`, focus return, and expanded state.
- The table of contents switches between sticky and collapsible according to viewport width, and heading links navigate correctly.
- Code-copy success and failure feedback are communicated both visually and to assistive technology.
- Previous, next, and related posts display only when the corresponding items exist.
- Users can return to Home from the 404 page.
- Every internal link is valid and the browser console contains no errors.

E2E selectors should use roles, labels, headings, and stable `data-testid` values rather than style classes or DOM order. Add `data-testid` only when the element cannot be distinguished through a user-oriented selector.

## 12. Manual QA Checklist

### 12.1 Browsers and Responsive Layout

- During development, verify the affected scope in Chromium.
- For final QA, test Chromium, Firefox, and WebKit.
- Standard review widths are `360px`, `768px`, and `1280px`.
- When modifying layout transitions, also test the `640/641`, `768/769`, `850/851`, `1023/1024`, and `1279/1280px` boundaries.
- Check every major page in both light and dark modes.
- Confirm that long titles, long URLs, code, tables, and images do not create page-level horizontal scrolling.

### 12.2 Accessibility

- Target WCAG 2.2 AA and maintain zero serious or critical axe violations.
- Verify contrast ratios of at least 4.5:1 for normal text and 3:1 for large text and UI boundaries.
- Every link and the skip link, menu, theme control, filters, table of contents, and copy control must be operable with a keyboard alone.
- Focus must not be hidden or disappear, and visual order must match navigation order.
- Each page has one H1 and does not skip heading levels.
- Meaningful images have specific alternative text, while decorative images are hidden from assistive technology.
- Information and functionality remain available at 200% zoom, with reduced motion, and without color.
- Do not communicate current location, state, success, or failure through color alone.

### 12.3 Performance and Static Output

- Inspect representative pages in the production preview with Lighthouse mobile.
- Target scores are Performance 90 or higher, Accessibility 100, Best Practices 95 or higher, and SEO 90 or higher.
- If a target is missed, record the cause and inspect images, fonts, JavaScript, and render-blocking resources first.
- Confirm that the build output contains no server-only code, test fixtures, source maps, secrets, or unnecessary large assets.
- With JavaScript disabled, document content and basic navigation links must remain readable and usable. Interactive features must retain understandable default states.

## 13. Regression Tests by Change Type

| Change type | Minimum regression scope |
|---|---|
| Documentation only | Check links, terminology, and conflicts |
| Pure utility | Related unit tests, check, lint, and formatting |
| Content or schema | Schema-failure tests, sorting and classification unit tests, and build |
| Individual component | Related unit/E2E tests, keyboard, light/dark modes, and 360/1280px |
| Shared layout or tokens | All major pages, all standard widths, both themes, and accessibility checks |
| Navigation, theme, TOC, or copy | Related E2E tests, keyboard, state communication, and all three browsers |
| Astro, package, or build configuration | Full `npm run qa` and build-output inspection |
| Bug fix | Reproduction test, directly affected functionality, and regression tests for shared dependency paths |

Do not weaken assertions, accessibility rules, type checks, or lint rules without justification merely to make tests pass. Do not dismiss a flaky test by rerunning it; identify and stabilize the cause.

## 14. Security, Privacy, and Prohibited Work

- Do not record `.env` values, tokens, passwords, personal email addresses, or private URLs in source code or screenshots.
- Use `PUBLIC_` environment variables only for values that may be exposed in the browser.
- If `.env.example` is needed, provide only variable names and descriptions, not values.
- Do not copy fonts, images, icons, or code with unverified licenses into the repository.
- Do not allow raw HTML or arbitrary script execution in Markdown by default.
- Render external links only when actual values exist, and apply a safe `rel` value to links that open in a new tab.
- Do not run deployment commands, push remotely, or connect domains, analytics, comments, or a CMS without user approval.
- Do not create actual user information, fabricated experience, fabricated project achievements, or realistic-looking posts for testing.
- Do not preimplement out-of-scope features merely because they may be useful later.
- Do not swallow errors, add empty `catch` blocks, or add fallbacks that always succeed to conceal failures.

## 15. Work Result Reporting Format

When work is complete, report in the following order so the user can evaluate the result without reading the code directly.

1. **Result summary**: What was completed, in one to three sentences
2. **Key changes**: User-visible behavior and important technical changes
3. **Verification results**: Commands or manual scenarios executed, with pass, fail, or not-run status
4. **Visual QA**: Browsers, viewport widths, themes, and any required capture paths
5. **Remaining items**: Known constraints, unverified items, and the reasons
6. **User confirmation**: Items only the user can decide, such as actual personal information, content facts, or approval of a major stage

Do not report only a summary such as `all passed` under verification results. Include the checks executed and their scope. When a failure occurs, separately report the failed item, observed impact, and next action.

## 16. Definition of Done

An individual task is complete only when all of the following conditions are met.

- The request and approved planning scope are satisfied.
- Normal, empty, error, and boundary states are handled.
- Code, content, and UI follow this document's rules.
- Automated tests and manual QA appropriate to the change scope pass.
- The production build succeeds without new warnings or console errors.
- Functionality is preserved across accessibility requirements, responsive layouts, and both themes.
- The production site contains no fixtures, fabricated information, secrets, or unnecessary generated artifacts.
- Changes and verification evidence are reported from the user's perspective.

The local MVP and final project are complete only when they satisfy the completion criteria in this document and both planning documents.
