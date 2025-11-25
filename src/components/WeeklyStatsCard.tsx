import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Sparkline } from '@/components/Sparkline';

interface StatItem {
  value: string;
  change: string;
  trend: 'up' | 'down';
  label: string;
  sparklineData: number[];
  color: string;
}

export const WeeklyStatsCard = () => {
  const stats: StatItem[] = [
    {
      value: '957',
      change: '+35%',
      trend: 'up',
      label: 'ut enim ad minim veniam',
      sparklineData: [30, 32, 35, 38, 40, 42, 45],
      color: '#8b5cf6'
    },
    {
      value: '225',
      change: '-17%',
      trend: 'down',
      label: 'exercitation ullamco laboris',
      sparklineData: [45, 43, 40, 38, 35, 32, 30],
      color: '#8b5cf6'
    },
    {
      value: '570',
      change: '+48%',
      trend: 'up',
      label: 'labore nisi ut consequat',
      sparklineData: [25, 28, 32, 35, 38, 42, 45],
      color: '#ec4899'
    }
  ];

  return (
    <Card className="bg-white border border-gray-200 shadow-sm">
      <div className="p-6">
        <div className="mb-6">
          <div className="text-3xl font-bold text-gray-900 mb-2">$ 55.656,25</div>
        </div>

        <div className="grid grid-cols-5 gap-2 mb-6">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day, index) => {
            const heights = [65, 75, 80, 85, 90];
            const colors = ['#ec4899', '#8b5cf6'];

            return (
              <div key={day} className="text-center">
                <div className="h-24 flex flex-col justify-end items-center gap-1 mb-2">
                  {[0, 1].map((barIndex) => {
                    const barHeight = `${heights[index] - barIndex * 15}%`;
                    return (
                      <motion.div
                        key={barIndex}
                        className="w-full rounded-t"
                        style={{
                          height: barHeight,
                          backgroundColor: colors[barIndex],
                        }}
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{ delay: index * 0.1 + barIndex * 0.05, duration: 0.5 }}
                      />
                    );
                  })}
                </div>
                <div className="text-xs text-gray-600 font-medium">{day}</div>
              </div>
            );
          })}
        </div>

        <div className="space-y-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="flex items-center justify-between"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              <div className="flex-1">
                <div className="flex items-baseline gap-3 mb-1">
                  <span className="text-3xl font-bold text-gray-900">{stat.value}</span>
                  <span className={`text-sm font-semibold ${
                    stat.trend === 'up' ? 'text-emerald-500' : 'text-red-500'
                  }`}>
                    {stat.change}
                  </span>
                </div>
                <p className="text-xs text-gray-500">{stat.label}</p>
              </div>

              <div className="ml-4">
                <Sparkline data={stat.sparklineData} color={stat.color} height={40} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Card>
  );
};
