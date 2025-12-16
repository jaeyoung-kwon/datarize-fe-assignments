import { Spinner } from '@/styles/styled';
import { Suspense, useState } from 'react';
import Card from '../Card';
import DateRangePicker from '../DateRangePicker/DateRangePicker';
import { DateRange } from '../DateRangePicker/DateRangePicker.types';
import PurchaseFrequencyChartContent from './PurchaseFrequencyChartContent';
import { endOfMonth, startOfMonth } from 'date-fns';

const MONTH = new Date(2024, 6); // 2024년 7월

const PurchaseFrequencyChart = () => {
  const [dateRange, setDateRange] = useState<DateRange>({
    from: startOfMonth(MONTH),
    to: endOfMonth(MONTH),
  });

  return (
    <Card
      title="가격대별 구매 빈도"
      headerAction={
        <DateRangePicker
          value={dateRange}
          onChange={setDateRange}
          minDate={startOfMonth(MONTH)}
          maxDate={endOfMonth(MONTH)}
        />
      }
      contentHeight={350}
    >
      <Suspense fallback={<Spinner size={32} />}>
        <PurchaseFrequencyChartContent
          fromDate={dateRange.from!}
          toDate={dateRange.to!}
        />
      </Suspense>
    </Card>
  );
};

export default PurchaseFrequencyChart;
