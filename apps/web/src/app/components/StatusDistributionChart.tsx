"use client";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TMediaListStatus } from "@/app/utils/quries";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";

interface StatusDistributionChartProps {
  data: { status: TMediaListStatus; amount: number }[];
}

export default function StatusDistributionChart({
  data,
}: StatusDistributionChartProps) {
  const chartConfig = {
    amount: {
      label: "Count",
      color: "hsl(var(--chart-3))",
    },
  } satisfies ChartConfig;
  return (
    <Card className="w-full my-4">
      <CardHeader>
        <CardTitle>Status Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <RadarChart data={data}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarAngleAxis dataKey="status" />
            <PolarGrid />
            <Radar
              dataKey="amount"
              fill="var(--color-amount)"
              fillOpacity={0.6}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
