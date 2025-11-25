import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Utensils, School, Store, Laptop, CreditCard, Briefcase, Trash2 } from "lucide-react";
import { FilterBar } from "@/components/FilterBar";
import { ProgramCard } from "@/components/ProgramCard";
import { TrendMultiChart } from "@/components/TrendMultiChart";
import { PriorityTable } from "@/components/PriorityTable";
import { IndonesiaMap } from "@/components/IndonesiaMap";
import { Skeleton } from "@/components/ui/skeleton";
import { getAllPSNData } from "@/services/psnApi";

interface PSNData {
  mbg: any;
  sekolah: any;
  koperasi: any;
  digitalisasi: any;
  kesejahteraan: any;
  umkm: any;
  sampah: any;
}

const General = () => {
  const [loading, setLoading] = useState(true);
  const [psnData, setPsnData] = useState<PSNData | null>(null);
  const [selectedYear, setSelectedYear] = useState('2024');
  const [selectedProvince, setSelectedProvince] = useState('Semua');
  const [selectedProgram, setSelectedProgram] = useState('Semua Program');
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
  }, [selectedYear, selectedProvince, selectedProgram]);

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

  const programs = psnData ? [
    {
      title: "Makan Bergizi Gratis",
      icon: Utensils,
      color: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
      data: psnData.mbg,
      unit: " porsi"
    },
    {
      title: "Sekolah Rakyat",
      icon: School,
      color: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
      data: psnData.sekolah,
      unit: " sekolah"
    },
    {
      title: "Koperasi Merah Putih",
      icon: Store,
      color: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
      data: psnData.koperasi,
      unit: " koperasi"
    },
    {
      title: "Digitalisasi Pendidikan",
      icon: Laptop,
      color: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
      data: psnData.digitalisasi,
      unit: " sekolah"
    },
    {
      title: "Kartu Kesejahteraan",
      icon: CreditCard,
      color: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
      data: psnData.kesejahteraan,
      unit: " penerima"
    },
    {
      title: "Kartu Usaha Afirmatif",
      icon: Briefcase,
      color: "linear-gradient(135deg, #ec4899 0%, #db2777 100%)",
      data: psnData.umkm,
      unit: " UMKM"
    },
    {
      title: "Pengelolaan Sampah",
      icon: Trash2,
      color: "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)",
      data: psnData.sampah,
      unit: " kab/kota"
    }
  ] : [];

  return (
    <div className="space-y-6 md:space-y-8 p-4 md:p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent mb-3">
          DASHBOARD PROGRAM STRATEGIS NASIONAL
        </h1>
        <p className="text-muted-foreground text-sm md:text-base lg:text-lg">
          Monitoring dan evaluasi 7 Program Strategis Nasional Indonesia
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <FilterBar
          selectedYear={selectedYear}
          selectedProvince={selectedProvince}
          selectedProgram={selectedProgram}
          onYearChange={setSelectedYear}
          onProvinceChange={setSelectedProvince}
          onProgramChange={setSelectedProgram}
        />
      </motion.div>

      {loading ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {[...Array(7)].map((_, i) => (
              <div key={i} className="space-y-3 p-6 glass rounded-2xl border border-white/20">
                <Skeleton className="h-12 w-12 rounded-xl" />
                <Skeleton className="h-4 w-3/4" />
                <div className="grid grid-cols-2 gap-3">
                  <Skeleton className="h-16 rounded-lg" />
                  <Skeleton className="h-16 rounded-lg" />
                </div>
                <Skeleton className="h-12 w-full" />
              </div>
            ))}
          </div>
          <Skeleton className="h-96 w-full rounded-2xl" />
          <Skeleton className="h-96 w-full rounded-2xl" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {programs.map((program, index) => (
              <ProgramCard
                key={program.title}
                title={program.title}
                icon={program.icon}
                target={program.data.target}
                realisasi={program.data.realisasi}
                persentase={program.data.persentase}
                timeseries={program.data.timeseries}
                color={program.color}
                delay={0.1 + index * 0.05}
                unit={program.unit}
              />
            ))}
          </div>

          <IndonesiaMap
            selectedKPI={selectedKPI}
            onProvinceClick={(province) => {
              setSelectedProvince(province);
            }}
          />

          <TrendMultiChart data={getTrendData()} />

          <PriorityTable data={getPriorityTableData()} />
        </>
      )}
    </div>
  );
};

export default General;
