# AI Usage Disclosure — FocusBoard

This document discloses how AI tools were used during the development of **FocusBoard** in accordance with the assignment's AI usage policy.

---

## 1. AI Tools Used

- **Google Antigravity** — Primary coding and verification assistant used inside the workspace to inspect the assignment PDF and reference PNGs, scaffold the React + Vite project, generate components, state logic, and custom CSS, run builds and Node verification checks, and perform automated Chromium checks across desktop, tablet, and mobile viewports.
- **ChatGPT** — Used by the developer outside the workspace to structure phase-by-phase prompt instructions, review plans, and frame verification criteria. *(Note: ChatGPT sessions occurred outside this workspace and are reported directly by the developer.)*

No other AI code-generation tools were verified in the project history.

---

## 2. Development Workflow & Developer Role

FocusBoard was built using a structured, phased, **AI-assisted, prompt-driven workflow (vibe coding)** rather than unstructured one-shot generation. Each phase required explicit developer approval before advancing.

The developer actively directed and verified the work across every stage:

- **Requirement analysis & scope lock:** Reviewed the Phase 0 requirements audit and made explicit design decisions before coding began (e.g., default task category handling, three status tabs, separating carousel slide percentages from calculated dashboard statistics, and preserving the mobile two-card statistics reference).
- **Prompt direction & phase gating:** Broke development into bounded phases (setup, state/persistence, desktop shell, task CRUD/filters/modals, responsive layouts, accessibility/QA, and targeted mobile compliance refinements).
- **Visual review against Figma references:** Directly inspected the running application in Google Chrome against the supplied desktop, mobile, form, and Focus Notes reference PNGs.
- **Defect identification & targeted corrections:** Caught real visual and functional discrepancies in the live app and issued targeted fix prompts.
- **Rejecting conflicting suggestions:** Rejected AI proposals that diverged from the Figma design or user-tested expectations.
- **Code review & Git safety:** Required read-only diff reviews before commits, enforced strict preservation rules, and safely recovered from an accidentally created untracked documentation draft without altering tracked files or rewriting Git history.

---

## 3. AI-Assisted Areas

AI assistance was used across:

- Project scaffolding (`package.json`, `vite.config.js`, `index.html`, `.gitignore`) and design token extraction from the 2× reference PNGs (`src/styles/tokens.css`, `base.css`, `layout.css`, `components.css`).
- Sample task seed data (`src/data/seedTasks.js`), Focus Notes slide data (`src/data/focusSlides.js`), `useReducer` + Context state layer (`src/state/taskReducer.js`, `TaskContext.jsx`), and safe `localStorage` helpers (`src/state/storage.js`).
- UI components (`Sidebar`, `Topbar`, `MobileNav`, `FocusCarousel`, `StatsGrid`, `FilterBar`, `TaskList`, `TaskRow`, `TaskFormModal`, `DeleteConfirmModal`, `Icons`) and accessibility focus hook (`src/hooks/useModalFocus.js`).
- Build checks, ad-hoc Node verification scripts, and automated Chromium inspection at `1440 × 1000`, `768 × 900`, and `390 × 1128`.
- Drafting and verifying documentation (`README.md`, `AI_USAGE.md`).

---

## 4. Representative Prompts

The following are shortened representative excerpts based on prompts used during the actual development process. They illustrate the instructions and decisions that guided implementation.

1. **Phase 0 — Analysis Before Coding (Representative Excerpt):**
   > Inspect the entire project workspace, read the assignment PDF, and examine all six PNG design references inside the references folder before writing code. Extract every functional, visual, technical, and submission requirement, identify missing information, and wait for approval before beginning implementation.

2. **Phase 1 — Locking Explicit Developer Decisions (Representative Excerpt):**
   > Apply these final decisions before starting Phase 1: do not add a Category dropdown to the Create Task form (default new tasks to "General" and preserve existing categories when editing); use the exact three Figma status tabs (All tasks, In progress, Completed); keep the reference Focus Notes slide percentages (62%, 67%, 100%) while calculating overall dashboard completion percentage dynamically from task data.

3. **Phase 3/4 — Strict Visual & Viewport Verification (Representative Excerpt):**
   > The earlier preview screenshot did not match the required 1440 × 1000 desktop viewport. Set the browser viewport to exactly 1440 × 1000 at 100% zoom, compare the rendered layout against the Figma desktop PNG, and report remaining visual differences honestly rather than claiming a match.

