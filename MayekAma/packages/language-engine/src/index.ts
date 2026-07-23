import { commonEnglish, phraseSeeds, seedWords } from './seedWords';
import type { DetectionResult, Mode, NormalizeToken, StandardWord, Suggestion } from './types';

const clean = (value: string) => value.trim().toLowerCase().replace(/[^a-z0-9\-']/g, '');

export class MayekAmaEngine {
  private words: StandardWord[];
  private aliasToCanonical = new Map<string, StandardWord>();

  constructor(words: StandardWord[] = seedWords) {
    this.words = words;
    for (const word of words) {
      this.aliasToCanonical.set(clean(word.canonical), word);
      for (const alias of word.aliases) this.aliasToCanonical.set(clean(alias), word);
    }
  }

  detectLanguage(text: string): DetectionResult {
    const tokens = text.split(/\s+/).map(clean).filter(Boolean);
    if (!tokens.length) return { language: 'unknown', englishScore: 0, romanScore: 0 };

    let english = 0;
    let roman = 0;
    for (const token of tokens.slice(-5)) {
      if (commonEnglish.has(token)) english += 2;
      if (this.aliasToCanonical.has(token)) roman += 3;
      if (token.endsWith('da') || token.endsWith('gi') || token.endsWith('bu')) roman += 1;
    }

    const total = Math.max(1, english + roman);
    const englishScore = Math.round((english / total) * 100);
    const romanScore = Math.round((roman / total) * 100);
    let language: DetectionResult['language'] = 'unknown';
    if (englishScore > 65 && romanScore < 35) language = 'english';
    else if (romanScore > 65 && englishScore < 35) language = 'roman-manipuri';
    else if (english > 0 && roman > 0) language = 'mixed';
    else language = roman >= english ? 'roman-manipuri' : 'english';
    return { language, englishScore, romanScore };
  }

  normalizeText(text: string): NormalizeToken[] {
    return text.split(/(\s+)/).map((part) => {
      if (/^\s+$/.test(part)) return { original: part, normalized: part, changed: false, confidence: 1 };
      const key = clean(part);
      const match = this.aliasToCanonical.get(key);
      if (!match) return { original: part, normalized: part, changed: false, confidence: 0 };
      const changed = clean(match.canonical) !== key;
      return { original: part, normalized: preserveCapitalisation(part, match.canonical), changed, confidence: changed ? 0.86 : 1 };
    });
  }

  normalizePlainText(text: string): string {
    return this.normalizeText(text).map((token) => token.normalized).join('');
  }

  suggest(context: string, currentWord: string, mode: Mode = 'smart'): Suggestion[] {
    const current = clean(currentWord);
    const suggestions: Suggestion[] = [];
    if (current) suggestions.push({ value: currentWord, label: 'keep typed', source: 'exact', score: 50 });

    const phraseKey = context.split(/\s+/).map(clean).filter(Boolean).slice(-2).join(' ');
    const oneKey = context.split(/\s+/).map(clean).filter(Boolean).slice(-1).join(' ');
    const nextWords = phraseSeeds[phraseKey] || phraseSeeds[oneKey] || [];
    for (const next of nextWords) suggestions.push({ value: next, label: 'next word', source: 'next-word', score: 95 });

    if (mode !== 'english') {
      const canonical = this.aliasToCanonical.get(current);
      if (canonical) suggestions.push({ value: canonical.canonical, label: canonical.meaning, source: 'canonical', score: 90 });
      for (const word of this.words) {
        if (!current || clean(word.canonical).startsWith(current) || word.aliases.some((alias) => clean(alias).startsWith(current))) {
          suggestions.push({ value: word.canonical, label: word.meaning, source: 'canonical', score: word.frequency });
        }
      }
    }

    if (mode !== 'roman-manipuri') {
      for (const en of commonEnglish) if (current && en.startsWith(current)) suggestions.push({ value: en, label: 'English', source: 'english', score: 55 });
    }

    return uniqueTop(suggestions, 3);
  }

  dictionarySearch(query: string): StandardWord[] {
    const q = clean(query);
    if (!q) return this.words.slice(0, 20);
    return this.words.filter((w) => clean(w.canonical).includes(q) || w.aliases.some((a) => clean(a).includes(q)) || w.meaning.toLowerCase().includes(q)).slice(0, 20);
  }

  exportLanguagePack() {
    return {
      id: 'mayekama-rms-0.1',
      version: '0.1.0',
      releasedAt: new Date().toISOString(),
      words: this.words,
      phrases: phraseSeeds
    };
  }
}

function uniqueTop(items: Suggestion[], max: number): Suggestion[] {
  const seen = new Set<string>();
  return items
    .sort((a, b) => b.score - a.score)
    .filter((item) => {
      const key = item.value.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .slice(0, max);
}

function preserveCapitalisation(original: string, next: string): string {
  return /^[A-Z]/.test(original) ? next.charAt(0).toUpperCase() + next.slice(1) : next;
}

export type { DetectionResult, Mode, NormalizeToken, StandardWord, Suggestion } from './types';
export { seedWords } from './seedWords';
