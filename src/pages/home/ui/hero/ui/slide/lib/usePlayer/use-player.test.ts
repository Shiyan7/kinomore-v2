import { act, renderHook } from '@testing-library/react';
import { usePlayer } from './use-player';

describe('usePlayer', () => {
  let videoRef: { current: HTMLVideoElement | null } = { current: null };

  beforeEach(() => {
    videoRef = { current: document.createElement('video') };
  });

  test('should call play on video element when play is called', () => {
    const playSpy = jest.spyOn(HTMLMediaElement.prototype, 'play').mockImplementation();
    const { result } = renderHook(() => usePlayer(videoRef));
    act(() => result.current?.play());
    expect(playSpy).toHaveBeenCalled();
  });

  test('should call pause and set currentTime to 0 on video element when stop is called', () => {
    const pauseSpy = jest.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation();
    const { result } = renderHook(() => usePlayer(videoRef));
    act(() => result.current?.stop());
    expect(pauseSpy).toHaveBeenCalled();
    expect(videoRef.current?.currentTime).toBe(0);
  });
});
