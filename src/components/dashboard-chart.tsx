"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const description = "An interactive area chart";

const chartData = [
  { date: "2025-04-01", visitors: 222, inquiries: 110 },
  { date: "2025-04-02", visitors: 97, inquiries: 20 },
  { date: "2025-04-03", visitors: 167, inquiries: 110 },
  { date: "2025-04-04", visitors: 242, inquiries: 160 },
  { date: "2025-04-05", visitors: 373, inquiries: 190 },
  { date: "2025-04-06", visitors: 301, inquiries: 140 },
  { date: "2025-04-07", visitors: 245, inquiries: 80 },
  { date: "2025-04-08", visitors: 409, inquiries: 120 },
  { date: "2025-04-09", visitors: 59, inquiries: 10 },
  { date: "2025-04-10", visitors: 261, inquiries: 90 },
  { date: "2025-04-11", visitors: 327, inquiries: 50 },
  { date: "2025-04-12", visitors: 292, inquiries: 10 },
  { date: "2025-04-13", visitors: 342, inquiries: 80 },
  { date: "2025-04-14", visitors: 137, inquiries: 20 },
  { date: "2025-04-15", visitors: 120, inquiries: 70 },
  { date: "2025-04-16", visitors: 138, inquiries: 90 },
  { date: "2025-04-17", visitors: 446, inquiries: 60 },
  { date: "2025-04-18", visitors: 364, inquiries: 10 },
  { date: "2025-04-19", visitors: 243, inquiries: 80 },
  { date: "2025-04-20", visitors: 89, inquiries: 10 },
  { date: "2025-04-21", visitors: 137, inquiries: 40 },
  { date: "2025-04-22", visitors: 224, inquiries: 70 },
  { date: "2025-04-23", visitors: 138, inquiries: 30 },
  { date: "2025-04-24", visitors: 387, inquiries: 90 },
  { date: "2025-04-25", visitors: 215, inquiries: 50 },
  { date: "2025-04-26", visitors: 75, inquiries: 30 },
  { date: "2025-04-27", visitors: 383, inquiries: 20 },
  { date: "2025-04-28", visitors: 122, inquiries: 100 },
  { date: "2025-04-29", visitors: 315, inquiries: 240 },
  { date: "2025-04-30", visitors: 454, inquiries: 380 },

  { date: "2025-05-01", visitors: 165, inquiries: 120 },
  { date: "2025-05-02", visitors: 293, inquiries: 220 },
  { date: "2025-05-03", visitors: 247, inquiries: 190 },
  { date: "2025-05-04", visitors: 385, inquiries: 300 },
  { date: "2025-05-05", visitors: 481, inquiries: 390 },
  { date: "2025-05-06", visitors: 498, inquiries: 420 },
  { date: "2025-05-07", visitors: 388, inquiries: 300 },
  { date: "2025-05-08", visitors: 149, inquiries: 120 },
  { date: "2025-05-09", visitors: 227, inquiries: 180 },
  { date: "2025-05-10", visitors: 293, inquiries: 230 },
  { date: "2025-05-11", visitors: 335, inquiries: 270 },
  { date: "2025-05-12", visitors: 197, inquiries: 150 },
  { date: "2025-05-13", visitors: 197, inquiries: 160 },
  { date: "2025-05-14", visitors: 448, inquiries: 390 },
  { date: "2025-05-15", visitors: 473, inquiries: 380 },
  { date: "2025-05-16", visitors: 338, inquiries: 300 },
  { date: "2025-05-17", visitors: 499, inquiries: 420 },
  { date: "2025-05-18", visitors: 315, inquiries: 250 },
  { date: "2025-05-19", visitors: 235, inquiries: 180 },
  { date: "2025-05-20", visitors: 177, inquiries: 150 },
  { date: "2025-05-21", visitors: 82, inquiries: 60 },
  { date: "2025-05-22", visitors: 81, inquiries: 60 },
  { date: "2025-05-23", visitors: 252, inquiries: 200 },
  { date: "2025-05-24", visitors: 294, inquiries: 220 },
  { date: "2025-05-25", visitors: 201, inquiries: 150 },
  { date: "2025-05-26", visitors: 213, inquiries: 170 },
  { date: "2025-05-27", visitors: 420, inquiries: 360 },
  { date: "2025-05-28", visitors: 233, inquiries: 190 },
  { date: "2025-05-29", visitors: 78, inquiries: 60 },
  { date: "2025-05-30", visitors: 340, inquiries: 280 },
  { date: "2025-05-31", visitors: 178, inquiries: 150 },

  { date: "2025-06-01", visitors: 178, inquiries: 150 },
  { date: "2025-06-02", visitors: 470, inquiries: 410 },
  { date: "2025-06-03", visitors: 103, inquiries: 80 },
  { date: "2025-06-04", visitors: 439, inquiries: 380 },
  { date: "2025-06-05", visitors: 88, inquiries: 60 },
  { date: "2025-06-06", visitors: 294, inquiries: 250 },
  { date: "2025-06-07", visitors: 323, inquiries: 270 },
  { date: "2025-06-08", visitors: 385, inquiries: 320 },
  { date: "2025-06-09", visitors: 438, inquiries: 380 },
  { date: "2025-06-10", visitors: 155, inquiries: 120 },
  { date: "2025-06-11", visitors: 92, inquiries: 70 },
  { date: "2025-06-12", visitors: 492, inquiries: 420 },
  { date: "2025-06-13", visitors: 81, inquiries: 60 },
  { date: "2025-06-14", visitors: 426, inquiries: 380 },
  { date: "2025-06-15", visitors: 307, inquiries: 250 },
  { date: "2025-06-16", visitors: 371, inquiries: 310 },
  { date: "2025-06-17", visitors: 475, inquiries: 420 },
  { date: "2025-06-18", visitors: 107, inquiries: 80 },
  { date: "2025-06-19", visitors: 341, inquiries: 290 },
  { date: "2025-06-20", visitors: 408, inquiries: 350 },
  { date: "2025-06-21", visitors: 169, inquiries: 120 },
  { date: "2025-06-22", visitors: 317, inquiries: 270 },
  { date: "2025-06-23", visitors: 480, inquiries: 430 },
  { date: "2025-06-24", visitors: 132, inquiries: 100 },
  { date: "2025-06-25", visitors: 141, inquiries: 120 },
  { date: "2025-06-26", visitors: 434, inquiries: 380 },
  { date: "2025-06-27", visitors: 448, inquiries: 390 },
  { date: "2025-06-28", visitors: 149, inquiries: 120 },
  { date: "2025-06-29", visitors: 103, inquiries: 80 },
  { date: "2025-06-30", visitors: 446, inquiries: 400 },
];

const chartConfig = {
  // Testers: {
  //   label: "Visitors",
  // },
  visitors: {
    label: "Visitors",
    color: "var(--chart-1)",
  },
  inquiries: {
    label: "Inquiries",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig;

export function ChartAreaInteractive() {
  const [timeRange, setTimeRange] = React.useState("90d");

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = new Date("2025-06-30");
    let daysToSubtract = 90;
    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });

  return (
    <Card className="pt-0">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Visitors Chart</CardTitle>
          <CardDescription>
            Showing total visitors & inquires for the last 3 months
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillvisitors" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-visitors)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-visitors)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillinquiries" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-inquiries)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-inquiries)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="inquiries"
              type="natural"
              fill="url(#fillinquiries)"
              stroke="var(--color-inquiries)"
              stackId="a"
            />
            <Area
              dataKey="visitors"
              type="natural"
              fill="url(#fillvisitors)"
              stroke="var(--color-visitors)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
