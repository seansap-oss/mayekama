# MayekAma API Specification Draft

## Free endpoints

### Word lookup
```http
GET /api/v1/dictionary?q=eigi
```

### Normalise Roman Manipuri
```http
POST /api/v1/normalize
```

Request:
```json
{ "text": "Eina nangbu noongshi" }
```

Response:
```json
{
  "standard": "Eina nangbu nungshi",
  "changes": [
    { "from": "noongshi", "to": "nungshi", "reason": "alias_to_canonical" }
  ]
}
```

## Paid endpoints later

### Predict next words
```http
POST /api/v1/predict
```

### Batch document normalisation
```http
POST /api/v1/documents/normalize
```

### Draft translation
```http
POST /api/v1/translate/draft
```

## Revenue structure
- Free: public dictionary and low-volume normalisation.
- Developer: API keys and higher quota.
- Publisher: batch article processing.
- Institution: private terminology pack and support.
