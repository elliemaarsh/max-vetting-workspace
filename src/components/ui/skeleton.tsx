import { cn } from "@/lib/utils";

type SkeletonProps = {
  className?: string;
};

/** Pulsing placeholder bar — Dub paper-mist on white. */
export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-lg bg-smoke/70",
        className
      )}
      aria-hidden="true"
    />
  );
}
