import { MayekAmaEngine } from '../../../packages/language-engine/src';

const engine = new MayekAmaEngine();

export function normalizeApiExample(text: string) {
  return {
    original: text,
    standard: engine.normalizePlainText(text),
    tokens: engine.normalizeText(text)
  };
}

export function predictApiExample(context: string, currentWord: string) {
  return {
    suggestions: engine.suggest(context, currentWord)
  };
}
