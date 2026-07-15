# Personal Development Blog Design Plan v1.0

## 0. Document Information

| Item | Details |
|---|---|
| Document status | Final design plan incorporating user-approved decisions |
| Date | 2026-07-15 |
| Target | Local MVP for an Astro-based personal development blog |
| Source documents | `../planning/development-blog-plan-en.md`, `DESIGN-opencode.ai.md` |
| Design standard | Adapt OpenCode.ai's terminal aesthetic for a Korean development blog with a softer application |
| Implementation prerequisite | Approve the screen wireframes, key visual mockups, and `AGENTS.md` before implementation begins |

This document defines colors, fonts, layouts, responsive rules, component states, and screen composition. Service goals, content data structures, and feature scope follow the service and feature planning document, while implementation procedures and QA commands are defined separately in `AGENTS.md`.

### 0.1 Cross-Document Alignment Status

The following decisions were refined during item-by-item design approval and are now synchronized with the service and feature planning document.

- Categories are technical topics such as `AI Agents`, `Frontend`, `Backend`, and `Astro`, not post formats such as `Learning Notes`, `Problem Solving`, `Technical Articles`, and `Project Retrospectives`.
- The current MVP excludes email and contact features and provides only a GitHub link as an external contact method.

The service plan, this design plan, and `AGENTS.md` therefore use the same classification and external-contact rules. This section remains as the decision rationale rather than an override.

---

## 1. Design Concept

### 1.1 Core Direction

- Use OpenCode.ai's terminal and man-page aesthetic as the primary reference.
- Use a cream canvas, ink-colored text, monospaced English UI, ASCII brackets, and thin dividers as identity elements.
- Do not use shadows, gradients, glass effects, or decorative images.
- Because this Korean blog will also be read by recruiters and non-developer collaborators, prioritize body readability over strict adherence to the reference.
- Use the dark terminal hero only once on the home page, and do not repeat it in general content areas.
- Create hierarchy through spacing and alignment, without dimensional effects that make cards appear elevated.

### 1.2 Shape Principles

| Target | Corner radius | Presentation |
|---|---:|---|
| Post lists, sections, project cards, and body containers | `0px` | Separated by a background or 1px hairline |
| Buttons, badges, inputs, and code-copy buttons | `4px` | Small, restrained interactive forms |
| Profile image | Circular | Used only for the user profile |

Do not use the general card style with a `6–8px` radius.

### 1.3 ASCII Bracket Usage

Use `[+]`, `[-]`, and `[x]` only as brand markers that communicate screen structure.

**Use in**

- Primary section labels
- Post-type prefixes
- Table-of-contents expand/collapse controls
- Short status or empty-state headings

**Do not use in**

- General body paragraphs
- Markdown bulleted and numbered lists
- Every menu item, link, and button
- Repeated metadata

Brackets are not decoration. They must remain limited markers that make the information structure easier to recognize.

---

## 2. Typography

### 2.1 Font Stack

| Purpose | Primary font | Fallback fonts |
|---|---|---|
| English UI, ASCII elements, and code | Berkeley Mono | JetBrains Mono, IBM Plex Mono, `ui-monospace`, Consolas, monospace |
| Korean headings and body | Pretendard | `-apple-system`, BlinkMacSystemFont, "Segoe UI", "Noto Sans KR", sans-serif |

- Use Berkeley Mono only when a properly licensed webfont file is provided.
- Use JetBrains Mono as the first fallback in environments where Berkeley Mono cannot be provided.
- Do not force Korean text into a monospaced font.
- Keep code blocks and the terminal hero monospaced regardless of language.

### 2.2 Type Scale

| Role | Desktop | Mobile | Weight | Line height |
|---|---:|---:|---:|---:|
| Home hero | `38px` | `28px` | 700 | 1.5 |
| Post-detail title | `32px` | `26px` | 700 | 1.4 |
| Body H2 | `24px` | `22px` | 700 | 1.5 |
| Body H3 | `20px` | `19px` | 700 | 1.5 |
| Section label | `16px` | `16px` | 700 | 1.5 |
| Korean body | `17px` | `16px` | 400 | 1.8 |
| UI and buttons | `16px` | `16px` | 500 | 1.5 |
| Metadata and captions | `14px` | `14px` | 400 | 1.7 |
| Code | `15px` | `14px` | 400 | 1.7 |

