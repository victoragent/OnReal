## Dashboard Experience Outline

### Layout & Navigation
- `/dashboard` uses a two-column layout: a fixed-width sidebar navigation and a scrollable content pane.
- Sidebar entries (Overview, Usage, Subscription, Settings) highlight based on the active route segment and provide keyboard-accessible navigation.
- The top-right header area surfaces the current user’s name/email with an avatar glyph. Clicking reveals a dropdown containing login status, `Logout`, and quick access to account settings.

### Authentication Guard
- Server component for `/dashboard` checks `getServerSession` (NextAuth). If absent, it issues a redirect to `/login?callbackUrl=/dashboard`.
- Client-side rendering assumes an authenticated session; logout triggers `signOut({ callbackUrl: "/" })` and collapses the dropdown.

### Notification Priority
1. **Expiring Soon banner** — persistent across sessions while remaining days < 7.
2. **Unverified Account card** — shown when KYB/KYC status is `unverified`.
3. **Verification in Progress card** — shown when KYB/KYC status is `pending`.
- Notifications render in this order at the top of the Overview page. Banner spans full width; cards stack beneath.

### KYB/KYC Prompt
- When status is `unverified`, show an actionable card with CTA “Complete Verification”.
- When `pending`, show informative state with link to review status; no CTA to resubmit.

### Overview Modules
- **Your Dapp List**: table/list view with name, creation date, blockchain logo. Empty state with CTA “Create your first Dapp”.
- **Subscription Card**: displays plan, renewal date, management CTA.
- **Usage Card**: shows request count and rate derived from mock data (stub for now).

### Data Sources (MVP)
- Introduce simple mock services (`lib/dashboard/data.ts`) returning deterministic payloads (KYB status, subscription info, usage stats, dapp list) until real APIs arrive.
- Notifications derive their state from these mocks.

### Testing Strategy
- Component tests with React Testing Library for:
  - Auth guard redirect (server util test via `GET /dashboard` with/without session).
  - Notification ordering based on mock statuses.
  - Logout button calling `signOut`.
- Snapshot/DOM tests to ensure modules render expected content for provided fixtures.
