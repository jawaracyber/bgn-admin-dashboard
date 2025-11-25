import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface CleanStatCardProps {
  title: string;
  value: number | string;
  badge?: string;
  badgeColor?: string;
  children?: React.ReactNode;
  delay?: number;
}

export const CleanStatCard = ({
  title,
  value,
  badge,
  badgeColor = 'bg-emerald-500',
  children,
  delay = 0
}: CleanStatCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              {title}
            </h3>
            {badge && (
              <Badge className={`${badgeColor} text-white text-xs px-2 py-0.5`}>
                {badge}
              </Badge>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-gray-900">
              {typeof value === 'number' ? value.toLocaleString('id-ID') : value}
            </div>
            {children}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
