import fs from 'node:fs';
import path from 'node:path';

const required = [
  'package.json',
  'src/main.tsx',
  'src/styles.css',
  'packages/language-engine/engine.ts',
  'packages/language-engine/dictionary.ts',
  'database/supabase-schema.sql',
  'apps/android-keyboard/app/src/main/java/com/mayekama/keyboard/MayekAmaKeyboardService.kt',
  'apps/android-keyboard/app/src/main/java/com/mayekama/keyboard/LanguagePack.kt'
];

let ok = true;
for (const file of required) {
  if (!fs.existsSync(path.resolve(file))) {
    console.error('Missing:', file);
    ok = false;
  } else {
    console.log('OK:', file);
  }
}

if (!ok) process.exit(1);
console.log('
MayekAma Build 4 doctor passed. Website + language engine + Android source scaffold are present.');
