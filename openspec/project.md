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
[Document your architectural decisions and patterns]

### Testing Strategy
[Explain your testing approach and requirements]

### Git Workflow
[Describe your branching strategy and commit conventions]

## Domain Context
[Add domain-specific knowledge that AI assistants need to understand]

## Important Constraints
[List any technical, business, or regulatory constraints]

## External Dependencies
[Document key external services, APIs, or systems]
