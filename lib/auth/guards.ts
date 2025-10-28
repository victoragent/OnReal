import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./options";

export async function ensureAuthenticated(callbackUrl = "/dashboard") {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    redirect(`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`);
    return null as never;
  }
  return session;
}
