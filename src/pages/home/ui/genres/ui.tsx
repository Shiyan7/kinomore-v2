import clsx from "clsx";
import Link from "next/link";
import { MapIcon, HeartsIcon, PeopleIcon, HappyIcon, FireIcon, CupIcon, GamepadIcon, MusicIcon } from "shared/ui/icons";
import styles from "./styles.module.scss";

const genres = [
  { href: "#", icon: <MapIcon />, text: "Приключения" },
  { href: "#", icon: <PeopleIcon />, text: "Семейные" },
  { href: "#", icon: <FireIcon />, text: "Новые" },
  { href: "#", icon: <HeartsIcon />, text: "Мелодраммы" },
  { href: "#", icon: <CupIcon />, text: "Лучшие" },
  { href: "#", icon: <HappyIcon />, text: "Комедии" },
  { href: "#", icon: <GamepadIcon />, text: "Игры" },
  { href: "#", icon: <MusicIcon />, text: "Концерты" },
  { href: "#", icon: <MapIcon />, text: "Приключения" },
  { href: "#", icon: <MapIcon />, text: "Приключения" },
];

export const Genres = () => {
  return (
    <section className={styles.section}>
      <h2 className="visually-hidden">Жанры</h2>
      <div className={clsx("container", styles.container)}>
        <ul className={clsx("list-reset", styles.list)}>
          {genres.map((genre, idx) => (
            <li key={idx} className={styles.item}>
              <Link href={genre.href} className={styles.link}>
                <span className={styles.icon}>{genre.icon}</span>
                <span className={styles.text}>{genre.text}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
