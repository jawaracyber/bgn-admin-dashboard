import { useState } from "react";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

export interface SPPGRow {
  id: string;
  prog_stat: string;
  status: string;
  kota_kabupaten: string;
  provinsi: string;
  alamat: string;
}

interface SPPGDataGridProps {
  data: SPPGRow[];
  onStatusUpdate?: () => void;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "Koordinat Disetujui":
      return "bg-[#bbf7d0] text-green-800";
    case "Dalam Pertimbangan":
      return "bg-[#fef9c3] text-yellow-800";
    case "Koordinat Ditolak":
      return "bg-[#fecaca] text-red-800";
    case "Menunggu Update":
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

export const SPPGDataGrid = ({ data, onStatusUpdate }: SPPGDataGridProps) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

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
        const status = (row.getValue("prog_stat") as string) || "Menunggu Update";
        const displayStatus = status === "PENDING UPDATE" ? "Menunggu Update" : status;
        return (
          <Select
            value={displayStatus}
            onValueChange={(value) => handleStatusChange(row.original.id, value, onStatusUpdate)}
          >
            <SelectTrigger className={`w-[180px] border rounded-md shadow-sm text-sm ${getStatusColor(status)}`}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white rounded-md shadow-md border z-50">
              <SelectItem value="Menunggu Update" className="cursor-pointer hover:bg-slate-100 text-sm py-1.5">
                Menunggu Update
              </SelectItem>
              <SelectItem value="Koordinat Disetujui" className="cursor-pointer hover:bg-slate-100 text-sm py-1.5">
                Koordinat Disetujui
              </SelectItem>
              <SelectItem value="Koordinat Ditolak" className="cursor-pointer hover:bg-slate-100 text-sm py-1.5">
                Koordinat Ditolak
              </SelectItem>
              <SelectItem value="Dalam Pertimbangan" className="cursor-pointer hover:bg-slate-100 text-sm py-1.5">
                Dalam Pertimbangan
              </SelectItem>
            </SelectContent>
          </Select>
        );
      },
    },
    {
      accessorKey: "status",
      header: ({ column }) => {
        return (
          <div
            className="flex items-center gap-2 cursor-pointer select-none"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Status Operasional
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
        <div className="text-muted-foreground">{row.getValue("status") || "-"}</div>
      ),
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
    <Card className="rounded-xl shadow-sm border border-border overflow-hidden">
      <CardContent className="p-0">
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Cari data SPPG..."
                value={globalFilter ?? ""}
                onChange={(e) => setGlobalFilter(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="text-sm text-muted-foreground">
              {table.getFilteredRowModel().rows.length} data ditemukan
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 sticky top-0 z-10">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-6 py-4 text-left text-sm font-semibold text-foreground"
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
                  <tr
                    key={row.id}
                    className={`border-t border-border hover:bg-slate-50 transition-colors ${
                      index % 2 === 1 ? "bg-slate-50/30" : ""
                    }`}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-6 py-4 text-sm">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 border-t border-border">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Menampilkan {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} -{" "}
              {Math.min(
                (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
                table.getFilteredRowModel().rows.length
              )}{" "}
              dari {table.getFilteredRowModel().rows.length} data
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
              >
                <ChevronsLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <div className="text-sm font-medium text-foreground px-2">
                Halaman {table.getState().pagination.pageIndex + 1} dari {table.getPageCount()}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              >
                <ChevronsRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
