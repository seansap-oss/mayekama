import type { StandardWord } from './types';

export const seedWords: StandardWord[] = [
  { canonical: 'eina', aliases: ['aina', 'einaa'], meaning: 'I / me', partOfSpeech: 'pronoun', frequency: 98, examples: ['Eina houjik chatli.'] },
  { canonical: 'eigi', aliases: ['aigi', 'egi', 'eigii'], meaning: 'my / mine', partOfSpeech: 'possessive pronoun', frequency: 97, examples: ['Eigi ming MayekAma ni.'] },
  { canonical: 'nang', aliases: ['nng'], meaning: 'you', partOfSpeech: 'pronoun', frequency: 96, examples: ['Nang kadaida leiribano?'] },
  { canonical: 'nangbu', aliases: ['nangbu', 'nangboo'], meaning: 'you (object)', partOfSpeech: 'pronoun', frequency: 94, examples: ['Eina nangbu nungshi.'] },
  { canonical: 'nungshi', aliases: ['noongshi', 'nungsi', 'nungsee'], meaning: 'love', partOfSpeech: 'verb/noun', frequency: 93, examples: ['Eina nangbu nungshi.'] },
  { canonical: 'houjik', aliases: ['houjik', 'hojik', 'houjig'], meaning: 'now', partOfSpeech: 'adverb', frequency: 92, examples: ['Houjik lak-u.'] },
  { canonical: 'lak-u', aliases: ['laku', 'lak oo', 'lak o'], meaning: 'come', partOfSpeech: 'verb', frequency: 90, examples: ['Nang houjik lak-u.'] },
  { canonical: 'chatli', aliases: ['chatle', 'chatlee'], meaning: 'going / went', partOfSpeech: 'verb', frequency: 88, examples: ['Eina school-da chatli.'] },
  { canonical: 'leiri', aliases: ['leiree', 'leire'], meaning: 'is / exists / staying', partOfSpeech: 'verb', frequency: 88, examples: ['Mahak Imphal-da leiri.'] },
  { canonical: 'kari', aliases: ['kori'], meaning: 'what', partOfSpeech: 'question word', frequency: 87, examples: ['Kari touribano?'] },
  { canonical: 'kadaida', aliases: ['kadaida', 'kadaidaa', 'kadada'], meaning: 'where', partOfSpeech: 'question word', frequency: 86, examples: ['Nang kadaida chatlibano?'] },
  { canonical: 'yamna', aliases: ['yamna', 'yamnaa'], meaning: 'very', partOfSpeech: 'adverb', frequency: 84, examples: ['Yamna nungai.'] },
  { canonical: 'nungai', aliases: ['noongai', 'nungayi'], meaning: 'happy / good feeling', partOfSpeech: 'adjective', frequency: 83, examples: ['Eina yamna nungai.'] },
  { canonical: 'aduga', aliases: ['aduga', 'adu ga'], meaning: 'and / then', partOfSpeech: 'conjunction', frequency: 82, examples: ['Eina lakli aduga mahak chatli.'] },
  { canonical: 'adu', aliases: ['atu'], meaning: 'that / the', partOfSpeech: 'determiner', frequency: 82, examples: ['Meeting adu houjik oigani.'] },
  { canonical: 'asi', aliases: ['ashi'], meaning: 'this', partOfSpeech: 'determiner', frequency: 81, examples: ['Thabak asi yamna maru oiri.'] },
  { canonical: 'thabak', aliases: ['thabok', 'thabak'], meaning: 'work', partOfSpeech: 'noun', frequency: 80, examples: ['Thabak asi phajare.'] },
  { canonical: 'phajare', aliases: ['phajarey', 'phajare'], meaning: 'good / beautiful', partOfSpeech: 'adjective', frequency: 79, examples: ['Design asi phajare.'] },
  { canonical: 'imphal', aliases: ['imfol', 'imphal'], meaning: 'Imphal', partOfSpeech: 'place name', frequency: 78, examples: ['Eina Imphal-da leiri.'] },
  { canonical: 'manipur', aliases: ['manipur', 'manipoor'], meaning: 'Manipur', partOfSpeech: 'place name', frequency: 78, examples: ['MayekAma Manipur-gi thoudang ama ni.'] }
];

export const phraseSeeds: Record<string, string[]> = {
  'eina': ['nangbu', 'houjik', 'yamna'],
  'eina nangbu': ['nungshi'],
  'nang': ['kadaida', 'houjik', 'kari'],
  'houjik': ['lak-u', 'chatli', 'leiri'],
  'meeting adu': ['houjik', 'tomorrow', '10 am'],
  'yamna': ['nungai', 'phajare']
};

export const commonEnglish = new Set([
  'i','you','we','they','he','she','it','am','are','is','was','were','will','would','can','could','the','a','an','and','or','but','meeting','today','tomorrow','morning','evening','hello','hi','thanks','thank','please','work','school','college','book','article','write','writing','good','bad','come','go','going','call','message','send','receive','later','now'
]);
