import CalendarIcon from '#/calendar.svg?react'
import { fetcher } from '@/apis/fetcher'
import { PurchaseFrequency } from '@/lib/mockData'
import { Button, Card, CardContent, CardHeader, CardTitle, Spinner } from '@/styles/styled'
import { theme } from '@/styles/theme'
import styled from '@emotion/styled'
import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import { useEffect, useRef, useState } from 'react'
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const HeaderRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (min-width: 640px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`

const DatePickerWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
`

const DateButton = styled(Button)`
  width: 140px;
  justify-content: flex-start;
  gap: 0.5rem;
`

const DateSeparator = styled.span`
  color: ${theme.colors.mutedForeground};
`

const CalendarPopover = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 50;
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  background-color: ${theme.colors.card};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radius};
  box-shadow: ${theme.shadows.cardHover};
  padding: 1rem;
  margin-top: 0.25rem;
`

const DatePickerContainer = styled.div`
  position: relative;
`

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.25rem;
`

const CalendarDay = styled.button<{ isSelected?: boolean; isCurrentMonth?: boolean }>`
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: ${({ isSelected }) => (isSelected ? theme.colors.primary : 'transparent')};
  color: ${({ isSelected, isCurrentMonth }) =>
    isSelected
      ? theme.colors.primaryForeground
      : isCurrentMonth
      ? theme.colors.foreground
      : theme.colors.mutedForeground};

  &:hover {
    background-color: ${({ isSelected }) => (isSelected ? theme.colors.primary : theme.colors.muted)};
  }
`

const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`

const CalendarNavButton = styled.button`
  background: none;
  border: none;
  padding: 0.25rem 0.5rem;
  cursor: pointer;
  color: ${theme.colors.foreground};

  &:hover {
    background-color: ${theme.colors.muted};
    border-radius: 4px;
  }
`

const WeekDayHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.25rem;
  margin-bottom: 0.25rem;
`

const WeekDay = styled.span`
  width: 2rem;
  text-align: center;
  font-size: 0.75rem;
  color: ${theme.colors.mutedForeground};
`

const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 350px;
`

interface SimpleDatePickerProps {
  selected: Date | undefined
  onSelect: (date: Date) => void
  label: string
}

const SimpleDatePicker = ({ selected, onSelect, label }: SimpleDatePickerProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [viewMonth, setViewMonth] = useState(selected || new Date('2024-07-01'))
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const days: (Date | null)[] = []

    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null)
    }

    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i))
    }

    return days
  }

  const weekDays = ['일', '월', '화', '수', '목', '금', '토']
  const days = getDaysInMonth(viewMonth)

  return (
    <DatePickerContainer ref={ref}>
      <DateButton variant="outline" onClick={() => setIsOpen(!isOpen)}>
        <CalendarIcon />
        {selected ? selected.toLocaleDateString() : label}
      </DateButton>
      <CalendarPopover isOpen={isOpen}>
        <CalendarHeader>
          <CalendarNavButton onClick={() => setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() - 1))}>
            ‹
          </CalendarNavButton>
          <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>
            {viewMonth.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long' })}
          </span>
          <CalendarNavButton onClick={() => setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1))}>
            ›
          </CalendarNavButton>
        </CalendarHeader>
        <WeekDayHeader>
          {weekDays.map((day) => (
            <WeekDay key={day}>{day}</WeekDay>
          ))}
        </WeekDayHeader>
        <CalendarGrid>
          {days.map((day, i) =>
            day ? (
              <CalendarDay
                key={i}
                isSelected={selected && day.toDateString() === selected.toDateString()}
                isCurrentMonth={true}
                onClick={() => {
                  onSelect(day)
                  setIsOpen(false)
                }}
              >
                {day.getDate()}
              </CalendarDay>
            ) : (
              <div key={i} style={{ width: '2rem', height: '2rem' }} />
            ),
          )}
        </CalendarGrid>
      </CalendarPopover>
    </DatePickerContainer>
  )
}

const getPurchaseFrequency = async (params: { from?: string; to?: string }) => {
  return await fetcher.get<PurchaseFrequency[]>({
    path: '/api/purchase-frequency',
    query: params,
  })
}

const PurchaseFrequencyChart = () => {
  const [fromDate, setFromDate] = useState<Date>(new Date('2024-07-01'))
  const [toDate, setToDate] = useState<Date>(new Date('2024-07-31'))

  const { data, isLoading } = useQuery({
    queryKey: ['purchaseFrequency', fromDate, toDate],
    queryFn: () => getPurchaseFrequency({ from: format(fromDate, 'yyyy-MM-dd'), to: format(toDate, 'yyyy-MM-dd') }),
  })

  return (
    <Card>
      <CardHeader>
        <HeaderRow>
          <CardTitle>가격대별 구매 빈도</CardTitle>
          <DatePickerWrapper>
            <SimpleDatePicker selected={fromDate} onSelect={setFromDate} label="시작일" />
            <DateSeparator>~</DateSeparator>
            <SimpleDatePicker selected={toDate} onSelect={setToDate} label="종료일" />
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
            <BarChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={theme.colors.border} />
              <XAxis
                dataKey="range"
                tick={{ fontSize: 11, fill: theme.colors.mutedForeground }}
                angle={-45}
                textAnchor="end"
                height={80}
                interval={0}
              />
              <YAxis tick={{ fontSize: 12, fill: theme.colors.mutedForeground }} axisLine={false} tickLine={false} />
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
                  <Cell key={index} fill={theme.chartColors[index % theme.chartColors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  )
}

export default PurchaseFrequencyChart
