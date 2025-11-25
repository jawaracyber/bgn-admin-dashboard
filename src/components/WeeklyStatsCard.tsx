import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Heart, GraduationCap, Building2, Users } from 'lucide-react';

export const WeeklyStatsCard = () => {
  const psnStats = [
    {
      icon: Heart,
      value: '36.2 Juta',
      change: '+43.6%',
      trend: 'up' as const,
      label: 'Penerima MBG',
      target: '82.9 Juta target 2025',
      color: '#10b981',
      bgColor: 'from-emerald-500 to-emerald-600'
    },
    {
      icon: Users,
      value: '12,205',
      change: '+40.7%',
      trend: 'up' as const,
      label: 'Dapur Gizi (SPPG)',
      target: '30,000 target 2025',
      color: '#f59e0b',
      bgColor: 'from-amber-500 to-amber-600'
    },
    {
      icon: GraduationCap,
      value: '848',
      change: '+0.85%',
      trend: 'up' as const,
      label: 'Siswa Sekolah Rakyat',
      target: '100,000 target',
      color: '#3b82f6',
      bgColor: 'from-blue-500 to-blue-600'
    },
    {
      icon: Building2,
      value: '195',
      change: '+83.7%',
      trend: 'up' as const,
      label: 'PSN Selesai',
      target: '233 total proyek',
      color: '#8b5cf6',
      bgColor: 'from-purple-500 to-purple-600'
    }
  ];

  return (
    <Card className="bg-white border-0 shadow-soft-lg rounded-2xl">
      <div className="p-6">
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-1">Realisasi Program 2025</h3>
          <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Program Strategis Nasional
          </div>
        </div>

        <div className="space-y-4">
          {psnStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-4 shadow-soft border border-gray-100 hover:shadow-soft-lg transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${stat.bgColor} flex items-center justify-center shadow-soft`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-baseline gap-3 mb-1">
                        <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
                        <span className={`text-sm font-bold px-2 py-1 rounded-lg ${
                          stat.trend === 'up'
                            ? 'bg-emerald-100 text-emerald-600'
                            : 'bg-red-100 text-red-600'
                        }`}>
                          {stat.change}
                        </span>
                      </div>
                      <p className="text-sm font-semibold text-gray-700 mb-0.5">{stat.label}</p>
                      <p className="text-xs text-gray-500">{stat.target}</p>
                    </div>
                  </div>

                  <div className="ml-4">
                    <div className="relative w-16 h-16">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle
                          cx="32"
                          cy="32"
                          r="28"
                          fill="none"
                          stroke="#f0f0f0"
                          strokeWidth="4"
                        />
                        <motion.circle
                          cx="32"
                          cy="32"
                          r="28"
                          fill="none"
                          stroke={stat.color}
                          strokeWidth="4"
                          strokeLinecap="round"
                          initial={{ strokeDasharray: "0 175" }}
                          animate={{ strokeDasharray: `${parseFloat(stat.change) * 1.75} 175` }}
                          transition={{ delay: 0.5 + index * 0.1, duration: 1 }}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xs font-bold text-gray-700">
                          {parseInt(stat.change)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-6 pt-4 border-t border-gray-100">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-3 text-center">
              <div className="text-xl font-bold text-blue-600">Rp 71T</div>
              <div className="text-xs text-gray-600 mt-1">Budget MBG 2025</div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-3 text-center">
              <div className="text-xl font-bold text-purple-600">290 Ribu</div>
              <div className="text-xs text-gray-600 mt-1">Lapangan Kerja</div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
