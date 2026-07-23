"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const ROLES = ["Analyst", "Reviewer", "QA/QC"] as const;
export type DemoRole = (typeof ROLES)[number];

type RoleSwitcherProps = {
  className?: string;
};

/** v1 demo role switcher — no real auth. */
export function RoleSwitcher({ className }: RoleSwitcherProps) {
  const [role, setRole] = useState<DemoRole>("Analyst");

  return (
    <div
      className={cn("inline-flex items-center gap-4px rounded-tags border border-ash bg-paper-mist p-4px", className)}
      role="group"
      aria-label="Demo role"
    >
      {ROLES.map((r) => (
        <button
          key={r}
          type="button"
          onClick={() => setRole(r)}
          className={cn(
            "rounded-tags px-12px py-1.5 text-caption font-medium transition-colors",
            role === r
              ? "bg-canvas-white text-charcoal shadow-subtle"
              : "text-steel hover:text-charcoal"
          )}
        >
          {r}
        </button>
      ))}
    </div>
  );
}
