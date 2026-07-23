type CaseSectionPlaceholderProps = {
  title: string;
  description: string;
};

/** Temporary stub for case sub-pages built in later steps. */
export function CaseSectionPlaceholder({
  title,
  description,
}: CaseSectionPlaceholderProps) {
  return (
    <div className="space-y-16px">
      <div>
        <h2 className="text-subheading font-medium text-charcoal">{title}</h2>
        <p className="mt-4px text-body text-steel">{description}</p>
      </div>
      <div className="flex min-h-[200px] items-center justify-center rounded-cards border border-dashed border-ash bg-canvas-white px-24px py-16px">
        <p className="text-body text-steel">Coming in a later build step</p>
      </div>
    </div>
  );
}
