"use client";

import { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { AuditEvent } from "@/data/audit-events";
import { useCasesStore } from "@/store/cases-store";
import { cn } from "@/lib/utils";

type ActorFilter = "all" | "human" | "ai";

const TURNAROUND = [
  { stage: "Vet", days: 2.4 },
  { stage: "Review", days: 1.1 },
  { stage: "QA/QC", days: 0.8 },
  { stage: "Submit", days: 0.5 },
];

const VOLUME = [
  { day: "Mon", volume: 4, threshold: 6 },
  { day: "Tue", volume: 7, threshold: 6 },
  { day: "Wed", volume: 5, threshold: 6 },
  { day: "Thu", volume: 8, threshold: 6 },
  { day: "Fri", volume: 3, threshold: 6 },
];

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

export function ReportsAuditPage() {
  const auditLog = useCasesStore((s) => s.auditLog);
  const [actorFilter, setActorFilter] = useState<ActorFilter>("all");
  const [caseFilter, setCaseFilter] = useState<string>("all");

  const caseOptions = useMemo(
    () =>
      Array.from(
        new Map(auditLog.map((e) => [e.caseId, e.caseName])).entries()
      ).map(([id, name]) => ({ id, name })),
    [auditLog]
  );

  const filtered = useMemo(() => {
    return auditLog
      .filter((e) => {
        if (actorFilter === "human" && e.actorKind !== "human") return false;
        if (actorFilter === "ai" && e.actorKind !== "ai") return false;
        if (caseFilter !== "all" && e.caseId !== caseFilter) return false;
        return true;
      })
      .sort((a, b) => b.timestamp.localeCompare(a.timestamp));
  }, [auditLog, actorFilter, caseFilter]);

  const aiRunCount = auditLog.filter((e) => e.actorKind === "ai").length;

  return (
    <main className="flex flex-1 flex-col">
      <header className="border-b border-ash bg-canvas-white px-24px py-20px">
        <p className="font-mono text-caption text-fog">Reports & Audit</p>
        <h1 className="mt-4px font-display text-heading-sm font-medium tracking-tight text-charcoal">
          Throughput & history
        </h1>
        <p className="mt-4px text-body text-steel">
          Live audit log from shared state — Coverage Scans, risk suggestions,
          confirms, and status changes appear here as you work cases.
        </p>
      </header>

      <div className="space-y-24px p-24px">
        <div className="grid gap-16px lg:grid-cols-2">
          <section className="rounded-cards border border-ash bg-canvas-white p-16px shadow-subtle">
            <p className="mb-12px text-caption font-semibold uppercase tracking-wide text-slate">
              Turnaround (avg days)
            </p>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={TURNAROUND}>
                  <CartesianGrid stroke="#e5e5e5" vertical={false} />
                  <XAxis
                    dataKey="stage"
                    tick={{ fill: "#737373", fontSize: 11 }}
                    axisLine={{ stroke: "#e5e5e5" }}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: "#737373", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                    width={28}
                  />
                  <Tooltip
                    contentStyle={{
                      border: "1px solid #e5e5e5",
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                  />
                  <Bar dataKey="days" fill="#2563eb" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>

          <section className="rounded-cards border border-ash bg-canvas-white p-16px shadow-subtle">
            <p className="mb-12px text-caption font-semibold uppercase tracking-wide text-slate">
              Volume vs threshold
            </p>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={VOLUME}>
                  <CartesianGrid stroke="#e5e5e5" vertical={false} />
                  <XAxis
                    dataKey="day"
                    tick={{ fill: "#737373", fontSize: 11 }}
                    axisLine={{ stroke: "#e5e5e5" }}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: "#737373", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                    width={28}
                  />
                  <Tooltip
                    contentStyle={{
                      border: "1px solid #e5e5e5",
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                  />
                  <Bar dataKey="volume" fill="#404040" radius={[4, 4, 0, 0]} />
                  <Bar
                    dataKey="threshold"
                    fill="#dbeaff"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="mt-8px text-caption text-fog">
              Dark = completed vets · Blue = daily threshold
            </p>
          </section>
        </div>

        <section className="space-y-12px">
          <div className="flex flex-wrap items-end justify-between gap-12px">
            <div>
              <h2 className="text-subheading font-medium text-charcoal">
                Audit log
              </h2>
              <p className="mt-4px text-body text-steel">
                Filter to{" "}
                <span className="font-medium text-charcoal">AI runs</span> for
                past Coverage Scans and risk suggestions ({aiRunCount} AI
                events).
              </p>
            </div>
            <p className="font-mono text-caption text-fog">
              {filtered.length}/{auditLog.length} events
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-8px">
            <div
              className="inline-flex rounded-tags border border-ash bg-paper-mist p-4px"
              role="group"
              aria-label="Actor filter"
            >
              {(
                [
                  { id: "all" as const, label: "All" },
                  { id: "human" as const, label: "Human actions" },
                  { id: "ai" as const, label: "AI runs" },
                ] as const
              ).map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  aria-pressed={actorFilter === opt.id}
                  onClick={() => setActorFilter(opt.id)}
                  className={cn(
                    "rounded-tags px-12px py-1.5 text-caption font-medium transition-colors",
                    actorFilter === opt.id
                      ? "bg-canvas-white text-charcoal shadow-subtle"
                      : "text-steel hover:text-charcoal"
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            <label className="flex items-center gap-8px text-caption text-steel">
              Case
              <select
                value={caseFilter}
                onChange={(e) => setCaseFilter(e.target.value)}
                className="rounded-lg border border-ash bg-canvas-white px-8px py-1.5 text-caption text-charcoal focus:border-electric-blue focus:outline-none"
              >
                <option value="all">All cases</option>
                {caseOptions.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="overflow-x-auto rounded-cards border border-ash bg-canvas-white shadow-subtle">
            <table className="w-full min-w-[720px] border-collapse text-left">
              <thead>
                <tr className="border-b border-ash bg-paper-mist">
                  <th className="px-12px py-2 text-caption font-semibold text-slate">
                    Timestamp
                  </th>
                  <th className="px-12px py-2 text-caption font-semibold text-slate">
                    Case
                  </th>
                  <th className="px-12px py-2 text-caption font-semibold text-slate">
                    Actor
                  </th>
                  <th className="px-12px py-2 text-caption font-semibold text-slate">
                    Action
                  </th>
                  <th className="px-12px py-2 text-caption font-semibold text-slate">
                    Before
                  </th>
                  <th className="px-12px py-2 text-caption font-semibold text-slate">
                    After
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-12px py-24px text-center text-body text-fog"
                    >
                      No events match the current filters.
                    </td>
                  </tr>
                ) : (
                  filtered.map((event) => (
                    <AuditRow key={event.id} event={event} />
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}

function AuditRow({ event }: { event: AuditEvent }) {
  return (
    <tr className="border-b border-ash last:border-b-0">
      <td className="whitespace-nowrap px-12px py-2 font-mono text-caption text-fog">
        {formatTimestamp(event.timestamp)}
      </td>
      <td className="px-12px py-2 text-body text-charcoal">
        <span className="font-medium">{event.caseName}</span>
        <span className="mt-0.5 block font-mono text-[10px] text-fog">
          {event.caseId}
        </span>
      </td>
      <td className="px-12px py-2 text-body text-steel">
        <span className="flex flex-wrap items-center gap-4px">
          {event.actor}
          <span
            className={cn(
              "rounded-tags px-1.5 py-0.5 text-[10px] font-medium",
              event.actorKind === "ai"
                ? "bg-[#dbeaff] text-electric-blue"
                : "bg-paper-mist text-slate"
            )}
          >
            {event.actorKind === "ai" ? "AI" : "Human"}
          </span>
        </span>
      </td>
      <td className="px-12px py-2 text-body text-charcoal">{event.action}</td>
      <td className="px-12px py-2 font-mono text-caption text-fog">
        {event.before}
      </td>
      <td className="px-12px py-2 font-mono text-caption text-steel">
        {event.after}
      </td>
    </tr>
  );
}
