import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { ReactNode } from 'react';
import { StatusBadge } from './StatusBadge';
import { SparklineChart } from './SparklineChart';
import { ProgressRing } from './ProgressRing';
import { AIMicroInsight } from './AIMicroInsight';

interface ProgramMetricCardProps {
  title: string;
  subtitle?: string;
  icon: ReactNode;
  target: number;
  realisasi: number;
  color: string;
  sparklineData: number[];
  status: 'ontrack' | 'delay' | 'risk';
  provinceName?: string;
}

export const ProgramMetricCard = ({
  title,
  subtitle,
  icon,
  target,
  realisasi,
  color,
  sparklineData,
  status,
  provinceName
}: ProgramMetricCardProps) => {
  const percentage = Math.min((realisasi / target) * 100, 100);

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
      whileHover={{
        y: -8,
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
        transition: { duration: 0.3 }
      }}
      transition={{ duration: 0.5 }}
      className="cursor-pointer"
    >
      <Card className="relative overflow-hidden border-0 bg-white shadow-soft hover:shadow-soft-xl transition-all duration-300 rounded-2xl">
        <motion.div
          className="absolute top-0 right-0 w-40 h-40 opacity-10 rounded-bl-full"
          style={{ backgroundColor: color }}
          animate={{ rotate: [0, 5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="relative p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start gap-3 flex-1">
              <motion.div
                className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-soft"
                style={{ backgroundColor: color }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-white">
                  {icon}
                </div>
              </motion.div>

              <div className="flex-1">
                <h3 className="text-base font-bold text-gray-900 mb-1">{title}</h3>
                {subtitle && (
                  <p className="text-xs text-gray-500 mb-2">{subtitle}</p>
                )}
                <StatusBadge status={status} />
              </div>
            </div>

            <ProgressRing percentage={percentage} color={color} size={72} />
          </div>

          <div className="mb-4">
            <div className="flex items-baseline gap-2 mb-2">
              <motion.span
                className="text-4xl font-bold text-gray-900"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {percentage.toFixed(0)}%
              </motion.span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="font-semibold">{formatNumber(realisasi)}</span>
              <span className="text-gray-400">/</span>
              <span>{formatNumber(target)}</span>
            </div>
          </div>

          <div className="mb-4">
            <SparklineChart data={sparklineData} color={color} height={60} />
          </div>

          <AIMicroInsight sparklineData={sparklineData} provinceName={provinceName} />
        </div>
      </Card>
    </motion.div>
  );
};
