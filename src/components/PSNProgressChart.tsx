import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { TrendingUp, Users, Building2, GraduationCap, Heart } from 'lucide-react';

interface PSNProgram {
  name: string;
  icon: any;
  target: number;
  current: number;
  percentage: number;
  color: string;
  gradient: string;
}

export const PSNProgressChart = () => {
  const programs: PSNProgram[] = [
    {
      name: 'Makan Bergizi Gratis',
      icon: Heart,
      target: 82900000,
      current: 36200000,
      percentage: 43.6,
      color: '#10b981',
      gradient: 'from-emerald-500 to-emerald-600'
    },
    {
      name: 'Sekolah Rakyat',
      icon: GraduationCap,
      target: 100000,
      current: 848,
      percentage: 0.85,
      color: '#3b82f6',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      name: 'Infrastruktur PSN',
      icon: Building2,
      target: 233,
      current: 195,
      percentage: 83.7,
      color: '#8b5cf6',
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      name: 'Dapur Gizi (SPPG)',
      icon: Users,
      target: 30000,
      current: 12205,
      percentage: 40.7,
      color: '#f59e0b',
      gradient: 'from-amber-500 to-amber-600'
    }
  ];

  const maxPercentage = Math.max(...programs.map(p => p.percentage));

  return (
    <Card className="bg-white border-0 shadow-soft-lg rounded-2xl overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-1">
              Progress Program Strategis Nasional 2025
            </h2>
            <p className="text-sm text-gray-500">
              Realisasi program unggulan pemerintah Indonesia
            </p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-xl">
            <TrendingUp className="w-5 h-5 text-emerald-600" />
            <span className="text-sm font-bold text-emerald-600">On Track</span>
          </div>
        </div>

        <div className="space-y-6">
          {programs.map((program, index) => {
            const Icon = program.icon;
            const barWidth = (program.percentage / maxPercentage) * 100;

            return (
              <motion.div
                key={program.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="relative"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${program.gradient} flex items-center justify-center shadow-soft`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-gray-800">{program.name}</h3>
                      <p className="text-xs text-gray-500">
                        {program.current.toLocaleString('id-ID')} / {program.target.toLocaleString('id-ID')}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-800">
                      {program.percentage.toFixed(1)}%
                    </div>
                    <div className="text-xs text-gray-500">Tercapai</div>
                  </div>
                </div>

                <div className="relative h-8 bg-gray-100 rounded-xl overflow-hidden shadow-soft-inner">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${barWidth}%` }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 1, ease: "easeOut" }}
                    className={`h-full bg-gradient-to-r ${program.gradient} relative`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
                  </motion.div>

                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-bold text-gray-700 drop-shadow-sm">
                      Progress: {program.percentage.toFixed(1)}%
                    </span>
                  </div>
                </div>

                {index === 0 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.5 }}
                    className="absolute -top-2 right-0 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-soft-lg"
                  >
                    Target 2025: 82.9M
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800">Rp 6,491T</div>
              <div className="text-xs text-gray-500 mt-1">Total Investasi PSN</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600">233</div>
              <div className="text-xs text-gray-500 mt-1">Total Proyek PSN</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">195</div>
              <div className="text-xs text-gray-500 mt-1">Proyek Selesai</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">2.71M</div>
              <div className="text-xs text-gray-500 mt-1">Lapangan Kerja</div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
