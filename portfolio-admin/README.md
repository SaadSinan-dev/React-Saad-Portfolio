# Portfolio Admin

Standalone React/Vite admin dashboard for the shared portfolio backend.

- Firebase Authentication: admin login
- Firestore: project metadata / CRUD
- Cloudinary: unsigned project image uploads
- Authorization: `users/{uid}.role === "admin"`
- CV management: `/admin/resume`, authenticated Netlify Function, signed Cloudinary PDF upload, and persistent `site/public` settings.

See [CV deployment and verification](docs/CV-DEPLOYMENT.md) for required server-only configuration and the live PDF delivery blocker found during inspection.

No service-account credential or Cloudinary API secret belongs in this frontend project.

## Local development

1. Copy `.env.example` to `.env` and fill the Firebase web configuration, Cloudinary cloud name/upload preset, and public portfolio URL.
2. Run `npm install`.
3. Run `npm run dev`.
4. Open `/admin/login`.

## Production build

```bash
npm run build
```

Vite writes the production app to `dist/`. `public/_redirects` provides a Netlify SPA fallback for `/admin/*` routes.

When hosting on a new admin domain, add that domain to Firebase Authentication > Settings > Authorized domains. If the Firebase Web API key is restricted by HTTP referrer in Google Cloud, add the admin domain there as well.
