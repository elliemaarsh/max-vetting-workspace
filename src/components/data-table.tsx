"use client";

import { useMemo, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type DataTableColumn<T> = {
  id: string;
  header: string;
  sortable?: boolean;
  /** Plain-text value used for sorting and global filter matching */
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
  /** Optional controls rendered beside the filter (e.g. column visibility). */
  toolbarEnd?: ReactNode;
  /**
   * Optional search text for a row. Defaults to concatenating visible
   * column getValue() results — pass this when optional columns are hidden
   * but should still be searchable.
   */
  getSearchText?: (row: T) => string;
};

export function DataTable<T>({
  data,
  columns,
  getRowId,
  filterPlaceholder = "Filter…",
  emptyMessage = "No rows match the current filter.",
  className,
  toolbarEnd,
  getSearchText,
}: DataTableProps<T>) {
  const [filter, setFilter] = useState("");
  const [sortId, setSortId] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  const filteredSorted = useMemo(() => {
    const q = filter.trim().toLowerCase();
    let rows = data;

    if (q) {
      rows = rows.filter((row) => {
        const haystack = getSearchText
          ? getSearchText(row)
          : columns.map((col) => String(col.getValue(row))).join(" ");
        return haystack.toLowerCase().includes(q);
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
  }, [data, columns, filter, sortId, sortDir, getSearchText]);

  function toggleSort(columnId: string) {
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
        <label className="sr-only" htmlFor="data-table-filter">
          Filter table
        </label>
        <input
          id="data-table-filter"
          type="search"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder={filterPlaceholder}
          className="h-9 w-full max-w-sm rounded-inputs border border-ash bg-canvas-white px-12px text-body text-charcoal placeholder:text-fog focus:border-electric-blue focus:outline-none focus:ring-1 focus:ring-electric-blue"
        />
        <span className="shrink-0 font-mono text-caption text-fog">
          {filteredSorted.length}/{data.length}
        </span>
        {toolbarEnd ? (
          <div className="ml-auto flex items-center gap-8px">{toolbarEnd}</div>
        ) : null}
      </div>

      <div className="overflow-x-auto rounded-cards border border-ash bg-canvas-white shadow-subtle">
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
                        className="inline-flex items-center gap-1 text-slate hover:text-charcoal"
                      >
                        {col.header}
                        <span
                          className={cn(
                            "font-mono text-[10px]",
                            active ? "text-electric-blue" : "text-silver"
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
            {filteredSorted.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-12px py-32px text-center text-body text-fog"
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
