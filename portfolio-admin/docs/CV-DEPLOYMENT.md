# CV publishing: deployment and verification

The existing public and admin applications still use the same Firebase project,
Firestore documents, Cloudinary account, and Netlify hosting. No records or
existing assets were deleted. No credentials were changed.

## Findings

The supplied admin app had project image uploads but no CV page, PDF uploader,
or writer for `site/public`. The public app read `cvUrl` but silently substituted
a bundled old PDF when absent and claimed a click had saved a file.

On 23 October 2026 the existing saved Cloudinary raw PDF initially returned **401**
and `x-cld-error: deny or ACL failure`. The owner confirmed that **Allow delivery
of PDF and ZIP files** was disabled in Cloudinary Security settings and enabled it.
The same saved URL now returns **200**, `application/pdf`, and a valid 65,806-byte,
one-page CV without authentication. Real desktop and mobile clicks on both current
local portfolio buttons download the exact same PDF. No Firestore reference was
changed. See the public app's [CV bug verification](../../portfolio/docs/CV-BUGFIX.md).

The deployed admin endpoint `/.netlify/functions/publish-cv` still returns **404**.
The current function and CV interface require deployment; real production upload
and replacement have not been verified.

## Required hosting setup

1. In the **admin site's** Netlify environment, provide `CLOUDINARY_API_KEY` and
   `CLOUDINARY_API_SECRET` from the existing Cloudinary account, with Functions
   scope. Do not use a `VITE_` prefix. Existing `VITE_FIREBASE_API_KEY`,
   `VITE_FIREBASE_PROJECT_ID`, and `VITE_CLOUDINARY_CLOUD_NAME` also need to be
   available to Functions. No new upload preset is required for the signed CV flow.
2. Cloudinary **Settings → Security → Allow delivery of PDF and ZIP files** is now
   enabled by the owner, and the existing CV was verified publicly accessible.
   Preserve the intended asset access restrictions. The function downloads and compares the
   uploaded bytes before publishing, so a blocked file never replaces the current
   reference. [Cloudinary upload documentation](https://cloudinary.com/documentation/upload_parameters)
3. Review deployed Firestore rules. They were not included in either source
   folder and have not been changed. `site/public` must be publicly readable;
   only `users/{uid}.role == "admin"` may write it. Role documents must not allow
   users to grant themselves admin access. Merge these requirements into existing
   rules without replacing rules for other collections. Example match block:

   ```text
   match /site/public {
     allow read: if true;
     allow create, update: if request.auth != null
       && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == "admin";
     allow delete: if false;
   }
   ```

   The publisher uses the admin's Firebase ID token for Firestore REST requests;
   it does not bypass rules with a service account. Server-side authorization also
   verifies the token and reads the admin-role document before uploading.
   [Firebase REST authorization](https://firebase.google.com/docs/firestore/use-rest-api)
4. Deploy the existing admin project with the included `netlify.toml`; deploy the
   public project normally. For local full-stack use, run `netlify dev` in the
   admin folder. Plain Vite serves UI only and cannot execute Netlify Functions.
   If the web API key is restricted by HTTP referrer, supply a same-project key
   appropriate for server requests as `FIREBASE_WEB_API_KEY`; preserve existing
   frontend key restrictions.
5. Sign in, open `/admin/resume`, upload the real current PDF (up to 4 MB), and
   publish. Refresh the dashboard, open the public portfolio in another session,
   and download. Replace with a second real version and repeat. Verify a signed-out
   request to `/.netlify/functions/publish-cv` returns 401 and a non-admin account
   cannot publish. These live checks remain required after setup.

## Failure and replacement behavior

- Both browser and function validate PDF extension, MIME type, size, header and
  end marker. This is file-format validation, not a full PDF parser or malware scan.
- Each upload gets a unique raw Cloudinary URL. The old file is never overwritten
  or deleted. Orphaned files from failed publication are intentionally retained.
- Firestore saves only CV fields, preserving the portrait and other settings.
  An expected current URL plus Firestore update-time precondition prevents silently
  overwriting another session's changes.
- Timeout or connection failures may occur after a save succeeds. The UI tells
  the admin to reload before retrying rather than claiming nothing changed.
- Visitors see an explicit email request link if there is no accessible CV. A small
  range request verifies its PDF MIME/header; ordinary GET is tried if Range is
  unsupported or triggers a network/CORS failure. The old bundled PDF remains on
  disk but is no longer linked. HTTP success containing HTML is rejected.
- Browser-native PDF viewing provides preview and download controls. The interface
  does not claim a file was saved merely because the visitor clicked a link.

## Verification scope

`npm test` exercises validation, endpoint authorization, replacement failures,
delivery verification, URL filtering and public fallback. `tests/browser-check.mjs`
drives actual React components and the real publishing handler against isolated
Firebase/Cloudinary test doubles, with fixture settings persisted on disk. It checks
upload, refresh, replacement, every public CV link, exact downloaded bytes, failed
upload retention, recovery after a temporary delivery failure, and mobile form validation. It does **not** verify production
credentials, deployed Firestore rules, or Cloudinary account permissions.

Run browser QA with a locally installed Playwright package, or set
`PLAYWRIGHT_PACKAGE` to an existing absolute package directory. `ADMIN_URL` and
`PUBLIC_URL` select running Vite servers; defaults are ports 5176 and 5173.
No test bypass or fake authentication is shipped in production code.
