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
  console.log(`Rendering StatsCard: ${title}`);
  return (
    <Card className="@container/card">
      <CardHeader>
        <CardDescription className="font-semibold">{title}</CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          {value}
        </CardTitle>
        <CardAction>{action}</CardAction>
      </CardHeader>
    </Card>
  );
}
