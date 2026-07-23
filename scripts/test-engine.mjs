import { normalizeToString, suggest, detectLanguageContext, getKeyboardCandidates } from '../packages/language-engine/engine.ts';

const input = 'Eina nangbu noongshi. Meeting adu leire.';
console.log('Input:', input);
console.log('Standard:', normalizeToString(input));
console.log('Context:', detectLanguageContext(input));
console.log('Suggestions:', suggest('eina nangbu ', 3).map(s => s.text).join(', '));
console.log('Keyboard candidates:', getKeyboardCandidates('eina nangbu ').join(' | '));
