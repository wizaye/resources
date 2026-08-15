export default function Loading() {
  return (
    <main className="mx-auto w-full max-w-3xl animate-pulse px-6 py-10" role="status" aria-label="Loading notes">
      <div className="mb-8 h-8 w-2/3 rounded-md bg-fd-muted" />
      <div className="space-y-3">
        <div className="h-4 rounded bg-fd-muted" />
        <div className="h-4 rounded bg-fd-muted" />
        <div className="h-4 w-5/6 rounded bg-fd-muted" />
      </div>
      <div className="my-10 h-64 rounded-xl border bg-fd-muted/50" />
      <div className="space-y-3">
        <div className="h-4 rounded bg-fd-muted" />
        <div className="h-4 w-4/5 rounded bg-fd-muted" />
      </div>
      <span className="sr-only">Loading notes…</span>
    </main>
  );
}
