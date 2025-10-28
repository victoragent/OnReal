# Project Context

Project name: **OnReal**

## Purpose

OnReal is a developer-focused RWA SaaS platform that provides APIs, SDKs, and modular infrastructure to help teams rapidly build and launch real-world asset (RWA) applications. It abstracts complex blockchain, compliance, and asset management workflows so developers can focus on product innovation instead of infrastructure.

With support for EVM-compatible chains and Solana, OnReal offers essential building blocks for asset tokenization, investor onboarding, custody integration, real-world data verification, and full asset lifecycle management. OnReal reduces time-to-market for RWA products from months to days, making it simple to build custom asset-backed applications such as IP licensing, commodity tokens, structured credit, real estate tokenization, and invoice financing.

Our mission is clear: make building RWA products as easy as building web apps.

## Tech Stack

### Architecture Overview

OnReal is built as a lightweight, fullstack TypeScript monorepo optimized for fast iteration. It uses Next.js for both frontend apps and backend APIs, deployed completely on Vercel with serverless functions.

### Frontend(Landing + Dashboard + Admin)

| Technology       | Choice                   |
| ---------------- | ------------------------ |
| Framework        | Next.js 14 (App Router)  |
| Language         | TypeScript               |
| UI System        | shadcn/ui + Tailwind CSS |
| State Management | Zustand                  |
| Forms            | React Hook Form + Zod    |
| Routing          | Next.js App Router       |
| Styling          | Tailwind CSS             |
| Monorepo Tool    | Turborepo                |

### Backend(API Layer inside Next.js)

| Technology     | Choice                                          |
| -------------- | ----------------------------------------------- |
| API Style      | REST (Next.js API Routes)                       |
| Language       | TypeScript                                      |
| Framework      | Built-in Next.js API                            |
| Validation     | Zod                                             |
| ORM            | Prisma                                          |
| Database       | PostgreSQL (Neon or Supabase)                   |
| Authentication | NextAuth.js + JWT + optional Wallet Auth (SIWE) |
| File Storage   | Vercel Blob (later S3 optional)                 |
| Deployment     | Vercel Functions                                |

### Blockchain Integration

| Layer                | Tech                                  |
| -------------------- | ------------------------------------- |
| EVM Chains Support   | viem + ethers.js                      |
| Solana Support       | @solana/web3.js                       |
| Contract Development | Hardhat (basic setup)                 |
| Supported Standards  | ERC-20, ERC-721, ERC-1155, Solana SPL |
| Wallets              | MetaMask, WalletConnect, Phantom      |


### Email & Billing

| Feature             | Tech                              |
| ------------------- | --------------------------------- |
| Transactional Email | Resend                            |
| Crypto Billing      | Coinbase Commerce or Thirdweb Pay |
| Subscription        | Custom usage tracking             |

### DevOps & Development

| Feature            | Tech                             |
| ------------------ | -------------------------------- |
| Hosting            | Entirely on Vercel               |
| Repo               | Monorepo with Turborepo          |
| Build System       | pnpm                             |
| Environment Config | Dotenv + Vercel env              |
| Logging            | Vercel Analytics + basic logging |

## Project Conventions

### Code Style

1. Refer: [`cursorrules`](../.cursorrules)
2. Always give an id to html tag
3. Always keep same UI style
4. Use stable dependecies first

### Architecture Patterns

OnReal uses a simple modular architecture designed for speed, maintainability, and future scalability.
Each feature (e.g., Auth, Asset, Billing, Blockchain) is self-contained and can evolve into a standalone service later.

The entire platform runs on Next.js (TypeScript) — combining the frontend and backend API layer in a single fullstack app, deployed on Vercel.

#### Core Design Principles

| Principle                    | Description                                                                        |
| ---------------------------- | ---------------------------------------------------------------------------------- |
| **Feature-based modularity** | Each module contains its own routes, services, types, and UI components.           |
| **Simplicity first**         | Avoid unnecessary frameworks or abstractions; prefer plain TypeScript and Next.js. |
| **Composable UI**            | Shared components live in `/components/shared`.                                    |
| **Isolation by domain**      | Business logic for each area (auth, asset, billing) lives in its own folder.       |
| **Stateless backend**        | All APIs are stateless; no background queues or Redis dependencies.                |
| **Multi-chain ready**        | Blockchain adapter supports both EVM and Solana through independent services.      |
| **Deployable anywhere**      | Fully serverless and runs entirely on Vercel Functions.                            |


