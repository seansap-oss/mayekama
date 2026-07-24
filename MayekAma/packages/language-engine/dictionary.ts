import pack from './language-pack.build9.json';

export type MayekWord = {
  id: string;
  canonical: string;
  aliases: string[];
  meaning: string;
  partOfSpeech: string;
  example: string;
  level: 'chat' | 'formal' | 'editorial';
  frequency: number;
  domain?: string;
  reviewed?: boolean;
};

type PackWord = {
  canonical: string;
  aliases?: string[];
  meaning?: string;
  partOfSpeech?: string;
  domain?: string;
  level?: 'chat' | 'formal' | 'editorial' | string;
  example?: string;
  reviewStatus?: string;
};

function safeLevel(level?: string): 'chat' | 'formal' | 'editorial' {
  if (level === 'formal' || level === 'editorial') return level;
  return 'chat';
}

export const starterDictionary: MayekWord[] = (pack.words as PackWord[]).map((word, index) => ({
  id: `rm-${String(index + 1).padStart(5, '0')}`,
  canonical: word.canonical,
  aliases: word.aliases ?? [],
  meaning: word.meaning ?? '',
  partOfSpeech: word.partOfSpeech ?? 'word',
  example: word.example ?? '',
  level: safeLevel(word.level),
  frequency: Math.max(20, 100 - Math.floor(index / 10)),
  domain: word.domain ?? 'general',
  reviewed: word.reviewStatus === 'approved'
}));

export const commonPhrases = [
  'Khurumjari.',
  'Kamdouri?',
  'Fare.',
  'Matam kayada?',
  'Nang laklibra?',
  'Eina nangbu nungshi.',
  'Nang houjik kadaida leiri?',
  'Meeting adu tomorrow 10 am da leiri.',
  'Yamna nungai.',
  'Thagatchari.',
  'MayekAma keyboard asi default oigani.',
  'Roman Manipuri standard ama semgat-i.',
  'School-da notice ama i.',
  'Article ama standard-da normalise tou-i.',
  'Lairik ama Roman Manipuri-da i.'
];

export const nextWordPairs: Record<string, string[]> = pack.nextWordPairs ?? {};
