"use client";

import { useState } from "react";
import { CaseSummaryTable } from "@/components/case-summary-table";
import { caseSummaries } from "@/data";
import { toLocalDateString } from "@/lib/deadline";
import { cn } from "@/lib/utils";

export function DataTableGallery() {
  const today = toLocalDateString();
  const [filterValue, setFilterValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [emptyDemo, setEmptyDemo] = useState(false);

  return (
    <div className="space-y-16px">
      <div className="space-y-4px">
        <h2 className="text-subheading font-medium text-charcoal">DataTable</h2>
        <p className="text-body text-steel">
          Sortable columns + filter. Empty and loading states keep column
          headers and the filter control visible. Deadline urgency relative to
          today (<code className="font-mono text-caption">{today}</code>).
        </p>
      </div>

      <div className="flex flex-wrap gap-8px">
        <button
          type="button"
          onClick={() => setLoading((v) => !v)}
          className={cn(
            "rounded-buttons border px-12px py-1.5 text-caption font-medium",
            loading
              ? "border-electric-blue bg-[#dbeaff] text-electric-blue"
              : "border-ash bg-canvas-white text-steel hover:text-charcoal"
          )}
        >
          {loading ? "Loading on" : "Show loading skeleton"}
        </button>
        <button
          type="button"
          onClick={() => setEmptyDemo((v) => !v)}
          className={cn(
            "rounded-buttons border px-12px py-1.5 text-caption font-medium",
            emptyDemo
              ? "border-electric-blue bg-[#dbeaff] text-electric-blue"
              : "border-ash bg-canvas-white text-steel hover:text-charcoal"
          )}
        >
          {emptyDemo ? "Empty on" : "Show empty state"}
        </button>
      </div>

      <CaseSummaryTable
        data={emptyDemo ? [] : caseSummaries}
        filterValue={filterValue}
        onFilterValueChange={setFilterValue}
        loading={loading}
      />
    </div>
  );
}