#### Folder / Module Structure

```
/src
  /app
    /landing           → public marketing pages
    /dashboard         → open platform for users
    /admin             → admin control panel
    /api               → REST API endpoints (Next.js API routes)
  /modules
    /auth              → login, JWT, NextAuth
    /user              → profile, account settings
    /organization      → tenant management
    /asset             → RWA asset logic
    /billing           → crypto payments
    /blockchain        → EVM & Solana adapters
  /components
    /shared            → shared UI components (buttons, inputs, modals)
  /lib                 → common utilities (db, config, helpers)
  /types               → global TypeScript definitions
  /config              → env, constants, system config

```

#### API Architecture

* API is built using Next.js API routes
* Each route maps to a feature service:

```
/api/auth/login → modules/auth/service.ts
/api/asset/create → modules/asset/service.ts
```

* Services handle:
    * Input validation (Zod)
    * Business logic
    * Database interaction (Prisma)
    * Optional blockchain calls (ethers.js / solana/web3.js)


#### Frontend Architecture

* Next.js App Router used for all apps (Landing, Dashboard, Admin)
* Server Components used where possible for data fetching
* Client Components handle forms, interactivity, and wallet connections
* Shared UI pattern enforced via shadcn/ui
* Global layout components define header, sidebar, theme

#### Data Layer

* Database via Prisma + PostgreSQL
* Feature modules have local models:

```
/modules/asset/model.prisma
/modules/user/model.prisma
```

Migration handled by npx prisma migrate deploy


#### Summary

* 🧩 Modular: Feature-first structure
* ⚡ Lightweight: No Redis or background workers
* ☁️ Serverless: 100% deployable on Vercel
* 🔗 Cross-chain: EVM + Solana support
* 🧱 Extensible: Easy to grow into multi-service SaaS

### Testing Strategy

* Keep tests fast, meaningful, and local
* Prioritize service-level and API integration tests
* Use real database connections in staging, mocks in unit tests
* No Docker / Redis / queue setup required

#### Test Types & Layers

| Type                     | Purpose                                | Framework        | Description                                   |
| ------------------------ | -------------------------------------- | ---------------- | --------------------------------------------- |
| **Unit Tests**           | Validate core logic and utilities      | Jest + ts-jest   | Test individual functions and service methods |
| **Integration Tests**    | Test API routes and Prisma DB together | Supertest + Jest | Run on Vercel preview or local env            |
| **E2E (optional)**       | Simulate dashboard actions             | Playwright       | Used later for UI automation                  |
| **Smart Contract Tests** | For blockchain modules                 | Hardhat + Chai   | Validate RWA minting and verification         |

#### Test Tools

| Layer            | Tool                                  |
| ---------------- | ------------------------------------- |
| Framework        | Jest                                  |
| Test Runner      | ts-jest                               |
| API Test         | Supertest                             |
| Mocking          | msw (for HTTP)                        |
| UI Test | Playwright                            |
| Contract Test    | Hardhat test suite                    |
| CI Integration   | GitHub Actions + Vercel Preview Tests |

#### Coverage Expectations

| Area                                 | Coverage Target         |
| ------------------------------------ | ----------------------- |
| Core services (auth, billing, asset) | 70–80% ✅                |
| Utility and helpers                  | Optional                |
| UI (React components)                | Snapshot testing only   |
| Blockchain adapters                  | Integration-tested only |
| Admin & dashboard pages              | Manual test OK for MVP  |

🚀 Rule: 100% coverage is not required — only the core logic must be confidently tested.


#### Folder Structure example for Tests

```
/src
  /modules
    /asset
      service.ts
      service.test.ts
    /auth
      service.ts
      service.test.ts
  /lib
    /utils
      formatDate.ts
      formatDate.test.ts
/tests
  /integration
    api-asset.test.ts
    api-auth.test.ts
  /contracts
    evm.test.ts
    solana.test.ts
```


