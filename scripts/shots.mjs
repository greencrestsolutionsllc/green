// Screenshot routes from the static export. Usage: node scripts/shots.mjs <outdir> <route...>
import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';

const ROOT = path.resolve('out');
const TYPES = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.png': 'image/png', '.woff2': 'font/woff2', '.json': 'application/json', '.txt': 'text/plain' };
export function serve(port = 4321) {
  return new Promise(res => {
    const s = createServer(async (req, rsp) => {
      let p = path.join(ROOT, decodeURIComponent(new URL(req.url, 'http://x').pathname));
      try { if ((await stat(p)).isDirectory()) p = path.join(p, 'index.html'); } catch { p = path.join(ROOT, '404.html'); rsp.statusCode = 404; }
      try { rsp.setHeader('Content-Type', TYPES[path.extname(p)] ?? 'application/octet-stream'); rsp.end(await readFile(p)); }
      catch { rsp.statusCode = 404; rsp.end('not found'); }
    }).listen(port, () => res(s));
  });
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const [outDir, ...routes] = process.argv.slice(2);
  const server = await serve();
  const browser = await chromium.launch({ executablePath: process.env.CHROMIUM ?? undefined });
  for (const [w, tag] of [[1280, 'd'], [375, 'm']]) {
    const page = await browser.newPage({ viewport: { width: w, height: 900 } });
    for (const r of routes) {
      await page.goto('http://localhost:4321' + r, { waitUntil: 'networkidle' });
      const name = (r.replace(/[^a-z0-9]+/gi, '_').replace(/^_|_$/g, '') || 'home') + `_${tag}.png`;
      await page.screenshot({ path: path.join(outDir, name), fullPage: true });
      const sw = await page.evaluate(() => document.documentElement.scrollWidth);
      console.log(name, 'scrollWidth', sw, sw > w ? 'OVERFLOW' : 'ok');
    }
    await page.close();
  }
  await browser.close(); server.close();
}
