import { commonPhrases, nextWordPairs, starterDictionary, type MayekWord } from './dictionary';

export type Suggestion = { text: string; reason: string; score: number };
export type NormalizedToken = { original: string; output: string; changed: boolean; reason: string };
export type LanguagePack = {
  version: string;
  releasedAt: string;
  standardName: string;
  words: MayekWord[];
  phrases: string[];
  nextWordPairs: Record<string, string[]>;
};

const englishCommon = new Set('the be to of and a in that have i it for not on with he as you do at this but his by from they we say her she or an will my one all would there their what so up out if about who get which go me when make can like time no just him know take people into year your good some could them see other than then now look only come its over think also back after use two how our work first well way even new want because any these give day most us hello hi yes no ok okay thanks thank meeting tomorrow today morning evening night school college keyboard download install privacy article letter'.split(' '));

const punctuation = /[^a-z-]/g;
const aliasMap = new Map<string, MayekWord>();
for (const entry of starterDictionary) {
  aliasMap.set(entry.canonical.toLowerCase(), entry);
  for (const alias of entry.aliases) aliasMap.set(alias.toLowerCase(), entry);
}

export const activeLanguagePack: LanguagePack = {
  version: 'RMS-0.9-workbench',
  releasedAt: new Date().toISOString().slice(0, 10),
  standardName: 'MayekAma Roman Manipuri Database Workbench 0.9',
  words: starterDictionary,
  phrases: commonPhrases,
  nextWordPairs
};

export function normalizeWord(word: string): NormalizedToken {
  const clean = word.toLowerCase().replace(punctuation, '');
  const match = aliasMap.get(clean);
  if (!match) return { original: word, output: word, changed: false, reason: 'unknown' };
  const output = preserveCase(word, match.canonical);
  return { original: word, output, changed: output !== word, reason: output !== word ? 'alias-to-standard' : 'already-standard' };
}

export function normalizeText(text: string): NormalizedToken[] {
  return text.split(/(\s+)/).map((token) => {
    if (/^\s+$/.test(token)) return { original: token, output: token, changed: false, reason: 'space' };
    const leading = token.match(/^[^a-zA-Z-]+/)?.[0] ?? '';
    const trailing = token.match(/[^a-zA-Z-]+$/)?.[0] ?? '';
    const core = token.slice(leading.length, token.length - trailing.length);
    if (!core) return { original: token, output: token, changed: false, reason: 'punctuation' };
    const normalized = normalizeWord(core);
    return { ...normalized, original: token, output: `${leading}${normalized.output}${trailing}` };
  });
}

export function normalizeToString(text: string): string {
  return normalizeText(text).map((part) => part.output).join('');
}

export function detectLanguageContext(text: string): 'english' | 'roman-manipuri' | 'mixed' | 'unknown' {
  const words = text.toLowerCase().match(/[a-z-]+/g) ?? [];
  if (!words.length) return 'unknown';
  let en = 0;
  let rm = 0;
  for (const word of words.slice(-10)) {
    const clean = word.replace(punctuation, '');
    if (englishCommon.has(clean)) en++;
    if (aliasMap.has(clean)) rm += 2;
    if (clean.endsWith('-da') || clean.endsWith('-gi')) rm++;
  }
  if (en > 0 && rm > 0) return 'mixed';
  if (rm > en) return 'roman-manipuri';
  if (en > rm) return 'english';
  return 'unknown';
}

export function suggest(input: string, limit = 5): Suggestion[] {
  const lower = input.toLowerCase();
  const lastWord = lower.match(/[a-z-]+$/)?.[0] ?? '';
  const previousWord = (lower.match(/[a-z-]+/g) ?? []).slice(-2, -1)[0] ?? '';
  const context = detectLanguageContext(input);
  const suggestions: Suggestion[] = [];

  if (previousWord && nextWordPairs[previousWord]) {
    nextWordPairs[previousWord].forEach((word, index) => suggestions.push({ text: word, reason: 'next-word', score: 170 - index }));
  }

  if (lastWord) {
    for (const entry of starterDictionary) {
      const allForms = [entry.canonical, ...entry.aliases];
      if (allForms.some((form) => form.startsWith(lastWord))) {
        suggestions.push({ text: entry.canonical, reason: entry.canonical === lastWord ? 'standard' : 'standard-suggestion', score: entry.frequency + (entry.canonical.startsWith(lastWord) ? 20 : 0) });
      }
    }
  }

  if (context === 'roman-manipuri' || context === 'mixed') {
    if (lower.endsWith('eina nangbu ')) suggestions.unshift({ text: 'nungshi', reason: 'phrase', score: 220 });
    if (lower.endsWith('nang houjik ')) suggestions.unshift({ text: 'kadaida', reason: 'phrase', score: 210 });
    if (lower.endsWith('meeting adu ')) suggestions.unshift({ text: 'tomorrow', reason: 'mixed-language phrase', score: 190 });
    if (lower.endsWith('roman manipuri ')) suggestions.unshift({ text: 'standard', reason: 'product phrase', score: 180 });
  }

  if (!lastWord && context === 'english') {
    suggestions.push({ text: 'the', reason: 'english-common', score: 30 }, { text: 'and', reason: 'english-common', score: 28 }, { text: 'you', reason: 'english-common', score: 27 });
  }

  return dedupe(suggestions).sort((a, b) => b.score - a.score).slice(0, limit);
}

export function lookup(query: string): MayekWord[] {
  const q = query.trim().toLowerCase();
  if (!q) return starterDictionary;
  return starterDictionary.filter((entry) =>
    entry.canonical.includes(q) || entry.aliases.some((alias) => alias.includes(q)) || entry.meaning.toLowerCase().includes(q) || entry.example.toLowerCase().includes(q)
  );
}

export function getKeyboardCandidates(input: string): string[] {
  const exact = input.match(/[a-z-]+$/)?.[0] ?? '';
  const candidates = suggest(input, 3).map(s => s.text);
  if (exact && !candidates.includes(exact)) candidates.unshift(exact);
  return candidates.slice(0, 3);
}

export function exportLanguagePack(): LanguagePack {
  return activeLanguagePack;
}

export function validateLanguagePack(pack: LanguagePack = activeLanguagePack): string[] {
  const errors: string[] = [];
  const canonical = new Set<string>();
  for (const word of pack.words) {
    if (!word.id || !word.canonical) errors.push(`Missing id/canonical: ${JSON.stringify(word)}`);
    const key = word.canonical.toLowerCase();
    if (canonical.has(key)) errors.push(`Duplicate canonical spelling: ${word.canonical}`);
    canonical.add(key);
    if (word.aliases.includes(word.canonical)) errors.push(`Alias repeats canonical: ${word.canonical}`);
  }
  return errors;
}

function preserveCase(original: string, replacement: string): string {
  if (!original) return replacement;
  if (original === original.toUpperCase()) return replacement.toUpperCase();
  if (original[0] === original[0].toUpperCase()) return replacement[0].toUpperCase() + replacement.slice(1);
  return replacement;
}

function dedupe(items: Suggestion[]): Suggestion[] {
  const seen = new Set<string>();
  return items.filter((item) => {
    const key = item.text.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
