import clsx from 'clsx';
import { Fragment } from 'react';
import { useStore } from 'effector-react';
import { pageModel, getSeasonString, getAgeRating, getCountry } from 'pages/movie';
import { Title } from 'shared/ui';
import { MainPersons } from '../main-persons';
import { Rating } from '../rating';
import { Description } from '../description';
import styles from './styles.module.scss';

export const Info = () => {
  const { seasonsInfo, name, year, ageRating, countries } = useStore(pageModel.$movie)!;

  const info = [year, getSeasonString(seasonsInfo.length), getCountry(countries), getAgeRating(ageRating)];

  return (
    <div className={styles.info}>
      <Title className={styles.title}>
        <span>{name} Смотреть онлайн</span>
      </Title>
      <ul className={clsx('list-reset', styles.list)}>
        {info.map((item, idx) => (
          <Fragment key={idx}>{item && <li className={styles.listItem}>{item}</li>}</Fragment>
        ))}
      </ul>
      <MainPersons />
      <Description />
      <Rating />
    </div>
  );
};
