"use client";

import { ChartAreaInteractive } from "@/components/dashboard-chart";
import InquiresTable from "@/components/inquires-table";
import StatsCard from "@/components/stats-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { chartData, properties } from "@/data/data";
import {
  filterChartDataByTimeRange,
  getActiveListingTotal,
  getDashboardPropertiesTotal,
  getDashboardTotals,
} from "@/utils/dashboard";
import { useMemo, useState } from "react";

export default function Page() {
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "90d">("90d");

  const filteredChartData = useMemo(() => {
    return filterChartDataByTimeRange(chartData, timeRange);
  }, [timeRange]);

  const { totalVisitors, totalInquiries } = useMemo(() => {
    return getDashboardTotals(filteredChartData);
  }, [filteredChartData]);

  const totalProperties = useMemo(() => {
    return getDashboardPropertiesTotal(properties, timeRange);
  }, [timeRange]);

  const activeProperties = useMemo(() => {
    return getActiveListingTotal(properties, timeRange);
  }, [timeRange]);

  const dashboardStats = useMemo(
    () => [
      {
        title: "Total Inquiries",
        description: "Total number of inquiries",
        value: totalInquiries,
      },
      {
        title: "Total Visitors",
        description: "Total number of visitors",
        value: totalVisitors,
      },
      {
        title: "Total Properties",
        description: "Total number of properties",
        value: totalProperties,
      },
      {
        title: "Active Listings",
        description: "Total number of active listings",
        value: activeProperties,
      },
    ],
    [totalInquiries, totalVisitors, totalProperties, activeProperties]
  );

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 md:p-6 p-4">
        <div className="flex justify-between items-center">
          <div className="text-lg font-bold">Welcome Back😊!</div>
          <Select
            value={timeRange}
            onValueChange={(value) =>
              setTimeRange(value as "7d" | "30d" | "90d")
            }
          >
            <SelectTrigger
              className="w-[160px] rounded-lg sm:ml-auto sm:flex"
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
        </div>
        <div className="dashboard-stats-container *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4  *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
          {dashboardStats.map((stat, index) => (
            <StatsCard
              key={index}
              title={stat.title}
              description={stat.description}
              value={stat.value}
            />
          ))}
        </div>
        <div className="visitors-chart">
          <ChartAreaInteractive
            timeRange={timeRange}
            chartData={filteredChartData}
          />
        </div>
        <Separator />
        <div className="inquires-container">
          <InquiresTable />
        </div>
      </div>
    </div>
  );
}
