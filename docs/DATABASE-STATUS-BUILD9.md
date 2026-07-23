# MayekAma Build 9 — Dictionary Growth Status

UI lock: unchanged. This build only grows the dictionary/database pipeline.

## What changed

- Integrated the user-provided JSON word batch into `data/imports/build9-user-pasted-chat-phrases.json`.
- Converted it into CSV import format at `data/imports/build9-user-and-chat-expansion.csv`.
- Added a JSON ingestion script for future files: `npm run database:ingest-json -- data/imports/user-import.json data/imports/user-import.generated.csv`.
- Updated the website dictionary to load the generated language pack, not the old 40-word starter list.
- Preserved the single master database path: `data/master/mayekama-master-lexicon.json`.

## Database policy

1. One canonical word is the primary visible spelling.
2. Existing canonical words are merged/replaced by the latest import.
3. Alias collisions are rejected, not duplicated.
4. User-provided and web-researched entries remain `needs_review` until manually approved.
5. No copyrighted sources are bulk-copied without licensing.

## Readiness

This is still a workbench dictionary, not a public standard release. The next practical target is 1,000 reviewed daily-chat entries.
