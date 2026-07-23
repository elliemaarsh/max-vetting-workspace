"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import type { Citation } from "@/types";
import {
  CITATION_MONTHS,
  SOURCE_TYPE_OPTIONS,
  formatCitationDate,
  sourceTypeNeedsTitle,
} from "@/lib/citation";
import { cn } from "@/lib/utils";

export type NewCitationInput = Omit<Citation, "order">;

type AddCitationDialogProps = {
  open: boolean;
  sectionName: string;
  onClose: () => void;
  onSubmit: (citation: NewCitationInput) => void;
};

const CURRENT_YEAR = 2026;
const YEARS = Array.from({ length: 12 }, (_, i) => CURRENT_YEAR - i);

const fieldClass =
  "w-full rounded-lg border border-ash bg-canvas-white px-12px py-2 text-body text-charcoal placeholder:text-fog focus:border-electric-blue focus:outline-none focus:ring-1 focus:ring-electric-blue";

/**
 * Manual "Add Citation" form — inserts into the section citations array.
 * Not an AI action; does not use AIOutputCard.
 */
export function AddCitationDialog({
  open,
  sectionName,
  onClose,
  onSubmit,
}: AddCitationDialogProps) {
  const titleId = useId();
  const firstFieldRef = useRef<HTMLSelectElement>(null);

  const [month, setMonth] = useState("March");
  const [year, setYear] = useState(CURRENT_YEAR);
  const [sourceType, setSourceType] =
    useState<Citation["sourceType"]>("social_post");
  const [platform, setPlatform] = useState("");
  const [title, setTitle] = useState("");
  const [quote, setQuote] = useState("");
  const [url, setUrl] = useState("");
  const [error, setError] = useState<string | null>(null);

  const showTitle = sourceTypeNeedsTitle(sourceType);

  useEffect(() => {
    if (!open) return;
    setMonth("March");
    setYear(CURRENT_YEAR);
    setSourceType("social_post");
    setPlatform("");
    setTitle("");
    setQuote("");
    setUrl("");
    setError(null);
    const t = window.setTimeout(() => firstFieldRef.current?.focus(), 0);
    return () => window.clearTimeout(t);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmedPlatform = platform.trim();
    const trimmedQuote = quote.trim();
    const trimmedUrl = url.trim();
    const trimmedTitle = title.trim();

    if (!trimmedPlatform || !trimmedQuote || !trimmedUrl) {
      setError("Platform, quote, and link are required.");
      return;
    }

    const citation: NewCitationInput = {
      date: formatCitationDate(month, year),
      sourceType,
      platform: trimmedPlatform,
      quote: trimmedQuote,
      url: trimmedUrl,
    };

    if (showTitle && trimmedTitle) {
      citation.title = trimmedTitle;
    }

    onSubmit(citation);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-16px">
      <button
        type="button"
        className="absolute inset-0 bg-charcoal/40"
        aria-label="Close dialog"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-10 w-full max-w-lg rounded-cards border border-ash bg-canvas-white p-24px shadow-md"
      >
        <h2
          id={titleId}
          className="font-display text-heading-sm font-medium tracking-tight text-charcoal"
        >
          Add citation
        </h2>
        <p className="mt-4px text-body text-steel">
          Manual addition to{" "}
          <span className="font-medium text-charcoal">{sectionName}</span>.
          Does not change Risk Level or run AI.
        </p>

        <form onSubmit={handleSubmit} className="mt-16px space-y-12px">
          <div className="grid gap-12px sm:grid-cols-2">
            <div className="space-y-4px">
              <label
                htmlFor="citation-month"
                className="text-caption font-medium text-slate"
              >
                Month
              </label>
              <select
                ref={firstFieldRef}
                id="citation-month"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className={fieldClass}
              >
                {CITATION_MONTHS.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-4px">
              <label
                htmlFor="citation-year"
                className="text-caption font-medium text-slate"
              >
                Year
              </label>
              <select
                id="citation-year"
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                className={fieldClass}
              >
                {YEARS.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-4px">
            <label
              htmlFor="citation-source-type"
              className="text-caption font-medium text-slate"
            >
              Source type
            </label>
            <select
              id="citation-source-type"
              value={sourceType}
              onChange={(e) =>
                setSourceType(e.target.value as Citation["sourceType"])
              }
              className={fieldClass}
            >
              {SOURCE_TYPE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-4px">
            <label
              htmlFor="citation-platform"
              className="text-caption font-medium text-slate"
            >
              Platform / publication
            </label>
            <input
              id="citation-platform"
              type="text"
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              placeholder="e.g. Instagram, SwimWorld Daily"
              className={fieldClass}
              required
            />
          </div>

          {showTitle ? (
            <div className="space-y-4px">
              <label
                htmlFor="citation-title"
                className="text-caption font-medium text-slate"
              >
                Title{" "}
                <span className="font-normal text-fog">(optional)</span>
              </label>
              <input
                id="citation-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Article or video title"
                className={fieldClass}
              />
            </div>
          ) : null}

          <div className="space-y-4px">
            <label
              htmlFor="citation-quote"
              className="text-caption font-medium text-slate"
            >
              Quote
            </label>
            <textarea
              id="citation-quote"
              value={quote}
              onChange={(e) => setQuote(e.target.value)}
              rows={3}
              placeholder="Quoted text from the source"
              className={cn(fieldClass, "resize-y")}
              required
            />
          </div>

          <div className="space-y-4px">
            <label
              htmlFor="citation-url"
              className="text-caption font-medium text-slate"
            >
              Link (URL)
            </label>
            <input
              id="citation-url"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://"
              className={fieldClass}
              required
            />
          </div>

          {error ? (
            <p className="text-caption text-[#dc2626]" role="alert">
              {error}
            </p>
          ) : null}

          <div className="flex flex-wrap justify-end gap-8px pt-8px">
            <button
              type="button"
              onClick={onClose}
              className="rounded-buttons border border-ash bg-canvas-white px-16px py-2 text-caption font-medium text-steel hover:border-smoke hover:text-charcoal"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-buttons bg-primary-action px-16px py-2 text-caption font-medium text-canvas-white hover:bg-midnight-ink"
            >
              Add citation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
