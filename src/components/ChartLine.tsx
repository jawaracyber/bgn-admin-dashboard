import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ChartLineProps {
  data: any[];
  title: string;
  subtitle?: string;
}

const ChartLine = ({ data, title, subtitle }: ChartLineProps) => {
  return (
    <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
          <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'hsl(var(--card))', 
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px'
            }} 
          />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="hsl(var(--chart-teal))" strokeWidth={3} dot={{ r: 4 }} />
          <Line type="monotone" dataKey="target" stroke="hsl(var(--chart-blue))" strokeWidth={2} strokeDasharray="5 5" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartLine;
