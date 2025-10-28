# dashboard Specification

## Purpose
TBD - created by archiving change add-dashboard. Update Purpose after archive.
## Requirements
### Requirement: Dashboard Access Control
The application MUST protect the `/dashboard` route behind authentication and preserve callback information for re-authentication flows.

#### Scenario: Authenticated visitor views dashboard
- **GIVEN** a signed-in user navigates to `/dashboard`
- **WHEN** the request is resolved
- **THEN** the dashboard content renders without exposing a login prompt
- **AND** the user remains within the authenticated App Router layout

#### Scenario: Unauthenticated visitor is redirected
- **GIVEN** a visitor without a valid session requests `/dashboard`
- **WHEN** the server processes the request
- **THEN** the response redirects to `/login?callbackUrl=/dashboard`
- **AND** no dashboard modules render client-side

### Requirement: Layout, Navigation, and Login Status
The dashboard MUST use a sidebar navigation layout and surface login status controls in the header.

#### Scenario: Sidebar and header render core navigation and session state
- **GIVEN** a signed-in user views `/dashboard`
- **WHEN** the layout loads
- **THEN** a persistent sidebar lists the navigation entries `Overview`, `Usage`, `Subscription`, and `Settings`
- **AND** the top-right header area displays the user name or email alongside a visible login status indicator
- **AND** opening the status menu reveals a `Logout` action when the user is authenticated

### Requirement: KYB/KYC Onboarding Guidance
The dashboard MUST highlight incomplete KYB/KYC verification steps for authenticated users.

#### Scenario: Incomplete KYB/KYC surfaces onboarding prompt
- **GIVEN** a user has authenticated but their KYB or KYC status is incomplete
- **WHEN** `/dashboard` renders
- **THEN** a prominent onboarding prompt explains the missing verification and links to the KYB/KYC completion flow
- **AND** once verification is complete, the prompt no longer appears on subsequent loads

### Requirement: Notification System
The dashboard MUST communicate account status through prioritized notifications and alerts.

#### Scenario: Expiring subscription shows persistent banner
- **GIVEN** a user’s subscription expires in less than 7 days
- **WHEN** the Overview tab loads
- **THEN** a persistent alert banner appears at the top of the page with an “Expiring Soon” message and a link to manage the subscription

#### Scenario: Unverified account shows KYB/KYC prompt
- **GIVEN** a signed-in user has not completed KYB/KYC verification
- **WHEN** the Overview tab renders
- **THEN** a notification card labelled “Unverified Account” appears guiding the user to start verification
- **AND** if both “Expiring Soon” and “Unverified Account” are triggered while the user is on the Free plan, the “Expiring Soon” banner is displayed first followed by the “Unverified Account” prompt

#### Scenario: Verification under review shows status message
- **GIVEN** the user has submitted KYB/KYC information and the review is pending
- **WHEN** the Overview tab renders
- **THEN** a notification card displays “Verification in Progress” with messaging that informs the user the review is underway

### Requirement: Overview Modules
The dashboard Overview page MUST display Dapp information, subscription status, and usage metrics.

#### Scenario: Dapp list presents key RWA apps
- **GIVEN** the user has created RWA Dapps
- **WHEN** the Overview tab renders
- **THEN** a "Your Dapp List" section lists each Dapp name, creation date, and associated blockchain
- **AND** the section shows an empty state encouraging creation if no Dapps exist

#### Scenario: Subscription module shows plan details
- **GIVEN** subscription data is available
- **WHEN** the Overview tab loads
- **THEN** a subscription card displays the current plan name and expiration or renewal date
- **AND** the card links to the Subscription page for managing plans

#### Scenario: Usage module surfaces traffic metrics
- **GIVEN** usage metrics are recorded
- **WHEN** the Overview tab loads
- **THEN** a usage card shows request count and request rate statistics for a recent interval (e.g., last 24 hours)
- **AND** the card links to the Usage page for deeper analytics

