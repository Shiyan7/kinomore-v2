import clsx from 'clsx';
import Link from 'next/link';
import { useState } from 'react';
import SwiperClass, { Mousewheel, FreeMode } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import {
  MapIcon,
  HeartsIcon,
  PeopleIcon,
  HappyIcon,
  FireIcon,
  CupIcon,
  GamepadIcon,
  MusicIcon,
  KnifeIcon,
} from 'shared/ui/icons';
import styles from './styles.module.scss';

const genres = [
  { href: '#', icon: <FireIcon />, text: 'Новые' },
  { href: '#', icon: <HeartsIcon />, text: 'Мелодраммы' },
  { href: '#', icon: <KnifeIcon />, text: 'Ужасы' },
  { href: '#', icon: <MapIcon />, text: 'Приключения' },
  { href: '#', icon: <PeopleIcon />, text: 'Семейные' },
  { href: '#', icon: <CupIcon />, text: 'Лучшие' },
  { href: '#', icon: <HappyIcon />, text: 'Комедии' },
  { href: '#', icon: <GamepadIcon />, text: 'Игры' },
  { href: '#', icon: <MusicIcon />, text: 'Концерты' },
];

export const Genres = () => {
  const [isStart, setIsStart] = useState<boolean>(false);
  const [isCenter, setIsCenter] = useState<boolean>(false);

  const slideChange = (swiper: SwiperClass) => {
    setIsStart(swiper.isEnd);
    setIsCenter(!swiper.isEnd && swiper.activeIndex > 0);
  };

  return (
    <section
      className={clsx(styles.section, {
        [styles.isStart]: isStart,
        [styles.isCenter]: isCenter,
      })}
    >
      <h2 className="visually-hidden">Жанры</h2>
      <div className="container">
        <Swiper
          modules={[Mousewheel, FreeMode]}
          freeMode
          onSlideChange={slideChange}
          onSliderMove={slideChange}
          mousewheel
          slidesPerView="auto"
          className={clsx('list-reset', styles.list)}
        >
          {genres.map((genre) => (
            <SwiperSlide key={genre.text} className={styles.item}>
              <Link href={genre.href} className={styles.link}>
                <span className={styles.icon}>{genre.icon}</span>
                <span className={styles.text}>{genre.text}</span>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
