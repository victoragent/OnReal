import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import type { ReactNode } from "react";

interface AuthShellProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  footerHint: string;
  footerLink: {
    href: string;
    label: string;
  };
}

export function AuthShell({ title, subtitle, children, footerHint, footerLink }: AuthShellProps) {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-white via-zinc-50 to-white text-zinc-900 transition-colors dark:from-[#05050b] dark:via-[#080818] dark:to-[#0b0b1f] dark:text-white">
      <header className="section-shell flex items-center justify-between py-10">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-medium uppercase tracking-[0.28em] text-brand">OnReal</span>
          <span className="text-lg font-semibold">Operating System for Real World Assets</span>
        </div>
        <ThemeToggle />
      </header>

      <main className="flex flex-1 items-center justify-center px-4 pb-16">
        <div className="w-full max-w-md space-y-8 rounded-3xl border border-zinc-200 bg-white/90 p-10 shadow-xl backdrop-blur dark:border-white/10 dark:bg-white/10">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-semibold">{title}</h1>
            <p className="text-sm text-zinc-600 dark:text-zinc-300">{subtitle}</p>
          </div>
          {children}
          <div className="mt-8 flex flex-col items-center gap-2 text-sm text-zinc-600 dark:text-zinc-300">
            <p className="text-xs text-zinc-400 dark:text-zinc-500">
              By continuing, you agree to our{' '}
              <Link href="/terms" className="text-brand hover:underline">
                Terms
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="text-brand hover:underline">
                Privacy Policy
              </Link>
              .
            </p>
            <p>
              {footerHint}{' '}
              <Link href={footerLink.href as any} className="text-brand hover:underline">
                {footerLink.label}
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
