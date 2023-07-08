import clsx from 'clsx';
import Link from 'next/link';
import { useState } from 'react';
import SwiperClass, { Mousewheel, FreeMode } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { genres } from './config';
import styles from './styles.module.scss';

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
          mousewheel
          onSlideChange={slideChange}
          onSliderMove={slideChange}
          slidesPerView="auto"
          className={styles.carousel}
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
