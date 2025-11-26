import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, Loader2, FileText, AlertCircle } from 'lucide-react';
import { supabase, type SPPGData } from '@/lib/supabase';
import { toast } from 'sonner';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface UploadCSVDialogProps {
  onSuccess?: () => void;
}

interface CSVRow {
  id?: string;
  nama_sppg: string;
  provinsi: string;
  kota_kabupaten: string;
  kecamatan?: string;
  alamat?: string;
  status?: string;
  prog_stat?: string;
  reff_attention?: string;
}

const generateSPPGId = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  for (let i = 0; i < 8; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

const parseCSV = (csvText: string): CSVRow[] => {
  const lines = csvText.trim().split('\n');
  if (lines.length < 2) {
    throw new Error('File CSV tidak valid atau kosong');
  }

  const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
  const rows: CSVRow[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map(v => v.trim());
    if (values.length !== headers.length) {
      console.warn(`Baris ${i + 1} dilewati: jumlah kolom tidak sesuai`);
      continue;
    }

    const row: any = {};
    headers.forEach((header, index) => {
      row[header] = values[index];
    });

    if (!row.nama_sppg || !row.provinsi || !row.kota_kabupaten) {
      console.warn(`Baris ${i + 1} dilewati: field wajib tidak lengkap`);
      continue;
    }

    rows.push(row as CSVRow);
  }

  return rows;
};

export const UploadCSVDialog = ({ onSuccess }: UploadCSVDialogProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<CSVRow[]>([]);
  const [error, setError] = useState<string>('');

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (!selectedFile.name.endsWith('.csv')) {
      setError('Hanya file CSV yang diperbolehkan');
      setFile(null);
      setPreview([]);
      return;
    }

    setFile(selectedFile);
    setError('');

    try {
      const text = await selectedFile.text();
      const rows = parseCSV(text);
      setPreview(rows.slice(0, 5));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal membaca file CSV');
      setPreview([]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error('Pilih file CSV terlebih dahulu');
      return;
    }

    setLoading(true);
    try {
      const text = await file.text();
      const rows = parseCSV(text);

      if (rows.length === 0) {
        throw new Error('Tidak ada data valid dalam file CSV');
      }

      const dataToInsert: SPPGData[] = rows.map(row => ({
        id: row.id || generateSPPGId(),
        nama_sppg: row.nama_sppg,
        provinsi: row.provinsi,
        kota_kabupaten: row.kota_kabupaten,
        kecamatan: row.kecamatan || '',
        alamat: row.alamat || '',
        status: row.status || 'Aktif',
        prog_stat: row.prog_stat || 'PENDING UPDATE',
        reff_attention: row.reff_attention || '',
      }));

      const { error: insertError } = await supabase
        .from('sppg')
        .insert(dataToInsert);

      if (insertError) throw insertError;

      toast.success(`Berhasil mengupload ${dataToInsert.length} data SPPG`);
      setOpen(false);
      setFile(null);
      setPreview([]);
      setError('');

      if (onSuccess) onSuccess();
    } catch (err) {
      toast.error('Gagal mengupload data');
      console.error(err);
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  };

  const handleDialogChange = (newOpen: boolean) => {
    if (!newOpen) {
      setFile(null);
      setPreview([]);
      setError('');
    }
    setOpen(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogChange}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-1 md:gap-2 text-sm md:text-base px-3 md:px-4">
          <Upload className="w-4 h-4" />
          <span className="hidden sm:inline">Upload CSV</span>
          <span className="sm:hidden">CSV</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Upload Data SPPG dari CSV</DialogTitle>
          <DialogDescription>
            Upload file CSV untuk menambahkan data SPPG secara bulk
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="csv-file">File CSV</Label>
            <Input
              id="csv-file"
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              disabled={loading}
            />
            <p className="text-xs text-muted-foreground">
              Format: nama_sppg, provinsi, kota_kabupaten, kecamatan, alamat, status, prog_stat, reff_attention
            </p>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {preview.length > 0 && (
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Preview Data (5 baris pertama)
              </Label>
              <div className="border rounded-lg overflow-hidden">
                <div className="overflow-x-auto max-h-[300px]">
                  <table className="w-full text-xs">
                    <thead className="bg-muted sticky top-0">
                      <tr>
                        <th className="px-2 py-1 text-left font-medium">Nama SPPG</th>
                        <th className="px-2 py-1 text-left font-medium">Provinsi</th>
                        <th className="px-2 py-1 text-left font-medium">Kota/Kab</th>
                        <th className="px-2 py-1 text-left font-medium">Kecamatan</th>
                        <th className="px-2 py-1 text-left font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {preview.map((row, index) => (
                        <tr key={index} className="border-t">
                          <td className="px-2 py-1">{row.nama_sppg}</td>
                          <td className="px-2 py-1">{row.provinsi}</td>
                          <td className="px-2 py-1">{row.kota_kabupaten}</td>
                          <td className="px-2 py-1">{row.kecamatan || '-'}</td>
                          <td className="px-2 py-1">{row.status || 'Aktif'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Total baris valid yang akan diupload: {preview.length}+
              </p>
            </div>
          )}

          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-xs">
              <strong>Catatan:</strong>
              <ul className="list-disc list-inside mt-1 space-y-1">
                <li>Kolom wajib: nama_sppg, provinsi, kota_kabupaten</li>
                <li>Kolom opsional: id, kecamatan, alamat, status, prog_stat, reff_attention</li>
                <li>Jika id tidak disediakan, akan di-generate otomatis</li>
                <li>Status default: Aktif</li>
                <li>prog_stat default: PENDING UPDATE</li>
              </ul>
            </AlertDescription>
          </Alert>
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => handleDialogChange(false)}
            disabled={loading}
          >
            Batal
          </Button>
          <Button
            onClick={handleUpload}
            disabled={loading || !file || preview.length === 0}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Mengupload...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Upload
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
