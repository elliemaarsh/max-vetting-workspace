import { CaseQueueSection } from "@/components/case-queue-section";
import { RoleSwitcher } from "@/components/role-switcher";
import { StatusSummaryStrip } from "@/components/status-summary-strip";
import { caseSummaries } from "@/data";

export default function HomeQueuePage() {
  return (
    <main className="flex-1 overflow-auto">
      <header className="flex flex-wrap items-end justify-between gap-16px border-b border-ash bg-canvas-white px-24px py-20px">
        <div className="space-y-4px">
          <p className="font-mono text-caption text-fog">Home / Queue</p>
          <h1 className="font-display text-heading-sm font-medium tracking-tight text-charcoal">
            What needs attention
          </h1>
          <p className="text-body text-steel">
            Cases across the pipeline — sort, filter, and open the next deadline
            first.
          </p>
        </div>
        <RoleSwitcher />
      </header>

      <div className="space-y-24px p-24px">
        <StatusSummaryStrip />
        <CaseQueueSection data={caseSummaries} />
      </div>
    </main>
  );
}
