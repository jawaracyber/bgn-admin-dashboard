import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { MapPin, Loader2, Info } from "lucide-react";
import { regionApi, type Province, type Regency, type District } from "@/services/regionApi";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

const CheckQuotaDialog = () => {
  const [open, setOpen] = useState(false);
  const [resultOpen, setResultOpen] = useState(false);

  const [provinces, setProvinces] = useState<Province[]>([]);
  const [regencies, setRegencies] = useState<Regency[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);

  const [selectedProvince, setSelectedProvince] = useState<string>("");
  const [selectedRegency, setSelectedRegency] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");

  const [provinceName, setProvinceName] = useState<string>("");
  const [regencyName, setRegencyName] = useState<string>("");
  const [districtName, setDistrictName] = useState<string>("");

  const [loadingProvinces, setLoadingProvinces] = useState(false);
  const [loadingRegencies, setLoadingRegencies] = useState(false);
  const [loadingDistricts, setLoadingDistricts] = useState(false);
  const [checking, setChecking] = useState(false);

  const [quotaResult, setQuotaResult] = useState<number>(0);

  const loadProvinces = async () => {
    setLoadingProvinces(true);
    try {
      const data = await regionApi.getProvinces();
      setProvinces(data);
    } catch (error) {
      toast.error("Gagal memuat data provinsi");
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
      toast.error("Gagal memuat data kota/kabupaten");
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
      toast.error("Gagal memuat data kecamatan");
      console.error(error);
    } finally {
      setLoadingDistricts(false);
    }
  };

  const handleProvinceChange = async (value: string) => {
    setSelectedProvince(value);
    const province = provinces.find(p => p.id === value);
    setProvinceName(province?.name || "");

    setSelectedRegency("");
    setSelectedDistrict("");
    setRegencies([]);
    setDistricts([]);
    setRegencyName("");
    setDistrictName("");

    await loadRegencies(value);
  };

  const handleRegencyChange = async (value: string) => {
    setSelectedRegency(value);
    const regency = regencies.find(r => r.id === value);
    setRegencyName(regency?.name || "");

    setSelectedDistrict("");
    setDistricts([]);
    setDistrictName("");

    await loadDistricts(value);
  };

  const handleDistrictChange = (value: string) => {
    setSelectedDistrict(value);
    const district = districts.find(d => d.id === value);
    setDistrictName(district?.name || "");
  };

  const calculateQuota = (province: string, regency: string): number => {
    const normalizedProvince = province.toLowerCase();
    const normalizedRegency = regency.toLowerCase();

    const restrictedRegions = [
      { province: "jawa barat", regency: "kota bandung" },
      { province: "jawa barat", regency: "kabupaten bandung" },
      { province: "dki jakarta", regency: "" },
    ];

    const isRestricted = restrictedRegions.some(region => {
      if (region.regency === "") {
        return normalizedProvince.includes(region.province);
      }
      return normalizedProvince.includes(region.province) &&
             normalizedRegency.includes(region.regency);
    });

    if (isRestricted) {
      return Math.floor(Math.random() * 5) + 3;
    } else {
      return Math.floor(Math.random() * 8) + 7;
    }
  };

  const handleCheckQuota = () => {
    if (!selectedProvince || !selectedRegency || !selectedDistrict) {
      toast.error("Mohon lengkapi semua pilihan wilayah");
      return;
    }

    setChecking(true);

    setTimeout(() => {
      const quota = calculateQuota(provinceName, regencyName);
      setQuotaResult(quota);
      setChecking(false);
      setOpen(false);
      setResultOpen(true);
    }, 1500);
  };

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (isOpen && provinces.length === 0) {
      loadProvinces();
    }
  };

  const resetForm = () => {
    setSelectedProvince("");
    setSelectedRegency("");
    setSelectedDistrict("");
    setProvinceName("");
    setRegencyName("");
    setDistrictName("");
    setRegencies([]);
    setDistricts([]);
  };

  const handleResultClose = () => {
    setResultOpen(false);
    resetForm();
  };

  return (
    <>
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>
          <Button variant="outline" className="gap-2">
            <MapPin className="w-4 h-4" />
            Periksa Kuota Wilayah
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Periksa Kuota Wilayah</DialogTitle>
            <DialogDescription>
              Pilih wilayah untuk memeriksa ketersediaan kuota koordinat SPPG
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="province">Provinsi</Label>
              <Select
                value={selectedProvince}
                onValueChange={handleProvinceChange}
                disabled={loadingProvinces}
              >
                <SelectTrigger id="province">
                  {loadingProvinces ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Memuat provinsi...</span>
                    </div>
                  ) : (
                    <SelectValue placeholder="Pilih Provinsi" />
                  )}
                </SelectTrigger>
                <SelectContent>
                  {provinces.map((province) => (
                    <SelectItem key={province.id} value={province.id}>
                      {province.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="regency">Kota/Kabupaten</Label>
              <Select
                value={selectedRegency}
                onValueChange={handleRegencyChange}
                disabled={!selectedProvince || loadingRegencies}
              >
                <SelectTrigger id="regency">
                  {loadingRegencies ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Memuat kota/kabupaten...</span>
                    </div>
                  ) : (
                    <SelectValue placeholder="Pilih Kota/Kabupaten" />
                  )}
                </SelectTrigger>
                <SelectContent>
                  {regencies.map((regency) => (
                    <SelectItem key={regency.id} value={regency.id}>
                      {regency.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="district">Kecamatan</Label>
              <Select
                value={selectedDistrict}
                onValueChange={handleDistrictChange}
                disabled={!selectedRegency || loadingDistricts}
              >
                <SelectTrigger id="district">
                  {loadingDistricts ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Memuat kecamatan...</span>
                    </div>
                  ) : (
                    <SelectValue placeholder="Pilih Kecamatan" />
                  )}
                </SelectTrigger>
                <SelectContent>
                  {districts.map((district) => (
                    <SelectItem key={district.id} value={district.id}>
                      {district.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={checking}
            >
              Batal
            </Button>
            <Button
              onClick={handleCheckQuota}
              disabled={!selectedProvince || !selectedRegency || !selectedDistrict || checking}
              className="gap-2"
            >
              {checking ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Memeriksa...
                </>
              ) : (
                <>
                  <MapPin className="w-4 h-4" />
                  Periksa Kuota
                </>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog open={resultOpen} onOpenChange={setResultOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="flex items-center gap-2 mb-2">
              <Info className="w-5 h-5 text-primary" />
              <AlertDialogTitle>Hasil Pemeriksaan Kuota</AlertDialogTitle>
            </div>
            <AlertDialogDescription className="space-y-2 text-base">
              <div className="bg-muted p-4 rounded-lg space-y-1">
                <p className="font-medium text-foreground">Wilayah:</p>
                <p className="text-sm">{provinceName}</p>
                <p className="text-sm">{regencyName}</p>
                <p className="text-sm">{districtName}</p>
              </div>
              <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
                <p className="text-center text-lg font-semibold text-foreground">
                  Hanya tersisa <span className="text-primary text-2xl">{quotaResult}</span> Koordinat
                </p>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={handleResultClose}>
              Tutup
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default CheckQuotaDialog;
