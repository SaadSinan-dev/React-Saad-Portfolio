# Public Portfolio

Standalone public React/Vite portfolio. Project metadata is read from the shared Firebase Firestore `projects` collection in real time. Project images are loaded from the Cloudinary URLs stored in Firestore. The profile image and CV reference are read from `site/public` through one shared subscription. The bundled portrait remains a fallback. CV links use only the published, accessible PDF; if absent or unavailable, visitors can request the résumé through Contact. Manage the CV in the sibling `portfolio-admin` app at `/admin/resume`.

## Local development

1. Copy `.env.example` to `.env` and fill the Firebase web configuration.
2. Run `npm install`.
3. Run `npm run dev`.

## Production build

```bash
npm run build
```

Vite writes the production site to `dist/`.

## Netlify

- Build command: `npm run build`
- Publish directory: `dist`
- Configure the five `VITE_FIREBASE_*` values from `.env.example` in Netlify environment variables.
- `public/_redirects` is copied into the build and provides the SPA fallback.
