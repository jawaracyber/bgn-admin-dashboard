import { SPPGDataGrid, type SPPGRow } from "@/components/SPPGDataGrid";
import { AddSPPGDialog } from "@/components/AddSPPGDialog";
import { supabase, type SPPGData } from "@/lib/supabase";
import { Loader2, Database, Users, Building2, TrendingUp } from "lucide-react";
import { toast } from "sonner";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import CardKPI from "@/components/CardKPI";
import { useAuth } from "@/contexts/AuthContext";

const fetchSPPGData = async (): Promise<SPPGRow[]> => {
  const { data, error } = await supabase
    .from('sppg')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;

  return (data || []).map((item: SPPGData) => ({
    id: item.id,
    prog_stat: item.prog_stat || "PENDING UPDATE",
    kota_kabupaten: item.kota_kabupaten,
    kecamatan: item.kecamatan || "-",
    provinsi: item.provinsi,
    alamat: item.alamat || "-",
    reff_attention: item.reff_attention || "-",
  }));
};

const SPPG = () => {
  const { isReadOnly } = useAuth();
  const queryClient = useQueryClient();

  const { data: sppgData = [], isLoading: loading } = useQuery({
    queryKey: ['sppg-data'],
    queryFn: fetchSPPGData,
    refetchOnWindowFocus: true,
  });

  const handleStatusUpdate = () => {
    queryClient.invalidateQueries({ queryKey: ['sppg-data'] });
    toast.success('Data berhasil dimuat ulang');
  };

  const approvedCount = sppgData.filter(item =>
    item.prog_stat === "APPROVED" || item.prog_stat === "APPROVED KUOTA"
  ).length;

  const pendingCount = sppgData.filter(item =>
    item.prog_stat === "PENDING UPDATE"
  ).length;

  return (
    <div className="space-y-6 md:space-y-8 p-4 md:p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent mb-2 md:mb-3">
            Data SPPG
          </h1>
          <p className="text-muted-foreground text-sm md:text-base lg:text-lg">
            Sistem Pengelolaan dan Pemantauan SPPG Nasional
          </p>
        </div>
        {!isReadOnly && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <AddSPPGDialog onSuccess={handleStatusUpdate} />
          </motion.div>
        )}
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <CardKPI
          title="Total SPPG"
          value={sppgData.length.toLocaleString()}
          icon={Database}
          trend="+12.5%"
          trendUp={true}
          gradient="primary"
          delay={0.1}
        />
        <CardKPI
          title="Penerima Manfaat"
          value="41,9 Juta"
          icon={Users}
          trend="+8.3%"
          trendUp={true}
          gradient="secondary"
          delay={0.2}
        />
        <CardKPI
          title="SPPG Beroperasi"
          value="15.433"
          icon={Building2}
          trend="+5.2%"
          trendUp={true}
          gradient="accent"
          delay={0.3}
        />
        <CardKPI
          title="SPPG Disetujui"
          value={approvedCount.toLocaleString()}
          icon={TrendingUp}
          trend={`${pendingCount} Pending`}
          trendUp={false}
          gradient="warm"
          delay={0.4}
        />
      </div>

      {loading ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-20 glass rounded-2xl"
        >
          <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
          <p className="text-muted-foreground">Memuat data SPPG...</p>
        </motion.div>
      ) : (
        <SPPGDataGrid data={sppgData} onStatusUpdate={handleStatusUpdate} />
      )}
    </div>
  );
};

export default SPPG;
