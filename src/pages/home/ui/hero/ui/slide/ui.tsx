/* eslint-disable jsx-a11y/media-has-caption */
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { CSSTransition } from 'react-transition-group';
import { useEffect, useRef, useState, type FC } from 'react';
import { Spinner, Title, Rating, Button, VolumeHighIcon, VolumeSlashIcon } from 'shared/ui';
import type { Slide } from './types';
import styles from './styles.module.scss';

interface SlideProps {
  item: Slide;
  isActiveSlide: boolean;
}

export const HeroSlide: FC<SlideProps> = ({ item, isActiveSlide }) => {
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setTimeout(() => {
      videoRef.current?.play();
      setIsActive(isActiveSlide);
    }, 1500);
  }, [isActiveSlide]);

  return (
    <div className={styles.item}>
      <Link href={`/film/${item?.id}`} className={styles.link} />
      <div className={styles.content}>
        <CSSTransition timeout={0} in={isActive} classNames={{ enterDone: styles.done }}>
          <Title className={styles.title} as='h2' size='small'>
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
      <Image priority sizes='100%' fill quality={100} className={styles.image} src={item?.image} alt={item?.title} />
      {isActiveSlide && (
        <CSSTransition timeout={0} in={isActive} classNames={{ enterDone: styles.done }}>
          <div className={styles.videoContainer}>
            <video
              onCanPlay={() => setIsLoading(false)}
              onWaiting={() => setIsLoading(true)}
              className={styles.video}
              muted={isMuted}
              ref={videoRef}
              src={item?.trailer}
              controls={false}
              playsInline
              loop
            />
            <div className={clsx(styles.spinner, isLoading && styles.loading)}>
              <Spinner strokeWidth={3} />
            </div>
          </div>
        </CSSTransition>
      )}
      <CSSTransition timeout={0} in={isActive} classNames={{ enterDone: styles.done }}>
        <Button onClick={() => setIsMuted((prev) => !prev)} variant='glass' className={styles.volumeBtn}>
          {isMuted ? <VolumeSlashIcon /> : <VolumeHighIcon />}
        </Button>
      </CSSTransition>
    </div>
  );
};
