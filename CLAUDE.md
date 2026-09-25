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
- Tests: `npm test` runs `lib/**/*.test.ts` (Node 22, no dependencies).

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

- `design/` holds Design-owned material: spec (currently empty), decisions, brief template.
  The Perspectives site was cancelled (D-013); its code and spec live only in git history.
- `public/brand/logo-256.png` is the Greencrest logo (keep it unchanged).
- `lib/calc/` has the savings model (pure TS, no I/O) and its tests. **Kept but hidden**
  (owner, 2026-09-25): no page, link, route or deploy may expose it until the owner says so.
  It will become `/analytics` later.
- `data/profiles.json` holds the 8760-hour building and PV load profiles (8-bit quantized).
- `docs/geminga/` holds Geminga's owner-supplied data scheme and the source investigations.
- `index (8).html` is the old fractional-leadership landing page (D-001), kept for reference.
