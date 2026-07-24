# Vercel Deployment Guide

## Website framework
Vite + React + TypeScript.

## Local production check
Run:

```powershell
npm run build
npm run preview
```

## Vercel settings
- Framework preset: Vite
- Build command: `npm run build`
- Output directory: `dist`
- Install command: `npm install`

## Environment variables
Add these later when Supabase is connected:

```text
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

## SEO files included
- `public/robots.txt`
- `public/sitemap.xml`
- PWA manifest
- App icon

Update the domain in `public/sitemap.xml` after the final domain is chosen.
