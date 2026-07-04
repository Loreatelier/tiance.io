# TIANCE.io Homepage

Static marketing homepage for TIANCE — a cross-border payment collection platform for verified digital merchants.

## Production scope

This folder is the publishable public website bundle for `tiance.io`.

It contains:

- `index.html` — homepage markup and SEO metadata
- `contact.html` — contact page and route switcher
- `styles.css` — visual system and responsive layout
- `script.js` — lightweight homepage interactions
- `api/contact.js` — Vercel serverless contact form email endpoint
- `assets/` — logo, product visuals, payment logos, and supporting imagery

No database or Supabase project is required for the current public website. The contact form uses a Vercel serverless function with Resend when `RESEND_API_KEY` is configured; direct links still fall back to Telegram, Discord, and email.

## Recommended deployment

Deploy this folder as a static site through Vercel.

### Vercel settings

- Framework preset: `Other`
- Build command: leave empty
- Output directory: `.`
- Install command: leave empty

### Contact form environment variables

Required for direct email sending:

```text
RESEND_API_KEY=...
```

Optional overrides:

```text
CONTACT_TO_EMAIL=hello@tiance.io
CONTACT_FROM_EMAIL=TIANCE <support@tiance.io>
```

### Domain

After the Vercel deployment is live, connect:

- `tiance.io`
- `www.tiance.io`

Use the DNS records shown inside Vercel for the project. Typical Vercel records are:

```text
A      @     76.76.21.21
CNAME  www   cname.vercel-dns.com
```

Always follow the exact records Vercel displays for the project.

## Run locally

From this folder:

```bash
python3 -m http.server 8088 --bind 127.0.0.1
```

Then open:

```text
http://127.0.0.1:8088/
```

## Notes before publishing

- Confirm the Telegram, Discord, and email links are correct before launch.
- Keep the site static until forms, onboarding records, login, or dashboard features require a backend.
- Do not publish the parent project folder or the old `site/` prototype folder as the production website.
