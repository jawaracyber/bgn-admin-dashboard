import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Utensils, School, Store, Laptop, CreditCard, Briefcase, Trash2 } from "lucide-react";
import { CleanKPICard } from "@/components/CleanKPICard";
import { StackedAreaChart } from "@/components/StackedAreaChart";
import { CircularProgress } from "@/components/CircularProgress";
import { BudgetCard } from "@/components/BudgetCard";
import { MetricsGrid } from "@/components/MetricsGrid";
import { WeeklyStatsCard } from "@/components/WeeklyStatsCard";
import { ProgramListCard } from "@/components/ProgramListCard";
import { BudgetBreakdownCard } from "@/components/BudgetBreakdownCard";
import { WeeklyLineChart } from "@/components/WeeklyLineChart";
import { WeeklyBarChart } from "@/components/WeeklyBarChart";
import { PriorityTable } from "@/components/PriorityTable";
import { Skeleton } from "@/components/ui/skeleton";
import { getAllPSNData, getBudgetData } from "@/services/psnApi";
import { useAuth } from "@/contexts/AuthContext";

interface PSNData {
  mbg: any;
  sekolah: any;
  koperasi: any;
  digitalisasi: any;
  kesejahteraan: any;
  umkm: any;
  sampah: any;
}

interface BudgetData {
  total: number;
  allocated: number;
  spent: number;
  remaining: number;
  percentage: number;
  monthly: Array<{ month: string; allocated: number; spent: number }>;
  weekly: Array<{ day: string; value: number }>;
  programs: Array<{ name: string; allocated: number; spent: number; percentage: number }>;
  metrics: { desktop: number; mobile: number; tablet: number };
}

