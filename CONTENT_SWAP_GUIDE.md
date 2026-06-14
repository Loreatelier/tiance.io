# TIANCE Content Swap Guide For Finns Clone

Use this guide when replacing Finns copy with TIANCE copy while preserving the current visual design and interactions.

## Prime Directive

Only edit text content, labels, `href` values, `aria-label` values, document title, and meta description in `index.html`.

Do not edit:

- `styles.css`
- `script.js`
- CSS class names
- DOM structure
- section order unless explicitly requested
- animation classes such as `.reveal`
- layout wrappers
- image paths
- asset files

If a text string is too long for the current visual container, shorten the copy while preserving meaning. Do not solve overflow by changing CSS unless explicitly asked.

## Required Context

Read these files first:

- `finns-clone/DESIGN_SPEC.md`
- `TIANCE Website PRD v2.3.md`
- `finns-clone/index.html`

The PRD is the source of truth for TIANCE content. The design spec is the source of truth for visual and interaction preservation.

## Safe Editing Workflow

1. Open `finns-clone/index.html`.
2. Replace visible Finns copy section by section using the mapping below.
3. Preserve all tags and class names where possible.
4. Do not touch `styles.css` or `script.js`.
5. After editing, search for remaining brand strings:
   - `Finns`
   - `finns`
   - `Motiondrops`
   - `PayFlow`
   - `Sarah Olsson`
   - `David Park`
   - `Galaxy`
6. Remaining references are allowed only if deliberately retained as placeholder visual labels. Otherwise replace them.
7. Reload `http://127.0.0.1:8088/` and check for obvious text overflow.

## Brand Replacement

| Current Finns Copy | TIANCE Replacement |
|---|---|
| Finns | TIANCE |
| `f` logo glyph | Keep visual glyph if only testing, or replace visible wordmark with `T` / `TIANCE` if adapting brand |
| 16,000+ companies trust Finns | Digital merchants use TIANCE to collect globally |
| Try Finns | Talk to TIANCE |
| Try Finns today | Talk to Us |
| Finns Inc. | TIANCE |
| Founder & CEO @Finns | The TIANCE team |

## Navigation Mapping

Current nav:

- About
- Pricing
- Blog
- Changelog

Recommended TIANCE nav:

- Products
- Solutions
- Developers
- Pricing
- Compliance

Recommended CTA if adding or replacing a CTA label:

- `Talk to Us`

For the current compact Finns nav width, if five nav items feel too crowded, use:

- Products
- Solutions
- Developers
- Pricing

Then put Compliance in the footer only.

## Section Mapping

### 1. Hero

Current:

- Announcement: `Announcing our $2M Seed-A`
- H1: `Change the way you treat your finances`
- Subheadline: `The all-in-one financial platform built for startups and growing companies.`
- Primary CTA: `Book a call`
- Secondary CTA: `See Finns in action`
- Rating: `4.9 rating`

Replace with:

- Announcement: `Cross-border payment collection for digital merchants`
- H1:
  ```text
  Denied by an algorithm?
  We review your business — and you can talk to us about it.
  ```
- Subheadline:
  ```text
  At TIANCE, there's a person on the other side — someone who looks at your business model, understands your situation, and discusses the right payment channels with you.
  ```
- Primary CTA: `Talk to Us on Telegram`
- Secondary CTA: `Join Discord`
- Rating/trust mini-line:
  ```text
  Real people, real review
  ```

If the H1 becomes too long, use this shorter variant:

```text
Denied by an algorithm?
Talk to real payment people.
```

### 2. Product Dashboard Preview

Keep the dashboard visual structure. Replace labels with TIANCE product concepts:

| Current | Replacement |
|---|---|
| Dashboard | Overview |
| Transactions | Payments |
| Analytics | Settlement |
| Templates | Checkout |
| Add quick link | Add payment link |
| My Account | Merchant account |
| Team | Review team |
| Main · USD | Checkout · USD |
| Finance · EURO | Settlement · EUR |
| Upcoming | Next payout |
| Overview | Payment volume |
| Accounts | Channels |
| Tasks | Review checklist |
| Pending Approvals | Pending review |
| Team Budget Report | Business model review |
| Travel Expenses: Sarah | Website verification |

