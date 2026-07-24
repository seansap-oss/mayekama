# Android APK Handover

## Current APK status
This source package does not include a compiled APK. It includes the Android keyboard project required to compile one.

## Open in Android Studio
Open this folder:

```text
D:\MayekAma\apps\android-keyboard
```

## Android Studio steps
1. Open folder.
2. Let Gradle sync finish.
3. Select app configuration.
4. Connect Android phone with USB debugging enabled.
5. Press Run.
6. Open MayekAma app on the phone.
7. Tap Enable Keyboard.
8. Enable MayekAma in Android keyboard settings.
9. Tap Select Keyboard.
10. Select MayekAma.
11. Test inside WhatsApp, Facebook, YouTube comments, Gmail, and Chrome.

## Expected result
The phone should show MayekAma as an available keyboard. The keyboard should display standard rows, suggestion strip, Roman Manipuri candidate words, and normal typing controls.

## If Gradle sync fails
Check the installed Android Studio version and Gradle plugin compatibility. This starter uses a simple native Android structure so it can be updated safely without affecting the website UI.
