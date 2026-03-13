"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { LayoutDashboard, LogOut, Loader2 } from "lucide-react";
import { logoutAction } from "@/actions/auth";
import { cn } from "@/lib/utils";

const navItems = [{ href: "/dashboard", label: "Dashboard", icon: LayoutDashboard }];

export function Sidebar() {
  const pathname = usePathname();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    await logoutAction();
  };

  return (
    <aside className="w-60 min-h-screen border-r bg-white flex flex-col">
      <div className="p-6 border-b">
        <span className="font-bold text-lg text-primary">SchoolHub</span>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
              pathname === href
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-gray-100 hover:text-gray-900"
            )}
          >
            <Icon className="h-4 w-4" />
            {label}
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t">
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-50 w-full transition-colors disabled:opacity-60"
        >
          {loggingOut ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Signing out...
            </>
          ) : (
            <>
              <LogOut className="h-4 w-4" /> Logout
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
