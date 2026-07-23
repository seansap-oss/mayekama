# MayekAma Build 12 — Daily Chat Database Expansion

UI rule: locked. This build adds data and a small contribution helper only.

## Status

- Unique canonical entries: 1,795
- New Build 12 candidate rows: 547
- Rejected duplicate/collision rows: 1
- Review status: all entries remain `needs_review`
- Chat readiness: basic pilot, improving
- Article readiness: early prototype
- Book readiness: not ready; needs 40,000+ reviewed entries, grammar layers, phrase frequency and examples

## What changed

- Added `data/imports/build12-daily-chat-article-growth.csv`.
- Rebuilt `data/master/mayekama-master-lexicon.json`.
- Rebuilt `packages/language-engine/language-pack.build9.json`.
- Added a Governance bulk pre-check tool so contributors can paste many candidate words and see which already exist before submitting.

## Database rule

All additions continue to pass through the same pipeline:

```text
data/imports/*.csv
  -> scripts/merge-lexicons.mjs
  -> data/master/mayekama-master-lexicon.json
  -> packages/language-engine/language-pack.build9.json
```

No separate random dictionary folders should be created.
