import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useDebouncedValue } from './useDebouncedValue';

describe('useDebouncedValue', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('초기값을 즉시 반환해야 한다', () => {
    const { result } = renderHook(() => useDebouncedValue('initial', 500));
    expect(result.current).toBe('initial');
  });

  it('값 변경을 디바운스해야 한다', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebouncedValue(value, delay),
      {
        initialProps: { value: 'initial', delay: 500 },
      },
    );

    expect(result.current).toBe('initial');

    // Update value
    rerender({ value: 'updated', delay: 500 });

    // Value should not change immediately
    expect(result.current).toBe('initial');

    // Fast-forward time by 500ms
    act(() => {
      vi.advanceTimersByTime(500);
    });

    // Now value should be updated
    expect(result.current).toBe('updated');
  });

  it('빠른 값 변경시 타이머를 리셋해야 한다', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebouncedValue(value, delay),
      {
        initialProps: { value: 'initial', delay: 500 },
      },
    );

    // First update
    rerender({ value: 'first', delay: 500 });
    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(result.current).toBe('initial');

    // Second update before debounce completes
    rerender({ value: 'second', delay: 500 });
    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(result.current).toBe('initial');

    // Complete the debounce for the second update
    act(() => {
      vi.advanceTimersByTime(200);
    });
    expect(result.current).toBe('second');
  });

  it('다양한 지연 시간으로 동작해야 한다', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebouncedValue(value, delay),
      {
        initialProps: { value: 'initial', delay: 1000 },
      },
    );

    rerender({ value: 'updated', delay: 1000 });

    act(() => {
      vi.advanceTimersByTime(999);
    });
    expect(result.current).toBe('initial');

    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(result.current).toBe('updated');
  });

  it('다양한 타입의 값으로 동작해야 한다', () => {
    // Test with numbers
    const { result: numberResult, rerender: numberRerender } = renderHook(
      ({ value, delay }) => useDebouncedValue(value, delay),
      {
        initialProps: { value: 0, delay: 300 },
      },
    );

    numberRerender({ value: 42, delay: 300 });
    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(numberResult.current).toBe(42);

    // Test with booleans
    const { result: boolResult, rerender: boolRerender } = renderHook(
      ({ value, delay }) => useDebouncedValue(value, delay),
      {
        initialProps: { value: false, delay: 300 },
      },
    );

    boolRerender({ value: true, delay: 300 });
    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(boolResult.current).toBe(true);

    // Test with objects
    const { result: objResult, rerender: objRerender } = renderHook(
      ({ value, delay }) => useDebouncedValue(value, delay),
      {
        initialProps: { value: { count: 0 }, delay: 300 },
      },
    );

    objRerender({ value: { count: 10 }, delay: 300 });
    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(objResult.current).toEqual({ count: 10 });
  });

  it('0ms 지연을 처리해야 한다', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebouncedValue(value, delay),
      {
        initialProps: { value: 'initial', delay: 0 },
      },
    );

    rerender({ value: 'updated', delay: 0 });
    act(() => {
      vi.advanceTimersByTime(0);
    });
    expect(result.current).toBe('updated');
  });

  it('언마운트시 타이머를 정리해야 한다', () => {
    const clearTimeoutSpy = vi.spyOn(global, 'clearTimeout');

    const { unmount } = renderHook(() => useDebouncedValue('test', 500));

    unmount();

    expect(clearTimeoutSpy).toHaveBeenCalled();
  });
});
