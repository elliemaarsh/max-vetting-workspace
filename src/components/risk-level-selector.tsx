"use client";

import { cn } from "@/lib/utils";

export type RiskLevelState = "unset" | "ai_suggested" | "confirmed";
export type RiskValue = "green" | "yellow" | "red";

export const RISK_VALUES: RiskValue[] = ["green", "yellow", "red"];

const RISK_VALUE_CONFIG: Record<
  RiskValue,
  { label: string; swatch: string; selectedSolid: string; selectedOutline: string }
> = {
  green: {
    label: "Green",
    swatch: "bg-vivid-green",
    selectedSolid:
      "border-vivid-green bg-soft-mint text-charcoal ring-1 ring-vivid-green/30",
    selectedOutline: "border-vivid-green text-charcoal",
  },
  yellow: {
    label: "Yellow",
    swatch: "bg-[#d97706]",
    selectedSolid:
      "border-[#d97706] bg-[#fef3c7] text-charcoal ring-1 ring-[#d97706]/30",
    selectedOutline: "border-[#d97706] text-charcoal",
  },
  red: {
    label: "Red",
    swatch: "bg-[#dc2626]",
    selectedSolid:
      "border-[#dc2626] bg-[#fee2e2] text-charcoal ring-1 ring-[#dc2626]/30",
    selectedOutline: "border-[#dc2626] text-charcoal",
  },
};

export type RiskLevelChange = {
  riskLevel: RiskLevelState;
  riskValue?: RiskValue;
};

type RiskLevelSelectorProps = {
  riskLevel: RiskLevelState;
  riskValue?: RiskValue;
  riskReasoning?: string;
  onChange: (next: RiskLevelChange) => void;
  className?: string;
  /** Optional section label for a11y when multiple selectors are on a page */
  label?: string;
};

/**
 * Human-owned risk control. AI may suggest; only a human click confirms.
 * - unset: empty, neutral, requires a human selection
 * - ai_suggested: dashed border + "AI-suggested" + reasoning; one click confirms
 * - confirmed: solid, final-looking
 */
export function RiskLevelSelector({
  riskLevel,
  riskValue,
  riskReasoning,
  onChange,
  className,
  label = "Risk Level",
}: RiskLevelSelectorProps) {
  const isUnset = riskLevel === "unset";
  const isSuggested = riskLevel === "ai_suggested";
  const isConfirmed = riskLevel === "confirmed";

  function selectValue(next: RiskValue) {
    // Any human click on a value becomes confirmed (including confirming a suggestion).
    onChange({ riskLevel: "confirmed", riskValue: next });
  }

  function confirmSuggestion() {
    if (riskValue) {
      onChange({ riskLevel: "confirmed", riskValue });
    }
  }

  return (
    <div
      className={cn(
        "rounded-cards p-16px transition-colors",
        isUnset && "border border-ash bg-paper-mist",
        isSuggested && "border border-dashed border-electric-blue bg-[#eff6ff]",
        isConfirmed && "border border-ash bg-canvas-white",
        className
      )}
      data-risk-level={riskLevel}
      data-risk-value={riskValue ?? "none"}
    >
      <div className="mb-12px flex flex-wrap items-center justify-between gap-8px">
        <div className="flex flex-wrap items-center gap-8px">
          <p className="text-caption font-semibold uppercase tracking-wide text-slate">
            {label}
          </p>
          {isSuggested && (
            <span className="rounded-tags border border-dashed border-electric-blue bg-canvas-white px-2 py-0.5 text-caption font-medium text-electric-blue">
              AI-suggested
            </span>
          )}
          {isConfirmed && (
            <span className="rounded-tags bg-soft-mint px-2 py-0.5 text-caption font-medium text-vivid-green">
              Confirmed
            </span>
          )}
          {isUnset && (
            <span className="rounded-tags bg-canvas-white px-2 py-0.5 text-caption font-medium text-fog">
              Unset — human required
            </span>
          )}
        </div>

        {isSuggested && riskValue && (
          <button
            type="button"
            onClick={confirmSuggestion}
            className="rounded-buttons bg-primary-action px-12px py-1.5 text-caption font-medium text-canvas-white hover:bg-midnight-ink"
          >
            Confirm {RISK_VALUE_CONFIG[riskValue].label}
          </button>
        )}
      </div>

      {isUnset && (
        <p className="mb-12px text-body text-steel">
          No risk level set. Select green, yellow, or red — AI cannot fill this
          field.
        </p>
      )}

      {isSuggested && riskReasoning && (
        <p className="mb-12px text-body text-slate">
          <span className="font-medium text-charcoal">Reasoning: </span>
          {riskReasoning}
        </p>
      )}

      <div
        className="flex flex-wrap gap-8px"
        role="group"
        aria-label={`${label} options`}
      >
        {RISK_VALUES.map((value) => {
          const config = RISK_VALUE_CONFIG[value];
          const isSelected = riskValue === value;
          const emphasizeSuggestion = isSuggested && isSelected;

          return (
            <button
              key={value}
              type="button"
              onClick={() => selectValue(value)}
              aria-pressed={isConfirmed && isSelected}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-tags border px-12px py-1.5 text-caption font-medium transition-colors",
                // Default idle chip
                !isSelected &&
                  "border-ash bg-canvas-white text-steel hover:border-smoke hover:text-charcoal",
                // Suggested selection: dashed, awaiting human confirm
                emphasizeSuggestion &&
                  cn("border-dashed bg-canvas-white", config.selectedOutline),
                // Confirmed selection: solid fill
                isConfirmed && isSelected && config.selectedSolid,
                // Unset: none selected yet
                isUnset && "border-ash"
              )}
            >
              <span
                className={cn("size-2 shrink-0 rounded-full", config.swatch)}
                aria-hidden="true"
              />
              {config.label}
              {emphasizeSuggestion && (
                <span className="text-fog">· click to confirm</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
