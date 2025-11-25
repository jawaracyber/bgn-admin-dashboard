import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';

interface DataPoint {
  label: string;
  values: number[];
}

export const StackedAreaChart = ({ data }: { data: DataPoint[] }) => {
  const maxValue = Math.max(...data.flatMap(d => d.values));
  const height = 280;
  const width = 100;
  const padding = { top: 50, bottom: 40, left: 5, right: 5 };
  const chartHeight = height - padding.top - padding.bottom;

  const peaks = [
    { label: '425', sublabel: 'classicum', index: 2 },
    { label: '365', sublabel: 'commodo', index: 7 },
    { label: '268', sublabel: 'laborum', index: 12 },
  ];

  const createAreaPath = (values: number[]) => {
    const points = values.map((value, i) => {
      const x = padding.left + (i / (values.length - 1)) * (width - padding.left - padding.right);
      const y = padding.top + chartHeight - ((value / maxValue) * chartHeight);
      return { x, y };
    });

    let path = `M ${padding.left},${height - padding.bottom}`;

    points.forEach((point, i) => {
      if (i === 0) {
        path += ` L ${point.x},${point.y}`;
      } else {
        const prev = points[i - 1];
        const cpX = (prev.x + point.x) / 2;
        path += ` C ${cpX},${prev.y} ${cpX},${point.y} ${point.x},${point.y}`;
      }
    });

    path += ` L ${width - padding.right},${height - padding.bottom} Z`;
    return path;
  };

  const colors = [
    '#7c3aed',
    '#8b5cf6',
    '#a78bfa',
    '#c4b5fd',
  ];

  return (
    <Card className="bg-white border border-gray-200 shadow-sm">
      <div className="p-6">
        <p className="text-xs text-gray-500 mb-6">
          sed do eiusmod tempor incididunt ut labore
        </p>

        <svg
          width="100%"
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {colors.map((color, i) => (
              <linearGradient key={i} id={`stackedGradient-${i}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={color} stopOpacity="0.9" />
                <stop offset="100%" stopColor={color} stopOpacity="0.3" />
              </linearGradient>
            ))}
          </defs>

          {data.slice().reverse().map((series, index) => {
            const layerIndex = data.length - 1 - index;
            return (
              <motion.path
                key={layerIndex}
                d={createAreaPath(series.values)}
                fill={`url(#stackedGradient-${layerIndex})`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: index * 0.15 }}
              />
            );
          })}

          {peaks.map((peak, i) => {
            const x = padding.left + (peak.index / (data[0].values.length - 1)) * (width - padding.left - padding.right);
            return (
              <g key={i}>
                <motion.text
                  x={x}
                  y={padding.top - 12}
                  textAnchor="middle"
                  className="text-[5px] font-bold fill-gray-900"
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + i * 0.1 }}
                >
                  {peak.label}
                </motion.text>
                <motion.text
                  x={x}
                  y={padding.top - 5}
                  textAnchor="middle"
                  className="text-[3px] fill-gray-500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.1 + i * 0.1 }}
                >
                  {peak.sublabel}
                </motion.text>
              </g>
            );
          })}

          <line
            x1={padding.left}
            y1={height - padding.bottom}
            x2={width - padding.right}
            y2={height - padding.bottom}
            stroke="#e5e7eb"
            strokeWidth="0.5"
          />

          {Array.from({ length: 15 }).map((_, i) => {
            const x = padding.left + (i / 14) * (width - padding.left - padding.right);
            return (
              <g key={i}>
                <line
                  x1={x}
                  y1={height - padding.bottom}
                  x2={x}
                  y2={height - padding.bottom + 2}
                  stroke="#9ca3af"
                  strokeWidth="0.3"
                />
                <text
                  x={x}
                  y={height - padding.bottom + 8}
                  textAnchor="middle"
                  className="text-[3px] fill-gray-600 font-medium"
                >
                  {String(i + 1).padStart(2, '0')}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </Card>
  );
};
