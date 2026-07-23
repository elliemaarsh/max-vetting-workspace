"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export type DataTableColumn<T> = {
  id: string;
  header: string;
  sortable?: boolean;
  /** Plain-text value used for sorting (and default filtering) */
  getValue: (row: T) => string | number;
  cell: (row: T) => ReactNode;
  headerClassName?: string;
  cellClassName?: string;
};

type SortDir = "asc" | "desc";

type DataTableProps<T> = {
  data: T[];
  columns: DataTableColumn<T>[];
  getRowId: (row: T) => string;
  filterPlaceholder?: string;
  emptyMessage?: string;
  className?: string;
  toolbarEnd?: ReactNode;
  /**
   * Custom live filter. `queryLower` is already trimmed + lowercased.
   * When omitted, matches against visible column getValue().
   */
  filterFn?: (row: T, queryLower: string) => boolean;
  /** Controlled filter text (parent owns state). */
  filterValue: string;
  onFilterValueChange: (value: string) => void;
  /** Fires whenever the filtered row count changes (for parent counters). */
  onFilteredCountChange?: (filtered: number, total: number) => void;
  /**
   * Loading skeleton — keeps filter + column headers visible
   * (design-system empty/loading rule).
   */
  loading?: boolean;
  /** Skeleton row count while loading (default 5). */
  loadingRowCount?: number;
};

export function DataTable<T>({
  data,
  columns,
  getRowId,
  filterPlaceholder = "Filter…",
  emptyMessage = "No rows match the current filter.",
  className,
  toolbarEnd,
  filterFn,
  filterValue,
  onFilterValueChange,
  onFilteredCountChange,
  loading = false,
  loadingRowCount = 5,
}: DataTableProps<T>) {
  const [sortId, setSortId] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  const filteredSorted = useMemo(() => {
    const q = filterValue.trim().toLowerCase();
    let rows = data;

    if (q) {
      rows = data.filter((row) => {
        if (filterFn) return filterFn(row, q);
        return columns.some((col) =>
          String(col.getValue(row)).toLowerCase().includes(q)
        );
      });
    }

    if (sortId) {
      const col = columns.find((c) => c.id === sortId);
      if (col) {
        rows = [...rows].sort((a, b) => {
          const av = col.getValue(a);
          const bv = col.getValue(b);
          let cmp = 0;
          if (typeof av === "number" && typeof bv === "number") {
            cmp = av - bv;
          } else {
            cmp = String(av).localeCompare(String(bv), undefined, {
              numeric: true,
              sensitivity: "base",
            });
          }
          return sortDir === "asc" ? cmp : -cmp;
        });
      }
    }

    return rows;
  }, [data, columns, filterValue, sortId, sortDir, filterFn]);

  useEffect(() => {
    if (loading) return;
    onFilteredCountChange?.(filteredSorted.length, data.length);
  }, [filteredSorted.length, data.length, onFilteredCountChange, loading]);

  function toggleSort(columnId: string) {
    if (loading) return;
    if (sortId === columnId) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortId(columnId);
      setSortDir("asc");
    }
  }

  return (
    <div className={cn("space-y-12px", className)}>
      <div className="flex flex-wrap items-center gap-8px">
        <label className="sr-only" htmlFor="case-queue-filter">
          Filter table
        </label>
        <input
          id="case-queue-filter"
          type="text"
          value={filterValue}
          onChange={(e) => onFilterValueChange(e.target.value)}
          placeholder={filterPlaceholder}
          autoComplete="off"
          disabled={loading}
          className="h-9 w-full max-w-sm rounded-inputs border border-ash bg-canvas-white px-12px text-body text-charcoal placeholder:text-steel/70 focus:border-electric-blue focus:outline-none focus:ring-1 focus:ring-electric-blue disabled:cursor-not-allowed disabled:bg-paper-mist disabled:text-steel"
        />
        <span className="shrink-0 font-mono text-caption text-steel">
          {loading ? "…" : `${filteredSorted.length}/${data.length}`}
        </span>
        {toolbarEnd ? (
          <div
            className={cn(
              "ml-auto flex items-center gap-8px",
              loading && "pointer-events-none opacity-60"
            )}
          >
            {toolbarEnd}
          </div>
        ) : null}
      </div>

      <div
        className="overflow-x-auto rounded-cards border border-ash bg-canvas-white shadow-subtle"
        aria-busy={loading || undefined}
      >
        <table className="w-full min-w-[640px] border-collapse text-left text-body">
          <thead>
            <tr className="border-b border-ash bg-paper-mist">
              {columns.map((col) => {
                const active = sortId === col.id;
                return (
                  <th
                    key={col.id}
                    scope="col"
                    className={cn(
                      "px-12px py-2 text-caption font-semibold uppercase tracking-wide text-slate",
                      col.headerClassName
                    )}
                  >
                    {col.sortable !== false ? (
                      <button
                        type="button"
                        onClick={() => toggleSort(col.id)}
                        disabled={loading}
                        className="inline-flex items-center gap-1 text-slate hover:text-charcoal disabled:cursor-not-allowed"
                      >
                        {col.header}
                        <span
                          className={cn(
                            "font-mono text-[10px]",
                            active ? "text-electric-blue" : "text-fog"
                          )}
                          aria-hidden="true"
                        >
                          {active ? (sortDir === "asc" ? "↑" : "↓") : "↕"}
                        </span>
                      </button>
                    ) : (
                      col.header
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: loadingRowCount }).map((_, rowIdx) => (
                <tr
                  key={`skeleton-${rowIdx}`}
                  className="border-b border-ash last:border-b-0"
                >
                  {columns.map((col) => (
                    <td
                      key={col.id}
                      className={cn("px-12px py-3", col.cellClassName)}
                    >
                      <Skeleton className="h-3.5 w-full max-w-[9rem]" />
                    </td>
                  ))}
                </tr>
              ))
            ) : filteredSorted.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-12px py-32px text-center text-body text-steel"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              filteredSorted.map((row) => (
                <tr
                  key={getRowId(row)}
                  className="border-b border-ash last:border-b-0 hover:bg-paper-mist/60"
                >
                  {columns.map((col) => (
                    <td
                      key={col.id}
                      className={cn(
                        "px-12px py-2 text-charcoal",
                        col.cellClassName
                      )}
                    >
                      {col.cell(row)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
