import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Monitor, Smartphone, Tablet } from 'lucide-react';

interface MetricsGridProps {
  desktop: number;
  mobile: number;
  tablet: number;
}

export const MetricsGrid = ({ desktop, mobile, tablet }: MetricsGridProps) => {
  const metrics = [
    {
      icon: Monitor,
      value: desktop.toLocaleString('en-US'),
      label: 'ut enim ad minim veniam quis nostrud',
      color: 'text-gray-600'
    },
    {
      icon: Smartphone,
      value: mobile.toLocaleString('en-US'),
      label: 'exercitation ullamco laboris nisi ut aliquip',
      color: 'text-gray-600'
    },
    {
      icon: Tablet,
      value: tablet.toLocaleString('en-US'),
      label: 'laboris nisi ut consequat duis aute irure',
      color: 'text-gray-600'
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {metrics.map((metric, index) => {
        const Icon = metric.icon;
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="bg-white border border-gray-200 shadow-sm p-6">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4">
                  <Icon className={`w-10 h-10 ${metric.color}`} strokeWidth={1.5} />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {metric.value}
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {metric.label}
                </p>
              </div>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
};
