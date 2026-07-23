import Link from "next/link";
import { StatusBadge } from "@/components/status-badge";
import { listFullCases } from "@/lib/cases";

export default function CasesIndexPage() {
  const cases = listFullCases();

  return (
    <main className="flex flex-1 flex-col">
      <header className="border-b border-ash bg-canvas-white px-24px py-20px">
        <p className="font-mono text-caption text-fog">Case Workspace</p>
        <h1 className="mt-4px font-display text-heading-sm font-medium tracking-tight text-charcoal">
          Open a case
        </h1>
        <p className="mt-4px text-body text-steel">
          Full workspace (Overview, Evidence, Scorecard) for demo fixtures with
          complete scorecards.
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

        <p className="text-caption text-fog">
          Queue-only rows on Home link here when a full fixture exists; others
          stay queue-only until scorecard data is added.
        </p>
      </div>
    </main>
  );
}
