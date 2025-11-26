import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
} from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Search, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

export interface SPPGRow {
  id: string;
  nama_sppg: string;
  prog_stat: string;
  kota_kabupaten: string;
  kecamatan: string;
  provinsi: string;
  alamat: string;
  reff_attention: string;
}

interface SPPGDataGridProps {
  data: SPPGRow[];
  onStatusUpdate?: () => void;
}

const getStatusColor = (status: string) => {
  const upperStatus = status.toUpperCase();
  switch (upperStatus) {
    case "APPROVED":
    case "APPROVED KUOTA":
      return "bg-[#bbf7d0] text-green-800";
    case "REJECT":
    case "ON HOLD":
      return "bg-[#fecaca] text-red-800";
    case "PENDING UPDATE":
    default:
      return "bg-[#f1f5f9] text-slate-600";
  }
};

export const SPPGDataGrid = ({ data, onStatusUpdate }: SPPGDataGridProps) => {
  const { isSuperUser } = useAuth();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<SPPGRow | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [editedData, setEditedData] = useState<SPPGRow | null>(null);
  const [saving, setSaving] = useState(false);

  const handleRowClick = (row: SPPGRow) => {
    setSelectedRow(row);
    setEditedData(row);
    setEditMode(false);
    setDetailDialogOpen(true);
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleCancelEdit = () => {
    setEditedData(selectedRow);
    setEditMode(false);
  };

  const handleSave = async () => {
    if (!editedData || !selectedRow) return;

    setSaving(true);
    try {
      const { error } = await supabase
        .from('sppg')
        .update({
          nama_sppg: editedData.nama_sppg,
          prog_stat: editedData.prog_stat,
          kota_kabupaten: editedData.kota_kabupaten,
          kecamatan: editedData.kecamatan,
          provinsi: editedData.provinsi,
          alamat: editedData.alamat,
          reff_attention: editedData.reff_attention,
        })
        .eq('id', selectedRow.id);

      if (error) throw error;

      toast.success('Data berhasil diperbarui');
      setEditMode(false);
      setDetailDialogOpen(false);
      if (onStatusUpdate) {
        onStatusUpdate();
      }
    } catch (error) {
      console.error(error);
      toast.error('Gagal memperbarui data');
    } finally {
      setSaving(false);
    }
  };

  const columns: ColumnDef<SPPGRow>[] = [
    {
      accessorKey: "nama_sppg",
      header: ({ column }) => {
        return (
          <div
            className="flex items-center gap-1 cursor-pointer select-none"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <span className="text-[10px] sm:text-xs md:text-sm">NAMA SPPG</span>
            {column.getIsSorted() === "asc" ? (
              <ArrowUp className="w-3 h-3 md:w-4 md:h-4" />
            ) : column.getIsSorted() === "desc" ? (
              <ArrowDown className="w-3 h-3 md:w-4 md:h-4" />
            ) : (
              <ArrowUpDown className="w-3 h-3 md:w-4 md:h-4 text-muted-foreground" />
            )}
          </div>
        );
      },
      cell: ({ row }) => (
        <div className="font-medium text-foreground text-[10px] sm:text-xs md:text-sm truncate max-w-[80px] sm:max-w-[120px] md:max-w-none">
          {row.getValue("nama_sppg")}
        </div>
      ),
    },
    {
      accessorKey: "prog_stat",
      header: ({ column }) => {
        return (
          <div
            className="flex items-center gap-1 cursor-pointer select-none"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <span className="text-[10px] sm:text-xs md:text-sm">STATUS PENGAJUAN</span>
            {column.getIsSorted() === "asc" ? (
              <ArrowUp className="w-3 h-3 md:w-4 md:h-4" />
            ) : column.getIsSorted() === "desc" ? (
              <ArrowDown className="w-3 h-3 md:w-4 md:h-4" />
            ) : (
              <ArrowUpDown className="w-3 h-3 md:w-4 md:h-4 text-muted-foreground" />
            )}
          </div>
        );
      },
      cell: ({ row }) => {
        const status = (row.getValue("prog_stat") as string) || "PENDING UPDATE";
        return (
          <div className={`px-2 py-1 rounded-md text-[9px] sm:text-[10px] md:text-xs font-medium ${getStatusColor(status)} inline-block`}>
            {status}
          </div>
        );
      },
    },
    {
      accessorKey: "kota_kabupaten",
      header: ({ column }) => {
        return (
          <div
            className="flex items-center gap-1 cursor-pointer select-none"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <span className="text-[10px] sm:text-xs md:text-sm">KOTA/KABUPATEN</span>
            {column.getIsSorted() === "asc" ? (
              <ArrowUp className="w-3 h-3 md:w-4 md:h-4" />
            ) : column.getIsSorted() === "desc" ? (
              <ArrowDown className="w-3 h-3 md:w-4 md:h-4" />
            ) : (
              <ArrowUpDown className="w-3 h-3 md:w-4 md:h-4 text-muted-foreground" />
            )}
          </div>
        );
      },
      cell: ({ row }) => (
        <div className="text-muted-foreground text-[10px] sm:text-xs md:text-sm truncate max-w-[100px] sm:max-w-[150px] md:max-w-none">
          {row.getValue("kota_kabupaten")}
        </div>
      ),
    },
    {
      accessorKey: "kecamatan",
      header: ({ column }) => {
        return (
          <div
            className="flex items-center gap-1 cursor-pointer select-none"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <span className="text-[10px] sm:text-xs md:text-sm">KECAMATAN</span>
            {column.getIsSorted() === "asc" ? (
              <ArrowUp className="w-3 h-3 md:w-4 md:h-4" />
            ) : column.getIsSorted() === "desc" ? (
              <ArrowDown className="w-3 h-3 md:w-4 md:h-4" />
            ) : (
              <ArrowUpDown className="w-3 h-3 md:w-4 md:h-4 text-muted-foreground" />
            )}
          </div>
        );
      },
      cell: ({ row }) => (
        <div className="text-muted-foreground text-[10px] sm:text-xs md:text-sm truncate max-w-[80px] sm:max-w-[120px] md:max-w-none">
          {row.getValue("kecamatan") || "-"}
        </div>
      ),
    },
    {
      accessorKey: "reff_attention",
      header: ({ column }) => {
        return (
          <div
            className="flex items-center gap-1 cursor-pointer select-none"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <span className="text-[10px] sm:text-xs md:text-sm">VERIFIKATOR</span>
            {column.getIsSorted() === "asc" ? (
              <ArrowUp className="w-3 h-3 md:w-4 md:h-4" />
            ) : column.getIsSorted() === "desc" ? (
              <ArrowDown className="w-3 h-3 md:w-4 md:h-4" />
            ) : (
              <ArrowUpDown className="w-3 h-3 md:w-4 md:h-4 text-muted-foreground" />
            )}
          </div>
        );
      },
      cell: ({ row }) => (
        <div className="text-muted-foreground text-[10px] sm:text-xs md:text-sm">
          {row.getValue("reff_attention") || "-"}
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
    initialState: {
      pagination: {
        pageSize: 20,
      },
    },
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="glass rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
        <CardContent className="p-0">
          <div className="p-3 md:p-4 lg:p-6 border-b border-border/50 bg-gradient-to-r from-primary/5 to-accent/5">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 md:gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-4 md:w-5 h-4 md:h-5 text-primary" />
                <Input
                  type="text"
                  placeholder="Cari data SPPG..."
                  value={globalFilter ?? ""}
                  onChange={(e) => setGlobalFilter(e.target.value)}
                  className="pl-10 md:pl-12 h-9 md:h-10 lg:h-12 rounded-xl border-2 focus:border-primary smooth-transition text-xs md:text-sm lg:text-base"
                />
              </div>
              <div className="text-xs md:text-sm text-muted-foreground text-center sm:text-left whitespace-nowrap">
                {table.getFilteredRowModel().rows.length} data
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-primary/10 to-accent/10 sticky top-0 z-10 backdrop-blur-sm">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="px-2 sm:px-3 md:px-4 lg:px-6 py-2 sm:py-3 md:py-4 text-left text-[10px] sm:text-xs md:text-sm font-bold text-foreground uppercase tracking-tight md:tracking-wider"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.length === 0 ? (
                  <tr>
                    <td colSpan={columns.length} className="px-4 py-8 md:py-12 text-center text-xs md:text-sm text-muted-foreground">
                      Tidak ada data yang ditemukan
                    </td>
                  </tr>
                ) : (
                  table.getRowModel().rows.map((row, index) => (
                    <motion.tr
                      key={row.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.02 }}
                      className={`border-t border-border/50 hover:bg-primary/5 smooth-transition cursor-pointer ${
                        index % 2 === 1 ? "bg-slate-50/30" : ""
                      }`}
                      onClick={() => handleRowClick(row.original)}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td key={cell.id} className="px-2 sm:px-3 md:px-4 lg:px-6 py-2 sm:py-3 md:py-4 text-[10px] sm:text-xs md:text-sm">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      ))}
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="px-3 md:px-4 lg:px-6 py-3 md:py-4 lg:py-5 border-t border-border/50 bg-gradient-to-r from-primary/5 to-accent/5">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-[10px] sm:text-xs md:text-sm text-muted-foreground text-center sm:text-left">
                {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} -{" "}
                {Math.min(
                  (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
                  table.getFilteredRowModel().rows.length
                )}{" "}
                dari {table.getFilteredRowModel().rows.length}
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.setPageIndex(0)}
                  disabled={!table.getCanPreviousPage()}
                  className="h-7 w-7 md:h-8 md:w-8 p-0"
                >
                  <ChevronsLeft className="w-3 h-3 md:w-4 md:h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                  className="h-7 w-7 md:h-8 md:w-8 p-0"
                >
                  <ChevronLeft className="w-3 h-3 md:w-4 md:h-4" />
                </Button>
                <div className="text-[10px] sm:text-xs md:text-sm font-medium text-foreground px-2">
                  {table.getState().pagination.pageIndex + 1}/{table.getPageCount()}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                  className="h-7 w-7 md:h-8 md:w-8 p-0"
                >
                  <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                  disabled={!table.getCanNextPage()}
                  className="h-7 w-7 md:h-8 md:w-8 p-0"
                >
                  <ChevronsRight className="w-3 h-3 md:w-4 md:h-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={detailDialogOpen} onOpenChange={setDetailDialogOpen}>
        <DialogContent className="sm:max-w-[90vw] md:max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader className="space-y-3 pb-4 border-b">
            <div className="space-y-1">
              <p className="text-xs md:text-sm text-muted-foreground font-medium">ID SPPG</p>
              <DialogTitle className="text-xl md:text-2xl font-bold text-primary">#{selectedRow?.id}</DialogTitle>
            </div>
          </DialogHeader>
          {selectedRow && (
            <div className="space-y-6 pt-4">
              <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg p-4 md:p-6 space-y-4">
                <h3 className="text-sm md:text-base font-semibold text-foreground mb-4">Informasi Umum</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div className="space-y-2">
                    <Label className="text-xs md:text-sm font-semibold text-foreground">Nama SPPG</Label>
                    {editMode && isSuperUser ? (
                      <Input
                        value={editedData?.nama_sppg || ""}
                        onChange={(e) => setEditedData({ ...editedData!, nama_sppg: e.target.value })}
                        className="text-xs md:text-sm"
                      />
                    ) : (
                      <p className="text-sm md:text-base text-muted-foreground font-medium">{selectedRow.nama_sppg}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs md:text-sm font-semibold text-foreground">Status Pengajuan</Label>
                    {editMode && isSuperUser ? (
                      <Select
                        value={editedData?.prog_stat || ""}
                        onValueChange={(value) => setEditedData({ ...editedData!, prog_stat: value })}
                      >
                        <SelectTrigger className="text-xs md:text-sm">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="PENDING UPDATE">PENDING UPDATE</SelectItem>
                          <SelectItem value="APPROVED">APPROVED</SelectItem>
                          <SelectItem value="APPROVED KUOTA">APPROVED KUOTA</SelectItem>
                          <SelectItem value="ON HOLD">ON HOLD</SelectItem>
                          <SelectItem value="REJECT">REJECT</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <div className={`inline-flex px-3 py-2 rounded-lg text-xs md:text-sm font-semibold ${getStatusColor(selectedRow.prog_stat)}`}>
                        {selectedRow.prog_stat}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-secondary/5 to-accent/5 rounded-lg p-4 md:p-6 space-y-4">
                <h3 className="text-sm md:text-base font-semibold text-foreground mb-4">Lokasi</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div className="space-y-2">
                    <Label className="text-xs md:text-sm font-semibold text-foreground">Provinsi</Label>
                    {editMode && isSuperUser ? (
                      <Input
                        value={editedData?.provinsi || ""}
                        onChange={(e) => setEditedData({ ...editedData!, provinsi: e.target.value })}
                        className="text-xs md:text-sm"
                      />
                    ) : (
                      <p className="text-sm md:text-base text-muted-foreground font-medium">{selectedRow.provinsi}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs md:text-sm font-semibold text-foreground">Kota/Kabupaten</Label>
                    {editMode && isSuperUser ? (
                      <Input
                        value={editedData?.kota_kabupaten || ""}
                        onChange={(e) => setEditedData({ ...editedData!, kota_kabupaten: e.target.value })}
                        className="text-xs md:text-sm"
                      />
                    ) : (
                      <p className="text-sm md:text-base text-muted-foreground font-medium">{selectedRow.kota_kabupaten}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs md:text-sm font-semibold text-foreground">Kecamatan</Label>
                    {editMode && isSuperUser ? (
                      <Input
                        value={editedData?.kecamatan || ""}
                        onChange={(e) => setEditedData({ ...editedData!, kecamatan: e.target.value })}
                        className="text-xs md:text-sm"
                      />
                    ) : (
                      <p className="text-sm md:text-base text-muted-foreground font-medium">{selectedRow.kecamatan || "-"}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs md:text-sm font-semibold text-foreground">Verifikator</Label>
                    {editMode && isSuperUser ? (
                      <Input
                        value={editedData?.reff_attention || ""}
                        onChange={(e) => setEditedData({ ...editedData!, reff_attention: e.target.value })}
                        className="text-xs md:text-sm"
                      />
                    ) : (
                      <p className="text-sm md:text-base text-muted-foreground font-medium">{selectedRow.reff_attention || "-"}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <Label className="text-xs md:text-sm font-semibold text-foreground">Alamat Lengkap</Label>
                  {editMode && isSuperUser ? (
                    <Input
                      value={editedData?.alamat || ""}
                      onChange={(e) => setEditedData({ ...editedData!, alamat: e.target.value })}
                      className="text-xs md:text-sm"
                    />
                  ) : (
                    <p className="text-sm md:text-base text-muted-foreground font-medium">{selectedRow.alamat || "-"}</p>
                  )}
                </div>
              </div>

              {isSuperUser && (
                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
                  {!editMode ? (
                    <Button onClick={handleEdit} className="w-full sm:w-auto text-sm md:text-base px-6 py-2">
                      Edit Data
                    </Button>
                  ) : (
                    <>
                      <Button onClick={handleSave} disabled={saving} className="w-full sm:flex-1 text-sm md:text-base px-6 py-2">
                        {saving ? "Menyimpan..." : "Simpan Perubahan"}
                      </Button>
                      <Button onClick={handleCancelEdit} variant="outline" className="w-full sm:flex-1 text-sm md:text-base px-6 py-2">
                        Batal
                      </Button>
                    </>
                  )}
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};
