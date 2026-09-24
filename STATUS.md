commit: see latest commit on branch claude/repo-access-confirm-vb4a4g
deployed:
  landing: not deployed
  calculator: not deployed
done:
  - D-002 (partial): calculator model ported to pure TS `lib/calc/model.ts` + `lib/calc/model.test.ts` (node:test, no deps; `npm test` → 5/5 pass)
  - process: design↔build handoff protocol added (`CLAUDE.md`, `design/`)
questions:
  - Spec: `design/README.md` is missing from the repo. Please re-export the spec (incl. §2 Model) and D-001 so build has a source of truth.
  - Calculator / acceptance test / annual energy: the prototype's 8-bit profiles.json gives 21,580.3 MWh. The README's 21,579 comes from full-precision data (reference sum 3,828,952.6 kWh scaled to 250,000 sq ft = 21,579.05). Proposed default: test annual energy within ±0.05% until full-precision arrays are in Postgres, then assert exactly. Please confirm or send the full-precision source arrays.
deviations:
  - none
acceptance: 21,580 MWh (spec 21,579; quantization, see questions) · $3.76M (3,764,000) ✓ · $157,635 ≈ $158K ✓
