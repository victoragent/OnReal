"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";

interface UserMenuProps {
  user: {
    name: string;
    email: string;
  };
}

export function UserMenu({ user }: UserMenuProps) {
  const [open, setOpen] = useState(false);

  const initials = user.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const toggle = () => setOpen((prev) => !prev);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={toggle}
        className="flex items-center gap-3 rounded-full border border-zinc-200 bg-white/80 px-3 py-2 text-left text-sm shadow-sm transition-colors hover:border-brand hover:text-brand dark:border-white/15 dark:bg-white/10 dark:text-white"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand/10 text-sm font-semibold text-brand">
          {initials}
        </span>
        <span className="hidden flex-col text-xs leading-tight sm:flex">
          <span className="font-semibold text-zinc-900 dark:text-white">{user.name}</span>
          <span className="text-zinc-500 dark:text-zinc-400">{user.email}</span>
        </span>
      </button>
      {open && (
        <div
          className="absolute right-0 mt-3 w-48 rounded-2xl border border-zinc-200 bg-white p-4 text-sm shadow-xl dark:border-white/10 dark:bg-[#0d0d1a]"
          role="menu"
        >
          <p className="mb-2 text-xs uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-500">Status</p>
          <p className="text-sm font-semibold text-zinc-900 dark:text-white">Logged in</p>
          <button
            type="button"
            onClick={handleLogout}
            className="mt-4 w-full rounded-full bg-brand px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-accent"
            role="menuitem"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export async function logout() {
  await signOut({ callbackUrl: "/" });
}