- Limit the maximum width of Korean body text to `720px`.
- Apply separate overflow rules so long English URLs and code do not widen the layout.
- Do not rely on italics alone for emphasis; combine them with weight or structure.

---

## 3. Color and Theme

### 3.1 Base Color Tokens

| Token | Light | Dark | Purpose |
|---|---|---|---|
| canvas | `#fdfcfc` | `#201d1d` | Page background |
| ink | `#201d1d` | `#fdfcfc` | Headings and high-emphasis text |
| body | `#424245` | `#d5d2d2` | Body text |
| mute | `#646262` | `#aaa6a6` | Metadata and secondary text |
| surface-soft | `#f8f7f7` | `#2a2626` | Subtle secondary background |
| surface-card | `#f1eeee` | `#302c2c` | Code blocks and input elements |
| hairline | `rgba(15,0,0,0.12)` | `rgba(255,255,255,0.14)` | Default dividers |
| hairline-strong | `#646262` | `#aaa6a6` | Selected states and strong dividers |
| accent | `#005fcc` | `#6ea8ff` | Links, focus, and selected states |
| success | `#18794e` | `#32d583` | Success and completion |
| warning | `#8a4b00` | `#f5a524` | Caution and in-progress status |
| danger | `#b42318` | `#ff6b6b` | Errors and failure |

- Keep general screens visually monochromatic, centered on canvas and ink.
- Do not use status colors decoratively.
- Do not communicate status through color alone; pair it with text such as `Complete`, `Warning`, or `Error`, or with an icon.
- During implementation, only finalize token values that pass WCAG 2.2 AA contrast checks.

### 3.2 Theme Behavior

1. On the first visit, follow the operating system's light or dark preference.
2. When the user activates the theme button, switch between light and dark modes.
3. Save the user's choice in the browser and preserve it across refreshes and return visits.
4. If a saved choice exists, prioritize it over the operating-system setting.
5. Apply the theme before initial rendering to prevent a momentary color inversion.
6. The accessible name of the theme button describes the action it will perform. Example: `Switch to dark mode`.

### 3.3 Code Syntax-Highlighting Palette

| Role | Light | Dark |
|---|---|---|
| Code background | `#f1eeee` | `#302c2c` |
| Default code | `#201d1d` | `#fdfcfc` |
| Comments | `#646262` | `#aaa6a6` |
| Keywords and functions | `#005fcc` | `#6ea8ff` |
| Strings | `#18794e` | `#6ee7a0` |
| Numbers and constants | `#8a4b00` | `#ffc66d` |
| Error emphasis | `#b42318` | `#ff6b6b` |

- Use a limited set of syntax colors and avoid rainbow-like presentation.
- Do not automatically wrap long code; make it horizontally scrollable.
- Tokens and code structure must remain understandable without color.

---

## 4. Layout and Responsive Design

### 4.1 Width and Spacing

| Item | Value |
|---|---:|
| Maximum overall content width | `1100px` |
| Maximum body width for general pages | `960px` |
| Maximum post-detail body width | `720px` |
| Post-detail table of contents | Approximately `200px` |
| Gap between TOC and body | `40px` |
| Desktop horizontal padding | `32px` |
| Tablet horizontal padding | `24px` |
| Mobile horizontal padding | `16px` |

### 4.2 Section Rhythm

- Desktop: `96px` between primary sections
- Tablet: `64px` between primary sections
- Mobile: `48px` between primary sections
- Use an 8px-based `4 / 8 / 12 / 16 / 24 / 32px` system for spacing within components.

### 4.3 Breakpoints

| Range | Width | Primary change |
|---|---|---|
| desktop-large | `1280px+` | Maximum-width layout with a sticky TOC on the left |
| desktop | `1024–1279px` | Preserve the desktop structure |
| tablet | `851–1023px` | Reduce horizontal padding and section spacing |
| tablet-compact | `769–850px` | Convert the TOC into a collapsible section above the body |
| tablet-narrow | `641–768px` | Convert the top navigation into a mobile menu |
| mobile | `640px and below` | Fully single-column layout with reduced hero and type sizes |

