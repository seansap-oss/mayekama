# MayekAma — Build 6 Release Candidate

MayekAma is a Roman Manipuri language platform: website, writer, dictionary, language engine, Android keyboard source, Supabase schema, and future API foundation.

## Current status

```text
Current build: Build 6 of 6
UI status: Locked — no redesign, only additions
Website status: Testable
Language engine status: Testable
Android keyboard status: Alpha source included
APK included: No
Next milestone: Build APK in Android Studio and test on phone
```

## One-command setup

After downloading `MayekAma_Build6.zip` to Downloads, open VS Code PowerShell and run:

```powershell
Remove-Item -Recurse -Force "D:\MayekAma" -ErrorAction SilentlyContinue; New-Item -ItemType Directory -Force -Path "D:\MayekAma" | Out-Null; Expand-Archive -Force "$env:USERPROFILE\Downloads\MayekAma_Build6.zip" "D:\MayekAma"; cd "D:\MayekAma"; npm install; npm run dev
```

Then open:

```text
http://localhost:5173
```

## Check release package

```powershell
npm run release:check
```

## Android keyboard source

Open this folder in Android Studio:

```text
D:\MayekAma\apps\android-keyboard
```

The source is included. A compiled APK is not bundled in this ZIP.

## Key documentation

- `docs/BUILD6-RELEASE-CANDIDATE.md`
- `docs/APK-HANDOVER.md`
- `docs/TESTING-CHECKLIST.md`
- `docs/UI-LOCK-RULE.md`
- `docs/SUPABASE-SETUP.md`
- `docs/API-SPEC.md`
- `docs/DEPLOYMENT-VERCEL.md`
