import { DashboardData } from "./data";

export type NotificationType = "expiring" | "unverified" | "verification-pending";

export interface DashboardNotification {
  type: NotificationType;
  priority: number;
  title: string;
  description: string;
  action?: {
    label: string;
    href: string;
  };
  variant: "banner" | "card";
}

const PRIORITY: Record<NotificationType, number> = {
  expiring: 0,
  unverified: 1,
  "verification-pending": 2
};

export function isExpiringSoon(renewIso: string): boolean {
  const renewDate = new Date(renewIso);
  const now = new Date();
  const msDiff = renewDate.getTime() - now.getTime();
  const days = msDiff / (1000 * 60 * 60 * 24);
  return days < 7;
}

export function buildNotifications(data: DashboardData): DashboardNotification[] {
  const notifications: DashboardNotification[] = [];

  if (isExpiringSoon(data.subscription.renewsAt)) {
    notifications.push({
      type: "expiring",
      priority: PRIORITY.expiring,
      title: "Your subscription is expiring soon",
      description: "Renew your plan to keep access to OnReal's APIs without interruption.",
      action: {
        label: "Manage subscription",
        href: "/dashboard/subscription"
      },
      variant: "banner"
    });
  }

  if (data.kybStatus === "unverified") {
    notifications.push({
      type: "unverified",
      priority: PRIORITY.unverified,
      title: "Complete KYB/KYC verification",
      description: "Verify your organization to unlock asset issuance and investor onboarding.",
      action: {
        label: "Start verification",
        href: "/dashboard/settings?tab=compliance"
      },
      variant: "card"
    });
  }

  if (data.kybStatus === "pending") {
    notifications.push({
      type: "verification-pending",
      priority: PRIORITY["verification-pending"],
      title: "Verification in progress",
      description: "Our compliance team is reviewing your documents. We'll notify you once it's complete.",
      variant: "card"
    });
  }

  return notifications.sort((a, b) => a.priority - b.priority);
}
