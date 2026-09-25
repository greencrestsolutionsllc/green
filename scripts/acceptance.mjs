// Acceptance checks from design/README.md §5, run against the static export in out/.
// Usage: npm run build && CHROMIUM=/path/to/chrome node scripts/acceptance.mjs
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import { readFile } from 'node:fs/promises';
import { serve } from './shots.mjs';

const BASE = 'http://localhost:4321';
const ROUTES = ['/', '/perspectives/', '/perspectives/ai-is-becoming-a-physical-industry/', '/topics/', '/video/', '/about/'];
const norm = s => s.replace(/\*\*|\*/g, '').replace(/[“”]/g, '"').replace(/\s+/g, ' ').trim().toLowerCase();

// Brief copy, section by section. Lines that are layout notes ([BUTTON], "Article cards should contain only…") are skipped.
const brief = await readFile('design/briefs/2026-09-website-redesign.md', 'utf8');
function briefLines(from, to) {
  const s = brief.slice(brief.indexOf(from), to ? brief.indexOf(to) : undefined);
  return s.split('\n').slice(1)
    .map(l => l.replace(/^- /, '').replace(/^\*\*\[ARTICLE CARD\]\*\* /, '').replace(/^\*\*[A-Z]+:\*\* /, '').trim())
    .filter(l => l && !/^(#|\[|\||Filters:|Article cards|Do not show|Video card format|IMPORTANT|At bottom|Optional:|\[BUTTON\]|Perspectives · Topics)/.test(l))
    .flatMap(l => l.split(' · ').length > 2 ? l.split(' · ') : [l]); // "Energy · Technology · …" lists
}
const REQUIRED = {
  '/': briefLines('### [HERO]', '## Perspectives page').filter(l => !/^\[/.test(l)),
  '/perspectives/': briefLines('## Perspectives page', 'Filters:'),
  '/perspectives/ai-is-becoming-a-physical-industry/': ['By Sarem Yousuf', 'RELATED PERSPECTIVES', 'ABOUT THE AUTHOR', ...briefLines('ABOUT THE AUTHOR\n', '## Topics page')],
  '/topics/': briefLines('## Topics page', '## Video page'),
  '/video/': briefLines('## Video page', '[VIDEO GRID]'),
  '/about/': briefLines('## About page', '## Editorial principles'),
};

const BANNED = [/\bbook a call\b/i, /\bwe help\b/i, /\bour solutions\b/i, /\bempowering organizations\b/i, /\bnavigating complexity\b/i, /\bunlocking value\b/i, /\bdriving transformation\b/i];
const METRICS = /\b\d[\d,.]*\s*(views?|likes?|subscribers?|followers?|comments?)\b|\b(views?|likes?|subscribers?|followers?)\s*:?\s*\d/i;

let failed = 0;
const fail = (r, m) => { failed++; console.log(`  ✗ ${r}: ${m}`); };

const server = await serve();
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM || undefined });
for (const r of ROUTES) {
  console.log(r);
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(BASE + r, { waitUntil: 'networkidle' });
  const text = norm(await page.evaluate(() => document.body.textContent));

  for (const line of REQUIRED[r]) if (!text.includes(norm(line))) fail(r, `missing brief copy: "${line}"`);
  for (const re of BANNED) if (re.test(text)) fail(r, `banned phrase ${re}`);
  if (METRICS.test(text)) fail(r, `popularity metric: ${text.match(METRICS)[0]}`);

  const figs = await page.$$eval('figure', fs => fs.map(f => ({ chart: !!f.querySelector('.fig__plot'), source: f.querySelector('.fig__source')?.textContent?.replace(/^Source:\s*/, '').trim() })));
  figs.forEach((f, i) => { if (f.chart && !f.source) fail(r, `figure ${i + 1} has no source line`); });

  const axe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
  for (const v of axe.violations) fail(r, `axe ${v.id} (${v.impact}): ${v.nodes.length} node(s), e.g. ${v.nodes[0].target.join(' ')}`);

  await page.setViewportSize({ width: 375, height: 800 });
  await page.waitForTimeout(100);
  const sw = await page.evaluate(() => document.documentElement.scrollWidth);
  if (sw > 375) fail(r, `horizontal scroll at 375px (scrollWidth ${sw})`);
  await ctx.close();
}
await browser.close(); server.close();
console.log(failed ? `\n${failed} check(s) failed` : '\nAll acceptance checks passed');
process.exit(failed ? 1 : 0);
