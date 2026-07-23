/**
 * Token preview page — confirms Dub theme compiles.
 * Not a product screen; replace in later build steps.
 */
export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-canvas-white p-32px">
      <div className="w-full max-w-md space-y-16px rounded-cards border border-ash bg-canvas-white p-24px shadow-subtle">
        <div className="space-y-8px">
          <p className="font-mono text-caption text-fog">Token preview</p>
          {/* Display: Inter @ 500 until Satoshi lands; body: Inter @ 400 */}
          <h1 className="font-display text-heading-lg font-medium tracking-tight text-charcoal">
            MAX
          </h1>
          <p className="font-sans text-body font-normal text-steel">
            AI gathers, drafts, and formats. Humans decide. Risk Level is always
            a human click — never set by the model.
          </p>
        </div>

        <button
          type="button"
          className="inline-flex h-9 items-center justify-center rounded-buttons bg-primary-action px-16px text-body font-medium text-canvas-white transition-colors hover:bg-midnight-ink"
        >
          Confirm assignment
        </button>

        <div className="flex flex-wrap gap-8px border-t border-ash pt-16px">
          <span className="rounded-tags bg-paper-mist px-8px py-4px text-caption text-slate">
            ash border
          </span>
          <span className="rounded-tags bg-soft-mint px-8px py-4px text-caption text-vivid-green">
            soft mint
          </span>
          <span className="rounded-tags px-8px py-4px text-caption text-electric-blue">
            electric blue
          </span>
        </div>
      </div>
    </main>
  );
}
