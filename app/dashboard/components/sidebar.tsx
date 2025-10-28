"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { label: "Overview", href: "/dashboard" },
  { label: "Usage", href: "/dashboard/usage" },
  { label: "Subscription", href: "/dashboard/subscription" },
  { label: "Settings", href: "/dashboard/settings" }
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <nav className="space-y-1">
      {NAV_ITEMS.map((item) => {
        const isActive =
          item.href === "/dashboard"
            ? pathname === item.href
            : pathname.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-semibold transition-colors ${
              isActive
                ? "bg-brand text-white shadow-brand/40 shadow-lg"
                : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-white/10"
            }`}
          >
            <span>{item.label}</span>
            {isActive && <span className="text-xs uppercase tracking-[0.3em]">Now</span>}
          </Link>
        );
      })}
    </nav>
  );
}
