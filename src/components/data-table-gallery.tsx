"use client";

import { useState } from "react";
import { CaseSummaryTable } from "@/components/case-summary-table";
import { caseSummaries } from "@/data";
import { toLocalDateString } from "@/lib/deadline";

export function DataTableGallery() {
  const today = toLocalDateString();
  const [filterValue, setFilterValue] = useState("");

  return (
    <div className="space-y-16px">
      <div className="space-y-4px">
        <h2 className="text-subheading font-medium text-charcoal">DataTable</h2>
        <p className="text-body text-steel">
          Sortable columns + filter input over{" "}
          <code className="font-mono text-caption">caseSummaries</code>.
          Deadline urgency relative to today (
          <code className="font-mono text-caption">{today}</code>):{" "}
          <span className="font-medium text-[#e11d48]">overdue</span>,{" "}
          <span className="font-medium text-[#d97706]">due today</span>,{" "}
          <span className="text-steel">on track</span>. Default columns:
          Influencer, Market, Status, Next Deadline, Effort — use{" "}
          <span className="font-medium text-charcoal">Columns</span> to show
          language, deadline breakdown, assignees, and re-vet date.
        </p>
      </div>

      <CaseSummaryTable
        data={caseSummaries}
        filterValue={filterValue}
        onFilterValueChange={setFilterValue}
      />
    </div>
  );
}
