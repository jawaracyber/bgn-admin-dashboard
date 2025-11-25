import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ProvinceData {
  id: string;
  name: string;
  value: number;
  percentage: number;
  cx: number;
  cy: number;
  region: 'Sumatera' | 'Jawa' | 'Kalimantan' | 'Sulawesi' | 'Papua' | 'Maluku' | 'Bali-NTT';
}

interface SimpleIndonesiaMapProps {
  data?: ProvinceData[];
  onProvinceClick?: (province: string) => void;
}

const defaultProvinces: ProvinceData[] = [
  { id: 'aceh', name: 'Aceh', value: 12500, percentage: 78, cx: 15, cy: 8, region: 'Sumatera' },
  { id: 'sumut', name: 'Sumatera Utara', value: 18200, percentage: 85, cx: 18, cy: 12, region: 'Sumatera' },
  { id: 'sumbar', name: 'Sumatera Barat', value: 8900, percentage: 72, cx: 15, cy: 18, region: 'Sumatera' },
  { id: 'riau', name: 'Riau', value: 11200, percentage: 68, cx: 22, cy: 16, region: 'Sumatera' },
  { id: 'jambi', name: 'Jambi', value: 6700, percentage: 65, cx: 22, cy: 22, region: 'Sumatera' },
  { id: 'sumsel', name: 'Sumatera Selatan', value: 14500, percentage: 74, cx: 24, cy: 28, region: 'Sumatera' },
  { id: 'lampung', name: 'Lampung', value: 9800, percentage: 71, cx: 25, cy: 35, region: 'Sumatera' },
  { id: 'banten', name: 'Banten', value: 16200, percentage: 82, cx: 33, cy: 38, region: 'Jawa' },
  { id: 'dki', name: 'DKI Jakarta', value: 25600, percentage: 95, cx: 35, cy: 38, region: 'Jawa' },
  { id: 'jabar', name: 'Jawa Barat', value: 42000, percentage: 88, cx: 37, cy: 40, region: 'Jawa' },
  { id: 'jateng', name: 'Jawa Tengah', value: 35800, percentage: 86, cx: 44, cy: 42, region: 'Jawa' },
  { id: 'diy', name: 'DI Yogyakarta', value: 8500, percentage: 90, cx: 46, cy: 44, region: 'Jawa' },
  { id: 'jatim', name: 'Jawa Timur', value: 38900, percentage: 84, cx: 53, cy: 43, region: 'Jawa' },
  { id: 'kalbar', name: 'Kalimantan Barat', value: 9200, percentage: 62, cx: 42, cy: 16, region: 'Kalimantan' },
  { id: 'kalteng', name: 'Kalimantan Tengah', value: 7100, percentage: 58, cx: 48, cy: 24, region: 'Kalimantan' },
  { id: 'kalsel', name: 'Kalimantan Selatan', value: 8800, percentage: 66, cx: 50, cy: 30, region: 'Kalimantan' },
  { id: 'kaltim', name: 'Kalimantan Timur', value: 11500, percentage: 70, cx: 56, cy: 20, region: 'Kalimantan' },
  { id: 'sulut', name: 'Sulawesi Utara', value: 6200, percentage: 73, cx: 65, cy: 10, region: 'Sulawesi' },
  { id: 'sulteng', name: 'Sulawesi Tengah', value: 7800, percentage: 64, cx: 63, cy: 20, region: 'Sulawesi' },
  { id: 'sulsel', name: 'Sulawesi Selatan', value: 15600, percentage: 77, cx: 62, cy: 32, region: 'Sulawesi' },
  { id: 'sultra', name: 'Sulawesi Tenggara', value: 6900, percentage: 61, cx: 66, cy: 30, region: 'Sulawesi' },
  { id: 'bali', name: 'Bali', value: 10200, percentage: 92, cx: 52, cy: 45, region: 'Bali-NTT' },
  { id: 'ntb', name: 'NTB', value: 8100, percentage: 68, cx: 58, cy: 46, region: 'Bali-NTT' },
  { id: 'ntt', name: 'NTT', value: 9400, percentage: 59, cx: 64, cy: 50, region: 'Bali-NTT' },
  { id: 'maluku', name: 'Maluku', value: 4800, percentage: 55, cx: 72, cy: 28, region: 'Maluku' },
  { id: 'malut', name: 'Maluku Utara', value: 3700, percentage: 52, cx: 70, cy: 18, region: 'Maluku' },
  { id: 'papbar', name: 'Papua Barat', value: 5200, percentage: 48, cx: 76, cy: 22, region: 'Papua' },
  { id: 'papua', name: 'Papua', value: 8900, percentage: 51, cx: 85, cy: 28, region: 'Papua' },
];

