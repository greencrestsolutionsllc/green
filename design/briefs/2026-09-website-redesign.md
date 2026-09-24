# Brief: Website redesign, "Greencrest Perspectives"

- **Asked by / date:** Owner (Sarem Yousuf), 2026-09-24
- **What we need:** Redesign the whole greencrest site. Greencrest is no longer a
  fractional-leadership firm. It is an independent research and perspectives platform.
  Design every page listed under Site architecture below.
- **Keep:** the existing logo, unchanged. File: `public/brand/logo-256.png` (green
  "G" with a leaf and buildings). We only have it at 256 px, so please supply or
  specify an SVG or high-resolution version if the design needs one.
- **Paused:** the savings calculator (D-002). It will return later on its own page,
  `/analytics`. Leave it out of this redesign and out of the nav for now.
- **Replaces:** `index (8).html`, the current fractional-leadership landing page.
  Don't carry any of its copy or imagery forward.
- **Done when:**
  - every page below has a design (desktop and mobile);
  - all copy matches this brief word for word;
  - every rule under "Do not" and "NOT" holds;
  - there are tokens for type, colour and spacing;
  - each page has its own `D-###` entry.

**Open questions for Design (answer them in the spec or in DECISIONS):**
1. The logo is a full-colour green mark. Does it work with the restrained editorial
   palette, or does it need a single-colour lockup? Don't change the mark itself.
2. Email subscribe: this is the visual only. Build will choose a provider later.
3. Video hosting: self-hosted versus a privacy-mode embed. Build needs to know which
   player UI to design around.
4. Article body typography: design pull quotes, charts with source lines, footnotes
   and citations, and blocks that label Fact / Interpretation / Uncertainty /
   Perspective (see Editorial principles).
5. The four homepage articles are real titles, but there's no article text yet.
   Design the article page with placeholder body text and mark it as placeholder.

---

The rest of this brief is the owner's copy and structure, exactly as supplied. It is
the source of truth for all copy.

## Positioning

Greencrest Solutions is an independent research and perspectives platform.

It should NOT look like:
- a consulting company
- an energy services company
- a personal blog
- a futurist influencer site
- a newsletter landing page
- a corporate company pretending to have a large research staff

It should feel restrained, intelligent, contemporary and institutional.

The intellectual territory is intentionally broad:
energy, technology, economics, infrastructure, industry and society.

The editorial lens is macro and interdisciplinary. Greencrest is interested in how developments interact and what their longer-term implications may be.

Do not use grandiose language about "changing civilization," "building the future," "transforming humanity," etc.

Do not use corporate consulting language such as:
"We help..."
"Our solutions..."
"Empowering organizations..."
"Navigating complexity..."
"Unlocking value..."
"Driving transformation..."

Do not over-explain Greencrest.

## Navigation

GREENCREST SOLUTIONS

Perspectives · Topics · Video · About

## Homepage

### [HERO]

GREENCREST SOLUTIONS

Independent research and perspectives on emerging economic, technological and societal change.

Greencrest explores developments across energy, technology, economics and society, with particular interest in the connections between them and their longer-term implications.

[Explore Perspectives]

### [FEATURED / LATEST]

PERSPECTIVES

Research, analysis and commentary on developments with implications beyond the immediate.

**[ARTICLE CARD]** AI Is Becoming a Physical Industry
Artificial intelligence may be digital in application, but its expansion increasingly depends on electricity, land, semiconductors, cooling, infrastructure and capital.
Technology · Energy

**[ARTICLE CARD]** The Return of Electricity Demand
After decades of relatively modest growth, rising electricity demand is creating new questions about infrastructure, investment and industrial development.
Energy · Infrastructure

**[ARTICLE CARD]** Why the Future Still Has to Be Built
Digital technologies can scale rapidly. Power plants, transmission systems, factories and cities cannot. The difference between those speeds increasingly matters.
Technology · Infrastructure

**[ARTICLE CARD]** What Energy Abundance Would Actually Change
The consequences of energy availability extend beyond electricity prices, influencing production, transportation, computation and economic possibility.
Energy · Economics

[BUTTON] View all perspectives

### Areas of interest

AREAS OF INTEREST

Energy · Technology · Economics · Infrastructure · Industry · Society

Greencrest follows developments across these areas without treating them as isolated subjects.

Technological change affects energy demand. Energy availability influences industrial development. Infrastructure constrains economic possibility. Demographic and institutional changes alter how societies respond.

The intersections are often as consequential as the individual developments themselves.

### Questions

QUESTIONS

- What happens when intelligence becomes significantly cheaper?
- Can infrastructure development keep pace with technological change?
- How does access to energy alter economic possibility?
- What determines whether emerging technologies achieve widespread adoption?
- How might demographic change reshape economies built around population growth?
- What becomes more valuable when previously scarce capabilities become abundant?
- How do physical constraints shape seemingly digital industries?

These questions are not predictions. They are starting points for examining structural change.

### Video

GREENCREST VIDEO

Selected perspectives presented through short-form analysis and conversation.

Video provides another format for examining the ideas, evidence and competing interpretations behind Greencrest research.

[Watch]

### About (homepage short version)

ABOUT GREENCREST

Greencrest Solutions is an independent platform for research, analysis and perspectives on emerging economic, technological and societal change.

Its areas of interest span energy, technology, economics, infrastructure, industry and society, with particular attention to the relationships between them.

[About Greencrest]

### Email

