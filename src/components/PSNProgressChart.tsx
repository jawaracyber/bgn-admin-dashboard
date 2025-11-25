import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { TrendingUp, Heart, GraduationCap, Building2, Users, Utensils } from 'lucide-react';
import { ProgramMetricCard } from './ProgramMetricCard';

export const PSNProgressChart = () => {
  const programs = [
    {
      title: 'Makan Bergizi Gratis',
      icon: <Heart className="w-6 h-6" />,
      target: 82900000,
      realisasi: 36200000,
      color: '#16A34A',
      sparklineData: [10, 12, 15, 18, 22, 28, 36.2],
      status: 'ontrack' as const
    },
    {
      title: 'Dapur Gizi (SPPG)',
      icon: <Utensils className="w-6 h-6" />,
      target: 30000,
      realisasi: 12205,
      color: '#F59E0B',
      sparklineData: [2, 4, 6, 7.5, 9, 10.5, 12.2],
      status: 'ontrack' as const
    },
    {
      title: 'Sekolah Rakyat',
      icon: <GraduationCap className="w-6 h-6" />,
      target: 100000,
      realisasi: 848,
      color: '#3B82F6',
      sparklineData: [0, 0.1, 0.2, 0.4, 0.5, 0.7, 0.848],
      status: 'delay' as const
    },
    {
      title: 'Infrastruktur PSN',
      icon: <Building2 className="w-6 h-6" />,
      target: 233,
      realisasi: 195,
      color: '#8B5CF6',
      sparklineData: [140, 155, 165, 175, 182, 188, 195],
      status: 'ontrack' as const
    },
    {
      title: 'Lapangan Kerja Baru',
      icon: <Users className="w-6 h-6" />,
      target: 2710000,
      realisasi: 290000,
      color: '#EC4899',
      sparklineData: [50, 90, 130, 170, 210, 250, 290],
      status: 'risk' as const
    }
  ];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-gradient-to-br from-blue-50 via-white to-purple-50 border-0 shadow-soft-lg rounded-2xl overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-1">
                  Progress Program Strategis Nasional 2025
                </h2>
                <p className="text-sm text-gray-600">
                  Monitoring realisasi program unggulan pemerintah Indonesia
                </p>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-xl border border-emerald-200">
                <TrendingUp className="w-5 h-5 text-emerald-600" />
                <span className="text-sm font-bold text-emerald-600">Active Tracking</span>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {programs.map((program, index) => (
          <motion.div
            key={program.title}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <ProgramMetricCard
              title={program.title}
              icon={program.icon}
              target={program.target}
              realisasi={program.realisasi}
              color={program.color}
              sparklineData={program.sparklineData}
              status={program.status}
            />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <Card className="bg-white border-0 shadow-soft-lg rounded-2xl">
          <div className="p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Ringkasan Proyek Strategis Nasional</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 text-center">
                <div className="text-3xl font-bold text-blue-600 mb-1">Rp 6,491T</div>
                <div className="text-xs text-gray-600">Total Investasi PSN</div>
              </div>
              <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl p-4 text-center">
                <div className="text-3xl font-bold text-emerald-600 mb-1">233</div>
                <div className="text-xs text-gray-600">Total Proyek PSN</div>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl p-4 text-center">
                <div className="text-3xl font-bold text-purple-600 mb-1">195</div>
                <div className="text-xs text-gray-600">Proyek Selesai</div>
              </div>
              <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl p-4 text-center">
                <div className="text-3xl font-bold text-pink-600 mb-1">2.71M</div>
                <div className="text-xs text-gray-600">Lapangan Kerja</div>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};
