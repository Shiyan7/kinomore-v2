import { useStore } from 'effector-react';
import Image from 'next/image';
import { pageModel, getSeasonString } from 'pages/movie';
import { minutesToHour } from 'shared/lib';
import styles from './styles.module.scss';

export const Info = () => {
  const data = useStore(pageModel.$movie);

  const name = data?.name || 'Без названия';

  return (
    <div className={styles.item}>
      <div className={styles.imageWrapper}>
        <Image
          sizes="100%"
          fill
          quality={100}
          alt={name}
          src={`https://st.kp.yandex.net/images/film_iphone/iphone360_${data?.id}.jpg`}
        />
      </div>
      <div className={styles.text}>
        <span className={styles.name}>{name}</span>
        <div className={styles.info}>
          {data?.year && <span className={styles.infoItem}>{data.year}</span>}
          <span className={styles.infoItem}>
            {data?.seasonsInfo?.length ? getSeasonString(data?.seasonsInfo.length) : minutesToHour(data?.movieLength)}
          </span>
        </div>
      </div>
    </div>
  );
};
