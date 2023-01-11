import { useStore } from 'effector-react';
import Image from 'next/image';
import { pageModel, getSeasonString } from 'pages/movie';
import { minutesToHour } from 'shared/lib';
import styles from './styles.module.scss';

export const Info = () => {
  const { name, id, year, seasonsInfo, movieLength } = useStore(pageModel.$movie)!;

  return (
    <div className={styles.item}>
      <div className={styles.imageWrapper}>
        <Image
          sizes="100%"
          fill
          quality={100}
          alt={name}
          src={`https://st.kp.yandex.net/images/film_iphone/iphone360_${id}.jpg`}
        />
      </div>
      <div className={styles.text}>
        <span className={styles.name}>{name}</span>
        <div className={styles.info}>
          <span className={styles.infoItem}>{year}</span>
          <span className={styles.infoItem}>
            {seasonsInfo?.length ? getSeasonString(seasonsInfo.length) : minutesToHour(movieLength)}
          </span>
        </div>
      </div>
    </div>
  );
};
