# Backend API Contracts

The frontend has one Nuxt server endpoint:

| Nuxt route | Purpose |
| --- | --- |
| `server/api/[...path].ts` | Proxies browser `/api/*` requests to `NUXT_PRIVATE_API_BASE` on the server. |

The browser should use `NUXT_PUBLIC_API_BASE=/api`. Do not expose private backend hosts through `NUXT_PUBLIC_*`.

## Client API Modules

| Module | Method | Backend path | Auth |
| --- | --- | --- | --- |
| `app/utils/api/auth.ts` | `POST` | `/auth/signin` | No |
| `app/utils/api/auth.ts` | `POST` | `/auth/signup` | No |
| `app/utils/api/auth.ts` | `POST` | `/auth/signin-with-telegram` | No |
| `app/utils/api/auth.ts` | `POST` | `/auth/forgot-password` | No |
| `app/utils/api/auth.ts` | `POST` | `/auth/reset-password` | No |
| `app/utils/api/events.ts` | `GET` | `/events` | Yes/No depending on caller |
| `app/utils/api/events.ts` | `GET` | `/events/me` | Yes |
| `app/utils/api/events.ts` | `GET` | `/events/active-now` | Yes |
| `app/utils/api/events.ts` | `GET` | `/events/:id` | Yes |
| `app/utils/api/events.ts` | `GET` | `/events/:id/participants` | Yes |
| `app/utils/api/events.ts` | `GET` | `/events/templates` | Yes |
| `app/utils/api/events.ts` | `GET` | `/events/:id/my-seat` | Yes |
| `app/utils/api/events.ts` | `PATCH` | `/events/:id` | Yes |
| `app/utils/api/events.ts` | `DELETE` | `/events/:id` | Yes |
| `app/utils/api/events.ts` | `PATCH` | `/events/:id/participants/reorder` | Yes |
| `app/utils/api/events.ts` | `POST` | `/events` | Yes |
| `app/utils/api/events.ts` | `POST` | `/events/:id/finalize` | Yes |
| `app/utils/api/event-registration.ts` | `GET` | `/events/:id/registration` | Yes |
| `app/utils/api/event-registration.ts` | `POST` | `/events/:id/register` | Yes |
| `app/utils/api/event-registration.ts` | `DELETE` | `/events/:id/register` | Yes |
| `app/utils/api/content.ts` | `GET` | `/content/by-key/:key` | Yes |
| `app/utils/api/content.ts` | `GET` | `/content/:id` | Yes |
| `app/utils/api/content.ts` | `PUT` | `/content/:id` | Yes |
| `app/utils/api/feedback.ts` | `GET` | `/feedback` | Yes |
| `app/utils/api/feedback.ts` | `POST` | `/feedback` | Yes |
| `app/utils/api/feedback.ts` | `DELETE` | `/feedback/:id` | Yes |
| `app/utils/api/profile.ts` | `GET` | `/users/by-nickname` | Yes |
| `app/utils/api/profile.ts` | `PATCH` | `/users/me` | Yes |
| `app/utils/api/rating.ts` | `GET` | `/ratings/:gameType` | Yes |
| `app/utils/api/upload.ts` | `POST` | `/upload/image` | Yes |
| `app/utils/api/contact.ts` | `POST` | `/contact` | Yes |
| `app/utils/api/broadcasts.ts` | `POST` | `/broadcasts` | Yes |
| `app/utils/api/promo-links.ts` | `GET` | `/admin/promo-links` | Yes |
| `app/utils/api/promo-links.ts` | `GET` | `/admin/promo-links/:id` | Yes |
| `app/utils/api/promo-links.ts` | `POST` | `/admin/promo-links` | Yes |
| `app/utils/api/promo-links.ts` | `PATCH` | `/admin/promo-links/:id` | Yes |
| `app/utils/api/promo-links.ts` | `POST` | `/promo-links/track-click` | No |

## Verification Rule

If a new API call is added, update this file in the same change and verify that a page/composable actually uses it. Remove unused client methods instead of keeping dead endpoint wrappers.
