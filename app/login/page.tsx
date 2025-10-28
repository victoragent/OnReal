import { AuthShell } from "@/components/auth/auth-shell";
import { LoginForm } from "@/components/auth/login-form";

interface LoginPageProps {
  searchParams?: Record<string, string | string[] | undefined>;
}

export default function LoginPage({ searchParams }: LoginPageProps) {
  const callbackUrl = typeof searchParams?.callbackUrl === "string" ? searchParams?.callbackUrl : undefined;

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to access your OnReal dashboard and continue building."
      footerHint="Don't have an account?"
      footerLink={{ href: `/register${callbackUrl ? `?callbackUrl=${encodeURIComponent(callbackUrl)}` : ""}`, label: "Create one" }}
    >
      <LoginForm />
    </AuthShell>
  );
}
