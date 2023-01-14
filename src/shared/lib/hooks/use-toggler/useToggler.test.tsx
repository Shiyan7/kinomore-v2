import { renderHook, act } from '@testing-library/react';
import { createToggler, useToggler } from './useToggler';

describe('useToggler', () => {
  const togglerInstance = createToggler();

  it('should return the correct initial value', () => {
    const { result } = renderHook(() => useToggler(togglerInstance));
    expect(result.current.isOpen).toBe(false);
  });

  it('should toggle the value when toggle is called', () => {
    const { result } = renderHook(() => useToggler(togglerInstance));
    act(() => {
      result.current.toggle();
    });
    expect(result.current.isOpen).toBe(true);
  });

  it('should set the value to true when open is called', () => {
    const { result } = renderHook(() => useToggler(togglerInstance));
    act(() => {
      result.current.open();
    });
    expect(result.current.isOpen).toBe(true);
  });

  it('should set the value to false when close is called', () => {
    const { result } = renderHook(() => useToggler(togglerInstance));
    act(() => {
      result.current.open();
    });
    act(() => {
      result.current.close();
    });
    expect(result.current.isOpen).toBe(false);
  });
});
