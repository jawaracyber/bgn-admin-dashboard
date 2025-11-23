import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";

interface CardKPIProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
  gradient?: "primary" | "secondary" | "accent" | "warm";
  delay?: number;
}

const gradientClasses = {
  primary: "gradient-primary",
  secondary: "gradient-secondary",
  accent: "gradient-accent",
  warm: "gradient-warm",
};

const CardKPI = ({
  title,
  value,
  icon: Icon,
  trend,
  trendUp,
  gradient = "primary",
  delay = 0,
}: CardKPIProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="relative group"
    >
      <div className="glass rounded-2xl p-4 md:p-6 shadow-xl border border-white/20 overflow-hidden card-hover">
        <motion.div
          className={`absolute inset-0 ${gradientClasses[gradient]} opacity-5 group-hover:opacity-10 smooth-transition`}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        />

        <div className="relative z-10 flex items-start justify-between">
          <div className="flex-1">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: delay + 0.2 }}
              className="text-xs md:text-sm text-muted-foreground mb-2 md:mb-3 font-medium uppercase tracking-wide"
            >
              {title}
            </motion.p>

            <motion.h3
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                delay: delay + 0.3,
                type: "spring",
                stiffness: 200,
              }}
              className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text"
            >
              {value}
            </motion.h3>

            {trend && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: delay + 0.4 }}
                className={`flex items-center gap-1 text-xs md:text-sm font-semibold ${
                  trendUp ? "text-success" : "text-destructive"
                }`}
              >
                {trendUp ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                <span>{trend}</span>
              </motion.div>
            )}
          </div>

          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              delay: delay + 0.2,
              type: "spring",
              stiffness: 200,
            }}
            whileHover={{ rotate: 15, scale: 1.1 }}
            className={`w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-xl md:rounded-2xl ${gradientClasses[gradient]} flex items-center justify-center shadow-lg relative overflow-hidden`}
          >
            <Icon className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-white relative z-10" />
            <motion.div
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-0 bg-white/20 rounded-2xl"
            />
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 smooth-transition"
          layoutId={`card-highlight-${title}`}
        />
      </div>
    </motion.div>
  );
};

export default CardKPI;
