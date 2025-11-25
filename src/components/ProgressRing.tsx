import { motion } from 'framer-motion';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface ProgressRingProps {
  percentage: number;
  color: string;
  size?: number;
}

export const ProgressRing = ({ percentage, color, size = 80 }: ProgressRingProps) => {
  return (
    <motion.div
      style={{ width: size, height: size }}
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <CircularProgressbar
        value={percentage}
        strokeWidth={10}
        styles={buildStyles({
          pathColor: color,
          trailColor: '#f0f0f0',
          pathTransitionDuration: 1.5,
        })}
      />
    </motion.div>
  );
};
