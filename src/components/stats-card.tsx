import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

interface StatsCardProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
  value?: number;
}

export default function StatsCard({
  title,
  description,
  action,
  value,
}: StatsCardProps) {
  return (
    <Card className="@container/card">
      <CardHeader>
        <CardDescription className="font-semibold">{title}</CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          {value}
        </CardTitle>
        <CardAction>{action}</CardAction>
      </CardHeader>
      <CardFooter className="flex-col items-start text-sm">
        {/* <div className="line-clamp-1 flex gap-2 font-medium">
          Trending up this month <TrendingUp className="size-4" />
        </div> */}
        <div className="text-muted-foreground">{description}</div>
      </CardFooter>
    </Card>
  );
}
