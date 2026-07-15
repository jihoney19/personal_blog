1. Project Overview

| Item | Details |
|---|---|
| Project name | Personal Development Blog |
| Site purpose | Personal learning log and developer portfolio |
| Core message | A full-stack developer who uses AI agents to turn ideas into real services |
| Primary audience | The owner, fellow developers, recruiters, and collaborators |
| Default language | Korean |
| Public profile scope | Real name and profile are public |
| Design planning | Colors, fonts, layouts, components, and screen mockups are documented separately |
| Technology stack | Astro-based static site |
| Current development scope | Local development and verification only, with no external deployment |

### 1.1 Core Goals

1. Record learning processes and problem-solving experiences without unnecessary burden.
2. Present technical reasoning and project experience as a portfolio.
3. Validate the ability to run a project using AI agents for planning, design, development, QA, and documentation.
4. Make posts and projects easy to add and manage through Markdown.

### 1.2 Project Success Criteria

- All required pages and features work correctly in the local environment.
- A polished empty state is provided even when there are no posts.
- A detail page for this development blog is provided as the first project.
- The user can approve the result through the UI and QA results without directly reviewing the code.
- Adding a new Markdown file automatically makes it appear in the relevant list and detail pages without additional page implementation.
- Both light and dark modes, as well as mobile and desktop layouts, are supported.

---

## 2. Roles and AI Agent Collaboration

### 2.1 User Responsibilities

The user serves as the project owner and final approver.

- Approve the project goals and overall direction
- Review and approve deliverables at each stage
- Provide personal information such as a real name, profile image, and introduction
- Perform the final factual review of post and project content
- Approve significant changes involving external deployment, cost, or personal information processing

### 2.2 AI Agent Responsibilities

The AI agent takes the lead on the following work.

- Refine requirements and maintain planning documents
- Design the information architecture and screen flows
- Design and implement the UI
- Develop the Astro project structure and features
- Test, fix errors, and perform regression verification
- Write technical and operational documentation
- Suggest learning topics and manage their priority
- Draft learning notes, technical articles, and project posts
- Verify code examples and technical facts

### 2.3 Operating Principles and Document Boundaries

- The AI agent performs detailed work within an approved stage, while the user approves the outcome of each major stage.
- Significant scope changes, public release, costs, security concerns, and privacy issues require separate approval.
- AI-generated content is used only after the user confirms that it matches their actual experience.
- Experiences, achievements, metrics, and links that do not exist must not be invented.
- Coding conventions, file structure, workflows, test methods, QA checklists, and reporting formats are defined in a separate `AGENTS.md`, not in this document.

### 2.4 Approval Gates by Stage

| Stage | Primary deliverables | Approval criteria |
|---|---|---|
| 1. Planning | Planning document, site structure, feature scope, and completion criteria | Goals and scope are clear, with no critical requirements omitted |
| 2. Design | Separate design plan and mockups for key screens | The direction and screen composition defined in the design document are appropriate |
| 3. Local MVP | Locally functioning site and core features | Content management, navigation, and theme switching work as required |
| 4. Final version | Full QA results and completed fixes | Functional, responsive, accessibility, and performance verification passes |

During a stage, additional approval is requested only when user judgment is required, such as for expanded scope, costs, security, or privacy concerns.

---

## 3. Site Structure

```text
Home
├── Blog introduction
├── Category filter
├── All posts in reverse chronological order
└── Empty-state guidance when there are no posts

Post Detail
├── Title, summary, publication date, and update date
├── Content type, category, and tags
├── Markdown body
├── Table of contents
├── Code syntax highlighting and copy button
├── Previous and next posts
└── Related posts

Categories
└── Post list and post count for each category

Tags
└── Post list and post count for each tag

Projects
├── Project list
└── Project detail
    ├── Overview and goals
    ├── Development period and status
    ├── User and AI agent roles
    ├── Technology stack and selection rationale
    ├── Key features
    ├── Problem-solving process
    ├── Results and retrospective
    └── Repository, deployment URL, and related posts

About
├── Real name and profile image
├── One-line introduction
├── Areas of interest and technology stack
├── How AI agents are used
├── Featured projects and posts
└── GitHub and contact methods
```

### 3.1 Top Navigation

`Home`, `Categories`, `Tags`, `Projects`, and `About` are provided as the primary navigation items. Light and dark mode controls must also be accessible from the navigation area. Their exact placement and presentation are decided during design planning.

---

## 4. Detailed Page Plan

