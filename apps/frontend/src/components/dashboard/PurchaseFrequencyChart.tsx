import { dashboardQueries } from '@/apis/dashboard/queries';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Spinner,
} from '@/styles/styled';
import { theme } from '@/styles/theme';
import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { useState } from 'react';
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
import DateRangePicker from '../DateRangePicker/DateRangePicker';

const HeaderRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (min-width: 640px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

const DatePickerWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
`;

const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 350px;
`;

const PurchaseFrequencyChart = () => {
  const [fromDate, setFromDate] = useState<Date>(new Date('2024-07-01'));
  const [toDate, setToDate] = useState<Date>(new Date('2024-07-31'));

  const { data, isLoading } = useQuery(
    dashboardQueries.purchaseFrequency({
      from: format(fromDate, 'yyyy-MM-dd'),
      to: format(toDate, 'yyyy-MM-dd'),
    }),
  );

  return (
    <Card>
      <CardHeader>
        <HeaderRow>
          <CardTitle>가격대별 구매 빈도</CardTitle>
          <DatePickerWrapper>
            <DateRangePicker
              from={fromDate}
              to={toDate}
              onChange={(start, end) => {
                setFromDate(start);
                setToDate(end);
              }}
              minDate={new Date('2024-07-01')}
              maxDate={new Date('2024-07-31')}
            />
          </DatePickerWrapper>
        </HeaderRow>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <LoadingWrapper>
            <Spinner size={32} />
          </LoadingWrapper>
        ) : (
          <ResponsiveContainer width="100%" height={350}>
            <BarChart
              data={data}
              margin={{ top: 20, right: 20, left: 0, bottom: 60 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={theme.colors.border}
              />
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
                labelStyle={{ color: theme.colors.foreground, fontWeight: 600 }}
                // formatter={(value: number) => [`${value}건`, '구매 횟수']}
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
        )}
      </CardContent>
    </Card>
  );
};

export default PurchaseFrequencyChart;
