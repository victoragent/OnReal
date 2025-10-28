import { UserMenu } from "./user-menu";

interface HeaderProps {
  user: {
    name: string;
    email: string;
  };
}

export function DashboardHeader({ user }: HeaderProps) {
  return (
    <header className="flex items-center justify-between border-b border-zinc-200 bg-white/70 px-6 py-4 text-sm shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5 sm:px-8 lg:px-12">
      <div>
        <p className="text-xs uppercase tracking-[0.35em] text-zinc-400 dark:text-zinc-500">Dashboard</p>
        <h1 className="text-lg font-semibold text-zinc-900 dark:text-white">Welcome back, {user.name}</h1>
      </div>
      <UserMenu user={user} />
    </header>
  );
}
