# Duck's GameClub Frontend

Nuxt 4 frontend for Duck's GameClub: Telegram Mini App/PWA, public event pages, profile flows, ratings, support content and admin tools.

## Stack

- Nuxt 4, Vue 3, TypeScript
- Tailwind CSS v4
- Axios through a single shared HTTP client
- Nuxt server API proxy
- PWA via `@vite-pwa/nuxt`

## Architecture

The project is organized around feature modules:

```text
app/
  shared/       HTTP client, base models and generic helpers
  features/     business modules: auth, events, profile, rating, content, etc.
  components/   global UI and layout components
  pages/        Nuxt route entry points
  middleware/   route access policies
  server/       Nuxt server proxy
```

New code should import from `app/features/*` and `app/shared/*`.

Legacy folders such as `app/api`, `app/services`, `app/types`, `app/utils` and selected `app/composables` remain as compatibility facades during migration. They should not contain business logic.

See [docs/architecture.md](./docs/architecture.md) for module responsibilities and import rules.

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
```

`npm run check` runs production build and typecheck.

## Deployment Notes

- Set `NUXT_PRIVATE_API_BASE` in the server runtime environment.
- Keep frontend secrets out of `NUXT_PUBLIC_*`; those values are exposed to the browser.
- The production build outputs a Nitro node server in `.output/server`.
- PWA assets are expected in `public/192.png` and `public/512.png`.
