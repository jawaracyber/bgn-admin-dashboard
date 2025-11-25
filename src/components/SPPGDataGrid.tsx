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
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Search, ArrowUpDown, ArrowUp, ArrowDown, Eye, MoreVertical, Star } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

export interface SPPGRow {
  id: string;
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

const handleStatusChange = async (id: string, newStatus: string, onStatusUpdate?: () => void) => {
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
        reff_attention: 'PR07',
      }),
    });

    if (!response.ok) {
      throw new Error('Gagal memperbarui status');
    }

    toast.success('Status dan Reff Attention berhasil diperbarui');
    window.location.reload();
  } catch (error) {
    toast.error('Gagal memperbarui status');
    console.error(error);
  }
};

const handleSetReffAttention = async (id: string, onStatusUpdate?: () => void) => {
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
        reff_attention: 'PR07',
      }),
    });

    if (!response.ok) {
      throw new Error('Gagal memperbarui reff attention');
    }

    toast.success('Reff Attention berhasil diubah ke PR07');
    window.location.reload();
  } catch (error) {
    toast.error('Gagal memperbarui reff attention');
    console.error(error);
  }
};

export const SPPGDataGrid = ({ data, onStatusUpdate }: SPPGDataGridProps) => {
  const { isReadOnly } = useAuth();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);

  const columns: ColumnDef<SPPGRow>[] = [
    {
      accessorKey: "id",
      header: ({ column }) => {
        return (
          <div
            className="flex items-center gap-2 cursor-pointer select-none"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            ID SPPG
            {column.getIsSorted() === "asc" ? (
              <ArrowUp className="w-4 h-4" />
            ) : column.getIsSorted() === "desc" ? (
              <ArrowDown className="w-4 h-4" />
            ) : (
              <ArrowUpDown className="w-4 h-4 text-muted-foreground" />
            )}
          </div>
        );
      },
      cell: ({ row }) => (
        <div className="font-medium text-foreground">{row.getValue("id")}</div>
      ),
    },
    {
      accessorKey: "prog_stat",
      header: ({ column }) => {
        return (
          <div
            className="flex items-center gap-2 cursor-pointer select-none"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Status Pengajuan
            {column.getIsSorted() === "asc" ? (
              <ArrowUp className="w-4 h-4" />
            ) : column.getIsSorted() === "desc" ? (
              <ArrowDown className="w-4 h-4" />
            ) : (
              <ArrowUpDown className="w-4 h-4 text-muted-foreground" />
            )}
          </div>
        );
      },
      cell: ({ row }) => {
        const status = (row.getValue("prog_stat") as string) || "PENDING UPDATE";

        if (isReadOnly) {
          return (
            <div className={`w-[140px] md:w-[180px] px-3 py-2 rounded-md text-xs md:text-sm font-medium ${getStatusColor(status)}`}>
              {status}
            </div>
          );
        }

        return (
          <Select
            value={status}
            onValueChange={(value) => handleStatusChange(row.original.id, value, onStatusUpdate)}
          >
            <SelectTrigger className={`w-[140px] md:w-[180px] border rounded-md shadow-sm text-xs md:text-sm ${getStatusColor(status)}`}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white rounded-md shadow-md border z-50">
              <SelectItem value="PENDING UPDATE" className="cursor-pointer hover:bg-slate-100 text-xs md:text-sm py-1.5">
                PENDING UPDATE
              </SelectItem>
              <SelectItem value="APPROVED" className="cursor-pointer hover:bg-slate-100 text-xs md:text-sm py-1.5">
                APPROVED
              </SelectItem>
              <SelectItem value="APPROVED KUOTA" className="cursor-pointer hover:bg-slate-100 text-xs md:text-sm py-1.5">
                APPROVED KUOTA
              </SelectItem>
              <SelectItem value="ON HOLD" className="cursor-pointer hover:bg-slate-100 text-xs md:text-sm py-1.5">
                ON HOLD
              </SelectItem>
              <SelectItem value="REJECT" className="cursor-pointer hover:bg-slate-100 text-xs md:text-sm py-1.5">
                REJECT
              </SelectItem>
            </SelectContent>
          </Select>
        );
      },
    },
    {
      accessorKey: "kota_kabupaten",
      header: ({ column }) => {
        return (
          <div
            className="flex items-center gap-2 cursor-pointer select-none"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Kota/Kabupaten
            {column.getIsSorted() === "asc" ? (
              <ArrowUp className="w-4 h-4" />
            ) : column.getIsSorted() === "desc" ? (
              <ArrowDown className="w-4 h-4" />
            ) : (
              <ArrowUpDown className="w-4 h-4 text-muted-foreground" />
            )}
          </div>
        );
      },
      cell: ({ row }) => (
        <div className="text-muted-foreground">{row.getValue("kota_kabupaten")}</div>
      ),
    },
    {
      accessorKey: "kecamatan",
      header: ({ column }) => {
        return (
          <div
            className="flex items-center gap-2 cursor-pointer select-none"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Kecamatan
            {column.getIsSorted() === "asc" ? (
              <ArrowUp className="w-4 h-4" />
            ) : column.getIsSorted() === "desc" ? (
              <ArrowDown className="w-4 h-4" />
            ) : (
              <ArrowUpDown className="w-4 h-4 text-muted-foreground" />
            )}
          </div>
        );
      },
      cell: ({ row }) => (
        <div className="text-muted-foreground">{row.getValue("kecamatan") || "-"}</div>
      ),
    },
    {
      accessorKey: "provinsi",
      header: ({ column }) => {
        return (
          <div
            className="flex items-center gap-2 cursor-pointer select-none"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Provinsi
            {column.getIsSorted() === "asc" ? (
              <ArrowUp className="w-4 h-4" />
            ) : column.getIsSorted() === "desc" ? (
              <ArrowDown className="w-4 h-4" />
            ) : (
              <ArrowUpDown className="w-4 h-4 text-muted-foreground" />
            )}
          </div>
        );
      },
      cell: ({ row }) => (
        <div className="text-muted-foreground">{row.getValue("provinsi")}</div>
      ),
    },
    {
      accessorKey: "alamat",
      header: ({ column }) => {
        return (
          <div
            className="flex items-center gap-2 cursor-pointer select-none"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Alamat
            {column.getIsSorted() === "asc" ? (
              <ArrowUp className="w-4 h-4" />
            ) : column.getIsSorted() === "desc" ? (
              <ArrowDown className="w-4 h-4" />
            ) : (
              <ArrowUpDown className="w-4 h-4 text-muted-foreground" />
            )}
          </div>
        );
      },
      cell: ({ row }) => (
        <div className="text-muted-foreground max-w-xs truncate">{row.getValue("alamat") || "-"}</div>
      ),
    },
    {
      accessorKey: "reff_attention",
      header: ({ column }) => {
        return (
          <div
            className="flex items-center gap-2 cursor-pointer select-none"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Refferal Strategic
            {column.getIsSorted() === "asc" ? (
              <ArrowUp className="w-4 h-4" />
            ) : column.getIsSorted() === "desc" ? (
              <ArrowDown className="w-4 h-4" />
            ) : (
              <ArrowUpDown className="w-4 h-4 text-muted-foreground" />
            )}
          </div>
        );
      },
      cell: ({ row }) => (
        <div className="text-muted-foreground">{row.getValue("reff_attention") || "-"}</div>
      ),
    },
    {
      id: "actions",
      header: "Aksi",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="hover:bg-primary/10"
            >
              <MoreVertical className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={() => setDetailDialogOpen(true)}>
              <Eye className="w-4 h-4 mr-2" />
              Lihat Detail
            </DropdownMenuItem>
            {!isReadOnly && (
              <DropdownMenuItem onClick={() => handleSetReffAttention(row.original.id, onStatusUpdate)}>
                <Star className="w-4 h-4 mr-2" />
                Set Reff PR07
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
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
        <div className="p-4 md:p-6 border-b border-border/50 bg-gradient-to-r from-primary/5 to-accent/5">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 md:gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-4 md:w-5 h-4 md:h-5 text-primary" />
              <Input
                type="text"
                placeholder="Cari data SPPG..."
                value={globalFilter ?? ""}
                onChange={(e) => setGlobalFilter(e.target.value)}
                className="pl-10 md:pl-12 h-10 md:h-12 rounded-xl border-2 focus:border-primary smooth-transition text-sm md:text-base"
              />
            </div>
            <div className="text-xs md:text-sm text-muted-foreground text-center sm:text-left whitespace-nowrap">
              {table.getFilteredRowModel().rows.length} data ditemukan
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead className="bg-gradient-to-r from-primary/10 to-accent/10 sticky top-0 z-10 backdrop-blur-sm">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-3 md:px-6 py-3 md:py-5 text-left text-[10px] md:text-xs font-bold text-foreground uppercase tracking-wider"
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
                  <td colSpan={columns.length} className="px-6 py-12 text-center text-muted-foreground">
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
                    className={`border-t border-border/50 hover:bg-primary/5 smooth-transition ${
                      index % 2 === 1 ? "bg-slate-50/30" : ""
                    }`}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-3 md:px-6 py-3 md:py-4 text-xs md:text-sm">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="px-4 md:px-6 py-4 md:py-5 border-t border-border/50 bg-gradient-to-r from-primary/5 to-accent/5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-xs md:text-sm text-muted-foreground text-center sm:text-left">
              Menampilkan {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} -{" "}
              {Math.min(
                (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
                table.getFilteredRowModel().rows.length
              )}{" "}
              dari {table.getFilteredRowModel().rows.length} data
            </div>
            <div className="flex items-center gap-1 md:gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
                className="h-8 w-8 p-0"
              >
                <ChevronsLeft className="w-3 h-3 md:w-4 md:h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className="h-8 w-8 p-0"
              >
                <ChevronLeft className="w-3 h-3 md:w-4 md:h-4" />
              </Button>
              <div className="text-xs md:text-sm font-medium text-foreground px-2">
                Hal {table.getState().pagination.pageIndex + 1}/{table.getPageCount()}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className="h-8 w-8 p-0"
              >
                <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
                className="h-8 w-8 p-0"
              >
                <ChevronsRight className="w-3 h-3 md:w-4 md:h-4" />
              </Button>
            </div>
          </div>
        </div>
        </CardContent>
      </Card>

      <Dialog open={detailDialogOpen} onOpenChange={setDetailDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Detail Pengajuan</DialogTitle>
            <DialogDescription className="pt-4 text-center">
              <div className="space-y-2">
                <p className="text-lg font-semibold text-foreground">Under Development</p>
                <p className="text-muted-foreground">Will Deploy Soon</p>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};
