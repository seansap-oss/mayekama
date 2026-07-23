# MayekAma — Roman Manipuri Language Platform

MayekAma is a production-oriented starter for a Roman Manipuri keyboard, writer, dictionary, language-standard engine, API and installation website.

This package contains:

- `apps/website` — responsive website and web writer.
- `packages/language-engine` — reusable Roman Manipuri standardisation engine.
- `database/supabase` — starter PostgreSQL schema and RLS policies.
- `apps/android-keyboard` — native Android InputMethodService keyboard scaffold.
- `apps/ios-keyboard` — iOS custom keyboard extension source scaffold.
- `docs` — roadmap, standard rules and API plan.

## Local website commands

Run from the project root in PowerShell:

```powershell
npm install
npm run dev
```

Then open the URL shown in the terminal, usually `http://localhost:5173`.

## Android keyboard

Open `apps/android-keyboard` in Android Studio. Build the app, install on a test Android phone, then enable the keyboard in Android settings.

The Android keyboard is deliberately native. Do not replace it with a webview wrapper.

## iOS keyboard

The iOS folder contains the Swift source scaffold for a host app and keyboard extension. Create an Xcode project with an app target and custom keyboard extension target, then add these files.

## Important honesty note

The starter dictionary is a seed. It is not yet a complete authoritative Manipuri dictionary. The long-term value comes from curated canonical spelling decisions, community review and standard releases.
