"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [checks, setChecks] = useState(0);

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col items-start justify-center gap-6 p-8">
      <div className="space-y-2">
        <span className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium text-muted-foreground">
          Dev environment ready
        </span>
        <h1 className="text-4xl font-semibold tracking-tight">
          MAX — AI Vetting Workspace
        </h1>
        <p className="text-muted-foreground">
          Scaffold running on Next.js 14 (App Router) with TypeScript, Tailwind
          CSS, and shadcn/ui. Pages are built from Step 8 onward per{" "}
          <code className="font-mono text-sm">max-cursor-build-steps.md</code>.
        </p>
      </div>

      <div className="flex items-center gap-4">
        <Button onClick={() => setChecks((c) => c + 1)}>
          Run environment check
        </Button>
        <span className="font-mono text-sm text-muted-foreground">
          checks passed: {checks}
        </span>
      </div>
    </main>
  );
}
