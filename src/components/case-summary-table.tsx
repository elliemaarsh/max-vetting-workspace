"use client";

import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import type { CaseSummary } from "@/types";
import { StatusBadge, getCaseStatusLabel } from "@/components/status-badge";
import {
  DataTable,
  type DataTableColumn,
} from "@/components/data-table";
import {
  DEADLINE_FIELD_LABELS,
  formatDeadlineLabel,
  getDeadlineUrgency,
  getNextDeadline,
  getNextDeadlineField,
  type DeadlineUrgency,
} from "@/lib/deadline";
import { casesById } from "@/data";
import { cn } from "@/lib/utils";

const URGENCY_CLASS: Record<DeadlineUrgency, string> = {
  overdue: "font-medium text-[#e11d48]",
  due_today: "font-medium text-[#d97706]",
  on_track: "text-steel",
};

const URGENCY_LABEL: Record<DeadlineUrgency, string> = {
  overdue: "Overdue",
  due_today: "Due today",
  on_track: "On track",
};

/** Always visible in the queue table. */
const DEFAULT_COLUMN_IDS = [
  "influencer",
  "market",
  "status",
  "nextDeadline",
  "effort",
] as const;

/** Optional columns — off by default, toggled via Columns menu. */
const OPTIONAL_COLUMN_IDS = [
  "language",
  "vettingDeadline",
  "reviewDeadline",
  "qaqcDeadline",
  "submissionDeadline",
  "assignedAnalyst",
  "assignedReviewer",
  "assignedQAQC",
  "revetDate",
] as const;

type ColumnId =
  | (typeof DEFAULT_COLUMN_IDS)[number]
  | (typeof OPTIONAL_COLUMN_IDS)[number];

const OPTIONAL_COLUMN_LABELS: Record<
  (typeof OPTIONAL_COLUMN_IDS)[number],
  string
> = {
  language: "Language",
  vettingDeadline: "Vetting deadline",
  reviewDeadline: "Review deadline",
  qaqcDeadline: "QA/QC deadline",
  submissionDeadline: "Submission deadline",
  assignedAnalyst: "Analyst",
  assignedReviewer: "Reviewer",
  assignedQAQC: "QA/QC",
  revetDate: "Re-vet date",
};

/** Live filter across Influencer, Market, and Status (label + key). */
export function matchesCaseQueueFilter(
  row: CaseSummary,
  queryLower: string
): boolean {
  if (!queryLower) return true;
  const statusLabel = getCaseStatusLabel(row.status).toLowerCase();
  return (
    row.influencerName.toLowerCase().includes(queryLower) ||
    row.market.toLowerCase().includes(queryLower) ||
    statusLabel.includes(queryLower) ||
    row.status.toLowerCase().includes(queryLower)
  );
}

function DeadlineCell({
  value,
  stageLabel,
}: {
  value: string;
  stageLabel?: string;
}) {
  const urgency = getDeadlineUrgency(value);
  return (
    <span
      className={cn("inline-flex flex-col gap-0.5", URGENCY_CLASS[urgency])}
      title={URGENCY_LABEL[urgency]}
    >
      <span>{formatDeadlineLabel(value)}</span>
      {stageLabel ? (
        <span className="font-mono text-[10px] font-normal text-fog">
          {stageLabel}
        </span>
      ) : null}
      <span className="sr-only"> ({URGENCY_LABEL[urgency]})</span>
    </span>
  );
}

