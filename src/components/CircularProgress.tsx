import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';

interface CircularProgressProps {
  value: number;
  label?: string;
}

export const CircularProgress = ({
  value,
  label = 'Budget'
}: CircularProgressProps) => {
  const size = 180;
  const strokeWidth = 3;
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = ((100 - value) / 100) * circumference;

  return (
    <Card className="bg-gradient-to-br from-pink-400 via-purple-400 to-indigo-500 border-0 shadow-soft-xl overflow-hidden relative h-full rounded-2xl">
      <div className="absolute top-3 right-3">
        <button className="text-white/60 hover:text-white/90 transition-colors rounded-lg p-1.5 hover:bg-white/10">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </button>
      </div>

      <div className="p-6 flex items-center justify-center h-full">
        <div className="relative">
          <svg width={size} height={size} className="transform -rotate-90">
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {Array.from({ length: 60 }).map((_, i) => {
              const angle = (i * 6 * Math.PI) / 180;
              const innerRadius = radius - 8;
              const outerRadius = radius - 2;
              const x1 = size / 2 + innerRadius * Math.cos(angle);
              const y1 = size / 2 + innerRadius * Math.sin(angle);
              const x2 = size / 2 + outerRadius * Math.cos(angle);
              const y2 = size / 2 + outerRadius * Math.sin(angle);

              const isActive = i / 60 <= value / 100;

              return (
                <motion.line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={isActive ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.2)"}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.005 }}
                />
              );
            })}

            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius - 15}
              fill="rgba(255,255,255,0.1)"
              filter="url(#glow)"
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.div
              className="text-4xl font-bold text-white tracking-tight"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            >
              {value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </motion.div>
          </div>
        </div>
      </div>
    </Card>
  );
};
