import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

interface ProvinceData {
  name: string;
  kpi1: number;
  kpi2: number;
  kpi3: number;
  kpi4: number;
  kpi5: number;
  kpi6: number;
  kpi7: number;
}

interface IndonesiaMapProps {
  selectedKPI: string;
  onProvinceClick?: (province: string) => void;
}

const provinceData: Record<string, ProvinceData> = {
  'DKI JAKARTA': { name: 'DKI Jakarta', kpi1: 95, kpi2: 88, kpi3: 92, kpi4: 85, kpi5: 90, kpi6: 87, kpi7: 93 },
  'JAWA BARAT': { name: 'Jawa Barat', kpi1: 87, kpi2: 82, kpi3: 85, kpi4: 78, kpi5: 84, kpi6: 80, kpi7: 86 },
  'JAWA TENGAH': { name: 'Jawa Tengah', kpi1: 82, kpi2: 78, kpi3: 80, kpi4: 75, kpi5: 79, kpi6: 77, kpi7: 81 },
  'JAWA TIMUR': { name: 'Jawa Timur', kpi1: 85, kpi2: 80, kpi3: 83, kpi4: 76, kpi5: 82, kpi6: 79, kpi7: 84 },
  'BALI': { name: 'Bali', kpi1: 90, kpi2: 85, kpi3: 88, kpi4: 82, kpi5: 87, kpi6: 84, kpi7: 89 },
  'SUMATERA UTARA': { name: 'Sumatera Utara', kpi1: 78, kpi2: 73, kpi3: 76, kpi4: 70, kpi5: 75, kpi6: 72, kpi7: 77 },
  'SUMATERA BARAT': { name: 'Sumatera Barat', kpi1: 80, kpi2: 75, kpi3: 78, kpi4: 72, kpi5: 77, kpi6: 74, kpi7: 79 },
  'SULAWESI SELATAN': { name: 'Sulawesi Selatan', kpi1: 76, kpi2: 71, kpi3: 74, kpi4: 68, kpi5: 73, kpi6: 70, kpi7: 75 },
  'KALIMANTAN TIMUR': { name: 'Kalimantan Timur', kpi1: 83, kpi2: 78, kpi3: 81, kpi4: 74, kpi5: 80, kpi6: 77, kpi7: 82 },
  'PAPUA': { name: 'Papua', kpi1: 65, kpi2: 60, kpi3: 63, kpi4: 58, kpi5: 62, kpi6: 59, kpi7: 64 },
};

const getColorForValue = (value: number): string => {
  if (value >= 90) return '#166534';
  if (value >= 80) return '#16a34a';
  if (value >= 70) return '#4ade80';
  if (value >= 60) return '#86efac';
  return '#dcfce7';
};

