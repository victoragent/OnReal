1. [x] Document dashboard layout, sidebar navigation, and header login-status behaviour (including Logout interaction).
2. [x] Implement `/dashboard` shell with sidebar navigation (`Overview`, `Usage`, `Subscription`, `Settings`) and top-right user status dropdown.
3. [x] Add KYB/KYC onboarding prompt that appears when verification is incomplete, shows “verification in progress” messaging while under review, and hides after completion.
4. [x] Build Overview modules: prioritized notifications (Expiring Soon banner, Unverified, Verification in Progress), Dapp list (with empty state), subscription card, and usage metrics card linking to respective pages.
5. [x] Enforce server-side auth guard redirecting unauthenticated users to `/login?callbackUrl=/dashboard`.
6. [x] Add integration or component tests covering auth redirect, logout action, KYB prompt, and Overview module rendering.
7. [x] Run `openspec validate add-dashboard --strict` and resolve any reported issues.
