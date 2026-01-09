"use client";

import { ChartAreaInteractive } from "@/components/dashboard-chart";
import InquiresTable from "@/components/inquires-table";
import StatsCard from "@/components/stats-card";
import { dashboardStats } from "@/data/data";

export default function Page() {
  return (
    <div className="grid grid-cols-1 gap-4 md:p-6 p-4">
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
        <ChartAreaInteractive />
      </div>
      <div className="inquires-container">
        <InquiresTable />
      </div>
    </div>
  );
}
