import { describe, it, expect, vi, beforeEach } from "vitest";

const redirectMock = vi.fn();

vi.mock("./options", () => ({
  authOptions: {}
}));

vi.mock("next-auth", () => ({
  getServerSession: vi.fn()
}));

vi.mock("next/navigation", () => ({
  redirect: redirectMock
}));

const { ensureAuthenticated } = await import("./guards");
const { getServerSession } = vi.mocked(await import("next-auth"));

describe("ensureAuthenticated", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    redirectMock.mockReset();
  });

  it("returns the session when user is authenticated", async () => {
    const session = { user: { email: "a@b.com", name: "Alice" } } as any;
    getServerSession.mockResolvedValue(session);

    const result = await ensureAuthenticated("/dashboard");

    expect(result).toBe(session);
    expect(redirectMock).not.toHaveBeenCalled();
  });

  it("invokes redirect when session missing", async () => {
    getServerSession.mockResolvedValue(null);

    const result = await ensureAuthenticated("/dashboard");

    expect(result).toBeNull();
    expect(redirectMock).toHaveBeenCalledWith("/login?callbackUrl=%2Fdashboard");
  });
});