#### Database Testing Rules

* Use SQLite in-memory for local Jest tests
* Use PostgreSQL staging instance for integration
* Before each test run:

```
    npx prisma migrate reset --force
```

Never run destructive tests against production

#### Mocking & Isolation

* Mock external services (Resend, Coinbase Commerce)
* Do not mock Prisma for integration tests — use local DB
* For blockchain:
    * Mock chain responses for unit tests
    * Run full Hardhat testnet for contract verification

#### CI/CD Integration

* GitHub Actions runs all tests on pull request
* CI fails on:
    * Lint error
    * Type error
    * Test failure
* Optional Vercel Preview deploys after tests pass

### Git Workflow

#### Version Control Model

OnReal uses GitHub Flow, optimized for a SaaS product with continuous deployment to Vercel.

| Environment               | Branch      | Description                                            |
| ------------------------- | ----------- | ------------------------------------------------------ |
| **Production**            | `main`      | Stable code automatically deployed to production       |
| **Development / Preview** | `feature/*` | Active development branches deployed as Vercel Preview |
| **Hotfixes**              | `hotfix/*`  | Urgent patches merged directly into `main`             |

🧠 Rule: No direct commits to main — all changes must go through Pull Requests (PRs).

#### Branching Strategy

Each branch should clearly describe its purpose:

```
feature/add-auth-module
feature/update-dashboard-ui
fix/asset-api-response
hotfix/admin-login-bug
chore/update-dependencies
```

**Prefix types**:

* feature/ — new features
* fix/ — bug fixes
* hotfix/ — production fixes
* chore/ — tooling or config updates
* docs/ — documentation changes
* refactor/ — internal improvements

#### Commit Convention

Use Conventional Commits for consistency and semantic versioning compatibility.

| Type        | Meaning                            |
| ----------- | ---------------------------------- |
| `feat:`     | a new feature                      |
| `fix:`      | a bug fix                          |
| `chore:`    | maintenance or tooling             |
| `refactor:` | code refactor (no behavior change) |
| `docs:`     | documentation updates              |
| `test:`     | add or modify tests                |
| `style:`    | UI or formatting updates           |

Examples:

```
feat(auth): add wallet login support
fix(billing): correct crypto payment validation
refactor(asset): simplify asset schema typing
chore: update dependencies and clean scripts
```

✅ Every commit message should describe what changed and why in one line.

#### Pull Request (PR) Rules

* Always create a PR before merging to main
* Use squash merge to keep commit history clean
* PR title follows Conventional Commit style
* Every PR must include:
    1. Description of change
    2. Screenshots (if UI)
    3. Checklist of tested features

* Minimum 1 code review approval required before merge


#### Vrsioning

* Follow Semantic Versioning (SemVer):
MAJOR.MINOR.PATCH
    * MAJOR: breaking changes
    * MINOR: new features
    * PATCH: fixes, small improvements

Releases tagged automatically:

```
v1.0.0
v1.1.0
v1.1.1
```

#### Pre-Commit Hooks

* Managed via Husky + lint-staged
* Runs automatically on git commit
    * Lint check (eslint .)
    * Type check (tsc --noEmit)
    * Format (prettier --check .)
    * Test subset if changed (jest --bail --findRelatedTests)

❗No commit should bypass Husky validation.


#### CI/CD Integration

* GitHub Actions handles:
    * Lint + type check + unit tests
    * Deploy preview to Vercel on each PR

* Vercel Deploy Hooks:
    * Merge to main → auto deploy to production
    * PR creation → auto deploy preview

* Deployment naming pattern:
onreal-preview-{branch}


#### Release Workflow

1. Merge all tested features to main
2. Run version bump:

```
npm run release
```

3. Tag commit (auto via semantic-release)
4. CI builds and deploys production

#### Rollback Plan

* If deployment fails:
    * Use Vercel’s “Revert to Previous Deployment”
    * Fix issue in branch hotfix/...
    * Merge hotfix → re-deploy automatically

## Domain Context

### 1. Overview

