import { SPPGDataGrid, type SPPGRow } from "@/components/SPPGDataGrid";
import { AddSPPGDialog } from "@/components/AddSPPGDialog";
import { supabase, type SPPGData } from "@/lib/supabase";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useQuery, useQueryClient } from "@tanstack/react-query";

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
    provinsi: item.provinsi,
    alamat: item.alamat || "-",
    reff_attention: item.reff_attention || "-",
  }));
};

const SPPG = () => {
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Data SPPG</h1>
          <p className="text-muted-foreground">Sistem Pengelolaan dan Pemantauan SPPG Nasional</p>
        </div>
        <AddSPPGDialog onSuccess={handleStatusUpdate} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
          <p className="text-sm text-muted-foreground mb-2">Total SPPG</p>
          <h3 className="text-3xl font-bold text-foreground">{sppgData.length.toLocaleString()}</h3>
        </div>

        <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
          <p className="text-sm text-muted-foreground mb-2">Penerima Manfaat</p>
          <h3 className="text-3xl font-bold text-foreground">41,9 Juta</h3>
        </div>

        <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
          <p className="text-sm text-muted-foreground mb-2">SPPG Beroperasi</p>
          <h3 className="text-3xl font-bold text-foreground">15.433</h3>
          <p className="text-xs text-muted-foreground mt-2">Per 21 November 2025</p>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <SPPGDataGrid data={sppgData} onStatusUpdate={handleStatusUpdate} />
      )}
    </div>
  );
};

export default SPPG;
