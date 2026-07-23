# MayekAma API Plan

## Public endpoints

```http
GET /api/health
POST /api/normalize
POST /api/predict
GET /api/dictionary?q=eigi
```

## Commercial endpoints later

```http
POST /api/v1/document/normalize
POST /api/v1/translate/english-to-roman-manipuri
POST /api/v1/transliterate/meitei-mayek-to-roman
POST /api/v1/publisher/batch
```

## Monetisation tiers

- Free developer key: low request limits.
- Creator: writer tools and document export.
- Publisher: batch article processing and CMS integration.
- School/College: classroom vocabulary and admin controls.
- Institution/Government: terminology packs, private deployment, support.

## Privacy rule

The keyboard should not upload ordinary typed messages. API tools are for explicit user actions such as web writer conversion, publisher workflows and dictionary lookup.
