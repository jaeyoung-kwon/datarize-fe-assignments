import CalendarIcon from '#/calendar.svg?react';
import { useClickOutsideRef } from '@/hooks/useClickOutsideRef';
import { Button } from '@/styles/styled';
import { theme } from '@/styles/theme';
import styled from '@emotion/styled';
import { ko } from 'date-fns/locale';
import { useEffect, useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface Props {
  from: Date | null;
  to: Date | null;
  onChange: (from: Date, to: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  label?: string;
}

const DateRangePicker = ({
  from,
  to,
  onChange,
  minDate,
  maxDate,
  label = '기간 선택',
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(from);
  const [endDate, setEndDate] = useState<Date | null>(to);
  const containerRef = useClickOutsideRef<HTMLDivElement>(() =>
    setIsOpen(false),
  );

  const handleChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);

    // 범위가 완전히 선택되면 부모에게 알리고 달력 닫기
    if (start && end) {
      onChange(start, end);
      setIsOpen(false);
    }
  };

  // 모달이 열릴 때마다 from, to 값으로 내부 상태 초기화
  useEffect(() => {
    if (!isOpen) return;

    setStartDate(from);
    setEndDate(to);
  }, [isOpen, from, to]);

  return (
    <Container ref={containerRef}>
      <ToggleButton
        variant="outline"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <CalendarIcon />
        {from && to
          ? `${from.toLocaleDateString()} ~ ${to.toLocaleDateString()}`
          : label}
      </ToggleButton>

      {isOpen && (
        <CalendarPopover>
          <ReactDatePicker
            inline
            selectsRange
            locale={ko}
            selected={startDate}
            onChange={handleChange}
            startDate={startDate}
            endDate={endDate}
            minDate={minDate}
            maxDate={maxDate}
          />
        </CalendarPopover>
      )}
    </Container>
  );
};

export default DateRangePicker;

const Container = styled.div`
  position: relative;
`;

const ToggleButton = styled(Button)`
  width: 240px;
  justify-content: flex-start;
  gap: 0.5rem;
`;

const CalendarPopover = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  z-index: 50;
  margin-top: 0.25rem;

  /* === react-datepicker override === */
  .react-datepicker {
    background-color: ${theme.colors.card};
    border: 1px solid ${theme.colors.border};
    border-radius: ${theme.radius};
    box-shadow: ${theme.shadows.cardHover};
    padding: 0.75rem;
  }

  .react-datepicker__triangle {
    display: none;
  }

  /* Header */
  .react-datepicker__header {
    background-color: transparent;
    border-bottom: none;
    padding: 0;
    margin-bottom: 0.5rem;
  }

  .react-datepicker__current-month {
    font-size: 0.875rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
  }

  /* Week days */
  .react-datepicker__day-names {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    margin-bottom: 0.25rem;
  }

  .react-datepicker__day-name {
    width: 2rem;
    font-size: 0.75rem;
    text-align: center;
    color: ${theme.colors.mutedForeground};
  }

  /* Days grid */
  .react-datepicker__week {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 0.25rem;
  }

  .react-datepicker__day {
    width: 2rem;
    height: 2rem;
    font-size: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    cursor: pointer;
    color: ${theme.colors.foreground};

    &:hover {
      background-color: ${theme.colors.muted};
    }
  }

  .react-datepicker__day--selected {
    background-color: ${theme.colors.primary};
    color: ${theme.colors.white};

    &:hover {
      background-color: ${theme.colors.primary};
    }
  }

  .react-datepicker__day--in-range {
    background-color: ${theme.colors.primaryLight};
    color: ${theme.colors.primaryForeground};

    &:hover {
      background-color: ${theme.colors.primary};
    }
  }

  .react-datepicker__day--outside-month {
    color: ${theme.colors.mutedForeground};
  }
`;
