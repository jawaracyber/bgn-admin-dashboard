import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';

mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';

interface ProvinceData {
  name: string;
  value: number;
  percentage: number;
  coordinates: [number, number];
}

interface InteractiveMapProps {
  data?: ProvinceData[];
  onProvinceClick?: (province: string) => void;
}

const defaultProvinces: ProvinceData[] = [
  { name: 'DKI Jakarta', value: 25600, percentage: 95, coordinates: [106.8456, -6.2088] },
  { name: 'Jawa Barat', value: 42000, percentage: 88, coordinates: [107.6191, -7.0909] },
  { name: 'Jawa Tengah', value: 35800, percentage: 86, coordinates: [110.4203, -7.1508] },
  { name: 'Jawa Timur', value: 38900, percentage: 84, coordinates: [112.7688, -7.5361] },
  { name: 'Sumatera Utara', value: 18200, percentage: 85, coordinates: [98.6722, 3.5952] },
  { name: 'Sumatera Barat', value: 8900, percentage: 72, coordinates: [100.3543, -0.9471] },
  { name: 'Sumatera Selatan', value: 14500, percentage: 74, coordinates: [104.7458, -3.3194] },
  { name: 'Banten', value: 16200, percentage: 82, coordinates: [106.1503, -6.4058] },
  { name: 'Bali', value: 10200, percentage: 92, coordinates: [115.2126, -8.3405] },
  { name: 'Kalimantan Timur', value: 11500, percentage: 70, coordinates: [116.4194, 0.5387] },
  { name: 'Sulawesi Selatan', value: 15600, percentage: 77, coordinates: [119.4327, -5.1477] },
  { name: 'Papua', value: 8900, percentage: 51, coordinates: [140.7188, -4.2699] },
];

export const InteractiveMap = ({ data = defaultProvinces, onProvinceClick }: InteractiveMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [hoveredProvince, setHoveredProvince] = useState<string | null>(null);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [118.0, -2.5],
      zoom: 4.2,
      attributionControl: false,
    });

    map.current.on('load', () => {
      if (!map.current) return;

      data.forEach((province) => {
        const color = province.percentage >= 80 ? '#10b981' :
                     province.percentage >= 70 ? '#6366f1' :
                     province.percentage >= 60 ? '#f59e0b' : '#ef4444';

        const el = document.createElement('div');
        el.className = 'marker';
        el.style.width = '24px';
        el.style.height = '24px';
        el.style.borderRadius = '50%';
        el.style.backgroundColor = color;
        el.style.border = '3px solid white';
        el.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
        el.style.cursor = 'pointer';
        el.style.transition = 'all 0.3s ease';

        el.addEventListener('mouseenter', () => {
          el.style.transform = 'scale(1.3)';
          el.style.zIndex = '10';
          setHoveredProvince(province.name);
        });

        el.addEventListener('mouseleave', () => {
          el.style.transform = 'scale(1)';
          setHoveredProvince(null);
        });

        el.addEventListener('click', () => {
          if (onProvinceClick) {
            onProvinceClick(province.name);
          }
        });

        new mapboxgl.Marker(el)
          .setLngLat(province.coordinates)
          .addTo(map.current!);

        const popup = new mapboxgl.Popup({
          offset: 25,
          closeButton: false,
          closeOnClick: false,
          className: 'custom-popup',
        });

        el.addEventListener('mouseenter', () => {
          popup
            .setLngLat(province.coordinates)
            .setHTML(`
              <div style="padding: 8px; min-width: 150px;">
                <div style="font-weight: 600; font-size: 14px; margin-bottom: 4px; color: #1f2937;">${province.name}</div>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span style="font-size: 12px; color: #6b7280;">Coverage</span>
                  <span style="font-size: 16px; font-weight: 700; color: ${color};">${province.percentage}%</span>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 4px;">
                  <span style="font-size: 11px; color: #9ca3af;">Total</span>
                  <span style="font-size: 12px; font-weight: 600; color: #374151;">${province.value.toLocaleString('id-ID')}</span>
                </div>
              </div>
            `)
            .addTo(map.current!);
        });

        el.addEventListener('mouseleave', () => {
          popup.remove();
        });
      });
    });

    return () => {
      map.current?.remove();
    };
  }, [data, onProvinceClick]);

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
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-1">
              Distribusi Regional Program
            </h3>
            <p className="text-xs text-gray-500">Peta interaktif capaian program per provinsi</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div
                ref={mapContainer}
                className="w-full rounded-xl overflow-hidden border border-gray-200"
                style={{ height: '500px' }}
              />
            </div>

            <div className="space-y-3">
              <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-5 text-white">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-3xl font-bold">
                    {data.length}
                  </span>
                  <svg className="w-8 h-8 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                </div>
                <p className="text-sm text-emerald-50">Provinsi Terlayani</p>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-3">
                  Top 5 Provinsi
                </h4>
                <div className="space-y-2">
                  {topProvinces.map((province, index) => {
                    const color = province.percentage >= 80 ? '#10b981' :
                                 province.percentage >= 70 ? '#6366f1' :
                                 province.percentage >= 60 ? '#f59e0b' : '#ef4444';

                    return (
                      <motion.div
                        key={province.name}
                        className={`p-3 rounded-lg cursor-pointer transition-all ${
                          hoveredProvince === province.name
                            ? 'bg-gray-100 border-2 border-gray-300'
                            : 'bg-gray-50 border-2 border-transparent hover:border-gray-200'
                        }`}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium text-gray-900 truncate pr-2">
                            {province.name}
                          </span>
                          <span
                            className="text-sm font-bold"
                            style={{ color }}
                          >
                            {province.percentage}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                          <motion.div
                            className="h-full rounded-full"
                            style={{ backgroundColor: color }}
                            initial={{ width: 0 }}
                            animate={{ width: `${province.percentage}%` }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                          />
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
