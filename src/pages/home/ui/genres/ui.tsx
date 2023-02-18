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
  MusicIcon,
  KnifeIcon,
  RocketIcon,
  TankIcon,
} from 'shared/ui/icons';
import { GenresEnum } from 'shared/config';
import { paths } from 'shared/routing';
import styles from './styles.module.scss';

const genres = [
  { href: paths.movies, icon: <CupIcon />, text: 'Лучшие' },
  { href: paths.catalog({ year: '2022-2023' }), icon: <FireIcon />, text: 'Новые' },
  { href: paths.catalog({ genre: GenresEnum.Melodrama }), icon: <HeartsIcon />, text: 'Мелодраммы' },
  { href: paths.catalog({ genre: GenresEnum.Uzhasy }), icon: <KnifeIcon />, text: 'Ужасы' },
  { href: paths.catalog({ genre: GenresEnum.Priklyucheniya }), icon: <MapIcon />, text: 'Приключения' },
  { href: paths.catalog({ genre: GenresEnum.Fantastika }), icon: <RocketIcon />, text: 'Фантастика' },
  { href: paths.catalog({ genre: GenresEnum.Voennyj }), icon: <TankIcon />, text: 'Военные' },
  { href: paths.catalog({ genre: GenresEnum.Semejnyj }), icon: <PeopleIcon />, text: 'Семейные' },
  { href: paths.catalog({ genre: GenresEnum.Komediya }), icon: <HappyIcon />, text: 'Комедии' },
  { href: paths.catalog({ genre: GenresEnum.Koncert }), icon: <MusicIcon />, text: 'Концерты' },
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
      })}>
      <h2 className="visually-hidden">Жанры</h2>
      <div className="container">
        <Swiper
          modules={[Mousewheel, FreeMode]}
          freeMode
          mousewheel
          onSlideChange={slideChange}
          onSliderMove={slideChange}
          slidesPerView="auto"
          className={styles.list}>
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
