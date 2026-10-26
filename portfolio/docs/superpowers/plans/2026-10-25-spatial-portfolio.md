# Spatial portfolio implementation plan

> Execute in the current repository using executing-plans. The user's supplied mission is the specification and explicitly authorizes implementation without design approval pauses.

**Goal:** Upgrade the existing bilingual portfolio with refined typography, spatial portrait presentation and product-style project showcases.
**Architecture:** Keep React/Vite, providers, data services, section anchors and all integration contracts. Change presentation components and scoped CSS; use existing Framer Motion for bounded pointer tilt. No WebGL or new dependencies.
**Spec:** User attachment `70ae6c83-3dda-4183-b7aa-1a75fc7477a3/Pasted text.txt`.

## Design decisions

Warm white and graphite content surfaces, one blue action accent, generous responsive typography, rounded physical surfaces and restrained shadows. The hero pairs a clear React/web identity with a layered portrait plate using the existing admin-controlled portrait. Keep all original facts and biography. Project images remain real and data-driven. Existing light/dark modes remain coherent.

Considered: a WebGL scene (unnecessary runtime cost); multiple live project previews in the hero (duplicate content subscription and image loading); selected a CSS portrait composition with shared pointer tilt instead. No invented results or credentials.

## Global constraints

No edits to admin, Firebase configuration/queries, settings/project mappers, CV delivery, environment files, deployment, data contracts, project records or public links. Preserve home/about/stack/work/contact anchors, mobile bottom navigation, theme/language persistence, project tabs, case sheets, galleries, carousel, CV and contact links. User requests direct in-place work; no separate checkout or deployment.

## Tasks / ledger

- [x] 1. Audit: inspect source and live baseline; inventory dependencies, data flows, controls and tests. Baseline: 10 unit tests and production build pass.
- [ ] 2. Implement tokens, navigation, spatial hero and pointer tilt. Verify hero at 320/390/768/1440 widths, both directions and themes; reduced motion and portrait failure.
- [ ] 3. Apply editorial about, capabilities, project showcases, contact, footer and modal treatments. Keep content and actions intact. Verify both project/skill categories and gallery interactions.
- [ ] 4. Browser regression: anchors, theme/language persistence, keyboard tabs/dialog focus, live Firestore content/assets, published CV response, contact destinations. Capture screenshots and inspect console/overflow.
- [ ] 5. Polish, build/unit checks, independent review, report precise tested/untested boundaries.

## QA inventory and review focus

1. Layout matrix: 320, 375, 390, 430, 768, 1024, 1440, 1920; English/Arabic; light/dark. Hero CTAs visible without overlap; all text wraps; no horizontal overflow.
2. Navigation: every anchor, active states, phone dock, tablet menu/Escape/resize. Keyboard focus visible and no scrolling trap.
3. Content: skills Web/Mobile, projects Web/Mobile, case sheets, close/Escape/focus return, carousel arrows/swipe, full gallery and nested Escape. Actual project image sources and outbound URLs.
4. Integration: Firestore content/settings load; portrait and Cloudinary images; CV published URL opens real PDF or honest fallback. Contact is outbound links (no form exists); authentication is admin-only and untouched. No real email/WhatsApp message will be sent.
5. Edge states: reduced motion, missing/broken portrait/project imagery, mobile landscape/dialog height, text at 200% zoom. Distinguish network/service failures from UI regressions.

## Execution notes

- Reversible visual edits validated with browser screenshots/behavior checks rather than unit tests that mirror markup. Existing CV/settings tests remain unchanged.
- Persistent Node REPL tool failed during bootstrap; use the bundled Playwright through Node scripts with installed Chrome. No dependency installation.
- Live site maintains long-lived network activity; use DOM readiness and explicit UI checks rather than network-idle as a completion signal.
