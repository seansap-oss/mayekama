import fs from 'node:fs';
import path from 'node:path';

const required = [
  'src/main.tsx',
  'src/styles.css',
  'packages/language-engine/engine.ts',
  'packages/language-engine/dictionary.ts',
  'database/supabase-schema.sql',
  'database/release-api-schema.sql',
  'apps/android-keyboard/app/src/main/AndroidManifest.xml',
  'apps/android-keyboard/app/src/main/java/com/mayekama/keyboard/MayekAmaKeyboardService.kt',
  'public/manifest.webmanifest',
  'public/robots.txt',
  'public/sitemap.xml',
  'docs/BUILD6-RELEASE-CANDIDATE.md',
  'docs/APK-HANDOVER.md',
  'docs/UI-LOCK-RULE.md'
];

const missing = required.filter(file => !fs.existsSync(path.join(process.cwd(), file)));
if (missing.length) {
  console.error('MayekAma release report failed. Missing files:');
  for (const file of missing) console.error(' - ' + file);
  process.exit(1);
}

console.log('MayekAma Build 6 release report');
console.log('--------------------------------');
console.log('UI status: locked; no redesign in Build 6');
console.log('Website: Vite/React testable locally');
console.log('Language engine: included');
console.log('Supabase schemas: included');
console.log('Android keyboard source: included');
console.log('APK bundled: no; build from Android Studio');
console.log('iOS: scaffold notes only; requires Xcode on macOS');
console.log('Status: release-candidate source handover ready');
