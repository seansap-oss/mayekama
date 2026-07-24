import fs from 'node:fs';
import path from 'node:path';

const androidRoot = path.join(process.cwd(), 'apps', 'android-keyboard');
const expected = [
  'settings.gradle.kts',
  'build.gradle.kts',
  'app/build.gradle.kts',
  'app/src/main/AndroidManifest.xml',
  'app/src/main/java/com/mayekama/keyboard/MayekAmaKeyboardService.kt',
  'app/src/main/java/com/mayekama/keyboard/MainActivity.kt',
  'app/src/main/java/com/mayekama/keyboard/LanguagePack.kt',
  'app/src/main/java/com/mayekama/keyboard/KeyboardPrefs.kt',
  'app/src/main/res/xml/method.xml'
];

const missing = expected.filter((item) => !fs.existsSync(path.join(androidRoot, item)));
console.log('MayekAma Android Build 5 source check');
console.log(`Android root: ${androidRoot}`);
if (missing.length) {
  console.error('Missing files:');
  missing.forEach((item) => console.error(`- ${item}`));
  process.exit(1);
}
console.log('All required Android source files are present.');
console.log('APK status: source ready for Android Studio compile; prebuilt APK not included.');
