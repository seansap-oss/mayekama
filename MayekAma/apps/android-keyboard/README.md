# MayekAma Android Keyboard

This is a native Android keyboard scaffold using `InputMethodService`.

## Build path

1. Open this folder in Android Studio:

```text
D:\Mayekengine\MayekAmappsndroid-keyboard
```

2. Let Android Studio sync Gradle.
3. Connect an Android test phone with USB debugging enabled.
4. Build and install the app.
5. On the phone, open the MayekAma app.
6. Tap **Enable MayekAma Keyboard**.
7. Tap **Select as Current Keyboard**.
8. Open WhatsApp, Facebook, YouTube comments, Gmail or any text box and test typing.

## Current MVP behavior

- Native QWERTY keyboard.
- Suggestion strip.
- Starter Roman Manipuri word suggestions.
- Alias recognition seed.
- Companion setup screen.

## Next engineering steps

- Replace hardcoded Kotlin seed list with generated SQLite/Room language pack.
- Add settings for height, vibration, theme and privacy mode.
- Add mixed English/Roman scoring.
- Add sensitive-field behavior.
- Add language-pack updater.
