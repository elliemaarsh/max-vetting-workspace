"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type AIOutputMode = "Coverage Scan" | "Scorecard Assembly";

type AIOutputCardProps = {
  mode: AIOutputMode;
  timestamp: string;
  runId: string;
  children: ReactNode;
  onInsert?: () => void;
  insertLabel?: string;
  className?: string;
  /** When true, disable insert and show inserted state */
  inserted?: boolean;
};

/**
 * Wrapper for any AI-generated output: mode label, timestamp/run ID,
 * content, and a single explicit "Insert into case" action.
 * Nothing commits to the case without this click.
 */
export function AIOutputCard({
  mode,
  timestamp,
  runId,
  children,
  onInsert,
  insertLabel = "Insert into case",
  className,
  inserted = false,
}: AIOutputCardProps) {
  return (
    <article
      className={cn(
        "overflow-hidden rounded-cards border border-ash bg-canvas-white shadow-subtle",
        className
      )}
      data-ai-mode={mode}
      data-run-id={runId}
    >
      <header className="flex flex-wrap items-center justify-between gap-8px border-b border-ash bg-paper-mist px-16px py-12px">
        <div className="flex flex-wrap items-center gap-8px">
          <span className="rounded-tags bg-[#dbeaff] px-2 py-0.5 text-caption font-medium text-electric-blue">
            {mode === "Coverage Scan" ? "AI Coverage Scan" : "AI Scorecard Draft"}
          </span>
          <span className="font-mono text-caption text-fog">
            {timestamp}
            <span className="text-silver"> · </span>
            {runId}
          </span>
        </div>
      </header>

      <div className="space-y-16px px-16px py-16px">{children}</div>

      <footer className="flex items-center justify-end border-t border-ash bg-canvas-white px-16px py-12px">
        <button
          type="button"
          onClick={onInsert}
          disabled={inserted || !onInsert}
          className={cn(
            "rounded-buttons px-16px py-2 text-body font-medium transition-colors",
            inserted
              ? "cursor-default border border-ash bg-soft-mint text-vivid-green"
              : "bg-primary-action text-canvas-white hover:bg-midnight-ink disabled:cursor-not-allowed disabled:opacity-50"
          )}
        >
          {inserted ? "Inserted" : insertLabel}
        </button>
      </footer>
    </article>
  );
}
