import {
  CASE_STATUS_ORDER,
  StatusBadge,
} from "@/components/status-badge";
import { RiskLevelSelectorGallery } from "@/components/risk-level-selector-gallery";
import { CitationAndAIOutputGallery } from "@/components/citation-ai-gallery";
import { DataTableGallery } from "@/components/data-table-gallery";

/**
 * Storybook-style component gallery for shared UI primitives.
 * Not a product screen — for visual QA during the build sequence.
 */
export default function ComponentsPage() {
  return (
    <main className="min-h-screen bg-canvas-white p-32px">
      <div className="mx-auto max-w-page space-y-48px">
        <header className="space-y-8px border-b border-ash pb-16px">
          <p className="font-mono text-caption text-fog">/components</p>
          <h1 className="font-display text-heading-sm font-medium tracking-tight text-charcoal">
            Component gallery
          </h1>
          <p className="text-body text-steel">
            Shared primitives for visual review. Color is never the only status
            signal — every badge includes a text label. Risk Level is never
            AI-final — humans confirm. AI output never auto-commits.
          </p>
        </header>

        <section className="space-y-16px">
          <div className="space-y-4px">
            <h2 className="text-subheading font-medium text-charcoal">
              StatusBadge
            </h2>
            <p className="text-body text-steel">
              Dub pattern: tinted pill, colored dot, dark label. One style per{" "}
              <code className="font-mono text-caption text-graphite">
                CaseStatus
              </code>
              .
            </p>
          </div>

          <div className="rounded-cards border border-ash bg-canvas-white p-24px shadow-subtle">
            <ul className="flex flex-col gap-12px">
              {CASE_STATUS_ORDER.map((status) => (
                <li
                  key={status}
                  className="flex flex-wrap items-center justify-between gap-12px border-b border-ash pb-12px last:border-b-0 last:pb-0"
                >
                  <code className="font-mono text-caption text-fog">
                    {status}
                  </code>
                  <StatusBadge status={status} />
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-cards border border-ash bg-paper-mist p-24px">
            <p className="mb-12px text-caption font-medium text-slate">
              Inline row (table density)
            </p>
            <div className="flex flex-wrap gap-8px">
              {CASE_STATUS_ORDER.map((status) => (
                <StatusBadge key={status} status={status} />
              ))}
            </div>
          </div>
        </section>

        <section>
          <RiskLevelSelectorGallery />
        </section>

        <section>
          <CitationAndAIOutputGallery />
        </section>

        <section>
          <DataTableGallery />
        </section>
      </div>
    </main>
  );
}
