/* eslint-disable jsx-a11y/media-has-caption */
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { CSSTransition } from 'react-transition-group';
import { useEffect, useRef, useState } from 'react';
import { Icon } from 'shared/ui/icon';
import { Spinner, Title, Rating } from 'shared/ui';
import type { HeroMovie } from 'shared/api';
import { paths } from 'shared/routing';
import { usePlayer } from './lib';
import styles from './styles.module.scss';

interface SlideProps {
  item: HeroMovie;
  isActiveSlide: boolean;
}

const TIMEOUT_MS = 2000;

export const HeroSlide = ({ item, isActiveSlide }: SlideProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { play, stop } = usePlayer(videoRef);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(false);

  /* FIXME: придумать как избавится от setTimeout в useEffect, и оптимизировать рендеры */

  useEffect(() => {
    if (isActiveSlide) {
      setTimeout(() => {
        play();
        setIsActive(true);
      }, TIMEOUT_MS);
    } else {
      setIsActive(false);
      setIsMuted(true);
      stop();
    }
  }, [isActiveSlide, play, stop]);

  return (
    <div className={styles.item}>
      <Link href={paths.movie(item?.id)} className={styles.link} />
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
            style={{ transform: `scale(${item?.scale})` }}
            onCanPlay={() => setIsLoading(false)}
            onWaiting={() => setIsLoading(true)}
            className={styles.video}
            ref={videoRef}
            src={item?.trailer}
            muted={isMuted}
            playsInline
            loop
          />
          <div className={clsx(styles.spinner, isLoading && styles.loading)}>
            <Spinner strokeWidth={3} />
          </div>
        </div>
      </CSSTransition>
      <CSSTransition timeout={0} in={isActive} classNames={{ enterDone: styles.done }}>
        <button onClick={() => setIsMuted((prev) => !prev)} className={clsx('btn-reset', styles.volumeBtn)}>
          {isMuted ? <Icon type="common" name="volume-slash" /> : <Icon type="common" name="volume-high" />}
        </button>
      </CSSTransition>
    </div>
  );
};
