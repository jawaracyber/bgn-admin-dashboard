import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Calendar, MapPin, LayoutGrid } from "lucide-react";

interface FilterBarProps {
  selectedYear: string;
  selectedProvince: string;
  selectedProgram: string;
  onYearChange: (value: string) => void;
  onProvinceChange: (value: string) => void;
  onProgramChange: (value: string) => void;
}

const YEARS = ['2024', '2023', '2022', '2021'];
const PROVINCES = [
  'Semua',
  'DKI Jakarta',
  'Jawa Barat',
  'Jawa Tengah',
  'Jawa Timur',
  'Banten',
  'Sumatera Utara',
  'Sumatera Barat',
  'Sumatera Selatan',
  'Lampung',
  'Kalimantan Timur',
  'Kalimantan Selatan',
  'Sulawesi Selatan',
  'Sulawesi Utara',
  'Bali',
  'NTB',
  'NTT',
  'Papua',
  'Papua Barat',
  'Maluku',
  'Maluku Utara'
];
const PROGRAMS = [
  'Semua Program',
  'Makan Bergizi Gratis',
  'Sekolah Rakyat',
  'Koperasi Merah Putih',
  'Digitalisasi Pendidikan',
  'Kartu Kesejahteraan',
  'Kartu Usaha Afirmatif',
  'Pengelolaan Sampah'
];

export const FilterBar = ({
  selectedYear,
  selectedProvince,
  selectedProgram,
  onYearChange,
  onProvinceChange,
  onProgramChange
}: FilterBarProps) => {
  return (
    <Card className="p-4 md:p-6 glass border-white/20 shadow-xl">
      <div className="flex flex-col md:flex-row gap-4 md:gap-6">
        <div className="flex-1">
          <label className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Tahun
          </label>
          <Select value={selectedYear} onValueChange={onYearChange}>
            <SelectTrigger className="w-full border-2 h-11">
              <SelectValue placeholder="Pilih Tahun" />
            </SelectTrigger>
            <SelectContent>
              {YEARS.map(year => (
                <SelectItem key={year} value={year}>{year}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1">
          <label className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Provinsi
          </label>
          <Select value={selectedProvince} onValueChange={onProvinceChange}>
            <SelectTrigger className="w-full border-2 h-11">
              <SelectValue placeholder="Pilih Provinsi" />
            </SelectTrigger>
            <SelectContent>
              {PROVINCES.map(prov => (
                <SelectItem key={prov} value={prov}>{prov}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1">
          <label className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-2">
            <LayoutGrid className="w-4 h-4" />
            Program
          </label>
          <Select value={selectedProgram} onValueChange={onProgramChange}>
            <SelectTrigger className="w-full border-2 h-11">
              <SelectValue placeholder="Pilih Program" />
            </SelectTrigger>
            <SelectContent>
              {PROGRAMS.map(prog => (
                <SelectItem key={prog} value={prog}>{prog}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </Card>
  );
};
