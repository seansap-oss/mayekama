import fs from 'node:fs';
import path from 'node:path';

const [,, input='data/imports/user-import.json', output='data/imports/user-import.generated.csv'] = process.argv;
const data = JSON.parse(fs.readFileSync(input,'utf8'));
const rows = [];
const categories = data.categories || {};
function csvCell(value){
  const s = String(value ?? '').replace(/\r?\n/g,' ').trim();
  return /[",]/.test(s) ? '"' + s.replace(/"/g,'""') + '"' : s;
}
function mapDomain(category){
  if (category === 'relation') return 'family';
  if (category === 'number' || category === 'greeting' || category === 'phrase' || category === 'pronoun' || category === 'verb' || category === 'noun') return 'daily';
  if (category === 'food') return 'daily';
  return 'general';
}
for (const [group, items] of Object.entries(categories)) {
  for (const item of items) {
    const canonical = String(item.roman || item.canonical || '').trim().toLowerCase().replace(/\s+/g,' ');
    if (!canonical) continue;
    rows.push({
      canonical,
      aliases: Array.isArray(item.aliases) ? item.aliases.join('|') : '',
      meaning: item.english || item.meaning || '',
      partOfSpeech: item.category || group,
      domain: mapDomain(item.category || group),
      level: 'chat',
      example: item.example || '',
      sourceTag: data.sourceTag || 'user-json-import',
      reviewStatus: 'needs_review'
    });
  }
}
const headers = ['canonical','aliases','meaning','partOfSpeech','domain','level','example','sourceTag','reviewStatus'];
fs.mkdirSync(path.dirname(output), { recursive: true });
fs.writeFileSync(output, headers.join(',') + '\n' + rows.map(r => headers.map(h => csvCell(r[h])).join(',')).join('\n') + '\n');
console.log(`Converted ${rows.length} rows -> ${output}`);
