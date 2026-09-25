# Owner confirmations (2026-09-25)

1. **Labels.** The database keeps four field types: OBSERVED, CALCULATED, INFERRED and
   FORECAST. The UI shows three labels (presentation only):

   | Database | UI |
   |---|---|
   | OBSERVED | Observed |
   | CALCULATED | Derived |
   | INFERRED | Estimate |
   | FORECAST | Estimate |

2. **Buying windows.** Deterministic day offsets from the reported construction start. Not a
   percentage of build duration.
3. **Matching.** Territory and minimum project value are hard filters. Weights: category
   relevance 35%, commercial timing 25%, freshness 15%, evidence quality 15%, project-type fit
   10%.
4. **Houston.** Source priority:
   1. TDLR statewide
   2. Houston private building permits/inspections
   3. DFW municipal sources
   4. Austin later

   **Don't write the Houston adapter until the official machine-readable source is verified.**
   Candidate endpoints or reports aren't enough. For each Houston source, document:

   - official owner
   - URL/API endpoint
   - machine-readable format
   - update frequency
   - unique record ID
   - permit/application number
   - address
   - project/work description
   - valuation
   - square footage
   - application/submittal date
   - issue date
   - status
   - contractor/company
   - inspection events
   - final/CO event, if available
   - terms/reuse restrictions

   Then test linkage against several known TDLR Harris County projects before choosing the
   production source.
5. **Supabase.** Create a new dedicated Geminga project. If that costs anything, stop and
   report the exact cost first. **Done:** project `geminga` (ref `panzdsqxlsasjxgzsyua`,
   us-east-1), created in org "letsg0" on the free plan at $0.
6. **Network.** The owner handles the environment allowlist. Until the Houston endpoints are
   reachable, don't treat unverified candidate sources as production-ready.
7. **Precedence.** `build-decisions-final.md` is the controlling product/MVP brief. Where it
   conflicts with `data-scheme.md`, the data scheme controls the data model, source order
   and match logic.

**Next step:** once network access works, finish the Houston source investigation, send the
owner the findings and recommended source(s), and **wait for approval** before writing the
Houston adapter. Don't spend time on Austin now.
