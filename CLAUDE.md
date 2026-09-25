# Greencrest — how design and build work together

Two Claude roles share this repo. Humans decide what gets made; design says *what* it
looks like and how it behaves; build turns that into code.

| Role | Where it runs | Owns (writes) | Reads |
|---|---|---|---|
| **Design** (Claude Design, claude.ai/design) | claude.ai | `design/**` | `STATUS.md`, `design/DECISIONS.md` |
| **Build** (Claude Code) | this repo | everything except `design/**`, plus `STATUS.md` | `design/**` |
| **Owner** (you) | — | final say on anything in `design/DECISIONS.md` | everything |

Rule of thumb: **design never edits code, build never edits the spec.** Build can
disagree only through `STATUS.md` → `questions` / `deviations`.

## The loop

```
 Owner ──need──▶ Design ──spec + D-### decisions──▶ design/ ──▶ Build
   ▲                                                              │
   └──────── answers ◀── questions / deviations ◀── STATUS.md ◀───┘
```

1. **Need.** The owner describes what they want (to Design, or to Build, who writes it
   up as a brief in `design/briefs/`, see below).
2. **Design.** Claude Design produces the design (a Design artifact on claude.ai) and a
   written spec. The spec goes into `design/README.md`. Every buildable piece gets a
   decision ID `D-###` in `design/DECISIONS.md`.
3. **Handoff to Build.** Any of these works:
   - paste the Claude Design artifact link into a Claude Code session: Build reads it
     with the Artifact tool and saves the spec into `design/`;
   - upload the export or zip from Claude Design: Build copies it into `design/`
     unchanged;
   - Claude Design commits to `design/` directly, if it has repo access.
4. **Build.** Build implements the design one `D-###` at a time, runs the tests, commits,
   and rewrites `STATUS.md`.
5. **Feedback.** The owner pastes `STATUS.md` (or its GitHub link) into Claude Design.
   Design answers the questions by adding or amending `D-###` entries, then the loop
   repeats.

## Build rules (Claude Code, read this every session)

- Start by reading `design/README.md`, `design/DECISIONS.md`, and `STATUS.md`.
- Implement only what a `D-###` covers. If something is missing or ambiguous, pick
  the most conservative default, build it, and log it under `questions`. Don't stall.
- Where the spec says "reproduce exactly", match it and prove the match with a test.
- If you have to depart from the spec, log it under `deviations` with the reason.
  Never silently "fix" the design.
- Reference decision IDs in commit messages and code comments (`// D-002`).
- Always finish a session by rewriting `STATUS.md` in the format below.
- Commands (Node 22):
  - `npm run dev`: local dev server
  - `npm run build`: static export to `out/`
  - `npm test`: unit tests (`lib/**/*.test.ts`)
  - `npm run acceptance`: design/README.md §5 checks (copy vs brief, metrics, axe,
    375px overflow, figure sources) against `out/`. Set `CHROMIUM=/opt/pw-browsers/chromium`
    in cloud sessions.

## `STATUS.md` format (Build → Design)

```yaml
commit: <sha or "not pushed: reason">
deployed:
  <surface>: <url | not deployed>
done:
  - D-###: <what was built, where>
questions:
  - <D-### / area>: <question>. Proposed default: <what build did meanwhile>.
deviations:
  - D-###: <what differs from spec and why> | none
acceptance: <each acceptance check from the spec, ✓ or with actual value>
```

## Repo map

- `design/` holds Design-owned material: spec, decisions, briefs, mockup exports.
- `design/briefs/2026-09-website-redesign.md` is the brief for the Perspectives redesign;
  the spec is `design/README.md`.
- `app/` holds the Next.js App Router pages (static export). `components/` has the shared UI;
  `components/mdx/` has the article components (Evidence, PullQuote, Figure, Fn/Notes).
- `content/perspectives/*.mdx` holds articles (frontmatter: title, desc, categories, date,
  readTime, showAuthorBio, related, placeholder). `content/video/videos.json` holds videos.
- `lib/site.ts` has fixed copy and taxonomy (word for word from the brief).
- `public/brand/logo-256.png` is the Greencrest logo (keep it unchanged).
- `lib/calc/` has the savings model (pure TS, no I/O) and its tests. **Paused**: it
  moves to `/analytics` later. Don't wire it into the redesigned site.
- `data/profiles.json` holds the 8760-hour building and PV load profiles (8-bit quantized).
- `index (8).html` is the old fractional-leadership landing page. The redesign
  replaces it; keep it for reference until the new site ships.