const GeneralClean = () => {
  const { position } = useAuth();
  const [loading, setLoading] = useState(true);
  const [psnData, setPsnData] = useState<PSNData | null>(null);
  const [budgetData, setBudgetData] = useState<BudgetData | null>(null);
  const [selectedYear, setSelectedYear] = useState('2024');
  const [selectedProvince, setSelectedProvince] = useState('Semua');
  const [selectedKPI, setSelectedKPI] = useState('kpi1');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [psnDataResult, budgetDataResult] = await Promise.all([
          getAllPSNData(),
          getBudgetData()
        ]);
        setPsnData(psnDataResult);
        setBudgetData(budgetDataResult);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedYear, selectedProvince]);

  const getTrendData = () => {
    if (!psnData) return [];

    const dates = psnData.mbg.timeseries.map((t: any) => t.date);
    return dates.map((date: string, index: number) => ({
      date,
      mbg: psnData.mbg.timeseries[index]?.value || 0,
      sekolah: psnData.sekolah.timeseries[index]?.value || 0,
      koperasi: psnData.koperasi.timeseries[index]?.value || 0,
      digitalisasi: psnData.digitalisasi.timeseries[index]?.value || 0,
      kesejahteraan: psnData.kesejahteraan.timeseries[index]?.value || 0,
      umkm: psnData.umkm.timeseries[index]?.value || 0,
      sampah: psnData.sampah.timeseries[index]?.value || 0,
    }));
  };

  const getPriorityTableData = () => {
    if (!psnData) return [];

    const provinceNames = psnData.mbg.provinsi.map((p: any) => p.prov);

    return provinceNames.map((provinsi: string) => {
      const mbg = psnData.mbg.provinsi.find((p: any) => p.prov === provinsi)?.value || 0;
      const sekolah = psnData.sekolah.provinsi.find((p: any) => p.prov === provinsi)?.value || 0;
      const digitalisasi = psnData.digitalisasi.provinsi.find((p: any) => p.prov === provinsi)?.value || 0;
      const kesejahteraan = psnData.kesejahteraan.provinsi.find((p: any) => p.prov === provinsi)?.value || 0;
      const umkm = psnData.umkm.provinsi.find((p: any) => p.prov === provinsi)?.value || 0;
      const sampah = psnData.sampah.provinsi.find((p: any) => p.prov === provinsi)?.value || 0;

      const priorityScore =
        0.3 * (1 - mbg / 100) +
        0.2 * (1 - sekolah / 100) +
        0.1 * (1 - digitalisasi / 100) +
        0.2 * (1 - kesejahteraan / 100) +
        0.1 * (1 - umkm / 100) +
        0.1 * (sampah / 100);

      return {
        provinsi,
        mbg,
        sekolah,
        digitalisasi,
        kesejahteraan,
        umkm,
        sampah,
        priorityScore,
      };
    });
  };

  const calculateTrend = (timeseries: any[]) => {
    if (!timeseries || timeseries.length < 2) return 0;
    const latest = timeseries[timeseries.length - 1].value;
    const previous = timeseries[timeseries.length - 2].value;
    return previous > 0 ? ((latest - previous) / previous) * 100 : 0;
  };

  const getMapData = () => {
    if (!psnData) return undefined;

    const provinceCoordinates: Record<string, { cx: number; cy: number; region: string }> = {
      'Aceh': { cx: 15, cy: 8, region: 'Sumatera' },
      'Sumatera Utara': { cx: 18, cy: 12, region: 'Sumatera' },
      'Sumatera Barat': { cx: 15, cy: 18, region: 'Sumatera' },
      'Riau': { cx: 22, cy: 16, region: 'Sumatera' },
      'Jambi': { cx: 22, cy: 22, region: 'Sumatera' },
      'Sumatera Selatan': { cx: 24, cy: 28, region: 'Sumatera' },
      'Lampung': { cx: 25, cy: 35, region: 'Sumatera' },
      'Banten': { cx: 33, cy: 38, region: 'Jawa' },
      'DKI Jakarta': { cx: 35, cy: 38, region: 'Jawa' },
      'Jawa Barat': { cx: 37, cy: 40, region: 'Jawa' },
      'Jawa Tengah': { cx: 44, cy: 42, region: 'Jawa' },
      'DI Yogyakarta': { cx: 46, cy: 44, region: 'Jawa' },
      'Jawa Timur': { cx: 53, cy: 43, region: 'Jawa' },
      'Kalimantan Barat': { cx: 42, cy: 16, region: 'Kalimantan' },
      'Kalimantan Tengah': { cx: 48, cy: 24, region: 'Kalimantan' },
      'Kalimantan Selatan': { cx: 50, cy: 30, region: 'Kalimantan' },
      'Kalimantan Timur': { cx: 56, cy: 20, region: 'Kalimantan' },
      'Sulawesi Utara': { cx: 65, cy: 10, region: 'Sulawesi' },
      'Sulawesi Tengah': { cx: 63, cy: 20, region: 'Sulawesi' },
      'Sulawesi Selatan': { cx: 62, cy: 32, region: 'Sulawesi' },
      'Sulawesi Tenggara': { cx: 66, cy: 30, region: 'Sulawesi' },
      'Bali': { cx: 52, cy: 45, region: 'Bali-NTT' },
      'NTB': { cx: 58, cy: 46, region: 'Bali-NTT' },
      'NTT': { cx: 64, cy: 50, region: 'Bali-NTT' },
      'Maluku': { cx: 72, cy: 28, region: 'Maluku' },
      'Maluku Utara': { cx: 70, cy: 18, region: 'Maluku' },
      'Papua Barat': { cx: 76, cy: 22, region: 'Papua' },
      'Papua': { cx: 85, cy: 28, region: 'Papua' },
    };

    return psnData.mbg.provinsi.map((prov: any) => {
      const coords = provinceCoordinates[prov.prov] || { cx: 50, cy: 30, region: 'Jawa' };
      const provinceKey = prov.prov.toLowerCase().replace(/\s+/g, '');

      return {
        id: provinceKey,
        name: prov.prov,
        value: Math.round(prov.value * 1000),
        percentage: Math.round(prov.value),
        cx: coords.cx,
        cy: coords.cy,
        region: coords.region as 'Sumatera' | 'Jawa' | 'Kalimantan' | 'Sulawesi' | 'Papua' | 'Maluku' | 'Bali-NTT',
      };
    });
  };

  const kpiCards = psnData ? [
    {
      title: "Makan Bergizi Gratis",
      value: psnData.mbg.persentase,
      unit: "%",
      subtitle: `${psnData.mbg.realisasi.toLocaleString('id-ID')} dari ${psnData.mbg.target.toLocaleString('id-ID')} porsi`,
      icon: Utensils,
      color: '#6ee7b7',
      trend: calculateTrend(psnData.mbg.timeseries),
      timeseries: psnData.mbg.timeseries
    },
    {
      title: "Sekolah Rakyat",
      value: psnData.sekolah.persentase,
      unit: "%",
      subtitle: `${psnData.sekolah.realisasi.toLocaleString('id-ID')} sekolah`,
      icon: School,
      color: '#93c5fd',
      trend: calculateTrend(psnData.sekolah.timeseries),
      timeseries: psnData.sekolah.timeseries
    },
    {
      title: "Koperasi Merah Putih",
      value: psnData.koperasi.persentase,
      unit: "%",
      subtitle: `${psnData.koperasi.realisasi.toLocaleString('id-ID')} koperasi`,
      icon: Store,
      color: '#fca5a5',
      trend: calculateTrend(psnData.koperasi.timeseries),
      timeseries: psnData.koperasi.timeseries
    },
    {
      title: "Digitalisasi Pendidikan",
      value: psnData.digitalisasi.persentase,
      unit: "%",
      subtitle: `${psnData.digitalisasi.realisasi.toLocaleString('id-ID')} sekolah`,
      icon: Laptop,
      color: '#c4b5fd',
      trend: calculateTrend(psnData.digitalisasi.timeseries),
      timeseries: psnData.digitalisasi.timeseries
    },
  ] : [];

  const statCards = psnData ? [
    {
      title: "Kesejahteraan",
      value: psnData.kesejahteraan.persentase + "%",
      badge: "+42%"
    },
    {
      title: "UMKM",
      value: psnData.umkm.realisasi.toLocaleString('id-ID'),
      badge: "+125%"
    },
    {
      title: "Pengelolaan Sampah",
      value: psnData.sampah.persentase + "%",
      badge: "+23%"
    }
  ] : [];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1400px] mx-auto p-4 md:p-6 lg:p-8 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
            DASHBOARD
          </h1>
          <p className="text-sm text-gray-500">
            Welcome back, {position}
          </p>
        </motion.div>

        {loading ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-40 rounded-xl" />
              ))}
            </div>
            <Skeleton className="h-96 w-full rounded-xl" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {kpiCards.map((card, index) => (
                <CleanKPICard
                  key={card.title}
                  title={card.title}
                  value={card.value}
                  unit={card.unit}
                  subtitle={card.subtitle}
                  icon={card.icon}
                  color={card.color}
                  trend={card.trend}
                  timeseries={card.timeseries}
                  delay={index * 0.1}
                />
              ))}
            </div>

            <div className="grid grid-cols-1 gap-4">
              <StackedAreaChart
                data={[
                  { label: 'Layer 1', values: Array.from({length: 15}, (_, i) => 30 + Math.sin(i * 0.5) * 10) },
                  { label: 'Layer 2', values: Array.from({length: 15}, (_, i) => 40 + Math.sin(i * 0.5) * 8) },
                  { label: 'Layer 3', values: Array.from({length: 15}, (_, i) => 50 + Math.sin(i * 0.5) * 12) },
                  { label: 'Layer 4', values: Array.from({length: 15}, (_, i) => 60 + Math.sin(i * 0.5) * 15) }
                ]}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <CircularProgress
                value={budgetData?.percentage || 0}
                label="Budget Terserap"
              />

              <div className="md:col-span-3">
                <BudgetCard
                  metrics={[
                    { label: 'ut enim ad minim veniam quis nostrud', value: '45.738' },
                    { label: 'exercitation ullamco laboris nisi ut aliquip', value: '39.732' },
                  ]}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <WeeklyBarChart
                data={budgetData?.weekly || []}
                title="Activity by Day"
              />

              <WeeklyLineChart />
            </div>

            <MetricsGrid
              desktop={budgetData?.metrics.desktop || 0}
              mobile={budgetData?.metrics.mobile || 0}
              tablet={budgetData?.metrics.tablet || 0}
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <BudgetBreakdownCard />
              <WeeklyStatsCard />
            </div>

            <ProgramListCard />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <PriorityTable data={getPriorityTableData()} />
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
};

export default GeneralClean;
