commit: 088560b (last code commit on claude/repo-access-confirm-vb4a4g; this file is committed right after it)
deployed:
  site: not deployed (static export builds to `out/`; hosting not chosen, see questions)
  analytics (calculator): not deployed, paused (D-002)
done:
  - design round 1: imported unchanged into `design/` (README, DECISIONS, mockups)
  - D-003: Next.js 16 App Router, static export; tokens as CSS variables in `app/globals.css`; Newsreader (variable, opsz) + Public Sans self-hosted via Fontsource (no Google Fonts request)
  - D-011: header with the unchanged logo at 32px, full colour (`components/Header.tsx`)
  - D-010: subscribe block with idle / error / done states (`components/Subscribe.tsx`, `lib/subscribe.ts`)
  - D-004: homepage `/` (`app/page.tsx`). The lead card is text-only because there's no documentary photo
  - D-005: `/perspectives` archive, square filter chips, `?topic=` filter, empty state
  - D-006: `/perspectives/[slug]` article template. Articles are MDX in `content/perspectives/`. Components: `<Evidence>` with `<Fact>/<Interpretation>/<Uncertainty>/<Perspective>`, `<PullQuote>`, `<Figure>` (the build fails if a chart has no `source`), `<Fn n>` + `<Notes><Note n>`, optional author bio, 3 related
  - D-012: `placeholder: true` in frontmatter shows the PLACEHOLDER TEXT box; `<Figure placeholder>` shows PLACEHOLDER DATA; placeholder articles are `noindex`
  - D-007: `/topics`, six rows linking to `/perspectives/?topic=<topic>`
  - D-008: `/video` with a custom player (poster, centred play, play/seek/time/CC bar) and a card grid that loads the chosen video into the player. Video data is in `content/video/videos.json`
  - D-009: `/about`
questions:
  - D-010 / provider: Build recommends Buttondown (plain, independent-newsletter feel, no tracking by default); the owner needs to open the account. Proposed default: until `NEXT_PUBLIC_SUBSCRIBE_ENDPOINT` is set, the form validates but never claims success (see deviations).
  - D-008 / provider: Mux or Cloudflare Stream? The owner needs to pick one and open the account. Proposed default: the player plays any `src` MP4 now. HLS (.m3u8) works natively in Safari only, so hls.js gets added once the provider is chosen. All 4 videos are samples with no `src`, so play is disabled and marked SAMPLE.
  - Hosting: where should the static `out/` folder be deployed, and on which domain? Proposed: Render static site or Cloudflare Pages (both free for this size). Nothing is deployed yet.
  - D-011: still need the SVG or 1024px logo original. 256px is used meanwhile (enough for 32px @2x).
  - D-012 / content: real article text, dates, read times and video durations are needed. All current values are the mockup's samples.
  - D-004: a documentary photo for the lead card, if wanted. Otherwise it stays text-only.
  - D-001: `index (8).html` is kept until the new site is deployed, then deleted.
deviations:
  - D-003: text that the mockup sets in `faint` #8A877E (dates, read times, question numbers, footer ©, input placeholder) uses `muted` #66645C instead. faint is 3.27:1 on paper, which fails the §5 requirement of ≥ 4.5:1; muted is 5.39:1. faint is still used for non-text marks. Please confirm, or pick another shade.
  - D-010: added two states the spec doesn't have. "sending" disables the button while the request runs. "failed" shows "Subscription is not available yet. Please try again later." That copy isn't in the brief; please approve or replace it.
  - D-006: footnotes have a ↩ back-link, and the targeted note is highlighted in accent-soft (accessibility; not in the mockup).
  - D-008: sample videos show a small SAMPLE label next to the date (README §4 says samples are marked but not how).
  - All pages: added a "Skip to content" link, visible only on keyboard focus (accessibility).
acceptance: copy matches the brief ✓ (automated in `npm run acceptance`) · no counts/likes/comments/followers ✓ · no "Book a Call" or consulting language ✓ · Lighthouse accessibility 100 on all 6 routes ✓ (axe WCAG 2.1 AA: 0 violations) · body text contrast ≥ 4.5:1 ✓ (with the D-003 deviation) · every chart figure has a source line ✓ (enforced at build) · no horizontal scroll at 375px ✓ (all routes)
