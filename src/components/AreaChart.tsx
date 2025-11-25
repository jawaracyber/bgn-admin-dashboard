import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';

interface DataPoint {
  label: string;
  value: number;
}

interface AreaChartProps {
  data: DataPoint[];
  title?: string;
  height?: number;
  colors?: string[];
}

export const AreaChart = ({
  data,
  title,
  height = 200,
  colors = ['#8b5cf6', '#a78bfa', '#c4b5fd']
}: AreaChartProps) => {
  const maxValue = Math.max(...data.map(d => d.value));
  const width = 500;
  const padding = 20;

  const points = data.map((d, i) => {
    const x = padding + (i / (data.length - 1)) * (width - 2 * padding);
    const y = height - padding - ((d.value / maxValue) * (height - 2 * padding));
    return { x, y, value: d.value, label: d.label };
  });

  const createPath = (points: typeof points, bottomOffset = 0) => {
    if (points.length === 0) return '';

    let path = `M ${padding} ${height - padding + bottomOffset}`;

    points.forEach((point, i) => {
      if (i === 0) {
        path += ` L ${point.x} ${point.y}`;
      } else {
        const prevPoint = points[i - 1];
        const cpX = (prevPoint.x + point.x) / 2;
        path += ` Q ${cpX} ${prevPoint.y}, ${cpX} ${(prevPoint.y + point.y) / 2}`;
        path += ` Q ${cpX} ${point.y}, ${point.x} ${point.y}`;
      }
    });

    path += ` L ${width - padding} ${height - padding + bottomOffset}`;
    path += ` L ${padding} ${height - padding + bottomOffset} Z`;

    return path;
  };

  const maxPoint = points.reduce((max, p) => p.value > max.value ? p : max, points[0]);

  return (
    <Card className="bg-white border border-gray-200 shadow-sm">
      <div className="p-6">
        {title && (
          <h3 className="text-sm font-semibold text-gray-900 mb-4">{title}</h3>
        )}

        <div className="flex items-start gap-4 mb-4">
          <div>
            <div className="text-3xl font-bold text-gray-900">{maxPoint.value}</div>
            <div className="text-xs text-gray-500">{maxPoint.label}</div>
          </div>
        </div>

        <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
          <defs>
            {colors.map((color, i) => (
              <linearGradient key={i} id={`areaGradient${i}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={color} stopOpacity="0.8" />
                <stop offset="100%" stopColor={color} stopOpacity="0.1" />
              </linearGradient>
            ))}
          </defs>

          {colors.map((_, i) => (
            <motion.path
              key={i}
              d={createPath(points, i * 15)}
              fill={`url(#areaGradient${i})`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            />
          ))}

          <motion.path
            d={`M ${points.map(p => `${p.x},${p.y}`).join(' L ')}`}
            fill="none"
            stroke={colors[0]}
            strokeWidth="3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />

          {points.map((point, i) => (
            <motion.circle
              key={i}
              cx={point.x}
              cy={point.y}
              r="4"
              fill="white"
              stroke={colors[0]}
              strokeWidth="2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5 + i * 0.1 }}
            />
          ))}
        </svg>

        <div className="flex justify-between mt-2 px-2">
          {data.map((d, i) => (
            <div key={i} className="text-xs text-gray-500 text-center">
              {d.label}
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};
