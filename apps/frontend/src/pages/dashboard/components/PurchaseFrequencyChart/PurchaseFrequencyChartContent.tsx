import { dashboardQueries } from '@/apis/dashboard/queries';
import { DateRange } from '@/components/DateRangePicker/DateRangePicker.types';
import { theme } from '@/styles/theme';
import { useSuspenseQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface PurchaseFrequencyChartContentProps {
  dateRange: DateRange;
}

const PurchaseFrequencyChartContent = ({
  dateRange,
}: PurchaseFrequencyChartContentProps) => {
  const { data } = useSuspenseQuery(
    dashboardQueries.purchaseFrequency({
      from: dateRange.from ? format(dateRange.from, 'yyyy-MM-dd') : undefined,
      to: dateRange.to ? format(dateRange.to, 'yyyy-MM-dd') : undefined,
    }),
  );

  return (
    <ResponsiveContainer width="100%" height={500}>
      <BarChart data={data} margin={{ left: -30, right: 10 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={theme.colors.border} />
        <XAxis
          dataKey="range"
          tick={{ fontSize: 11, fill: theme.colors.mutedForeground }}
          angle={-45}
          textAnchor="end"
          height={80}
          interval={0}
        />
        <YAxis
          tick={{ fontSize: 12, fill: theme.colors.mutedForeground }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: theme.colors.card,
            border: `1px solid ${theme.colors.border}`,
            borderRadius: theme.radius,
            boxShadow: theme.shadows.tooltip,
          }}
          labelStyle={{ color: theme.colors.foreground, fontWeight: 400 }}
        />
        <Bar dataKey="count" radius={[6, 6, 0, 0]}>
          {data?.map((_, index) => (
            <Cell
              key={index}
              fill={theme.chartColors[index % theme.chartColors.length]}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default PurchaseFrequencyChartContent;
