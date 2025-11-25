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
              WORLD MAP
            </h3>
            <p className="text-sm text-gray-600">Distribution by Region</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="relative w-full aspect-[16/10] bg-gradient-to-br from-teal-50 to-emerald-50 rounded-xl overflow-hidden">
                <svg viewBox="0 0 800 500" className="w-full h-full">
                  <motion.path
                    d="M 100 150 Q 150 100 250 150 L 300 200 Q 280 250 200 220 L 120 180 Z"
                    fill={hoveredProvince === 'sumatra' ? '#34d399' : '#6ee7b7'}
                    stroke="#10b981"
                    strokeWidth="2"
                    className="cursor-pointer transition-all duration-300"
                    onMouseEnter={() => setHoveredProvince('sumatra')}
                    onMouseLeave={() => setHoveredProvince(null)}
                    onClick={() => handleProvinceClick(provinces[0])}
                    whileHover={{ scale: 1.02 }}
                  />
                  <text x="180" y="180" className="text-xs font-medium fill-white pointer-events-none">
                    Sumatera
                  </text>

                  <motion.path
                    d="M 320 220 L 480 200 L 520 280 L 450 320 L 340 300 Z"
                    fill={hoveredProvince === 'jawa' ? '#16a34a' : '#34d399'}
                    stroke="#10b981"
                    strokeWidth="2"
                    className="cursor-pointer transition-all duration-300"
                    onMouseEnter={() => setHoveredProvince('jawa')}
                    onMouseLeave={() => setHoveredProvince(null)}
                    onClick={() => handleProvinceClick(provinces[1])}
                    whileHover={{ scale: 1.02 }}
                  />
                  <text x="400" y="270" className="text-xs font-medium fill-white pointer-events-none">
                    Jawa
                  </text>

                  <motion.path
                    d="M 350 100 Q 400 80 500 120 L 520 180 Q 480 200 420 180 L 360 140 Z"
                    fill={hoveredProvince === 'kalimantan' ? '#34d399' : '#86efac'}
                    stroke="#10b981"
                    strokeWidth="2"
                    className="cursor-pointer transition-all duration-300"
                    onMouseEnter={() => setHoveredProvince('kalimantan')}
                    onMouseLeave={() => setHoveredProvince(null)}
                    onClick={() => handleProvinceClick(provinces[2])}
                    whileHover={{ scale: 1.02 }}
                  />
                  <text x="420" y="145" className="text-xs font-medium fill-white pointer-events-none">
                    Kalimantan
                  </text>

                  <motion.path
                    d="M 540 140 Q 590 120 640 160 L 620 220 Q 580 240 540 210 Z"
                    fill={hoveredProvince === 'sulawesi' ? '#34d399' : '#6ee7b7'}
                    stroke="#10b981"
                    strokeWidth="2"
                    className="cursor-pointer transition-all duration-300"
                    onMouseEnter={() => setHoveredProvince('sulawesi')}
                    onMouseLeave={() => setHoveredProvince(null)}
                    onClick={() => handleProvinceClick(provinces[3])}
                    whileHover={{ scale: 1.02 }}
                  />
                  <text x="570" y="180" className="text-xs font-medium fill-white pointer-events-none">
                    Sulawesi
                  </text>

                  <motion.path
                    d="M 660 180 L 740 200 L 760 280 L 700 300 L 650 260 Z"
                    fill={hoveredProvince === 'papua' ? '#6ee7b7' : '#bbf7d0'}
                    stroke="#10b981"
                    strokeWidth="2"
                    className="cursor-pointer transition-all duration-300"
                    onMouseEnter={() => setHoveredProvince('papua')}
                    onMouseLeave={() => setHoveredProvince(null)}
                    onClick={() => handleProvinceClick(provinces[4])}
                    whileHover={{ scale: 1.02 }}
                  />
                  <text x="690" y="240" className="text-xs font-medium fill-white pointer-events-none">
                    Papua
                  </text>

                  <motion.path
                    d="M 630 240 Q 660 230 680 260 L 665 290 Q 640 295 625 275 Z"
                    fill={hoveredProvince === 'maluku' ? '#34d399' : '#a7f3d0'}
                    stroke="#10b981"
                    strokeWidth="2"
                    className="cursor-pointer transition-all duration-300"
                    onMouseEnter={() => setHoveredProvince('maluku')}
                    onMouseLeave={() => setHoveredProvince(null)}
                    onClick={() => handleProvinceClick(provinces[5])}
                    whileHover={{ scale: 1.02 }}
                  />
                  <text x="640" y="270" className="text-[10px] font-medium fill-white pointer-events-none">
                    Maluku
                  </text>

                  <motion.path
                    d="M 530 290 L 580 280 L 600 320 L 560 340 L 520 320 Z"
                    fill={hoveredProvince === 'bali-nusa' ? '#34d399' : '#6ee7b7'}
                    stroke="#10b981"
                    strokeWidth="2"
                    className="cursor-pointer transition-all duration-300"
                    onMouseEnter={() => setHoveredProvince('bali-nusa')}
                    onMouseLeave={() => setHoveredProvince(null)}
                    onClick={() => handleProvinceClick(provinces[6])}
                    whileHover={{ scale: 1.02 }}
                  />
                  <text x="545" y="315" className="text-[10px] font-medium fill-white pointer-events-none">
                    Bali-NT
                  </text>
                </svg>

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
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Regional Statistics</h4>
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