export const IndonesiaMap = ({ selectedKPI, onProvinceClick }: IndonesiaMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<any>(null);
  const popup = useRef<any>(null);
  const [hoveredProvince, setHoveredProvince] = useState<string | null>(null);
  const [mapboxgl, setMapboxgl] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const initMap = async () => {
      try {
        setLoading(true);
        const mapboxModule = await import('mapbox-gl');
        await import('mapbox-gl/dist/mapbox-gl.css');

        if (!isMounted) return;

        const mapboxglInstance = mapboxModule.default;
        mapboxglInstance.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';
        setMapboxgl(mapboxglInstance);

        if (!mapContainer.current || map.current) return;

        map.current = new mapboxglInstance.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/light-v11',
          center: [118.0, -2.5],
          zoom: 4.2,
          pitch: 0,
          bearing: 0,
        });

        map.current.addControl(new mapboxglInstance.NavigationControl(), 'top-right');

        map.current.on('load', () => {
          if (!map.current) return;

          map.current.addSource('indonesia-provinces', {
            type: 'vector',
            url: 'mapbox://mapbox.boundaries-adm1-v3',
          });

          map.current.addLayer({
            id: 'province-fills',
            type: 'fill',
            source: 'indonesia-provinces',
            'source-layer': 'boundaries_admin_1',
            filter: ['==', 'iso_3166_1_alpha_3', 'IDN'],
            paint: {
              'fill-color': '#e5e7eb',
              'fill-opacity': [
                'case',
                ['boolean', ['feature-state', 'hover'], false],
                0.9,
                0.7
              ],
            },
          });

          map.current.addLayer({
            id: 'province-borders',
            type: 'line',
            source: 'indonesia-provinces',
            'source-layer': 'boundaries_admin_1',
            filter: ['==', 'iso_3166_1_alpha_3', 'IDN'],
            paint: {
              'line-color': [
                'case',
                ['boolean', ['feature-state', 'hover'], false],
                '#dc2626',
                '#9ca3af'
              ],
              'line-width': [
                'case',
                ['boolean', ['feature-state', 'hover'], false],
                3,
                1
              ],
              'line-opacity': 1,
            },
          });

          updateMapColors();
          setLoading(false);
        });

        popup.current = new mapboxglInstance.Popup({
          closeButton: false,
          closeOnClick: false,
          className: 'map-popup',
        });

      } catch (err) {
        console.error('Error initializing map:', err);
        setError('Failed to load map');
        setLoading(false);
      }
    };

    initMap();

    return () => {
      isMounted = false;
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  const updateMapColors = () => {
    if (!map.current || !map.current.isStyleLoaded()) return;

    const kpiKey = `kpi${selectedKPI.replace('kpi', '')}` as keyof ProvinceData;
    const expression: any = ['match', ['get', 'name']];

    Object.entries(provinceData).forEach(([key, data]) => {
      const value = data[kpiKey] as number;
      expression.push(key, getColorForValue(value));
    });

    expression.push('#e5e7eb');

    map.current.setPaintProperty('province-fills', 'fill-color', expression);
  };

  useEffect(() => {
    updateMapColors();
  }, [selectedKPI]);

  useEffect(() => {
    if (!map.current || !mapboxgl) return;

    const handleMouseMove = (e: any) => {
      if (!map.current || !popup.current) return;

      const features = map.current.queryRenderedFeatures(e.point, {
        layers: ['province-fills'],
      });

      if (features.length > 0) {
        const feature = features[0];
        const provinceName = feature.properties?.name as string;

        if (hoveredProvince && hoveredProvince !== provinceName) {
          map.current.setFeatureState(
            { source: 'indonesia-provinces', sourceLayer: 'boundaries_admin_1', id: hoveredProvince },
            { hover: false }
          );
        }

        map.current.setFeatureState(
          { source: 'indonesia-provinces', sourceLayer: 'boundaries_admin_1', id: provinceName },
          { hover: true }
        );

        setHoveredProvince(provinceName);

        const data = provinceData[provinceName];
        if (data) {
          const kpiKey = `kpi${selectedKPI.replace('kpi', '')}` as keyof ProvinceData;
          const value = data[kpiKey];

          popup.current
            .setLngLat(e.lngLat)
            .setHTML(`
              <div class="p-3 min-w-[200px]">
                <h3 class="font-bold text-sm mb-2">${data.name}</h3>
                <div class="space-y-1 text-xs">
                  <p><strong>Program 1:</strong> ${data.kpi1}%</p>
                  <p><strong>Program 2:</strong> ${data.kpi2}%</p>
                  <p><strong>Program 3:</strong> ${data.kpi3}%</p>
                  <p><strong>Program 4:</strong> ${data.kpi4}%</p>
                  <p><strong>Program 5:</strong> ${data.kpi5}%</p>
                  <p><strong>Program 6:</strong> ${data.kpi6}%</p>
                  <p><strong>Program 7:</strong> ${data.kpi7}%</p>
                </div>
                <div class="mt-2 pt-2 border-t">
                  <p class="text-xs font-semibold">
                    Selected KPI: <span class="text-primary">${value}%</span>
                  </p>
                </div>
              </div>
            `)
            .addTo(map.current);
        }

        map.current.getCanvas().style.cursor = 'pointer';
      } else {
        if (hoveredProvince) {
          map.current.setFeatureState(
            { source: 'indonesia-provinces', sourceLayer: 'boundaries_admin_1', id: hoveredProvince },
            { hover: false }
          );
          setHoveredProvince(null);
        }
        popup.current.remove();
        map.current.getCanvas().style.cursor = '';
      }
    };

    const handleClick = (e: any) => {
      if (!map.current) return;

      const features = map.current.queryRenderedFeatures(e.point, {
        layers: ['province-fills'],
      });

      if (features.length > 0 && onProvinceClick) {
        const provinceName = features[0].properties?.name as string;
        const data = provinceData[provinceName];
        if (data) {
          onProvinceClick(data.name);
        }
      }
    };

    map.current.on('mousemove', 'province-fills', handleMouseMove);
    map.current.on('click', 'province-fills', handleClick);

    return () => {
      if (map.current) {
        map.current.off('mousemove', 'province-fills', handleMouseMove);
        map.current.off('click', 'province-fills', handleClick);
      }
    };
  }, [selectedKPI, hoveredProvince, onProvinceClick, mapboxgl]);

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="glass rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
          <div className="p-4 md:p-6">
            <p className="text-center text-muted-foreground">{error}</p>
          </div>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="glass rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
        <div className="p-4 md:p-6 border-b border-border/50 bg-gradient-to-r from-primary/5 to-accent/5">
          <h2 className="text-lg md:text-xl font-bold text-foreground">Peta Indonesia - KPI Distribution</h2>
          <p className="text-xs md:text-sm text-muted-foreground mt-1">
            Click pada provinsi untuk filter dashboard
          </p>
        </div>
        <div className="relative">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-sm z-10">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          )}
          <div ref={mapContainer} className="w-full h-[400px] md:h-[500px] lg:h-[600px]" />
          <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-3 text-xs z-20">
            <h4 className="font-bold mb-2">Legend</h4>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded" style={{ backgroundColor: '#166534' }}></div>
                <span>90-100%</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded" style={{ backgroundColor: '#16a34a' }}></div>
                <span>80-89%</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded" style={{ backgroundColor: '#4ade80' }}></div>
                <span>70-79%</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded" style={{ backgroundColor: '#86efac' }}></div>
                <span>60-69%</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded" style={{ backgroundColor: '#dcfce7' }}></div>
                <span>&lt;60%</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
