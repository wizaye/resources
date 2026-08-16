import { StatsChart } from '@/components/stats-chart';
import { getAnalyticsOverview } from '@/lib/vercel-web-analytics';
import type { Metadata } from 'next';
import Link from 'next/link';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = {
  title: 'Public stats',
  description: 'Anonymous traffic and popular resources from the last 30 days.',
};

export default async function StatsPage() {
  const stats = await getAnalyticsOverview();
  const pageviews = stats.daily.reduce((total, point) => total + point.pageviews, 0);
  const visitors = stats.daily.reduce((total, point) => total + point.visitors, 0);

  return (
    <main className="mx-auto min-h-dvh w-full max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
      <header className="mb-10 flex items-center justify-between border-b pb-4">
        <Link className="font-semibold text-fd-foreground" href="/">Interview Prep</Link>
        <Link className="text-sm text-fd-muted-foreground hover:text-fd-foreground" href="/">Back to notes</Link>
      </header>
      <section>
        <h1 className="text-3xl font-semibold tracking-tight text-fd-foreground">Public stats</h1>
        <p className="mt-2 text-fd-muted-foreground">Anonymous traffic for the last 30 days, powered by Vercel Web Analytics.</p>
        <div className="mt-8">
        {!stats.configured ? (
          <p>Stats will appear after Vercel Analytics is enabled and its server token is configured.</p>
        ) : stats.daily.length === 0 ? (
          <p>No traffic recorded yet.</p>
        ) : (
          <>
            <div className="not-prose mb-6 grid gap-3 sm:grid-cols-2">
              <Metric label="Page views" value={pageviews} />
              <Metric label="Visitors" value={visitors} />
            </div>
            <div className="not-prose rounded-xl border bg-fd-card p-3 sm:p-5">
              <StatsChart data={stats.daily} />
            </div>
            <h2 className="mb-3 mt-8 text-xl font-semibold">Popular pages</h2>
            <ol className="space-y-2">
              {stats.pages.map((page) => (
                <li key={page.requestPath}>
                  <Link className="underline underline-offset-4" href={page.requestPath}>{page.requestPath}</Link> — {page.pageviews.toLocaleString()} views
                </li>
              ))}
            </ol>
          </>
        )}
        </div>
      </section>
    </main>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border bg-fd-card p-4">
      <p className="text-xs text-fd-muted-foreground">{label}</p>
      <p className="mt-1 text-2xl font-semibold tabular-nums text-fd-foreground">{value.toLocaleString()}</p>
    </div>
  );
}
