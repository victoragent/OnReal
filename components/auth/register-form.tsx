"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { registerSchema } from "@/lib/auth/validators";

export function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? undefined;
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (key: keyof typeof formState) => (event: ChangeEvent<HTMLInputElement>) => {
    setFormState((prev) => ({ ...prev, [key]: event.target.value }));
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setFieldErrors({});
    setSuccess(false);

    const parsed = registerSchema.safeParse(formState);
    if (!parsed.success) {
      const errors = parsed.error.flatten().fieldErrors;
      setFieldErrors(Object.fromEntries(Object.entries(errors).map(([key, value]) => [key, value?.[0] ?? ""])));
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: parsed.data.name,
          email: parsed.data.email,
          password: parsed.data.password
        })
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        if (response.status === 409) {
          setError("An account with this email already exists. Try signing in instead.");
        } else if (payload?.error) {
          setError(payload.error);
        } else {
          setError("Unable to create account. Please try again.");
        }
        return;
      }

      setSuccess(true);

      const result = await signIn("credentials", {
        email: parsed.data.email,
        password: parsed.data.password,
        redirect: false,
        callbackUrl: callbackUrl ?? "/dashboard"
      });

      if (result?.error) {
        setSuccess(false);
        setError("Account created, but automatic sign-in failed. Please sign in manually.");
        return;
      }

      const destination = result?.url ?? callbackUrl ?? "/dashboard";
      router.push(destination);
      router.refresh();
    } catch (err) {
      console.error("Registration error", err);
      setError("Unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit} noValidate>
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/40 dark:bg-red-900/30 dark:text-red-200">
          {error}
        </div>
      )}
      {success && !error && (
        <div className="rounded-xl border border-brand/30 bg-brand/10 px-4 py-3 text-sm text-brand dark:border-brand/20 dark:bg-brand/20 dark:text-white">
          Account created. Signing you in…
        </div>
      )}
      <div className="space-y-2">
        <label htmlFor="name" className="block text-sm font-medium">
          Full name <span className="text-xs text-zinc-400">(optional)</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          value={formState.name}
          onChange={handleChange("name")}
          disabled={loading}
          className={`w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand dark:bg-transparent ${fieldErrors.name ? "border-red-400" : "border-zinc-200 dark:border-white/10"
            }`}
        />
        {fieldErrors.name && <p className="text-sm text-red-500">{fieldErrors.name}</p>}
      </div>
      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={formState.email}
          onChange={handleChange("email")}
          disabled={loading}
          className={`w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand dark:bg-transparent ${fieldErrors.email ? "border-red-400" : "border-zinc-200 dark:border-white/10"
            }`}
        />
        {fieldErrors.email && <p className="text-sm text-red-500">{fieldErrors.email}</p>}
      </div>
      <div className="space-y-2">
        <label htmlFor="password" className="block text-sm font-medium">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          value={formState.password}
          onChange={handleChange("password")}
          disabled={loading}
          className={`w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand dark:bg-transparent ${fieldErrors.password ? "border-red-400" : "border-zinc-200 dark:border-white/10"
            }`}
        />
        {fieldErrors.password && <p className="text-sm text-red-500">{fieldErrors.password}</p>}
      </div>
      <div className="space-y-2">
        <label htmlFor="confirmPassword" className="block text-sm font-medium">
          Confirm password
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          value={formState.confirmPassword}
          onChange={handleChange("confirmPassword")}
          disabled={loading}
          className={`w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand dark:bg-transparent ${fieldErrors.confirmPassword ? "border-red-400" : "border-zinc-200 dark:border-white/10"
            }`}
        />
        {fieldErrors.confirmPassword && <p className="text-sm text-red-500">{fieldErrors.confirmPassword}</p>}
      </div>
      <button
        type="submit"
        disabled={loading}
        className="flex w-full items-center justify-center rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-accent disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Creating account…" : "Create account"}
      </button>
    </form>
  );
}
