# Review deployment

## Prepared

Run `npm run build:preview` from `/workspace/codex-playground` to export the static site to `dist-preview/`. This replaces that dedicated generated directory. No install is needed. Repeated exports with unchanged source produce identical file hashes.

The export copies only an explicit file allowlist: HTML, JavaScript, CSS, robots.txt, .nojekyll and a SHA-256 manifest. It does not include the PDF, reference images, Git metadata, documentation, or environment files. The HTML selects placeholder-only rendering; no request is made for local reference images. `noindex` and robots.txt discourage search indexing but are not access control. A deployed preview may be publicly reachable.

Deploy only the contents of `dist-preview/`, never the whole checkout. A review archive is also generated locally at `artifacts/CM18-web-preview.zip`. Once a hosting destination is connected, verify its actual HTTPS URL and interactions after deployment; the local build is not proof of a live site.

## Hosting blocker observed

The existing GitHub identity can read and push this private repository and reports admin permission. However, `GET /repos/jackcmh1/codex-playground/pages` returns HTTP 403, `Resource not accessible by integration`. Repository admin status does not establish the integration has the separate Pages API capability. The repository reports `has_pages: false`. The account's support for Pages on a private repository has not been established.

No Vercel, Netlify or Cloudflare deployment tool, executable or named runtime credential was found. Credential values were not printed. No access token is requested in chat. No repository visibility change, public mirror or tunnel was created. A placeholder-only deployment branch has now been pushed; Pages activation remains pending. The exact required external step depends on the selected host: enable the needed GitHub integration permission/account support for Pages, or connect an existing deployment service securely.

## Mobile review

At narrow viewport widths, Zoom in enlarges the 16:9 canvas to 960px and allows horizontal panning within the viewport. Fit to screen restores the overview. Tapping pins explanations; running-style rows can be expanded. Landscape is recommended. This is a recording prototype, not yet a mobile archive layout.

## Prepared GitHub Pages branch

Pushed `gh-pages` at `da0e8c382fc2c9702200ee08a2a80ed49aa2a2a4`. The branch contains only the six exported static files, with placeholder-only asset mode. Main and the local working branch were not changed or checked out. The source implementation remains uncommitted locally; the deployment branch is a separate root commit. No Pages site has been activated or verified. The user must configure repository Settings → Pages → Deploy from a branch → gh-pages → /(root). A GitHub Free personal account generally requires a public repository for Pages; changing visibility exposes the whole repository and its history and requires a deliberate user decision. Do not change visibility automatically.

## Live deployment verified

After the user changed repository visibility and selected gh-pages / root, GitHub reports `private: false`, `has_pages: true`, Pages `status: built`, and a successful `pages build and deployment` workflow. The actual Pages URL is https://jackcmh1.github.io/codex-playground/ and returns HTTP 200.

Live HTML, JS and CSS were downloaded using Python HTTPS with certificate verification enabled and matched the published SHA-256 manifest. The environment's Chromium rejected the proxy certificate, so its certificate checks were not disabled: browser interaction validation rendered those verified live responses via request routing. Direct phone-browser access still needs user confirmation.

## CM23 example

The user requested a site example based on the supplied CM23 Korean transcript. Source implementation is on `cm23-example`; the Pages deployment root now serves CM23, with the previous CM18 placeholder sample retained at `cm18/`. Five chapters include course, conditional stat alternatives, source-recommended runners, inheritance by style, and team examples. Two specifically selected reference portraits are included; see `cm23/ASSETS.md` for provenance and unverified reuse status. This changes the earlier placeholder-only deployment scope; it does not claim a license or expose the source PDF/full local library. Actual Global details remain marked for review. Versioned HTML asset references avoid stale CM18 JS/CSS caching.
