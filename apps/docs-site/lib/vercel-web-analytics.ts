import 'server-only';

const apiBase = 'https://api.vercel.com/v1/query/web-analytics';

function config() {
  const token = process.env.VERCEL_TOKEN;
  const projectId = process.env.VERCEL_PROJECT_ID;
  return token && projectId
    ? { token, projectId, teamId: process.env.VERCEL_TEAM_ID }
    : null;
}

async function query<T>(endpoint: string, values: Record<string, string>): Promise<T | null> {
  const current = config();
  if (!current) return null;

  const params = new URLSearchParams({ projectId: current.projectId, ...values });
  if (current.teamId) params.set('teamId', current.teamId);

  const response = await fetch(`${apiBase}/${endpoint}?${params}`, {
    headers: { Authorization: `Bearer ${current.token}` },
    next: { revalidate: 60 },
  });
  if (!response.ok) return null;

  const payload = await response.json() as { data: T };
  return payload.data;
}

function date(daysAgo = 0) {
  const value = new Date();
  value.setUTCDate(value.getUTCDate() - daysAgo);
  return value.toISOString().slice(0, 10);
}

export async function getPageViews(path: string) {
  const safePath = path.replaceAll("'", "''");
  return query<{ pageviews: number; visitors: number }>('visits/count', {
    filter: `requestPath eq '${safePath}'`,
  });
}

export async function getAnalyticsOverview() {
  const range = { since: date(29), until: date() };
  const [daily, pages] = await Promise.all([
    query<Array<{ timestamp: string; pageviews: number; visitors: number }>>('visits/aggregate', {
      ...range,
      by: 'day',
    }),
    query<Array<{ requestPath: string; pageviews: number; visitors: number }>>('visits/aggregate', {
      ...range,
      by: 'requestPath',
      limit: '10',
    }),
  ]);

  return { configured: config() !== null, daily: daily ?? [], pages: pages ?? [] };
}
