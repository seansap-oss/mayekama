import fs from 'node:fs';
const [,, input='data/imports/seed-master-lexicon.csv', output='data/processed/mayekama-master-lexicon.json'] = process.argv;
function parseCsv(text){
  const lines=text.trim().split(/\r?\n/);
  const headers=lines.shift().split(',');
  return lines.map(line=>{
    const cols=[]; let cur=''; let q=false;
    for (let i=0;i<line.length;i++) { const ch=line[i]; if(ch==='"'){q=!q; continue;} if(ch===','&&!q){cols.push(cur);cur='';continue;} cur+=ch; }
    cols.push(cur); return Object.fromEntries(headers.map((h,i)=>[h,cols[i]??'']));
  });
}
const raw = fs.readFileSync(input,'utf8');
const rows = parseCsv(raw);
const words = rows.map((r, i)=>({
  id: `rm-${String(i+1).padStart(5,'0')}`,
  canonical: r.canonical.trim().toLowerCase(),
  aliases: (r.aliases||'').split('|').map(x=>x.trim().toLowerCase()).filter(Boolean),
  meaning: r.meaning,
  partOfSpeech: r.partOfSpeech || 'unknown',
  domain: r.domain || 'general',
  level: r.level || 'chat',
  example: r.example || '',
  reviewed: false,
  source: 'mayekama-seed-workbench'
}));
const seen = new Set();
for (const word of words){
  if(!word.canonical) throw new Error('Missing canonical word');
  if(seen.has(word.canonical)) throw new Error(`Duplicate canonical: ${word.canonical}`);
  seen.add(word.canonical);
}
fs.mkdirSync('data/processed',{recursive:true});
fs.writeFileSync(output, JSON.stringify({version:'workbench-0.7', generatedAt:new Date().toISOString(), warning:'Unreviewed workbench data, not final standard.', words}, null, 2));
console.log(`Imported ${words.length} candidate words -> ${output}`);
