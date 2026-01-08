import StatsCard from "@/components/stats-card";
import { Button } from "@/components/ui/button";
import { dashboardStats } from "@/constants/data";

export default function Page() {
  return (
    <div>
      <div className="dashboard-stats-container *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
        {dashboardStats.map((stat) => (
          <StatsCard
            title={stat.title}
            description={stat.description}
            value={stat.value}
          />
        ))}
      </div>
    </div>
  );
}
