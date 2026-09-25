# Greencrest design spec: Perspectives site

> Owned by Claude Design. Build reads this file and never edits it. Brief: `design/briefs/2026-09-website-redesign.md`.
> Design artifact: `design/mockups/Greencrest Perspectives.dc.html`. Open it next to `support.js` and `public/brand/logo-256.png`. Hash routes: `#/`, `#/perspectives`, `#/perspectives/<slug>`, `#/perspectives/in/<topic>`, `#/topics`, `#/video`, `#/about`.

All copy comes from the brief, word for word. The mockup is the reference for anything below that isn't stated in numbers.

## 1. Surfaces
| Route | D-### | Notes |
|---|---|---|
| `/` | D-004 | Hero, Perspectives (1 lead + 3 list), Areas of interest, Questions, Video band, About (short), Email, Footer |
| `/perspectives` | D-005 | Intro, filter row, card grid, empty state |
| `/perspectives/[slug]` | D-006 | Article template: see §3 |
| `/topics` | D-007 | Six rows. Each links to `/perspectives?topic=<topic>` |
| `/video` | D-008 | Featured player + grid |
| `/about` | D-009 | Greencrest + Sarem |
| subscribe | D-010 | Visual and states only. Provider TBD |
| `/analytics` | D-002 | Paused. Not in nav |

## 2. Tokens (D-003)
**Colour**
- `paper` #F6F4EE (the only page background)
- `ink` #161816 (headlines, primary buttons, 1px structural rules)
- `text` #22241F (article body) · `text-2` #46463F · `text-3` #5A5952 · `muted` #66645C · `faint` #8A877E
- `rule` #D6D2C8 (secondary hairlines) · `rule-soft` #E4E0D6 (chart gridlines)
- `accent` #1F5138 (category labels, links, focus, hover) · `accent-soft` #DCE5DA (text selection)
- `night` #142019 / `night-2` #1D2C24 (video surfaces only) · `night-label` #9FB8A6 · `night-text` #B9C2BA
- `caution` #8A6A1F (UNCERTAINTY label) · `error` #9A3B26 (form error, PLACEHOLDER marks)

**Type**
- Serif `Newsreader` (Google Fonts, opsz 6–72, weights 300–600 + italic): all headlines, standfirsts, article body, questions.
- Sans `Public Sans` 400/500/600: nav, labels, UI, card descriptions, metadata.
- Label: Public Sans 600, 12px, tracking 0.18em (section labels) or 0.14em (category), uppercase.
- Scale: hero H1 clamp(38px, 5.4vw, 70px) / 1.04 / −0.018em · article H1 clamp(38px, 5.2vw, 64px) / 1.03 · page H1 clamp(34px, 4.4vw, 58px) · lead card 32–48px · card title 26–32px · list title 26px · article body 20px / 1.62 · standfirst 20–24px / 1.42 · UI body 15–16px / 1.55–1.65 · meta 13px.
- Tabular numbers on dates, durations, and figures. `text-wrap: balance` on headlines, `pretty` on paragraphs.

**Space and shape**
- Container max-width 1240px. Side padding clamp(20px, 5vw, 56px). Article column 760px.
- Section vertical padding clamp(56px, 8vw, 104px).
- Radius 0 everywhere. The only round shape is the play button.
- No shadows and no gradients, apart from the video control scrim.

## 3. Screens and components
- **Header (all pages):** sticky, paper background, 1px ink bottom rule. Logo 32px + wordmark (Public Sans 600, 13px, tracking 0.2em). Nav: 14px/500. The active item is ink with a 1px ink underline. Inactive items are `text-3`.
- **Article card (D-005):** 1px `rule` top border. Shows only: CATEGORY → title → one sentence → `date · read time`. Never show counts, likes, or comments. Whole card is the link. Title turns `accent` on hover.
- **Filters:** square chips with a 1px ink border. The active chip is filled ink with paper text. Empty state: "No perspectives in {topic} yet."
- **Article (D-006):** back link → category → H1 → standfirst → byline bar (ink top rule, `rule` bottom: "By Sarem Yousuf" left, date · read time right) → body. Components:
  - Drop cap on the first paragraph.
  - Section heading: Newsreader 500, 28px.
  - Footnote marker: Public Sans 12px superscript in `accent`, linking to NOTES at the end.
  - **Evidence block:** a two-column grid (label | definition + text) with ink rules top and bottom and `rule` between rows. FACT and INTERPRETATION labels are ink, UNCERTAINTY is `caution`, PERSPECTIVE is `accent`. Use it inline wherever an article separates claims.
  - **Pull quote:** Newsreader 300 italic, 26–36px, with `rule` lines above and below.
  - **Figure:** title stated as a finding (Public Sans 600, 15px) → unit/geography/period line → chart (ink baseline, `rule-soft` gridlines, series in #9FB0A3, the highlighted point in `accent`) → a source line is **required** under every chart.
  - RELATED PERSPECTIVES: 3 cards. ABOUT THE AUTHOR: optional, per-article flag.
- **Placeholder marking:** until real article text exists, render a dashed box reading "PLACEHOLDER TEXT" above the body, and "PLACEHOLDER DATA" on figures. Both must be removed before publishing.
- **Video (D-008):** self-hosted (see D-008). The featured player shows a poster (night-2 background with the title typeset in serif; no thumbnails of faces), a centred play button, and a minimal control bar (play, progress, time, CC). Cards show a poster, title, one sentence, and `date · duration`. Clicking a card loads it into the player. No view, subscriber, or like counts, and no platform branding.
- **Subscribe (D-010):** input and button on one row, wrapping on narrow screens. States: idle; error (red border, "Enter a valid email address."); done ("Subscribed as {email}.").
- **Imagery:** the only photo slot is the homepage lead article (16:9, documentary photography). It's optional; with no photo, the lead card goes text-only. Everything the brief's "Do not use" list rules out stays out.
- **Mobile:** every multi-column row wraps into a single column (flex-wrap with basis 320–460px). The nav wraps under the wordmark. No hamburger menu: four items fit.

## 4. Sample content (marked, replace before publishing)
Dates, read times, and video durations in the mockup are samples. The four articles double as the sample videos. Titles and descriptions are the owner's copy.

## 5. Acceptance
- All copy matches the brief character for character (diff against the brief).
- No element renders a count, like, comment, or follower metric.
- There are no "Book a Call" elements anywhere, and no consulting language beyond what the brief contains.
- Lighthouse accessibility ≥ 95. Body text contrast ≥ 4.5:1 (`text-3` #5A5952 on paper = 6.6:1).
- Every `<figure>` with a chart has a source line.
- At 375px width, nothing scrolls horizontally.
