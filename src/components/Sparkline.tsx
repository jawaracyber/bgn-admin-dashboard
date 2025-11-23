import { Line, LineChart, ResponsiveContainer } from "recharts";

interface SparklineProps {
  data: Array<{ date: string; value: number }>;
  color?: string;
  height?: number;
}

export const Sparkline = ({ data, color = "hsl(var(--primary))", height = 60 }: SparklineProps) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data}>
        <Line
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={2}
          dot={false}
          animationDuration={500}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
