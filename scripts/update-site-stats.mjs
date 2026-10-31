import { readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function beijingDate() {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Shanghai',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(new Date());
  const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
  return `${values.year}-${values.month}-${values.day}`;
}

function countExact(text, className) {
  return (text.match(new RegExp(`class="${className}"`, 'g')) ?? []).length;
}

const indexPath = path.join(root, 'index.html');
const rankingPath = path.join(root, 'rankings', 'index.html');
const indexHtml = await readFile(indexPath, 'utf8');
const rankingHtml = await readFile(rankingPath, 'utf8');
const knowledgeFiles = await readdir(path.join(root, 'knowledge'), { withFileTypes: true });
const categoryFiles = await readdir(path.join(root, 'knowledge', 'categories'), { withFileTypes: true });

const stats = {
  updated: beijingDate(),
  airports: countExact(indexHtml, 'review-card'),
  recommendations: countExact(rankingHtml, 'ranking-card'),
  articles: knowledgeFiles.filter((entry) => entry.isFile() && entry.name.endsWith('.html')).length,
  categories: categoryFiles.filter((entry) => entry.isFile() && entry.name.endsWith('.html') && entry.name !== 'index.html').length,
};

let output = indexHtml;
output = output.replace(
  /(<time data-site-stat="updated" datetime=")[^"]+(">)[^<]+(<\/time>)/,
  `$1${stats.updated}$2${stats.updated}$3`,
);

for (const [key, value] of Object.entries(stats)) {
  if (key === 'updated') continue;
  output = output.replace(
    new RegExp(`(<(?:strong|span) data-site-stat="${key}">)\\d+(<\\/(?:strong|span)>)`),
    `$1${value}$2`,
  );
}

if (output !== indexHtml) await writeFile(indexPath, output);
console.log(JSON.stringify(stats));
