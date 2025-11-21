import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ChartStackedProps {
  data: any[];
  title: string;
  subtitle?: string;
}

const ChartStacked = ({ data, title, subtitle }: ChartStackedProps) => {
  return (
    <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
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
          <Bar dataKey="lead" stackId="a" fill="hsl(var(--chart-teal))" radius={[0, 0, 0, 0]} />
          <Bar dataKey="qualify" stackId="a" fill="hsl(var(--chart-blue))" radius={[0, 0, 0, 0]} />
          <Bar dataKey="solution" stackId="a" fill="hsl(var(--chart-red))" radius={[0, 0, 0, 0]} />
          <Bar dataKey="proposal" stackId="a" fill="hsl(var(--chart-yellow))" radius={[0, 0, 0, 0]} />
          <Bar dataKey="finalize" stackId="a" fill="hsl(var(--chart-navy))" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartStacked;
