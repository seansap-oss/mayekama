# MayekAma Build 6 — Release Candidate

## Current build
Build 6 of 6.

## UI status
Locked. This package does not redesign the approved website. It only adds release-candidate structure, documentation, production metadata, scripts, and handover steps.

## APK status
No compiled APK is bundled in this ZIP. Android source is included and prepared for Android Studio.

The APK must be generated from:

```text
D:\MayekAma\apps\android-keyboard
```

Expected debug APK after Android Studio build:

```text
D:\MayekAma\apps\android-keyboard\app\build\outputs\apk\debug\app-debug.apk
```

## What to test
1. Website opens locally.
2. Homepage still follows approved UI.
3. Writer works.
4. Dictionary works.
5. Contribution form works.
6. `npm run release:check` completes.
7. Android project opens in Android Studio.

## What is not complete yet
- Full 50,000-word language database.
- Fully accurate English-to-Roman-Manipuri translation.
- Final Play Store signing.
- Real iOS keyboard build, because iOS compilation requires Xcode on macOS.
- Government or academic recognition.

## Next practical milestone after Build 6
Build and test the Android debug APK on a real phone, then refine the keyboard behavior based on WhatsApp/Facebook/YouTube typing tests.