The minimum review width is `360px`.

---

## 5. Shared Navigation Areas

### 5.1 Top Navigation

- Use a `56px` height, canvas background, and 1px bottom hairline.
- Fix it to the top of the viewport and reserve layout space so it does not cover the body.
- Display the blog name `DEV.LOG` on the left.
- On desktop, display `Home · Categories · Tags · Projects · About` on the right.
- Place the light/dark theme button at the far right.
- Indicate the current page through font weight and an underline. Do not add brackets.
- Reveal a `Skip to content` link on keyboard focus for direct access to the body.

**Mobile**

- Display only the blog name, theme button, and menu button at the top.
- Activating the menu button expands the full menu.
- When the menu opens, communicate the expanded state to assistive technology and allow it to close with `Esc`.
- Return focus to the menu button when the menu closes.

### 5.2 Footer

- Use a 1px top hairline and `32px` internal padding.
- Display `DEV.LOG` and a one-line introduction.
- Provide `GitHub · Projects · About` links.
- Do not implement email or contact features in the current MVP.
- Do not display external links without actual URLs.
- Display the copyright year and real name at the bottom.
- On mobile, arrange links vertically, one per line.
- Privacy Policy and Terms of Service are outside the scope of the current local MVP.

---

## 6. Visual Distinction of Content Classifications

Keep the roles of content types, categories, and tags distinct and non-overlapping.

| Classification | Meaning | Examples | Default presentation |
|---|---|---|---|
| Content type | Post format | Learning Notes, Problem Solving, Technical Articles, Project Retrospectives | Bracket prefix before the title |
| Category | Primary technical topic | AI Agents, Frontend, Backend, Astro | Metadata or filter tab |
| Tag | Specific technology or keyword | Codex, TypeScript, Accessibility | Text link below the body |

- Each post uses one content type and one category.
- Multiple tags are allowed.
- The home-page filter operates by category.
- Content type does not affect sort order.

---

## 7. Page-Specific Design

### 7.1 Home

**Content order**

1. Dark terminal hero
2. Blog introduction
3. Category filter
4. Latest-post list
5. Empty post state

**Dark terminal hero**

- Express the user's real name or identity in a `$ whoami` format.
- Use the direction, `A full-stack developer who uses AI agents to turn ideas into real services`, for the core statement.
- Use surface-dark for the background and cream for the text.
- Use ASCII elements and monospaced English while rendering Korean descriptions legibly in Pretendard.
- Keep the first screen complete even with no posts by making the hero independent of post data.

**Initial state with no posts**

- Display the hero and introduction normally.
- Hide the category filter when there are no posts.
- Display `[+] Preparing new entries` where the post list would appear.
- Use the following guidance.

> No posts have been published yet.  
> New learning notes are being prepared.

- Do not display sample posts, fabricated entries, or inactive category buttons.
- Automatically display the category filter and latest-post list when the first post is added.

### 7.2 Post List Card

```text
[Learning Note] Planning a Blog with AI Agents
2026-07-15 · AI Agents · 5 min read
Summary text appears on no more than two lines.
```

- Display the type prefix and title in the first area.
- Limit the title to two lines and the summary to two lines.
- Keep the date, category, and reading time on one line by default, while allowing wrapping on mobile.
- Sort the list by publication date in descending order, regardless of content type.
- Separate cards through hairlines and spacing without adding card backgrounds or shadows.
- Extend the title link's activation area across the entire card without creating nested links.
- Strengthen the hairline on hover and keyboard focus.
- Preserve visually truncated titles and summaries in accessible names and the source data.

### 7.3 Post Detail

```text
┌────────────────┬──────────────────────────────────┐
│ [+] Contents   │ Type · Category                  │
│ Introduction   │ Title                            │
│ Design Rules   │ Published · Updated · Read time  │
│ Conclusion     │ Body                             │
│                │ Tags                             │
│                │ Previous / Next Post             │
│                │ Related Posts                    │
└────────────────┴──────────────────────────────────┘
```

