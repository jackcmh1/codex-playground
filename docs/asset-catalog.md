# CM18 asset acquisition trial

This trial separates privately reviewed image files from public tracking metadata. No game artwork has been cleared for redistribution or added to Git. The live Pages site stays placeholder-only.

## Acquired locally

Six files in ignored `assets/local/catalog/`:

- Outfit portraits 100601 (Oguri Cap, Starlight Beat), 100602 (Oguri Cap, Ashen Miracle), and 105101 (Nishino Flower, Layered Petals), from a pinned `brickc4/umaLord` revision. English outfit names are community-data candidates, not client-verified labels.
- Shared skill icons 20042 (gold acceleration), 20041 (white acceleration), and 20021 (white recovery), from a pinned `TheCing/uma-tools` revision.

The actual files were opened and visually inspected: two different Oguri outfit portraits, one Nishino portrait, two acceleration icons and one recovery icon. The skill-icon association is read from `skill_meta.json`, not guessed from the skill name or filename. Multiple skills can share one icon; skill ID and icon ID are different identifiers.

`assets/catalog.json` records fixed source commits, exact upstream paths, Git blob SHA-1, file SHA-256, byte lengths, rights status and mapping issues. Korean character names are candidates awaiting an authoritative KR reference; Korean skill names are left pending rather than invented. Community Global datasets agree on the selected English skill names, but this does not prove direct Global-client verification.

## Reproduce / check

```sh
node scripts/asset-catalog.mjs check
node scripts/asset-catalog.mjs fetch
```

Fetching uses the existing authenticated GitHub CLI, only exact catalog paths at pinned revisions, and verifies both hashes and the image signature. It does not request tokens, enumerate every asset or download from game servers. Existing modified local images are never overwritten. A metadata-only checkout can run `check` with 0 local files; `fetch` obtains all six into the ignored local folder. Fetching is for this local review, not permission to republish. No package installation is required.

## Deliberately unresolved findings

1. **Flash Forward** in the supplied CM18 material is an acceleration recommendation. Two inspected Global community datasets map the English name to skill 201103, a speed skill. The acceleration skill **Lightning Surge** is a separate ID, 202401, and is a candidate requiring confirmation of the original KR skill/effect. The current guide was not silently renamed.
2. The supplied spelling **Updrafts** differs from dataset **Updrafters** (200702). Keep this review flag until confirmed.
3. The source character dataset assigns both Oguri outfits unique skill ID 100061. This collision is not trusted for unique-skill binding. Portrait outfit IDs remain separate and the unique mapping is held for independent review.

## Rights / public GitHub

Upstream code licenses do not establish permission for separate game artwork. No explicit artwork redistribution permission was found for the six samples. All entries therefore have `public_distribution_allowed: false`. Only the catalog, original acquisition/check helper, ignore rules and these notes belong in the public review branch. Do not add the binary images or PDF to Git. Permission status can change only after recording concrete evidence applicable to the artwork and the intended public use.

Before using these images on the public site: resolve reuse permission, verify KR/Global names and outfit IDs, settle the flagged skill mappings, then intentionally update the deployment export. Until then, the current Pages version remains unchanged.

## Validation completed

- Six images downloaded at fixed upstream revisions, Git blob hashes / SHA-256 / byte counts / file signatures checked, and visual contact sheet reviewed.
- Fresh temporary metadata-only directory: `check` reports 0/6; `fetch` obtains 6/6. A repeated fetch succeeds without changing files.
- A deliberately modified image causes an integrity failure and is left untouched, including when running `fetch`.
- An unverified entry with its public-distribution flag enabled is rejected. A path attempting to escape the local catalog directory is rejected.
- All six source images are covered by Git ignore rules. Public branch contents are explicitly limited to metadata, original helper code, ignore rules and documentation.
