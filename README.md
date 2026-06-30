# Duck's GameClub Frontend

Nuxt 4 frontend for Duck's GameClub: Telegram Mini App/PWA, public event pages, profile flows, ratings, support content and admin tools.

## Stack

- Nuxt 4, Vue 3, TypeScript
- Tailwind CSS v4
- Axios through a single shared HTTP client
- Nuxt server API proxy
- PWA via `@vite-pwa/nuxt`

## Architecture

The project follows the simple Nuxt 4 directory structure:

```text
app/
  components/   reusable UI and layout components
  composables/  Vue composables and app-level flows
  layouts/      Nuxt layouts
  middleware/   route access policies
  pages/        file-based Nuxt routes
  plugins/      Nuxt plugins
  utils/        helpers, session storage and API clients
  validation/   form validation schemas
server/
  api/          Nuxt server proxy endpoints
shared/
  types/        DTOs and shared TypeScript types
```

API clients live in `app/utils/api/*`. Shared DTOs live in `shared/types/*`. FSD folders such as `features`, `entities` and `widgets` are intentionally not used.

See [docs/architecture.md](./docs/architecture.md) for import rules and [docs/api.md](./docs/api.md) for the backend API contract map.

## Main Scenarios

- Sign up, sign in, Telegram sign in, password reset.
- Browse published events, open event details, register/unregister, view registered players and poker seat information.
- Manage profile data and avatar.
- View rating, rules, FAQ, info pages and support links.
- Admin: manage events/templates, active event participants/order/finalization, content, feedback, broadcasts and promo links.

## Environment

Copy `.env.example` to `.env` and set values for your environment.

```bash
NUXT_PRIVATE_API_BASE=http://localhost:3003/api
NUXT_PUBLIC_API_BASE=/api
NUXT_PUBLIC_MEDIA_BASE=
NUXT_PUBLIC_SITE_URL=http://localhost:3000
```

`NUXT_PRIVATE_API_BASE` is used by the Nuxt server proxy in `server/api/[...path].ts`. The browser should usually use `NUXT_PUBLIC_API_BASE=/api`.

## Commands

```bash
npm install
npm run dev
npm run build
npm run preview
npm run typecheck
npm run check
```

`npm run check` runs production build and typecheck.

## Quality Gate

Before production handoff:

- `npm run typecheck`
- `npm run build`
- Browser QA for every route under `app/pages`
- Console/network checks for pages that call API
- Protected route redirect checks for profile/admin pages

## Deployment Notes

- Set `NUXT_PRIVATE_API_BASE` in the server runtime environment.
- Keep frontend secrets out of `NUXT_PUBLIC_*`; those values are exposed to the browser.
- The production build outputs a Nitro node server in `.output/server`.
- PWA assets are expected in `public/192.png` and `public/512.png`.
