import type { ReactNode } from "react";
import { StatusBadge } from "@/components/status-badge";
import {
  DEADLINE_FIELD_LABELS,
  formatDeadlineLabel,
  getDeadlineUrgency,
  getNextDeadline,
  getNextDeadlineField,
  type DeadlineField,
} from "@/lib/deadline";
import { cn } from "@/lib/utils";
import type { Case } from "@/types";

type CaseOverviewProps = {
  caseData: Case;
};

function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-4px">
      <dt className="text-caption font-medium text-fog">{label}</dt>
      <dd className="text-body text-charcoal">{children}</dd>
    </div>
  );
}

function DeadlineRow({
  field,
  value,
  isNext,
}: {
  field: DeadlineField;
  value: string;
  isNext: boolean;
}) {
  const urgency = getDeadlineUrgency(value);
  return (
    <div
      className={cn(
        "flex items-baseline justify-between gap-12px border-b border-ash py-2 last:border-b-0",
        isNext && "bg-[#dbeaff]/40 -mx-8px rounded-lg px-8px"
      )}
    >
      <span className="text-caption text-steel">
        {DEADLINE_FIELD_LABELS[field]}
        {isNext ? (
          <span className="ml-1 font-mono text-[10px] text-electric-blue">
            next
          </span>
        ) : null}
      </span>
      <span
        className={cn(
          "font-mono text-caption",
          urgency === "overdue" && "font-medium text-[#e11d48]",
          urgency === "due_today" && "font-medium text-[#d97706]",
          urgency === "on_track" && "text-charcoal"
        )}
      >
        {formatDeadlineLabel(value)}
      </span>
    </div>
  );
}

export function CaseOverview({ caseData }: CaseOverviewProps) {
  const nextField = getNextDeadlineField(caseData.status);
  const nextDeadline = getNextDeadline(caseData);

  return (
    <div className="space-y-24px">
      <div>
        <h2 className="text-subheading font-medium text-charcoal">Overview</h2>
        <p className="mt-4px text-body text-steel">
          Case identity, assignment, and stage deadlines — full detail lives
          here regardless of queue column visibility.
        </p>
      </div>

      <div className="grid gap-16px lg:grid-cols-2">
        {/* Identity */}
        <section className="rounded-cards border border-ash bg-canvas-white p-16px shadow-subtle">
          <p className="mb-12px text-caption font-semibold uppercase tracking-wide text-slate">
            Influencer
          </p>
          <dl className="space-y-16px">
            <Field label="Name">
              <span className="font-display text-heading-sm font-medium tracking-tight">
                {caseData.influencerName}
              </span>
            </Field>
            <Field label="Market">{caseData.market}</Field>
            <Field label="Language">{caseData.language}</Field>
            <Field label="Engagement">{caseData.engagement}</Field>
            <Field label="Re-vet">
              {caseData.isRevet ? (
                <span>
                  Yes
                  {caseData.revetDate ? (
                    <span className="text-steel">
                      {" "}
                      — prior vet {formatDeadlineLabel(caseData.revetDate)}
                    </span>
                  ) : null}
                  {caseData.lastVetDate && !caseData.revetDate ? (
                    <span className="text-steel">
                      {" "}
                      — last vet {formatDeadlineLabel(caseData.lastVetDate)}
                    </span>
                  ) : null}
                </span>
              ) : (
                <span className="text-steel">No — first vet</span>
              )}
            </Field>
            <Field label="Status">
              <StatusBadge status={caseData.status} />
            </Field>
            <Field label="Effort">
              <span className="font-mono text-caption">{caseData.effort}</span>
            </Field>
          </dl>
        </section>

        {/* Team + deadlines */}
        <div className="space-y-16px">
          <section className="rounded-cards border border-ash bg-canvas-white p-16px shadow-subtle">
            <p className="mb-12px text-caption font-semibold uppercase tracking-wide text-slate">
              Assigned team
            </p>
            <dl className="space-y-16px">
              <Field label="Analyst">{caseData.assignedAnalyst}</Field>
              <Field label="Reviewer">{caseData.assignedReviewer}</Field>
              <Field label="QA/QC">{caseData.assignedQAQC}</Field>
            </dl>
          </section>

          <section className="rounded-cards border border-ash bg-canvas-white p-16px shadow-subtle">
            <p className="mb-12px text-caption font-semibold uppercase tracking-wide text-slate">
              Stage deadlines
            </p>
            {!nextDeadline ? (
              <p className="mb-8px text-caption text-fog">
                No active next deadline for this status.
              </p>
            ) : null}
            <div>
              {(
                [
                  "vettingDeadline",
                  "reviewDeadline",
                  "qaqcDeadline",
                  "submissionDeadline",
                ] as DeadlineField[]
              ).map((field) => (
                <DeadlineRow
                  key={field}
                  field={field}
                  value={caseData[field]}
                  isNext={field === nextField}
                />
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Confirmed channels */}
      <section className="rounded-cards border border-ash bg-canvas-white p-16px shadow-subtle">
        <p className="mb-12px text-caption font-semibold uppercase tracking-wide text-slate">
          Social channels confirmed
        </p>
        {caseData.socialProfiles.length === 0 ? (
          <p className="text-body text-fog">No channels on this case.</p>
        ) : (
          <ul className="flex flex-wrap gap-8px">
            {caseData.socialProfiles.map((profile) => (
              <li
                key={profile.platform}
                className="inline-flex items-center gap-8px rounded-tags border border-ash bg-paper-mist px-16px py-1.5"
              >
                <span className="text-caption font-semibold text-charcoal">
                  {profile.platform}
                </span>
                <span
                  className="select-none text-caption text-ash"
                  aria-hidden="true"
                >
                  ·
                </span>
                <span className="font-mono text-caption font-normal text-steel">
                  {profile.handle}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
