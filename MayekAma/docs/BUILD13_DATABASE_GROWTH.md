# MayekAma Build 13 — 1000+ Candidate Database Growth

## Status

Build 13 preserves the locked UI and only expands the language database through the single master dedupe pipeline.

- New candidate rows added: 1,310
- Final unique canonical entries after dedupe: 3,105
- Rejected duplicate/collision records: 1
- Review status: all new entries remain `needs_review`

## Important quality note

This is a candidate workbench, not an approved Roman Manipuri standard release. The new batch is designed to improve autocomplete coverage for chat, school, writing, technology, daily objects, places, and public governance workflows. Language editors should review canonical spelling before any word is marked `approved`.

## Source approach

Research found open or potentially useful Meitei/Manipuri resources, but Build 13 does not bulk-copy restricted dictionaries or websites. It adds a locally curated candidate batch and keeps external sources in the source catalog for licensing review, attribution, and future import planning.

## Pipeline rule

Only these paths should be used:

- `data/imports/*.csv` — new candidate batches
- `data/master/mayekama-master-lexicon.json` — single source of truth
- `data/rejected` — duplicate/conflict rows
- `data/reports` — database counts and status

No duplicate project folder should be created.
