import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';

interface CircularProgressProps {
  value: number;
  label?: string;
  color?: string;
  size?: number;
}

export const CircularProgress = ({
  value,
  label = 'Budget',
  color = '#8b5cf6',
  size = 160
}: CircularProgressProps) => {
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = ((100 - value) / 100) * circumference;

  return (
    <Card className="bg-gradient-to-br from-purple-500 via-purple-600 to-indigo-600 border-0 shadow-lg overflow-hidden relative">
      <div className="absolute top-4 right-4">
        <button className="text-white/80 hover:text-white">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </button>
      </div>

      <div className="p-8 flex items-center justify-center">
        <div className="relative">
          <svg width={size} height={size} className="transform -rotate-90">
            <defs>
              <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.3)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0.6)" />
              </linearGradient>
            </defs>

            {Array.from({ length: 60 }).map((_, i) => {
              const angle = (i * 6 * Math.PI) / 180;
              const x1 = size / 2 + (radius - 5) * Math.cos(angle);
              const y1 = size / 2 + (radius - 5) * Math.sin(angle);
              const x2 = size / 2 + radius * Math.cos(angle);
              const y2 = size / 2 + radius * Math.sin(angle);

              return (
                <motion.line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: i / 60 < value / 100 ? 0.8 : 0.2 }}
                  transition={{ delay: i * 0.01 }}
                />
              );
            })}

            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth={strokeWidth}
            />

            <motion.circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="url(#progressGradient)"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: progress }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.div
              className="text-3xl font-bold text-white"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
            >
              {value.toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </motion.div>
            <div className="text-xs text-white/70 mt-1">{label}</div>
          </div>
        </div>
      </div>
    </Card>
  );
};