**Table of contents**

- On desktop, always display it as an approximately `200px` sticky sidebar on the left.
- Do not hide the TOC container when the body has zero or one heading.
- If there are no generated TOC items, display `No table-of-contents items.`
- Highlight the current section according to scroll position using font weight and a left border.
- At `850px` and below, convert it into a collapsible `[+] Contents` section below the post title and before the body.
- On tablet and mobile, start in the collapsed state by default.

If there are no posts at all, no post-detail page is generated; only the post empty state appears on the home page.

**Header and metadata**

- Row 1: Content type and category
- Row 2: Post title
- Row 3: Publication date, update date, and estimated reading time
- Place tags below the body.
- If no update date exists, hide both the item and its adjacent separator.

**Code blocks**

- Display the language name at the top left.
- Place a `Copy` button at the top right.
- After a successful copy, change the button label to `Copied` for two seconds.
- If copying fails, display `Could not copy` and allow the user to try again.
- If no language information exists, hide only the language-label area and retain the copy button.
- Use `15px` on desktop, `14px` on mobile, and a line height of `1.7`.
- Do not wrap long code; make it horizontally scrollable.
- Announce copy results both visually and to assistive technology.

**Previous and next posts**

- Link posts according to publication date.
- Display only existing posts as cards; do not create empty cards or disabled buttons.
- If a post exists on only one side, display only that card.

**Related posts**

- Prioritize posts with the same tags, then fill remaining slots with posts from the same category.
- Exclude the current post and display no more than three.
- Hide the entire section when there are no related posts.

### 7.4 Categories and Tags

**Category index**

- Sort by category name.
- Display each category's post count.

**Tag index**

- Sort tags by descending post count.
- Break ties alphabetically.
- Display each tag's post count.

**Detail list**

- Display posts in the selected category or tag in reverse chronological order.
- Do not provide separate sort or filter controls in the initial MVP.
- Display empty-state guidance on index pages with no items at all.
- Do not generate detail pages for individual categories or tags with no posts.

### 7.5 Project List

- Display the project name, one-line summary, status, role, and key technologies.
- Do not add shadows or large radii merely because the item is a card.
- Communicate status using both color and text.
- Use the entire card as the primary link to the internal project detail page.
- Display the actual `Personal Development Blog` as the first project.

### 7.6 Project Detail

Provide a specification sheet at the top with the feel of `cat project.json`.

| Order | Field | Display rule |
|---:|---|---|
| 1 | Status | Required; use both text and status color |
| 2 | Development period | Display the start and end dates, or indicate that work is ongoing |
| 3 | Role | Display the user's actual role |
| 4 | Key technologies | Summarize only the primary technologies |
| 5 | GitHub | Display only when a URL exists |
| 6 | Demo site | Display only when a URL exists |

- Use a two-column information table on desktop and one column on mobile.
- Align English field labels in a monospaced font.
- If repository and demo URLs are absent, completely hide the corresponding rows and buttons.
- Below the specification sheet, arrange narrative content in this order: `Background → Goals → Role → Key Features → Problem Solving → QA Results → Retrospective`.

**Project images**

- Keep the representative image optional.
- Display actual screenshots at a large size fitted to the body width.
- Provide a screen description and caption below each image.
- Arrange multiple images vertically according to context.
- Exclude click-to-enlarge behavior and slide galleries from the initial MVP.
- Require alternative text for meaningful images.
- Maintain a complete information structure without images, and do not create fake placeholders.

### 7.7 About

- Display a profile image, real name, and primary introduction at the top.
- Use a two-column layout with image and introduction at the top on desktop; on mobile, use one column with the image above the introduction.
- Explain the body in this order: `Areas of Interest → How Technologies Are Used → AI Agent Collaboration`.
- Demonstrate the technology stack through projects and posts rather than gauges or proficiency bars.
- Place featured projects and posts at the bottom.
- Provide only a GitHub link as the external contact method in the current MVP.
- Do not implement email or contact features.
- Do not create temporary experience, metrics, links, or fabricated copy for items without factual information.

