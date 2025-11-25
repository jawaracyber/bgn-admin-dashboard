import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Wallet, TrendingUp, Building2 } from 'lucide-react';

interface BudgetCardProps {
  metrics: Array<{
    label: string;
    value: string;
    sublabel?: string;
  }>;
}

export const BudgetCard = ({ metrics }: BudgetCardProps) => {
  const budgetData = [
    {
      icon: Wallet,
      title: 'Total APBN 2025',
      value: 'Rp 3,613.1',
      unit: 'Triliun',
      subtitle: 'Anggaran Pendapatan dan Belanja Negara',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-500/10'
    },
    {
      icon: Building2,
      title: 'Belanja Pemerintah Pusat',
      value: 'Rp 2,693.2',
      unit: 'Triliun',
      subtitle: 'Termasuk alokasi K/L dan program strategis',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-500/10'
    },
    {
      icon: TrendingUp,
      title: 'Transfer ke Daerah',
      value: 'Rp 919.9',
      unit: 'Triliun',
      subtitle: 'Dana untuk pembangunan daerah',
      color: 'from-emerald-500 to-emerald-600',
      bgColor: 'bg-emerald-500/10'
    }
  ];

  return (
    <Card className="bg-gradient-to-br from-indigo-600 via-purple-600 to-purple-500 border-0 shadow-soft-xl overflow-hidden relative h-full rounded-2xl">
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />

      <div className="relative p-6">
        <div className="mb-6">
          <h3 className="text-white text-lg font-bold mb-1">APBN 2025 Indonesia</h3>
          <p className="text-white/70 text-sm">Anggaran Belanja Program Strategis Nasional</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {budgetData.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-4 shadow-soft-lg border border-white/20 hover:bg-white/15 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-12 h-12 rounded-xl ${item.bgColor} backdrop-blur-sm flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex items-center gap-1 px-2 py-1 bg-white/20 rounded-lg">
                    <TrendingUp className="w-3 h-3 text-white" />
                    <span className="text-xs font-bold text-white">2025</span>
                  </div>
                </div>

                <div className="mb-2">
                  <h4 className="text-white/90 text-xs font-semibold mb-1">{item.title}</h4>
                  <div className="flex items-baseline gap-1">
                    <span className="text-white text-2xl font-bold">{item.value}</span>
                    <span className="text-white/70 text-sm font-medium">{item.unit}</span>
                  </div>
                </div>

                <p className="text-white/60 text-xs leading-relaxed">{item.subtitle}</p>

                <div className="mt-3 h-1 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ delay: 0.5 + index * 0.15, duration: 1 }}
                    className={`h-full bg-gradient-to-r ${item.color}`}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
            <div className="text-white text-lg font-bold">Rp 722.6T</div>
            <div className="text-white/70 text-xs mt-1">Pendidikan</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
            <div className="text-white text-lg font-bold">Rp 504.7T</div>
            <div className="text-white/70 text-xs mt-1">Perlindungan Sosial</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
            <div className="text-white text-lg font-bold">Rp 400.3T</div>
            <div className="text-white/70 text-xs mt-1">Infrastruktur</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
            <div className="text-white text-lg font-bold">Rp 197.8T</div>
            <div className="text-white/70 text-xs mt-1">Kesehatan</div>
          </div>
        </div>
      </div>
    </Card>
  );
};
