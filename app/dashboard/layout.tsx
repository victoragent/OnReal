import { ReactNode } from "react";
import { ensureAuthenticated } from "@/lib/auth/guards";
import { DashboardSidebar } from "./components/sidebar";
import { DashboardHeader } from "./components/header";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const session = await ensureAuthenticated("/dashboard");

  const user = {
    name: session.user.name ?? session.user.email ?? "OnReal User",
    email: session.user.email ?? "unknown@onreal.dev"
  };

  return (
    <div className="min-h-screen bg-dashboard-light text-zinc-900 transition-colors dark:bg-dashboard-dark dark:text-white">
      <div className="flex min-h-screen">
        <aside className="hidden w-64 border-r border-zinc-200 bg-white/80 px-6 py-8 dark:border-white/10 dark:bg-white/5 lg:flex lg:flex-col">
          <div className="mb-10">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-brand">OnReal</p>
            <p className="mt-2 text-lg font-semibold">Control Center</p>
          </div>
          <DashboardSidebar />
        </aside>
        <div className="flex flex-1 flex-col">
          <DashboardHeader user={user} />
          <main className="flex-1 px-6 pb-12 pt-8 sm:px-8 lg:px-12">{children}</main>
        </div>
      </div>
    </div>
  );
}
