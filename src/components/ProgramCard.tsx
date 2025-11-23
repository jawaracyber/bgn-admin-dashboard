import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkline } from "./Sparkline";
import { TrendingUp, TrendingDown, Target, Activity } from "lucide-react";
import { LucideIcon } from "lucide-react";

interface ProgramCardProps {
  title: string;
  icon: LucideIcon;
  target: number;
  realisasi: number;
  persentase: number;
  timeseries: Array<{ date: string; value: number }>;
  color: string;
  delay?: number;
  unit?: string;
}

const getStatusColor = (percentage: number) => {
  if (percentage >= 75) return "text-green-600 bg-green-50 border-green-200";
  if (percentage >= 50) return "text-yellow-600 bg-yellow-50 border-yellow-200";
  return "text-red-600 bg-red-50 border-red-200";
};

const formatNumber = (num: number, unit?: string): string => {
  if (num >= 1000000000) {
    return `${(num / 1000000000).toFixed(1)} M${unit || ''}`;
  }
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)} Jt${unit || ''}`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)} Rb${unit || ''}`;
  }
  return `${num}${unit || ''}`;
};

export const ProgramCard = ({
  title,
  icon: Icon,
  target,
  realisasi,
  persentase,
  timeseries,
  color,
  delay = 0,
  unit
}: ProgramCardProps) => {
  const statusColor = getStatusColor(persentase);
  const trend = timeseries.length >= 2
    ? timeseries[timeseries.length - 1].value - timeseries[timeseries.length - 2].value
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -8, scale: 1.02 }}
    >
      <Card className="glass border-white/20 shadow-xl hover:shadow-2xl smooth-transition overflow-hidden h-full">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg"
                style={{ background: color }}
              >
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-foreground text-sm leading-tight">{title}</h3>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
              <div className="flex items-center gap-1 mb-1">
                <Target className="w-3 h-3 text-slate-500" />
                <span className="text-xs text-muted-foreground">Target</span>
              </div>
              <p className="text-sm font-bold text-foreground">{formatNumber(target, unit)}</p>
            </div>
            <div className={`rounded-lg p-3 border ${statusColor}`}>
              <div className="flex items-center gap-1 mb-1">
                <Activity className="w-3 h-3" />
                <span className="text-xs font-medium">Realisasi</span>
              </div>
              <p className="text-sm font-bold">{persentase.toFixed(1)}%</p>
            </div>
          </div>

          <div className="mb-2">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="text-muted-foreground">Trend Bulanan</span>
              <div className="flex items-center gap-1">
                {trend >= 0 ? (
                  <TrendingUp className="w-3 h-3 text-green-600" />
                ) : (
                  <TrendingDown className="w-3 h-3 text-red-600" />
                )}
                <span className={trend >= 0 ? "text-green-600" : "text-red-600"}>
                  {trend > 0 ? '+' : ''}{trend.toFixed(1)}%
                </span>
              </div>
            </div>
            <Sparkline data={timeseries} color={color} height={50} />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
