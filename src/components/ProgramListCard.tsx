import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Sparkline } from '@/components/Sparkline';

interface Program {
  name: string;
  description: string;
  change: string;
  value: string;
  trend: 'up' | 'down';
  strength: number;
  sparklineData: number[];
  color: string;
}

const programs: Program[] = [
  {
    name: 'Eiusmod tempor',
    description: 'sed do eiusmod tempor incididunt ut labore',
    change: '+ 35.128',
    value: '',
    trend: 'up',
    strength: 5,
    sparklineData: [30, 35, 32, 38, 36, 40, 38],
    color: '#8b5cf6'
  },
  {
    name: 'Dolore eu fugiat',
    description: 'quis nostrud exercitation ullamco laboris nisi ut',
    change: '- 75.834',
    value: '',
    trend: 'down',
    strength: 3,
    sparklineData: [45, 42, 40, 38, 36, 34, 32],
    color: '#8b5cf6'
  },
  {
    name: 'Deserunt mollit',
    description: 'voluptate velit esse cillum dolore eu fugiat',
    change: '- 22.556',
    value: '',
    trend: 'down',
    strength: 5,
    sparklineData: [38, 36, 35, 33, 32, 30, 28],
    color: '#ec4899'
  },
  {
    name: 'Adipiscing elit',
    description: 'consectetur adipiscing elit sed do eiusmod',
    change: '+ 45.710',
    value: '',
    trend: 'up',
    strength: 2,
    sparklineData: [25, 28, 30, 33, 36, 38, 40],
    color: '#f87171'
  },
];

export const ProgramListCard = () => {
  return (
    <Card className="bg-white border border-gray-200 shadow-sm">
      <div className="p-6">
        <div className="space-y-4">
          {programs.map((program, index) => (
            <motion.div
              key={index}
              className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center gap-4 flex-1">
                <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: program.color }} />

                <div className="flex-1">
                  <div className="text-sm font-semibold text-gray-900 mb-0.5">
                    {program.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    {program.description}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-1.5 h-1.5 rounded-full ${
                        i < program.strength ? 'bg-blue-500' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>

                <div className="w-28">
                  <Sparkline data={program.sparklineData} color={program.color} height={32} />
                </div>

                <div className={`text-sm font-bold min-w-[80px] text-right ${
                  program.trend === 'up' ? 'text-gray-900' : 'text-gray-900'
                }`}>
                  {program.change}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Card>
  );
};
