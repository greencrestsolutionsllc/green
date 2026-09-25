# Houston permit and inspection sources: investigation

Status (2026-09-25): **not verified.** The build environment's network policy blocks every
Houston, TDLR, data.texas.gov, ArcGIS and Census host, so no endpoint has been opened or
queried yet. The candidates below come from web search results only. Nothing is built on
them until each one is opened and its fields are confirmed.

## Candidates

| # | Source | Owner | What it appears to offer | Status |
|---|---|---|---|---|
| 1 | Sold Permits reports / [Sold Permits Search](https://www.houstonpermittingcenter.org/sold-permits-search) | Houston Permitting Center | Weekly reports of sold (issued) permits: building, electrical, mechanical and plumbing, residential and commercial. Reported to include permit number, status, valuation, contractor of record and scope text | Most promising. Confirm file format, columns, history depth and terms |
| 2 | [Houston Permit Portal](https://permits.houstontx.gov/) | City of Houston | Real-time permit tracking from submittal to issuance, plus inspection scheduling | Portal for applicants. Look for an official API or export. **Don't scrape** it (guardrail: no hostile scraping, respect access terms) |
| 3 | [City ArcGIS REST services](https://mapsop1.houstontx.gov/arcgis/rest/services), `HPC` folder | City of Houston GIS | A Houston Permitting Center folder exists. It may hold permit layers queryable as JSON/GeoJSON | Open the folder; list layers and fields |
| 4 | [City of Houston Open Data](https://data.houstontx.gov/) | City of Houston | Only monthly **residential** permit counts found (aggregates, 2004 onward) | Not useful for project-level lifecycle data |
| 5 | [Open Records](https://www.houstonpermittingcenter.org/open-records) request | Houston Permitting Center | Bulk extract of commercial permits and inspection results with a data dictionary | Fallback if 1–3 lack inspections. Send alongside the TDLR request |
| — | HPW GeoHub (e.g. "SCPS Permits") | Houston Public Works | Infrastructure permits | **Out of scope** for building lifecycle data (see data-scheme.md) |

Third-party aggregators (Zabalist, Mercator, BuildPermitRadar and similar) are **not**
sources. Zabalist is reference-only under the guardrails.

## Field checklist (owner-required; fill in per source once it's opened)

| Field | Sold Permits | Permit Portal | ArcGIS HPC | Open Records |
|---|---|---|---|---|
| Official owner | ? | ? | ? | ? |
| URL / API endpoint | ? | ? | ? | ? |
| Machine-readable format | ? | ? | ? | ? |
| Update frequency | ? | ? | ? | ? |
| Unique record ID | ? | ? | ? | ? |
| Permit / application number | ? | ? | ? | ? |
| Address | ? | ? | ? | ? |
| Project / work description | ? | ? | ? | ? |
| Valuation | ? | ? | ? | ? |
| Square footage | ? | ? | ? | ? |
| Application / submittal date | ? | ? | ? | ? |
| Issue date | ? | ? | ? | ? |
| Status | ? | ? | ? | ? |
| Contractor / company | ? | ? | ? | ? |
| Inspection events | ? | ? | ? | ? |
| Final / CO event | ? | ? | ? | ? |
| Terms / reuse restrictions | ? | ? | ? | ? |

## Next steps once network access is allowed

1. Open sources 1–3 and fill in the checklist, with a sample of 20 commercial records per source.
2. Check each source's terms of use and update frequency.
3. Test linkage against several known TDLR Harris County projects (address, name, owner,
   dates, value). Report the match rate and the failure types.
4. Send the owner the findings and recommended source(s), and **wait for approval** before
   writing any Houston adapter.

## Hosts to allow in the environment's network settings

`houstonpermittingcenter.org`, `www.houstonpermittingcenter.org`, `permits.houstontx.gov`,
`mapsop1.houstontx.gov`, `data.houstontx.gov`, `houstontx.gov`, `www.houstontx.gov`,
`tdlr.texas.gov`, `www.tdlr.texas.gov`, `data.texas.gov`, `geocoding.geo.census.gov`,
plus DFW later (`www.dallasopendata.com`, `data.fortworthtexas.gov`).
