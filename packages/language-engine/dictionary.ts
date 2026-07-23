export type MayekWord = {
  id: string;
  canonical: string;
  aliases: string[];
  meaning: string;
  partOfSpeech: string;
  example: string;
  level: 'chat' | 'formal' | 'editorial';
  frequency: number;
  domain?: 'daily' | 'school' | 'family' | 'place' | 'writing' | 'technology' | 'governance';
  reviewed?: boolean;
};

export const starterDictionary: MayekWord[] = [
  { id: 'rm-0001', canonical: 'eina', aliases: ['aina', 'ena'], meaning: 'I / me', partOfSpeech: 'pronoun', example: 'Eina lak-i.', level: 'chat', frequency: 99, domain: 'daily', reviewed: false },
  { id: 'rm-0002', canonical: 'eigi', aliases: ['aigi', 'egi', 'eigii'], meaning: 'my / mine', partOfSpeech: 'possessive pronoun', example: 'Eigi ming MayekAma ni.', level: 'chat', frequency: 98, domain: 'daily', reviewed: false },
  { id: 'rm-0003', canonical: 'nang', aliases: ['nahang', 'nng'], meaning: 'you', partOfSpeech: 'pronoun', example: 'Nang kadaida leiri?', level: 'chat', frequency: 98, domain: 'daily', reviewed: false },
  { id: 'rm-0004', canonical: 'nangbu', aliases: ['nangbu', 'nngbu'], meaning: 'you / to you', partOfSpeech: 'pronoun', example: 'Eina nangbu nungshi.', level: 'chat', frequency: 96, domain: 'daily', reviewed: false },
  { id: 'rm-0005', canonical: 'nungshi', aliases: ['noongshi', 'nungsi', 'nungsee'], meaning: 'love', partOfSpeech: 'verb/noun', example: 'Eina nangbu nungshi.', level: 'chat', frequency: 95, domain: 'daily', reviewed: false },
  { id: 'rm-0006', canonical: 'kari', aliases: ['kori', 'karee'], meaning: 'what', partOfSpeech: 'question word', example: 'Kari toure?', level: 'chat', frequency: 94, domain: 'daily', reviewed: false },
  { id: 'rm-0007', canonical: 'kadaida', aliases: ['kadada', 'kadaidaa'], meaning: 'where', partOfSpeech: 'question word', example: 'Nang kadaida chatli?', level: 'chat', frequency: 93, domain: 'daily', reviewed: false },
  { id: 'rm-0008', canonical: 'houjik', aliases: ['hojik', 'houjiki'], meaning: 'now', partOfSpeech: 'adverb', example: 'Houjik lak-u.', level: 'chat', frequency: 92, domain: 'daily', reviewed: false },
  { id: 'rm-0009', canonical: 'lak-u', aliases: ['laku', 'lakoo', 'lakh-u'], meaning: 'come', partOfSpeech: 'verb', example: 'Houjik lak-u.', level: 'chat', frequency: 91, domain: 'daily', reviewed: false },
  { id: 'rm-0010', canonical: 'chatli', aliases: ['chatle', 'chatlee'], meaning: 'going', partOfSpeech: 'verb', example: 'Eina school-da chatli.', level: 'chat', frequency: 89, domain: 'daily', reviewed: false },
  { id: 'rm-0011', canonical: 'leiri', aliases: ['leire', 'leeree'], meaning: 'is / staying / existing', partOfSpeech: 'verb', example: 'Meeting adu 10 am da leiri.', level: 'chat', frequency: 90, domain: 'daily', reviewed: false },
  { id: 'rm-0012', canonical: 'adu', aliases: ['addu', 'aduu'], meaning: 'that / the', partOfSpeech: 'determiner', example: 'Meeting adu leiri.', level: 'chat', frequency: 88, domain: 'daily', reviewed: false },
  { id: 'rm-0013', canonical: 'yamna', aliases: ['yamuna'], meaning: 'very', partOfSpeech: 'adverb', example: 'Yamna phajare.', level: 'chat', frequency: 87, domain: 'daily', reviewed: false },
  { id: 'rm-0014', canonical: 'phajare', aliases: ['fajare', 'phajaree'], meaning: 'beautiful / good', partOfSpeech: 'adjective', example: 'MayekAma phajare.', level: 'chat', frequency: 86, domain: 'daily', reviewed: false },
  { id: 'rm-0015', canonical: 'thagatchari', aliases: ['thankchari', 'thagatchare', 'thagatcharee'], meaning: 'thank you', partOfSpeech: 'phrase', example: 'Thagatchari.', level: 'formal', frequency: 84, domain: 'daily', reviewed: false },
  { id: 'rm-0016', canonical: 'ming', aliases: ['meng'], meaning: 'name', partOfSpeech: 'noun', example: 'Nangi ming kari kou-i?', level: 'chat', frequency: 83, domain: 'daily', reviewed: false },
  { id: 'rm-0017', canonical: 'yum', aliases: ['yoom'], meaning: 'home / house', partOfSpeech: 'noun', example: 'Eina yum-da leiri.', level: 'chat', frequency: 82, domain: 'family', reviewed: false },
  { id: 'rm-0018', canonical: 'ima', aliases: ['eema'], meaning: 'mother', partOfSpeech: 'noun', example: 'Ima yum-da leiri.', level: 'chat', frequency: 81, domain: 'family', reviewed: false },
  { id: 'rm-0019', canonical: 'ipa', aliases: ['epa'], meaning: 'father', partOfSpeech: 'noun', example: 'Ipa lak-i.', level: 'chat', frequency: 80, domain: 'family', reviewed: false },
  { id: 'rm-0020', canonical: 'ichan', aliases: ['echan'], meaning: 'child', partOfSpeech: 'noun', example: 'Ichan school-da chatli.', level: 'chat', frequency: 79, domain: 'family', reviewed: false },
  { id: 'rm-0021', canonical: 'school', aliases: ['iskul'], meaning: 'school', partOfSpeech: 'noun', example: 'School-da chatli.', level: 'chat', frequency: 78, domain: 'school', reviewed: false },
  { id: 'rm-0022', canonical: 'college', aliases: ['kolej'], meaning: 'college', partOfSpeech: 'noun', example: 'College-da leiri.', level: 'chat', frequency: 77, domain: 'school', reviewed: false },
  { id: 'rm-0023', canonical: 'pao', aliases: ['pow'], meaning: 'news / message', partOfSpeech: 'noun', example: 'Pao asi phajare.', level: 'editorial', frequency: 76, domain: 'writing', reviewed: false },
  { id: 'rm-0024', canonical: 'warol', aliases: ['waral'], meaning: 'article / writing', partOfSpeech: 'noun', example: 'Warol asi MayekAma standard-da i.', level: 'editorial', frequency: 75, domain: 'writing', reviewed: false },
  { id: 'rm-0025', canonical: 'standard', aliases: ['standard'], meaning: 'standard', partOfSpeech: 'noun', example: 'MayekAma standard ama semgat-i.', level: 'formal', frequency: 74, domain: 'writing', reviewed: false },
  { id: 'rm-0026', canonical: 'mayek', aliases: ['maiek'], meaning: 'letter / script', partOfSpeech: 'noun', example: 'Mayek amasung wahei standard oigani.', level: 'formal', frequency: 73, domain: 'writing', reviewed: false },
  { id: 'rm-0027', canonical: 'wahei', aliases: ['wahe', 'wahei'], meaning: 'word', partOfSpeech: 'noun', example: 'Wahei ama canonical oigani.', level: 'formal', frequency: 72, domain: 'writing', reviewed: false },
  { id: 'rm-0028', canonical: 'lairik', aliases: ['lairik'], meaning: 'book', partOfSpeech: 'noun', example: 'Lairik ama Roman Manipuri-da i.', level: 'formal', frequency: 71, domain: 'writing', reviewed: false },
  { id: 'rm-0029', canonical: 'imphal', aliases: ['imphal'], meaning: 'Imphal', partOfSpeech: 'place', example: 'Imphal-da MayekAma sijinnari.', level: 'formal', frequency: 70, domain: 'place', reviewed: false },
  { id: 'rm-0030', canonical: 'manipur', aliases: ['manipoor'], meaning: 'Manipur', partOfSpeech: 'place', example: 'Manipur-gi mapanda standard ama semgat-i.', level: 'formal', frequency: 70, domain: 'place', reviewed: false },
  { id: 'rm-0031', canonical: 'keyboard', aliases: ['keybord'], meaning: 'keyboard', partOfSpeech: 'noun', example: 'Keyboard asi default oigani.', level: 'chat', frequency: 69, domain: 'technology', reviewed: false },
  { id: 'rm-0032', canonical: 'download', aliases: ['download'], meaning: 'download', partOfSpeech: 'verb', example: 'App asi download tou-u.', level: 'chat', frequency: 68, domain: 'technology', reviewed: false },
  { id: 'rm-0033', canonical: 'install', aliases: ['instal'], meaning: 'install', partOfSpeech: 'verb', example: 'Install touba matungda keyboard select tou-u.', level: 'chat', frequency: 67, domain: 'technology', reviewed: false },
  { id: 'rm-0034', canonical: 'privacy', aliases: ['praivasi'], meaning: 'privacy', partOfSpeech: 'noun', example: 'Privacy asi henna maru oigani.', level: 'formal', frequency: 66, domain: 'technology', reviewed: false },
  { id: 'rm-0035', canonical: 'api', aliases: ['a-p-i'], meaning: 'API', partOfSpeech: 'noun', example: 'API-da normalise endpoint leigani.', level: 'formal', frequency: 65, domain: 'technology', reviewed: false },
  { id: 'rm-0036', canonical: 'teacher', aliases: ['ticher'], meaning: 'teacher', partOfSpeech: 'noun', example: 'Teacher-singna standard sijinnagani.', level: 'formal', frequency: 64, domain: 'school', reviewed: false },
  { id: 'rm-0037', canonical: 'student', aliases: ['studen'], meaning: 'student', partOfSpeech: 'noun', example: 'Student-singna MayekAma keyboard sijinnagani.', level: 'formal', frequency: 63, domain: 'school', reviewed: false },
  { id: 'rm-0038', canonical: 'notice', aliases: ['notis'], meaning: 'notice', partOfSpeech: 'noun', example: 'School notice ama i.', level: 'formal', frequency: 62, domain: 'school', reviewed: false },
  { id: 'rm-0039', canonical: 'article', aliases: ['artikle'], meaning: 'article', partOfSpeech: 'noun', example: 'Article ama standard-da normalise tou-i.', level: 'editorial', frequency: 61, domain: 'writing', reviewed: false },
  { id: 'rm-0040', canonical: 'letter', aliases: ['letar'], meaning: 'letter', partOfSpeech: 'noun', example: 'Formal letter ama i.', level: 'formal', frequency: 60, domain: 'writing', reviewed: false }
];

export const commonPhrases = [
  'Eina nangbu nungshi.',
  'Nang houjik kadaida leiri?',
  'Meeting adu tomorrow 10 am da leiri.',
  'Yamna phajare.',
  'Thagatchari.',
  'MayekAma keyboard asi default oigani.',
  'Roman Manipuri standard ama semgat-i.',
  'School-da notice ama i.',
  'Article ama standard-da normalise tou-i.'
];

export const nextWordPairs: Record<string, string[]> = {
  eina: ['nangbu', 'houjik', 'yum-da', 'school-da'],
  eigi: ['ming', 'yum', 'warol', 'lairik'],
  nang: ['houjik', 'kadaida', 'kari'],
  nangbu: ['nungshi', 'hangdok-i'],
  meeting: ['adu'],
  mayekama: ['keyboard', 'standard', 'writer'],
  roman: ['manipuri'],
  school: ['notice', 'student', 'teacher'],
  article: ['ama', 'standard-da'],
};
