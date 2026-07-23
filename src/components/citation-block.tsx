import type { Citation } from "@/types";
import { cn } from "@/lib/utils";

type CitationBlockProps = {
  citation: Citation;
  className?: string;
};

/**
 * Scorecard citation pattern: Month Year + hyperlinked platform/publication
 * name (not article title) + optional title + quote.
 */
export function CitationBlock({ citation, className }: CitationBlockProps) {
  return (
    <figure
      className={cn("space-y-4px text-body text-charcoal", className)}
      data-source-type={citation.sourceType}
      data-order={citation.order}
    >
      <figcaption className="text-steel">
        <span className="font-medium text-charcoal">{citation.date}</span>
        <span className="text-fog"> — </span>
        <a
          href={citation.url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-electric-blue underline-offset-2 hover:underline"
        >
          {citation.platform}
        </a>
        {citation.title ? (
          <>
            <span className="text-fog"> — </span>
            <span className="text-slate">&ldquo;{citation.title}&rdquo;</span>
          </>
        ) : null}
      </figcaption>
      <blockquote className="border-l-2 border-ash pl-12px text-slate">
        <span className="text-fog">“</span>
        {citation.quote}
        <span className="text-fog">”</span>
      </blockquote>
    </figure>
  );
}

type CitationListProps = {
  citations: Citation[];
  className?: string;
  emptyLabel?: string;
};

/**
 * Renders citations in reverse-chron order (lowest `order` first —
 * order 1 = most recent per mock data convention).
 */
export function CitationList({
  citations,
  className,
  emptyLabel = "No citations in this section.",
}: CitationListProps) {
  if (citations.length === 0) {
    return (
      <p className={cn("text-body text-fog", className)}>{emptyLabel}</p>
    );
  }

  const sorted = [...citations].sort((a, b) => a.order - b.order);

  return (
    <ul className={cn("flex flex-col gap-16px", className)}>
      {sorted.map((citation) => (
        <li key={`${citation.order}-${citation.url}`}>
          <CitationBlock citation={citation} />
        </li>
      ))}
    </ul>
  );
}
