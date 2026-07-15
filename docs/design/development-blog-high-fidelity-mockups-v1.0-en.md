# Personal Development Blog High-Fidelity Mockups v1.0

## 0. Deliverable Information

| Item | Details |
|---|---|
| Status | Key visual mockups prepared for review; Figma synchronization pending tool availability |
| Date | 2026-07-15 |
| Scope | Five key light/dark and desktop/mobile states required before implementation |
| Source | `development-blog-design-plan-v1.0-en.md`, `development-blog-wireframes-v1.0-en.md` |
| Figma target | `Personal Development Blog — UI Planning` |
| Production content | No production posts or unverified personal facts |

These mockups refine visual hierarchy, typography, color application, spacing, dividers, interactive states, and responsive presentation. They use structural placeholders and clearly labeled test fixtures only.

## 1. Mockup Scope

1. Home — empty production state, desktop light
2. Home — posts and category filter, desktop light, test fixtures only
3. Post detail — desktop light with sticky TOC
4. Post detail — mobile dark with collapsed TOC and code-copy state
5. Mobile menu — open state with keyboard and ARIA behavior

The remaining project, taxonomy, About, and 404 screens continue to follow the approved low-fidelity structures and shared visual system. Their implementation must reuse the same tokens and components rather than introduce new patterns.

## 2. Visual System Applied

- Cream canvas and ink text with a single dark terminal hero on Home
- Pretendard-compatible Korean body presentation and monospaced English UI/code
- `0px` content-container corners and `4px` interactive-control corners
- One-pixel hairlines instead of shadows or elevated cards
- Accent color only for links, focus, selection, and current TOC state
- Status colors paired with text
- `1100px` maximum frame, `720px` article body, and approximately `200px` desktop TOC
- Desktop/mobile section rhythm based on `96/64/48px`
- No gradients, glass effects, decorative images, large radii, or card-lift animation

## 3. Screen Review Notes

### 3.1 Home — Empty

- The terminal hero establishes identity without relying on post data.
- The introduction remains readable and independent of the hero treatment.
- The category filter is absent.
- The post region contains a calm empty state rather than inactive controls.
- GitHub remains conditional in the footer.

### 3.2 Home — Posts

- All sample rows are marked `TEST FIXTURE ONLY`.
- The selected category uses fill, border, text, and ARIA state.
- Post rows use spacing and hairlines without card backgrounds or shadows.
- Titles and summaries visually support two-line limits.
- Metadata can wrap without causing horizontal overflow.

### 3.3 Post Detail — Desktop

- The title, classification, and dates form a clear three-row header.
- The TOC remains visible as a sticky left column.
- The current TOC item uses text weight and a left border.
- Code uses a restrained semantic palette and an explicit copy control.
- Tags, previous/next navigation, and related posts remain independently conditional.

### 3.4 Post Detail — Mobile Dark

- The TOC appears below the article header and starts collapsed.
- The dark palette preserves readable body, metadata, link, divider, and focus contrast.
- Code scroll is local to the code region.
- Metadata and tag links wrap inside the content width.
- Only available previous/next navigation is rendered.

### 3.5 Mobile Menu — Open

- The menu button communicates the open state with its label and `aria-expanded`.
- Navigation links follow visual and keyboard order.
- `Esc` closes the menu and returns focus to the menu button.
- Hidden menu links are removed from the focus order.
- Reduced-motion users receive no nonessential expansion animation.

## 4. Figma Synchronization Status

The target file is [Personal Development Blog — UI Planning](https://www.figma.com/design/laGKS7QZIUIQ3WkQOtgu8a).

- Existing Figma pages: Overview and Foundations, Components, Wireframes
- Existing low-fidelity wireframes: ten
- Existing reusable component masters: ten
- Pending: synchronize these five high-fidelity states into the same file
- Constraint: the authenticated Starter plan reached its Figma MCP call limit during this stage

The local visual specification is complete enough for design review, but implementation approval should wait until the Figma synchronization and final visual check are complete or the user explicitly approves this deliverable as the design source of truth.

## 5. Approval Checklist

- [ ] Home empty state feels complete without posts or inactive filters.
- [ ] Home fixture state communicates category selection and post hierarchy clearly.
- [ ] Desktop post detail keeps the TOC and article relationship readable.
- [ ] Mobile dark post detail preserves contrast and local code overflow.
- [ ] Mobile menu makes keyboard, close, focus-return, and ARIA behavior clear.
- [ ] No personal facts, links, posts, dates, roles, or images are presented as verified when they are not.
- [ ] The five states are approved as the visual source for Astro implementation.
