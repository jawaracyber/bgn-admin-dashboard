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

interface DataTableProps {
  data: any[];
}

const DataTable = ({ data }: DataTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
  const [statusData, setStatusData] = useState<Record<number, string>>({});
  const itemsPerPage = 20;

  const handleStatusChange = (index: number, value: string) => {
    setStatusData(prev => ({ ...prev, [index]: value }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Waiting Review":
        return "bg-chart-yellow/10 text-chart-yellow border-chart-yellow/20";
      case "Rejected":
        return "bg-chart-red/10 text-chart-red border-chart-red/20";
      case "Approved Kuota":
        return "bg-chart-teal/10 text-chart-teal border-chart-teal/20";
      case "Approved Coordinate":
        return "bg-chart-blue/10 text-chart-blue border-chart-blue/20";
      default:
        return "bg-muted text-muted-foreground border-border";
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
              const globalIndex = startIndex + index;
              const currentStatus = statusData[globalIndex] || "PENDING UPDATE";
              const showReffAttention = currentStatus === "Approved Kuota" || currentStatus === "Approved Coordinate";
              
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
                      onValueChange={(value) => handleStatusChange(globalIndex, value)}
                    >
                      <SelectTrigger className={`w-[180px] border ${getStatusColor(currentStatus)}`}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border z-50">
                        <SelectItem value="PENDING UPDATE" className="bg-muted/50 text-muted-foreground">
                          PENDING UPDATE
                        </SelectItem>
                        <SelectItem value="Waiting Review" className="text-chart-yellow">
                          Waiting Review
                        </SelectItem>
                        <SelectItem value="Rejected" className="text-chart-red">
                          Rejected
                        </SelectItem>
                        <SelectItem value="Approved Kuota" className="text-chart-teal">
                          Approved Kuota
                        </SelectItem>
                        <SelectItem value="Approved Coordinate" className="text-chart-blue">
                          Approved Coordinate
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="px-6 py-4">
                    {showReffAttention && (
                      <div className="flex items-center gap-2">
                        <Award className="w-5 h-5 text-chart-blue" />
                        <span className="text-sm font-bold text-foreground">PR07</span>
                      </div>
                    )}
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