OnReal is a developer-focused RWA SaaS infrastructure platform — it does not directly issue assets or operate as an issuer.
Instead, it provides the APIs, SDKs, and modular services that allow businesses, projects, or developers to build and operate their own RWA issuance systems on top of OnReal’s infrastructure.

The platform abstracts all complex parts of the RWA lifecycle:

* Blockchain interaction (EVM + Solana)
* Compliance (KYC/KYB integration hooks)
* Billing and tenant management
* Proof and oracle binding
* Asset metadata storage and audit tracking

Developers integrate these through the OnReal SDK or REST API, embedding issuance, compliance, and management features into their own products.


### 2. Core Domain Entities

| Entity                    | Description                                                                                                                                             |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Organization (Tenant)** | A client project or company using OnReal SDKs/APIs to power their RWA business. Each tenant is isolated with its own users, API keys, and billing.      |
| **User**                  | Developer or operator within an organization. Uses dashboard + API keys.                                                                                |
| **Asset Template**        | Configuration describing how a client’s product handles asset metadata, issuance workflow, and token mapping.                                           |
| **SDK / API Client**      | The main interface developers use to connect their applications to OnReal. It handles auth, asset registration, compliance hooks, and blockchain calls. |
| **Tokenization Record**   | Tracks assets that clients issue through OnReal’s SDKs. OnReal stores metadata, chain info, and proof hashes — but does not hold or sell tokens.        |
| **Compliance Hook**       | A webhook endpoint or API route that integrates external KYC/KYB providers. OnReal supports flexible plug-ins.                                          |
| **Billing Record**        | Logs API usage, subscription tiers, and crypto payments.                                                                                                |
| **Admin**                 | OnReal internal role to monitor tenants, API usage, and audit logs.                                                                                     |
                                                                 |

### 3. Domain Relationships

```
Organization (Tenant)
 ├── has many → Users
 ├── owns → API Keys
 ├── configures → Asset Templates
 ├── issues via SDK → Tokenization Records
 ├── integrates → Compliance Hooks (external)
 └── generates → Billing Records

```

* OnReal does not mint tokens directly — it provides SDK calls for clients to mint through their own smart contracts or OnReal’s managed contract templates.
* Each tenant has complete control over their issuance logic and smart contract ownership.


### Core Domain Modules

| Module                  | Purpose                                                                        |
| ----------------------- | ------------------------------------------------------------------------------ |
| **Auth Module**         | API key + JWT authentication, tenant scoping, wallet login (optional).         |
| **Organization Module** | Tenant identity, subscription plan, member roles.                              |
| **SDK & API Module**    | Developer interface for asset registration, token minting, proof linking, etc. |
| **Blockchain Module**   | Unified adapter for EVM + Solana — used by SDK calls.                          |
| **Compliance Module**   | Extensible KYB/KYC hook system.                                                |
| **Billing Module**      | Tracks SDK/API usage and crypto payments.                                      |
| **Admin Module**        | Internal view for client management, analytics, and audit logs.                |


### Domain Boundaries

| Boundary                    | Description                                                                                                                       |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| **Responsibility Boundary** | OnReal provides the SDK/API infrastructure and storage — *not* the legal issuance or financial service itself.                    |
| **Ownership Boundary**      | Tokens, smart contracts, and capital flow belong to OnReal’s **clients**, not OnReal.                                             |
| **Compliance Boundary**     | Each tenant integrates their own KYC/KYB provider via hooks; OnReal offers the framework but not the verification service itself. |


### Developer Ecosystem

* **Landing Page** → Explains pricing, SDK usage, and documentation.
* **Open Platform Dashboard** → Manage API keys, KYB settings, and usage metrics.
* **Admin Panel** → Internal tenant management, analytics, and incident tracking.

### Domain Philosophy

| Principle                                 | Meaning                                                                           |
| ----------------------------------------- | --------------------------------------------------------------------------------- |
| **“We build the rails, not the trains.”** | OnReal empowers others to issue and manage RWAs — it doesn’t issue assets itself. |
| **Developer-first design**                | Everything accessible via SDK or REST API.                                        |
| **Chain-neutral abstraction**             | EVM and Solana supported via unified interface.                                   |
| **Compliance-extensible**                 | Plug-in system for external verification providers.                               |
| **Transparent usage**                     | All actions logged, auditable, and tenant-isolated.                               |


