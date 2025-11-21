import CardKPI from "@/components/CardKPI";
import ChartBar from "@/components/ChartBar";
import ChartStacked from "@/components/ChartStacked";
import ChartPie from "@/components/ChartPie";
import ChartLine from "@/components/ChartLine";
import { DollarSign, TrendingUp, FileText, CheckCircle, BarChart3 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

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
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard General</h1>
        <p className="text-muted-foreground">Ringkasan data dan analitik program nasional</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <CardKPI
          title="Total Anggaran"
          value="Rp 125 T"
          icon={DollarSign}
          trend="+12.5% dari tahun lalu"
          trendUp={true}
        />
        <CardKPI
          title="Anggaran Terserap"
          value="Rp 92.5 T"
          icon={TrendingUp}
          trend="74% realisasi"
          trendUp={true}
        />
        <CardKPI
          title="Total Program"
          value="1,247"
          icon={FileText}
          trend="+8.3% bulan ini"
          trendUp={true}
        />
        <CardKPI
          title="Penyelesaian"
          value="87.2%"
          icon={CheckCircle}
          trend="+5.1% bulan ini"
          trendUp={true}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartBar
          data={budgetData}
          title="Penyerapan Anggaran per Bulan"
          subtitle="Data penyerapan anggaran tahun 2024"
        />
        <ChartLine
          data={lineData}
          title="Peningkatan Hasil Program"
          subtitle="Perbandingan hasil aktual vs target"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartStacked
          data={stackedData}
          title="Permasalahan Lapangan per Kategori"
          subtitle="Distribusi masalah berdasarkan tahapan"
        />
        <ChartPie
          data={provinceData}
          title="Persebaran Program per Provinsi"
          subtitle="5 provinsi dengan program terbanyak"
        />
      </div>

      <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
        <div className="mb-4 flex items-center gap-3">
          <BarChart3 className="w-5 h-5 text-primary" />
          <div>
            <h3 className="text-lg font-semibold text-foreground">Ranking Provinsi</h3>
            <p className="text-sm text-muted-foreground">Berdasarkan jumlah program aktif</p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={rankingData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <YAxis dataKey="name" type="category" stroke="hsl(var(--muted-foreground))" fontSize={12} width={120} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px'
              }}
            />
            <Bar dataKey="value" radius={[0, 8, 8, 0]}>
              {rankingData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default General;
