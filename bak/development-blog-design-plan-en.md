# Development Blog Design Plan (Draft)

> This document is a draft design direction based on `../planning/development-blog-plan-en.md` (service and feature planning) and `DESIGN-opencode_ai.md` (reference design system), refined through discussion with the user. It is not yet final; implementation begins only after further discussion, revision, and approval.

---

## 1. Design Concept

- **Reference**: The terminal aesthetic of the OpenCode.ai marketing site (Berkeley Mono, cream/ink flat colors, ASCII bracket bullets, and a fully flat system without shadows or gradients)
- **Application direction**: Adapt the reference **to the blog context** instead of copying it directly
  - Preserve the terminal aesthetic while **slightly softening it**. Recruiters and non-developer collaborators may also read the site, so retain its personality while lowering the barrier to entry.
  - Retain brackets (`[+]`, `[-]`) and ASCII elements as part of the identity.
  - Preserve generous whitespace (a 96px section rhythm), which contributes to an orderly appearance.
  - Consider softening the rigid feel by applying a subtle radius (6–8px under review) to cards instead of using only fully square (`0px`) containers.

### Undecided — Follow-up Discussion Required

- [ ] Exact radius for cards (`0px` vs. 6–8px)
- [ ] Guidelines for how frequently bracket markers may appear in body content

---

## 2. Color System

### 2.1 Light Mode (Reference Adopted As Is)

| Token | Value | Purpose |
|---|---|---|
| canvas | `#fdfcfc` | Background |
| ink | `#201d1d` | Primary text |
| ink-deep | `#0f0000` | Emphasized text |
| charcoal | `#302c2c` | — |
| body | `#424245` | Body text |
| mute | `#646262` | Secondary text |
| stone | `#6e6e73` | — |
| ash | `#9a9898` | Low-emphasis text |
| surface-soft | `#f8f7f7` | Secondary background |
| surface-card | `#f1eeee` | Card/code-block background |
| surface-dark | `#201d1d` | Dark surfaces such as the hero |
| hairline | `rgba(15,0,0,0.12)` | Dividers |
| accent | `#007aff` | Interactive emphasis (used minimally, such as on button hover) |
| warning / danger / success | `#ff9f0a` / `#ff3b30` / `#30d158` | Status indicators |

### 2.2 Dark Mode (New Design)

Extend the OpenCode reference's `surface-dark` (`#201d1d`) into the primary dark-mode background. Redesign dedicated dark-mode tones **instead of simply inverting colors**.

| Token | Light | Dark | Notes |
|---|---|---|---|
| canvas | `#fdfcfc` | `#201d1d` | Extend the existing surface-dark into the canvas |
| ink | `#201d1d` | `#fdfcfc` | |
| surface-soft | `#f8f7f7` | `#2a2626` | |
| surface-card | `#f1eeee` | `#302c2c` | Reuse the existing surface-dark-elevated value |
| body | `#424245` | `#c8c6c6` | Tone down from pure white to reduce glare |
| mute | `#646262` | `#9a9898` | Reuse the existing ash value |
| hairline | `rgba(15,0,0,0.12)` | `rgba(255,255,255,0.12)` | |
| accent | `#007aff` | `#0a84ff` | Slightly brighter against the dark background |

### Undecided — Follow-up Discussion Required

- [ ] Dark-mode values for warning, danger, and success
- [ ] Syntax-highlighting color palettes for light and dark modes

---

## 3. Typography

- **Headings/UI**: Keep Berkeley Mono, as in the reference.
- **Body (article content)**: Initially use Berkeley Mono throughout. If readability issues emerge with real content, consider separating the body font after review. This decision is deferred until real output can be evaluated.
- Adopt the existing type scale (`display-xl`, `heading-md`, `body-md`, and so on), with an expanded line height for body text if necessary.

### Undecided — Follow-up Discussion Required

- [ ] Final body-font decision (after initial content is produced)
- [ ] Code-block font size and line height (considering long-code readability)

---

## 4. Page Layouts

### 4.1 Home

**Content order**

1. **Dark terminal hero** — `$ whoami` style. Display only the name and a short tagline. Because it does not depend on content data, it remains stable in the initial state with zero posts.
2. **Introduction** — A separate text block expanding on the statement, "A full-stack developer who uses AI agents to turn ideas into real services."
3. **Category filter** — Reuse the `button-tab`/`button-tab-active` components (the existing install-method tab pattern).
4. **Post list** — Reverse chronological order; see the card design in 4.2.
5. **Empty state** — Guidance shown when there are no posts, using the exact copy from section 4.1 of the planning document.

### 4.2 Post List Card

```text
[Learning Note] Planning a Blog with AI Agents
                2026-07-15 · AI Agents · 5 min read
                Summary text appears here and is truncated when too long...
```

