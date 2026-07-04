# Contact Page Clone Specification

## Source
- URL: `https://modern-seat-542676.framer.app/contact`
- Captured source: `docs/research/modern-seat-contact/source.html`
- Search index: `docs/research/modern-seat-contact/searchIndex.json`

## Extraction Notes
- Browser rendering was attempted with Playwright, but the local Playwright Chromium binary is not installed and system Chrome cannot launch headless in the current sandbox.
- Static extraction from the Framer HTML found the visible contact-page content:
  - Navigation: About, Pricing, Blog, Changelog
  - Hero: "How can we help you today?"
  - Contact email: `help@finns.io`
  - Support facts: "Available 24/7", "Responds in 1-2 hours"
  - CTA: "Join the 12,000+ businesses using Finns", "Try Finns today"
  - Footer columns: Product, Company, Resources

## Implementation Approach
- Build a new `contact.html` page in the existing static TIANCE site.
- Clone the reference page's information architecture:
  - Floating navigation
  - Centered contact hero
  - Primary contact card
  - Availability/response-time cards
  - Large CTA band
  - Footer
- Adapt all content to TIANCE:
  - Primary channels: Telegram and Discord
  - Context: application review, pricing, account questions, chargebacks, settlement
  - Tone: direct, operator-led payment support

## Responsive Behavior
- Desktop: centered hero, two-column contact body, large soft CTA band.
- Tablet: same hierarchy with narrower widths and stacked cards when needed.
- Mobile: single-column, compact nav, full-width CTA buttons, generous 24px edge spacing.

## Known Limitation
- This is a brand-adapted clone of the source contact page structure, not a pixel-perfect Framer replica, because browser screenshot extraction is unavailable in the current sandbox.
