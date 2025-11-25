import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Utensils, School, Store, Laptop, CreditCard, Briefcase, Trash2 } from "lucide-react";
import { CleanKPICard } from "@/components/CleanKPICard";
import { CleanStatCard } from "@/components/CleanStatCard";
import { TrendMultiChart } from "@/components/TrendMultiChart";
import { PriorityTable } from "@/components/PriorityTable";
import { SimpleIndonesiaMap } from "@/components/SimpleIndonesiaMap";
import { Skeleton } from "@/components/ui/skeleton";
import { getAllPSNData } from "@/services/psnApi";
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

const GeneralClean = () => {
  const { position } = useAuth();
  const [loading, setLoading] = useState(true);
  const [psnData, setPsnData] = useState<PSNData | null>(null);
  const [selectedYear, setSelectedYear] = useState('2024');
  const [selectedProvince, setSelectedProvince] = useState('Semua');
  const [selectedKPI, setSelectedKPI] = useState('kpi1');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getAllPSNData();
        setPsnData(data);
      } catch (error) {
        console.error('Error fetching PSN data:', error);
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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="lg:col-span-2"
              >
                <TrendMultiChart data={getTrendData()} />
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {statCards.map((card, index) => (
                <CleanStatCard
                  key={card.title}
                  title={card.title}
                  value={card.value}
                  badge={card.badge}
                  delay={0.3 + index * 0.1}
                />
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <SimpleIndonesiaMap
                onProvinceClick={(province) => {
                  setSelectedProvince(province);
                }}
              />
            </motion.div>

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
