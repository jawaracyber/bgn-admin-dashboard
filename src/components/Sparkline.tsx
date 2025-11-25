import { motion } from 'framer-motion';

interface SparklineProps {
  data: number[];
  color: string;
  height?: number;
  showArea?: boolean;
}

export const Sparkline = ({ data, color, height = 40, showArea = true }: SparklineProps) => {
  if (!data || data.length === 0) return null;

  const width = 120;
  const padding = 4;
  const maxValue = Math.max(...data);
  const minValue = Math.min(...data);
  const range = maxValue - minValue || 1;

  const points = data.map((value, i) => {
    const x = padding + (i / (data.length - 1)) * (width - 2 * padding);
    const y = padding + (height - 2 * padding) - ((value - minValue) / range) * (height - 2 * padding);
    return { x, y };
  });

  const linePath = `M ${points.map(p => `${p.x},${p.y}`).join(' L ')}`;

  let areaPath = '';
  if (showArea) {
    areaPath = `M ${points[0].x},${height - padding} L ${linePath.substring(2)} L ${points[points.length - 1].x},${height - padding} Z`;
  }

  return (
    <svg width={width} height={height} className="inline-block">
      <defs>
        <linearGradient id={`sparkGradient-${color}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0.05" />
        </linearGradient>
      </defs>

      {showArea && (
        <motion.path
          d={areaPath}
          fill={`url(#sparkGradient-${color})`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
      )}

      <motion.path
        d={linePath}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      />

      {points.map((point, i) => (
        <motion.circle
          key={i}
          cx={point.x}
          cy={point.y}
          r="2"
          fill={color}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5 + i * 0.05 }}
        />
      ))}
    </svg>
  );
};
