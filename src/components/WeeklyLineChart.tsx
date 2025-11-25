import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';

export const WeeklyLineChart = () => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const data = [25, 35, 45, 38, 42, 30, 28];

  const maxValue = Math.max(...data);
  const height = 120;
  const width = 100;
  const padding = { top: 20, bottom: 30, left: 5, right: 5 };
  const chartHeight = height - padding.top - padding.bottom;

  const points = data.map((value, i) => {
    const x = padding.left + (i / (data.length - 1)) * (width - padding.left - padding.right);
    const y = padding.top + chartHeight - ((value / maxValue) * chartHeight);
    return { x, y };
  });

  const createPath = () => {
    let path = `M ${points[0].x},${points[0].y}`;
    points.forEach((point, i) => {
      if (i > 0) {
        const prev = points[i - 1];
        const cpX = (prev.x + point.x) / 2;
        path += ` C ${cpX},${prev.y} ${cpX},${point.y} ${point.x},${point.y}`;
      }
    });
    return path;
  };

  const createAreaPath = () => {
    const linePath = createPath();
    return `${linePath} L ${points[points.length - 1].x},${height - padding.bottom} L ${points[0].x},${height - padding.bottom} Z`;
  };

  const peakIndex = data.indexOf(maxValue);
  const peakPoint = points[peakIndex];

  return (
    <Card className="bg-white border border-gray-200 shadow-sm">
      <div className="p-6">
        <svg
          width="100%"
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="pinkGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ec4899" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#ec4899" stopOpacity="0.05" />
            </linearGradient>
          </defs>

          <motion.path
            d={createAreaPath()}
            fill="url(#pinkGradient)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          />

          <motion.path
            d={createPath()}
            fill="none"
            stroke="#ec4899"
            strokeWidth="0.8"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />

          {points.map((point, i) => (
            <motion.circle
              key={i}
              cx={point.x}
              cy={point.y}
              r={i === peakIndex ? "1.5" : "1"}
              fill="#ec4899"
              stroke="white"
              strokeWidth="0.5"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8 + i * 0.05 }}
            />
          ))}

          <motion.circle
            cx={peakPoint.x}
            cy={peakPoint.y}
            r="2.5"
            fill="white"
            stroke="#ec4899"
            strokeWidth="0.8"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.2, type: "spring" }}
          />

          <line
            x1={padding.left}
            y1={height - padding.bottom}
            x2={width - padding.right}
            y2={height - padding.bottom}
            stroke="#e5e7eb"
            strokeWidth="0.5"
          />

          {days.map((day, i) => {
            const x = padding.left + (i / (days.length - 1)) * (width - padding.left - padding.right);
            return (
              <g key={i}>
                <text
                  x={x}
                  y={height - padding.bottom + 10}
                  textAnchor="middle"
                  className="text-[3px] fill-gray-600 font-medium"
                >
                  {day}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </Card>
  );
};
