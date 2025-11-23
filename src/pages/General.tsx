import CardKPI from "@/components/CardKPI";
import ChartBar from "@/components/ChartBar";
import ChartStacked from "@/components/ChartStacked";
import ChartPie from "@/components/ChartPie";
import ChartLine from "@/components/ChartLine";
import { DollarSign, TrendingUp, FileText, CheckCircle, BarChart3 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { motion } from "framer-motion";

const budgetData = [
  { name: "Jan", value: 4200000000 },
  { name: "Feb", value: 5800000000 },
  { name: "Mar", value: 6500000000 },
  { name: "Apr", value: 7200000000 },
  { name: "Mei", value: 8100000000 },
  { name: "Jun", value: 9200000000 },
];

const stackedData = [
  { month: "Jan", lead: 65, qualify: 28, solution: 20, proposal: 15, finalize: 10 },
  { month: "Feb", lead: 90, qualify: 35, solution: 25, proposal: 18, finalize: 12 },
  { month: "Mar", lead: 105, qualify: 42, solution: 30, proposal: 22, finalize: 18 },
  { month: "Apr", lead: 85, qualify: 38, solution: 28, proposal: 20, finalize: 15 },
  { month: "Mei", lead: 120, qualify: 48, solution: 35, proposal: 25, finalize: 20 },
  { month: "Jun", lead: 95, qualify: 40, solution: 32, proposal: 24, finalize: 17 },
];

const provinceData = [
  { name: "Jawa Barat", value: 245 },
  { name: "Jawa Tengah", value: 198 },
  { name: "Jawa Timur", value: 187 },
  { name: "Sumatera Utara", value: 156 },
  { name: "Sulawesi Selatan", value: 142 },
];

const lineData = [
  { month: "Jan", value: 65, target: 70 },
  { month: "Feb", value: 72, target: 75 },
  { month: "Mar", value: 78, target: 80 },
  { month: "Apr", value: 82, target: 85 },
  { month: "Mei", value: 88, target: 90 },
  { month: "Jun", value: 92, target: 95 },
];

const rankingData = [
  { name: "DKI Jakarta", value: 312, color: "hsl(var(--chart-teal))" },
  { name: "Jawa Barat", value: 245, color: "hsl(var(--chart-blue))" },
  { name: "Jawa Tengah", value: 198, color: "hsl(var(--chart-navy))" },
  { name: "Jawa Timur", value: 187, color: "hsl(var(--chart-red))" },
  { name: "Sumatera Utara", value: 156, color: "hsl(var(--chart-yellow))" },
];

const General = () => {
  return (
    <div className="space-y-6 md:space-y-8 p-4 md:p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent mb-2 md:mb-3">
          Dashboard General
        </h1>
        <p className="text-muted-foreground text-sm md:text-base lg:text-lg">
          Ringkasan data dan analitik program nasional
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <CardKPI
          title="Total Anggaran"
          value="Rp 125 T"
          icon={DollarSign}
          trend="+12.5%"
          trendUp={true}
          gradient="primary"
          delay={0.1}
        />
        <CardKPI
          title="Anggaran Terserap"
          value="Rp 92.5 T"
          icon={TrendingUp}
          trend="74% realisasi"
          trendUp={true}
          gradient="secondary"
          delay={0.2}
        />
        <CardKPI
          title="Total Program"
          value="1,247"
          icon={FileText}
          trend="+8.3%"
          trendUp={true}
          gradient="accent"
          delay={0.3}
        />
        <CardKPI
          title="Penyelesaian"
          value="87.2%"
          icon={CheckCircle}
          trend="+5.1%"
          trendUp={true}
          gradient="warm"
          delay={0.4}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <ChartBar
            data={budgetData}
            title="Penyerapan Anggaran per Bulan"
            subtitle="Data penyerapan anggaran tahun 2025"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <ChartLine
            data={lineData}
            title="Peningkatan Hasil Program"
            subtitle="Perbandingan hasil aktual vs target"
          />
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <ChartStacked
            data={stackedData}
            title="Permasalahan Lapangan per Kategori"
            subtitle="Distribusi masalah berdasarkan tahapan"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <ChartPie
            data={provinceData}
            title="Persebaran Program per Provinsi"
            subtitle="5 provinsi dengan program terbanyak"
          />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="glass rounded-2xl p-4 md:p-6 lg:p-8 shadow-xl border border-white/20 card-hover"
      >
        <div className="mb-4 md:mb-6 flex items-center gap-2 md:gap-3">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
            className="w-10 h-10 md:w-12 md:h-12 rounded-xl gradient-primary flex items-center justify-center shadow-lg"
          >
            <BarChart3 className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </motion.div>
          <div>
            <h3 className="text-lg md:text-xl font-bold text-foreground">Ranking Provinsi</h3>
            <p className="text-xs md:text-sm text-muted-foreground">Berdasarkan jumlah program aktif</p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={rankingData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
            <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={10} />
            <YAxis dataKey="name" type="category" stroke="hsl(var(--muted-foreground))" fontSize={10} width={100} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '12px',
                padding: '12px',
                boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
              }}
            />
            <Bar dataKey="value" radius={[0, 12, 12, 0]}>
              {rankingData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
};

export default General;