### 7.8 404 and Error States

- The 404 page provides `[x] Page not found` and a button that returns to Home.
- When a filter has no results, present it as an empty state rather than an error.
- For recoverable errors such as code-copy failure, provide a short, cause-neutral message and a retry method near the relevant component.
- If an image fails to load, preserve its alternative text and the document flow.
- Do not distinguish status messages through color alone.

---

## 8. Markdown Body Styles

| Element | Design rule |
|---|---|
| H2 and H3 | Clearly distinguish them through size and weight, with generous top spacing |
| Paragraphs | Use `17px/1.8` by default and preserve spacing between paragraphs |
| Links | Use both the accent color and an underline |
| Inline code | Use a surface-card background, monospaced font, and `4px` radius |
| Blockquotes | Use a 2px left border, indentation, and body color |
| Lists | Use standard bullets and numbers; do not use ASCII brackets |
| Tables | Use 1px dividers, emphasize header weight, and support horizontal scrolling on mobile |
| Images | Scale to fit the body width and provide captions and alternative text |
| Horizontal rules | Use only a 1px hairline |

- Exclude footnotes and a separate callout component from the initial MVP.
- Break long URLs at suitable points.
- Give tables and code blocks their own scroll areas so they do not widen the entire mobile layout.

---

## 9. Components and States

### 9.1 Reference Component Mapping

| Reference component | Blog application |
|---|---|
| `hero-tui-mockup` | Home `$ whoami` hero |
| `primary-nav` | Fixed top navigation |
| `button-tab` / `button-tab-active` | Home category filter |
| `badge-news` | Structural reference for post-type labels |
| `list-row` | Post lists and related posts |
| `faq-row` | Collapsible tablet/mobile TOC |
| `install-snippet` | Base surface for code blocks |
| `footer-section` | Concise footer for a personal blog |
| `hairline` | Dividers between sections and rows |

### 9.2 New Components

- Post-list card
- Sticky desktop TOC
- Collapsible tablet/mobile TOC
- Code-language label and copy button
- Empty state
- Previous and next posts
- Related posts
- Theme-switching button
- Project specification sheet
- Project-status badge
- Mobile menu
- 404 state

### 9.3 Interaction States

- On hover, change only the color or a 1px border.
- For active states, darken the background or text by one step.
- Provide a 2px accent outline with adequate separation for `:focus-visible`.
- Do not make cards rise or scale up.
- Limit the default transition duration to approximately `150ms`.
- Use only short transitions for expanding menus and the TOC.
- Remove unnecessary animation when the operating system's `prefers-reduced-motion` setting is active.
- A minimum target size of `44×44px` is recommended for buttons and menu items.

### 9.4 Icon Principles

- Use approved ASCII brackets for structural markers.
- Use simple line icons only when necessary to understand a function, such as theme, menu, copy, or external-link actions.
- Do not use decorative icons or emoji.
- Icon-only buttons must have an accessible name that is visually hidden.
- Use the same shape and size for icons representing the same function across all pages.

---

## 10. Accessibility

The target level is WCAG 2.2 AA.

- Maintain a minimum contrast ratio of 4.5:1 for normal text and 3:1 for large text and UI boundaries.
- Every feature must be usable with a keyboard alone.
- Focus order must match the visual reading order.
- Display a clear 2px accent outline only for `:focus-visible`.
- Provide a `Skip to content` link at the top.
- Use one H1 per page and do not skip heading levels.
- Provide alternative text for meaningful images and exclude decorative images from assistive technology.
- Communicate copy results and menu expansion states to assistive technology.
- Do not represent current location, selected state, or errors through color alone.
- Content and functionality must remain intact when text is enlarged to 200%.
- Respect reduced-motion preferences.

---

## 11. Conditional Display Rules

- When there are no posts, hide the category filter and post list on the home page and display an empty state.
- When there are no posts at all, do not generate post-detail pages.
- When a post-detail page exists, always display the TOC container regardless of the number of headings.
- When `updatedAt` is absent, hide the update date and adjacent separator.
- When tags are empty, hide the tags area.
- When there are no related posts, hide the related-posts section.
- When no previous or next post exists, hide only the corresponding card.
- When `repoUrl` and `demoUrl` are absent, hide the corresponding rows and buttons.
- When no GitHub URL exists, hide GitHub links from the About page and footer.
- When no actual profile image exists, do not create a fake portrait.
- Exclude draft content from public lists and static-page generation.

