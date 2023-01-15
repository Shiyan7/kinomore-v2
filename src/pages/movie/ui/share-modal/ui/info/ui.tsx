import Image from 'next/image';
import { useStore } from 'effector-react';
import { pageModel, getPageTitle } from 'pages/movie';
import { getSeasonString } from 'shared/lib/get-season-string';
import { minutesToHour } from 'shared/lib';
import styles from './styles.module.scss';

export const Info = () => {
  const data = useStore(pageModel.$movie);

  const name = getPageTitle(data?.name);

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
