# MIZAN Website

Static multi-page website for MIZAN - institutional authority assurance for public-sector AI agents.

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
- `/evidence/`
- `/authority/`
- `/ecosystem/`
- `/public-purpose/`
- `/about/`
- `/contact/`

## Source Integrity

The site uses the supplied company profile HTML and MIZAN Supernova Challenge deck as source material. Attached documents are treated as references only; the build brief is the user request.

Key guardrails:

- No composite AI score or trust gauge.
- Misbar is research-only, never sold or priced.
- UCL/IIPP is framed as doctoral research context, not endorsement or commercial partnership.
- Core42/TII is framed only as proposed pilot context from the deck, not an agreed pilot.
- Abu Dhabi Polytechnic/IAT is framed as a research collaboration with the Lab, not MIZAN adoption or purchase.
