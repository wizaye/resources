import { getPageViews } from '@/lib/vercel-web-analytics';

export async function GET(request: Request) {
  const path = new URL(request.url).searchParams.get('path');
  if (!path?.startsWith('/')) return Response.json({ pageviews: 0, visitors: 0 });

  return Response.json(await getPageViews(path) ?? { pageviews: 0, visitors: 0 });
}
