import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';

interface BudgetItem {
  value: string;
  label: string;
  sublabel: string;
}

export const BudgetBreakdownCard = () => {
  const items: BudgetItem[] = [
    {
      value: '12.364',
      label: 'nulla',
      sublabel: 'Lorem ipsum dolor sit amet consectetur adipisicing elit'
    },
    {
      value: '5.947',
      label: 'tempor',
      sublabel: 'incididunt ut labore et dolore magna aliqua ut enim ad minim'
    },
    {
      value: '17.490',
      label: 'diusa',
      sublabel: 'exercitation ullamco laboris nisi ut aliquip ex ea commodo'
    }
  ];

  const circleColors = ['#6366f1', '#ec4899', '#8b5cf6'];

  return (
    <Card className="bg-white border border-gray-200 shadow-sm">
      <div className="p-6">
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-1">Deserunt</h3>
          <div className="flex items-center gap-3 mt-4">
            <div className="bg-pink-50 p-3 rounded-lg">
              <svg className="w-8 h-8 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900">3,425.67</div>
              <div className="text-xs text-gray-500">sed do eiusmod tempor incididunt ut labore</div>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-8 my-8">
          {circleColors.map((color, index) => {
            const sizes = [80, 100, 80];
            const values = ['465', '778', '501'];
            const labels = ['nulla', 'tempor', 'diusa'];

            return (
              <motion.div
                key={index}
                className="relative flex flex-col items-center"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 + index * 0.1, type: "spring" }}
              >
                <div
                  className="rounded-full flex items-center justify-center shadow-lg"
                  style={{
                    width: sizes[index],
                    height: sizes[index],
                    backgroundColor: color,
                  }}
                >
                  <div className="text-white text-xl font-bold">{values[index]}</div>
                </div>
                <div className="mt-3 text-xs font-medium text-gray-600">{labels[index]}</div>
              </motion.div>
            );
          })}
        </div>

        <div className="space-y-4 mt-6">
          {items.map((item, index) => (
            <motion.div
              key={index}
              className="border-t border-gray-100 pt-4 first:border-t-0 first:pt-0"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {item.value}
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">
                {item.sublabel}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </Card>
  );
};
