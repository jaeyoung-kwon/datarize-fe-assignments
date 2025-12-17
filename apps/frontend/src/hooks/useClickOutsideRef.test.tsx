import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useClickOutsideRef } from './useClickOutsideRef';

describe('useClickOutsideRef', () => {
  it('요소 외부 클릭시 콜백을 호출해야 한다', async () => {
    const user = userEvent.setup();
    const callback = vi.fn();

    function TestComponent() {
      const ref = useClickOutsideRef<HTMLDivElement>(callback);
      return (
        <div>
          <div ref={ref} data-testid="inside">
            Inside Element
          </div>
          <div data-testid="outside">Outside Element</div>
        </div>
      );
    }

    render(<TestComponent />);

    const outsideElement = screen.getByTestId('outside');
    await user.click(outsideElement);

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('요소 내부 클릭시 콜백을 호출하지 않아야 한다', async () => {
    const user = userEvent.setup();
    const callback = vi.fn();

    function TestComponent() {
      const ref = useClickOutsideRef<HTMLDivElement>(callback);
      return (
        <div>
          <div ref={ref} data-testid="inside">
            Inside Element
          </div>
          <div data-testid="outside">Outside Element</div>
        </div>
      );
    }

    render(<TestComponent />);

    const insideElement = screen.getByTestId('inside');
    await user.click(insideElement);

    expect(callback).not.toHaveBeenCalled();
  });

  it('자식 요소 클릭시 콜백을 호출하지 않아야 한다', async () => {
    const user = userEvent.setup();
    const callback = vi.fn();

    function TestComponent() {
      const ref = useClickOutsideRef<HTMLDivElement>(callback);
      return (
        <div>
          <div ref={ref} data-testid="parent">
            <div data-testid="child">Child Element</div>
          </div>
          <div data-testid="outside">Outside Element</div>
        </div>
      );
    }

    render(<TestComponent />);

    const childElement = screen.getByTestId('child');
    await user.click(childElement);

    expect(callback).not.toHaveBeenCalled();
  });

  it('콜백이 null일 때 리스너를 설정하지 않아야 한다', async () => {
    const user = userEvent.setup();
    const addEventListenerSpy = vi.spyOn(document, 'addEventListener');

    function TestComponent() {
      const ref = useClickOutsideRef<HTMLDivElement>(null);
      return (
        <div>
          <div ref={ref} data-testid="inside">
            Inside Element
          </div>
          <div data-testid="outside">Outside Element</div>
        </div>
      );
    }

    render(<TestComponent />);

    const outsideElement = screen.getByTestId('outside');
    await user.click(outsideElement);

    expect(addEventListenerSpy).not.toHaveBeenCalledWith(
      'click',
      expect.any(Function),
      true,
    );
  });

  it('언마운트시 이벤트 리스너를 제거해야 한다', () => {
    const callback = vi.fn();
    const removeEventListenerSpy = vi.spyOn(document, 'removeEventListener');

    function TestComponent() {
      const ref = useClickOutsideRef<HTMLDivElement>(callback);
      return <div ref={ref}>Element</div>;
    }

    const { unmount } = render(<TestComponent />);
    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'click',
      expect.any(Function),
      true,
    );
  });

  it('콜백 변경시 리스너를 업데이트해야 한다', async () => {
    const user = userEvent.setup();
    const callback1 = vi.fn();
    const callback2 = vi.fn();

    function TestComponent({ onClickOutside }: { onClickOutside: VoidFunction }) {
      const ref = useClickOutsideRef<HTMLDivElement>(onClickOutside);
      return (
        <div>
          <div ref={ref} data-testid="inside">
            Inside
          </div>
          <div data-testid="outside">Outside</div>
        </div>
      );
    }

    const { rerender } = render(<TestComponent onClickOutside={callback1} />);

    const outsideElement = screen.getByTestId('outside');
    await user.click(outsideElement);

    expect(callback1).toHaveBeenCalledTimes(1);
    expect(callback2).not.toHaveBeenCalled();

    // Change callback
    rerender(<TestComponent onClickOutside={callback2} />);

    await user.click(outsideElement);

    expect(callback1).toHaveBeenCalledTimes(1); // Still 1
    expect(callback2).toHaveBeenCalledTimes(1); // Now called
  });

  it('제네릭 요소 타입으로 동작해야 한다', async () => {
    const user = userEvent.setup();
    const callback = vi.fn();

    function TestComponent() {
      const buttonRef = useClickOutsideRef<HTMLButtonElement>(callback);
      return (
        <div>
          <button ref={buttonRef} data-testid="button">
            Button
          </button>
          <div data-testid="outside">Outside</div>
        </div>
      );
    }

    render(<TestComponent />);

    const outsideElement = screen.getByTestId('outside');
    await user.click(outsideElement);

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('ref가 초기에 null인 상태를 처리해야 한다', () => {
    const callback = vi.fn();

    const { result } = renderHook(() => useClickOutsideRef(callback));

    expect(result.current.current).toBeNull();
  });
});
