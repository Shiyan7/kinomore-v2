import clsx from "clsx";
import Link from "next/link";
import { links } from "./config";
import styles from "./styles.module.scss";

export const Nav = () => {
  return (
    <nav className={styles.nav}>
      <ul className={clsx("list-reset", styles.list)}>
        {links.map((link) => (
          <li key={link.text} className={styles.item}>
            <Link className={styles.link} href={link.href}>
              {link.text}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
