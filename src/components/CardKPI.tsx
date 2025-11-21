import { LucideIcon } from "lucide-react";

interface CardKPIProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
}

const CardKPI = ({ title, value, icon: Icon, trend, trendUp }: CardKPIProps) => {
  return (
    <div className="bg-card rounded-xl p-6 shadow-sm border border-border hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-muted-foreground mb-2">{title}</p>
          <h3 className="text-3xl font-bold text-foreground mb-1">{value}</h3>
          {trend && (
            <p className={`text-sm font-medium ${trendUp ? 'text-success' : 'text-destructive'}`}>
              {trend}
            </p>
          )}
        </div>
        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon className="w-6 h-6 text-primary" />
        </div>
      </div>
    </div>
  );
};

export default CardKPI;
