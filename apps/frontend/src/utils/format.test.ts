import { describe, it, expect } from 'vitest';
import { formatCurrency, formatDate, formatDateShort } from './format';

describe('formatCurrency', () => {
  it('양수를 올바르게 포맷팅해야 한다', () => {
    expect(formatCurrency(1000)).toBe('₩1,000');
    expect(formatCurrency(10000)).toBe('₩10,000');
    expect(formatCurrency(1000000)).toBe('₩1,000,000');
  });

  it('0을 올바르게 포맷팅해야 한다', () => {
    expect(formatCurrency(0)).toBe('₩0');
  });

  it('음수를 올바르게 포맷팅해야 한다', () => {
    expect(formatCurrency(-1000)).toBe('-₩1,000');
    expect(formatCurrency(-10000)).toBe('-₩10,000');
  });

  it('소수점을 올바르게 포맷팅해야 한다', () => {
    expect(formatCurrency(1234.56)).toBe('₩1,235');
    expect(formatCurrency(9999.99)).toBe('₩10,000');
  });

  it('매우 큰 숫자를 처리해야 한다', () => {
    expect(formatCurrency(1000000000)).toBe('₩1,000,000,000');
    expect(formatCurrency(999999999999)).toBe('₩999,999,999,999');
  });

  it('매우 작은 소수를 처리해야 한다', () => {
    expect(formatCurrency(0.1)).toBe('₩0');
    expect(formatCurrency(0.5)).toBe('₩1');
    expect(formatCurrency(0.49)).toBe('₩0');
  });
});

describe('formatDate', () => {
  it('날짜 문자열을 올바르게 포맷팅해야 한다', () => {
    expect(formatDate('2024-07-01')).toBe('2024년 7월 1일 (월)');
    expect(formatDate('2024-12-25')).toBe('2024년 12월 25일 (수)');
    expect(formatDate('2024-01-01')).toBe('2024년 1월 1일 (월)');
  });

  it('ISO 날짜 형식을 처리해야 한다', () => {
    expect(formatDate('2024-07-15T00:00:00.000Z')).toMatch(/2024년 7월 1[45]일 \(월\)/);
  });

  it('다양한 월을 올바르게 처리해야 한다', () => {
    expect(formatDate('2024-02-29')).toBe('2024년 2월 29일 (목)');
    expect(formatDate('2024-03-31')).toBe('2024년 3월 31일 (일)');
  });

  it('한국어 요일을 표시해야 한다', () => {
    expect(formatDate('2024-07-01')).toContain('월');
    expect(formatDate('2024-07-02')).toContain('화');
    expect(formatDate('2024-07-03')).toContain('수');
    expect(formatDate('2024-07-04')).toContain('목');
    expect(formatDate('2024-07-05')).toContain('금');
    expect(formatDate('2024-07-06')).toContain('토');
    expect(formatDate('2024-07-07')).toContain('일');
  });
});

describe('formatDateShort', () => {
  it('Date 객체를 짧은 형식으로 포맷팅해야 한다', () => {
    const date1 = new Date('2024-07-01');
    const date2 = new Date('2024-12-25');
    const date3 = new Date('2024-01-01');

    expect(formatDateShort(date1)).toMatch(/2024\. 7\. (30|1)/);
    expect(formatDateShort(date2)).toMatch(/2024\. 12\. (24|25)/);
    expect(formatDateShort(date3)).toMatch(/2024\. 1\. (31|1)/);
  });

  it('다양한 날짜를 올바르게 처리해야 한다', () => {
    const date = new Date(2024, 6, 15); // July 15, 2024 (month is 0-indexed)
    expect(formatDateShort(date)).toBe('2024. 7. 15');
  });

  it('한 자리 월과 일을 처리해야 한다', () => {
    const date = new Date(2024, 0, 5); // January 5, 2024
    expect(formatDateShort(date)).toBe('2024. 1. 5');
  });

  it('두 자리 월과 일을 처리해야 한다', () => {
    const date = new Date(2024, 11, 25); // December 25, 2024
    expect(formatDateShort(date)).toBe('2024. 12. 25');
  });

  it('연도 경계를 처리해야 한다', () => {
    const lastDay2023 = new Date(2023, 11, 31);
    const firstDay2024 = new Date(2024, 0, 1);

    expect(formatDateShort(lastDay2023)).toBe('2023. 12. 31');
    expect(formatDateShort(firstDay2024)).toBe('2024. 1. 1');
  });
});
