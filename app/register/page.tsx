import { AuthShell } from "@/components/auth/auth-shell";
import { RegisterForm } from "@/components/auth/register-form";

interface RegisterPageProps {
  searchParams?: Record<string, string | string[] | undefined>;
}

export default function RegisterPage({ searchParams }: RegisterPageProps) {
  const callbackUrl = typeof searchParams?.callbackUrl === "string" ? searchParams?.callbackUrl : undefined;

  return (
    <AuthShell
      title="Create your OnReal account"
      subtitle="Set up developer access in minutes and orchestrate compliant RWA flows."
      footerHint="Already have an account?"
      footerLink={{ href: `/login${callbackUrl ? `?callbackUrl=${encodeURIComponent(callbackUrl)}` : ""}`, label: "Sign in" }}
    >
      <RegisterForm />
    </AuthShell>
  );
}