### 4.1 Home

- Display all posts together in reverse chronological order.
- Each list item displays its title, publication date, content type, category, summary, and estimated reading time.
- Content types are distinguished by labels but do not affect display order.
- Provide a short introduction explaining the blog's purpose and a category filter at the top.
- Do not include any posts in the first local version.
- When there are no posts, display the following guidance.

> No posts have been published yet.  
> New learning notes are being prepared.

### 4.2 Post Detail

- Display the title, description, publication date, update date, content type, category, and tags.
- Provide a table of contents that helps readers track their position in long posts and navigate to headings.
- Code blocks include syntax highlighting, a language label, and a copy button.
- Support horizontal scrolling so long code and tables do not break mobile layouts.
- Provide related posts based on shared tags or category.
- Link previous and next posts according to publication date.

### 4.3 Categories and Tags

- A category represents the primary topic of a post, and each post uses one category.
- Tags represent technologies and more specific topics, and each post may use multiple tags.
- Display the number of posts assigned to each category and tag.
- Do not generate pages for categories or tags with no posts.

Initial category candidates are as follows.

- Learning Notes
- Problem Solving
- Technical Articles
- Project Retrospectives
- AI Agents

### 4.4 Project List

- Provide the project name, one-line summary, status, role, and key technologies.
- Each item links to an internal project detail page.
- Register `Personal Development Blog` as the first project.

### 4.5 Project Detail

Every project uses the same detail-page structure. The AI agent drafts the content, and the user approves it.

- Project background and the problem being addressed
- Goals and primary users
- Development period and current status
- The user's role and scope of contribution
- Work performed by the AI agent
- Technologies used and the reasons for choosing them
- Core features and screens
- Problems encountered during implementation and how they were resolved
- Testing and QA results
- Outcomes, shortcomings, and next improvements
- GitHub, deployed site, and related blog posts

The `Personal Development Blog` project is marked as `In Progress` during local development. If external links are unavailable, those items are hidden.

### 4.6 About

- Publish the user's real name and profile image.
- Use the following direction for the primary introduction.

> A full-stack developer who uses AI agents to turn ideas into real services

- Explain frontend, backend, full-stack, and AI/agent interests as one coherent narrative.
- Demonstrate capabilities through projects and related posts instead of merely listing technology names.
- Prefer a contact button rather than displaying an email address directly on the page.
- Obtain the user's actual name, photo, introduction, GitHub URL, and contact details during the design stage.

---

## 5. Content Operations Plan

### 5.1 Content Types

| Type | Purpose | Publication standard |
|---|---|---|
| Learning Notes | Short records of concepts, experiments, commands, and reference material | Short or still-organizing content may be published |
| Problem Solving | Turn actual errors and their resolution into reusable knowledge | Include the problem, cause, attempts, solution, and lessons learned |
| Technical Articles | Explain one technical topic with verified explanations and examples | Code and technical facts must be verified |
| Project Retrospectives | Record project goals, roles, decisions, outcomes, and improvements | Focus on actual experience and scope of contribution |

### 5.2 Content Principles

- All posts, including learning notes, appear together on the home page in reverse chronological order.
- Do not artificially expand a short note into a long article.
- Do not present unverified information as fact.
- Include source links when reference materials are used.
- Run or test code examples before publication whenever practical.
- Review AI-generated drafts so that they accurately reflect the user's actual learning and experience.

### 5.3 AI-Assisted Content Workflow

1. The AI suggests learning topics that fit current project progress and the portfolio composition.
2. Topics are prioritized by current skill level, practical value, and portfolio value.
3. Learning resources and practice assignments are prepared.
4. A draft is written based on the practice and project results.
5. Code, links, and technical facts are verified.
6. The title, description, category, tags, and reading time are generated.
7. The user approves the accuracy of the experience and content.
8. Only approved posts are moved to published status.

### 5.4 Initial Content State

- Do not add posts to the first local version.
- Do not create sample posts or fabricated learning logs.
- Register only the actively developed `Personal Development Blog` under projects.

---

## 6. Content Data Structure

Use Astro Content Collections to manage posts and projects as Markdown or MDX files. Data fields are validated through schemas during development.

### 6.1 Post Fields

