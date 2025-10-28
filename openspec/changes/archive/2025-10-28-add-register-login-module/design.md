## Auth Flows Overview
- Both `/register` and `/login` share a consistent layout with the OnReal branding at the top, theme toggle, and space for auxiliary links (privacy, terms, support).
- Forms display within a centered card (max-width ~420px) with subtle background gradient aligned to Web3 aesthetic.

## UI & Validation Details
### Common Patterns
- Required inputs show asterisk in labels and display error text beneath the field when validation fails.
- Submit button enters disabled/loading state during async operations.
- Links between flows (`/login` ↔ `/register`) remain visible at the footer of each card.

### Register Flow
- Inputs: full name (optional), email (required, must match email regex), password (required, min 8 chars with letters + numbers), confirm password (must match password).
- Client validation prevents submission until requirements met. Server errors (duplicate email or weak password) show inline alert above the form.
- After calling `POST /api/auth/register`, automatically signs the user in and redirect to `callbackUrl` or `/dashboard`.

### Login Flow
- Inputs: email + password, both required.
- Client validation ensures email format, non-empty password. Server errors show inline alert with generic message.
- Successful login triggers NextAuth `signIn` with `redirect: false`, then client-side redirect to `callbackUrl` or `/dashboard`.

## Redirect Behaviour
- Both forms read `searchParams.callbackUrl` to support linking from protected routes.
- Fallback redirect is `/dashboard`.

## Error Handling
- Inline `Alert` component for error states, with descriptive text but no sensitive detail.
- Validation errors highlighted via Tailwind classes (`border-red-500`, etc.).

## Loading States
- Buttons swap label to "Creating account…" / "Signing in…" when pending.
- Disable form inputs during pending state.