## Important Constraints
[List any technical, business, or regulatory constraints]

### Business & Legal Constraints

| Category                   | Constraint                                                                                            | Description                                                                                                                                                   |
| -------------------------- | ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Issuer Role**            | ❌ OnReal does **not** directly issue or distribute tokenized assets.                                  | Clients are the legal issuers. OnReal provides infrastructure and SDKs.                                                                                       |
| **Custody Model**          | ✅ **Custody Buddy Integration (Optional)**                                                            | OnReal can connect clients to **external regulated custodians** (e.g., Fireblocks, Circle, Copper, Cobo, Anchorage) via APIs, but never holds custody itself. |
| **Custody Responsibility** | ⚠️ All custody agreements are **between the client and the custodian**.                               | OnReal only facilitates API connection and orchestration.                                                                                                     |
| **Compliance Role**        | ✅ Tenants integrate their own KYC/KYB processes.                                                      | OnReal provides compliance hook interfaces, not KYC services.                                                                                                 |
| **Regulatory Position**    | ⚖️ OnReal is a **software infrastructure provider**, not a broker-dealer, exchange, or asset manager. | Custody and issuance responsibilities remain external.                                                                                                        |
| **Jurisdiction**           | 🌐 Global SaaS platform; not region-limited.                                                          | OnReal does not provide region-specific licensing or custody registration.                                                                                    |


### Custody Integration Model

Architecture:

```
Client App → OnReal SDK → Custody Adapter → External Custodian API
```

TODO: details later

### Compliance & Legal Responsibility

| Responsibility           | Owner                        |
| ------------------------ | ---------------------------- |
| KYC/KYB                  | Tenant or 3rd-party provider |
| Asset Valuation          | Tenant                       |
| Custody Agreement        | Tenant ↔ Custody Partner     |
| Tokenization Legal Setup | Tenant                       |
| API Layer Security       | OnReal                       |
| Data Storage             | OnReal (metadata only)       |


```
                 ┌────────────────────────────┐
                 │   OnReal Infrastructure    │
                 │  (SDKs, APIs, Dashboard)   │
                 ├──────────────┬─────────────┤
                 │ Blockchain   │ Custody API │
                 │ Adapters     │ Integration │
                 └──────┬───────┴──────┬──────┘
                        │              │
           EVM / Solana │     Custody Buddy APIs
                        ▼              ▼
              Smart Contracts     Fireblocks / Copper / Cobo

```


## External Dependencies
[Document key external services, APIs, or systems]

### Infrastructure & Deployment

| Category                   | Provider                          | Purpose                                                         |
| -------------------------- | --------------------------------- | --------------------------------------------------------------- |
| **Hosting**                | **Vercel**                        | Deploys fullstack Next.js app (Landing, Dashboard, Admin, APIs) |
| **Database**               | **Neon.tech** or **Supabase**     | PostgreSQL database for tenant data, assets, billing records    |
| **File Storage**           | **Vercel Blob / AWS S3**          | Stores lightweight metadata files and proof documents           |
| **Email**                  | **Resend**                        | Sends verification, system, and notification emails             |
| **Monitoring**             | **Vercel Analytics + Sentry**     | Error tracking and performance analytics                        |
| **Environment Management** | **Vercel Env / Doppler**          | Manages encrypted API keys and environment variables            |
| **CI/CD**                  | **GitHub Actions + Vercel Hooks** | Runs lint/tests + deploys previews automatically                |


### Blockchain & Web3 Integration

| Category               | Library / Provider                                     | Description                                                    |
| ---------------------- | ------------------------------------------------------ | -------------------------------------------------------------- |
| **EVM SDKs**           | `ethers.js`, `viem`                                    | Blockchain calls, transaction signing, and contract deployment |
| **Solana SDK**         | `@solana/web3.js`, `@project-serum/anchor`             | Token minting and account management on Solana                 |
| **Contract Framework** | **Hardhat**                                            | Smart contract testing and deployment tool                     |
| **Standards**          | **ERC-20, ERC-721, ERC-1155, SPL**                     | Supported token standards for client-issued RWAs               |
| **RPC Providers**      | **Alchemy / Infura / QuickNode / Helius (for Solana)** | On-chain data access and transaction relay                     |
| **Oracle (Future)**    | **Chainlink / Pyth Network**                           | Optional integration for proof-of-asset and pricing data       |

