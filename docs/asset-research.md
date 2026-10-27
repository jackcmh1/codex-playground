# Asset research and provenance

Checked 2026-10-27. This is a local recording prototype, not a published guide.

## Findings

- https://gametora.com/umamusume, `/terms`, and `/robots.txt` each returned HTTP 403 in this environment. This does not identify the underlying restriction or prove that the site forbids reuse. Its asset pipeline and reuse terms remain **unverified**. No hotlinking or scraping was implemented.
- https://github.com/rockisch/umamusu-utils — the README describes extracting images and data from game files, requiring the game's `meta` / `master.mdb` databases. No game database is present here. Extraction capability does not establish permission to redistribute the resulting artwork.
- https://github.com/SimpleSandman/UmaMusumeToolbox — the README describes downloading assets and explicitly says “PERSONAL USE ONLY.” This was not used as a public-site image source. Nothing was downloaded from a game asset server.
- No claim is made that either project describes GameTora's actual implementation.

## Local prototype assets

`assets/local/*.png` are extracted images / crops from page 4 of the user-supplied **260615 CM17~22 그랜드 라이브 챔미들.pdf** (1440 × 810 PDF coordinates). They were not downloaded from third-party sites. They are ignored by Git and should not be included in a public deployment until reuse conditions are resolved. PDF possession is not evidence of original artwork permission.

| File | PDF page | Crop (x0,y0,x1,y1) | Use |
| --- | --- | --- | --- |
| featured.png | 4 | Embedded image xref 255 + alpha mask 256 | Main reference character |
| pick-01.png | 4 | Embedded image xref 259 + alpha mask 260 | First large recommendation |
| pick-02.png | 4 | Embedded image xref 263 + alpha mask 264 | Second large recommendation |
| pick-03.png | 4 | Embedded image xref 223 + alpha mask 224 | Third large recommendation |
| roster-01..08.png | 4 | x=862/958/1054/1150, y=430/530; 79×76 | Small recommendation portraits, row-major order |

Character names, exact outfit IDs, recommendation rankings, and unique-skill IDs are deliberately not inferred from portraits. Numbered reference picks are not tiers. Generic stat symbols and layout decoration are CSS/text, not official game icons.

## Content provenance

- Page 4: Hanshin / Turf / 1600m / Mile / Right-handed / Autumn / Firm (Cloudy); Speed 1500 ↑ (1600), Stamina 600, Power 1200 with threshold 1101 ↑, Guts 600 ↑, Wit 1200.
- Page 5: Front — Unrestrained +0.4; Pace — Straight Descent +0.2; Late — Flash Forward +0.4 and Updrafts +0.2; End — Flash Forward +0.4. These are transcriptions, not independently verified mechanics or localization.
- Speed-cell portrait counts are retained as pending identity slots. Acceleration-cell character portraits and the right-hand inheritance combinations are not transcribed in this first interaction prototype; they require exact character/outfit/unique identification.
- No added activation conditions, tier claims or current-global-meta conclusions.

## Before a public archive

Confirm a permitted source and any attribution requirements, map stable character/outfit/skill identifiers, and validate global-server availability. Replace local PDF crops with approved assets. Keep the image location separate from guide data. Missing images already fall back to text placeholders.

## uma.guide follow-up

The user also uses uma.guide for English race/skill terminology, character images, screenshots and tier lists. This is a reference-source requirement; it does not authorize treating a third-party tier list as the user's own recommendation or automatically copying its entire database.

### Direct observations

- `https://uma.guide/`, `/robots.txt`, and `/sitemap.xml` returned HTTP 403 in this environment; the home response body was `error code: 1010`. The underlying restriction is not established. No bypass was attempted.
- Direct site HTML, image URLs, asset CDN, reuse terms and original game-asset extraction pipeline remain unverified.

### Public secondary-source code inspected

- https://github.com/Apolexian/umadottranslate and `tools/build_skill_dict.py`: explicitly credit uma.guide. The code reads `TerumiSimpleSkillData.json` for Global skill descriptions and `JP/TerumiSimpleSkillDataJP.json` plus `TerumiSimpleSkillDataJPOriginal.json` for JP/English mappings keyed by skill ID. The author describes Global text as official and JP-only text as generated effect breakdowns. These claims were not independently checked against the game client.
- That README links `SayaDuck/umaguide` as an upstream checkout. GitHub API requests for that repository returned 404; this does not establish whether it was removed, renamed or inaccessible.
- https://github.com/brickc4/umaLord/blob/main/tools/update_knowledge.py (default-branch contents fetched via GitHub API): describes extracting JSON from uma.guide's Vite JavaScript bundles, discovering `/assets/...js` via `/characters/`. It distinguishes skills, characters, races, CM schedule and separate meta-sheet data. This is evidence of how a downstream project consumes data, not proof of the site's current behavior or its original image acquisition method. The script was read, not run or copied into this app.

