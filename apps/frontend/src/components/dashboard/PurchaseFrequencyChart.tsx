import { Spinner } from '@/styles/styled';
import { Suspense, useState } from 'react';
import Card from '../Card';
import DateRangePicker from '../DateRangePicker/DateRangePicker';
import PurchaseFrequencyChartContent from './PurchaseFrequencyChartContent';

const PurchaseFrequencyChart = () => {
  const [fromDate, setFromDate] = useState<Date>(new Date('2024-07-01'));
  const [toDate, setToDate] = useState<Date>(new Date('2024-07-31'));

  return (
    <Card
      title="가격대별 구매 빈도"
      headerAction={
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
      }
      contentHeight={350}
    >
      <Suspense fallback={<Spinner size={32} />}>
        <PurchaseFrequencyChartContent fromDate={fromDate} toDate={toDate} />
      </Suspense>
    </Card>
  );
};

export default PurchaseFrequencyChart;
