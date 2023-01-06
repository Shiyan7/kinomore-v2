import type { RefObject } from 'react';

interface PlayerHook {
  play: () => void;
  stop: () => void;
}

export function usePlayer(videoRef: RefObject<HTMLVideoElement>): PlayerHook {
  const play = () => {
    videoRef.current?.play();
  };

  const stop = () => {
    videoRef.current?.pause();
    videoRef.current!.currentTime = 0;
  };

  return { play, stop };
}
