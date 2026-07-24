# MayekAma Build 5 of 6 — Status and Testing

## Current build

Build 5 of 6.

## UI policy

The approved cream/maroon UI is locked. Build 5 only adds features, documentation and Android preparation. It does not redesign the website.

## APK status

No prebuilt APK is included in this ZIP. Build 5 includes Android alpha source ready for Android Studio compile testing.

Reason: this packaging environment cannot run Android Studio or the Android SDK build/signing pipeline. The correct next step is opening `D:\MayekAma\apps\android-keyboard` in Android Studio and building the debug APK there.

## Website status

Testable from VS Code with:

```powershell
npm install; npm run dev
```

## Android source status

Included and upgraded.

Path:

```text
D:\MayekAma\apps\android-keyboard
```

## What Build 5 adds

- Android keyboard alpha source
- Companion app settings
- Haptic and sound settings
- Keyboard height setting
- Symbols layer
- Suggestion strip
- Local Roman Manipuri language pack
- Private-field protection direction
- Android Studio APK testing guide

## What to test on website

1. Homepage opens.
2. Writer still works.
3. Dictionary still works.
4. Existing UI style is preserved.

## What to test on Android after Android Studio build

1. Debug APK installs.
2. App opens.
3. Enable keyboard button opens Android input settings.
4. Select keyboard button opens input picker.
5. Keyboard appears in the app test field.
6. Keyboard appears in WhatsApp/Facebook/YouTube/Gmail.
7. Suggestions appear for starter Roman Manipuri words.

## Next build

Build 6 will focus on release candidate polish, documentation, Supabase admin/API hardening, SEO/deployment readiness, and final handover structure.
