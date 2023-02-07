import { renderHook, act } from '@testing-library/react';
import { createToggler } from './create-toggler';
import { useToggler } from './use-toggler';

describe('useToggler', () => {
  const togglerInstance = createToggler();

  test('should return the correct initial value', () => {
    const { result } = renderHook(() => useToggler(togglerInstance));
    expect(result.current.isOpen).toBe(false);
  });

  test('should toggle the value when toggle is called', () => {
    const { result } = renderHook(() => useToggler(togglerInstance));
    act(() => {
      result.current.toggle();
    });
    expect(result.current.isOpen).toBe(true);
  });

  test('should set the value to true when open is called', () => {
    const { result } = renderHook(() => useToggler(togglerInstance));
    act(() => {
      result.current.open();
    });
    expect(result.current.isOpen).toBe(true);
  });

  test('should set the value to false when close is called', () => {
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
