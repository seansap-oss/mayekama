# MayekAma Build 11 — Database Browser + Growth

## Status

- UI remains locked. This build only adds database access buttons, a database browser section, and database content growth.
- Master database path: `data/master/mayekama-master-lexicon.json`.
- Import path: `data/imports`.
- Rejected duplicates/collisions path: `data/rejected`.
- Current candidate inventory after merge: 1248 unique canonical entries.
- All entries remain `needs_review` until language review/admin approval.

## New public feature

Dictionary and Governance now both include a **Check our database** button. It opens the shared A-Z database browser so contributors can check whether a word already exists before submitting another temporary word.

## Database rule

New words are not appended blindly. They go through the merge script. Same canonical entries are merged/replaced by latest import, alias collisions are rejected, and bad entries are rejected.

## Readiness

- Keyboard demo: usable.
- Basic chat pilot: improving.
- Real daily chat: target 2,000+ reviewed words.
- Small article: target 5,000+ reviewed words plus phrases.
- Book writing: target 40,000+ reviewed entries, grammar, examples, formal terms and named entities.
