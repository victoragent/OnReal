"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

const featureHighlights = [
  {
    id: "feature-modular",
    title: "Composable API Mesh",
    description: "Launch bespoke RWA workflows with modular building blocks that snap into your stack without refactoring.",
    accent: "Build"
  },
  {
    id: "feature-compliance",
    title: "Compliance Orchestrated",
    description: "Automate KYB, custody routing, and proof-of-asset validation while keeping auditors satisfied by default.",
    accent: "Trust"
  },
  {
    id: "feature-automation",
    title: "Lifecycle Automation",
    description: "Monitor issuance, settlements, and investor updates in real time with programmable policy engines.",
    accent: "Automate"
  }
];

const resourceLinks = [
  {
    id: "resource-docs",
    title: "Developer Docs",
    description: "Deep dive into our SDK, API references, and quickstart guides for Solana and EVM chains.",
    href: "https://onreal.example.com/docs"
  },
  {
    id: "resource-demo",
    title: "Request a Demo",
    description: "Partner with our solution engineers to design compliant tokenization and onboarding flows.",
    href: "https://onreal.example.com/contact"
  }
];

export function LandingPage() {
  const heroSubheading =
    "Compose compliance, custody, and liquidity so you can launch RWA products in weeks instead of quarters.";

  return (
    <div
      id="landing-page"
      className="min-h-screen bg-gradient-to-b from-white via-zinc-50 to-white text-zinc-900 transition-colors dark:from-[#05050b] dark:via-[#080818] dark:to-[#0b0b1f] dark:text-white"
    >
      <div className="section-shell flex items-center justify-between py-10">
        <div id="logo-stack" className="flex flex-col gap-1">
          <span className="text-xs font-medium uppercase tracking-[0.28em] text-brand">OnReal</span>
          <span className="text-lg font-semibold">Operating System for Real World Assets</span>
        </div>
        <div className="flex items-center gap-3">
          <Link
            id="header-login"
            href="/login"
            className="hidden rounded-full border border-zinc-200 px-5 py-2 text-sm font-medium text-zinc-900 transition-colors hover:border-brand hover:text-brand dark:border-white/20 dark:text-white sm:inline-flex"
          >
            Sign in
          </Link>
          <Link
            id="header-register"
            href="/register"
            className="hidden items-center justify-center rounded-full bg-brand px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-accent sm:inline-flex"
          >
            Create account
          </Link>
          <ThemeToggle />
        </div>
      </div>

      <main id="landing-main" className="flex flex-col gap-20 pb-20">
        <section id="hero-section" className="section-shell flex flex-col gap-6">
          <div className="inline-flex w-fit items-center rounded-full bg-brand/10 px-4 py-1 text-xs uppercase tracking-[0.32em] text-brand">
            Built for builders
          </div>
          <h1 id="hero-heading" className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Operating System for Real World Assets
          </h1>
          <p id="hero-subheading" className="max-w-2xl text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
            {heroSubheading}
          </p>
          <div id="hero-cta-group" className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              id="cta-register"
              href="/register"
              className="inline-flex items-center justify-center rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-accent"
            >
              Create account
            </Link>
            <Link
              id="cta-view-docs"
              href="https://onreal.example.com/docs"
              className="inline-flex items-center justify-center rounded-full border border-zinc-200 px-6 py-3 text-sm font-semibold text-zinc-900 transition-colors hover:border-brand hover:text-brand dark:border-white/20 dark:text-white"
            >
              View Documentation
            </Link>
            <Link
              id="cta-login"
              href="/login"
              className="text-sm font-semibold text-brand transition-colors hover:text-brand/80"
            >
              Already building? Sign in →
            </Link>
          </div>
        </section>

        <section id="feature-section" className="section-shell">
          <div className="max-w-2xl">
            <h2 className="section-heading text-zinc-900 dark:text-white">What teams ship with OnReal</h2>
            <p className="section-subtext text-zinc-600 dark:text-zinc-300">
              Build faster with primitives tuned for regulated markets, best-in-class custody integrations, and cross-chain orchestration.
            </p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featureHighlights.map((feature) => (
              <article
                id={feature.id}
                key={feature.id}
                className="flex flex-col gap-4 rounded-2xl border border-zinc-200 bg-white p-6 transition-colors hover:border-brand dark:border-white/15 dark:bg-white/5"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand/10 text-xs font-semibold uppercase tracking-[0.25em] text-brand">
                    {feature.accent[0]}
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-[0.3em] text-brand">{feature.accent}</span>
                </div>
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">{feature.title}</h3>
                <p className="text-sm leading-6 text-zinc-600 dark:text-white/70">{feature.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="resources-section" className="section-shell">
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
            <div id="resources-copy" className="space-y-6">
              <h2 className="section-heading text-zinc-900 dark:text-white">For developers and risk teams</h2>
              <p className="section-subtext text-zinc-600 dark:text-zinc-300">
                Access docs, SDKs, and dedicated solution architects who understand regulated markets. Enterprise controls are ready when your compliance team asks.
              </p>
              <ul className="space-y-3 text-sm text-zinc-600 dark:text-white/70">
                <li id="resources-security" className="flex items-center gap-3">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200 bg-white text-xs font-semibold text-brand dark:border-white/15 dark:bg-white/10 dark:text-white">
                    Security
                  </span>
                  SOC2 pathways, encrypted custody adapters, and full audit trails.
                </li>
                <li id="resources-compliance" className="flex items-center gap-3">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200 bg-white text-xs font-semibold text-brand dark:border-white/15 dark:bg-white/10 dark:text-white">
                    Compliance
                  </span>
                  Policy-based KYC, KYB, and accreditation workflows ready to deploy.
                </li>
                <li id="resources-support" className="flex items-center gap-3">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200 bg-white text-xs font-semibold text-brand dark:border-white/15 dark:bg-white/10 dark:text-white">
                    Support
                  </span>
                  Dedicated architect support and 24/7 incident response SLAs.
                </li>
              </ul>
            </div>
            <div id="resources-actions" className="grid gap-4">
              {resourceLinks.map((link) => (
                <Link
                  id={link.id}
                  key={link.id}
                  href={link.href as any}
                  className="flex flex-col rounded-2xl border border-zinc-200 bg-white p-6 transition-colors hover:border-brand dark:border-white/15 dark:bg-white/5"
                >
                  <span className="text-sm uppercase tracking-[0.28em] text-brand">{link.title}</span>
                  <p className="mt-4 text-lg font-semibold text-zinc-900 dark:text-white">{link.description}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand dark:text-white">
                    Explore
                    <span aria-hidden="true">→</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer
        id="landing-footer"
        className="section-shell flex flex-col gap-6 border-t border-zinc-200 py-12 text-sm text-zinc-600 dark:border-white/10 dark:text-white/70 sm:flex-row sm:items-center sm:justify-between"
      >
        <div id="footer-brand">Copyright {new Date().getFullYear()} OnReal Labs. All rights reserved.</div>
        <div id="footer-links" className="flex items-center gap-6">
          <Link id="footer-link-privacy" href={"https://onreal.example.com/privacy" as any} className="transition-colors hover:text-brand">
            Privacy
          </Link>
          <Link id="footer-link-terms" href={"https://onreal.example.com/terms" as any} className="transition-colors hover:text-brand">
            Terms
          </Link>
          <Link id="footer-link-status" href={"https://status.onreal.example.com" as any} className="transition-colors hover:text-brand">
            Status
          </Link>
        </div>
      </footer>
    </div>
  );
}
