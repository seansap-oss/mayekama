export type Mode = 'smart' | 'roman-manipuri' | 'english' | 'formal';

export interface StandardWord {
  canonical: string;
  aliases: string[];
  meaning: string;
  partOfSpeech: string;
  frequency: number;
  examples: string[];
}

export interface Suggestion {
  value: string;
  label: string;
  source: 'exact' | 'canonical' | 'next-word' | 'english' | 'personal';
  score: number;
}

export interface NormalizeToken {
  original: string;
  normalized: string;
  changed: boolean;
  confidence: number;
}

export interface DetectionResult {
  language: 'english' | 'roman-manipuri' | 'mixed' | 'unknown';
  englishScore: number;
  romanScore: number;
}
