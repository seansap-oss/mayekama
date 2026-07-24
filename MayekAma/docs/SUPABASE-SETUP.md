# Supabase Setup

## Purpose
Supabase is used for the public dictionary database, contribution review, language-pack releases, API customers, and admin workflow.

The keyboard should not upload private typing. It downloads approved language packs and performs prediction locally.

## Apply schema
Open Supabase SQL Editor and run:

```text
database/supabase-schema.sql
```

Then run the optional release/API extension:

```text
database/release-api-schema.sql
```

## Minimum tables
- standard_words
- word_aliases
- phrase_patterns
- user_contributions
- expert_reviews
- standard_releases
- api_customers
- api_usage_events

## Security rule
Use Row Level Security. Public users can read approved published dictionary entries. Only admin/reviewer users can approve language-standard records.
