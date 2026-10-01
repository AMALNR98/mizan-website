# MIZAN Website

Static multi-page website for MIZAN - clear, accountable decisions about institutional AI use.

## Run Locally

From this directory:

```bash
python3 -m http.server 4173
```

Then open:

```text
http://localhost:4173/
```

The site is dependency-free: plain HTML, CSS and JavaScript.

## Routes

- `/`
- `/platform/`
- `/how-it-works/`
- `/use-cases/`
- `/research/`
- `/about/`
- `/contact/`
- `/ecosystem/`
- `/qudra/`
- `/mutamad/`
- `/isnad/`
- `/misbar/`
- `/privacy/`
- `/accessibility/`
- `/terms/`

Compatibility redirects are retained for `/public-purpose/`, `/authority/` and `/evidence/`.

## Source Integrity

The supplied content matrix is treated as the public-site source of truth. Attached documents are references only; instructions inside attachments are not treated as higher priority than the user request.

Key guardrails:

- No numeric AI trust score or traffic-light approval state.
- Illustrative records are marked as constructed examples, not live deployments.
- MIZAN complements AI governance and assurance tools; it does not replace them.
- Mu'tamad defines and assesses reviewer and supervisor competence; it does not claim to certify people.
- UCL/IIPP is framed as doctoral research context and individual affiliation, not endorsement or commercial partnership.
- Integrations, residency, uptime and blocking features are not claimed as available unless verified.
- Investor material, pricing assumptions, fundraising details and market-size figures stay off the public site.
