# CM23 example validation

Current instance, 2026-10-27. Source content remains a working adaptation; interaction checks do not verify game mechanics.

Passed `npm run check` and `npm run build:preview`. In system Chromium via Python Playwright, the exported site was tested at 1600×1200 and touch-emulated 390×844:

- All five chapters render; chapter navigation and boundary controls work.
- No scene button overflows the presentation or overlaps the focus explanation area on desktop.
- Stamina/guts toggle changes 800/600 to 700/1200; Oguri's conditional explanation is separate.
- All four style views render; skill terms deliberately retain EN pending status.
- Click/tap pins explanations; Next highlight, reset and Space in clean view work.
- Notes dialog opens and closes and blocks chapter shortcuts while open.
- Both selected portrait files load.
- Desktop clean view is 16:9; H restores controls.
- Mobile views are readable stacked layouts without horizontal document overflow; all chapters and touch selection work.
- CM18 archive loads with its five original stat rows.
- No JS exceptions or HTTP errors during the tested paths.

Visually reviewed desktop runners/stats and mobile stats screenshots. Screenshots stay in ignored artifacts/. The static export has a fixed file allowlist and a recursive SHA-256 manifest; the source PDF, raw transcript and local asset trial folder are excluded. Actual Pages deployment and published-file checks are recorded in deployment.md after publication.

Published CM23 content was verified after the successful GitHub Pages deployment. Ten manifest-listed files were fetched over certificate-verified HTTPS and matched SHA-256. The published bytes were rendered in Chromium with response routing (the environment Chromium does not trust the outbound proxy CA; certificate checks were not disabled). Five chapter touch selections, two loaded portraits, mobile width and the CM18 archive link passed without JS errors. Direct access on the user's actual phone remains for review. Versioned script/style URLs prevent the previous CM18 root assets from being reused from browser cache.
