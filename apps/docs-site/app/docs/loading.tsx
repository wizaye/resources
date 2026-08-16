import { DotmSquare3 } from '@/components/ui/dotm-square-3';

export default function Loading() {
  return (
    <main className="mx-auto w-full max-w-[900px] px-4 py-6 md:px-6 md:pt-8 xl:px-8 xl:pt-14" role="status" aria-label="Loading notes">
      <div className="border-b pb-4">
        <div className="h-9 w-2/3 animate-pulse rounded-md bg-fd-muted" />
        <div className="mt-3 h-4 w-36 animate-pulse rounded bg-fd-muted" />
        <div className="mt-2 h-4 w-28 animate-pulse rounded bg-fd-muted" />
        <div className="mt-3 flex gap-2">
          <div className="h-8 w-28 animate-pulse rounded-md bg-fd-muted" />
          <div className="h-8 w-20 animate-pulse rounded-md bg-fd-muted" />
        </div>
      </div>

      <div className="mt-4 space-y-3">
        <div className="h-4 animate-pulse rounded bg-fd-muted" />
        <div className="h-4 animate-pulse rounded bg-fd-muted" />
        <div className="h-4 w-5/6 animate-pulse rounded bg-fd-muted" />
      </div>

      <div className="relative my-6 grid h-56 place-items-center overflow-hidden rounded-xl border bg-fd-card">
        <div className="absolute inset-4 animate-pulse rounded-lg bg-fd-muted/45" aria-hidden="true" />
        <div className="relative flex flex-col items-center gap-3 text-xs text-fd-muted-foreground">
          <DotmSquare3 ariaLabel="Preparing notes and code examples" dotSize={3} size={22} />
          <span>Preparing notes and code examples…</span>
        </div>
      </div>

      <div className="space-y-3">
        <div className="h-4 animate-pulse rounded bg-fd-muted" />
        <div className="h-4 w-4/5 animate-pulse rounded bg-fd-muted" />
      </div>
    </main>
  );
}
