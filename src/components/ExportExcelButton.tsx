import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import * as XLSX from "xlsx";

export const ExportExcelButton = () => {
  const [isExporting, setIsExporting] = useState(false);

  const exportToExcel = async () => {
    setIsExporting(true);
    try {
      const { data, error } = await supabase
        .from('sppg')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (!data || data.length === 0) {
        toast.error('Tidak ada data untuk diekspor');
        return;
      }

      const exportData = data.map((item) => ({
        ID: item.id,
        'Nama SPPG': item.nama_sppg,
        'Status Pengajuan': item.prog_stat || 'PENDING UPDATE',
        'Progress': item.progress || 'PERSIAPAN UPDATE',
        Provinsi: item.provinsi,
        'Kota/Kabupaten': item.kota_kabupaten,
        Kecamatan: item.kecamatan || '-',
        'Alamat Lengkap': item.alamat || '-',
        Verifikator: item.reff_attention || '-',
        'Tanggal Dibuat': item.created_at ? new Date(item.created_at).toLocaleString('id-ID') : '-',
        'Terakhir Diupdate': item.updated_at ? new Date(item.updated_at).toLocaleString('id-ID') : '-',
      }));

      const ws = XLSX.utils.json_to_sheet(exportData);

      const colWidths = [
        { wch: 38 },
        { wch: 40 },
        { wch: 18 },
        { wch: 20 },
        { wch: 20 },
        { wch: 25 },
        { wch: 20 },
        { wch: 50 },
        { wch: 15 },
        { wch: 20 },
        { wch: 20 },
      ];
      ws['!cols'] = colWidths;

      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Data SPPG');

      const timestamp = new Date().toISOString().split('T')[0];
      XLSX.writeFile(wb, `Data_SPPG_${timestamp}.xlsx`);

      toast.success(`Data berhasil diekspor (${data.length} baris)`);
    } catch (error) {
      console.error('Error exporting data:', error);
      toast.error('Gagal mengekspor data ke Excel');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Button
      onClick={exportToExcel}
      disabled={isExporting}
      variant="outline"
      className="gap-2"
    >
      {isExporting ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          Mengekspor...
        </>
      ) : (
        <>
          <Download className="w-4 h-4" />
          Export Excel
        </>
      )}
    </Button>
  );
};