### Custody Integration (“Custody Buddy”)

| Category                        | Provider                               | Integration Type                                          |
| ------------------------------- | -------------------------------------- | --------------------------------------------------------- |
| **Institutional Custody**       | Fireblocks / Copper / Anchorage / Cobo | API-based custody for client-issued tokens                |
| **Smart Contract Custody**      | Gnosis Safe / Safeheron                | On-chain custody via multi-sig contracts                  |
| **Custody Aggregator (Future)** | CustodyHub / Circle Custody API        | Unified multi-provider custody adapter                    |
| **Custody Module**              | `/modules/custody`                     | Abstracted adapter layer in OnReal SDK to manage partners |


🔐 Custody APIs use encrypted API tokens, and all operations are proxied through OnReal’s secure middleware — no private key storage.

### Compliance & Identity

| Category                 | Provider                              | Purpose                                                        |
| ------------------------ | ------------------------------------- | -------------------------------------------------------------- |
| **KYB/KYC Verification** | SumSub / Persona / Synaps             | External provider integration through webhooks or API adapters |
| **Compliance Hooks**     | Custom API URLs configured per tenant | Tenants can integrate their own verification providers         |
| **Document Proof**       | Filecoin / IPFS (optional)            | For asset documentation or proof storage                       |
| **Hash Validation**      | SHA-256 / Keccak256 libraries         | Verify proof-of-document and oracle responses                  |


### Billing & Payments

| Category                  | Provider                             | Description                                            |
| ------------------------- | ------------------------------------ | ------------------------------------------------------ |
| **Crypto Payments**       | **Coinbase Commerce / Thirdweb Pay** | Accept USDT/USDC crypto payments for subscriptions     |
| **Stablecoin Settlement** | **Circle USDC API (future)**         | Optional off-ramp / fiat bridge for enterprise clients |
| **Billing Engine**        | `/modules/billing`                   | Tracks API usage and payment status                    |
| **Subscription Metadata** | PostgreSQL                           | Records active plan and billing cycle per tenant       |

### SDK & Developer Tooling

| Category                    | Package              | Description                                                |
| --------------------------- | -------------------- | ---------------------------------------------------------- |
| **Official SDK**            | `@onreal/sdk` (npm)  | TypeScript SDK used by developers to integrate OnReal APIs |
| **API Validation**          | Zod                  | Input validation for SDK and backend APIs                  |
| **Documentation Generator** | OpenAPI + Swagger UI | Auto-generates REST API docs                               |
| **Versioning**              | Semantic-release     | Automates version tagging and changelog updates            |

### Security & Logging

| Category                 | Tool                          | Purpose                                            |
| ------------------------ | ----------------------------- | -------------------------------------------------- |
| **Encryption**           | Node crypto (AES-256)         | Encrypt sensitive data (custody API keys, secrets) |
| **Hashing**              | bcrypt                        | Password & secret hashing                          |
| **Logging**              | Winston / Pino                | Application-level logs                             |
| **Audit Logs**           | PostgreSQL + Append-only logs | Immutable history of tenant activity               |
| **Monitoring Dashboard** | Vercel + Sentry               | Centralized error and performance tracking         |


### Optional Integrations (Planned)

| Area                      | Partner                         | Description                                        |
| ------------------------- | ------------------------------- | -------------------------------------------------- |
| **DeFi Liquidity**        | Uniswap v4 / Jupiter Aggregator | Optional liquidity access for client-issued tokens |
| **Custody Indexing**      | Fireblocks Network              | View portfolio and transaction history             |
| **Cross-Chain Messaging** | Wormhole / LayerZero            | Future interoperability across EVM ↔ Solana        |
| **Oracle Expansion**      | Chainlink Proof-of-Reserve      | Verifiable off-chain collateral auditing           |
| **Analytics**             | Dune API / Flipside             | On-chain analytics for RWA performance dashboards  |