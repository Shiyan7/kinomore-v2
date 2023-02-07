import { fireEvent, renderHook } from '@testing-library/react';
import { useEscape } from './use-escape';

describe('useEscape', () => {
  test('should call callback if `Escape` is pressed', () => {
    const callback = jest.fn();

    renderHook(() => useEscape(callback));

    fireEvent.keyDown(document, { key: 'Escape' });

    expect(callback).toHaveBeenCalledTimes(1);
  });

  test('should not call callback if `Shift` is pressed', () => {
    const callback = jest.fn();

    renderHook(() => useEscape(callback));

    fireEvent.keyDown(document, { key: 'Shift' });

    expect(callback).not.toHaveBeenCalled();
  });
});
