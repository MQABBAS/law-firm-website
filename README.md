# Lexent Law Chamber — Immigration & Asylum Website (Template)

A responsive, multi-page static website template for an immigration and
asylum advice practice, built with plain HTML/CSS/JS (no build step, no
framework). **"Lexent Law Chamber" is a placeholder brand name** — swap it
out for your real practice name before launch, along with your actual IAA
registration details.

## Pages

- `index.html` — Home: hero, trust strip, about preview, services, process,
  FAQ, CTA
- `about.html` — Practice story, values, team, regulation statement
- `practice-areas.html` — Detailed breakdown of each immigration & asylum
  service (asylum claims, appeals, family/work visas, deportation &
  detention, settlement & citizenship, judicial review)
- `contact.html` — Contact details + booking form (no office address —
  consultations are by phone/video)

## Features

- Sticky header with click-to-call phone number and "Book Consultation" CTA
- Floating WhatsApp button (bottom-right, all pages)
- Booking / consultation request form (`contact.html#book`)
- FAQ accordion
- Mobile-friendly responsive navigation
- Legal disclaimer footer (standard practice for regulated advice sites)

## Regulatory note

Giving immigration advice in the UK is a regulated activity. This template
positions the practice as operating within the **Immigration Advice
Authority (IAA)** framework rather than as a firm of solicitors — do not
publish this site claiming SRA authorisation or use the protected title
"solicitor" for advisers who are not, in fact, qualified solicitors.
Replace every placeholder registration reference with your practice's real
IAA registration number(s) and accreditation level(s) before publishing.

## Before you launch — replace these placeholders

| What | Where | Placeholder value |
|---|---|---|
| Practice name | All pages (`<title>`, `.brand`, footer) | `Lexent Law Chamber` |
| Phone number | All pages (topbar, header, footer, `tel:` links) | `+44 20 7946 0958` *(Ofcom's reserved fictional UK number — safe placeholder, but not real)* |
| WhatsApp number | All pages (`wa.me` links) | `442079460958` |
| Email address | All pages (`mailto:` links) | `info@lexentlawchamber.example` *(`.example` is a reserved placeholder domain)* |
| IAA registration number(s) | `about.html`, `complaints-procedure.html` | Not yet included — add once confirmed |
| Team member names/photos | `about.html` | `Adviser Name` placeholders |
| Services & copy | `index.html`, `practice-areas.html` | Immigration &amp; asylum starter set |
| Google Analytics / tracking | not included | Add your own if needed |

Note: this template deliberately does **not** include an office address
anywhere on the site. If your practice does have a public office, add it
back to the topbar, footer, and contact page as needed.

A quick way to replace the phone/email/WhatsApp number everywhere:

```bash
# macOS/BSD sed shown; on Linux drop the '' after -i
find . -name "*.html" -exec sed -i '' 's/+44 20 7946 0958/YOUR PHONE NUMBER/g' {} +
find . -name "*.html" -exec sed -i '' 's/442079460958/YOUR WHATSAPP NUMBER (no +)/g' {} +
find . -name "*.html" -exec sed -i '' 's/info@lexentlawchamber.example/YOUR EMAIL/g' {} +
```

## Booking form — connecting it to a real backend

The form on `contact.html` (`#booking-form`) currently works with **no backend**:
on submit, `js/main.js` validates the fields and opens the visitor's email
client with a pre-filled message. This works everywhere with zero setup, but
isn't ideal — it relies on the visitor having a configured mail client, and
you don't get submissions in one place automatically.

For a production site, swap this out for one of:

1. **Formspree** (easiest, free tier available) — add `action="https://formspree.io/f/YOUR_FORM_ID"` and `method="POST"` to the `<form>` tag, add `name` attributes are already present, and remove/adjust the JS mailto handler.
2. **EmailJS** — send the form via email straight from JavaScript, no backend needed.
3. **Netlify Forms** — if hosting on Netlify, add `data-netlify="true"` to the `<form>` tag and it handles the rest.
4. **Your own backend** — POST the form data to your own API endpoint.

## Running locally

No build step required — just open the files in a browser, or serve them:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploying

Any static host works: GitHub Pages, Netlify, Vercel, Cloudflare Pages, etc.
For GitHub Pages: Settings → Pages → deploy from the `main` branch, root folder.

## Legal notice

The included disclaimer text ("does not constitute immigration advice...")
is a common convention for regulated advice websites, **not a substitute
for advice from a qualified professional** on what your regulator (the IAA)
requires. Review the IAA's rules on adviser advertising and website
disclaimers before publishing.