| Field | Required | Description |
|---|---|---|
| `title` | Yes | Post title |
| `description` | Yes | Summary used in lists and search metadata |
| `publishedAt` | Yes | Initial publication date |
| `updatedAt` | No | Date of a substantial content update |
| `type` | Yes | Learning Notes, Problem Solving, Technical Articles, or Project Retrospectives |
| `category` | Yes | One primary category |
| `tags` | Yes | List of detailed topic tags; an empty array is allowed |
| `draft` | Yes | Whether the post is a draft |
| `status` | No | A label such as Learning, Needs Verification, or Complete |

URLs use lowercase English letters and hyphens based on the filename or a separate slug. Body content and the user interface are provided in Korean.

### 6.2 Project Fields

| Field | Required | Description |
|---|---|---|
| `title` | Yes | Project name |
| `summary` | Yes | One-line summary |
| `status` | Yes | Planning, In Progress, Complete, or Maintenance |
| `startedAt` | Yes | Start date |
| `endedAt` | No | End date |
| `role` | Yes | The user's role |
| `stack` | Yes | List of key technologies |
| `repoUrl` | No | Source repository URL |
| `demoUrl` | No | Deployment URL |
| `relatedPosts` | No | List of related posts |

When a link value is unavailable, hide the corresponding UI instead of displaying an empty button or a placeholder link.

### 6.3 URL and Slug Rules

- Slugs use only lowercase English letters and hyphens (`-`), with the filename used as the slug by default.
- When necessary, a separate `slug` field may be specified in the content file's frontmatter to separate the filename from the URL.
- Post detail: `/posts/{slug}`
- Project detail: `/projects/{slug}`
- Category: `/categories/{category-slug}`
- Tag: `/tags/{tag-slug}`
- Korean category and tag names use English slugs in URLs and Korean display names in the UI. (Example: `Learning Notes` → `/categories/learning-notes`)
- Once a slug has been deployed, it should not be changed arbitrarily.

### 6.4 Reading-Time Calculation

- Calculate reading time for Korean text at approximately 500 characters per minute, including spaces.
- Exclude code blocks from the body character count and add 15 seconds for each code block.
- Round the result up to the next whole minute and display it as `N min`, with a minimum of `1 min`.
- Generate the value automatically at build time by parsing the Markdown/MDX body; do not enter it separately in frontmatter.

---

## 7. Core Features and Scope

### 7.1 Features Included in the Local MVP

| Feature | Priority | Completion criteria |
|---|---|---|
| Astro project setup | Required | Local execution and production builds complete without errors |
| Markdown-based post management | Required | Adding a file generates the corresponding list and detail pages |
| Project management | Required | Project list and detail pages are generated |
| Reverse-chronological post list | Required | All published posts appear in descending publication-date order |
| Empty state | Required | Guidance and a valid layout appear when there are no posts |
| Categories and tags | Required | Lists and post counts for each classification are accurate |
| Code syntax highlighting | Required | Code in supported languages is presented clearly |
| Code copying | Required | Activating the button copies the code and communicates the result |
| Table of contents | Required | Generated automatically from body headings |
| Light and dark modes | Required | Both operating-system preference and user selection are supported |
| Theme persistence | Required | The selected theme persists after a refresh |
| Responsive design | Required | Layout remains intact on mobile, tablet, and desktop |
| About page | Required | Can display the real name, profile, introduction, technologies, and links |
| Related posts | Recommended | Posts with the same tags or category appear according to the rules |
| Previous and next posts | Recommended | Publication-date-based navigation works correctly |
| Basic SEO structure | Recommended | Provides an extensible structure for titles, descriptions, and canonical URLs |

### 7.2 Future Development

- Full-text search
- Comments using Giscus or a similar service
- Archives by year and month
- Applying and verifying the actual deployment URL for the RSS feed
- Automatic OG image generation
- Visitor analytics and privacy notices
- External hosting and deployment automation
- Purchasing and connecting a personal domain

### 7.3 Currently Excluded

- Public release and production-server deployment
- Domain purchase
- Admin pages and a web-based authoring interface
- Login and account management
- Database
- English and multilingual site support
- Initial sample posts

---

## 8. Boundary with Design Planning

This document defines the service goals, content structure, feature scope, data structure, and completion criteria. Visual and screen design is documented and approved separately in `../design/development-blog-design-plan-v1.0-en.md`.

### 8.1 Required Design Conditions Defined Here

- Support both light and dark modes.
- Core features must be usable on mobile, tablet, and desktop.
- Korean body text, code, tables, and long links must remain readable.
- Present the absence of posts as a normal empty state, not an error.
- Meet baseline accessibility requirements such as keyboard navigation, color contrast, and alternative text.

### 8.2 Items Decided in the Separate Design Plan

