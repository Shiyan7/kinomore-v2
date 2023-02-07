import { renderHook, act } from '@testing-library/react';
import { useHeaderFixed } from './use-header-fixed';

describe('useHeaderFixed', () => {
  test('initializes with isFixed as false', () => {
    const { result } = renderHook(() => useHeaderFixed());
    expect(result.current.isFixed).toBe(false);
  });

  test('updates isFixed correctly when scrolling', () => {
    const { result } = renderHook(() => useHeaderFixed());
    act(() => {
      window.scrollY = 100;
      window.dispatchEvent(new Event('scroll'));
    });
    expect(result.current.isFixed).toBe(true);
  });

  test('setIsFixed updates isFixed correctly', () => {
    const { result } = renderHook(() => useHeaderFixed());
    act(() => {
      result.current.setIsFixed(true);
    });
    expect(result.current.isFixed).toBe(true);
  });

  test('event listener is added and removed correctly', () => {
    const addEventListenerSpy = jest.spyOn(window, 'addEventListener');
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');
    const { unmount } = renderHook(() => useHeaderFixed());
    unmount();
    expect(addEventListenerSpy).toHaveBeenCalled();
    expect(removeEventListenerSpy).toHaveBeenCalled();
  });
});
