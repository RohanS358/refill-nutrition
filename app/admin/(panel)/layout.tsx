import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { LayoutDashboard, PenTool, FlaskConical, Users, Settings2, ArrowUpRight } from "lucide-react";
import { requireAdmin } from "@/lib/cms/auth";
import { logout } from "@/app/admin/actions";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

const adminNav = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Visual editor", href: "/admin/editor", icon: PenTool },
  { label: "Products", href: "/admin/products", icon: FlaskConical },
  { label: "Team", href: "/admin/team", icon: Users },
  { label: "Settings", href: "/admin/settings", icon: Settings2 },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <aside className="fixed inset-y-0 left-0 flex w-56 flex-col border-r border-line-dark bg-ink-deep text-background">
        <div className="border-b border-line-dark px-6 py-5">
          <p className="text-base font-extrabold tracking-tight">REFILL</p>
          <p className="text-eyebrow mt-1 text-green-soft">Content studio</p>
        </div>
        <nav aria-label="Admin" className="flex-1 px-3 py-4">
          <ul className="space-y-1">
            {adminNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-paper-dim transition-colors hover:bg-line-dark/40 hover:text-background"
                >
                  <item.icon size={16} strokeWidth={1.5} aria-hidden="true" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="space-y-1 border-t border-line-dark px-3 py-4">
          <a
            href="/"
            target="_blank"
            rel="noopener"
            className="flex items-center gap-3 px-3 py-2 text-sm text-paper-dim transition-colors hover:text-background"
          >
            <ArrowUpRight size={16} strokeWidth={1.5} aria-hidden="true" />
            View site
          </a>
          <form action={logout}>
            <button
              type="submit"
              className="w-full px-3 py-2 text-left text-sm text-paper-dim transition-colors hover:text-background"
            >
              Sign out
            </button>
          </form>
        </div>
      </aside>
      <div className="ml-56 flex-1">{children}</div>
    </div>
  );
}
