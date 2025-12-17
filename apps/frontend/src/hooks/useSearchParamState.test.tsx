import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useSearchParamState } from './useSearchParamState';
import * as TanstackRouter from '@tanstack/react-router';

vi.mock('@tanstack/react-router', () => ({
  useNavigate: vi.fn(),
  useSearch: vi.fn(),
}));

describe('useSearchParamState', () => {
  let mockNavigate: ReturnType<typeof vi.fn>;
  let mockSearch: Record<string, unknown>;

  beforeEach(() => {
    mockNavigate = vi.fn();
    mockSearch = {};

    vi.mocked(TanstackRouter.useNavigate).mockReturnValue(mockNavigate);
    vi.mocked(TanstackRouter.useSearch).mockReturnValue(mockSearch);
  });

  it('기본값이 없을 때 null을 반환해야 한다', () => {
    const { result } = renderHook(() => useSearchParamState('test'));

    expect(result.current[0]).toBeNull();
  });

  it('기본값을 반환해야 한다', () => {
    const { result } = renderHook(() =>
      useSearchParamState('test', { defaultValue: 'default' }),
    );

    expect(result.current[0]).toBe('default');
  });

  it('URL에서 값을 읽어야 한다', () => {
    mockSearch = { test: 'value' };
    vi.mocked(TanstackRouter.useSearch).mockReturnValue(mockSearch);

    const { result } = renderHook(() => useSearchParamState('test'));

    expect(result.current[0]).toBe('value');
  });

  it('값을 설정할 때 navigate를 호출해야 한다', () => {
    const { result } = renderHook(() => useSearchParamState('test'));

    act(() => {
      result.current[1]('newValue');
    });

    expect(mockNavigate).toHaveBeenCalledWith({
      search: expect.any(Function),
      replace: true,
      resetScroll: false,
    });
  });

  it('null 값을 설정하면 파라미터를 삭제해야 한다', () => {
    mockSearch = { test: 'value', other: 'keep' };
    vi.mocked(TanstackRouter.useSearch).mockReturnValue(mockSearch);

    const { result } = renderHook(() => useSearchParamState('test'));

    act(() => {
      result.current[1](null);
    });

    const navigateCall = mockNavigate.mock.calls[0][0];
    const searchUpdater = navigateCall.search;
    const newSearch = searchUpdater(mockSearch);

    expect(newSearch).toEqual({ other: 'keep' });
    expect(newSearch).not.toHaveProperty('test');
  });

  it('함수형 업데이트를 지원해야 한다', () => {
    mockSearch = { count: 5 };
    vi.mocked(TanstackRouter.useSearch).mockReturnValue(mockSearch);

    const { result } = renderHook(() =>
      useSearchParamState<number>('count', { defaultValue: 0 }),
    );

    act(() => {
      result.current[1]((prev) => (prev ?? 0) + 1);
    });

    const navigateCall = mockNavigate.mock.calls[0][0];
    const searchUpdater = navigateCall.search;
    const newSearch = searchUpdater(mockSearch);

    expect(newSearch.count).toBe(6);
  });

  it('replace 옵션을 전달해야 한다', () => {
    const { result } = renderHook(() =>
      useSearchParamState('test', { replace: false }),
    );

    act(() => {
      result.current[1]('value');
    });

    expect(mockNavigate).toHaveBeenCalledWith({
      search: expect.any(Function),
      replace: false,
      resetScroll: false,
    });
  });

  it('replace 기본값은 true여야 한다', () => {
    const { result } = renderHook(() => useSearchParamState('test'));

    act(() => {
      result.current[1]('value');
    });

    expect(mockNavigate).toHaveBeenCalledWith({
      search: expect.any(Function),
      replace: true,
      resetScroll: false,
    });
  });

  it('다양한 타입의 값을 처리해야 한다', () => {
    // String
    const stringHook = renderHook(() =>
      useSearchParamState<string>('str', { defaultValue: 'default' }),
    );
    expect(stringHook.result.current[0]).toBe('default');

    // Number
    mockSearch = { num: 42 };
    vi.mocked(TanstackRouter.useSearch).mockReturnValue(mockSearch);
    const numberHook = renderHook(() =>
      useSearchParamState<number>('num', { defaultValue: 0 }),
    );
    expect(numberHook.result.current[0]).toBe(42);

    // Boolean
    mockSearch = { bool: true };
    vi.mocked(TanstackRouter.useSearch).mockReturnValue(mockSearch);
    const boolHook = renderHook(() =>
      useSearchParamState<boolean>('bool', { defaultValue: false }),
    );
    expect(boolHook.result.current[0]).toBe(true);
  });

  it('기존 파라미터를 유지하면서 값을 업데이트해야 한다', () => {
    mockSearch = { test: 'old', keep1: 'value1', keep2: 'value2' };
    vi.mocked(TanstackRouter.useSearch).mockReturnValue(mockSearch);

    const { result } = renderHook(() => useSearchParamState('test'));

    act(() => {
      result.current[1]('new');
    });

    const navigateCall = mockNavigate.mock.calls[0][0];
    const searchUpdater = navigateCall.search;
    const newSearch = searchUpdater(mockSearch);

    expect(newSearch).toEqual({
      test: 'new',
      keep1: 'value1',
      keep2: 'value2',
    });
  });

  it('URL에 값이 없을 때 기본값을 사용해야 한다', () => {
    mockSearch = { other: 'value' };
    vi.mocked(TanstackRouter.useSearch).mockReturnValue(mockSearch);

    const { result } = renderHook(() =>
      useSearchParamState('notExists', { defaultValue: 'default' }),
    );

    expect(result.current[0]).toBe('default');
  });
});
