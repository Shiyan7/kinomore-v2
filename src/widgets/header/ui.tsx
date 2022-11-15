import clsx from "clsx";
import { Logo } from "./logo";
import { Nav } from "./nav";
import { Profile } from "./profile";
import { Search } from "./search";
import styles from "./styles.module.scss";

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={clsx("container", styles.container)}>
        <div className={styles.row}>
          <Logo />
          <Nav />
        </div>
        <div className={styles.row}>
          <Search />
          <Profile />
        </div>
      </div>
    </header>
  );
};