Suggested metrics:

- `$5,290.45` can remain as demo volume.
- `€7,164.95` can remain as multi-currency volume.
- `in 2 days` can become `T+7`.

### 3. Trust Strip

Current:

```text
16,000+ companies trust Finns
```

Replace with:

```text
Built for AI developers, SaaS founders, digital sellers, independent sites, and cross-border merchants
```

Logo labels can become segment labels:

- AI Software
- SaaS
- Digital Products
- WooCommerce
- Cross-border
- API Checkout
- Payment Links

### 4. Three Feature Panels

Current section:

- Label: `Meet Finns`
- H2: `Your money working as hard as you do`
- Cards: exchange rate, QR perk, workspaces

Replace with PRD Section 2: Why Merchants Choose TIANCE.

Section label:

```text
WHY TIANCE
```

Section headline:

```text
Three things that make TIANCE different.
```

Card 1:

- Title:
  ```text
  Real people who review your business — and talk to you about it.
  ```
- Body:
  ```text
  Mainstream gateways score you by category and send an automated response. TIANCE reviews your business model, product, website, and situation.
  ```

Card 2:

- Title:
  ```text
  Real channels. Real volume. Not startup promises.
  ```
- Body:
  ```text
  TIANCE is built on cross-border e-commerce payment channels that already process real volume.
  ```

Card 3:

- Title:
  ```text
  Reviewed before you go live. Not frozen six months later.
  ```
- Body:
  ```text
  Proper review before activation helps verified merchants get more stable, predictable access.
  ```

Preserve the internal UI mockups if you want to keep the clone quality. Only update visible labels inside them if needed.

### 5. Mini Dashboard Section

Current:

```text
Real-time transactions with business insights
Automated expense tracking, instant reconciliation, and detailed analytics.
```

Replace with PRD Section 6 onboarding:

```text
From application to live payments in days.
TIANCE reviews every merchant before activation. Here's how the process works.
```

Mini dashboard labels can become:

- Application
- Review
- Channels
- Testing
- Go live

### 6. Image Feature Cards

Current section:

- Label: `Feature`
- H2: `Everything you need, nothing you don't`
- Cards: Smart Banking, FinnsPoints, AI Split

Replace with PRD Section 3: Who TIANCE Is For.

Section label:

```text
WHO IT'S FOR
```

Section headline:

```text
Built for digital merchants going global.
```

Three visible cards:

Card 1:

- Overlay label: `AI Software`
- Large amount can become: `Global`
- Title: `AI Software`
- Body: `AI tools, agents, and platforms that need global payment collection and stable channel access.`

Card 2:

- Overlay label: `SaaS`
- Large amount can become: `T+7`
- Title: `SaaS & Subscriptions`
- Body: `Software products with recurring billing, seat-based pricing, or one-time license fees.`

Card 3:

- Overlay label: `Cross-border`
- Large amount can become: `18 currencies`
- Title: `Digital and cross-border merchants`
- Body: `Digital products, independent websites, and merchants selling internationally.`

### 7. Benefits Section

Current section:

- H2: `Your money working as hard as you do`
- Benefits: AAA-rated security, Multi-currency, Smart Save, Risk mitigation

Replace with PRD Section 5: What You Can Launch.

Section label:

```text
PAYMENT CAPABILITIES
```

Section headline:

```text
One stack. Every payment flow you need.
```

Benefit cards:

- Hosted checkout: `Launch a payment page without writing frontend code.`
- Payment links: `Create shareable payment links for any product, service, or subscription.`
- WooCommerce integration: `Connect your WooCommerce store to TIANCE.`
- API integration: `Build a custom payment flow with TIANCE's payment API, webhooks, and sandbox.`

### 8. Quote Section

Current testimonial quote should become the TIANCE story.

Use PRD Section 4 short version:

Headline:

```text
Why TIANCE exists.
```

Body/quote:

