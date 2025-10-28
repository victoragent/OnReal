# auth Specification

## Purpose
TBD - created by archiving change add-register-login-module. Update Purpose after archive.
## Requirements
### Requirement: Authentication Entry Pages
The application MUST expose cohesive `/login` and `/register` routes that reflect OnReal's design language and provide clear navigation between flows.

#### Scenario: Login page renders with required elements
- **GIVEN** a visitor navigates to `/login`
- **WHEN** the page renders
- **THEN** the layout presents a centered card containing the OnReal wordmark or product title, a concise welcome message, and email + password inputs
- **AND** each input is labelled, supports browser autofill, and indicates invalid state when client-side validation fails
- **AND** the form includes a primary submit button, a secondary link to `/register`, and a "Forgot password" link for recovery

#### Scenario: Register page renders with required elements
- **GIVEN** a visitor navigates to `/register`
- **WHEN** the page renders
- **THEN** the layout presents the same auth card shell, a headline explaining account creation, and inputs for full name (optional), email, password, and confirm password
- **AND** inputs are labelled, support autofill where appropriate, and display inline validation for mismatched passwords or missing fields
- **AND** the form includes a primary submit button plus a secondary link back to `/login`

### Requirement: Login Credential Submission Flow
The login form MUST authenticate via NextAuth credentials provider and provide clear feedback for loading and success.

#### Scenario: Successful credential submission redirects to dashboard
- **GIVEN** a visitor completes the email and password inputs with valid values
- **WHEN** they submit the form
- **THEN** the submit button enters a loading state until the request resolves
- **AND** upon success, `signIn` redirects the user to `/dashboard` (or the `callbackUrl` if provided)
- **AND** the session cookie reflects the authenticated user context per NextAuth configuration

### Requirement: Registration Flow
The register form MUST create a user record and authenticate the session in a single path when registration succeeds.

#### Scenario: Successful registration creates account and logs in
- **GIVEN** a visitor provides valid registration details
- **WHEN** they submit the form
- **THEN** the submit button enters a loading state while the app calls a registration API
- **AND** upon success, the system creates the user, signs them in via NextAuth, and redirects to `/dashboard` (or the pending `callbackUrl`)
- **AND** the new account exists in the persistence layer configured for authentication

### Requirement: Error Handling and Recovery Prompts
The auth experience MUST communicate failures for login and registration while keeping users in context to recover.

#### Scenario: Auth failures surface inline messaging and recovery options
- **GIVEN** either the credentials provider rejects login details OR the registration API returns an error
- **WHEN** the response returns
- **THEN** an inline error message appears above the form describing the issue without revealing sensitive details
- **AND** the submit button returns to its idle state so the user can try again
- **AND** the page keeps previously entered inputs (excluding password confirmation on registration), keeps navigation links between login/register, and presents "Forgot password" for login users lacking access

