# Duck's GameClub Frontend

Nuxt 4 frontend for Duck's GameClub: Telegram Mini App/PWA, public event pages, user profile flows, ratings, support content, and admin tools for events, content, broadcasts, feedback, and promo links.

## Stack

- Nuxt 4, Vue 3, TypeScript
- Pinia with persisted auth state
- Tailwind CSS v4
- Axios API client through a Nuxt server proxy
- PWA via `@vite-pwa/nuxt`

## Main Scenarios

- Sign up, sign in, Telegram sign in, password reset.
- Browse published events, open event details, register/unregister, view registered players, and view poker seat information.
- Manage profile data and avatar.
- View rating, rules, FAQ, info pages, and support links.
- Admin: manage events/templates, active event participants/order/finalization, content, feedback, broadcasts, and promo links.

## Environment

Copy `.env.example` to `.env` and set values for your environment.

```bash
API_URL=http://localhost:3003/api
NUXT_PUBLIC_API_BASE=/api
NUXT_PUBLIC_MEDIA_BASE=
```

`API_URL` is private server runtime config. The browser should usually use `NUXT_PUBLIC_API_BASE=/api`, which sends requests through `server/api/[...path].ts`. Set `NUXT_PUBLIC_MEDIA_BASE` only when uploaded images need a separate public origin.

## Commands

```bash
npm install
npm run dev
npm run build
npm run preview
npm run typecheck
```

`npm run check` runs production build and typecheck.

## Notes For Deployment

- Set `API_URL` in the server runtime environment.
- Keep frontend secrets out of `NUXT_PUBLIC_*` variables; those are exposed to the browser.
- The production build outputs a Nitro node server in `.output/server`.
- PWA assets are expected in `public/192.png` and `public/512.png`.
