import fs from 'node:fs';
const catalog = JSON.parse(fs.readFileSync('data/sources/source-catalog.json','utf8'));
const counts = catalog.sources.reduce((acc, s) => { acc[s.status] = (acc[s.status] || 0) + 1; return acc; }, {});
console.log('MayekAma source catalog audit');
console.log(`Sources: ${catalog.sources.length}`);
console.log(counts);
const unsafe = catalog.sources.filter(s => /permission-needed|licence-needed|reference-only|check-dataset/.test(s.status));
console.log(`Reference/licence-check sources: ${unsafe.length}`);
console.log('Policy: only import sources that are open, licensed, or contributed with terms.');
