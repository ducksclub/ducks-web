# Duck's GameClub Frontend Architecture

## Goals

- Follow the simple Nuxt 4 directory structure.
- Keep route pages easy to find in `app/pages`.
- Keep reusable Vue state in `app/composables`.
- Keep app runtime helpers and API clients in `app/utils`.
- Keep shared DTOs and domain types in root `shared/types`.
- Keep backend-facing Nuxt endpoints in root `server`.

## Structure

```text
app/
  assets/        styles, fonts and app-bundled static assets
  components/    reusable Vue components
  composables/   Vue composables and app-level state
  constants/     static app constants
  layouts/       Nuxt layouts
  middleware/    route guards
  pages/         file-based routes
  plugins/       Nuxt plugins
  utils/         helpers, session storage and API clients
  validation/    form validation schemas
server/
  api/           Nuxt server API routes and proxy endpoints
shared/
  types/         DTOs and TypeScript types shared by app/server code
public/          public static files served as-is
```

## Import Rules

- Pages compose components, composables and API clients, but should not hide route behavior in feature folders.
- `app/utils/api/*` contains typed backend client methods only.
- `app/composables/*` contains Vue state and user flows.
- `shared/types/*` contains types and constants only; it must not import from `app/*`.
- `server/api/*` is the only place for Nuxt server endpoints.
- Do not add FSD folders such as `features`, `entities`, `widgets` or compatibility folders such as `services`, `types` under `app`.
- Do not add barrel files that only re-export imports. Import directly from the file that owns the code.

## API Flow

Browser code calls typed clients from `app/utils/api/*`.

```text
page/composable -> app/utils/api/* -> app/utils/api/http-client.ts -> /api/* -> server/api/[...path].ts -> backend
```

`NUXT_PUBLIC_API_BASE` should normally stay `/api`, so browser requests go through the Nuxt proxy. The private backend URL belongs in `NUXT_PRIVATE_API_BASE` and is available only on the server.

## Runtime State

- Auth token and profile are stored by `app/utils/session.ts`.
- `app/utils/api/http-client.ts` attaches the bearer token only for requests that require auth.
- On authenticated `401` responses, the session is cleared and the user is redirected to `/signin`.

## Page QA Checklist

Before a production handoff:

- Run `npm run typecheck`.
- Run `npm run build`.
- Start the app and open every route from `app/pages`.
- Check browser console and network errors.
- Verify loading, empty and error states for pages that call API.
- Verify protected/admin pages redirect correctly without auth.
- Check desktop and mobile viewport layouts.
