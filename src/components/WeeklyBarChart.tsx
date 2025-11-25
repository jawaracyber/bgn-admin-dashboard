import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';

interface WeeklyData {
  day: string;
  value: number;
}

interface WeeklyBarChartProps {
  data: WeeklyData[];
  title?: string;
}

export const WeeklyBarChart = ({ data, title }: WeeklyBarChartProps) => {
  const maxValue = Math.max(...data.map(d => d.value));

  return (
    <Card className="bg-white border border-gray-200 shadow-sm">
      <div className="p-6">
        {title && (
          <h3 className="text-sm font-semibold text-gray-900 mb-4">{title}</h3>
        )}

        <div className="flex items-end justify-between gap-2 h-32">
          {data.map((item, i) => {
            const height = (item.value / maxValue) * 100;
            const colors = ['#8b5cf6', '#a78bfa', '#6366f1', '#8b5cf6', '#7c3aed', '#6d28d9', '#5b21b6'];

            return (
              <div key={i} className="flex-1 flex flex-col items-center">
                <motion.div
                  className="w-full rounded-t-lg relative group"
                  style={{
                    background: `linear-gradient(to top, ${colors[i]}, ${colors[i]}dd)`,
                  }}
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
                >
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-xs py-1 px-2 rounded whitespace-nowrap">
                    {item.value}
                  </div>
                </motion.div>
                <div className="text-xs text-gray-500 mt-2">{item.day}</div>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
};