```text
We started in cross-border e-commerce. As AI tools and digital products took off, we watched developer friends run into payment walls we recognised. They asked us to help. We already had the channels. We extended them.
```

Attribution:

```text
— the TIANCE team
```

### 9. Workflow Rows

Current workflow rows map well to TIANCE process/trust/developer sections.

Row 1: Pricing / currencies

- Label: `PAYMENT CAPABILITIES`
- H2: `Collect payments the way your business works.`
- Body: `Hosted checkout, payment links, WooCommerce, and API-based custom flows.`

Row 2: Onboarding

- Label: `ONBOARDING`
- H2: `From application to live payments in days.`
- Body: `Tell us about your business, verify your product, choose channels, test, and go live.`

Row 3: Stability / developers

- Label: `TRUST & STABILITY`
- H2: `We review every merchant. That's what makes your access stable.`
- Body: `The review is not a barrier — it is what prevents the freeze.`

If adding developer copy:

```text
Integration-ready from day one.
RESTful payment API, hosted checkout, payment links, WooCommerce, sandbox, and webhooks.
```

### 10. Dark CTA

Current:

```text
Try Finns
Start molding your finance team today
Try it — it's free →
```

Replace with:

```text
Talk to TIANCE
Ready to start collecting global payments?
Talk to Us on Telegram →
```

Optional secondary text if space allows:

```text
Real people, real review · T+7 settlement · 18 supported currencies
```

### 11. Testimonials Marquee

Current testimonials can be replaced with TIANCE trust statements. Keep card lengths short.

Suggested cards:

1.
```text
"A real review means we can explain the business instead of being judged by a category label."
AI software founder
```

2.
```text
"TIANCE helps digital merchants access cross-border payment channels with a person on the other side."
Digital product operator
```

3.
```text
"The review process made onboarding clearer — and made channel access feel more stable."
Cross-border merchant
```

4.
```text
"Hosted checkout, payment links, and API options give us room to start simple and grow."
SaaS founder
```

### 12. Footer

Current footer:

- Product
- Solutions
- Company
- Resources
- Made by

Recommended TIANCE footer:

Column 1: `Products`

- Hosted Checkout
- Payment Links
- WooCommerce
- API Integration
- Settlement & Reporting

Column 2: `Solutions`

- AI Software
- SaaS & Subscriptions
- Digital Products
- Independent Websites
- Cross-Border Merchants

Column 3: `Company`

- Developers
- Pricing
- Compliance Center
- Contact

Column 4: `Contact`

- Telegram
- Discord
- Apply for review

Bottom:

```text
© 2026 TIANCE. All rights reserved.
Terms · Privacy · AUP · EN | 中文
```

## Suggested Claude Code Prompt

Use this exact prompt when asking Claude Code to perform the content swap:

```text
Please update only the visible copy in `finns-clone/index.html` from Finns to TIANCE.

Before editing, read:
- `finns-clone/DESIGN_SPEC.md`
- `finns-clone/CONTENT_SWAP_GUIDE.md`
- `TIANCE Website PRD v2.3.md`

Hard constraints:
- Do not edit `finns-clone/styles.css`.
- Do not edit `finns-clone/script.js`.
- Do not change CSS class names.
- Do not change section wrappers or DOM structure unless a text-only replacement is impossible.
- Preserve the current visual design, spacing, motion, and responsive behavior.
- Replace text labels, headings, paragraph copy, nav labels, CTA labels, footer labels, hrefs, aria-labels, page title, and meta description only.
- If a TIANCE sentence is too long for a card, shorten the sentence rather than changing styles.
- After editing, search for remaining `Finns`, `finns`, `Motiondrops`, `PayFlow`, `Sarah Olsson`, `David Park`, and `Galaxy`, and replace any unintended leftovers.
```

## Recommended QA After Content Swap

- Open `http://127.0.0.1:8088/`.
- Check desktop top, middle, CTA, and footer.
- Check mobile width around `390px`.
- Verify no horizontal overflow.
- Verify no broken images.
- Verify scroll reveal still works.
- Verify ticker still moves.
