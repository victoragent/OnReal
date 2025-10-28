import { describe, it, expect } from "vitest";
import { buildNotifications, isExpiringSoon } from "./notifications";
import { mockDashboardData } from "./data";

describe("notifications", () => {
  it("detects expiring subscriptions within 7 days", () => {
    const soon = new Date();
    soon.setDate(soon.getDate() + 3);
    const later = new Date();
    later.setDate(later.getDate() + 10);

    expect(isExpiringSoon(soon.toISOString())).toBe(true);
    expect(isExpiringSoon(later.toISOString())).toBe(false);
  });

  it("prioritises expiring banner over unverified and pending states", () => {
    const data = mockDashboardData({
      kybStatus: "unverified",
      subscription: {
        plan: "Free",
        renewsAt: (() => {
          const date = new Date();
          date.setDate(date.getDate() + 1);
          return date.toISOString();
        })()
      }
    });

    const notifications = buildNotifications(data);
    expect(notifications[0].type).toBe("expiring");
    expect(notifications[1].type).toBe("unverified");
  });

  it("shows verification pending message when KYB is under review", () => {
    const data = mockDashboardData({
      kybStatus: "pending",
      subscription: {
        plan: "Growth",
        renewsAt: (() => {
          const date = new Date();
          date.setDate(date.getDate() + 20);
          return date.toISOString();
        })()
      }
    });

    const notifications = buildNotifications(data);
    expect(notifications).toHaveLength(1);
    expect(notifications[0].type).toBe("verification-pending");
  });
});
