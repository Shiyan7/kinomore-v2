import clsx from "clsx";
import { Fragment } from "react";
import { useUnit } from "effector-react";
import { pageModel, getSeasonString, getAgeRating, getCountry } from "pages/movie";
import { Title } from "shared/ui";
import { MainPersons } from "../main-persons";
import styles from "./styles.module.scss";

export const Info = () => {
  const { seasonsInfo, name, description, year, ageRating, shortDescription, countries } = useUnit(pageModel.$movie)!;

  const items = [year, getSeasonString(seasonsInfo.length), getAgeRating(ageRating), getCountry(countries)];

  return (
    <div className={styles.info}>
      <Title className={styles.title}>
        <span>Сериал {name} Смотреть онлайн</span>
      </Title>
      <ul className={clsx("list-reset", styles.list)}>
        {items.map((item, idx) => (
          <Fragment key={idx}>{item && <li className={styles.listItem}>{item}</li>}</Fragment>
        ))}
      </ul>
      <MainPersons />
      <p className={styles.desc}>{description || shortDescription}</p>
    </div>
  );
};
