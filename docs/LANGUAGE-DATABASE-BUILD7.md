# MayekAma Build 7 — Language Database Expansion

## Goal
Build the foundation for the largest Roman Manipuri language database without copying copyrighted dictionaries or scraping protected sites.

## Important rule
MayekAma will not bulk-copy every dictionary or website on the internet. The language database must be legally clean so it can later be used by schools, colleges, publishers, government offices and paid API customers.

## Database layers
1. **Reference catalog** — sources we know exist, with licence status and import status.
2. **Workbench lexicon** — unreviewed candidate words, aliases, examples and meanings.
3. **Reviewed canonical dictionary** — words approved for prediction and public standard use.
4. **Book-writing corpus** — phrase patterns, topic vocabulary, formal terms and style examples.
5. **Language-pack release** — compact offline package downloaded by the Android keyboard.

## How we grow to book-level coverage
- Import licensed/open datasets only.
- Convert Meitei Mayek/Bengali-script resources into Roman candidates using versioned transliteration rules.
- Create one canonical Roman spelling per word.
- Keep variants only as aliases.
- Review words by humans before making them official.
- Publish language-pack releases with version numbers.

## Immediate Build 7 deliverables
- `data/sources/source-catalog.json`
- `data/imports/seed-master-lexicon.csv`
- `scripts/import-lexicon.mjs`
- `scripts/audit-source-catalog.mjs`
- `scripts/build-language-pack.mjs`
- `database/language-database-schema.sql`
- `packages/language-engine/language-pack.build7.json` after running the pack script.

## Command
Run:

```powershell
npm run build7:check
```

This validates TypeScript, checks the language pack, audits source licensing status, imports the seed lexicon, and creates a Build 7 keyboard language pack.
