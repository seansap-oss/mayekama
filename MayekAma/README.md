# MayekAma Build 12 — Chat Database Expansion

MayekAma is a Roman Manipuri keyboard, writer, dictionary and governance platform.

## Current status

- Website: testable
- UI: locked; additions only
- Dictionary: 1,795 unique candidate canonical entries
- Governance: temporary submissions + database pre-check
- APK: Android alpha source handled separately

## Run

```powershell
npm install
npm run database:merge
npm run database:status
npm run database:pack
npm run dev
```

Open http://localhost:5173


## Build 13 database growth

Build 13 adds 1,310 candidate rows and brings the master database to 3,105 unique canonical entries after dedupe. UI remains locked; only the database and documentation were added. See `docs/BUILD13_DATABASE_GROWTH.md`.
