# Android APK Build 5 Guide

## Open Android Studio

Open this folder only:

```text
D:\MayekAma\apps\android-keyboard
```

Do not open the website root folder for APK build.

## Build APK

In Android Studio:

```text
Build > Make Project
Build > Build Bundle(s) / APK(s) > Build APK(s)
```

The generated APK should appear here:

```text
D:\MayekAma\apps\android-keyboard\app\build\outputs\apk\debug\app-debug.apk
```

## Install APK manually

Connect Android phone with USB debugging enabled, then from PowerShell you may use:

```powershell
adb install -r "D:\MayekAma\apps\android-keyboard\app\build\outputs\apk\debug\app-debug.apk"
```

If `adb` is not recognised, install Android Studio Platform Tools or use Android Studio's Run button.

## Keyboard enable flow

1. Open MayekAma app.
2. Tap Enable MayekAma Keyboard.
3. Turn on MayekAma in Android input settings.
4. Go back to the app.
5. Tap Select MayekAma Keyboard.
6. Select MayekAma.
7. Test typing.

## Alpha keyboard limitations

- This is not Gboard/Samsung-level yet.
- Emoji panel is not built yet.
- Swipe typing is not built yet.
- Full English autocorrect is not built yet.
- The language pack is still a starter dataset.
- The goal of this APK test is proving IME installation, keyboard display, basic typing and Roman Manipuri candidates.
