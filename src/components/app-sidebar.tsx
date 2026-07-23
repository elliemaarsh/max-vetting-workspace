"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/", label: "Home", match: (path: string) => path === "/" },
  {
    href: "/cases",
    label: "Case Workspace",
    match: (path: string) => path.startsWith("/cases"),
  },
  {
    href: "/reports",
    label: "Reports & Audit",
    match: (path: string) => path.startsWith("/reports"),
  },
] as const;

/**
 * Dub Sidebar Nav Item. Desktop: fixed rail. Tablet (< lg): collapsible drawer
 * + compact top bar (desktop-first with tablet fallback).
 */
export function AppSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const nav = (
    <nav className="flex flex-col gap-4px p-8px" aria-label="Primary">
      {NAV_ITEMS.map((item) => {
        const active = item.match(pathname);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setOpen(false)}
            className={cn(
              "rounded-lg px-8px py-3 text-body font-medium transition-colors",
              active
                ? "bg-[#dbeaff] text-charcoal"
                : "text-slate hover:bg-paper-mist hover:text-charcoal"
            )}
            aria-current={active ? "page" : undefined}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* Tablet / narrow: top bar */}
      <div className="flex items-center justify-between gap-12px border-b border-ash bg-canvas-white px-16px py-12px lg:hidden">
        <Link href="/" className="min-w-0">
          <p className="font-display text-heading-sm font-medium tracking-tight text-charcoal">
            MAX
          </p>
          <p className="text-caption text-steel">AI Vetting Workspace</p>
        </Link>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="rounded-buttons border border-ash p-2 text-charcoal hover:bg-paper-mist"
          aria-expanded={open}
          aria-controls="app-nav-drawer"
          aria-label={open ? "Close navigation" : "Open navigation"}
        >
          {open ? <X className="size-4" /> : <Menu className="size-4" />}
        </button>
      </div>

      {open ? (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-charcoal/30 lg:hidden"
          aria-label="Close navigation overlay"
          onClick={() => setOpen(false)}
        />
      ) : null}

      <aside
        id="app-nav-drawer"
        className={cn(
          "z-50 flex w-56 shrink-0 flex-col border-ash bg-canvas-white",
          // Desktop rail
          "lg:relative lg:flex lg:border-r",
          // Tablet drawer
          "fixed inset-y-0 left-0 border-r transition-transform duration-200",
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="hidden border-b border-ash px-16px py-16px lg:block">
          <Link href="/" className="block">
            <p className="font-display text-heading-sm font-medium tracking-tight text-charcoal">
              MAX
            </p>
            <p className="text-caption text-steel">AI Vetting Workspace</p>
          </Link>
        </div>

        <div className="border-b border-ash px-16px py-12px lg:hidden">
          <p className="text-caption font-medium text-slate">Navigate</p>
        </div>

        {nav}

        <div className="mt-auto border-t border-ash p-12px">
          <Link
            href="/components"
            onClick={() => setOpen(false)}
            className="block rounded-lg px-8px py-2 text-caption text-steel hover:bg-paper-mist hover:text-charcoal"
          >
            Component gallery
          </Link>
        </div>
      </aside>
    </>
  );
}
