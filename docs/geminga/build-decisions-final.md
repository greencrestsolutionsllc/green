# Geminga: build decisions (final)

> Owner-supplied, 2026-09-25. **This is the controlling product and MVP brief.** Where it
> conflicts with `data-scheme.md`, the newer data scheme controls the data model, source
> order and match logic (see `owner-confirmations.md`).

## 1. Repository and application

Build Geminga inside the existing `green` repository. The deleted Perspectives site no longer
creates a runtime conflict, so Geminga can live in `green` next to the hidden calculator.

Geminga is a live Next.js application backed by Supabase/Postgres.

Do not rebuild the deleted Perspectives site.

## 2. Business model

Greencrest Solutions has two offers built on the same underlying intelligence engine:

- **Geminga** is for companies that already have their own sales/business-development team.
  Geminga gives them a personalized capital-project opportunity feed.
- **Greencrest Commercial Desk** is for companies that want Greencrest to help develop the
  market through account development, outreach, channels, partnerships and project pursuit.

Core model: **Geminga finds the market. Greencrest can work the market.**

A public visitor searches. A registered company receives matches.

Do not turn the registered experience into another filter-heavy construction database.

## 3. Initial customer

Start with small and midsize, commercially serious companies selling into capital projects.
Conceptual range:

- roughly $10M–$250M annual revenue
- typically 2–25 people in sales / BD
- regional or multi-state coverage
- one project win can be worth meaningful revenue

Initial commercial test:

- Seller category: material handling / warehouse systems
- Project archetypes: warehouse/logistics + manufacturing
- Initial metros: Houston + DFW
- Austin: first lifecycle-data test market because of its public building-permit data, not
  one of the first two sales metros. **Superseded by `data-scheme.md`:** Houston is the first
  lifecycle source; Austin comes later.

Do not validate all categories at once.

## 4. Public experience

Public users can:

- search projects by company, project, city, county, address or keyword
- view results as List or Map
- open project pages
- see observed public-record fields
- see limited Geminga-derived fields

Primary conversion CTA: **Build My Feed**. Public search proves that the data is real.

## 5. Registration and onboarding

Keep onboarding short. Collect:

1. company name
2. company website
3. what they sell (commercial categories)
4. territory
5. target project types
6. minimum project value

Then immediately create **Your Geminga Feed**. Don't make the user build saved searches.

## 6. Free vs paid

**Public**

- project search
- List / Map
- public project pages
- observed fields
- limited derived intelligence

**Registered free**

- personalized feed
- full detail on the top 5 current matches
- remaining matches show only project name, city, reported project value and matched category

Paid-field restrictions must be enforced on the server, not hidden with CSS.

**Geminga Professional**: founding price $99/month. Includes:

- all matches
- full project intelligence
- Feed / Map / Analytics
- multiple categories
- full commercial-timing fields
- saved preferences/profile

Make pricing configurable. Do not launch a $249 tier until there is a genuinely different
entitlement.

**Geminga Market Brief**: $299 one-time. One category + one territory, manually reviewed.

**Greencrest Commercial Desk**: custom engagement. Do not publish a retainer price yet.

## 7. Registered product

Primary views: **Feed | Map | Analytics**. All three use the same stored matched-project
records. Switching views never triggers an LLM call.

Feed fields, at minimum:

- project name
- city / metro
- reported project value
- project archetype
- observed status
- reported start
- matched commercial category
- category relevance
- estimated commercial timing
- latest observed event
- evidence confidence
- last updated

Don't generate fluffy prose such as "why you care". Use structured relevance fields.

Possible `match_reason_codes`:

- `CATEGORY_MATCH`
- `GEOGRAPHY_MATCH`
- `PROJECT_TYPE_MATCH`
- `MINIMUM_VALUE_MATCH`
- `TIMING_MATCH`
- `RECENT_SIGNAL`
- `RELATIONSHIP_MATCH`

## 8. Project page

Each project has a durable URL, `/projects/[slug]`. Show structured fields, not consultant
essays.

**Header**

- project name
- facility
- address
- city
- county
- reported project value
- square feet, where available
- project archetype
- observed source status
- registration date
- reported start
- reported completion
- latest observed activity

**Map.** Use stored coordinates. Don't geocode on every page load.

**Participants.** Show only roles actually supported by source data:

- owner
- tenant
- design firm
- architect / engineer, where available
- RAS
- GC / contractor, only when a source actually names them

**Commercial category table.** Fields:

