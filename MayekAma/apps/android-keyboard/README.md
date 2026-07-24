# MayekAma Android Keyboard - Build 5 Alpha Source

Current status: Android source is ready for Android Studio compile testing. A prebuilt APK is not included in this ZIP because this environment does not contain the Android SDK/Gradle toolchain required to build and sign an APK here.

## Added in Build 5

- More complete native `InputMethodService`
- Suggestion strip with three candidates
- Alphabet and symbol layers
- Shift handling
- Backspace, enter, comma, period and space controls
- Haptic and sound preferences
- Keyboard height setting
- Password/private-field mode with no candidate replacement
- Expanded local Roman Manipuri starter language pack
- Companion settings screen

## Open in Android Studio

Open this folder:

```text
D:\MayekAma\apps\android-keyboard
```

Then use:

```text
Build > Make Project
Build > Build Bundle(s) / APK(s) > Build APK(s)
```

Expected debug APK path after Android Studio builds:

```text
D:\MayekAma\apps\android-keyboard\app\build\outputs\apk\debug\app-debug.apk
```

## Phone test flow

1. Install the debug APK on an Android phone.
2. Open MayekAma.
3. Tap “Enable MayekAma Keyboard”.
4. Enable MayekAma in Android keyboard settings.
5. Return to the app.
6. Tap “Select MayekAma Keyboard”.
7. Type in the app test field.
8. Open WhatsApp, Facebook, YouTube comment box, Gmail or browser and test the keyboard.

## What to test

- English letters type normally.
- Roman Manipuri candidate suggestions appear.
- `noongshi` suggests `nungshi`.
- `aigi` suggests `eigi`.
- `nangbu` suggests `nungshi`.
- Backspace works.
- Shift works.
- Symbols layer opens and returns to ABC.
- Private/password fields show no learning state.