4. **Post-Chrome Inspection — Targeted UI & Validation Corrections (Representative Excerpt):**
   > Based on direct inspection in Google Chrome, display all matching tasks in the default task list rather than truncating Overview to three rows, make Due date mandatory on create and edit with red validation feedback, update the search placeholder to "Search tasks...", and remove the duplicate right-side calendar icon while preserving the native date picker and `DD / MM / YYYY` placeholder.

5. **Phase 6.5 — Read-Only Compliance Audit & Mobile Refinements (Representative Excerpt):**
   > Perform a read-only assignment compliance audit without modifying files and report PASS, PARTIAL, FAIL, or NOT VERIFIED honestly. Follow up with minimal mobile-only refinements to add a compact priority filter popover, a secondary statistics strip for In progress and completion percentage, and unobtrusive mobile carousel controls without altering desktop or tablet layouts.

---

## 5. Examples of AI Suggestions Checked, Corrected, or Rejected

The examples below are grounded in the development conversation and commit history (`19f0dd3` → `5c45cc2`):

1. **Rejected AI Suggestion — Adding a `Category` Dropdown to the Create Task Form (Phase 0 Conversation; Implemented in Commit `b2f3cd1`):**
   - *AI suggestion (in Phase 0 analysis conversation):* Because the assignment's sample task model includes `category` while the Figma Create Task PNG omits it, the AI recommended adding a `Category` dropdown beside `Due date` inside the Create Task modal.
   - *Developer decision:* **Rejected** to preserve strict fidelity with the Figma Create Task form. The developer directed that new tasks default to `"General"` and edits preserve each task's existing category (`src/state/taskReducer.js`).

2. **Corrected Implementation — Desktop Sidebar Breakpoint & Date Placeholder (Commit `a76cfd8`):**
   - *Issue identified by developer:* Direct browser inspection showed that hiding `.sidebar` at `max-width: 1024px` removed the `244px` sidebar on narrower desktop panes (`966px`), and the native `<input type="date">` displayed lowercase `dd/mm/yyyy` instead of uppercase `DD / MM / YYYY`.
   - *Correction applied:* Lowered the sidebar collapse breakpoint to `max-width: 768px` and added an accessible `DD / MM / YYYY` placeholder overlay over the functional native date input.

3. **Corrected Implementation — Default Task List Length, Required Due Date & Duplicate Calendar Icon (Commits `2f52537`, `0e17daa`):**
   - *Issue identified by developer:* The initial Overview list capped default tasks at 3 rows (`OVERVIEW_PREVIEW_LIMIT = 3`), allowed empty due dates, and showed Chromium's native right-side calendar icon alongside the left calendar icon.
   - *Correction applied:* Displayed all matching tasks by default with natural page scrolling, made Due date mandatory on create and edit with red inline errors, unified the search placeholder to `"Search tasks..."`, and turned the native picker indicator into an invisible full-input overlay so only one calendar icon appears.

4. **Caught & Fixed During Visual and Accessibility Verification (Commits `90d4d18`, `3099a8e`, `bc57907`):**
   - Fixed Slide 1 preview card title truncation (`"Design landing pa..."`), removed Chromium's stray `<select>` `::picker-icon` triangle, fixed an invisible mobile topbar logo caused by duplicate SVG `<linearGradient>` IDs (using React `useId()`), added explicit `aria-label` attributes on FilterBar controls, and implemented synchronous modal initial focus with focus trapping and restoration (`src/hooks/useModalFocus.js`).

5. **Caught & Resolved During Read-Only Compliance Audit (Commit `5c45cc2`):**
   - A read-only audit flagged three mobile functional gaps introduced when matching the minimal mobile PNG (hidden priority filter, hidden `In progress` / completion `%`, and hidden carousel controls/indicators). These were resolved with a compact mobile priority popover, a lightweight secondary statistics strip, and unobtrusive mobile carousel controls while leaving desktop and tablet unchanged.

---

## 6. Code Understanding & Ownership

The developer reviewed the implementation, inspected the application in the browser, tested key workflows, and evaluated visual and responsive behavior. The developer takes responsibility for understanding and explaining the submitted codebase, including its component structure, state management, and persistence logic.
