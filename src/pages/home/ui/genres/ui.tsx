import clsx from "clsx";
import Link from "next/link";
import { useRef } from "react";
import {
  MapIcon,
  HeartsIcon,
  PeopleIcon,
  HappyIcon,
  FireIcon,
  CupIcon,
  GamepadIcon,
  MusicIcon,
  KnifeIcon,
} from "shared/ui/icons";
import { useScroll } from "./hooks";
import styles from "./styles.module.scss";

const genres = [
  { href: "#", icon: <KnifeIcon />, text: "Ужасы" },
  { href: "#", icon: <MapIcon />, text: "Приключения" },
  { href: "#", icon: <PeopleIcon />, text: "Семейные" },
  { href: "#", icon: <FireIcon />, text: "Новые" },
  { href: "#", icon: <HeartsIcon />, text: "Мелодраммы" },
  { href: "#", icon: <CupIcon />, text: "Лучшие" },
  { href: "#", icon: <HappyIcon />, text: "Комедии" },
  { href: "#", icon: <GamepadIcon />, text: "Игры" },
  { href: "#", icon: <MusicIcon />, text: "Концерты" },
];

export const Genres = () => {
  const sliderRef = useRef<HTMLUListElement | null>(null);
  const { isScrolled } = useScroll(sliderRef.current);

  return (
    <section className={styles.section}>
      <h2 className="visually-hidden">Жанры</h2>
      <div className={clsx(styles.container, isScrolled && styles.isScrolled)}>
        <ul ref={sliderRef} className={clsx("container list-reset", styles.list)}>
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
