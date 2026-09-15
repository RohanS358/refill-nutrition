# Accessibility

Target: WCAG 2.2 AA.

## Structure
- Landmarks: `header` (banner), `nav` with `aria-label`, `main`, `footer`
  (contentinfo). One `h1` per page; sections use `h2`, sub-blocks `h3`.
- Skip link ("Skip to content") is the first focusable element, visible on focus.
- Section indices ("01") and decorative data are `aria-hidden`; informational stats
  pair number + visible label.
- SVG graphics split two ways. **Decorative** ones (texture, ornament — `dot-lattice`,
  `hex-ring`) stay `aria-hidden focusable="false"`. **Informational** ones that carry
  labels or convey a sequence (`pathway`, `blueprint`) are content: they take
  `role="img" focusable="false"` and a `<title>` naming what they show, and must not be
  `aria-hidden` — that would hide real content from assistive tech.

## Keyboard
- Everything interactive is a `button`/`a` — no clickable divs.
- `:focus-visible` ring: 2px `--primary` offset 2px (4px on dark via `--pulse`),
  radius 0 to match the system. Never `outline: none` without replacement.
- Mobile menu: focus is moved into the dialog, Escape closes, focus returns to the
  trigger; background scroll locked.
- Marquee/ticker is `aria-hidden` (duplicated content) with a visually-hidden static
  list alternative.

## Color & contrast
Verified pairs in `color-system.md`. Rules: body text ≥ 4.5:1, large display ≥ 3:1,
UI borders ≥ 3:1 against adjacent fills, and color is never the only signal
(links in prose are underlined).

## Motion
- Full `prefers-reduced-motion` support: reveals/draws/counters/ticker/scroll-scenes
  all resolve to static final states via a global CSS override + JS checks in hooks.
- No autoplaying video, no flashing content.

## Forms (contact)
- Every input has a visible `<label>`; errors are text + `aria-describedby`,
  not color alone; submit feedback announced via `aria-live="polite"`.

## Review checklist (per PR)
axe pass, keyboard-only walkthrough, 200% zoom reflow, reduced-motion pass,
screen-reader spot check on new sections.
