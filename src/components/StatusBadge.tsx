import { motion } from 'framer-motion';

interface StatusBadgeProps {
  status: 'ontrack' | 'risk' | 'delay';
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const statusConfig = {
    ontrack: {
      label: 'On Track',
      color: 'bg-emerald-100 text-emerald-700 border-emerald-200',
      dotColor: 'bg-emerald-500'
    },
    risk: {
      label: 'At Risk',
      color: 'bg-amber-100 text-amber-700 border-amber-200',
      dotColor: 'bg-amber-500'
    },
    delay: {
      label: 'Delayed',
      color: 'bg-red-100 text-red-700 border-red-200',
      dotColor: 'bg-red-500'
    }
  };

  const config = statusConfig[status];

  return (
    <motion.div
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold border ${config.color}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className={`w-2 h-2 rounded-full ${config.dotColor}`}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
      />
      {config.label}
    </motion.div>
  );
};
