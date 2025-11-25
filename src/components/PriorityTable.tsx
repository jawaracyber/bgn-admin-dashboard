import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowUpDown, ArrowUp, ArrowDown, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

interface ProvinceScore {
  provinsi: string;
  mbg: number;
  sekolah: number;
  digitalisasi: number;
  kesejahteraan: number;
  umkm: number;
  sampah: number;
  priorityScore: number;
}

interface PriorityTableProps {
  data: ProvinceScore[];
}

type SortField = keyof ProvinceScore;
type SortDirection = 'asc' | 'desc';

export const PriorityTable = ({ data }: PriorityTableProps) => {
  const [sortField, setSortField] = useState<SortField>('priorityScore');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const sortedData = [...data].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    const multiplier = sortDirection === 'asc' ? 1 : -1;
    return (aValue > bValue ? 1 : -1) * multiplier;
  });

  const renderSortIcon = (field: SortField) => {
    if (sortField !== field) return <ArrowUpDown className="w-4 h-4 text-muted-foreground" />;
    return sortDirection === 'asc'
      ? <ArrowUp className="w-4 h-4 text-primary" />
      : <ArrowDown className="w-4 h-4 text-primary" />;
  };

  const getPriorityColor = (score: number) => {
    if (score >= 0.5) return "text-red-600 bg-red-50 font-bold";
    if (score >= 0.3) return "text-yellow-600 bg-yellow-50 font-semibold";
    return "text-green-600 bg-green-50";
  };

  const getScoreColor = (score: number) => {
    if (score >= 75) return "text-green-600";
    if (score >= 50) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.7 }}
    >
      <Card className="glass border-white/20 shadow-xl">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center shadow-lg">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground">Ranking Prioritas Provinsi</h3>
              <p className="text-sm text-muted-foreground">Urutan provinsi berdasarkan skor prioritas PSN</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  <TableHead className="font-bold">No</TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-slate-100 transition-colors"
                    onClick={() => handleSort('provinsi')}
                  >
                    <div className="flex items-center gap-2">
                      Provinsi
                      {renderSortIcon('provinsi')}
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-slate-100 transition-colors text-center"
                    onClick={() => handleSort('mbg')}
                  >
                    <div className="flex items-center justify-center gap-2">
                      MBG
                      {renderSortIcon('mbg')}
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-slate-100 transition-colors text-center"
                    onClick={() => handleSort('sekolah')}
                  >
                    <div className="flex items-center justify-center gap-2">
                      Sekolah
                      {renderSortIcon('sekolah')}
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-slate-100 transition-colors text-center"
                    onClick={() => handleSort('digitalisasi')}
                  >
                    <div className="flex items-center justify-center gap-2">
                      Digital
                      {renderSortIcon('digitalisasi')}
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-slate-100 transition-colors text-center"
                    onClick={() => handleSort('kesejahteraan')}
                  >
                    <div className="flex items-center justify-center gap-2">
                      Sejahtera
                      {renderSortIcon('kesejahteraan')}
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-slate-100 transition-colors text-center"
                    onClick={() => handleSort('umkm')}
                  >
                    <div className="flex items-center justify-center gap-2">
                      UMKM
                      {renderSortIcon('umkm')}
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-slate-100 transition-colors text-center"
                    onClick={() => handleSort('sampah')}
                  >
                    <div className="flex items-center justify-center gap-2">
                      Sampah
                      {renderSortIcon('sampah')}
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-slate-100 transition-colors text-center"
                    onClick={() => handleSort('priorityScore')}
                  >
                    <div className="flex items-center justify-center gap-2 font-bold">
                      Skor Prioritas
                      {renderSortIcon('priorityScore')}
                    </div>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedData.map((row, index) => (
                  <TableRow
                    key={row.provinsi}
                    className="hover:bg-primary/5 transition-colors"
                  >
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell className="font-semibold">{row.provinsi}</TableCell>
                    <TableCell className={`text-center ${getScoreColor(row.mbg)}`}>
                      {row.mbg.toFixed(1)}%
                    </TableCell>
                    <TableCell className={`text-center ${getScoreColor(row.sekolah)}`}>
                      {row.sekolah.toFixed(1)}%
                    </TableCell>
                    <TableCell className={`text-center ${getScoreColor(row.digitalisasi)}`}>
                      {row.digitalisasi.toFixed(1)}%
                    </TableCell>
                    <TableCell className={`text-center ${getScoreColor(row.kesejahteraan)}`}>
                      {row.kesejahteraan.toFixed(1)}%
                    </TableCell>
                    <TableCell className={`text-center ${getScoreColor(row.umkm)}`}>
                      {row.umkm.toFixed(1)}%
                    </TableCell>
                    <TableCell className={`text-center ${getScoreColor(row.sampah)}`}>
                      {row.sampah.toFixed(1)}%
                    </TableCell>
                    <TableCell className="text-center">
                      <span className={`px-3 py-1 rounded-full text-sm ${getPriorityColor(row.priorityScore)}`}>
                        {row.priorityScore.toFixed(3)}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
