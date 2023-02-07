import { renderHook, act } from '@testing-library/react';
import { useLockedBody } from './use-locked-body';

describe('useLockedBody', () => {
  test('should set the initial state as the provided initial locked state', () => {
    const { result: result1 } = renderHook(() => useLockedBody(true));
    expect(result1.current[0]).toBe(true);

    const { result: result2 } = renderHook(() => useLockedBody(false));
    expect(result2.current[0]).toBe(false);
  });

  test('should set the overflow and paddingRight of the body element when locked', () => {
    const { result } = renderHook(() => useLockedBody(false));
    const scrollBarWidth = window.innerWidth - document.body.offsetWidth;

    act(() => {
      result.current[1](true);
    });

    expect(document.body.style.overflow).toBe('hidden');

    expect(document.body.style.paddingRight).toBe(`${scrollBarWidth}px`);
  });

  test('should reset the overflow and paddingRight of the body element when unlocked', () => {
    const { result } = renderHook(() => useLockedBody(true));
    act(() => {
      result.current[1](false);
    });

    expect(document.body.style.overflow).toBe('');
    expect(document.body.style.paddingRight).toBe('0px');
  });
});
