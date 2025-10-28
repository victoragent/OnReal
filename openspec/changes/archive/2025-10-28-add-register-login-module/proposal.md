## Why
OnReal needs dedicated authentication surfaces so developers can both register and log into the dashboard and API tooling. Today the app has only the marketing surface, so prospective builders cannot create credentials or access gated product areas.

## What Changes
- Introduce `/register` and `/login` routes using the App Router that deliver cohesive auth cards aligned with OnReal's design language.
- Add a shared auth layout that reuses typography/theme toggles, highlights terms/privacy links, and provides mutual navigation between login and register flows.
- Wire both forms into NextAuth: registration creates a user via an API route before authenticating, while login validates existing credentials. Each flow surfaces inline validation, loading, and error states.

## Impact
- Prospective developers can self-serve account creation and immediately access protected dashboards upon verification.
- Establishes reusable auth primitives for upcoming work (password reset, SSO providers, step-up auth).
- Reduces friction by delivering validation, loading, and error feedback entirely inline while keeping the experience brand-consistent.
