"use client";

import { useMemo } from "react";
import { useCasesStore } from "@/store/cases-store";
import { cn } from "@/lib/utils";

type Props = { caseId: string };

function formatTimestamp(iso: string): string {
  try {
    return (
      new Date(iso).toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "UTC",
      }) + " UTC"
    );
  } catch {
    return iso;
  }
}

export function CaseActivity({ caseId }: Props) {
  const caseData = useCasesStore((s) => s.fullCases[caseId]);
  const auditLog = useCasesStore((s) => s.auditLog);

  const events = useMemo(
    () =>
      auditLog
        .filter((e) => e.caseId === caseId)
        .sort((a, b) => b.timestamp.localeCompare(a.timestamp)),
    [auditLog, caseId]
  );

  if (!caseData) return null;

  return (
    <div className="space-y-16px">
      <div>
        <h2 className="text-subheading font-medium text-charcoal">Activity</h2>
        <p className="mt-4px text-body text-steel">
          Case-scoped history from shared audit state — status changes, AI runs,
          and risk confirms for {caseData.influencerName}.
        </p>
      </div>

      {events.length === 0 ? (
        <p className="rounded-cards border border-dashed border-ash bg-canvas-white px-24px py-16px text-center text-body text-fog">
          No activity recorded for this case yet.
        </p>
      ) : (
        <ul className="space-y-8px">
          {events.map((event) => (
            <li
              key={event.id}
              className="rounded-cards border border-ash bg-canvas-white p-16px shadow-subtle"
            >
              <div className="flex flex-wrap items-center justify-between gap-8px">
                <div className="flex flex-wrap items-center gap-8px">
                  <span className="text-body font-medium text-charcoal">
                    {event.action}
                  </span>
                  <span
                    className={cn(
                      "rounded-tags px-2 py-0.5 text-caption font-medium",
                      event.actorKind === "ai"
                        ? "bg-[#dbeaff] text-electric-blue"
                        : "bg-paper-mist text-slate"
                    )}
                  >
                    {event.actorKind === "ai" ? "AI" : "Human"}
                  </span>
                </div>
                <span className="font-mono text-caption text-fog">
                  {formatTimestamp(event.timestamp)}
                </span>
              </div>
              <p className="mt-8px text-body text-steel">
                {event.actor}
                <span className="text-fog"> · </span>
                <span className="font-mono text-caption">{event.before}</span>
                <span className="text-fog"> → </span>
                <span className="font-mono text-caption text-charcoal">
                  {event.after}
                </span>
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
