# TIANCE.io Homepage

Static marketing homepage for TIANCE — a cross-border payment collection platform for verified digital merchants.

## Production scope

This folder is the publishable public website bundle for `tiance.io`.

It contains:

- `index.html` — homepage markup and SEO metadata
- `contact.html` — contact page and route switcher
- `apply.html` — static compatibility redirect from `/apply` to the current application review entry on `contact.html#apply`
- `styles.css` — visual system and responsive layout
- `script.js` — lightweight homepage interactions
- `api/contact.js` — Vercel serverless contact form email endpoint
- `scripts/predeploy-check.js` — guard against accidentally routing `/apply` back to the deleted legacy app
- `assets/` — logo, product visuals, payment logos, and supporting imagery

No database or Supabase project is required for the current public website. The contact form uses a Vercel serverless function with Resend when `RESEND_API_KEY` is configured; direct links still fall back to Telegram, Discord, and email.

## Recommended deployment

Deploy this folder as a static site through Vercel.

### Vercel settings

- Framework preset: `Other`
- Build command: `node scripts/predeploy-check.js`
- Output directory: `.`
- Install command: leave empty

The build command is intentionally a verification step. It fails the deploy if
`/apply` is routed away from local `apply.html`, or if the deleted legacy app
host / Next.js app routes reappear in this static site.

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

### Analytics and Search Console

Google Analytics is loaded through `analytics.js` on every public page except
the instant `/apply` redirect page. The script reads public config from
`/api/public-config`, so the GA ID stays in Vercel environment variables rather
than in committed HTML.

Set this in Vercel for production traffic monitoring:

```text
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
NEXT_PUBLIC_CLARITY_PROJECT_ID=xxxxxxxxxx
```

The current tracking plan records:

- `page_view` through GA4 enhanced measurement
- `cta_clicked` for links marked with `data-application-cta`
- `contact_link_clicked` for email, Telegram, and Discord links
- `contact_tab_selected` on the contact page
- `form_submitted` when the contact form sends through `/api/contact` or falls back to mailto
- `application_modal_opened` on the contact application modal

Microsoft Clarity is loaded from the same `analytics.js` file when
`NEXT_PUBLIC_CLARITY_PROJECT_ID` is configured. Use it for heatmaps and session
recordings; keep sensitive form fields masked in the Clarity dashboard.

For Google Search Console, verify `tiance.io` with DNS verification when
possible, then submit:

```text
https://tiance.io/sitemap.xml
```

`robots.txt` already points crawlers to the sitemap.

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

## Verify before publishing

Run this before every deploy:

```bash
npm run verify
```

The check blocks stale routes to the deleted application host and prevents
`/apply` from silently loading an obsolete form again.

## Notes before publishing

- Confirm the Telegram, Discord, and email links are correct before launch.
- Keep the site static until forms, onboarding records, login, or dashboard features require a backend.
- Do not publish the parent project folder or the old `site/` prototype folder as the production website.
- Do not add rewrites to the deleted legacy app host, `/_next`, `/api/applications`, or `/auth` unless the full app has been intentionally rebuilt and re-approved for production.
