import clsx from "clsx";
import { Logo } from "./logo";
import { Nav } from "./nav";
import { Profile } from "./profile";
import { Search } from "./search";
import styles from "./styles.module.scss";
import { useHeaderFixed } from "./useHeaderFixed.hooks";

export const Header = () => {
  const { headerRef, isFixed } = useHeaderFixed();

  return (
    <header ref={headerRef} className={styles.header}>
      <div className={clsx("container", styles.container, isFixed && styles.fixed)}>
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
