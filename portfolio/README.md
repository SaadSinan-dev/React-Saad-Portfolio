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

The public projects feed is `/.netlify/functions/public-projects` on this Netlify site. The dashboard updates the canonical project and its sanitized publicProjects document in one Firestore commit. Both public sites listen to publicProjects. The endpoint reads that same collection as a fallback. The build copies legacy project images to stable public paths. Keep `netlify.toml` in the Netlify base directory. For server-side Firebase requests, set `FIREBASE_WEB_API_KEY` when the browser key is restricted by referrer. See the Mashrouak repository's `docs/PORTFOLIO_PROJECTS_INTEGRATION.md` for deployment order and verification.

- Build command: `npm run build`
- Publish directory: `dist`
- Configure the five `VITE_FIREBASE_*` values from `.env.example` in Netlify environment variables.
- `public/_redirects` is copied into the build and provides the SPA fallback.