NEW PERSPECTIVES

Occasional research and analysis from Greencrest Solutions.

No daily updates. No news digest.

[Email address] [Subscribe]

### Footer

GREENCREST SOLUTIONS

Perspectives · Topics · Video · About

© 2026 Greencrest Solutions

## Perspectives page (`/perspectives`)

PERSPECTIVES

Research and commentary examining economic, technological and societal change through a broader lens.

Greencrest Perspectives focuses on developments whose significance extends beyond the immediate event, market or technology.

Filters: [ALL] [ENERGY] [TECHNOLOGY] [ECONOMICS] [INFRASTRUCTURE] [INDUSTRY] [SOCIETY]

Article cards should contain only: CATEGORY, TITLE, ONE-SENTENCE DESCRIPTION, DATE, READ TIME.

Do not show view counts, likes, comments or other popularity metrics.

## Individual article page (`/perspectives/[article-slug]`)

[CATEGORY]

[ARTICLE TITLE]

[One-sentence standfirst explaining the central question or thesis.]

By Sarem Yousuf
[DATE] · [READ TIME]

[ARTICLE]

At bottom: RELATED PERSPECTIVES, with 2–3 related articles.

Optional:

ABOUT THE AUTHOR

Sarem Yousuf is the founder of Greencrest Solutions and an energy and infrastructure commercial executive. His writing examines developments across energy, technology, economics and infrastructure within their broader commercial and societal context.

## Topics page (`/topics`)

TOPICS

Greencrest research crosses conventional subject boundaries, with recurring areas of interest including:

**ENERGY:** Electricity, generation, storage, nuclear energy, natural gas, power markets, resources and changing patterns of energy demand.

**TECHNOLOGY:** Artificial intelligence, computation, automation, emerging technologies and the economic and physical systems supporting their development.

**ECONOMICS:** Growth, productivity, capital, markets, investment and the economic conditions influencing technological and industrial change.

**INFRASTRUCTURE:** Energy systems, data centers, transportation, manufacturing and the physical foundations supporting economic activity.

**INDUSTRY:** Industrial capacity, manufacturing, supply chains, commercialization and the changing geography of production.

**SOCIETY:** Demographics, labor, institutions and the broader consequences of economic and technological change.

## Video page (`/video`)

VIDEO

Ideas explored through another medium.

Greencrest Video presents selected research and perspectives through concise analysis, visual explanation and conversation.

[VIDEO GRID]

Video card format: [TITLE] / [One-sentence description] / [DATE] · [DURATION]

IMPORTANT: Videos should be embedded/self-hosted without emphasizing follower counts, subscriber counts, view counts, likes or creator metrics. The presentation should resemble an editorial/research publication rather than a YouTube creator channel.

## About page (`/about`)

ABOUT GREENCREST

Greencrest Solutions is an independent research and media platform focused on emerging economic, technological and societal change.

Its work examines developments across energy, technology, economics, infrastructure, industry and society, with particular interest in how changes across these areas interact.

Greencrest publishes research, perspectives and video intended to place individual developments within a broader context and examine their longer-term implications.

SAREM YOUSUF

Founder

Sarem Yousuf is an energy and infrastructure commercial executive whose experience spans power markets, energy storage, distributed energy, grid technologies and commercial energy markets.

His research and writing extend beyond individual technologies to examine their relationship with infrastructure, economics, industrial development and broader societal change.

## Editorial principles

Greencrest should distinguish clearly between:

- **FACT:** What available evidence establishes.
- **INTERPRETATION:** What the evidence may imply.
- **UNCERTAINTY:** What remains unknown or contested.
- **PERSPECTIVE:** The argument or interpretation being advanced.

Articles should cite primary sources and credible independent research wherever possible.

The writing should be accessible without becoming simplistic.

Avoid exaggerated predictions. Avoid partisan positioning. Avoid treating technological possibility as inevitable adoption. Avoid presenting speculation as established fact.

Greencrest should be comfortable concluding: "We don't know yet."

## Design direction

Overall feeling: Financial Times research section, The Economist, MIT Technology Review, Works in Progress, institutional research publication.

NOT: management consulting website, Substack creator page, energy startup, futurist influencer, personal portfolio, marketing agency.

Use:
- substantial whitespace
- restrained typography
- editorial hierarchy
- large article headlines
- minimal navigation
- understated imagery
- charts/data where relevant
- article photography sparingly

Do not use:
- generic solar panel imagery
- wind turbine hero images
- glowing AI brains
- circuit-board graphics
- stock photos of executives
- handshake imagery
- "future city" AI art
- excessive gradients
- corporate icon grids
- testimonial sections
- fake statistics
- fake client logos
- "Book a Call" CTAs

## Site architecture

| Route | Role |
|---|---|
| `/` | editorial front page + latest work |
| `/perspectives` | complete research archive |
| `/perspectives/[article-slug]` | canonical home for each piece |
| `/topics` | intellectual scope |
| `/video` | selected visual research |
| `/about` | Greencrest + Sarem |
| `/analytics` | *(later: savings calculator, D-002, paused, not in nav)* |

## Core brand language

Primary descriptor:
"Independent research and perspectives on emerging economic, technological and societal change."

Supporting sentence:
"Greencrest explores developments across energy, technology, economics and society, with particular interest in the connections between them and their longer-term implications."

These should establish the intellectual territory without claiming Greencrest predicts the future, speaks for an institution, or possesses authority it has not earned.
