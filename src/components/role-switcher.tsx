"use client";

import { useCasesStore, type DemoRole } from "@/store/cases-store";
import { cn } from "@/lib/utils";

const ROLES: DemoRole[] = ["Analyst", "Reviewer", "QA/QC"];

type RoleSwitcherProps = {
  className?: string;
};

/** v1 demo role switcher — stored in Zustand (no real auth). */
export function RoleSwitcher({ className }: RoleSwitcherProps) {
  const role = useCasesStore((s) => s.role);
  const setRole = useCasesStore((s) => s.setRole);

  return (
    <div
      className={cn(
        "inline-flex items-center gap-4px rounded-tags border border-ash bg-paper-mist p-4px",
        className
      )}
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
