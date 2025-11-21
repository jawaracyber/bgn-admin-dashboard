import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Search, ArrowUpDown, Award } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

interface DataTableProps {
  data: any[];
  onStatusUpdate?: () => void;
}


const DataTable = ({ data, onStatusUpdate }: DataTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
  const itemsPerPage = 20;


  const getStatusColor = (status: string) => {
    switch (status) {
      case "Koordinat Disetujui":
        return "bg-[#bbf7d0] text-green-800";
      case "Dipertimbangkan":
        return "bg-[#fef9c3] text-yellow-800";
      case "Koordinat Ditolak":
        return "bg-[#fecaca] text-red-800";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/update-sppg-status`;
      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id_sppg: id,
          prog_stat: newStatus,
        }),
      });

      if (!response.ok) {
        throw new Error('Gagal memperbarui status');
      }

      toast.success('Status berhasil diperbarui');
      if (onStatusUpdate) {
        onStatusUpdate();
      }
    } catch (error) {
      toast.error('Gagal memperbarui status');
      console.error(error);
    }
  };

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const filteredData = useMemo(() => {
    return data.filter((item) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [data, searchTerm]);

  const sortedData = useMemo(() => {
    if (!sortConfig) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortConfig]);

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = sortedData.slice(startIndex, endIndex);

  return (
    <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Cari data SPPG..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-10"
            />
          </div>
          <div className="text-sm text-muted-foreground">
            {sortedData.length} data ditemukan
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              {["ID SPPG", "Status Pengajuan", "Reff Attention", "Kota / Kabupaten", "Kecamatan", "Provinsi"].map((header) => (
                <th
                  key={header}
                  className="px-6 py-4 text-left text-sm font-semibold text-foreground cursor-pointer hover:bg-muted/80 transition-colors"
                  onClick={() => handleSort(header)}
                >
                  <div className="flex items-center gap-2">
                    {header}
                    <ArrowUpDown className="w-4 h-4 text-muted-foreground" />
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentData.map((row, index) => {
              const currentStatus = row["Status Pengajuan"] || "Dipertimbangkan";
              const reffAttention = row["Reff Attention"] || "-";
              const isApproved = currentStatus === "Koordinat Disetujui";

              return (
                <tr
                  key={index}
                  className="border-t border-border hover:bg-muted/30 transition-colors"
                >
                  <td className="px-6 py-4 text-sm font-medium text-foreground">
                    {row["ID SPPG"]}
                  </td>
                  <td className="px-6 py-4">
                    <Select
                      value={currentStatus}
                      onValueChange={(value) => handleStatusChange(row["ID SPPG"], value)}
                    >
                      <SelectTrigger className={`w-[200px] ${getStatusColor(currentStatus)}`}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border z-50">
                        <SelectItem value="Dipertimbangkan" className="bg-[#fef9c3] text-yellow-800">
                          Dipertimbangkan
                        </SelectItem>
                        <SelectItem value="Koordinat Disetujui" className="bg-[#bbf7d0] text-green-800">
                          Koordinat Disetujui
                        </SelectItem>
                        <SelectItem value="Koordinat Ditolak" className="bg-[#fecaca] text-red-800">
                          Koordinat Ditolak
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="px-6 py-4">
                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md ${isApproved ? 'bg-green-500/20 border border-green-500/30' : ''}`}>
                      <Award className={`w-5 h-5 ${isApproved ? 'text-green-600' : 'text-muted-foreground'}`} />
                      <span className={`text-sm font-bold ${isApproved ? 'text-green-700' : 'text-muted-foreground'}`}>
                        {reffAttention}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {row["Kota / Kabupaten"]}
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {row["Kecamatan"]}
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {row["Provinsi"]}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="px-6 py-4 border-t border-border flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Menampilkan {startIndex + 1} - {Math.min(endIndex, sortedData.length)} dari {sortedData.length} data
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <div className="text-sm font-medium text-foreground">
            Halaman {currentPage} dari {totalPages}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
