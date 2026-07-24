# MayekAma Database Status — Build 8

The database is not yet enough for public day-to-day chat, small articles, or book writing as a final standard. It is now a proper database workbench with import, merge, dedupe, rejection and reporting logic.

| Use case | Minimum useful target | Current Build 8 status |
|---|---:|---|
| Keyboard alpha demo | 100–300 entries | enough for prototype examples |
| Small private chat pilot | 1,000–2,000 reviewed daily entries | not yet |
| Strong daily chat | 5,000–8,000 reviewed entries + phrase pairs | not yet |
| Small article writing | 8,000–15,000 entries including formal/editorial terms | not yet |
| Small book writing | 40,000+ entries, grammar rules, names, idioms, examples | not yet |

## One-folder database rule

`data/imports/*.csv` → `npm run database:merge` → `data/master/mayekama-master-lexicon.json` → rejects/report.

1. Same canonical word = replace/merge latest import.
2. Same alias pointing to two different canonical words = reject.
3. Empty canonical word = reject.
4. Existing words are not duplicated.
5. Unreviewed imports are marked `needs_review`.
6. Only approved words should later become a public RMS release.
