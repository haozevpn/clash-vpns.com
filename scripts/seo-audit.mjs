import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const origin = 'https://clash-vpns.com';
const homeTitle = '2026年机场推荐：14家稳定高速机场测评 | 真实速度测试与流媒体解锁验证';
const failures = [];
const warnings = [];
const pages = new Map();
const titles = new Map();
const descriptions = new Map();
const signupLinks = {
  'jlyvipaff.com': 'https://ydto01.jlyvipaff.com/#/?code=NRrSjo32',
  'jichang.best': 'https://ddd.jichang.best/#/register?code=o4I4kToe',
  'yuntujc.cc': 'https://super.yuntujc.cc/#/register?code=qPHQtI9a',
  'edge-invite.net': 'https://edge-invite.net/#/register?code=73ienU2h',
  'lumina.yakit.de5.net': 'https://lumina.yakit.de5.net/#/register?code=dCgHyjFi',
};
const obsoleteHosts = /haozevpn\.jlyvipaff\.com|super\.ytjcok\.org|hummer\.lumina\.chat|luminak\.net|www\.edgex\.pro/;
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const decode = value => value.replace(/&(?:amp|quot|lt|gt|nbsp);|&#(?:x[\da-f]+|\d+);/gi, entity => {
  const entities = { '&amp;': '&', '&quot;': '"', '&lt;': '<', '&gt;': '>', '&nbsp;': ' ' };
  if (entities[entity]) return entities[entity];
  return String.fromCodePoint(entity.startsWith('&#x') ? parseInt(entity.slice(3), 16) : parseInt(entity.slice(2), 10));
});
const plain = value => decode(value.replace(/<[^>]*>/g, '')).replace(/\s+/g, ' ').trim();
const attributes = tag => Object.fromEntries([...tag.matchAll(/([\w:-]+)\s*=\s*["']([^"']*)["']/g)].map(match => [match[1].toLowerCase(), decode(match[2])]));
const walk = directory => fs.readdirSync(path.join(root, directory), { withFileTypes: true }).flatMap(entry => {
  if (['.git', 'scratch', 'node_modules'].includes(entry.name)) return [];
  const file = path.posix.join(directory, entry.name);
  return entry.isDirectory() ? walk(file) : [file];
});
const urlFor = file => `${origin}/${file === 'index.html' ? '' : file.replace(/index\.html$/, '')}`;
const fileFor = url => {
  const pathname = decodeURIComponent(url.pathname).slice(1);
  return pathname.endsWith('/') || !pathname ? `${pathname}index.html` : pathname;
};
const schemasIn = html => [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)].flatMap(match => {
  const schema = JSON.parse(match[1]);
  return Array.isArray(schema) ? schema : schema['@graph'] ?? [schema];
});

