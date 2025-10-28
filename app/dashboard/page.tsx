import { mockDashboardData } from "@/lib/dashboard/data";
import { buildNotifications } from "@/lib/dashboard/notifications";

function formatDate(value: string) {
  const date = new Date(value);
  return date.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

export default async function DashboardOverviewPage() {
  const data = mockDashboardData();
  const notifications = buildNotifications(data);

  const expiringBanner = notifications.find((notification) => notification.type === "expiring");
  const cardNotifications = notifications.filter((notification) => notification.variant === "card");

  return (
    <div className="space-y-8">
      {expiringBanner && (
        <div className="rounded-3xl border border-amber-300 bg-amber-100 px-6 py-4 text-amber-900 dark:border-amber-400/60 dark:bg-amber-900/30 dark:text-amber-200">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold">{expiringBanner.title}</p>
              <p className="text-sm opacity-80">{expiringBanner.description}</p>
            </div>
            {expiringBanner.action && (
              <a
                className="inline-flex items-center justify-center rounded-full bg-amber-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-amber-700"
                href={expiringBanner.action.href}
              >
                {expiringBanner.action.label}
              </a>
            )}
          </div>
        </div>
      )}

      {cardNotifications.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2">
          {cardNotifications.map((notification) => (
            <div
              key={notification.type}
              className="rounded-3xl border border-brand/20 bg-white/80 p-6 text-sm shadow-sm dark:border-brand/30 dark:bg-white/10"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-brand">{notification.title}</p>
              <p className="mt-3 text-sm text-zinc-700 dark:text-zinc-300">{notification.description}</p>
              {notification.action && (
                <a
                  href={notification.action.href}
                  className="mt-4 inline-flex items-center text-sm font-semibold text-brand hover:text-brand/80"
                >
                  {notification.action.label} →
                </a>
              )}
            </div>
          ))}
        </div>
      )}

      <section className="grid gap-6 lg:grid-cols-[2fr,1fr]">
        <div className="rounded-3xl border border-zinc-200 bg-white/80 p-6 shadow-sm dark:border-white/10 dark:bg-white/10">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">Your Dapp List</h2>
            <a
              className="text-sm font-semibold text-brand hover:text-brand/80"
              href="/dashboard/settings?tab=dapps"
            >
              Manage Dapps →
            </a>
          </div>
          {data.dapps.length === 0 ? (
            <div className="mt-6 rounded-2xl border border-dashed border-zinc-300 p-6 text-sm text-zinc-600 dark:border-white/20 dark:text-zinc-300">
              You haven&apos;t created any RWA Dapps yet.{" "}
              <a href="/dashboard/settings?tab=dapps" className="font-semibold text-brand">
                Create your first Dapp
              </a>{" "}
              to start tokenizing assets.
            </div>
          ) : (
            <div className="mt-6 divide-y divide-zinc-200 dark:divide-white/10">
              {data.dapps.map((dapp) => (
                <div key={dapp.id} className="flex flex-col gap-2 py-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold text-zinc-900 dark:text-white">{dapp.name}</p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      Created {formatDate(dapp.createdAt)} · {dapp.chain}
                    </p>
                  </div>
                  <a
                    href={`/dashboard/dapps/${dapp.id}`}
                    className="text-sm font-semibold text-brand hover:text-brand/80"
                  >
                    View details →
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl border border-zinc-200 bg-white/80 p-6 shadow-sm dark:border-white/10 dark:bg-white/10">
            <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-zinc-500 dark:text-zinc-400">
              Subscription
            </h3>
            <p className="mt-3 text-lg font-semibold text-zinc-900 dark:text-white">{data.subscription.plan} plan</p>
            <p className="text-sm text-zinc-600 dark:text-zinc-300">
              Renews on {formatDate(data.subscription.renewsAt)}
            </p>
            <a
              href="/dashboard/subscription"
              className="mt-4 inline-flex items-center text-sm font-semibold text-brand hover:text-brand/80"
            >
              Manage subscription →
            </a>
          </div>

          <div className="rounded-3xl border border-zinc-200 bg-white/80 p-6 shadow-sm dark:border-white/10 dark:bg-white/10">
            <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-zinc-500 dark:text-zinc-400">Usage</h3>
            <p className="mt-3 text-lg font-semibold text-zinc-900 dark:text-white">
              {data.usage.requestCount24h.toLocaleString()} requests (24h)
            </p>
            <p className="text-sm text-zinc-600 dark:text-zinc-300">
              {data.usage.requestRatePerMin.toFixed(1)} requests / min
            </p>
            <a
              href="/dashboard/usage"
              className="mt-4 inline-flex items-center text-sm font-semibold text-brand hover:text-brand/80"
            >
              View usage analytics →
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