const regionColors = {
  'Sumatera': '#6366f1',
  'Jawa': '#10b981',
  'Kalimantan': '#f59e0b',
  'Sulawesi': '#ec4899',
  'Bali-NTT': '#8b5cf6',
  'Maluku': '#06b6d4',
  'Papua': '#ef4444',
};

export const SimpleIndonesiaMap = ({ data = defaultProvinces, onProvinceClick }: SimpleIndonesiaMapProps) => {
  const [hoveredProvince, setHoveredProvince] = useState<string | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [dots, setDots] = useState<Array<{ id: string; x: number; y: number; province: string }>>([]);

  useEffect(() => {
    const generatedDots: Array<{ id: string; x: number; y: number; province: string }> = [];

    data.forEach(province => {
      const dotsCount = Math.floor(province.percentage / 5);
      for (let i = 0; i < dotsCount; i++) {
        const angle = (Math.PI * 2 * i) / dotsCount;
        const radius = 3 + Math.random() * 2;
        generatedDots.push({
          id: `${province.id}-${i}`,
          x: province.cx + Math.cos(angle) * radius,
          y: province.cy + Math.sin(angle) * radius,
          province: province.id,
        });
      }
    });

    setDots(generatedDots);
  }, [data]);

  const filteredData = selectedRegion === 'All'
    ? data
    : data.filter(p => p.region === selectedRegion);

  const totalValue = filteredData.reduce((sum, p) => sum + p.value, 0);
  const avgPercentage = Math.round(filteredData.reduce((sum, p) => sum + p.percentage, 0) / filteredData.length);

  const handleProvinceClick = (province: ProvinceData) => {
    if (onProvinceClick) {
      onProvinceClick(province.name);
    }
  };

  const topProvinces = [...data]
    .sort((a, b) => b.percentage - a.percentage)
    .slice(0, 5);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-white border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-sm font-semibold text-gray-900">
                  Target Demographics
                </h3>
                <Badge variant="secondary" className="text-xs">
                  Beta
                </Badge>
              </div>
              <p className="text-xs text-gray-500">Interactive regional distribution map</p>
            </div>
            <div className="flex gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
              <button className="px-4 py-2 bg-indigo-600 text-white text-xs font-medium rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add User
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="relative w-full bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 rounded-2xl p-8 border border-gray-200">
                <svg viewBox="0 0 100 60" className="w-full h-auto">
                  <defs>
                    {Object.entries(regionColors).map(([region, color]) => (
                      <radialGradient key={region} id={`pulse-${region}`}>
                        <stop offset="0%" stopColor={color} stopOpacity="0.6" />
                        <stop offset="100%" stopColor={color} stopOpacity="0" />
                      </radialGradient>
                    ))}
                  </defs>

                  {dots.map((dot) => {
                    const province = data.find(p => p.id === dot.province);
                    const isHovered = hoveredProvince === dot.province;
                    return (
                      <circle
                        key={dot.id}
                        cx={dot.x}
                        cy={dot.y}
                        r="0.15"
                        fill={province ? regionColors[province.region] : '#94a3b8'}
                        opacity={isHovered ? 0.9 : 0.4}
                        className="transition-all duration-300"
                      />
                    );
                  })}

                  {data.map((province) => {
                    const isHovered = hoveredProvince === province.id;
                    return (
                      <g key={province.id}>
                        <motion.circle
                          cx={province.cx}
                          cy={province.cy}
                          r={isHovered ? "4" : "3"}
                          fill={`url(#pulse-${province.region})`}
                          initial={{ scale: 0 }}
                          animate={{
                            scale: isHovered ? [1, 1.3, 1] : 1,
                            opacity: isHovered ? [0.3, 0.6, 0.3] : 0.3
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                        <motion.circle
                          cx={province.cx}
                          cy={province.cy}
                          r="1.5"
                          fill={regionColors[province.region]}
                          className="cursor-pointer"
                          onMouseEnter={() => setHoveredProvince(province.id)}
                          onMouseLeave={() => setHoveredProvince(null)}
                          onClick={() => handleProvinceClick(province)}
                          whileHover={{ scale: 1.3 }}
                          whileTap={{ scale: 0.9 }}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: Math.random() * 0.5 }}
                        />
                      </g>
                    );
                  })}
                </svg>

                <AnimatePresence>
                  {hoveredProvince && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="absolute top-6 right-6 bg-white rounded-xl shadow-2xl p-4 min-w-[200px] border border-gray-200"
                    >
                      {(() => {
                        const province = data.find(p => p.id === hoveredProvince);
                        if (!province) return null;
                        return (
                          <>
                            <div className="flex items-center gap-2 mb-3">
                              <div
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: regionColors[province.region] }}
                              />
                              <span className="text-xs font-medium text-gray-600">{province.region}</span>
                            </div>
                            <p className="text-sm font-semibold text-gray-900 mb-2">
                              {province.name}
                            </p>
                            <div className="space-y-1">
                              <div className="flex justify-between items-center">
                                <span className="text-xs text-gray-500">Coverage</span>
                                <span className="text-lg font-bold" style={{ color: regionColors[province.region] }}>
                                  {province.percentage}%
                                </span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-xs text-gray-500">Total</span>
                                <span className="text-sm font-semibold text-gray-700">
                                  {province.value.toLocaleString('id-ID')}
                                </span>
                              </div>
                            </div>
                          </>
                        );
                      })()}
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="absolute bottom-6 left-6 flex items-center gap-3">
                  <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>

                <div className="absolute bottom-4 right-4 flex gap-2">
                  <button className="p-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                  <button className="p-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedRegion('All')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                    selectedRegion === 'All'
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  All Regions
                </button>
                {Object.keys(regionColors).map((region) => (
                  <button
                    key={region}
                    onClick={() => setSelectedRegion(region)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 ${
                      selectedRegion === region
                        ? 'bg-gray-900 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: regionColors[region as keyof typeof regionColors] }}
                    />
                    {region}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 text-white">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-4xl font-bold">
                    {(totalValue / 1000).toFixed(1)}K
                  </span>
                  <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-sm text-gray-300">Total coverage nationwide</p>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-3">
                  Top Provinces
                </h4>
                {topProvinces.map((province, index) => (
                  <motion.div
                    key={province.id}
                    className={`group p-3 rounded-lg cursor-pointer transition-all ${
                      hoveredProvince === province.id
                        ? 'bg-gray-100 border-2 border-gray-300'
                        : 'bg-gray-50 border-2 border-transparent hover:border-gray-200'
                    }`}
                    onMouseEnter={() => setHoveredProvince(province.id)}
                    onMouseLeave={() => setHoveredProvince(null)}
                    onClick={() => handleProvinceClick(province)}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: `${regionColors[province.region]}20` }}
                      >
                        <img
                          src={`https://flagcdn.com/w40/id.png`}
                          alt={province.name}
                          className="w-6 h-4 object-cover rounded"
                        />
                      </div>
                      <div className="flex-grow min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium text-gray-900 truncate">
                            {province.name}
                          </span>
                          <span
                            className="text-sm font-bold ml-2"
                            style={{ color: regionColors[province.region] }}
                          >
                            {province.percentage}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                          <motion.div
                            className="h-full rounded-full"
                            style={{ backgroundColor: regionColors[province.region] }}
                            initial={{ width: 0 }}
                            animate={{ width: `${province.percentage}%` }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <button className="w-full py-2.5 text-sm font-medium text-indigo-600 hover:text-indigo-700 flex items-center justify-center gap-2 group">
                See All Demographics
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
