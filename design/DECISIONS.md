# Decisions log

> **Owned by Claude Design; approved by the owner.** Append-only. To change a decision,
> add a new entry that supersedes it. Don't rewrite old entries.
> Build cites these IDs in commits, code comments, and `STATUS.md`.

| ID | Decision | Status | Notes |
|---|---|---|---|
| D-001 | Fractional-leadership landing page + PDF lead gate | superseded by D-004 | The old `index (8).html`. Retire it when D-004 ships |
| D-002 | Savings calculator model, reproduced exactly | paused | 21,580 vs 21,579 MWh: **accepted**. The 8-bit profiles are within the ±0.05% tolerance. The full §2 model spec is in the earlier handoff bundle; Design will re-issue it when `/analytics` resumes |
| D-003 | Tokens: Newsreader + Public Sans, paper/ink/green palette, radius 0 | proposed | README §2 |
| D-004 | Homepage `/` | proposed | README §1, §3 |
| D-005 | Perspectives archive, article card, filters | proposed | Filters use `?topic=`, links from /topics |
| D-006 | Article template + evidence / pull quote / figure / notes components | proposed | Placeholder marks required until the text is real |
| D-007 | Topics page | proposed | |
| D-008 | Video: **self-hosted** (Mux or Cloudflare Stream, custom player UI) | proposed | Answers brief Q3. A privacy-mode YouTube embed still shows platform branding and related videos, which the brief rules out |
| D-009 | About page | proposed | |
| D-010 | Subscribe block: visual and 3 states | proposed | Answers brief Q2. Provider chosen by Build |
| D-011 | Logo: full-colour mark at 32px in the header. A one-colour lockup is allowed only on the night surfaces | proposed | Answers brief Q1. The mark is unchanged. Owner to supply an SVG/1024px original; 256px is enough for 32px @2x |
| D-012 | Article placeholders: structural placeholder text is allowed only with visible PLACEHOLDER marks | proposed | Answers brief Q5 |
