import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Award, AlertTriangle } from 'lucide-react';

interface NationalSummaryBarProps {
  totalProgress: number;
  trendChange: number;
  bestProvince: { name: string; percentage: number };
  worstProvince: { name: string; percentage: number };
}

export const NationalSummaryBar = ({
  totalProgress,
  trendChange,
  bestProvince,
  worstProvince
}: NationalSummaryBarProps) => {
  const isPositiveTrend = trendChange >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="bg-gradient-to-r from-blue-50 via-white to-purple-50 border-0 shadow-soft-lg rounded-2xl overflow-hidden">
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <motion.div
              className="flex items-center gap-4"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-soft">
                <span className="text-2xl font-bold text-white">{totalProgress.toFixed(0)}%</span>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium mb-1">Progress Nasional</p>
                <p className="text-lg font-bold text-gray-900">Program PSN</p>
              </div>
            </motion.div>

            <motion.div
              className="flex items-center gap-4"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-soft ${
                isPositiveTrend
                  ? 'bg-gradient-to-br from-emerald-500 to-green-600'
                  : 'bg-gradient-to-br from-red-500 to-rose-600'
              }`}>
                {isPositiveTrend ? (
                  <TrendingUp className="w-8 h-8 text-white" />
                ) : (
                  <TrendingDown className="w-8 h-8 text-white" />
                )}
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium mb-1">Perubahan Bulan Ini</p>
                <p className={`text-lg font-bold ${
                  isPositiveTrend ? 'text-emerald-600' : 'text-red-600'
                }`}>
                  {isPositiveTrend ? '+' : ''}{trendChange.toFixed(1)}%
                </p>
              </div>
            </motion.div>

            <motion.div
              className="flex items-center gap-4"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-soft">
                <Award className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium mb-1">Tertinggi</p>
                <p className="text-sm font-bold text-gray-900">{bestProvince.name}</p>
                <p className="text-xs text-emerald-600 font-semibold">{bestProvince.percentage.toFixed(1)}%</p>
              </div>
            </motion.div>

            <motion.div
              className="flex items-center gap-4"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center shadow-soft">
                <AlertTriangle className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium mb-1">Terendah</p>
                <p className="text-sm font-bold text-gray-900">{worstProvince.name}</p>
                <p className="text-xs text-red-600 font-semibold">{worstProvince.percentage.toFixed(1)}%</p>
              </div>
            </motion.div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
