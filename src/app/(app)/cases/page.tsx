"use client";

import Link from "next/link";
import { StatusBadge } from "@/components/status-badge";
import { useCasesStore } from "@/store/cases-store";

export default function CasesIndexPage() {
  const fullCases = useCasesStore((s) => s.fullCases);
  const cases = Object.values(fullCases);

  return (
    <main className="flex flex-1 flex-col">
      <header className="border-b border-ash bg-canvas-white px-24px py-20px">
        <p className="font-mono text-caption text-fog">Case Workspace</p>
        <h1 className="mt-4px font-display text-heading-sm font-medium tracking-tight text-charcoal">
          Open a case
        </h1>
        <p className="mt-4px text-body text-steel">
          Full workspace for demo fixtures — status reflects live shared state.
        </p>
      </header>

      <div className="space-y-16px p-24px">
        <ul className="grid gap-12px sm:grid-cols-2">
          {cases.map((c) => (
            <li key={c.id}>
              <Link
                href={`/cases/${c.id}`}
                className="block rounded-cards border border-ash bg-canvas-white p-16px shadow-subtle transition-colors hover:border-smoke hover:bg-paper-mist"
              >
                <div className="flex flex-wrap items-center justify-between gap-8px">
                  <p className="font-display text-subheading font-medium tracking-tight text-charcoal">
                    {c.influencerName}
                  </p>
                  <StatusBadge status={c.status} />
                </div>
                <p className="mt-8px text-body text-steel">
                  {c.market} · {c.engagement}
                </p>
                <p className="mt-4px font-mono text-caption text-fog">{c.id}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
