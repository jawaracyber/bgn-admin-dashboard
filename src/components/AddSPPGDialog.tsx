import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Loader2 } from 'lucide-react';
import { supabase, type SPPGData } from '@/lib/supabase';
import { regionApi, type Province, type Regency, type District } from '@/services/regionApi';
import { toast } from 'sonner';

interface AddSPPGDialogProps {
  onSuccess?: () => void;
}

const generateSPPGId = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  for (let i = 0; i < 8; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

export const AddSPPGDialog = ({ onSuccess }: AddSPPGDialogProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [regencies, setRegencies] = useState<Regency[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [loadingProvinces, setLoadingProvinces] = useState(false);
  const [loadingRegencies, setLoadingRegencies] = useState(false);
  const [loadingDistricts, setLoadingDistricts] = useState(false);

  const [formData, setFormData] = useState({
    id: generateSPPGId(),
    nama_sppg: '',
    provinsi: '',
    provinsi_id: '',
    kota_kabupaten: '',
    kota_kabupaten_id: '',
    kecamatan: '',
    alamat: '',
    status: 'Aktif',
  });

  useEffect(() => {
    if (open) {
      loadProvinces();
      setFormData(prev => ({ ...prev, id: generateSPPGId() }));
    }
  }, [open]);

  const loadProvinces = async () => {
    setLoadingProvinces(true);
    try {
      const data = await regionApi.getProvinces();
      setProvinces(data);
    } catch (error) {
      toast.error('Gagal memuat data provinsi');
      console.error(error);
    } finally {
      setLoadingProvinces(false);
    }
  };

  const loadRegencies = async (provinceId: string) => {
    setLoadingRegencies(true);
    try {
      const data = await regionApi.getRegencies(provinceId);
      setRegencies(data);
    } catch (error) {
      toast.error('Gagal memuat data kota/kabupaten');
      console.error(error);
    } finally {
      setLoadingRegencies(false);
    }
  };

  const loadDistricts = async (regencyId: string) => {
    setLoadingDistricts(true);
    try {
      const data = await regionApi.getDistricts(regencyId);
      setDistricts(data);
    } catch (error) {
      toast.error('Gagal memuat data kecamatan');
      console.error(error);
    } finally {
      setLoadingDistricts(false);
    }
  };

  const handleProvinceChange = (value: string) => {
    const province = provinces.find(p => p.name === value);
    if (province) {
      setFormData(prev => ({
        ...prev,
        provinsi: value,
        provinsi_id: province.id,
        kota_kabupaten: '',
        kota_kabupaten_id: '',
        kecamatan: ''
      }));
      setRegencies([]);
      setDistricts([]);
      loadRegencies(province.id);
    }
  };

  const handleRegencyChange = (value: string) => {
    const regency = regencies.find(r => r.name === value);
    if (regency) {
      setFormData(prev => ({
        ...prev,
        kota_kabupaten: value,
        kota_kabupaten_id: regency.id,
        kecamatan: ''
      }));
      setDistricts([]);
      loadDistricts(regency.id);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.nama_sppg || !formData.provinsi || !formData.kota_kabupaten || !formData.kecamatan) {
      toast.error('Mohon lengkapi semua field yang wajib diisi');
      return;
    }

    setLoading(true);
    try {
      const dataToInsert: SPPGData = {
        id: formData.id,
        nama_sppg: formData.nama_sppg,
        provinsi: formData.provinsi,
        kota_kabupaten: formData.kota_kabupaten,
        kecamatan: formData.kecamatan,
        alamat: formData.alamat,
        status: formData.status,
      };

      const { error } = await supabase
        .from('sppg')
        .insert([dataToInsert]);

      if (error) throw error;

      toast.success('Data SPPG berhasil ditambahkan');
      setOpen(false);
      setFormData({
        id: generateSPPGId(),
        nama_sppg: '',
        provinsi: '',
        provinsi_id: '',
        kota_kabupaten: '',
        kota_kabupaten_id: '',
        kecamatan: '',
        alamat: '',
        status: 'Aktif',
      });

      if (onSuccess) onSuccess();
    } catch (error) {
      toast.error('Gagal menambahkan data SPPG');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-1 md:gap-2 text-sm md:text-base px-3 md:px-4">
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Tambah SPPG</span>
          <span className="sm:hidden">Tambah</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Tambah Data SPPG</DialogTitle>
          <DialogDescription>
            Tambahkan data SPPG baru ke dalam sistem
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="id">ID SPPG</Label>
              <Input
                id="id"
                value={formData.id}
                disabled
                className="bg-muted"
              />
              <p className="text-xs text-muted-foreground">ID akan di-generate otomatis</p>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="nama_sppg">
                Nama SPPG <span className="text-destructive">*</span>
              </Label>
              <Input
                id="nama_sppg"
                placeholder="Masukkan nama SPPG"
                value={formData.nama_sppg}
                onChange={(e) => setFormData(prev => ({ ...prev, nama_sppg: e.target.value }))}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="provinsi">
                Provinsi <span className="text-destructive">*</span>
              </Label>
              <Select
                value={formData.provinsi}
                onValueChange={handleProvinceChange}
                disabled={loadingProvinces}
              >
                <SelectTrigger>
                  <SelectValue placeholder={loadingProvinces ? "Memuat..." : "Pilih provinsi"} />
                </SelectTrigger>
                <SelectContent>
                  {provinces.map((province) => (
                    <SelectItem key={province.id} value={province.name}>
                      {province.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="kota_kabupaten">
                Kota / Kabupaten <span className="text-destructive">*</span>
              </Label>
              <Select
                value={formData.kota_kabupaten}
                onValueChange={handleRegencyChange}
                disabled={!formData.provinsi || loadingRegencies}
              >
                <SelectTrigger>
                  <SelectValue placeholder={
                    loadingRegencies ? "Memuat..." :
                    !formData.provinsi ? "Pilih provinsi terlebih dahulu" :
                    "Pilih kota/kabupaten"
                  } />
                </SelectTrigger>
                <SelectContent>
                  {regencies.map((regency) => (
                    <SelectItem key={regency.id} value={regency.name}>
                      {regency.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="kecamatan">
                Kecamatan <span className="text-destructive">*</span>
              </Label>
              <Select
                value={formData.kecamatan}
                onValueChange={(value) => setFormData(prev => ({ ...prev, kecamatan: value }))}
                disabled={!formData.kota_kabupaten || loadingDistricts}
              >
                <SelectTrigger>
                  <SelectValue placeholder={
                    loadingDistricts ? "Memuat..." :
                    !formData.kota_kabupaten ? "Pilih kota/kabupaten terlebih dahulu" :
                    "Pilih kecamatan"
                  } />
                </SelectTrigger>
                <SelectContent>
                  {districts.map((district) => (
                    <SelectItem key={district.id} value={district.name}>
                      {district.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="alamat">Alamat</Label>
              <Input
                id="alamat"
                placeholder="Masukkan alamat lengkap"
                value={formData.alamat}
                onChange={(e) => setFormData(prev => ({ ...prev, alamat: e.target.value }))}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Aktif">Aktif</SelectItem>
                  <SelectItem value="Tidak Aktif">Tidak Aktif</SelectItem>
                  <SelectItem value="Dalam Perbaikan">Dalam Perbaikan</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Batal
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Menyimpan...
                </>
              ) : (
                'Simpan'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
