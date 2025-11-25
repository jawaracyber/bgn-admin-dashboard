import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Wallet, TrendingUp, Building2 } from 'lucide-react';

export const BudgetBreakdownCard = () => {
  const topMinistries = [
    {
      name: 'Kementerian Pertahanan',
      value: '166.26',
      percentage: 6.2,
      color: '#ef4444',
      icon: '🛡️'
    },
    {
      name: 'Polri',
      value: '126.62',
      percentage: 4.7,
      color: '#3b82f6',
      icon: '👮'
    },
    {
      name: 'Kementerian PUPR',
      value: '116.22',
      percentage: 4.3,
      color: '#8b5cf6',
      icon: '🏗️'
    }
  ];

  const prioritySectors = [
    {
      name: 'Pendidikan',
      value: '722.6',
      description: 'Alokasi terbesar untuk SDM unggul dan fasilitas pendidikan'
    },
    {
      name: 'Perlindungan Sosial',
      value: '504.7',
      description: 'Termasuk Program MBG dan bantuan sosial'
    },
    {
      name: 'Infrastruktur',
      value: '400.3',
      description: 'Pembangunan konektivitas dan fasilitas umum'
    }
  ];

  return (
    <Card className="bg-white border-0 shadow-soft-lg rounded-2xl">
      <div className="p-6">
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-1">Alokasi Anggaran K/L</h3>
          <div className="flex items-center gap-3 mt-4">
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-3 rounded-xl shadow-soft">
              <Wallet className="w-8 h-8 text-white" />
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900">Rp 2,693.2 T</div>
              <div className="text-xs text-gray-500">Belanja Pemerintah Pusat 2025</div>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-6 my-8">
          {topMinistries.map((ministry, index) => {
            const sizes = [90, 110, 90];

            return (
              <motion.div
                key={index}
                className="relative flex flex-col items-center"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 + index * 0.1, type: "spring", stiffness: 200 }}
              >
                <div
                  className="rounded-full flex flex-col items-center justify-center shadow-soft-lg relative overflow-hidden"
                  style={{
                    width: sizes[index],
                    height: sizes[index],
                    backgroundColor: ministry.color,
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                  <div className="relative z-10">
                    <div className="text-3xl mb-1">{ministry.icon}</div>
                    <div className="text-white text-lg font-bold">{ministry.value}T</div>
                    <div className="text-white/80 text-xs">{ministry.percentage}%</div>
                  </div>
                </div>
                <div className="mt-3 text-xs font-semibold text-gray-700 text-center max-w-[100px]">
                  {ministry.name}
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="space-y-4 mt-6">
          <h4 className="text-sm font-bold text-gray-700 mb-3">Sektor Prioritas APBN 2025</h4>
          {prioritySectors.map((sector, index) => (
            <motion.div
              key={index}
              className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-4 shadow-soft border border-gray-100"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600" />
                  <span className="font-bold text-gray-800">{sector.name}</span>
                </div>
                <div className="text-xl font-bold text-gray-900">
                  Rp {sector.value}T
                </div>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed pl-4">
                {sector.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </Card>
  );
};
