# Uma Guide Studio

Recording-oriented Umamusume guide prototypes: a CM23 Pisces Cup transcript draft and the original CM18 interaction sample. No backend or dependency installation is required.

## Run

Use the existing checkout; do not create a worktree unless explicitly requested. Python 3 and Node.js are sufficient.

```sh
npm run check
npm run build:preview
python3 -m http.server 5174 --bind 0.0.0.0 --directory dist-preview
```

The exported root is CM23; `cm18/` retains the older placeholder-only sample. From the unbuilt checkout, CM23 lives under `cm23/` and the original CM18 is at the root. Stop the server with Ctrl+C and restart it in a new task. The onboarding UI does not offer a localhost preview route; use the actual GitHub Pages URL for phone review.

## CM23 controls

- Five chapter tabs / left-right arrow keys: course, stats, runners, inheritance, teams.
- Click or tap a card: pin/unpin its explanation and source timestamp.
- Next highlight / Space (when not focused on another interactive control): step through the current scene's cards.
- Lower guts / Higher guts: compare the two source stamina/guts alternatives.
- Running-style buttons: switch inheritance notes.
- Reset / Escape: clear focus.
- H / Clean view: hide studio UI; desktop uses a 16:9 recording canvas. On phones, scenes stack for readable review.
- F / Fullscreen: browser fullscreen when supported.
- Sources & notes: transcript limitations, pending Global checks and artwork provenance.

## Sources and limitations

CM23 is based on the user's auto-transcript of https://www.youtube.com/watch?v=1Bs90FZfqz4 . The video and on-screen stat table were not viewed. The absent wit target stays blank, stamina figures retain their recovery/guts conditions, and unverified English skill names stay pending. Scenario/support timing must be checked against Global. See `docs/cm23-source-notes.md`.

Two illustrative portraits are included in CM23; their reuse permission remains unverified, with no affirmative license claimed. See `cm23/ASSETS.md` and `docs/official-content-guidelines.md`. No PDF, full local image library or raw transcript is exported. The CM18 archive still uses placeholders.

## Asset research

`assets/catalog.json` and `scripts/asset-catalog.mjs` track the earlier six-image local acquisition trial. Its rights flags remain unverified; that inventory is not a public-use clearance. Local trial images under `assets/local/` are ignored. The two specifically selected CM23 presentation portraits are separately documented under `cm23/images/`.

```sh
node scripts/asset-catalog.mjs check
```

See `docs/asset-catalog.md`, `docs/asset-research.md`, `docs/deployment.md` and `docs/cm23-validation.md` for research, deployment history and current validation evidence.
