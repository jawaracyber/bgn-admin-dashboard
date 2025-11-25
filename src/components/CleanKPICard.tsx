import { motion } from 'framer-motion';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';
import { Card } from '@/components/ui/card';

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
      <Card className="relative overflow-hidden border-0 bg-white shadow-soft hover:shadow-soft-lg transition-all duration-300 rounded-xl">
        <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 opacity-60" />

        <div className="relative p-5">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-gray-600 mb-1 uppercase tracking-wide">{title}</h3>
              {subtitle && (
                <p className="text-xs text-gray-500">{subtitle}</p>
              )}
            </div>
            {Icon && (
              <div
                className="rounded-xl p-3 shadow-soft"
                style={{
                  background: `linear-gradient(135deg, ${color} 0%, ${color}dd 100%)`
                }}
              >
                <Icon className="w-5 h-5 text-white" />
              </div>
            )}
          </div>

          <div className="flex items-end justify-between">
            <div>
              <div className="text-3xl font-bold text-gray-800 mb-2">
                {typeof value === 'number' ? value.toLocaleString('id-ID') : value}
                {unit && <span className="text-xl ml-1 text-gray-600">{unit}</span>}
              </div>
              {trend !== undefined && (
                <div className={`flex items-center gap-1 text-sm font-bold px-3 py-1 rounded-lg ${
                  isPositiveTrend
                    ? 'bg-emerald-100 text-emerald-600'
                    : 'bg-red-100 text-red-600'
                }`}>
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
              <div className="w-28 h-16 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-2 shadow-soft">
                <svg viewBox="0 0 100 40" className="w-full h-full">
                  <defs>
                    <linearGradient id={`gradient-${title}`} x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor={color} stopOpacity="0.5" />
                      <stop offset="100%" stopColor={color} stopOpacity="0.1" />
                    </linearGradient>
                  </defs>
                  <path
                    d={`M 0,40 ${timeseries.map((_, i) => {
                      const x = (i / (timeseries.length - 1)) * 100;
                      const y = 40 - (Math.random() * 20 + 10);
                      return `L ${x},${y}`;
                    }).join(' ')} L 100,40 Z`}
                    fill={`url(#gradient-${title})`}
                  />
                  <path
                    d={`M ${timeseries.map((_, i) => {
                      const x = (i / (timeseries.length - 1)) * 100;
                      const y = 40 - (Math.random() * 20 + 10);
                      return `${x},${y}`;
                    }).join(' L ')}`}
                    fill="none"
                    stroke={color}
                    strokeWidth="2"
                  />
                </svg>
              </div>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
