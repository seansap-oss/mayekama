import { validateLanguagePack, exportLanguagePack } from '../packages/language-engine/engine.ts';

const errors = validateLanguagePack(exportLanguagePack());
if (errors.length) {
  console.error('Language pack validation failed:');
  for (const error of errors) console.error('-', error);
  process.exit(1);
}
console.log('MayekAma language pack validation passed.');
