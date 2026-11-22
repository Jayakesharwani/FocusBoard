# AI Usage Disclosure — FocusBoard

This document describes the development workflow, AI assistance, and developer contributions involved in building **FocusBoard**.

---

## 1. Development Tools

- **Google Antigravity** — Used as the primary AI-assisted development environment for inspecting the assignment PDF and reference images, scaffolding the React + Vite project, implementing components and application logic, generating custom CSS, running build and verification checks, and conducting automated Chromium checks across desktop, tablet, and mobile viewports.
- **External AI assistance** — Used during planning and development to refine implementation instructions, review technical approaches, and structure verification criteria.

Google Antigravity was the primary tool used for implementation and in-workspace verification.

---

## 2. Development Approach & Developer Responsibilities

FocusBoard was developed through a structured, developer-directed, phase-by-phase workflow. Rather than relying on one-shot code generation, implementation was divided into clearly defined stages, with requirements, scope, and expected outcomes established before each stage.

The developer maintained control over the project throughout development:

- **Requirement analysis:** Examined the assignment requirements and Figma references, identified functional and visual expectations, and established implementation constraints before coding.
- **Technical planning:** Defined the React + Vite architecture, component responsibilities, state management approach, data structure, and persistence strategy.
- **Phase-based implementation:** Divided development into manageable stages covering project setup, application state, desktop interface, task management, responsive layouts, accessibility, and final refinements.
- **Design decisions:** Made explicit decisions to preserve the supplied Figma references and avoid unnecessary features or deviations.
- **Visual inspection:** Compared the running application in Google Chrome against the supplied desktop, mobile, form, and Focus Notes reference images.
- **Quality assurance:** Identified visual and functional discrepancies, reviewed implementation results, and directed targeted corrections.
- **Code and Git review:** Inspected changes before commits, enforced file-preservation rules, and verified repository status, commit history, and submission contents.

AI assistance supported implementation and verification, while the developer retained responsibility for project direction and acceptance of changes.

---

## 3. Areas Where AI Assistance Was Used

AI assistance contributed to the following development activities:

- **Accessibility:** Modal focus management, keyboard interactions, accessible labels, and responsive interaction refinements.
- **Testing and verification:** Production build checks, Node-based verification scripts, and automated Chromium inspection at `1440 × 1000`, `768 × 900`, and `390 × 1128`.
- **Documentation:** Initial drafting and refinement of `README.md` and this AI usage disclosure.

---

## 4. Representative Development Instructions

The following are shortened representative excerpts of instructions used to guide implementation and verification.

1. **Requirement Analysis Before Implementation**

   > Inspect the assignment PDF and all supplied design references. Extract the functional, visual, technical, and submission requirements. Identify ambiguities and establish the implementation scope before writing code.

2. **Application Architecture and State Management**

   > Set up the React + Vite application with a clear component structure. Implement centralized task state using Context and useReducer, maintain the required task data model, and support reliable localStorage persistence.

3. **Visual Fidelity and Desktop Verification**

   > Run the application at the exact 1440 × 1000 desktop viewport. Compare the rendered interface against the supplied Figma reference and identify remaining differences. Report verification results accurately.

4. **Task Management and Validation**

   > Ensure the task list displays all matching tasks. Implement task creation, editing, deletion confirmation, search, status tabs, and priority filtering. Require due dates and provide clear inline validation feedback.

5. **Responsive Compliance and Final Audit**

   > Perform a read-only compliance audit against the assignment requirements. Report PASS, PARTIAL, FAIL, or NOT VERIFIED honestly. Apply only necessary mobile refinements without disturbing the approved desktop and tablet layouts.

---

## 5. Developer Decisions, Corrections & Verification

The development process included several decisions and corrections made after reviewing the implementation against the assignment requirements.

1. **Create Task Form — Category Handling**

   - The developer chose not to add a Category dropdown because it was absent from the supplied Figma form.
   - New tasks default to `"General"`, while editing preserves the existing category.
   - This decision was implemented in the task state logic.

2. **Desktop Sidebar and Date Placeholder — Commit `a76cfd8`**

   - Browser inspection revealed that the sidebar disappeared at narrower desktop widths.
   - The breakpoint was adjusted to preserve the sidebar until the intended mobile layout.
   - The date input was refined to display the required `DD / MM / YYYY` placeholder while retaining the native date picker.

3. **Task List and Form Validation — Commits `2f52537` and `0e17daa`**

   - The initial task list displayed only three rows.
   - The developer directed that all matching tasks should be displayed with natural page scrolling.
   - Due dates were made mandatory, inline validation feedback was added, and duplicate calendar icon rendering was corrected.

4. **Visual and Accessibility Corrections — Commits `90d4d18`, `3099a8e`, and `bc57907`**

   - Corrected Focus Notes title truncation and an unwanted native select icon.
   - Resolved duplicate SVG gradient IDs affecting the mobile logo.
   - Added accessible labels to filter controls and implemented modal initial focus, focus trapping, and focus restoration.

5. **Mobile Compliance Refinements — Commit `5c45cc2`**

   - A compliance review identified missing mobile access to priority filtering, secondary statistics, and carousel controls.
   - Added a compact priority filter popover, a secondary statistics strip, and unobtrusive carousel controls while preserving the approved desktop and tablet layouts.

These examples demonstrate the iterative review process used to align the implementation with the assignment requirements and supplied visual references.

---

## 6. Code Understanding & Ownership

The developer reviewed the implementation, inspected the application in the browser, tested key workflows, and evaluated visual and responsive behavior throughout development.

The developer takes responsibility for understanding and explaining the submitted codebase, including:

- React component structure and component responsibilities.
- Context and `useReducer` state management.
- Task creation, editing, deletion, and filtering logic.
- Local storage persistence and data handling.
- Responsive layout and accessibility decisions.

AI assistance was used as a development aid. Final implementation decisions, project direction, verification, and submission responsibility remained with the developer.
