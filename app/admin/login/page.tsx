import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/cms/auth";
import { LoginForm } from "@/components/cms/login-form";
import { Logo } from "@/components/site/logo";

export const metadata: Metadata = {
  title: "Admin sign in",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  if (await isAdmin()) redirect("/admin");

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink-deep px-5 text-background">
      <div className="w-full max-w-sm">
        <Logo onDark />
        <div className="mt-8 border border-line-dark p-8 md:p-10">
          <p className="text-eyebrow text-green-soft">Content studio</p>
          <h1 className="text-title mt-3 font-semibold">Sign in to edit the site.</h1>
          <LoginForm />
        </div>
        <p className="text-data mt-6 text-paper-dim">
          Dev credentials: admin / admin — change before launch.
        </p>
      </div>
    </div>
  );
}
