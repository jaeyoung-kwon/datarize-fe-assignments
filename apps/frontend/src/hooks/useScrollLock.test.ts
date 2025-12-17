import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useScrollLock } from './useScrollLock';

describe('useScrollLock', () => {
  let originalOverflow: string;

  beforeEach(() => {
    originalOverflow = document.body.style.overflow;
  });

  afterEach(() => {
    document.body.style.overflow = originalOverflow;
  });

  it('enabled가 false일 때 스크롤을 잠그지 않아야 한다', () => {
    renderHook(() => useScrollLock({ enabled: false }));
    expect(document.body.style.overflow).toBe('');
  });

  it('enabled가 true일 때 스크롤을 잠가야 한다', () => {
    renderHook(() => useScrollLock({ enabled: true }));
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('언마운트시 원래 overflow 값으로 복원해야 한다', () => {
    document.body.style.overflow = 'auto';

    const { unmount } = renderHook(() => useScrollLock({ enabled: true }));

    expect(document.body.style.overflow).toBe('hidden');

    unmount();

    expect(document.body.style.overflow).toBe('auto');
  });

  it('enabled가 변경될 때 스크롤 상태를 업데이트해야 한다', () => {
    const { rerender } = renderHook(
      ({ enabled }) => useScrollLock({ enabled }),
      {
        initialProps: { enabled: false },
      },
    );

    expect(document.body.style.overflow).toBe('');

    rerender({ enabled: true });

    expect(document.body.style.overflow).toBe('hidden');

    rerender({ enabled: false });

    expect(document.body.style.overflow).toBe('');
  });

  it('초기 overflow 값이 설정되어 있을 때 올바르게 복원해야 한다', () => {
    document.body.style.overflow = 'scroll';

    const { unmount } = renderHook(() => useScrollLock({ enabled: true }));

    expect(document.body.style.overflow).toBe('hidden');

    unmount();

    expect(document.body.style.overflow).toBe('scroll');
  });

  it('enabled 기본값이 false여야 한다', () => {
    renderHook(() => useScrollLock({}));
    expect(document.body.style.overflow).toBe('');
  });

  it('여러 인스턴스가 동시에 동작할 때 마지막 설정이 적용되어야 한다', () => {
    document.body.style.overflow = 'visible';

    const hook1 = renderHook(() => useScrollLock({ enabled: true }));
    expect(document.body.style.overflow).toBe('hidden');

    const hook2 = renderHook(() => useScrollLock({ enabled: true }));
    expect(document.body.style.overflow).toBe('hidden');

    hook2.unmount();
    expect(document.body.style.overflow).toBe('hidden');

    hook1.unmount();
    expect(document.body.style.overflow).toBe('visible');
  });
});
