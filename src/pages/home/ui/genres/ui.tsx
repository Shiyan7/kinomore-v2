import clsx from 'clsx';
import Link from 'next/link';
import { useState } from 'react';
import type SwiperClass from 'swiper';
import { Mousewheel, FreeMode } from 'swiper';
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
          className={styles.carousel}
          freeMode
          modules={[Mousewheel, FreeMode]}
          mousewheel
          onSlideChange={slideChange}
          onSliderMove={slideChange}
          slidesPerView="auto"
        >
          {genres.map(({ text, href, icon }) => (
            <SwiperSlide className={styles.item} key={text}>
              <Link className={styles.link} href={href}>
                <span className={styles.icon}>{icon}</span>
                <span className={styles.text}>{text}</span>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
