import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';

interface BudgetMetric {
  label: string;
  value: string;
  change?: string;
  color: string;
}

interface BudgetCardProps {
  metrics: BudgetMetric[];
  title?: string;
  data?: Array<{ label: string; values: number[] }>;
}

export const BudgetCard = ({ metrics, title, data }: BudgetCardProps) => {
  return (
    <Card className="bg-gradient-to-br from-indigo-600 via-purple-600 to-purple-700 border-0 shadow-lg overflow-hidden">
      <div className="p-6">
        {title && (
          <h3 className="text-sm font-semibold text-white/90 mb-4">{title}</h3>
        )}

        <div className="flex justify-between items-start mb-6">
          {metrics.map((metric, i) => (
            <motion.div
              key={i}
              className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="text-xs text-white/70 mb-1">{metric.label}</div>
              <div className="text-lg font-bold text-white">{metric.value}</div>
              {metric.change && (
                <div className="text-xs text-white/80 mt-1">{metric.change}</div>
              )}
            </motion.div>
          ))}
        </div>

        {data && (
          <div className="relative h-24">
            <svg width="100%" height="100%" viewBox="0 0 400 100" preserveAspectRatio="none">
              <defs>
                <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.3)" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0.05)" />
                </linearGradient>
                <linearGradient id="waveGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.2)" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0.03)" />
                </linearGradient>
              </defs>

              {data.map((series, seriesIndex) => {
                const path = series.values.map((value, i) => {
                  const x = (i / (series.values.length - 1)) * 400;
                  const y = 50 - (value / 100) * 30 + seriesIndex * 10;
                  return `${i === 0 ? 'M' : 'L'} ${x},${y}`;
                }).join(' ');

                const filledPath = `${path} L 400,100 L 0,100 Z`;

                return (
                  <g key={seriesIndex}>
                    <motion.path
                      d={filledPath}
                      fill={`url(#waveGradient${seriesIndex + 1})`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1, delay: seriesIndex * 0.2 }}
                    />
                    <motion.path
                      d={path}
                      fill="none"
                      stroke="rgba(255,255,255,0.5)"
                      strokeWidth="2"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 2, delay: seriesIndex * 0.2 }}
                    />
                  </g>
                );
              })}
            </svg>
          </div>
        )}
      </div>
    </Card>
  );
};
