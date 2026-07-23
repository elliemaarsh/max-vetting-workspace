export default function CasesPlaceholderPage() {
  return (
    <main className="flex flex-1 flex-col">
      <header className="border-b border-ash bg-canvas-white px-24px py-20px">
        <p className="font-mono text-caption text-fog">Case Workspace</p>
        <h1 className="mt-4px font-display text-heading-sm font-medium tracking-tight text-charcoal">
          Case Workspace
        </h1>
        <p className="mt-4px text-body text-steel">
          Full case shell arrives in a later build step. Pick a case from Home
          for now.
        </p>
      </header>
      <div className="flex flex-1 items-center justify-center p-24px">
        <p className="rounded-cards border border-dashed border-ash bg-canvas-white px-24px py-16px text-body text-fog">
          Placeholder — Overview, Evidence, Scorecard Draft coming soon
        </p>
      </div>
    </main>
  );
}
