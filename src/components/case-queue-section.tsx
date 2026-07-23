"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  CaseSummaryTable,
  matchesCaseQueueFilter,
} from "@/components/case-summary-table";
import type { CaseSummary } from "@/types";

type CaseQueueSectionProps = {
  data: CaseSummary[];
};

/**
 * Owns filter state so the input, row list, and X/Y counter share one value.
 * Brief loading skeleton on mount demonstrates empty/loading header preservation.
 */
export function CaseQueueSection({ data }: CaseQueueSectionProps) {
  const [filterValue, setFilterValue] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = window.setTimeout(() => setLoading(false), 450);
    return () => window.clearTimeout(t);
  }, []);

  const filteredCount = useMemo(() => {
    const q = filterValue.trim().toLowerCase();
    if (!q) return data.length;
    return data.filter((row) => matchesCaseQueueFilter(row, q)).length;
  }, [data, filterValue]);

  const handleFilterValueChange = useCallback((value: string) => {
    setFilterValue(value);
  }, []);

  return (
    <section className="space-y-12px">
      <div className="flex flex-wrap items-baseline justify-between gap-8px">
        <h2 className="text-subheading font-medium text-charcoal">
          Case queue
        </h2>
        <p className="font-mono text-caption text-steel">
          {loading ? "…" : `${filteredCount}/${data.length}`} cases
        </p>
      </div>
      <CaseSummaryTable
        data={data}
        filterValue={filterValue}
        onFilterValueChange={handleFilterValueChange}
        loading={loading}
      />
    </section>
  );
}
