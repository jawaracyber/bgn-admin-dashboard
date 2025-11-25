import { motion } from 'framer-motion';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Sparkline } from './Sparkline';

interface CleanKPICardProps {
  title: string;
  value: number | string;
  icon?: LucideIcon;
  trend?: number;
  timeseries?: Array<{ date: string; value: number }>;
  color?: string;
  unit?: string;
  delay?: number;
  subtitle?: string;
}

export const CleanKPICard = ({
  title,
  value,
  icon: Icon,
  trend,
  timeseries,
  color = '#6ee7b7',
  unit = '',
  delay = 0,
  subtitle
}: CleanKPICardProps) => {
  const isPositiveTrend = trend !== undefined && trend >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <Card
        className="relative overflow-hidden border-0 shadow-sm hover:shadow-md transition-all duration-300"
        style={{ backgroundColor: color }}
      >
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-sm font-medium text-white/80 mb-1">{title}</h3>
              {subtitle && (
                <p className="text-xs text-white/60">{subtitle}</p>
              )}
            </div>
            {Icon && (
              <div className="bg-white/20 rounded-lg p-2">
                <Icon className="w-5 h-5 text-white" />
              </div>
            )}
          </div>

          <div className="flex items-end justify-between">
            <div>
              <div className="text-3xl font-bold text-white mb-1">
                {typeof value === 'number' ? value.toLocaleString('id-ID') : value}
                {unit && <span className="text-xl ml-1">{unit}</span>}
              </div>
              {trend !== undefined && (
                <div className={`flex items-center gap-1 text-sm font-medium ${isPositiveTrend ? 'text-white' : 'text-white/80'}`}>
                  {isPositiveTrend ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  <span>{Math.abs(trend)}%</span>
                </div>
              )}
            </div>

            {timeseries && timeseries.length > 0 && (
              <div className="w-24 h-12">
                <Sparkline
                  data={timeseries}
                  color="rgba(255, 255, 255, 0.8)"
                  strokeWidth={2}
                />
              </div>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