- category
- relevance
- estimated timing
- confidence
- estimated spend, only when defensible

**Estimated procurement timeline.** A Gantt-style visual labelled **Geminga Estimated
Procurement Timeline**. Never present it as the actual construction schedule.

**Event ledger.** Each event is typed OBSERVED, SCHEDULED or INFERRED.

**Source records.** Show:

- official source
- source record ID
- source URL
- retrieval date

## 9. Observed vs derived fields

This distinction must exist in the schema. Important data keeps an origin/method
classification: OBSERVED, CALCULATED, INFERRED or FORECAST. Where relevant, also store the
confidence, method version and generated-at time.

Examples:

- reported start date = OBSERVED
- days until start = CALCULATED
- warehouse classification = INFERRED, or a deterministic classification
- material-handling procurement window = FORECAST

Never blur reported government data with Geminga predictions.

## 10. Commercial timing rule

Don't ask an LLM to invent commercial timing. Create a deterministic table,
`archetype_category_rules`, with these fields:

- project_archetype
- commercial_category
- buy_window_start_offset_days
- buy_window_end_offset_days
- confidence
- rule_version

Offsets are relative to the project's reported construction start date. For each
project/category, calculate `estimated_buy_window_start` and `estimated_buy_window_end`, then
classify:

- **EARLY:** more than 120 days before the estimated buying window opens
- **PRE_BID:** 0–120 days before the estimated buying window opens
- **ACTIVE:** the current date is inside the estimated buying window
- **LATE:** the current date is after the estimated buying window
- **UNKNOWN:** insufficient date or rule data

These are model estimates, not observed procurement events. Timing rules must be editable
later without rewriting the application.

## 11. Matching and ranking

Hard filters: territory and minimum project value. A project outside the selected territory,
or below the customer's minimum, gets no ranking points; it is excluded.

Initial ranking weights for surviving projects:

| Component | Weight |
|---|---|
| Category relevance | 35% |
| Commercial timing | 25% |
| Freshness | 15% |
| Evidence quality | 15% |
| Project type fit | 10% |

Store each component separately. Don't expose only one unexplained composite number. Add
relationship scoring later, once reliable contractor/project relationship data exists.

## 12. Initial archetypes

Seed roughly these:

- warehouse_logistics
- manufacturing
- industrial
- data_center
- healthcare
- office
- retail
- education
- multifamily
- hospitality
- civic_public
- laboratory_research

Store keyword/rule mappings in data or configuration, not only in application code.

## 13. Initial commercial categories

Seed these:

- electrical_contracting
- switchgear
- transformers
- generators
- lighting
- fire_protection
- hvac_equipment
- mechanical_contracting
- building_controls
- industrial_controls
- security_access_control
- low_voltage_data
- material_handling
- racking
- plumbing
- pumps
- roofing
- loading_docks_doors

The architecture must allow categories to be added without a code rewrite.

## 14. Canonical TDLR CSV fields

The initial CSV importer normalizes into these canonical project fields (nulls allowed):

- source_record_id
- project_name
- facility_name
- address
- city
- county
- state
- zip
- registration_date
- reported_start_date
- reported_completion_date
- reported_project_value
- square_feet
- work_type
- funding_type
- scope_text
- observed_status
- owner_name
- tenant_name
- design_firm_name
- ras_name
- source_url

Future source adapters map their own external field names into this model.

## 15. Real vs demo data

Synthetic development rows are allowed only when `is_demo = true` and the UI visibly labels
them **DEMO DATA**.

Demo records must never:

- appear in production public search
- be indexed
- appear in prospect-share feeds
- be used in outbound sales

Before the first real outreach target, have 30–50 verified current projects in total, with at
least 20 genuinely relevant to the initial material-handling / warehouse-systems test.

Don't invent believable Texas projects and present them as real.

## 16. Shareable prospect feeds (MVP-critical)

The founder/admin needs **Create Prospect Feed**. Input:

- prospect company
- website
- categories
- territory
- target project types
- minimum project value

Geminga calculates the matching projects and creates a private URL, `/share/[random-token]`.
Requirements:

- no login required
- cryptographically random token
- server-side lookup
- revocable
- optional expiration
- noindex
- no internal IDs exposed in the URL
- shows only that prospect's configured feed

CTA: **Claim This Feed**. If the prospect registers, copy the prospect's configuration into
the new account.

## 17. Greencrest Commercial Desk

Create `/commercial-desk`, positioned as **Embedded commercial development for companies
selling into capital-project markets.**

