import { Spinner } from '@/components/Spinner';
import { ErrorBoundary } from 'react-error-boundary';
import { Suspense, useState } from 'react';
import PurchaseFrequencyChartContent from './PurchaseFrequencyChartContent';
import { endOfMonth, startOfMonth } from 'date-fns';
import PurchaseFrequencyLoadError from './PurchaseFrequencyLoadError';
import Card from '@/components/Card';
import DateRangePicker from '@/components/DateRangePicker/DateRangePicker';
import { DateRange } from '@/components/DateRangePicker/DateRangePicker.types';

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
      contentHeight={500}
    >
      <ErrorBoundary
        FallbackComponent={PurchaseFrequencyLoadError}
        resetKeys={[dateRange]}
      >
        <Suspense fallback={<Spinner size={32} />}>
          <PurchaseFrequencyChartContent
            fromDate={dateRange.from!}
            toDate={dateRange.to!}
          />
        </Suspense>
      </ErrorBoundary>
    </Card>
  );
};

export default PurchaseFrequencyChart;
