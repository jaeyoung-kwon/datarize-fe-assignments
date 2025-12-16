import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Spinner,
} from '@/styles/styled';
import styled from '@emotion/styled';
import { Suspense, useState } from 'react';
import DateRangePicker from '../DateRangePicker/DateRangePicker';
import PurchaseFrequencyChartContent from './PurchaseFrequencyChartContent';

const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 350px;
`;

const PurchaseFrequencyChart = () => {
  const [fromDate, setFromDate] = useState<Date>(new Date('2024-07-01'));
  const [toDate, setToDate] = useState<Date>(new Date('2024-07-31'));

  return (
    <Card>
      <CardHeader>
        <HeaderRow>
          <CardTitle>가격대별 구매 빈도</CardTitle>
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
        </HeaderRow>
      </CardHeader>
      <CardContent>
        <Suspense
          fallback={
            <LoadingWrapper>
              <Spinner size={32} />
            </LoadingWrapper>
          }
        >
          <PurchaseFrequencyChartContent fromDate={fromDate} toDate={toDate} />
        </Suspense>
      </CardContent>
    </Card>
  );
};

export default PurchaseFrequencyChart;

const HeaderRow = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1rem;

  @media (min-width: 640px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;
