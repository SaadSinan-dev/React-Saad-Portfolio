# Portfolio improvement report — 23 October 2026

**Current CV status:** the owner enabled Cloudinary PDF delivery; the real saved
PDF now downloads successfully from both current local CV buttons on desktop and
mobile. Both live sites still need the current code deployed. See
[CV bug verification](CV-BUGFIX.md) for the later findings and current test results.
The original implementation observations below describe the earlier state.

Implemented directly in the existing `portfolio` and sibling `portfolio-admin`
applications. React, Vite, Firebase Authentication, Firestore, Cloudinary, existing
routes, bilingual content, project data, and deployment targets were preserved.
No production secrets, records, or storage assets were changed. No application
dependencies were added. The folders do not contain Git metadata, so no commits
or pull request were created.

## CV findings and implementation

The supplied admin application had no CV route, uploader, or settings writer.
The public application already read `site/public.cvUrl`, but substituted an older
bundled PDF when absent and displayed “Saved” immediately after a link click.
The existing saved Cloudinary PDF was tested directly and returned HTTP 401 with
`x-cld-error: deny or ACL failure`. Existing project images were accessible.

The new `/admin/resume` page shows the current filename, size, date, delivery
status and PDF link, plus explicit selection and publishing controls. The server
verifies Firebase identity and the existing admin-role document, validates PDF
type/size/signature/end marker, uploads a unique Cloudinary raw asset, retrieves
and compares its bytes, then saves only the CV fields in Firestore. Existing
files are retained. Concurrent changes are protected by the expected previous URL
and a Firestore document update-time precondition.

Hero and About use one shared settings subscription and the same published CV
reference. A small PDF range request checks delivery. Missing or inaccessible PDFs
produce a contact link. Online/focus events retry temporary availability failures.
The old bundled PDF remains on disk but is no longer referenced by public buttons.

**Live publishing is not signed off:** server credentials are absent, deployed
Firestore rules are not supplied, and Cloudinary currently denies PDF delivery.
See [CV deployment checklist](../../portfolio-admin/docs/CV-DEPLOYMENT.md).

## Public website

The hero has a two-line editorial name, a more direct web/Flutter introduction,
clear actions and a responsive portrait/facts composition. The graphite palette
and typography are retained, with a warmer neutral background and tighter section
spacing. About now reflects the existing web-and-mobile identity and preserves
the complete original biography.

Work now presents permanent screenshot previews on desktop and mobile, short
descriptions, technology summaries, featured labels and direct source/demo links.
Existing category tabs, case studies, mobile carousels and web galleries remain.
Metadata now describes the actual software engineering focus; the missing social
preview image reference uses the existing public portrait. The fallback portrait
was optimized from 605,451 to 50,424 bytes, with the original retained. Vendor
chunks are separated for caching; final builds have no oversized-chunk warnings.

## Admin dashboard

The dashboard has a dark graphite sidebar, clearer workspace hierarchy, consistent
panels and controls, a CV shortcut and dedicated résumé workspace. The project list
uses responsive rows until sufficient space exists for its seven-column layout.
Forms and empty states use clearer language; Featured now corresponds to a visible
public label. Existing project editing, bilingual fields, galleries, categories,
ordering, search, filters and deletion confirmation remain.

Also fixed: asynchronous role checks cannot restore stale admin state after a newer
auth event; project editor navigation resets its loading/error state; image uploads
have an explicit timeout; confirmation dialogs preserve focus, lock background
scrolling, and trap focus while busy. Mobile project actions have larger targets.

## Files and major components

| Application | Files / components |
| --- | --- |
| Public CV | `src/App.jsx`; `src/hooks/useSiteSettings.jsx` (replaces `.js`); `src/services/site/siteSettingsService.js`, `settingsMapper.js`, `cvDelivery.js`; `src/components/ui/ResumeLink.jsx` |
| Public presentation | `src/components/sections/Hero.jsx`, `About.jsx`, `Work.jsx`; `src/index.css`; `index.html`; new `src/assets/profile.webp` and `public/profile.webp`; `vite.config.js` |
| Admin CV | `src/admin/pages/ResumePage.jsx`; `src/services/site/siteSettingsService.js`, `pdfValidation.js`; `netlify/functions/publish-cv.mjs`; `netlify.toml`; `.env.example` |
| Admin workspace | `src/admin/AdminRoutes.jsx`; `components/AdminLayout.jsx`, `StatCard.jsx`, `ProjectForm.jsx`, `ConfirmDialog.jsx`; `pages/DashboardPage.jsx`, `ProjectsPage.jsx`, `ProjectEditorPage.jsx`, `LoginPage.jsx`, `AccountPage.jsx`; `context/AuthContext.jsx`; `src/services/media/cloudinaryService.js`; `src/index.css`; `vite.config.js` |
| Verification/docs | Both `package.json` test scripts and READMEs; `portfolio/tests/settings.test.mjs`; `portfolio-admin/tests/cv.test.mjs`, `browser-check.mjs`; this report; `portfolio-admin/docs/CV-DEPLOYMENT.md`; local QA screenshots and link results |

Admin component/page paths in the table are relative to `src/admin` where shortened.

## Verification results

| Check | Actual result |
| --- | --- |
| Public `npm test` | PASS — 4 tests |
| Admin `npm test` | PASS — 8 tests |
| `npm run build` in both applications | PASS — no oversized-chunk warnings in final runs |
| `node --check netlify/functions/publish-cv.mjs` | PASS |
| Admin `node tests/browser-check.mjs` with existing Playwright runtime | PASS — isolated service fixtures; details below |
| Production browser smoke | Both built apps load without JavaScript exceptions; signed-out admin résumé route redirects to login |
| Public widths 320, 390, 768, 1024, 1440 | No horizontal page overflow observed |
| Admin project widths 390, 768, 1024, 1440 | No horizontal page overflow observed |
| Public interaction | Mobile/desktop, Arabic RTL, light/dark modes, category switching, project dialog opening, Escape and focus restoration checked |
| Existing project URLs | All 22 live-demo/GitHub URLs returned HTTP 200; saved in `qa-artifacts/link-checks.json` |
| Lint / type-check | Neither original project defines these commands; no TypeScript setup is present |

The isolated browser test runs the actual résumé UI, client publisher and server
handler, substituting only external identity/storage/database boundaries. It saves
fixture settings to disk and checks PDF upload, dashboard refresh, replacement,
both public CV links, exact downloaded bytes, failure preservation and recovery
after a temporary delivery failure. It also exercises mobile CV/editor screens,
required-field validation, dashboard/list/account navigation, project filtering,
and cancellation of the delete confirmation. No production write is made.

Live reads and HTTP checks used the configured public backend. The known PDF 401
remains an external service failure; it is not hidden in this report. Live admin
sign-in, production uploads, actual deployed authorization rules and live project
writes were not verified without credentials. Existing unsigned project-image
uploads remain unchanged apart from timeout handling; their Cloudinary preset
permissions could not be audited from local source.

## Remaining action

Open the sibling admin [CV deployment checklist](../../portfolio-admin/docs/CV-DEPLOYMENT.md).
It lists the required server-only Cloudinary settings, PDF delivery permission,
Firestore rule checks, deployment and real-account upload/replacement verification.
No deployment was performed during this task.
