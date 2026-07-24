# MayekAma Build 3 Android Test Notes

Build 3 adds a real native Android keyboard scaffold.

## Command 1 – Open Android folder from PowerShell

```powershell
start "" "D:\MayekAma\apps\android-keyboard"
```

Open the same folder in Android Studio.

## Manual Android Studio steps

1. Open `D:\MayekAma\apps\android-keyboard`.
2. Let Gradle sync.
3. Connect an Android phone with USB debugging enabled, or use an emulator.
4. Run the `app` configuration.
5. Open the MayekAma app.
6. Tap **Enable MayekAma Keyboard**.
7. Turn on MayekAma in Android keyboard settings.
8. Return to the app and tap **Select Keyboard**.
9. Choose MayekAma.
10. Test inside WhatsApp, YouTube comments, browser and notes.

## Build 3 acceptance test

- Keyboard opens without crashing.
- Keys commit text.
- Space/delete/enter work.
- Suggestion strip appears.
- Typing `noong` suggests `nungshi` eventually when dictionary rules match.
- Typing `eina nangbu` suggests `nungshi`.
- The companion app explains privacy and setup.

This is not the final APK yet. Build 4 will improve local storage and keyboard polish.
