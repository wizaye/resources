'use client';

import { EvilAreaChart } from '@/components/evilcharts/charts/recharts-area-chart';

type Point = { timestamp: string; pageviews: number; visitors: number };

const config = {
  pageviews: {
    label: 'Page views',
    colors: { light: ['#171717'], dark: ['#fafafa'] },
  },
  visitors: {
    label: 'Visitors',
    colors: { light: ['#737373'], dark: ['#a3a3a3'] },
  },
};

export function StatsChart({ data }: { data: Point[] }) {
  return (
    <EvilAreaChart
      data={data}
      config={config}
      xDataKey="timestamp"
      curveType="monotone"
      className="h-72 w-full"
    >
      <EvilAreaChart.Grid />
      <EvilAreaChart.XAxis
        dataKey="timestamp"
        tickFormatter={(value) => new Date(value).toLocaleDateString('en', { month: 'short', day: 'numeric' })}
      />
      <EvilAreaChart.YAxis allowDecimals={false} />
      <EvilAreaChart.Tooltip />
      <EvilAreaChart.Area dataKey="pageviews" variant="gradient" strokeVariant="solid" />
      <EvilAreaChart.Area dataKey="visitors" variant="gradient" strokeVariant="solid" />
    </EvilAreaChart>
  );
}
