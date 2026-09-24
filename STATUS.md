commit: see latest commit on branch claude/repo-access-confirm-vb4a4g
deployed:
  site: not deployed
  analytics (calculator): not deployed, paused
done:
  - brief: website redesign ("Greencrest Perspectives") written to `design/briefs/2026-09-website-redesign.md`; waiting for Design
  - brand: logo extracted unchanged from the old site to `public/brand/logo-256.png` (256×256 PNG, the only size available)
  - D-002 (paused by owner): calculator model in `lib/calc/model.ts`, 5/5 tests pass; will move to `/analytics` later
questions:
  - Redesign: see the 5 "Open questions for Design" in the brief (logo lockup, subscribe, video hosting, article typography, placeholder articles).
  - Redesign: please assign `D-###` IDs per page (/, /perspectives, article, /topics, /video, /about) plus one for tokens.
  - Logo: only a 256 px raster exists. Is there an SVG or high-resolution original?
  - D-002 (when resumed): `design/README.md` §2 spec is missing from the repo; also the 8-bit vs full-precision annual-energy question (21,580 vs 21,579 MWh, test allows ±0.05%).
deviations:
  - none
acceptance: redesign not started (waiting for Design) · D-002 model: 21,580 MWh (spec 21,579) · $3.76M ✓ · $158K ✓