Potential work:

- market development
- account development
- project pursuit
- commercial outreach
- channel development
- strategic partnerships
- market entry

Engagement types: monthly retainer, or a defined project. Don't use investment-banking,
capital-raising or success-fee language.

CTA: **Request a Commercial Review**. Form fields:

- company
- website
- contact name
- email
- what they sell
- territory
- target markets
- desired outcome
- notes

Save submissions into `commercial_desk_leads` and send the founder an email notification.

## 18. Dual-offer analytics

We're testing: does the customer want the intelligence, or do they want Greencrest to work
the market? Track at minimum:

- public_search
- project_opened
- build_feed_clicked
- registration_completed
- profile_completed
- match_opened
- prospect_feed_viewed
- prospect_feed_claimed
- geminga_upgrade_clicked
- pricing_viewed
- checkout_started
- commercial_desk_clicked
- commercial_desk_form_started
- commercial_desk_form_submitted

Where applicable, include:

- user ID
- prospect-feed ID
- project ID
- page
- source/campaign
- timestamp

On the personalized feed, the primary CTA is **Unlock Full Geminga** and the secondary CTA is
**Have Greencrest Work This Market**. Don't make the two CTAs visually equal.

## 19. Maps and analytics

Public users get **List | Map**; registered users get **Feed | Map | Analytics**. Both use the
same stored matched-project dataset.

Keep the map stack cost-conscious: Leaflet or MapLibre is fine. Cache or store coordinates,
and don't geocode records repeatedly.

Initial analytics:

- projects by metro
- projects by archetype
- projects by value band
- projects by reported start month
- projects by commercial timing
- new projects by week
- reported project value by market

No AI calls for maps or charts.

## 20. AI architecture

Non-negotiable: **Precompute → Store → Serve.**

AI must not run because a user:

- loads a page
- searches
- filters
- sorts
- moves a map
- views analytics
- opens a project

Use deterministic rules first. AI may assist only with genuinely ambiguous project archetype
classification and scope interpretation, using structured output.

Maintain an `analysis_input_hash`. If the materially relevant source inputs haven't changed,
don't re-run AI. User-to-project matching is normal database logic.

## 21. Spend estimates

Don't invent category-spend percentages. If spend can't be defended, store NULL.

Initial value can come from:

- reported total project value
- category relevance
- commercial timing
- project archetype
- geography
- recency

Spend forecasting can be added after calibration.

## 22. Initial pages

| Route | Purpose |
|---|---|
| `/` | homepage + public search |
| `/projects` | public List / Map |
| `/projects/[slug]` | structured project page |
| `/opportunities` | registered Feed / Map / Analytics |
| `/share/[token]` | private prospect feed |
| `/companies` | basic company/project data |
| `/data` | sources, methodology, limitations |
| `/pricing` | Free + Professional + Market Brief |
| `/commercial-desk` | Greencrest service + intake |
| `/admin` | founder-only import and prospect-feed tools |

## 23. Supabase

Use a new Supabase project dedicated to Geminga, for:

- separate auth
- a separate production database
- cleaner environment variables
- easier migrations
- no risk of damaging unrelated app data
- easier future handoff, backup and security controls

If creating the project costs money, stop and report the exact requirement before buying
anything. Don't put Geminga into an unrelated production Supabase database just to avoid
setup.

## 24. What not to build yet

- national coverage
- every Texas municipal source
- CRM integration
- AI chatbot
- automated outbound
- mobile app
- giant contact database
- complex spend model
- enterprise permissions
- RRC integration
- Houston infrastructure integration
- TxDOT infrastructure vertical

The MVP exists to test two things:

1. Will a company pay for its personalized Geminga feed?
2. Will it instead pay Greencrest to help work the market?

## Additional build notes (owner, earlier)

- Build adapters now only for TDLR TABS (CSV) and TDLR All Licenses. Create empty stubs for
  TxDOT, Houston GeoHub and RRC; don't implement them.
- Seed `archetype_category_rules` with starting offset values marked
  `rule_version = 'v0-unreviewed'`, and list them for the owner to review before any outreach.
- `/admin` requires a founder-only role checked on the server, not just a hidden link.
- Commercial Desk email notifications need an email provider. Use Resend or similar, and
  add the key to `.env.example`.
- `checkout_started` = a click on the Stripe Payment Link. Pass the user ID as
  `client_reference_id`. The owner sets plans manually until a webhook exists.