### Implementation implications

Use stable character/outfit/skill/course identifiers and separately record Global display name, source/version, server availability, icon source and verification status. Distinguish official Global text from community JP translations and the presenter's own recommendation. A source skill's full description and a short on-screen emphasis label should be separate fields. Preserve the ability to manually review/correct labels rather than depending on live third-party scraping during recording.

No uma.guide images or database entries were imported into the public prototype, and no deployment was changed during this research.

## Image and update-pipeline investigation

Inspected public source and API directory listings on 2026-10-27; no image library was imported or downloaded and the deployed site was not changed.

### Actual image libraries

`brickc4/umaLord` default-branch directory listings contain 109 files under `app/assets/umas`, 172 under `app/assets/cards`, and 6 under `app/assets/chibi`. Example filenames include `100101.webp`, `20001.webp`, and `seiun_102001_0010.png`. In `app/src/main.rs`, `art_uri` constructs a local file URI from the ID; `ui_util.rs` embeds chibi files. This confirms checked-in/local image use, not a live image API. The inspected tools include crop/contact-sheet helpers, but do not establish the original image acquisition source or an automated image-refresh pipeline. GPL-3.0 code licensing does not by itself establish separate rights in game artwork.

Sources:
- https://github.com/brickc4/umaLord/tree/main/app/assets
- https://github.com/brickc4/umaLord/blob/main/app/src/main.rs
- https://github.com/brickc4/umaLord/blob/main/app/src/ui_util.rs

### Download and extraction tools

`SimpleSandman/UmaMusumeToolbox` reads the local game `meta` SQLite database, obtains resource hashes/types, constructs resource CDN paths, and supports skipping already existing files. Its README says personal use only. This is a client-resource download mechanism, not documented third-party API permission; the inspected default configuration points to a particular game resource host/platform and does not establish current Global compatibility. No endpoint probing or download was executed.

`rockisch/umamusu-utils` includes skill-icon and support-card extraction from dumped game files. Its **current** `umamusu/assets/download.py` raises `NotImplementedError`; an old download-script reference in another project's README must not be presented as a working current downloader.

`TheCing/uma-tools` contains 151 entries under `icons` and Perl scripts reading the local meta database, staging resource files and moving unpacked PNGs. Its daily `sync-upstream-data.yml` syncs upstream Global skills/courses/name JSON data and runs build/tests. That workflow's staged file list does **not** establish automated image downloading or direct game-update notification.

Sources:
- https://github.com/SimpleSandman/UmaMusumeToolbox/blob/master/UmaMusumeToolbox.DataDownload/Program.cs (use the repository default branch if this path changes)
- https://github.com/SimpleSandman/UmaMusumeToolbox
- https://github.com/rockisch/umamusu-utils/blob/master/umamusu/assets/download.py (use the repository default branch if this path changes)
- https://github.com/rockisch/umamusu-utils
- https://github.com/TheCing/uma-tools/blob/master/extract_resource.pl
- https://github.com/TheCing/uma-tools/blob/master/.github/workflows/sync-upstream-data.yml

### Official availability

The Global official home https://umamusume.com/ was accessible and links character/media sections with ordinary web image resources. The Japanese official site and derivative-work guidelines https://umamusume.jp/derivativework_guidelines/ were accessible. No documented, supported third-party API granting complete character/skill asset enumeration and reuse was found in the checked material. This is a bounded negative finding, not proof none exists. Ordinary official-site images and a game CDN are not equivalent to a public developer API. Japanese derivative-work guidance is not blanket permission to redistribute extracted Global game assets. The guessed Global `/derivativeworks/` URL returned an app shell without guideline text and was not treated as a verified policy document.

GameTora and uma.guide still returned 403; neither site's actual image-generation/update pipeline has been verified.

### Recommended pipeline for this project

Start with an on-demand batch refresh for the next guide: identify needed character/outfit/skill IDs, acquire permitted source images, record source/server/version/hash, review Global terminology and availability, and publish a fixed per-guide snapshot. A future approved source can support scheduled metadata diffing and downloading/converting only changed assets. Keep review and publication explicit so historical videos/guides do not silently change when an upstream game update changes text or assets. Fresh game metadata or an updated authorized upstream source remains a prerequisite; an old meta database cannot discover new content just by rerunning an extractor.
