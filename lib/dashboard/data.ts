export type KybStatus = "unverified" | "pending" | "verified";

export interface DashboardData {
  user: {
    name: string;
    email: string;
  };
  kybStatus: KybStatus;
  subscription: {
    plan: "Free" | "Growth" | "Enterprise";
    renewsAt: string;
  };
  usage: {
    requestCount24h: number;
    requestRatePerMin: number;
  };
  dapps: Array<{
    id: string;
    name: string;
    chain: string;
    createdAt: string;
  }>;
}

export function mockDashboardData(overrides: Partial<DashboardData> = {}): DashboardData {
  const daysFromNow = (days: number) => {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date.toISOString();
  };

  const base: DashboardData = {
    user: {
      name: "Morgan Carter",
      email: "morgan@acme.studio"
    },
    kybStatus: "pending",
    subscription: {
      plan: "Free",
      renewsAt: daysFromNow(5)
    },
    usage: {
      requestCount24h: 1245,
      requestRatePerMin: 2.3
    },
    dapps: [
      {
        id: "dapp-1",
        name: "Atlas Commodities",
        chain: "Polygon",
        createdAt: daysFromNow(-18)
      },
      {
        id: "dapp-2",
        name: "Nova Energy Credits",
        chain: "Solana",
        createdAt: daysFromNow(-42)
      }
    ]
  };

  return {
    ...base,
    ...overrides,
    user: {
      ...base.user,
      ...overrides.user
    },
    subscription: {
      ...base.subscription,
      ...overrides.subscription
    },
    usage: {
      ...base.usage,
      ...overrides.usage
    },
    dapps: overrides.dapps ?? base.dapps
  };
}
