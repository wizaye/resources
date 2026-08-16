'use client';

import { Eye } from 'lucide-react';
import { useEffect, useState } from 'react';

export function PageViews({ path }: { path: string }) {
  const [views, setViews] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`/api/stats?path=${encodeURIComponent(path)}`, { signal: controller.signal })
      .then((response) => response.json())
      .then((data: { pageviews?: number }) => setViews(data.pageviews ?? 0))
      .catch(() => undefined);
    return () => controller.abort();
  }, [path]);

  if (views < 1) return null;
  return (
    <>
      <span aria-hidden="true">·</span>
      <span className="inline-flex items-center gap-1">
        <Eye className="size-3.5" aria-hidden="true" />
        {views.toLocaleString()} views
      </span>
    </>
  );
}
