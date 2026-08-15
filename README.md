# Meridian Legal — Law Firm Website (Template)

A responsive, multi-page static website template for a law firm, built with
plain HTML/CSS/JS (no build step, no framework). **"Meridian Legal" is a
placeholder brand name** — swap it out for your real firm name before launch.

## Pages

- `index.html` — Home: hero, trust strip, about preview, practice areas,
  process, FAQ, CTA
- `about.html` — Firm story, values, team
- `practice-areas.html` — Detailed breakdown of each practice area
- `contact.html` — Contact details + booking form + map placeholder

## Features

- Sticky header with click-to-call phone number and "Book Consultation" CTA
- Floating WhatsApp button (bottom-right, all pages)
- Booking / consultation request form (`contact.html#book`)
- FAQ accordion
- Mobile-friendly responsive navigation
- Legal disclaimer footer (standard practice for law firm sites)

## Before you launch — replace these placeholders

| What | Where | Placeholder value |
|---|---|---|
| Firm name | All pages (`<title>`, `.brand`, footer) | `Meridian Legal` |
| Phone number | All pages (topbar, header, footer, `tel:` links) | `+44 20 7946 0958` *(Ofcom's reserved fictional UK number — safe placeholder, but not real)* |
| WhatsApp number | All pages (`wa.me` links) | `442079460958` |
| Email address | All pages (`mailto:` links) | `info@meridianlegal.example` *(`.example` is a reserved placeholder domain)* |
| Office address | Topbar, footer, `contact.html` map block | `123 Example Street, Manchester, M1 1AA` |
| Team member names/photos | `about.html` | `Attorney Name` placeholders |
| Practice areas & copy | `index.html`, `practice-areas.html` | Generic 6-area starter set |
| Google Analytics / tracking | not included | Add your own if needed |

A quick way to replace the phone/email/WhatsApp number everywhere:

```bash
# macOS/BSD sed shown; on Linux drop the '' after -i
find . -name "*.html" -exec sed -i '' 's/+44 20 7946 0958/YOUR PHONE NUMBER/g' {} +
find . -name "*.html" -exec sed -i '' 's/442079460958/YOUR WHATSAPP NUMBER (no +)/g' {} +
find . -name "*.html" -exec sed -i '' 's/info@meridianlegal.example/YOUR EMAIL/g' {} +
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

The included disclaimer text ("does not constitute legal advice...") is a
common convention for law firm websites, **not a substitute for advice from
a qualified professional** on what your jurisdiction/regulator requires.
Review your local bar/law society's rules on solicitor advertising and
website disclaimers before publishing.
