# Greencrest design spec

> **Owned by Claude Design.** Build (Claude Code) reads this file and never edits it.
> To change it, change it in Claude Design and hand it off again (see `/CLAUDE.md`).

**Status: missing.** The calculator code (`lib/calc/model.ts`) was built from an earlier
version of this spec, which referenced "§2 Model (reproduce exactly)". That spec text
isn't in the repo yet. Paste or upload it here so Build has a source of truth.

## Sections the spec should have

1. **Surfaces.** What gets built (for example the landing page and the savings
   calculator), who each one is for, and the Claude Design artifact link for each.
2. **Model.** Every formula and constant the calculator needs, marked
   "reproduce exactly" where numbers must match.
3. **Screens and components.** Layout, states (empty, loading, error, result), copy,
   and responsive behaviour. Link the Design artifact artboards.
4. **Tokens.** Colours, type, spacing, and radii as named values.
5. **Acceptance.** Checkable numbers and behaviours. Build turns each one into a test
   and reports it in `STATUS.md` → `acceptance`.

Each buildable item in these sections should cite its decision ID from `DECISIONS.md`.
