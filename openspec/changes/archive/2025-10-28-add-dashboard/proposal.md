## Why
Authenticated builders need a central dashboard to orient themselves after registration or login. Today `/dashboard` is undefined, leaving users at a dead end once they authenticate.

## What Changes
- Establish a `/dashboard` app route available to authenticated sessions with a sidebar layout (`Overview`, `Usage`, `Subscription`, `Settings`) and a header login-status menu that exposes a Logout action.
- Deliver onboarding guidance via notification cards and KYB/KYC prompts so partially verified tenants know how to complete compliance setup.
- Build an Overview page featuring notification cards, a Dapp list (name, creation date, chain), subscription card (plan + expiry), and usage metrics (request count/rate), with deep links into the relevant modules.
- Ensure unauthenticated visitors to `/dashboard` are redirected to `/login` while preserving callback URLs.

## Impact
- New accounts land on an actionable workspace immediately after sign-in, with clear compliance prompts that shorten time-to-approval.
- Core metrics (usage, subscription, Dapp health) and next steps stay visible so product and compliance teams track adoption.
- Creates a foundation for future dashboard widgets by standardizing the layout, navigation, and alert patterns.