function buildAllColumns(): DataTableColumn<CaseSummary>[] {
  return [
    {
      id: "influencer",
      header: "Influencer",
      getValue: (row) => row.influencerName,
      cell: (row) =>
        casesById[row.id] ? (
          <Link
            href={`/cases/${row.id}`}
            className="font-medium text-charcoal underline-offset-2 hover:text-electric-blue hover:underline"
          >
            {row.influencerName}
          </Link>
        ) : (
          <span className="font-medium text-charcoal">{row.influencerName}</span>
        ),
    },
    {
      id: "market",
      header: "Market",
      getValue: (row) => row.market,
      cell: (row) => row.market,
    },
    {
      id: "language",
      header: "Language",
      getValue: (row) => row.language,
      cell: (row) => row.language,
    },
    {
      id: "status",
      header: "Status",
      getValue: (row) => getCaseStatusLabel(row.status),
      cell: (row) => <StatusBadge status={row.status} />,
    },
    {
      id: "nextDeadline",
      header: "Next Deadline",
      getValue: (row) => getNextDeadline(row) ?? "",
      cell: (row) => {
        const next = getNextDeadline(row);
        if (!next) {
          return <span className="text-fog">—</span>;
        }
        const field = getNextDeadlineField(row.status);
        return (
          <DeadlineCell
            value={next}
            stageLabel={field ? DEADLINE_FIELD_LABELS[field] : undefined}
          />
        );
      },
    },
    {
      id: "vettingDeadline",
      header: "Vetting",
      getValue: (row) => row.vettingDeadline,
      cell: (row) => <DeadlineCell value={row.vettingDeadline} />,
    },
    {
      id: "reviewDeadline",
      header: "Review",
      getValue: (row) => row.reviewDeadline,
      cell: (row) => <DeadlineCell value={row.reviewDeadline} />,
    },
    {
      id: "qaqcDeadline",
      header: "QA/QC",
      getValue: (row) => row.qaqcDeadline,
      cell: (row) => <DeadlineCell value={row.qaqcDeadline} />,
    },
    {
      id: "submissionDeadline",
      header: "Submission",
      getValue: (row) => row.submissionDeadline,
      cell: (row) => <DeadlineCell value={row.submissionDeadline} />,
    },
    {
      id: "effort",
      header: "Effort",
      getValue: (row) => row.effort,
      cell: (row) => (
        <span className="font-mono text-caption text-graphite">{row.effort}</span>
      ),
      headerClassName: "w-20",
      cellClassName: "w-20",
    },
    {
      id: "assignedAnalyst",
      header: "Analyst",
      getValue: (row) => row.assignedAnalyst,
      cell: (row) => row.assignedAnalyst,
    },
    {
      id: "assignedReviewer",
      header: "Reviewer",
      getValue: (row) => row.assignedReviewer,
      cell: (row) => row.assignedReviewer,
    },
    {
      id: "assignedQAQC",
      header: "QA/QC",
      getValue: (row) => row.assignedQAQC,
      cell: (row) => row.assignedQAQC,
    },
    {
      id: "revetDate",
      header: "Re-vet date",
      getValue: (row) => row.revetDate ?? "",
      cell: (row) =>
        row.revetDate ? (
          formatDeadlineLabel(row.revetDate)
        ) : (
          <span className="text-fog">—</span>
        ),
    },
  ];
}

const ALL_COLUMNS = buildAllColumns();

type CaseSummaryTableProps = {
  data: CaseSummary[];
  className?: string;
  filterValue: string;
  onFilterValueChange: (value: string) => void;
  onFilteredCountChange?: (filtered: number, total: number) => void;
};

/** Queue-ready table: default columns + optional column visibility. */
export function CaseSummaryTable({
  data,
  className,
  filterValue,
  onFilterValueChange,
  onFilteredCountChange,
}: CaseSummaryTableProps) {
  const [open, setOpen] = useState(false);
  const [visibleOptional, setVisibleOptional] = useState<
    Set<(typeof OPTIONAL_COLUMN_IDS)[number]>
  >(() => new Set());

  const visibleIds = useMemo(() => {
    const ids = new Set<ColumnId>(DEFAULT_COLUMN_IDS);
    visibleOptional.forEach((id) => ids.add(id));
    return ids;
  }, [visibleOptional]);

  const columns = useMemo(
    () => ALL_COLUMNS.filter((col) => visibleIds.has(col.id as ColumnId)),
    [visibleIds]
  );

  const filterFn = useCallback(
    (row: CaseSummary, queryLower: string) =>
      matchesCaseQueueFilter(row, queryLower),
    []
  );

  const handleFilteredCountChange = useCallback(
    (filtered: number, total: number) => {
      onFilteredCountChange?.(filtered, total);
    },
    [onFilteredCountChange]
  );

  function toggleOptional(id: (typeof OPTIONAL_COLUMN_IDS)[number]) {
    setVisibleOptional((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <DataTable
      data={data}
      columns={columns}
      getRowId={(row) => row.id}
      filterPlaceholder="Filter by influencer, market, status…"
      emptyMessage="No cases match the current filter."
      className={className}
      filterValue={filterValue}
      onFilterValueChange={onFilterValueChange}
      filterFn={filterFn}
      onFilteredCountChange={handleFilteredCountChange}
      toolbarEnd={
        <div className="relative">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-haspopup="true"
            className="h-9 rounded-buttons border border-ash bg-canvas-white px-12px text-caption font-medium text-steel hover:border-smoke hover:text-charcoal"
          >
            Columns
            {visibleOptional.size > 0 ? (
              <span className="ml-1 font-mono text-fog">
                +{visibleOptional.size}
              </span>
            ) : null}
          </button>
          {open ? (
            <>
              <button
                type="button"
                className="fixed inset-0 z-10 cursor-default"
                aria-label="Close columns menu"
                onClick={() => setOpen(false)}
              />
              <div
                role="menu"
                className="absolute right-0 z-20 mt-1 w-56 rounded-cards border border-ash bg-canvas-white p-8px shadow-md"
              >
                <p className="px-8px py-1 text-caption font-medium text-fog">
                  Show optional columns
                </p>
                <ul className="flex flex-col">
                  {OPTIONAL_COLUMN_IDS.map((id) => {
                    const checked = visibleOptional.has(id);
                    return (
                      <li key={id}>
                        <label className="flex cursor-pointer items-center gap-8px rounded-lg px-8px py-1.5 text-body text-charcoal hover:bg-paper-mist">
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleOptional(id)}
                            className="size-3.5 accent-electric-blue"
                          />
                          {OPTIONAL_COLUMN_LABELS[id]}
                        </label>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </>
          ) : null}
        </div>
      }
    />
  );
}
