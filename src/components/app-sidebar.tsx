"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/", label: "Home", match: (path: string) => path === "/" },
  {
    href: "/cases",
    label: "Case Workspace",
    match: (path: string) => path.startsWith("/cases"),
  },
  {
    href: "/ai",
    label: "AI Analysis",
    match: (path: string) => path.startsWith("/ai"),
  },
  {
    href: "/reports",
    label: "Reports & Audit",
    match: (path: string) => path.startsWith("/reports"),
  },
] as const;

/**
 * Dub Sidebar Nav Item: transparent default, soft blue (#dbeaff) active fill,
 * 8px radius, charcoal text — no bold left-border indicator.
 */
export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-56 shrink-0 flex-col border-r border-ash bg-canvas-white">
      <div className="border-b border-ash px-16px py-16px">
        <Link href="/" className="block">
          <p className="font-display text-heading-sm font-medium tracking-tight text-charcoal">
            MAX
          </p>
          <p className="text-caption text-fog">AI Vetting Workspace</p>
        </Link>
      </div>

      <nav className="flex flex-col gap-4px p-8px" aria-label="Primary">
        {NAV_ITEMS.map((item) => {
          const active = item.match(pathname);
          return (
            <Link
              key={item.href}
              href={item.href}
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

      <div className="mt-auto border-t border-ash p-12px">
        <Link
          href="/components"
          className="block rounded-lg px-8px py-2 text-caption text-fog hover:bg-paper-mist hover:text-steel"
        >
          Component gallery
        </Link>
      </div>
    </aside>
  );
}
