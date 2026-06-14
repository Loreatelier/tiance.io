# Finns Clone Experiment

This is a self-hosted static clone experiment for the public Finns Framer preview:

https://modern-seat-542676.framer.app/

## Scope

- Recreates the Finns homepage as a self-hosted static site.
- Covers the main homepage sections: floating nav, hero, dashboard preview, trust logos, feature cards, image cards, benefits, quote, workflow rows, CTA, testimonials, and footer.
- Includes Framer-like interaction feel: scroll reveal, logo/testimonial ticker motion, hover lift states, floating dashboard/phone elements, and sticky nav shadow.
- Uses hand-built HTML/CSS/JS instead of Framer runtime code.
- Intended as a self-hosting feasibility clone, not a production TIANCE page yet.

## Run Locally

```bash
python3 -m http.server 8088 --bind 127.0.0.1
```

Then open:

```text
http://127.0.0.1:8088/
```

## Notes

- The layout is intentionally close to the Finns original for visual comparison.
- The product content has not yet been adapted to TIANCE.
- Some exact Framer details are approximated, especially proprietary icons, generated class behavior, and a few image selections.
