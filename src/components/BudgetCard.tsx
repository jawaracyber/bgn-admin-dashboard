import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';

interface BudgetCardProps {
  metrics: Array<{
    label: string;
    value: string;
    sublabel?: string;
  }>;
}

export const BudgetCard = ({ metrics }: BudgetCardProps) => {
  const waveData1 = [45, 52, 48, 55, 50, 58, 54, 60, 56, 62, 58, 65, 60, 68, 64, 70];
  const waveData2 = [35, 42, 38, 45, 40, 48, 44, 50, 46, 52, 48, 55, 50, 58, 54, 60];

  const createWavePath = (data: number[], offset: number = 0) => {
    const width = 100;
    const height = 40;
    const points = data.map((value, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - ((value / 100) * height) + offset;
      return { x, y };
    });

    let path = `M 0,${height}`;
    points.forEach((point, i) => {
      if (i === 0) {
        path += ` L ${point.x},${point.y}`;
      } else {
        const prev = points[i - 1];
        const cpX = (prev.x + point.x) / 2;
        path += ` Q ${cpX},${prev.y} ${cpX},${(prev.y + point.y) / 2}`;
        path += ` Q ${cpX},${point.y} ${point.x},${point.y}`;
      }
    });
    path += ` L ${width},${height} Z`;
    return path;
  };

  return (
    <Card className="bg-gradient-to-r from-indigo-600 via-purple-600 to-purple-500 border-0 shadow-lg overflow-hidden relative h-full">
      <div className="p-5">
        <div className="flex justify-between items-start mb-4">
          {metrics.map((metric, i) => (
            <motion.div
              key={i}
              className="bg-white/15 backdrop-blur-sm rounded-xl px-5 py-3 min-w-[120px]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="text-xs text-white/80 mb-1 font-medium">
                {metric.label}
              </div>
              <div className="text-2xl font-bold text-white">
                {metric.value}
              </div>
              {metric.sublabel && (
                <div className="text-xs text-white/70 mt-1">
                  {metric.sublabel}
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <div className="relative h-20 mt-4">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 100 40"
            preserveAspectRatio="none"
            className="absolute inset-0"
          >
            <defs>
              <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.25)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0.05)" />
              </linearGradient>
              <linearGradient id="waveGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.2)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0.02)" />
              </linearGradient>
            </defs>

            <motion.path
              d={createWavePath(waveData1, 5)}
              fill="url(#waveGradient1)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            />

            <motion.path
              d={createWavePath(waveData2, 0)}
              fill="url(#waveGradient2)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            />

            <motion.path
              d={waveData1.map((value, i) => {
                const x = (i / (waveData1.length - 1)) * 100;
                const y = 40 - ((value / 100) * 40) + 5;
                return `${i === 0 ? 'M' : 'L'} ${x},${y}`;
              }).join(' ')}
              fill="none"
              stroke="rgba(255,255,255,0.6)"
              strokeWidth="0.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2 }}
            />

            <motion.path
              d={waveData2.map((value, i) => {
                const x = (i / (waveData2.length - 1)) * 100;
                const y = 40 - ((value / 100) * 40);
                return `${i === 0 ? 'M' : 'L'} ${x},${y}`;
              }).join(' ')}
              fill="none"
              stroke="rgba(255,255,255,0.4)"
              strokeWidth="0.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 0.2 }}
            />
          </svg>
        </div>
      </div>
    </Card>
  );
};