- Place the type label (Learning Note, Problem Solving, Technical Article, or Project Retrospective) as a **left bracket prefix**, reusing the `badge-news` component.
- Fixed three-line structure: ① type + title, ② date · category · reading time, ③ summary
- **Always display** the summary, including on mobile.
- Sort solely by publication date in descending order, regardless of type.

### 4.3 Post Detail

```text
┌────────────────┬──────────────────────────────┐
│ [+] Contents   │   Title / metadata             │
│ · Section 1    │   Body                         │
│ · Section 2    │   (code blocks, images, tables)│
│   - Subsection │                                │
│ · Section 3    │   Tags                         │
│                │   Previous / next post         │
│                │   Related posts                │
└────────────────┴──────────────────────────────┘
   ~200px TOC          ~720px body
```

- **TOC**: A sticky sidebar on the left that is always displayed, even when there are few headings, and highlights the current section while scrolling.
  - At tablet widths (`850px`) and below, replace the sidebar with a collapsible `[+] Contents` section above the body, reusing the bracket-toggle pattern from `faq-row`.
- **Body width**: Approximately `720px`, reduced from the original `960px` to provide a suitable line length for long-form reading.
- **Metadata**: First line contains the type badge and category; second line contains the publication date, update date, and reading time. Place tags below the body.
- **Code blocks**: Extend the `install-snippet` component with a language label and copy icon at the top.
- **Previous/next posts**: Two side-by-side cards below the body.
- **Related posts**: Two or three condensed list items below the previous/next cards.

### 4.4 Categories / Tags

- Display the number of posts for each category and tag.
- Do not generate a page for a category or tag with no posts (planning document section 4.3).
- Reuse the same post-list card component used on the home page.

### 4.5 Project List / Detail

- **List**: Card layout containing the project name, one-line description, status, role, and key technologies.
- **Detail**: The page with the greatest information density.
  - Place a **specification card** at the top (evoking `cat project.json`) that summarizes status, period, role, and technology stack at a glance.
  - Follow it with narrative sections for background, goals, role, problem solving, QA results, retrospective, and so on, maintaining the 96px section rhythm.
  - Hide the entire UI for missing links (`repoUrl`, `demoUrl`) as specified in section 6.2 of the planning document.

### 4.6 About

- Real name and profile image
- Primary introduction
- Areas of interest and technology stack, explained as a narrative rather than a list
- Links to featured projects and posts
- Prefer a button-based contact method instead of displaying an email address

### Undecided — Follow-up Discussion Required

- [ ] Exact field arrangement in the project-detail specification card
- [ ] Detailed About page layout (not yet discussed in detail)
- [ ] Whether the tag/category page header needs filter and sort controls

---

## 5. Reusable Component Mapping

| Reference component | Blog application |
|---|---|
| `hero-tui-mockup` | Home hero (`whoami`) |
| `button-tab` / `button-tab-active` | Category filter |
| `badge-news` | Post-type label |
| `list-row` (`[+]` bullet) | Foundation for post-list cards and condensed related posts |
| `faq-row` (bracket toggle) | Collapsible mobile TOC |
| `install-snippet` | Code block (with language label and copy button) |
| `hairline` divider | Dividers between sections throughout the site |

## 6. New Components (Not Present in the Reference)

- Table of contents (TOC) — sidebar and collapsible variants
- Code-copy button and language label
- Post-list card (three-line structure)
- Empty-state screen
- Previous/next post navigation
- Related-posts section
- Theme toggle switch
- Project specification card

---

## 7. Accessibility

- **Focus style**: The reference principle of flat focus with no halo is unfavorable for keyboard accessibility. Apply a **2px accent outline only for `:focus-visible`**, while preserving the existing flat style for mouse clicks. This balances brand tone with WCAG compliance.
- Follow the contrast, keyboard navigation, and alternative-text requirements in section 8.1 of the planning document, and verify them against `AGENTS.md` during the separate QA stage.

---

## 8. Responsive Design

Adopt the reference breakpoint system as the baseline, with an additional TOC transition rule for post-detail pages.

| Range | Width | Primary change |
|---|---|---|
| desktop-large | 1280px+ | Default; display the TOC sidebar |
| tablet | 850px | Replace the TOC sidebar with the collapsible section above the body |
| tablet-narrow | 768px | Replace the top navigation with a hamburger drawer |
| mobile | 640px | Use a single column and reduce hero typography |

---

## 9. Next Steps

1. Discuss and decide the **undecided items** in this document in order.
2. Finalize the code syntax-highlighting palette.
3. Create actual screen designs, from wireframes to mockups.
4. After user approval, create `AGENTS.md` and proceed to implementation.

---

*This document is a draft and will continue to be updated through further discussion.*
