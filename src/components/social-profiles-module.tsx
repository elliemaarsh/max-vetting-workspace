"use client";

import { useMemo, useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import type { SocialProfile } from "@/types";
import { formatCount, formatPercent } from "@/lib/format";
import { cn } from "@/lib/utils";

type SocialProfilesModuleProps = {
  profiles: SocialProfile[];
  className?: string;
};

type Feedback = "up" | "down" | null;

const CREDIBILITY_COLORS = {
  credible: "#16a34a",
  remainder: "#e5e5e5",
};

const AUDIENCE_TYPE_COLORS: Record<string, string> = {
  Influencers: "#2563eb",
  "Mass followers": "#737373",
  Suspicious: "#ea580c",
};

function StatRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-baseline justify-between gap-8px border-b border-ash py-2 last:border-b-0">
      <span className="text-caption text-steel">{label}</span>
      <span className="font-mono text-caption font-medium text-charcoal">
        {value}
      </span>
    </div>
  );
}

function HorizontalBarRow({
  label,
  value,
  max = 100,
  color = "#2563eb",
}: {
  label: string;
  value: number;
  max?: number;
  color?: string;
}) {
  const width = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div className="space-y-1">
      <div className="flex items-baseline justify-between gap-8px">
        <span className="text-caption text-steel">{label}</span>
        <span className="font-mono text-caption text-charcoal">
          {formatPercent(value)}
        </span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-paper-mist">
        <div
          className="h-full rounded-full"
          style={{ width: `${width}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}

function NotAvailable() {
  return (
    <p className="rounded-cards border border-dashed border-ash bg-paper-mist px-12px py-16px text-center text-body text-fog">
      Not available for this platform
    </p>
  );
}

function CredibilityDonut({ percent }: { percent: number }) {
  const data = [
    { name: "Credible", value: percent },
    { name: "Other", value: Math.max(0, 100 - percent) },
  ];

  return (
    <div className="flex flex-col items-center gap-8px sm:items-start">
      <div className="h-40 w-40 shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={48}
              outerRadius={72}
              startAngle={90}
              endAngle={-270}
              strokeWidth={0}
            >
              <Cell fill={CREDIBILITY_COLORS.credible} />
              <Cell fill={CREDIBILITY_COLORS.remainder} />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="text-center sm:text-left">
        <p className="font-display text-heading-sm font-medium tracking-tight text-charcoal">
          {formatPercent(percent)}
        </p>
        <p className="text-caption text-steel">Audience credibility</p>
      </div>
    </div>
  );
}

function GrowthChart({ profile }: { profile: SocialProfile }) {
  const data = useMemo(
    () =>
      profile.growthSeries.map((point) => ({
        month: point.month.replace(/^\w{3} /, ""), // shorten "Nov 2025" → keep readable
        label: point.month,
        followers: point.followers,
        engagementRate: point.engagementRate,
      })),
    [profile.growthSeries]
  );

  return (
    <div className="h-48 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid stroke="#e5e5e5" strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="month"
            tick={{ fill: "#737373", fontSize: 11 }}
            axisLine={{ stroke: "#e5e5e5" }}
            tickLine={false}
          />
          <YAxis
            yAxisId="followers"
            tick={{ fill: "#737373", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v: number) => formatCount(v)}
            width={40}
          />
          <YAxis
            yAxisId="eng"
            orientation="right"
            tick={{ fill: "#737373", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v: number) => `${v}%`}
            width={36}
          />
          <Tooltip
            contentStyle={{
              border: "1px solid #e5e5e5",
              borderRadius: 8,
              fontSize: 12,
            }}
            formatter={(value: number, name: string) =>
              name === "followers"
                ? [formatCount(value), "Followers"]
                : [`${value}%`, "Engagement"]
            }
            labelFormatter={(label) => String(label)}
          />
          <Legend
            wrapperStyle={{ fontSize: 11, color: "#525252" }}
            formatter={(value) =>
              value === "followers" ? "Followers" : "Eng. rate"
            }
          />
          <Line
            yAxisId="followers"
            type="monotone"
            dataKey="followers"
            stroke="#2563eb"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 3 }}
          />
          <Line
            yAxisId="eng"
            type="monotone"
            dataKey="engagementRate"
            stroke="#16a34a"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

function CreatorInsights({ summary }: { summary: string }) {
  const [feedback, setFeedback] = useState<Feedback>(null);

  return (
    <div className="space-y-8px rounded-cards border border-ash bg-paper-mist p-16px">
      <div className="flex flex-wrap items-center justify-between gap-8px">
        <span className="rounded-tags bg-[#dbeaff] px-2 py-0.5 text-caption font-medium text-electric-blue">
          AI-generated · Creator Insights
        </span>
        <div className="flex items-center gap-4px">
          <button
            type="button"
            aria-label="Thumbs up"
            aria-pressed={feedback === "up"}
            onClick={() => setFeedback((f) => (f === "up" ? null : "up"))}
            className={cn(
              "rounded-lg p-1.5 transition-colors",
              feedback === "up"
                ? "bg-soft-mint text-vivid-green"
                : "text-fog hover:bg-canvas-white hover:text-charcoal"
            )}
          >
            <ThumbsUp className="size-3.5" />
          </button>
          <button
            type="button"
            aria-label="Thumbs down"
            aria-pressed={feedback === "down"}
            onClick={() => setFeedback((f) => (f === "down" ? null : "down"))}
            className={cn(
              "rounded-lg p-1.5 transition-colors",
              feedback === "down"
                ? "bg-[#fee2e2] text-[#dc2626]"
                : "text-fog hover:bg-canvas-white hover:text-charcoal"
            )}
          >
            <ThumbsDown className="size-3.5" />
          </button>
        </div>
      </div>
      <p className="text-body text-slate">{summary}</p>
      <p className="text-caption text-fog">
        Inference only — not verified fact. Feedback helps improve drafts.
      </p>
    </div>
  );
}

function ProfilePanel({ profile }: { profile: SocialProfile }) {
  const hasCredibility = profile.audienceCredibility !== undefined;
  const hasAudienceType = profile.audienceType !== undefined;
  const hasReachability =
    profile.audienceReachability !== undefined &&
    Object.keys(profile.audienceReachability).length > 0;

  return (
    <div className="space-y-24px">
      {/* Identity + core stats */}
      {/* Channel stats */}
      <div className="rounded-cards border border-ash bg-canvas-white p-16px">
        <p className="mb-8px text-caption font-semibold uppercase tracking-wide text-slate">
          Channel stats
        </p>
        <StatRow
          label="Followers"
          value={formatCount(profile.followerCount)}
        />
        {profile.followingCount !== undefined && (
          <StatRow
            label="Following"
            value={formatCount(profile.followingCount)}
          />
        )}
        {profile.postCount !== undefined && (
          <StatRow label="Posts" value={formatCount(profile.postCount)} />
        )}
        <StatRow label="Posting frequency" value={profile.postingFrequency} />
        <StatRow
          label="Engagement rate"
          value={formatPercent(profile.engagementRate.total)}
        />
        {profile.engagementRate.image !== undefined && (
          <StatRow
            label="Eng. rate (image)"
            value={formatPercent(profile.engagementRate.image)}
          />
        )}
        {profile.engagementRate.video !== undefined && (
          <StatRow
            label="Eng. rate (video)"
            value={formatPercent(profile.engagementRate.video)}
          />
        )}
        {profile.avgLikes !== undefined && (
          <StatRow label="Avg. likes" value={formatCount(profile.avgLikes)} />
        )}
        {profile.avgComments !== undefined && (
          <StatRow
            label="Avg. comments"
            value={formatCount(profile.avgComments)}
          />
        )}
        {profile.videoViewRate !== undefined && (
          <StatRow
            label="Video view rate"
            value={formatPercent(profile.videoViewRate)}
          />
        )}
      </div>

      {/* Credibility + audience type (merged) */}
      <div className="rounded-cards border border-ash bg-canvas-white p-16px">
        <p className="mb-12px text-caption font-semibold uppercase tracking-wide text-slate">
          Audience credibility & type
        </p>
        {hasCredibility && hasAudienceType ? (
          <div className="flex flex-col gap-24px sm:flex-row sm:items-center">
            <div className="shrink-0 sm:pr-8px">
              <CredibilityDonut percent={profile.audienceCredibility!} />
            </div>
            <div className="min-w-0 flex-1 space-y-12px">
              <HorizontalBarRow
                label="Influencers"
                value={profile.audienceType!.influencers}
                color={AUDIENCE_TYPE_COLORS.Influencers}
              />
              <HorizontalBarRow
                label="Mass followers"
                value={profile.audienceType!.massFollowers}
                color={AUDIENCE_TYPE_COLORS["Mass followers"]}
              />
              <HorizontalBarRow
                label="Suspicious"
                value={profile.audienceType!.suspicious}
                color={AUDIENCE_TYPE_COLORS.Suspicious}
              />
            </div>
          </div>
        ) : (
          <NotAvailable />
        )}
      </div>

      {/* Reachability */}
      <div className="rounded-cards border border-ash bg-canvas-white p-16px">
        <p className="mb-12px text-caption font-semibold uppercase tracking-wide text-slate">
          Audience reachability
        </p>
        {hasReachability ? (
          <div className="space-y-12px">
            {Object.entries(profile.audienceReachability!).map(
              ([band, value]) => (
                <HorizontalBarRow
                  key={band}
                  label={band}
                  value={value}
                  color="#404040"
                />
              )
            )}
          </div>
        ) : (
          <NotAvailable />
        )}
      </div>

      {/* Growth */}
      <div className="rounded-cards border border-ash bg-canvas-white p-16px">
        <p className="mb-12px text-caption font-semibold uppercase tracking-wide text-slate">
          Audience growth
        </p>
        <GrowthChart profile={profile} />
      </div>

      {/* Tags + brands */}
      <div className="grid gap-16px md:grid-cols-2">
        <div className="rounded-cards border border-ash bg-canvas-white p-16px">
          <p className="mb-12px text-caption font-semibold uppercase tracking-wide text-slate">
            Content tags
          </p>
          {profile.contentTags.length === 0 ? (
            <p className="text-body text-fog">No tags</p>
          ) : (
            <div className="flex flex-wrap gap-8px">
              {profile.contentTags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-tags bg-paper-mist px-8px py-1 text-caption font-medium text-slate"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-cards border border-ash bg-canvas-white p-16px">
          <p className="mb-12px text-caption font-semibold uppercase tracking-wide text-slate">
            Brand mentions
          </p>
          <div className="space-y-12px">
            <div>
              <p className="mb-4px text-caption text-fog">Organic</p>
              {profile.brandsOrganic.length === 0 ? (
                <p className="text-caption text-silver">None</p>
              ) : (
                <div className="flex flex-wrap gap-8px">
                  {profile.brandsOrganic.map((b) => (
                    <span
                      key={b}
                      className="rounded-tags border border-ash px-8px py-1 text-caption text-charcoal"
                    >
                      {b}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div>
              <p className="mb-4px text-caption text-fog">Paid / sponsored</p>
              {profile.brandsPaid.length === 0 ? (
                <p className="text-caption text-silver">None</p>
              ) : (
                <div className="flex flex-wrap gap-8px">
                  {profile.brandsPaid.map((b) => (
                    <span
                      key={b}
                      className="rounded-tags bg-[#fff7ed] px-8px py-1 text-caption font-medium text-tangerine"
                    >
                      {b}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <CreatorInsights summary={profile.aiInsightSummary} />
    </div>
  );
}

/**
 * Social Profiles & Audience Stats — PRD §4.2.1.
 * Platform tabs; N/A fields show "Not available for this platform".
 */
export function SocialProfilesModule({
  profiles,
  className,
}: SocialProfilesModuleProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = profiles[activeIndex] ?? profiles[0];

  if (!profiles.length || !active) {
    return (
      <div
        className={cn(
          "rounded-cards border border-dashed border-ash p-24px text-center text-body text-fog",
          className
        )}
      >
        No social profiles on this case.
      </div>
    );
  }

  return (
    <div className={cn("space-y-16px", className)}>
      <div className="flex flex-wrap items-end justify-between gap-12px">
        <div>
          <h3 className="text-subheading font-medium text-charcoal">
            Social Profiles & Audience Stats
          </h3>
          <p className="text-body text-steel">
            Confirmed channels for this creator — stats feed Strategic Fit.
          </p>
        </div>
        <p className="font-mono text-caption text-fog">
          {active.handle}
        </p>
      </div>

      <div
        className="flex flex-wrap gap-4px rounded-tags border border-ash bg-paper-mist p-4px"
        role="tablist"
        aria-label="Social platforms"
      >
        {profiles.map((profile, index) => {
          const selected = index === activeIndex;
          return (
            <button
              key={profile.platform}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setActiveIndex(index)}
              className={cn(
                "rounded-tags px-12px py-1.5 text-caption font-medium transition-colors",
                selected
                  ? "bg-canvas-white text-charcoal shadow-subtle"
                  : "text-steel hover:text-charcoal"
              )}
            >
              {profile.platform}
            </button>
          );
        })}
      </div>

      <div role="tabpanel">
        <ProfilePanel profile={active} />
      </div>
    </div>
  );
}
