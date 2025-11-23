import { Card, CardContent } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

interface TrendDataPoint {
  date: string;
  mbg?: number;
  sekolah?: number;
  koperasi?: number;
  digitalisasi?: number;
  kesejahteraan?: number;
  umkm?: number;
  sampah?: number;
}

interface TrendMultiChartProps {
  data: TrendDataPoint[];
}

export const TrendMultiChart = ({ data }: TrendMultiChartProps) => {
  const programs = [
    { key: 'mbg', name: 'MBG', color: '#10b981' },
    { key: 'sekolah', name: 'Sekolah Rakyat', color: '#3b82f6' },
    { key: 'koperasi', name: 'Koperasi', color: '#ef4444' },
    { key: 'digitalisasi', name: 'Digitalisasi', color: '#8b5cf6' },
    { key: 'kesejahteraan', name: 'Kesejahteraan', color: '#f59e0b' },
    { key: 'umkm', name: 'UMKM', color: '#ec4899' },
    { key: 'sampah', name: 'Sampah', color: '#06b6d4' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      <Card className="glass border-white/20 shadow-xl">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground">Trend Pencapaian 7 PSN</h3>
              <p className="text-sm text-muted-foreground">Perbandingan realisasi program tahun 2024</p>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
              <XAxis
                dataKey="date"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString('id-ID', { month: 'short' });
                }}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                domain={[0, 100]}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '12px',
                  padding: '12px',
                  boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                }}
                formatter={(value: number) => `${value.toFixed(1)}%`}
                labelFormatter={(label) => {
                  const date = new Date(label);
                  return date.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });
                }}
              />
              <Legend
                wrapperStyle={{ paddingTop: '20px' }}
                iconType="line"
                formatter={(value) => <span className="text-sm">{value}</span>}
              />
              {programs.map((program) => (
                <Line
                  key={program.key}
                  type="monotone"
                  dataKey={program.key}
                  name={program.name}
                  stroke={program.color}
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 6 }}
                  animationDuration={800}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </motion.div>
  );
};
