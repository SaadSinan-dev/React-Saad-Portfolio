# CV delivery bug: verification on 23 October 2026

## Confirmed root cause and current status

Cloudinary's product-environment Security setting **Allow delivery of PDF and ZIP
files** was disabled. The owner confirmed this and enabled it. Before that change,
the saved raw PDF returned HTTP 401 with `x-cld-error: deny or ACL failure`.
Afterward, the same Firestore URL returned HTTP 200, `application/pdf`, and 65,806
bytes without authentication. No URL or Firestore record needed replacement.

The downloaded PDF has a valid header and end marker, parses as one unencrypted
page, and contains the owner's name and readable CV text. SHA-256:
`107ec22fa786e93db8b02fbdf9a777efeb3f81616de3cbae0a31062c19e6bde6`.
The actual public availability check also succeeds with HTTP 206.

The current local portfolio uses real Firestore and Cloudinary services. Clicking
both Hero and About CV buttons at desktop and mobile sizes downloaded the same
65,806-byte file with that exact hash. These were real browser clicks, with no
substituted settings, authentication, storage response, or PDF.

**Deployment remains separate:** the deployed portfolio HTML still identifies its
older build (`index-BuchMtk5.js`, Flutter & Mobile Developer title). A direct HTTP
200 retrieval of its JavaScript confirms it still references `CV-Bmylir3U.pdf` and
the old Download CV label; it does not contain the current View / download CV
label. The deployed page did not render reliably in the browser here, so actual
deployed button clicks could not be signed off. The deployed admin publishing
endpoint returns HTTP 404.
Local changes have not been deployed. Production upload/replacement is not signed
off; the required server-only Cloudinary credentials are absent locally.

## Minimal code changes

| Application | File | Change |
| --- | --- | --- |
| Public | `src/services/site/cvDelivery.js` | Follow redirects; check MIME and streamed PDF header; retry ordinary GET when Range is unsupported or fails; retain accurate HTTP/network failures. |
| Public | `src/hooks/useSiteSettings.jsx` | Share availability and checking state between all CV buttons; retry after focus/online events. |
| Public | `src/components/ui/ResumeLink.jsx` | Preserve styling; show checking state; open current saved PDF securely; use an explicit email fallback for unavailable files. |
| Admin | `src/services/site/cvDelivery.js` | Verify the actual downloaded PDF with GET, size limits, MIME, header and end marker instead of trusting HEAD. |
| Admin | `src/admin/pages/ResumePage.jsx` | Report real saved-PDF availability and an accurate failure message. |
| Admin | `netlify/functions/publish-cv.mjs` | Explicit signed public upload delivery type; validate downloaded MIME and exact uploaded bytes; give actionable permission errors before updating Firestore. |

No stale bundled PDF is used by the current buttons. Firebase authentication,
server-side admin authorization, existing settings fields, concurrency checks and
previous-file preservation remain in place.

## Verification

- Public unit/regression tests: **10 passed**.
- Admin unit/regression tests: **10 passed**.
- Production builds: **both passed**.
- Isolated browser upload, refresh, replacement, every public link, exact download
  bytes, unsupported Range, failed-upload preservation and mobile checks: **passed**.
  These upload/replacement checks simulate external services; they do not prove
  production publishing works.
- Real-service browser downloads: **4 passed**, covering both current local buttons
  at desktop and mobile sizes. Evidence: `qa-artifacts/live-cv-browser-check.json`.
- Real public PDF HTTP evidence: `qa-artifacts/live-cv-check.json`.
- Live admin publisher: **404**, so deployed authorization and real upload/
  replacement checks still require deployment and server configuration.

The new regression coverage is in public `tests/cvDelivery.test.mjs`, updated
`tests/settings.test.mjs`, admin `tests/cvDelivery.test.mjs`, updated
`tests/cv.test.mjs`, and `tests/browser-check.mjs`.

## Remaining deployment work

Deploy both existing applications to their existing Netlify sites. Configure the
admin Functions environment with `CLOUDINARY_API_KEY` and `CLOUDINARY_API_SECRET`
(never `VITE_` variables), then complete a real admin upload and replacement check.
See the sibling admin `docs/CV-DEPLOYMENT.md`. Do not change the working saved CV
reference merely to address the earlier account-level delivery denial.
