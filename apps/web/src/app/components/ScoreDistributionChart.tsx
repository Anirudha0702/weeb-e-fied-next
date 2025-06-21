"use client";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
interface ScoreDistributionChartProps {
  data: { amount: number; score: number }[];
}
export default function ScoreDistributionChart({
  data,
}: ScoreDistributionChartProps) {
  const chartConfig = {
    amount: {
      label: "Count",
      color: "hsl(var(--chart-3))",
    },
  } satisfies ChartConfig;
  return (
    <Card className="w-full my-4">
      <CardHeader>
        <CardTitle>Score Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <LineChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="score"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              //   tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="amount"
              type="linear"
              stroke="var(--color-amount)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
