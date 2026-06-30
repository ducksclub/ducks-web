# Duck's GameClub Frontend Architecture

## Goals

- Keep the existing user-facing functionality and backend contracts.
- Make feature boundaries explicit.
- Keep pages thin: pages compose feature use-cases and components, but do not own API details.
- Avoid additional state libraries until there is a concrete need.

## Layers

```text
app/
  shared/       framework-agnostic helpers, HTTP client, base models
  features/     domain modules grouped by business capability
  components/   global UI/layout/shared components
  composables/   truly app-wide Vue utilities only
  pages/        Nuxt route entry points
  middleware/   route access policies
  server/       Nuxt server proxy and server-only endpoints
```

## Import Rules

- `shared` must not import from `features`.
- `features/*/api` contains endpoint calls and DTOs only.
- `features/*/model` contains domain types, constants, mappers and pure helpers.
- `features/*/composables` contains user flows and Vue state for a feature.
- `pages` can import feature composables and components.
- Generic UI components must not call API modules directly.
- Do not add compatibility facades such as `app/api`, `app/services`, `app/types` or `app/utils`.
- Shared helpers are imported explicitly from `~/shared/*`; feature types and API clients are imported from their owning feature.

## Current Feature Modules

- `auth`: session, sign in/sign up, Telegram sign in, password reset, route access checks.
- `events`: public events, details, registration, participants, seats and admin event workflows.
- `profile`: profile read/update and persisted session synchronization.
- `rating`: rating leaderboards by game type.
- `content`: editable static content such as rules, FAQ and training levels.
- `feedback`: user feedback and admin feedback moderation.
- `promo-links`: promo link CRUD and public click tracking.
- `broadcasts`: admin broadcast creation.
- `upload`: image upload capability.
- `telegram`: Telegram WebApp integration.

## Removed Legacy Layers

- `app/api`: replaced by `features/*/api`.
- `app/services`: replaced by feature API clients and feature composables.
- `app/types`: replaced by `features/*/model` and `shared/model`.
- `app/utils`: replaced by explicit imports from `shared/lib`, `shared/api` and feature model helpers.
- `app/composables/services`: replaced by `features/*/composables`.
