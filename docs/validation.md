# Validation — CM18 prototype

Executed 2026-10-27 in the current cloud machine using the system Chromium browser via Python Playwright. This is current-instance evidence, not a published-site or new-task restoration test.

## Passed

- `npm run check` (`node --check app.js`).
- HTTP server started from `/workspace/codex-playground` with the documented Python command; browser loaded the application and 12 local reference images.
- Five stat rows, three large reference picks, eight roster references rendered.
- Stat hover shows the reference detail. Clicking pins it after pointer exit. Selecting a runner clears the stat selection. Escape resets it.
- Arrow keys switch between the two slides. Boundary navigation is disabled appropriately.
- Selecting Late displays only its enlarged row. Selecting Updrafts pins the description. “Show all styles” restores four rows. Speed-reference placeholders are selectable by keyboard.
- The notes dialog opens and closes; presentation shortcuts do not change slides while it is open.
- H hides studio controls, preserves a 16:9 presentation canvas, and restores controls on the next press.
- F enters and exits Chromium fullscreen in the validation environment.
- Visible interaction controls and detail panels remain inside the presentation canvas on both slides at the tested desktop viewport.
- At a 390 × 844 viewport, document width does not overflow; slide switching and row expansion work. This retains a scaled recording canvas, not a mobile reading layout.
- Blocking every local image request produces 12 labeled fallbacks with no JavaScript exception.
- No browser JavaScript errors during the functional checks.

## Visual review

Reviewed desktop overview, inheritance table and enlarged Late-row screenshots. Replaced initial rough featured-character crops with the PDF's embedded transparent images to remove adjacent text/artwork. Adjusted explanatory text sizing and symbol font fallback, then repeated the functional checks.

Local screenshots, ignored by Git:
- `artifacts/overview.png`
- `artifacts/inheritance.png`
- `artifacts/focus.png`
- `artifacts/clean.png`
- `artifacts/mobile.png`

## Not verified / out of scope

- Safari, Firefox, actual phone-browser fullscreen, and a real OBS recording session.
- Character/outfit identities, unique-skill mappings, inheritance combinations, activation mechanics and current global-server meta.
- Public rights to distribute the reference artwork; GameTora asset terms and API access.
- Deployment, remote push/PR, environment publication and restoration in a fresh task.

## Public review follow-up

Added a separate placeholder-only export and mobile zoom/pan controls. Repeated the original desktop interaction suite successfully after the shared rendering changes. Public export validation is recorded below after execution. Hosting remains externally blocked as described in `deployment.md`; local tests are not live-site verification.

Public export checks passed in Chromium with mobile/touch emulation (390×844), landscape (844×390), and desktop viewport (1440×1000):

- Exactly 12 placeholders and zero image elements; network requests only for the HTML, CSS and JavaScript, with no HTTP errors.
- Zoom expands the canvas within a scrollable container without overflowing the document; Fit restores it.
- Touch selects the power target, switches slides, expands Late, selects Updrafts, restores rows, opens/closes notes, and enters/exits clean view.
- Desktop reference selection, arrow navigation and reset work in the exported subdirectory.
- Export includes only the six allowlisted files, no PDF or image; unchanged repeated builds have identical manifest hashes.
- No JavaScript errors.

These tests do not verify a real phone or public deployment. No hosting URL was created because of the access blocker.
