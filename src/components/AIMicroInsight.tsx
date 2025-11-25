import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface AIMicroInsightProps {
  sparklineData: number[];
  provinceName?: string;
}

export const AIMicroInsight = ({ sparklineData, provinceName }: AIMicroInsightProps) => {
  const generateInsight = () => {
    if (sparklineData.length < 2) {
      return 'Data sedang dianalisis';
    }

    const lastValue = sparklineData[sparklineData.length - 1];
    const secondLastValue = sparklineData[sparklineData.length - 2];
    const average = sparklineData.reduce((a, b) => a + b, 0) / sparklineData.length;

    const trend = lastValue - secondLastValue;
    const variance = Math.max(...sparklineData) - Math.min(...sparklineData);
    const isVolatile = variance > average * 0.3;

    if (provinceName) {
      return `Provinsi terendah: ${provinceName}`;
    }

    if (isVolatile) {
      return 'Tren fluktuatif selama 3 bulan terakhir';
    }

    if (trend > 0) {
      const consecutiveIncreases = sparklineData.slice(-6).reduce((count, val, idx, arr) => {
        if (idx === 0) return 0;
        return val > arr[idx - 1] ? count + 1 : count;
      }, 0);

      if (consecutiveIncreases >= 5) {
        return 'Tren naik selama 6 bulan berturut-turut';
      }
      return 'Cakupan meningkat dibanding bulan lalu';
    }

    if (trend < 0) {
      return 'Penurunan dibanding bulan lalu';
    }

    return 'Pertumbuhan stabil bulan ini';
  };

  const insight = generateInsight();

  return (
    <motion.div
      className="flex items-start gap-2 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <motion.div
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
      >
        <Sparkles className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
      </motion.div>
      <p className="text-xs text-gray-700 leading-relaxed font-medium">
        {insight}
      </p>
    </motion.div>
  );
};