---

## 12. Screen Mockup Scope

Review the following screens as wireframes and visual mockups before implementation.

The versioned low-fidelity deliverable is documented in [`development-blog-wireframes-v1.0-en.md`](./development-blog-wireframes-v1.0-en.md). It defines structural placeholders only; it does not approve or publish personal facts or production posts.

The key high-fidelity light/dark and desktop/mobile states are documented in [`development-blog-high-fidelity-mockups-v1.0-en.md`](./development-blog-high-fidelity-mockups-v1.0-en.md). They remain subject to final user approval and Figma synchronization.

1. Home — initial state with no posts
2. Home — state with posts and category filters
3. Post detail — desktop light mode
4. Post detail — mobile dark mode
5. Category and tag indexes
6. Project list
7. Project detail
8. About
9. Mobile menu
10. 404 page

Do not place sample posts on the initial production site. If list and detail states require design verification, use only test fixtures that are separate from deployed content.

---

## 13. Design Approval Criteria

The design stage is ready for approval when all of the following conditions are met.

- The OpenCode reference's terminal identity and the readability of Korean body text are both preserved.
- Brackets are used only for the defined structural markers.
- Text and status contrast passes the standards in both light and dark modes.
- The home page with no posts does not look like an error or unfinished screen.
- The post-detail TOC is displayed as defined regardless of the number of headings.
- Long titles, body text, code, tables, images, and URLs do not break the layout.
- Navigation, theme controls, TOC, and code copying work on desktop, tablet, and mobile.
- Keyboard navigation, focus, alternative text, and status guidance are included in the design.
- Links, contact details, content, and images that do not exist are not fabricated.
- Components, spacing, fonts, colors, and state presentation are consistent across screens.

---

## 14. Summary of Approved Decisions

| Topic | Decision |
|---|---|
| Korean font | Pretendard |
| English UI and code font | Berkeley Mono, with a JetBrains Mono-family fallback when unavailable |
| Content classification | Type is the post format, category is the technical topic, and tags are specific keywords |
| Corners | `0px` for content containers and `4px` for interactive elements |
| Brackets | Used only as limited markers for sections, types, TOC, and status |
| Table of contents | Always displayed on post-detail pages; collapsible above the body on small screens |
| Top navigation | Fixed `56px` navigation with a mobile menu |
| Footer | DEV.LOG, Projects, About, and GitHub; no contact feature |
| Theme | Follow the operating system on the first visit, then save the user's choice |
| Status colors | Used with text, with dedicated dark-mode values |
| Code highlighting | Limited semantic colors; horizontal scrolling for long code |
| Code blocks | Language label, copy button, and success/failure guidance |
| Empty post state | Hide filters and display only factual guidance |
| Categories and tags | Fixed ordering rules without additional sorting UI in the MVP |
| Post list | Two-line title, two-line summary, reverse chronological order |
| Previous, next, and related posts | Conditionally display only existing items |
| Project specification sheet | Status, period, role, technologies, and conditional external links |
| Project images | Optional, vertically arranged, with captions and alternative text |
| About | Narrative introduction and GitHub only; no contact feature |
| Body | Korean long-form-focused styles with mobile overflow handling for tables and code |
| Responsive design | `1100px` frame, `720px` body, and `96/64/48px` section rhythm |

---

## 15. Next Steps

1. Synchronize the prepared key high-fidelity states into the existing Figma file.
2. Review and approve the ten-screen structures and five key visual mockups.
3. Obtain final user approval for the design stage.
4. Implement the local Astro MVP according to the approved `AGENTS.md`.
5. Perform responsive, accessibility, and functional QA.

---

*This document is the final v1.0 version reflecting design decisions agreed with the user item by item. Use only the actual personal information, GitHub URL, profile image, and project facts provided and approved by the user.*
