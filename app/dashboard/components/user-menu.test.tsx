import { describe, it, expect, vi } from "vitest";
import { logout } from "./user-menu";

vi.mock("next-auth/react", () => ({
  signOut: vi.fn()
}));

const { signOut } = vi.mocked(await import("next-auth/react"));

describe("user menu logout", () => {
  it("calls signOut with default callback", async () => {
    signOut.mockResolvedValue(undefined as any);
    await logout();
    expect(signOut).toHaveBeenCalledWith({ callbackUrl: "/" });
  });
});