for (const file of walk('').filter(file => file.endsWith('.html'))) {
  const html = read(file);
  const meta = new Map([...html.matchAll(/<meta\b[^>]*>/gi)].map(match => {
    const attrs = attributes(match[0]);
    return [attrs.name ?? attrs.property, attrs.content];
  }));
  if (file.endsWith('-template.html')) {
    if (!meta.get('robots')?.includes('noindex')) failures.push(`${file}: template must be noindex`);
    continue;
  }
  const titleMatches = [...html.matchAll(/<title>([\s\S]*?)<\/title>/gi)];
  const headings = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)];
  const title = plain(titleMatches[0]?.[1] ?? '');
  const description = meta.get('description') ?? '';
  const canonical = [...html.matchAll(/<link\b[^>]*>/gi)].map(match => attributes(match[0])).find(attrs => attrs.rel === 'canonical')?.href;
  const visible = plain(html.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, '')).replace(/\s/g, '');
  if (titleMatches.length !== 1) failures.push(`${file}: expected one title, found ${titleMatches.length}`);
  if (headings.length !== 1) failures.push(`${file}: expected one H1, found ${headings.length}`);
  if ([...html.matchAll(/<meta\b[^>]*name="description"[^>]*>/gi)].length !== 1) failures.push(`${file}: expected one description`);
  if (!/<\/body>\s*<\/html>\s*$/i.test(html)) failures.push(`${file}: missing closing document tags`);
  if ((html.match(/<head>/gi) ?? []).length !== 1 || (html.match(/<body\b/gi) ?? []).length !== 1) failures.push(`${file}: duplicate head or body`);
  if (title.length < 25 || title.length > 60) warnings.push(`${file}: title has ${title.length} characters`);
  if (description.length < 70 || description.length > 150) warnings.push(`${file}: description has ${description.length} characters`);
  if (canonical !== urlFor(file)) failures.push(`${file}: canonical does not match ${urlFor(file)}`);
  if (titles.has(title)) failures.push(`${file}: duplicate title with ${titles.get(title)}`);
  if (descriptions.has(description)) failures.push(`${file}: duplicate description with ${descriptions.get(description)}`);
  titles.set(title, file);
  descriptions.set(description, file);
  for (const [key, expected] of [['og:title', title], ['twitter:title', title], ['og:description', description], ['twitter:description', description], ['og:url', urlFor(file)]]) {
    if (meta.get(key) !== expected) failures.push(`${file}: inconsistent ${key}`);
  }
  if (obsoleteHosts.test(html)) failures.push(`${file}: obsolete signup URL`);
  let schemas = [];
  try { schemas = schemasIn(html); } catch (error) { failures.push(`${file}: invalid JSON-LD: ${error.message}`); }
  if (!schemas.length) failures.push(`${file}: missing structured data`);
  for (const schema of schemas) {
    if (schema['@type'] === 'FAQPage') {
      for (const question of schema.mainEntity ?? []) {
        if (!visible.includes(plain(question.name).replace(/\s/g, '')) || !visible.includes(plain(question.acceptedAnswer?.text ?? '').replace(/\s/g, ''))) failures.push(`${file}: FAQ schema differs from visible content: ${question.name}`);
      }
    }
    if (schema['@type'] === 'ItemList' && schema.numberOfItems !== undefined && schema.numberOfItems !== schema.itemListElement?.length) failures.push(`${file}: inconsistent ItemList count`);
  }
  const links = [];
  for (const match of html.matchAll(/<(?:a|link|img|script)\b[^>]*>/gi)) {
    const attrs = attributes(match[0]);
    const reference = attrs.href ?? attrs.src;
    if (!reference || /^(?:mailto:|tel:|data:|javascript:)/.test(reference)) continue;
    const target = new URL(reference, urlFor(file));
    for (const [host, expected] of Object.entries(signupLinks)) {
      if (target.hostname === host || target.hostname.endsWith(`.${host}`)) {
        if (target.href !== expected) failures.push(`${file}: incorrect signup link ${target.href}`);
        if (!['sponsored', 'nofollow', 'noopener', 'noreferrer'].every(value => attrs.rel?.split(/\s+/).includes(value))) failures.push(`${file}: missing affiliate rel attributes`);
      }
    }
    if (target.origin !== origin) continue;
    const targetFile = fileFor(target);
    if (!fs.existsSync(path.join(root, targetFile))) failures.push(`${file}: broken local reference ${reference}`);
    else if (targetFile.endsWith('.html')) {
      links.push(targetFile);
      if (target.hash && !read(targetFile).includes(`id="${decodeURIComponent(target.hash.slice(1))}"`)) failures.push(`${file}: missing fragment ${reference}`);
    }
  }
  const nav = html.match(/<nav\b[^>]*>[\s\S]*?<\/nav>/i)?.[0] ?? '';
  const navLinks = [...nav.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)].map(match => `${new URL(match[1], urlFor(file)).href}|${plain(match[2])}`);
  pages.set(file, { title, description, links, navLinks });
}

if (pages.get('index.html')?.title !== homeTitle) failures.push('Homepage title changed');
const baseNav = JSON.stringify(pages.get('index.html')?.navLinks);
for (const [file, page] of pages) if (JSON.stringify(page.navLinks) !== baseNav) failures.push(`${file}: main navigation differs from homepage`);
const reachable = new Set();
const queue = ['index.html'];
while (queue.length) {
  const file = queue.shift();
  if (reachable.has(file)) continue;
  reachable.add(file);
  queue.push(...(pages.get(file)?.links ?? []).filter(link => !reachable.has(link)));
}
for (const file of pages.keys()) if (!reachable.has(file)) failures.push(`${file}: not reachable from homepage`);
const sitemap = read('sitemap.xml');
const locations = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => decode(match[1]));
if (new Set(locations).size !== locations.length) failures.push('Sitemap contains duplicate URLs');
for (const location of locations) if (!pages.has(fileFor(new URL(location)))) failures.push(`Sitemap has non-indexable page ${location}`);
for (const file of pages.keys()) if (!locations.includes(urlFor(file))) failures.push(`Sitemap missing ${file}`);
const directoryCount = (read('airport-reviews/index.html').match(/class="review-card"/g) ?? []).length;
const rankingCount = (read('rankings/index.html').match(/class="ranking-card"/g) ?? []).length;
const articleCount = [...pages.keys()].filter(file => /^knowledge\/[^/]+\.html$/.test(file)).length;
const categoryCount = [...pages.keys()].filter(file => /^knowledge\/categories\/(?!index)[^/]+\.html$/.test(file)).length;
for (const [key, count] of Object.entries({ airports: directoryCount, recommendations: rankingCount, articles: articleCount, categories: categoryCount })) {
  if (Number(read('index.html').match(new RegExp(`data-site-stat="${key}">(\\d+)`))?.[1]) !== count) failures.push(`Homepage ${key} count differs from source ${count}`);
}
const robots = read('robots.txt');
if (!robots.includes(`Sitemap: ${origin}/sitemap.xml`)) failures.push('robots.txt missing canonical sitemap');
if (/Disallow:\s*\/\s*$/m.test(robots)) failures.push('robots.txt blocks all pages');
if (!fs.existsSync(path.join(root, 'og-image.png'))) failures.push('Missing social image');
console.log(JSON.stringify({ pages: pages.size, sitemapUrls: locations.length, directoryCount, rankingCount, articleCount, categoryCount, failures, warnings }, null, 2));
if (failures.length) process.exitCode = 1;
