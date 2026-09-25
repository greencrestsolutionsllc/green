# Geminga data scheme (Houston-first)

> Owner-supplied, 2026-09-25. This supersedes the data model, match weights and source
> order in the earlier "Geminga — Build & Design Brief" (Claude Docs) wherever they differ.

**The architecture in one line:** TDLR finds the project; Houston tells Geminga what has
happened to it since; Geminga's rules translate that into commercial timing; the customer's
profile decides whether they see it.

```
TDLR TABS (statewide project discovery)
  → CANONICAL PROJECT
  → HOUSTON PERMIT / INSPECTION DATA (lifecycle enrichment)
  → PROJECT EVENTS
  → COMMERCIAL TIMING ENGINE
  → CATEGORY MATCHING
  → USER / COMPANY MATCHES
  → FEED | MAP | ANALYTICS
```

## Source priority

1. **TDLR TABS**: statewide discovery.
2. **Houston building permits, inspections and permit progression**: first lifecycle enrichment.
3. **DFW municipal permit sources**: evaluate Dallas, Fort Worth, Arlington, Irving and the
   other major jurisdictions one by one; DFW is fragmented.
4. **Austin**: later. Don't build the Austin adapter unless Houston proves materially unsuitable.

Houston Public Works GeoHub is a separate source family (roads, water, wastewater, capital
infrastructure). Don't confuse it with Houston's building-permitting system. Private
commercial-building lifecycle data comes from the Houston Permitting Center / City of Houston
permit systems and official GIS/API services.

**Before building the Houston adapter:** identify the official machine-readable
building-permit and inspection endpoints and document each of the fields below (see
`houston-sources.md`). Then test record linkage between Houston permits and TDLR projects
using address, project/facility name, owner, dates and value.

- permit / application ID
- project address
- permit type
- application / submittal date
- issue date
- permit status
- valuation
- square footage
- work description
- contractor / company fields
- inspection events and statuses, where available
- certificate / final events, where available

## Core tables

**projects**: id, slug, project_name, facility_name, address, city, county, state, zip,
latitude, longitude, project_archetype, work_type, scope_text, reported_project_value,
square_feet, registration_date, reported_start_date, reported_completion_date,
observed_status, latest_event_date, is_demo, created_at, updated_at

**sources**: id, name, source_type, base_url, active.
Examples: `TDLR_TABS`, `HOUSTON_PERMITS`, `HOUSTON_INSPECTIONS`, `TDLR_LICENSES`

**project_source_records**: id, project_id, source_id, source_record_id, source_url,
retrieved_at, raw_payload

## Houston lifecycle

**project_events**: id, project_id, source_id, event_type, event_date, event_status,
permit_number, permit_type, description, field_type, confidence, source_record_id, created_at

- `event_type` values:
  - `TABS_REGISTERED`
  - `PERMIT_APPLIED`
  - `PERMIT_ISSUED`
  - `PERMIT_UPDATED`
  - `INSPECTION_REQUESTED`
  - `INSPECTION_PASSED`
  - `INSPECTION_FAILED`
  - `FINAL_INSPECTION`
  - `CERTIFICATE_ISSUED`
  - `CONTRACTOR_OBSERVED`
- `field_type` values: `OBSERVED`, `CALCULATED`, `INFERRED`, `FORECAST`

## Companies involved

**organizations**: id, name, normalized_name, organization_type, website, city, state

**project_participants**: id, project_id, organization_id, role, source_id, confidence.
Roles:

- `OWNER`
- `TENANT`
- `DEVELOPER`
- `DESIGN_FIRM`
- `ARCHITECT`
- `ENGINEER`
- `GC`
- `ELECTRICAL_CONTRACTOR`
- `MECHANICAL_CONTRACTOR`
- `FIRE_CONTRACTOR`
- `RAS`
- `OTHER`

**Rule:** never create a contractor relationship unless a source actually identifies that
contractor on that project.

## Categories and rules

**commercial_categories**: id, slug, name, active. Starting slugs:

- `material_handling`
- `racking`
- `fire_protection`
- `electrical_contracting`
- `switchgear`
- `transformers`
- `generators`
- `hvac_equipment`
- `mechanical_contracting`
- `building_controls`
- `industrial_controls`
- `security_access_control`
- `loading_docks_doors`

**archetype_category_rules**: id, project_archetype, category_id, relevance_score,
buy_window_start_offset_days, buy_window_end_offset_days, rule_confidence, rule_version.
Example: `warehouse_logistics` + `material_handling` → HIGH relevance, buy window =
construction start +90 to +240 days.

**project_category_opportunities** (derived): id, project_id, category_id,
category_relevance, estimated_buy_window_start, estimated_buy_window_end, commercial_timing,
timing_confidence, evidence_confidence, method_version, generated_at.
`commercial_timing` values: `EARLY`, `PRE_BID`, `ACTIVE`, `LATE`, `UNKNOWN`

## Customer profile

**company_profiles**: id, user_id, company_name, website, minimum_project_value, created_at,
updated_at. Each has these join tables:

- `company_profile_categories` (profile_id, category_id)
- `company_profile_geographies` (profile_id, geography_type, geography_value), for example
  `METRO|HOUSTON`, `METRO|DFW`, `COUNTY|HARRIS`, `STATE|TX`
- `company_profile_archetypes` (profile_id, project_archetype)

## Matches

**user_matches**: id, profile_id, project_id, category_id, category_score, timing_score,
freshness_score, evidence_score, project_type_score, overall_score, match_reason_codes,
created_at

**Hard filters, applied before scoring:** territory must match, and the project must meet
the minimum project value.

**Weights:**

| Component | Weight |
|---|---|
| Category relevance | 35% |
| Commercial timing | 25% |
| Freshness | 15% |
| Evidence quality | 15% |
| Project type fit | 10% |

## Prospect feeds

**prospect_feeds**: id, token, company_name, website, minimum_project_value, expires_at,
revoked_at, created_at, plus join tables for categories, geographies and archetypes (same
shape as the profile tables). Served at `/share/[random-token]`, so a feed can be built
before the prospect is contacted.

## Data flow

1. A TDLR record creates or updates a row in `projects`.
2. Houston permits are matched to the project by address + project name + dates + owner + value.
3. Matched permits become `project_events`, which update the latest event and the observed
   lifecycle evidence.
4. `archetype_category_rules` produce the commercial category, the estimated buying window
   and the commercial timing.
5. Company profile filters apply.
6. The result lands in `user_matches`, which is the customer's Geminga feed.
