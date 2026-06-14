# Finns Clone Design Specification

This document summarizes the design system and implementation rules for the self-hosted Finns homepage clone in this folder.

## Design Intent

- Visual direction: calm premium fintech SaaS.
- Core feeling: soft, trusted, spacious, product-led, not flashy.
- Primary reference: Finns Framer template at `https://modern-seat-542676.framer.app/`.
- Implementation goal: close visual clone that can be self-hosted without Framer runtime.

## Global Tokens

Defined in `styles.css` under `:root`.

```css
--page: #f3f2f1;
--ink: #2b2d2d;
--muted: #666;
--soft: #8c8c8c;
--line: #e7e6e4;
--lime: #d8f9b8;
--card: #fff;
--panel: rgba(247, 247, 247, 0.9);
--radius-xl: 24px;
--radius-lg: 16px;
--radius-md: 12px;
--font: Inter, "Inter Placeholder", sans-serif;
```

## Typography

- Font: Inter.
- Primary heading style:
  - Weight: `500`
  - Letter spacing: around `-0.055em`
  - Line height: around `1.0` to `1.05`
  - Color: `#2b2d2d`
- Large section headings:
  - `clamp(40px, 3.4vw, 48px)`
  - Weight `500`
  - Tight tracking
- Hero heading:
  - `clamp(52px, 4.25vw, 60px)`
  - Weight `500`
  - Line height `1`
- Body copy:
  - `15px` to `18px`
  - Color `#666`
  - Line height around `1.45` to `1.55`

## Layout Rules

- Page background is warm off-white `#f3f2f1`.
- Main content max width is usually `1280px`.
- Global horizontal gutter:
  - Desktop: `40px`
  - Mobile: `20px`
- Most major blocks use:
  - `width: min(1280px, calc(100% - 40px))`
  - large vertical spacing, typically `80px` to `150px`.
- Rounded large containers use `24px`.
- Cards use `16px`, `18px`, or `20px` depending on hierarchy.
- Original Finns rhythm is very airy. Avoid compressing vertical whitespace too much.

## Navigation

Selector: `.floating-nav`

- Fixed top nav.
- Width: `473px`
- Height: `52px`
- Top: `24px`
- Background: `#2b2d2d`
- Radius: `12px`
- Centered with `left: 50%` and `translateX(-50%)`.
- Link text is white, `14px`, weight `500`.
- Logo block:
  - `36px x 36px`
  - Lime background
  - Rounded `9px`
  - Italic `f`
- Scrolled state adds stronger shadow via `.floating-nav.is-scrolled`.

## Hero

Selectors: `.hero`, `.hero-container`, `.hero-copy`, `.hero-ctas`

- Hero min height: `627px`.
- Hero padding: `220px 40px 120px`.
- Hero container width: `1280px`.
- Copy and CTAs are split horizontally.
- Announcement pill:
  - White background
  - Fully rounded
  - `14px` text
  - Lightweight shadow
- CTA button:
  - Height `48px`
  - Rounded pill
  - Dark primary button
- Secondary video button is visually light, transparent, with white play circle.

## Product Dashboard Preview

Selectors: `.dashboard-stage`, `.dashboard-shell`, `.sidebar`, `.app-window`

- Stage contains a large lime product panel.
- Dashboard shell:
  - Width `1280px`
  - Height `800px`
  - Padding `48px`
  - Radius `24px`
  - Background `#d8f9b8`
  - Overflow hidden
- Dashboard app:
  - Height `704px`
  - Side panel width `188px`
  - App window fills remaining width
  - App background white
  - Window radius `16px`
- UI style is intentionally soft and low-contrast.
- Borders: `#e7e6e4`.
- Active side nav background: `rgba(217, 217, 217, 0.4)`.
- Chart bars use lime fill, with one active outlined bar.

## Feature Cards

Selectors: `.feature-panel`, `.image-card-grid`, `.spend-card`

- Three-column desktop layout.
- Cards use pale gray `#ededeb`.
- Cards lift on hover.
- Feature panel padding: `58px 40px 40px`.
- Feature image cards use real local assets in `assets/`.
- Image cards:
  - Rounded `20px`
  - Overlay labels are white translucent pills.
  - Large white amount text overlays the image.
- Note: Some image assets are approximations from the Framer asset bundle, not always exact one-to-one matches.

## Benefits And Workflow

Selectors: `.benefits`, `.workflow-section`, `.workflow-row`, `.workflow-ui`

- Benefits section uses two-column copy plus decorative phone stack.
- Phone cards are CSS-generated decorative shapes, not real app screenshots.
- Workflow rows are three-column desktop:
  - Copy column
  - UI card column
  - UI card column
- Workflow UI cards use:
  - Background `#ededeb`
  - Radius `20px`
  - Padding `28px`
- Pills/chips use white or lime backgrounds.

## CTA

Selector: `.dark-cta`

- Dark block centered at max width `1280px`.
- Min height `520px`.
- Background `#2b2d2d`.
- Bottom radius `24px`.
- Heading is white, large, and centered.
- Lime CTA button uses `#d8f9b8`.

## Testimonials

Selectors: `.testimonial-marquee`, `.testimonial-track`

- Centered heading.
- Cards scroll horizontally via CSS keyframes.
- Ticker pauses on hover.
- Cards:
  - Width `310px`
  - Background white
  - Radius `18px`
  - Subtle shadow

## Footer

Selector: `.site-footer`

- Full-width rounded panel with `8px` page inset.
- Background uses `--line` (`#e7e6e4`).
- Min height `800px`.
- Top CTA row, five-column link grid, bottom copyright/logo row.
- Large italic footer `f` logo at bottom right.

## Motion And Interaction

Implemented in `script.js` and `styles.css`.

- Scroll reveal:
  - `.reveal` starts slightly translated and transparent.
  - `.reveal.is-visible` animates to visible.
  - Long sections such as quote, workflow, CTA, and footer are forced visible to avoid unreadable "white fog" during scrolling.
- Ticker:
  - `.testimonial-track` uses `@keyframes slideTrack`.
  - Pauses on hover.
- Hover:
  - Cards lift slightly.
  - Buttons translate up by `-2px`.
  - Summary/workflow cards gain soft shadow.
- Floating:
  - `.dashboard-shell` and phone cards use `gentleFloat`.

## Responsive Rules

- At `max-width: 980px`:
  - Main grids collapse to one column.
  - Dashboard shell scales down.
  - Phone stack is hidden.
  - Footer becomes one-column.
- At `max-width: 640px`:
  - Hero heading reduces to `46px`.
  - Dashboard shell scales down more aggressively.
  - Logo grid wraps.
- Mobile QA result:
  - Checked at `390px`.
  - No horizontal overflow.
  - Images loaded.

## Known Approximation Areas

- Exact Framer runtime animations are approximated with CSS/JS.
- Some proprietary/generated icons are approximated with text symbols.
- Some image choices are from the Framer asset bundle but may not match exact original placement.
- Fonts use Google Inter rather than every exact bundled Framer font.
- Dashboard UI is hand-built, not exported from Framer source.

## Editing Guidance

- Keep the visual language soft, spacious, rounded, and product-led.
- Avoid high-saturation colors except lime accent.
- Avoid heavy shadows; use soft lift only.
- Keep heading weight at `500`; do not make headings bold unless intentionally changing the style.
- Preserve large vertical gaps. The airy rhythm is part of the design.
- If adapting to TIANCE:
  - Keep the page structure and motion.
  - Replace Finns copy and dashboard content.
  - Redesign hero/dashboard content around cross-border payment collection.
  - Preserve the visual tokens unless there is a deliberate brand redesign.
