import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { ReactNode } from 'react';

interface ProgramMetricCardProps {
  title: string;
  icon: ReactNode;
  target: number;
  realisasi: number;
  color: string;
  sparklineData: number[];
  status: 'ontrack' | 'delay' | 'risk';
}

export const ProgramMetricCard = ({
  title,
  icon,
  target,
  realisasi,
  color,
  sparklineData,
  status
}: ProgramMetricCardProps) => {
  const percentage = Math.min((realisasi / target) * 100, 100);

  const statusConfig = {
    ontrack: {
      label: 'On Track',
      color: 'bg-emerald-100 text-emerald-700 border-emerald-200',
      dotColor: 'bg-emerald-500'
    },
    risk: {
      label: 'At Risk',
      color: 'bg-amber-100 text-amber-700 border-amber-200',
      dotColor: 'bg-amber-500'
    },
    delay: {
      label: 'Delayed',
      color: 'bg-red-100 text-red-700 border-red-200',
      dotColor: 'bg-red-500'
    }
  };

  const currentStatus = statusConfig[status];

  const chartData = sparklineData.map((value, index) => ({
    value,
    index
  }));

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toLocaleString('id-ID');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      transition={{ duration: 0.5 }}
    >
      <Card className="relative overflow-hidden border-0 bg-white shadow-soft hover:shadow-soft-xl transition-all duration-300 rounded-2xl">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-gray-50 to-transparent rounded-bl-full opacity-50" />

        <div className="relative p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3 flex-1">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shadow-soft"
                style={{ backgroundColor: color }}
              >
                <div className="text-white">
                  {icon}
                </div>
              </div>

              <div className="flex-1">
                <h3 className="text-sm font-bold text-gray-800 mb-1">{title}</h3>
                <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${currentStatus.color}`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${currentStatus.dotColor} animate-pulse`} />
                  {currentStatus.label}
                </div>
              </div>
            </div>

            <div className="w-16 h-16">
              <CircularProgressbar
                value={percentage}
                strokeWidth={8}
                styles={buildStyles({
                  pathColor: color,
                  trailColor: '#f0f0f0',
                  pathTransitionDuration: 1.5,
                })}
              />
            </div>
          </div>

          <div className="mb-4">
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-3xl font-bold text-gray-900">{formatNumber(realisasi)}</span>
              <span className="text-sm text-gray-500">/ {formatNumber(target)}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
              </div>
              <span className="text-sm font-bold text-gray-700">{percentage.toFixed(1)}%</span>
            </div>
          </div>

          <div className="h-16 -mx-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={color}
                  strokeWidth={2}
                  dot={false}
                  animationDuration={2000}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-3 pt-3 border-t border-gray-100">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500">Target 2025</span>
              <span className="font-semibold text-gray-700">{formatNumber(target)}</span>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
