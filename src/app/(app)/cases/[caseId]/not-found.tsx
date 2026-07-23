import Link from "next/link";

export default function CaseNotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-12px p-24px">
      <p className="font-mono text-caption text-fog">404</p>
      <h1 className="font-display text-heading-sm font-medium text-charcoal">
        Case not found
      </h1>
      <p className="max-w-md text-center text-body text-steel">
        Full workspace data is only available for demo cases with scorecards.
        Open a case from the picker or Home queue.
      </p>
      <Link
        href="/cases"
        className="rounded-buttons bg-charcoal px-16px py-2 text-caption font-medium text-canvas-white hover:bg-graphite"
      >
        Back to Case Workspace
      </Link>
    </main>
  );
}
