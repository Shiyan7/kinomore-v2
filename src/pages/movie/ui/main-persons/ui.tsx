import clsx from "clsx";
import { useUnit } from "effector-react";
import Image from "next/image";
import Link from "next/link";
import { pageModel } from "pages/movie";
import styles from "./styles.module.scss";

export const MainPersons = () => {
  const { persons } = useUnit(pageModel.$movie)!;

  return (
    <ul className={clsx("list-reset", styles.list)}>
      {persons?.slice(0, 5).map((person, idx) => (
        <li className={styles.item} key={idx}>
          <Link href="#" className={styles.link}>
            <div className={styles.image}>
              <Image fill src={person.photo} alt={person?.name} />
            </div>
            <span className={styles.name}>{person.name || person.enName}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
};
