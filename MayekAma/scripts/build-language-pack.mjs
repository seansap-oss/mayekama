import fs from 'node:fs';
const [,, input='data/processed/mayekama-master-lexicon.json', output='packages/language-engine/language-pack.build9.json'] = process.argv;
const data = JSON.parse(fs.readFileSync(input,'utf8'));
const pack = {
  version: 'RMS-0.9-workbench',
  releasedAt: new Date().toISOString().slice(0,10),
  standardName: 'MayekAma Roman Manipuri Database Workbench',
  warning: 'Workbench language pack. Prediction candidate only until language review approves RMS release.',
  wordCount: data.words.length,
  words: data.words.map(w=>({canonical:w.canonical, aliases:w.aliases, meaning:w.meaning, partOfSpeech:w.partOfSpeech, domain:w.domain, level:w.level, example:w.example, reviewStatus:w.reviewStatus})),
  nextWordPairs: {
    eina: ['nangbu','houjik','yum-da','school-da'],
    eigi: ['ming','yum','warol','lairik'],
    mayekama: ['keyboard','writer','dictionary','standard'],
    roman: ['manipuri'],
    school: ['notice','student','teacher'],
    article: ['ama','standard-da'],
    lairik: ['ama','chapter','paragraph','macha'],
    matam: ['kayada','leiri'],
    kari: ['toure','oiba','matam'],
    nang: ['laklibra','chatlibra','leiribra'],
    eina: ['nangbu','houjik','yum-da','school-da','ngammi']
  }
};
fs.writeFileSync(output, JSON.stringify(pack,null,2));
console.log(`Built language pack ${pack.version} with ${pack.wordCount} words -> ${output}`);
