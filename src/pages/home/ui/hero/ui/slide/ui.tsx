/* eslint-disable jsx-a11y/media-has-caption */
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { CSSTransition } from 'react-transition-group';
import { useEffect, useRef, useState, type FC, RefObject } from 'react';
import { Spinner, Title, Rating } from 'shared/ui';
import type { Slide } from './types';
import styles from './styles.module.scss';

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

interface SlideProps {
  item: Slide;
  isActiveSlide: boolean;
}

export const HeroSlide: FC<SlideProps> = ({ item, isActiveSlide }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { play, stop } = usePlayer(videoRef);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(false);

  /* FIXME!!! отрефачить утром это блядское дерьмо */

  useEffect(() => {
    if (isActiveSlide) {
      setTimeout(() => {
        play();
        setIsActive(true);
      }, 2000);
    } else {
      setIsActive(false);
      stop();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActiveSlide]);

  return (
    <div className={styles.item}>
      <Link href={`/film/${item?.id}`} className={styles.link} />
      <div className={styles.content}>
        <CSSTransition timeout={0} in={isActive} classNames={{ enterDone: styles.done }}>
          <Title className={styles.title} as="h2" size="small">
            {item?.title}
          </Title>
        </CSSTransition>
        <CSSTransition timeout={0} in={isActive} classNames={{ enterDone: styles.done }}>
          <div className={styles.bottom}>
            <Rating className={styles.rating}>{item?.rating}</Rating>
            <span className={styles.year}>{item?.year}</span>
            <span className={styles.genre}>{item?.genre}</span>
          </div>
        </CSSTransition>
      </div>
      <Image priority sizes="100%" fill quality={100} className={styles.image} src={item?.image} alt={item?.title} />
      <CSSTransition timeout={0} in={isActive} classNames={{ enterDone: styles.done }}>
        <div className={styles.videoContainer}>
          <video
            style={{ transform: `scale(${item.scale})` }}
            onCanPlay={() => setIsLoading(false)}
            onWaiting={() => setIsLoading(true)}
            className={styles.video}
            muted
            ref={videoRef}
            src={item?.trailer}
            playsInline
            loop
          />
          <div className={clsx(styles.spinner, isLoading && styles.loading)}>
            <Spinner strokeWidth={3} />
          </div>
        </div>
      </CSSTransition>
    </div>
  );
};
