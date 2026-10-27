# Official content-guideline review

Checked 2026-10-27. This records the actual official wording and its limits; it is not a legal clearance or a statement that all guide-image use is prohibited. No image rights flag, public branch or live site was changed.

## Global official fan guidelines

URL: https://umamusume.com/fan-createdguide/

Discovered from the Global official footer, rather than guessed URLs. Page title: **Umamusume: Pretty Derby Fan-Created Content Guidelines**. Accessible HTML includes the full English text.

Relevant excerpts:

- “These guidelines are not intended to discourage fan-created content or fan activities.”
- Restricted category: “Works or activities intended for commercial use or profit (i.e. commercial activity that exceeds the scope of fan-related activities)”
- Restricted category: “Works that infringe upon the rights of a third party.”
- Cygames determines whether content violates the criteria and says it cannot answer individual inquiries regarding these guidelines.

The list also covers reputational harm, violent/sexual/obscene works, political/religious/ideological uses, illegal/inappropriate conduct and other works deemed inappropriate in context. No separate explicit exception for YouTube advertising/monetization, blanket permission for guide screenshots, extracted icon packs, or public GitHub asset redistribution was found in this text. This absence is not itself a conclusion that every such use is forbidden.

## Global official terms

URL: https://umamusume.com/terms/

Title **Terms of Use & Copyrights**. Effective date June 24, 2025 in the retrieved text. Initial server HTML only shows the heading; the page's own JS loads the body from its public CMS. The official site's configured CMS response was retrieved with verified HTTPS:
https://en-portal.g.kuroco.app/rcms-api/4/pages/terms

- Article 2(4): a discrepant Individual Service Agreement takes precedence over the general Agreement.
- Article 5(1): personal, non-commercial entertainment limited license for the Services.
- Article 5(2): no transfer of ownership of intellectual property to the customer.
- Article 5(3): broad restrictions on modification, copying, reverse engineering, distribution and public display of Content, except rights expressly granted.
- Article 11(1), nested prohibition items: restrictions include unauthorized content acquisition and reverse engineering / operations involving related data.

Read general terms together with any applicable individual guidelines; do not use Article 5 alone to assert that all fan videos are categorically prohibited, or the existence of fan guidelines alone to assert unrestricted extracted-asset redistribution.

## Global official support FAQ

URL: https://support.umamusume.com/

Question: **I have a question regarding derivative works.** (content ID `ll1gn0e-2s`). The site-rendered public FAQ response says it cannot provide individual advice, notes that images/designs/official illustrations may be copyrighted and that rightsholders may contact creators over infringement, and links the Global fan-created guidelines above. All 33 FAQ entries returned by the public site at inspection were checked for relevant question text. No separate video/streaming/monetization permission entry was found in those results.

The environment Chromium does not trust the outbound proxy certificate. For public FAQ inspection, browser requests were fulfilled with Python urllib responses using certificate verification; the browser's own ordinary read requests and destination-scoped headers were retained. No TLS bypass, private-account access, or message to support was used. No API-key values were printed or saved into repository documentation.

## Japanese reference

https://umamusume.jp/derivativework_guidelines/ contains the corresponding Japanese fan-work guidance. It is supporting context, not a substitute for Global terms. A Japanese policy's wording does not automatically settle the exact Global use case.

## Consequence for the prototype

The official Global fan framework exists. It does not support either blanket claim “non-commercial means everything is permitted” or “unclear means all images are forbidden.” The specific permission for rehosting our six third-party extracted samples remains unverified. Upstream fan-site/code licenses do not independently clear the game artwork. Keep the catalog's rights status unchanged rather than treating this review as affirmative clearance. Decide any next integration around the particular source and use (guide presentation versus downloadable asset library), with uncertainty stated accurately.