- Design concept and reference images
- Color system and light/dark theme palettes
- Korean body and code fonts
- Grid, content width, spacing, and responsive rules
- Component forms for the header, post list, buttons, tags, and code blocks
- Screen designs for home, post detail, project list/detail, and About pages
- Empty states, error states, focus, and feedback presentation
- Screen-specific mockups and design approval criteria

After the functional plan is approved, the AI agent drafts a separate design plan, and the user approves the overall direction for the design stage.

---

## 9. Technical Decisions and the Scope of `AGENTS.md`

### 9.1 Technical Decisions Confirmed in This Document

- Use Astro as the primary framework.
- Manage posts and projects as local Markdown or MDX content.
- Separate post and project data through Astro Content Collections.
- Produce a static site that can be run and verified locally.
- Exclude external deployment and integration with any specific hosting service from the current scope.

### 9.2 Items Defined in a Separate `AGENTS.md`

- AI agent workflow and autonomous work scope
- Project folder structure and file-placement principles
- Code style, naming conventions, and component authoring standards
- Package-addition and technology-selection criteria
- Run, build, static-analysis, and test commands
- Feature-specific test methods and QA checklists
- Browser, responsive, accessibility, and performance verification procedures
- Regression-test scope after bug fixes
- Reporting format for work results and verification evidence
- Prohibited actions, external-deployment restrictions, and secret-handling principles

`AGENTS.md` is planned and approved separately before coding begins. The AI agent then implements and performs QA according to those rules.

---

## 10. Review Targets and Completion Criteria

This document defines only the outcomes to review and the conditions for completion. Test tools, commands, detailed QA scenarios, inspection order, and evidence collection are defined separately in `AGENTS.md`.

### 10.1 Review Targets

- The home and navigation pages must render correctly even when there are no posts.
- After posts are added, reverse-chronological ordering and category/tag classification must be accurate.
- Users must be able to navigate from the project list to the development-blog project detail page.
- Missing repository and deployment links must not appear in the UI.
- Light and dark modes must work and preserve the user's choice.
- Core content and features must be usable on mobile, tablet, and desktop.
- Long titles, URLs, code, and tables must not obstruct content use.
- Keyboard navigation, document structure, alternative text, and color-contrast requirements must be met.
- Local execution and production builds must complete without errors.
- The complete result must be reviewable locally without external deployment or service connections.

### 10.2 Definition of Final Completion

The current project scope is complete when all of the following conditions are met.

1. Deliverables from all four stages receive user approval.
2. All required pages and local MVP features are implemented.
3. The home page looks complete and works correctly without posts.
4. The development-blog project detail page contains factual information.
5. QA defined in the separate `AGENTS.md` is completed and the results are reported.
6. The production build succeeds.
7. The final local version is delivered without external deployment.

---

## 11. Planned Work Sequence

1. Approve this planning document
2. Create a separate design planning document
3. Create a separate `AGENTS.md`
4. Design the content schema and screen-specific information architecture
5. Create design mockups and approve the design stage
6. Implement the local Astro project according to `AGENTS.md`
7. Write detailed content for the development-blog project
8. Perform QA and fix errors according to `AGENTS.md`
9. Approve the local MVP
10. Perform final QA and approve the final version
11. Develop search, comments, deployment, and domain features later with separate approval

---

## 12. Summary of Confirmed Decisions

| Topic | Decision |
|---|---|
| Blog purpose | Personal learning log and portfolio |
| Primary identity | Full-stack developer who uses AI agents |
| Framework | Astro |
| User role | Final approval at each major stage |
| AI role | Planning, design, development, QA, documentation, and content drafting |
| Design standards | Defined in a separate design planning document |
| Coding and QA standards | Defined in a separate `AGENTS.md` |
| Post visibility | Display all posts on the home page in reverse chronological order |
| Learning notes | May be published regardless of how complete the organization is |
| Projects | Provide internal detail pages |
| First project | Personal Development Blog |
| Initial posts | None |
| Language | Korean only |
| Profile | Real name and profile are public |
| Theme | Provide both light and dark modes |
| Comments | Future development |
| Search | Future development after enough posts accumulate |
| Deployment | Currently excluded; local development only |

---

*This document reflects the currently agreed service and feature scope for local development. Visual design is defined in a separate design planning document, while coding and QA procedures are defined in a separate `AGENTS.md`. External deployment, costs, personal information processing, and major feature-scope changes proceed only after separate user approval.*
