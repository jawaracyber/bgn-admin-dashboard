import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';

interface Province {
  id: string;
  name: string;
  value: number;
  color: string;
}

interface SimpleIndonesiaMapProps {
  selectedKPI?: string;
  onProvinceClick?: (province: string) => void;
}

const provinces: Province[] = [
  { id: 'sumatra', name: 'Sumatera', value: 85, color: '#6ee7b7' },
  { id: 'jawa', name: 'Jawa', value: 92, color: '#34d399' },
  { id: 'kalimantan', name: 'Kalimantan', value: 78, color: '#86efac' },
  { id: 'sulawesi', name: 'Sulawesi', value: 81, color: '#6ee7b7' },
  { id: 'papua', name: 'Papua', value: 65, color: '#bbf7d0' },
  { id: 'maluku', name: 'Maluku', value: 73, color: '#a7f3d0' },
  { id: 'bali-nusa', name: 'Bali & Nusa Tenggara', value: 88, color: '#6ee7b7' },
];

export const SimpleIndonesiaMap = ({ onProvinceClick }: SimpleIndonesiaMapProps) => {
  const [hoveredProvince, setHoveredProvince] = useState<string | null>(null);
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);

  const handleProvinceClick = (province: Province) => {
    setSelectedProvince(province.id);
    if (onProvinceClick) {
      onProvinceClick(province.name);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-white border border-gray-200 shadow-sm">
        <div className="p-6">
          <div className="mb-4">
            <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
              PETA INDONESIA
            </h3>
            <p className="text-sm text-gray-600">Distribusi berdasarkan wilayah</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="relative w-full bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl overflow-hidden p-4">
                <img
                  src="/indonesia.svg"
                  alt="Peta Indonesia"
                  className="w-full h-auto opacity-80 hover:opacity-100 transition-opacity duration-300"
                  style={{ filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))' }}
                />

                {hoveredProvince && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-3 z-10"
                  >
                    <p className="text-xs font-medium text-gray-900">
                      {provinces.find(p => p.id === hoveredProvince)?.name}
                    </p>
                    <p className="text-lg font-bold text-emerald-600">
                      {provinces.find(p => p.id === hoveredProvince)?.value}%
                    </p>
                  </motion.div>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Statistik Regional</h4>
              </div>
              {provinces.map((province) => (
                <motion.div
                  key={province.id}
                  className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                    hoveredProvince === province.id || selectedProvince === province.id
                      ? 'bg-emerald-50 border-2 border-emerald-300'
                      : 'bg-gray-50 border-2 border-transparent hover:border-emerald-200'
                  }`}
                  onMouseEnter={() => setHoveredProvince(province.id)}
                  onMouseLeave={() => setHoveredProvince(null)}
                  onClick={() => handleProvinceClick(province)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-gray-700">{province.name}</span>
                    <span className="text-sm font-bold text-emerald-600">{province.value}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <motion.div
                      className="h-1.5 rounded-full"
                      style={{ backgroundColor: province.color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${province.value}%` }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
